---
title: "Cache Explorer: A Worklog"
date: "01-01-2026"
preview: "A technical worklog building Cache Explorer, an interactive tool for visualizing CPU cache behavior in C/C++ code. Covers LLVM IR analysis, cache simulation, and the surprisingly hard problem of extracting memory access patterns from compiled code."
slug: "cache-explorer-worklog"
tags: ["Technical"]
subtopics: ["C++", "LLVM", "Computer Architecture"]
---

## The Inspiration

If you have ever done some interesting and challenging work in a compiler-based language, then there is a good chance that you've visited [Compiler Explorer](https://godbolt.org/). If you're not familiar, the site is an extremely useful tool to examine how your code gets compiled across different languages and toolchains. Not only is it pretty interesting to see how different compilers reorganize and optimize code, but looking at the pure assembly of your program can help to identify bottlenecks or troubleshoot unexpected bugs^1[Although this takes a lot of effort and can also be done with tools like [GDB](https://sourceware.org/gdb/)].

I've personally leveraged this tool to look at how my [CUDA](the-essence-of-gpu-programming) kernels are being compiled into machine code and looking for any clear suboptimal execution blocks^2[Which essentially just means looking for a lot of `jmp` statements]. However, as important as knowing what your compiler is doing is, it doesn't fix every problem; performance killers are everywhere. The second most important thing you can do after ensuring your actual programs are fast is to align the programs with your hardware. Specifically, and the focus of this blog, is caching.

The mechanics of caches are far more involved than expected. Even in perfectly single-threaded code, something as simple as iterating through an array in the wrong order or laying out struct fields poorly can cause extreme performance degradation. These problems amplify in concurrent applications, and they're silent killers, completely invisible in your source code. The compiler won't warn you, profilers won't flag them directly, and the program produces correct results, just slowly.

Despite caching's critical role in performance, there's no interactive tool for understanding this behavior in real-time. No cache equivalent to Compiler Explorer. So, inspired by Matthew Godbolt's work, I set out to build Cache Explorer: an interactive tool that visualizes how your C/C++ code behaves across different cache configurations. Write code, see the cache behavior, understand the bottlenecks.

The rest of this blog details my progress completing this project, focusing on the interesting technical challenges: compiling user code to LLVM IR, simulating realistic cache behavior, and building useful visualizations. Let's do it.

## Phase 1: LLVM Rabbithole

To start this project, there are a couple of unanswered questions:

- What languages are we targeting?
- How will we actually monitor and process memory access operations?

As of writing this, the main idea is to support C/C++ code, as these languages have the most "market share" in high performance computing. Then, knowing that this is the goal, there is a clear way forward in tackling the problem. C/C++ are both compiled languages, which is important because to look at how programs intertwine with the hardware caches, the tool needs to "see" more than just the human-readable code. In simpler terms, we must compile the programs and have our engine somehow parse the compiled code into something that can simulate cache architecture.

If you aren't familiar with [[Compilers]], the very general purpose is to convert human readable code^3[C, C++, Rust. Any programming language] into machine code^4[1s and 0s] for the computer to execute. There are three distinct stages a compiler must handle:

1. Frontend: Analyze and parse code. Ensure that it "makes sense"
1. Optimizer: Take the result of the frontend process and run various _passes_ on the result to optimize the code
1. Backend: Convert the optimized program into architecture specific machine instructions

While this is generally how Compilers operate, different families of compilers go about this in different ways. For this blog, we'll mainly be focusing on [[LLVM]], or low-level virtual machine compilers^5[As opposed to older, more classic compilers like [[GCC]]]. One of the unique aspects of LLVM is its introduction of [[LLVM Intermediate Representation|IR]], or intermediate representation. The IR is what the optimizer performs passes over, and part of what makes LLVM so attractive is that the frontend can compile multiple different languages into the same IR^6[While not necessarily super important for this post, it is actually pretty interesting that you can compile Rust, C, Zig, etc to the same IR]. At this point, you might be wondering, "Why does this matter?". Well, since LLVM was designed so well and very modern, we can leverage the toolchain to help accomplish our goal. We'll do this by creating our own custom [[LLVM Pass|pass]] over the IR that will aid the other parts of our program in simulating cache activity.

The idea here is pretty simple, we just need to pass through the IR already generated and add a single function call before every `load` and `store` operation. What makes this even better is that existing LLVM API streamlines this process very well. The first step on the agenda is to create our new pass Class:

```cpp
class CacheExplorerPass : public PassInfoMixin<CacheExplorerPass> {
public:
  PreservedAnalyses run(Function &F, FunctionAnalysisManager &AM);
};
```

By leveraging the `PassInfoMixin`, we eliminate alot of complexity needed for this approach. Now, all we need to do is simply implement the `run` function that parses throught the IR. Here is where things get a little tricker. Conceptually the line is still straight: scan code, detect certain instruction types, and then insert a function call right before. Of course, the implementation is a little less straightforward^7[Mainly just because it requires a lot of LLVM documentation referencing]. The first step is to set up and collect the necessary information for the parsing. This means three things: the context of the entire module (program) that is being ran on the current function, the context of this module, and then the "tagging" functions we want to insert in the IR. For now, there will be two tag functions: `__tag_mem_load` and `__tag_mem_share`. Here is the start of our LLVM pass:

```cpp
PreservedAnalyses CacheExplorerPass::run(Function &F,
                                         FunctionAnalysisManager &AM) {
  // Compilation unit and type factory
  Module *M = F.getParent();
  LLVMContext &Ctx = M->getContext();

  // Declare runtime tracking functions if they don't exist
  Function *TagLoad = M->getFunction("__tag_mem_load");
  if (!TagLoad) {
    FunctionType *LoadFnTy =
        FunctionType::get(Type::getVoidTy(Ctx),
                          {PointerType::getUnqual(Ctx), Type::getInt32Ty(Ctx),
                           PointerType::getUnqual(Ctx), Type::getInt32Ty(Ctx)},
                          false);
    TagLoad = Function::Create(LoadFnTy, Function::ExternalLinkage,
                               "__tag_mem_load", M);
  }

  Function *TagStore = M->getFunction("__tag_mem_store");
  if (!TagStore) {
    FunctionType *StoreFnTy =
        FunctionType::get(Type::getVoidTy(Ctx),
                          {PointerType::getUnqual(Ctx), Type::getInt32Ty(Ctx),
                           PointerType::getUnqual(Ctx), Type::getInt32Ty(Ctx)},
                          false);
    TagStore = Function::Create(StoreFnTy, Function::ExternalLinkage,
                                "__tag_mem_store", M);
  }
```

Now that the setup is out of the way, the program can start to analyze the IR. To accomplish this, we iterate thru our function `F` and extract every instruction from each basic block `BB`^8[A basic block is an idiomatic way to describe a section of code that has one entry and exit and has no branches]

```cpp
  // Instrument all load and store instructions
  for (auto &BB : F) {
    for (auto &I : BB) {

        // Handle LOAD instructions
      if (auto *LI = dyn_cast<LoadInst>(&I)) {
        auto data = prepareInstrumentation(M, Ctx, I, LI->getPointerOperand(),
                                           LI->getType());
        IRBuilder<> Builder(&I);
        Builder.CreateCall(TagLoad,
                           {data.Addr, data.SizeVal, data.File, data.Line});
      }
      // Handle STORE instructions
      else if (auto *SI = dyn_cast<StoreInst>(&I)) {
        auto data = prepareInstrumentation(M, Ctx, I, SI->getPointerOperand(),
                                           SI->getValueOperand()->getType());
        IRBuilder<> Builder(&I);
        Builder.CreateCall(TagStore,
                           {data.Addr, data.SizeVal, data.File, data.Line});
      }
    }

  }

  return PreservedAnalyses::none();
}
```

We're still missing one part^9[Technically two, but you'll have to take my word that `prepareInstrumentation` works]: our tagging functions. For phase 1, all that these tags will do is print to `stdou`

```c
void __tag_mem_load(void *addr, uint32_t size, const char *file,
                    uint32_t line) {
  printf("LOAD: %p [%u bytes] at %s:%u\n", addr, size, file, line);
}

void __tag_mem_store(void *addr, uint32_t size, const char *file,
                     uint32_t line) {
  printf("STORE: %p [%u bytes] at %s:%u\n", addr, size, file, line);
}
```

Now, with everything working correctly, we should see calls to these functions right before the IR executes loads and stores:

```llvm
call void @__tag_mem_store(
      ptr %arr,                    ; address being stored to
      i32 4,                       ; size (4 bytes for i32)
      ptr @.str,                   ; file name string
      i32 6                        ; line number
    )

store i32 42, ptr %arr, !dbg !15   ; Original store (preserved)
```

Phew. That was a lot. By the looks of it, this will be a long blog, because we're getting started with the main part next: simulating cache hardware with these tags.

## Phase 2: Hardware as Software

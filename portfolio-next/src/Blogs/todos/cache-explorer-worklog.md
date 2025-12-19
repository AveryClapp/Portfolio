---
title: "Cache Explorer: A Worklog"
date: ""
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

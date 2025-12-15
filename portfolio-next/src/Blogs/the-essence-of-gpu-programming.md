---
title: "The Essence of GPU Programming"
date: "11-20-2025"
preview: "GPU programming is a completely different computational paradigm compared to developing on a CPU. Threads execute in lockstep. Memory hierarchies are explicit. Serialization is everywhere. Here's your gateway into the architecture and optimization patterns that power video games and modern AI."
slug: "the-essence-of-gpu-programming"
tags: ["Technical"]
subtopics: ["CUDA", "Machine Learning", "High-performance Computing"]
---

## Fortnite & ChatGPT

For over a decade, gaming PCs lived or died by their GPU. When you were playing Fortnite with low FPS, it was because your graphics card couldn't keep up. In the last few years, GPUs have transcended gaming to become the foundation of modern AI. The same hardware that renders Fortnite also powers ChatGPT.

So what makes a GPU special compared to a CPU? Let's look at a simple example: a $4096 \text{ by } 4096$ matrix multiplication. While this may seem like an arbitrary problem to look at, linear algebra and matrix multiplication specifically power both computer graphics and neural network inference algorithms. For context, this problem requires around 68 billion multiplication operations... so who wins?

On highly optimized modern CPUs, we can expect a result anywhere from 20 to 40 seconds. On a modern GPU with an optimized algorithm? 0.007 seconds. To be fair, this isn't a fair comparison because it turns out that comparing CPUs to GPUs is the same thing as comparing apples to oranges. The architectural philosophies differ, allowing CPUs to handle complex tasks suited for your laptop and GPUs to handle massive parallel computations.

So, while the CPU processes the 68 billion operations through its ALUs and logic gates, the GPU launches thousands of threads carefully divided up across the problem space to complete the solution up to $5700$ times faster. So, GPU programming naturally evolved to dominate the video game and graphics sector, as millions of frame computations need to be done in fractions of a second. Now, with the rise of massive machine learning models, GPUs are employed to process large matrices. The workloads are different, but the pattern is the same: large-scale data parallelism.

But, as it turns out, coordinating thousands of threads executing simultaneously isn't trivial. To understand how GPUs achieve this, we need to look at their architecture and CUDA...

## The Software Model

CUDA stands for _Compute Unified Device Architecture_. The CUDA programming model^1[A distinction here is necessary because, as it turns out, CUDA can refer to different ideas depending on context] is hierarchy-based. We see this hierarchy take form in two distinct manners: thread organization and memory organizations.

### Thread Hierarchy

From the programmer's perspective, CUDA maintains three levels of organization:

1. **Thread:** The smallest unit of execution you program, a very lightweight and inexpensive worker.
1. **Block:** A collection of threads that cooperate and share memory.
1. **Grid:** A collection of blocks that execute the same kernel. Blocks within a grid are independent of one another and do NOT cooperate.

![Grid, Block, and Warps](/blog-images/the-essence-of-gpu-programming/grid-block-warp.png)

The hierarchy seems almost a little overcomplicated right? I mean, why not just launch a 1D array of threads and spare the complexity? Let's see why this is actually a strength of CUDA:

```cpp
__global__ void vectorAdd(float *A, float *B, float *C, int N) {
    // Calculate global index of this thread.
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < N) {
        C[idx] = A[idx] + B[idx];
    }
}

int main() {
    int N = 1024;
    int threadsPerBlock = 256;
    int blocksPerGrid = (N + threadsPerBlock - 1) / threadsPerBlock; // ceilDiv

    // Launch: 4 blocks, each with 256 threads = 1024 total threads
    vectorAdd<<<blocksPerGrid, threadsPerBlock>>>(d_A, d_B, d_C, N);
}
```

By imposing this strict hierarchy, CUDA gives the programmer a scale-agnostic solution to computational problems. Suppose `N = 2048` or `N = 4096`, this would run the same way, we would just launch more blocks^2[This is thanks to the `ceilDiv` computation, which is a neat trick to find the ceil(blocks) needed for a full computation]. This example doesn't reveal the superpower of CUDA blocks: the ability for threads to cooperate and share memory.

```cpp
__global__ void reduceSum(float *input, float *output, int N) {
    // Shared memory between all threads in the block
    __shared__ float sharedData[256];
    int tid = threadIdx.x;
    int idx = blockIdx.x * blockDim.x + tid;

    sharedData[tid] = input[idx];
    __syncthreads();  // Wait for all threads in this block to load

    // Reduction within block
    for (int stride = blockDim.x / 2; stride > 0; stride >>= 1) {
        if (tid < stride) {
            sharedData[tid] += sharedData[tid + stride];
        }
        __syncthreads();  // Wait for all threads in the block each iteration
    }

    // Only Thread 0 writes this block's result to avoid unnecessary writes
    if (tid == 0) {
        output[blockIdx.x] = sharedData[0];
    }
}
```

Blocks allow the programmer to structure their kernels in a way that allows optimized memory access and thread cooperation. The hierarchy isn't just organizational, it perfectly leverages software nuance with hardware capabilities. Just from the example above, we see how blocks support synchronization with `__syncthreads`^3[This is a CUDA _primitive_, which is a hardware accelerated operation specifically meant for blocks to use]). This forces all threads in a block to wait until everyone reaches a given point, which protects against unsafe reads/writes that may result in unexpected behavior or unpredictable race conditions.

### Memory Hierarchy

The reduction kernel just introduced `__shared__` memory, a memory space visible to all threads within a block. But why does this qualifier exist? Why not just use regular memory?

From the programmer's perspective, CUDA exposes multiple memory spaces, each with different scope and performance characteristics:

|              | **Global Memory (DRAM)** | **L2 Cache** | **Shared Memory/L1** | **Registers**       |
| ------------ | ------------------------ | ------------ | -------------------- | ------------------- |
| **Scope**    | All threads              | All SMs      | Threads within block | Per-thread          |
| **Capacity** | 16-80 GB                 | ~40 MB       | ~164 KB per SM       | 65K × 32-bit per SM |
| **Latency**  | ~400-800 cycles          | ~200 cycles  | ~30 cycles           | 1 cycle             |

The specific numbers aren't important, but look at the relationship between each layer of memory. The average DRAM operation is 20 times more expensive than a SMEM operation, which itself is 30 times slower than a register operation. Between DRAM and SMEM sits the L2 cache, a ~40MB pool shared across all SMs that helps reduce repeated global memory accesses. It should be pretty obvious then that as developers are crafting kernels, they try to stay away from DRAM as much as possible and instead try to load everything they need at the very start and only once into SMEM. Back to our reduction sample above:

```cpp
__global__ void reduceSum(float *input, float *output, int N) {
    // Setup code...

    // Reduction within block with global memory (DRAM)
    for (int stride = blockDim.x / 2; stride > 0; stride >>= 1) {
        if (tid < stride) {
            dram[tid] += dram[tid + stride];
        }
        __syncthreads();  // Wait for all threads in the block each iteration
    }

    // Write results
}
```

With 8 blocks of 256 threads, we would have 1024 global memory operations. This is terrible and would cost over 400,000 cycles for a simple reduction. Instead, with shared memory, which is what was done in the first example, we incur 400 cycles on the load and then only need to pay 30 cycles for the other 1024 operations, totaling just over 31000 cycles. Hopefully this makes sense so far, as the hardware gets even more confusing.

## The Hardware Hierarchy

Something that I've left out thus far is that when you launch these threads, they don't execute individually. The GPU groups them into **warps** of 32 threads that execute in lockstep: running the same instruction simultaneously on different data^4[This is known as SIMT: single instruction multiple threads. Adjacent to the ideas in [Flynn's Taxonomy](https://en.wikipedia.org/wiki/Flynn%27s_taxonomy) if you are familiar]. This is the hidden level of the hierarchy. In the reduction example, when 256 threads were launched per block, the hardware automatically organized them into 8 warps of 32 threads each. Why 32? That's a hardware decision by NVIDIA. A warp is the fundamental execution unit; it's what actually runs on the GPU. Individual threads are an abstraction for programmers; warps are the reality.

The overall efficiency of a warp is clearly then dependent on all 32 threads executing the same instruction. If a single thread in a warp encounters a conditional branch that causes its next instruction path to differ from other threads in the warp, this is known as _divergence_. Divergence is like a curse word in GPU language, as the GPU must then serialize the execution of one path while completely disabling the other(s). This forces parallel threads to run sequentially, which is a major performance killer. Below is a simple example:

```cpp
__global__ void divergentKernel(int *data) {
    int idx = threadIdx.x;
    if (idx % 2 == 0) {
        // Half the warp goes here
        data[idx] = expensiveComputation();
    } else {
        // Other half goes here
        data[idx] = differentComputation();
    }
    // GPU must serialize both paths 2x slower!
}
```

Now, how is the GPU structured? Luckily for us, the hardware aligns seamlessly with the software model described above. We have two main structures _within_ the GPU:

1. **Stream Multiprocessor:** Handles multiple CUDA blocks. If resources permit (cores, registers, caches, etc.), blocks are run in parallel. Each SM maintains its own collection of CUDA cores, schedulers, register files, shared memory, and L1 cache.
1. **CUDA Cores:** The hardware units that actually execute warp instructions. Analogous to ALUs in CPUs.

![Basic GPU Structure](/blog-images/the-essence-of-gpu-programming/gpu-sm.png)

### Warp Schedulers

Each SM contains 4 warp schedulers responsible for deciding which warps execute each clock cycle.^5[Modern GPUs run at ~1.5 GHz, so each cycle is roughly 0.66 nanoseconds, but the exact timing matters less than the fact that switching is instant.] These schedulers can issue up to 4 warps per cycle to the execution units.

The beautiful part about GPU scheduling: it doesn't incur the heavy costs associated with context switching like CPUs do. Since each thread's registers stay resident in the register file, there's no need to save or restore state. The scheduler simply points to a different set of registers.

This free switching is crucial because large-scale GPU computations are inherently memory bound. A single global memory read can take 400+ cycles. Instead of wasting hundreds of cycles waiting, warp schedulers simply "bench" the waiting warp and execute one that's ready. This technique, referred to as latency hiding, is how GPUs achieve high throughput despite slow memory^6[Latency hiding has been around since the inception of modern computers. Your OS performs a similar technique when faced with a memory-bound operation like page faults or file I/O] . By constantly rotating through warps, schedulers keep the CUDA cores busy.

### CUDA Cores

After the scheduler selects a warp, it dispatches that warp's instruction to the appropriate execution units. Here's where SIMT happens in practice: all 32 threads in the warp execute the same instruction simultaneously, each operating on different data from their own registers.

The SM contains multiple types of specialized cores^7[Specific structure varies by GPU model. The specifications below are for the [Ampere](https://www.nvidia.com/en-us/data-center/ampere-architecture/) architecture]:

- **64 FP32 cores** for single-precision floating point
- **64 INT32 cores** for integer operations
- **32 FP64 cores** for double-precision floating point
- **4 Tensor Cores** for accelerated matrix multiplication

![CUDA Core Structure](/blog-images/the-essence-of-gpu-programming/cuda-core.png)

Ideally, all 32 threads execute in a single cycle on 32 parallel cores. If you have 64 FP32 cores and issue 2 FP32 warps simultaneously, both can execute in parallel.

### Registerfile

Registers are the fastest memory on the GPU^8[Each load op takes 1 cycle], an order of magnitude faster than L1 cache and hundreds of times faster than global memory. Each SM has 65,536 32-bit registers stored in its registerfile. These serve as private per-thread storage for local variables.

The catch: these registers must be shared among all active threads. If each thread uses 64 registers, the SM can only run 1,024 threads (65,536 / 64). The SM could theoretically run 2,048 threads, resulting in half of the capacity being unused. This is register pressure. High register usage per thread limits concurrent threads, which limits the number of warps available for latency hiding. A kernel using 32 registers per thread allows twice as many concurrent threads as one using 64 registers, potentially doubling throughput.

A key metric GPU programmers use to measure register pressure is _occupancy_. Occupancy is the ratio of active warps scheduled on an SM to the maximum possible warps the SM could support based on its physical capacity (the theoretical maximum). High occupancy is essential for latency hiding.

### Shared Memory

Caching, like registers, is a fundamental feature of computer architecture. By keeping frequently used data and instructions close to the computation units, we eliminate wasted time "looking" for data in memory. A great way of thinking about shared memory is that it's a programmable cache—up to 164 KB of fast on-chip memory (~20-30 cycles) shared by all threads in a block.

Since this storage is completely dictated by the developer, the pattern for high-performance kernels becomes pretty standard:

1. Load data from global memory into shared memory
2. Run computation/algorithm using the cached data
3. Aggregate results from shared memory and write back to global memory

By loading data once and reusing it many times, you amortize the cost of slow global memory access across many fast operations. The ultimate example of this is _tiling_^9[Breaking the computation up into smaller chunks to leverage SMEM and registers for faster runtime], a popular pattern in algorithms like matrix multiplication. Here's a practical example of how data reuse is great for matrix multiplication:

```cpp
__global__ void tiledMatMul(float *A, float *B, float *C, int N) {
    // Initialize SMEM caches
    __shared__ float tileA[TILE_SIZE][TILE_SIZE];
    __shared__ float tileB[TILE_SIZE][TILE_SIZE];

    int row = blockIdx.y * TILE_SIZE + threadIdx.y;
    int col = blockIdx.x * TILE_SIZE + threadIdx.x;
    float sum = 0.0f;

    for (int t = 0; t < N / TILE_SIZE; t++) {
        // Fill SMEM before computation
        tileA[threadIdx.y][threadIdx.x] = A[row * N + (t * TILE_SIZE + threadIdx.x)];
        tileB[threadIdx.y][threadIdx.x] = B[(t * TILE_SIZE + threadIdx.y) * N + col];
        __syncthreads();

        // Compute using data in SMEM
        for (int k = 0; k < TILE_SIZE; k++) {
            sum += tileA[threadIdx.y][k] * tileB[k][threadIdx.x];
        }
        __syncthreads();
    }

    // Write result back to global memory
    if (row < N && col < N) {
        C[row * N + col] = sum;
    }
}
```

This demonstrates the power of shared memory. For a 32×32 tile:

- **Without shared memory:** Each thread needs 32 values from A and 32 from B. With 1,024 threads per block, that's ~65,000 global memory accesses per tile.
- **With shared memory:** We load each tile once (2,048 loads total), then each thread reuses those values 32 times. Same computation, 32x fewer global memory accesses.

Now that we understand how threads map to hardware and why memory hierarchy matters, let's examine the optimization techniques that separate adequate CUDA code from high-performance kernels.

## Writing Efficient CUDA

Now that we've established a good baseline on what it takes to write GPU programs in CUDA, let's look at a few common optimization strategies.

### Bank Conflicts

Think back to our tiled matrix multiplication above. Consider this SMEM access pattern:

```cpp
__shared__ float tileA[32][32];
// Thread 0 accesses tileA[0][0] → Bank 0
// Thread 1 accesses tileA[0][1] → Bank 1
// Thread 2 accesses tileA[0][2] → Bank 2
```

There is a hidden bottleneck here. It turns out the shared memory is implemented into 32 units called _banks_, where consecutive 4-byte words are assigned to consecutive banks in round-robin fashion. When multiple threads in a warp access the same bank at the same time, they serialize execution. This is particularly costly as it requires all threads to synchronize themselves and then execute one at a time. Tracing through row access:

```cpp
float val = tileA[threadIdx.y][0];
// Thread 0: tileA[0][0] → Bank 0
// Thread 1: tileA[1][0] → Bank 0  (conflict)
// Thread 2: tileA[2][0] → Bank 0  (conflict)
```

Every row starts at the same bank, causing 32-way serialization. The fix is simple yet effective: add one element of padding to offset each row.

```cpp
__shared__ float tileA[32][33];  // 33rd element unused, shifts banks
// With padding, rows now start at different banks:
// Thread 0: tileA[0][0] → Bank 0
// Thread 1: tileA[1][0] → Bank 1  (no conflict)
// Thread 2: tileA[2][0] → Bank 2  (no conflict)
```

### Coalesced Memory Accessing

Here is a naive kernel:

```cpp
__global__ void matmul(int M, int N, int K, const float *A,
                                        const float *B, float *C) {
  const uint x = blockIdx.x * blockDim.x + threadIdx.x;
  const uint y = blockIdx.y * blockDim.y + threadIdx.y;

  if (x < M && y < N) {
    float tmp = 0.0;
    for (int i = 0; i < K; ++i) {
      tmp += A[x * K + i] * B[i * N + y];
    }
    C[x * N + y] = tmp;
  }
}
```

Generally, if you are trying to squeeze out the performance, it's a good idea to access consecutive memory as this maximizes cache efficiency. In the context of GPUs, this means that threads within a warp should do their best to access sequential memory. In our naive kernel, this is completely not the case. In the inner loop, `A[x * K + i]` maps each thread to the start of a different row of A. Each access is therefore `K * sizeof(float)` bytes away from its neighboring thread in the warp. Let's fix that:

```cpp
__global__ void matmul(int M, int N, int K, const float *A,
                                        const float *B, float *C) {
  const int x = blockIdx.x * BLOCKSIZE + (threadIdx.x / BLOCKSIZE);
  const int y = blockIdx.y * BLOCKSIZE + (threadIdx.x % BLOCKSIZE);

  if (x < M && y < N) {
    float tmp = 0.0;
    for (int i = 0; i < K; ++i) {
      tmp += A[x * K + i] * B[i * N + y];
    }
    C[x * N + y] = tmp;
  }
}
```

Restructuring this assigns `BLOCKSIZE` threads to each row. So if `BLOCKSIZE == 32`, one whole warp shares the `x` value and then one thread is consecutively assigned to each column.

### Vectorized Reads and Writes

Ok. Memory accessing looks better, but this is still very slow. If you recall the pattern above, we want to load from global memory into shared memory for data reuse instead of calling directly from `A` and `B` every time. This could look something like:

```cpp
__global__ void matmul_tiled(int M, int N, int K, const float *A,
                             const float *B, float *C) {
  // Shared memory tiles
  __shared__ float tileA[BLOCKSIZE][BLOCKSIZE + 1];
  __shared__ float tileB[BLOCKSIZE][BLOCKSIZE + 1];

  const int x = blockIdx.x * BLOCKSIZE + (threadIdx.x / BLOCKSIZE);
  const int y = blockIdx.y * BLOCKSIZE + (threadIdx.x % BLOCKSIZE);

  const int tx = threadIdx.x % BLOCKSIZE;
  const int ty = threadIdx.x / BLOCKSIZE;

  float tmp = 0.0f;

  // Loop over number of tiles
  for (int t = 0; t < K / BLOCKSIZE; ++t) {
    // Load one tile from both A and B into shared memory
    tileA[ty][tx] = A[x * K + (t * BLOCKSIZE + tx)];
    tileB[ty][tx] = B[(t * BLOCKSIZE + ty) * N + y];

    __syncthreads();

    // Compute using shared memory
    for (int k = 0; k < BLOCKSIZE; ++k) {
      tmp += tileA[ty][k] * tileB[k][tx];
    }

    __syncthreads();
  }

  C[x * N + y] = tmp;
}
```

However, this approach issues 32 separate 4-byte loads per warp. Loads are inherently expensive as they are memory-bound, so having 32 of them is a performance killer. Luckily, modern GPUs allow the software to load 16 bytes at a time. Additionally, NVIDIA gives us a novel datatype `float4` that works perfectly for our usecase. Instead of 32 4-byte loads, we can perform 32 16-byte loads, drastically reducing our time waiting for memory.^10[The only caveat here is that `float4` usage requires 16-byte alignment]

```cpp
    float4 a = *reinterpret_cast<const float4*>(
        &A[x * K + (t * BLOCKSIZE + threadIdx.x)]
    );

    float4 b = *reinterpret_cast<const float4*>(
        &B[(t * BLOCKSIZE + ty) * N + y * 4]
    );

    // Store into shared memory (unpack float4)
    tileA[ty][tx * 4 + 0] = a.x;
    tileA[ty][tx * 4 + 1] = a.y;
    tileA[ty][tx * 4 + 2] = a.z;
    tileA[ty][tx * 4 + 3] = a.w;

    tileB[ty][tx * 4 + 0] = b.x;
    tileB[ty][tx * 4 + 1] = b.y;
    tileB[ty][tx * 4 + 2] = b.z;
    tileB[ty][tx * 4 + 3] = b.w;
```

## Back to Reality

Remember the opening question: how does the same hardware power both Fortnite and ChatGPT? Now you know. Both workloads exploit massive data parallelism. Whether that is Fortnite rendering millions of pixels per frame, or language models multiplying massive weight matrices, the techniques are identical. Organize computation to match warp execution, tile data through the memory hierarchy, and eliminate serialization bottlenecks. Do these and you can call yourself a GPU programmer.

So... that's the essence. We've definitely covered a lot of ground here, and this was by far the most dense blog I've done. I find GPU programming to be very fascinating as it relies on many different skills^11[Spatial Reasoning, Computer Architecture, Math, C++, etc] to be great at. If this stuff was interesting to you, I recommend checking out an Anthropic Engineer's [blog post](https://siboehm.com/articles/22/CUDA-MMM)^12[You'll notice I was very inspired by his website design as well] iteratively improving CUDA kernels to reach cuBLAS^13[NVIDIA's proprietary state-of-the-art matrix multiplication toolset.] performance levels.

In my research, I develop some pretty complicated kernels in order to take advantage of emergent sparsity of LLMs. Feel free to check that [repo](https://github.com/AveryClapp/ESMM-Research) out if you want more examples on highly optimized kernels.

---
title: "Low-Latency Orderbook: A Worklog"
date: "08-29-2025"
preview: "Building an ultra low-latency Orderbook in C++"
slug: "low-latency-orderbook-worklog"
tags: ["Software", "Quant"]
---

## What is an Orderbook?

An Orderbook is the quintessential piece of software that underlies all financial exchanges and trading shops. Luckily, the concept behind how it works isn't too complicated. Orders are classified into two categories: bids, and asks. At an arbitrary price level, a bid would be a contract to buy the given asset at the price for a designated quantity. Likewise, a sell would be a contract to sell a given asset at that price. It should be relatively trivial to see that in any market, the best bid will always be less than the best ask^1[Or else the orders would be fulfilled until this invariant is true]. So, a very generalized way to think of an Orderbook is that it is just a matching engine.

Now, sparing some nuance in different types of Orders, this is pretty much what an Orderbook is end-to-end. So, you may be asking yourself, "If all of these exchanges and quant funds rely so heavily on a simple idea, where is the edge?". Well, in the world of low-latency programming, an area of software that Orderbooks certainly fall into, it becomes a game of speed. So the development of such a simple concept evolves into an extremely nuanced process. Thus, the rest of this blog will detail my journey of making the fastest Orderbook I can with C++ by taking advantage of subtle language and memory techniques, niche data structures, and hardware optimizations.

## Iteration 0: Naive Implementation

Before we get into the nitty-gritty optimizations, let us first get an idea of the structure of the program. We'll need three steps:

1. Receive input. This pretty much just means order metadata or cancel metadata (just an ID).
2. Parse the input and create an Order/Cancel structure in our program
3. Match the order or cancel the order

Pretty simple right? Let's dive a little further: how exactly should we handle the dispatch between a `Cancel` and an `Order`?

```cpp
enum class MessageType : uint8_t { Cancel, Order };
struct NewOrderData {
  ID id;               // 8 bytes
  Price price;         // 4 bytes
  Quantity quantity;   // 4 bytes
  Direction direction; // 1 byte
};

struct CancelData {
  ID order_id; // 8 bytes
};

struct Message {
  MessageType type; // 1 Byte
  union {
    NewOrderData new_order;
    CancelData cancel;
  } data; // 17 Bytes
};
```

With this approach, receiving a `struct Message` and parsing it becomes as simple as checking the type and the corresponding data. An interesting thing to note here is that fields in a `union` in C++ `structs` all hold the same spot in memory, but only one member can be "active" at a time. This is a small and premature optimization in terms of the memory footprint of our program.

Now that steps 1 and 2 are done, all that is left before we start optimizing is handling `Order` and `Cancel` messages. At a high level, when the book receives an order it should start trying to match existing ones. This means that if a user submits a bid at price 100, the book should match that against all asks that have a price $<= 100$. Canceling, on the other hand, is handled in O(1) time by an `unordered_map<ID, Order*>`, allowing us to query based on the provided ID and remove that Order from the book. With the current architecture, the Order throughput is around 635K per second.

## Iteration 1: Order Pooling

Perhaps the worst thing you can do in a latency-sensitive environment is to scatter system calls throughout the hot path^2[The hot path is the most critical section of code in HFT systems. Typically, this handles execution]. Briefly, system calls require the kernel to take control of the process, which requires privilege escalation, context saving, and a trap table lookup. Thus, when the program calls `new`, we potentially make a syscall every single time which kills the potential throughput. While `delete` doesn't necessarily incur the extreme overhead of a syscall, it is also expensive due to the potential [coalescing of fragmented memory blocks](<https://en.wikipedia.org/wiki/Coalescing_(computer_science)>).

Evidently, a mechanism to avoid these operations would be extremely beneficial. Our saving grace comes to us in the form of an `OrderPool`. Inspired by Thread Pools, a common practice in multi-threaded programs, our `OrderPool` has a few responsibilities: pre-allocate a large chunk of memory to hold orders, a `get()` function to fetch memory for an `Order`, and a `release()` function that will return the memory back to the pool and mark the Order as available.

The functionality relies on two vectors, the actual `pool_` and a `free_list_` to store available indices. Here was my implementation:

```cpp
OrderPool::OrderPool(size_t num) {
  pool_.reserve(num);
  free_list_.reserve(num);
  for (size_t i = num; i > 0; --i) {
    pool_.emplace_back();
    free_list_.push_back(i - 1);
  }
}

Order *OrderPool::get() {
  if (free_list_.empty()) [[unlikely]] {
    grow();
  }
  size_t next_available = free_list_.back();
  free_list_.pop_back();
  return &pool_[next_available];
}

void OrderPool::release(Order *order) {
  free_list_.push_back(static_cast<size_t>(get_index(order)));
}

std::ptrdiff_t OrderPool::get_index(Order *order) {
  // C++ implicitly divides by sizeof(Order) here
  return order - pool_.data();
}

void OrderPool::grow() {
  size_t old_size = pool_.size();
  size_t new_size = old_size * 2;

  pool_.resize(new_size);
  free_list_.reserve(new_size);

  for (size_t i = new_size; i > old_size; --i) {
    free_list_.push_back(i - 1);
  }
}
```

By replacing any `new` call with `.get()` and `delete` with `release`, we nearly **doubled** our throughput to a max throughput of 1.25M orders per second.

## Iteration 2: Better Data Structure Selection

The next big change is rethinking the data structures…

Orders are stored in each level via: `std::list<Order *>` . This is a linked list of orders, which, you guessed it, is terrible for cache performance. Node-based traversal has its uses, but it is terrible for cache performance. By definition, nodes do not have to be contiguous in memory, making it a cache's worst enemy. However, what is really neat about `std::list` for this use case is that it inherently supports time-based priority within price-levels, which is crucial for Orderbooks^3[The SEC requires time-based priority for orders. So yes, this is a very important aspect]. If you are wondering why this is naturally a feature of lists, consider the idea of FIFO, or first in first out. When an Order is added to the end of the list, it must wait its turn to be "consumed" at the front of the list. Are there any other data structures that do this? Yes.

```cpp
std::list<Order *> orders;
// Change to:
std::deque<Order *> orders;
```

While `std::deque` does not store _all_ elements contiguously, it is structured in chunks and each individual chunk has Orders sequential in memory.

A small adjustment must also be made to: `std::unordered_map<ID, Order *> order_map_`. Hashing, it turns out, can be an expensive operation over time. `ID` is aliased to `unsigned long`, which, on my computer architecture, is 8 bytes. Thus, every time `order_map_` is accessed, it must hash the 8 byte ID. While this is admittedly not a **huge** cost, we can rely on the invariant that all IDs are unique and create our own hash function:

```cpp
struct IDHash {
  size_t operator()(ID id) const noexcept { return static_cast<size_t>(id); }
};

// Then change to:
std::unordered_map<ID, Order *, IDHash> order_map_
```

With this next round of changes, the benchmarks report an Order throughput of 1.85M Orders per second.

## Iteration 3: Smaller Optimizations

This last section will take a look at a few different smaller optimizations around cache friendliness, branch prediction, and inlining.

To start, take a look at the current `Order` struct:

```cpp
struct Order {
  ID id;               // 8 Bytes
  Direction direction; // 1 Byte
  Price price;         // 4 Bytes
  Quantity quantity;   // 4 Bytes
};
```

Any basic lower-level computer science course tells you that variables should be positioned at an address that is a multiple of the variable's size. Luckily, modern compilers are pretty smart, so it will automatically pad space to enforce this. Meaning that, if we take a look at this in a [compiler explorer](https://godbolt.org/):

```asm
mov     QWORD PTR [rbp-32], w
mov     BYTE PTR [rbp-24], x
mov     DWORD PTR [rbp-20], y
mov     DWORD PTR [rbp-16], z
```

Above, we see that even though the second instruction moves 1 byte at address `rbp-24`, the value assigned to price is at `rbp-20`, meaning the compiler padded 3 bytes of extra space to enforce alignment. This is simply a waste of space and can be eliminated on the programmer's side. What if we do this?

```cpp
struct Order {
  ID id;               // 8 Bytes
  Price price;         // 4 Bytes
  Quantity quantity;   // 4 Bytes
  Direction direction; // 1 Byte
};
// Compiles to:
mov     QWORD PTR [rbp-32], 12345
mov     DWORD PTR [rbp-24], 1
mov     DWORD PTR [rbp-20], 5000
mov     BYTE PTR [rbp-16], 100
```

This looks much better, and will save 3 bytes of excess padding for every Order, which adds up. Now, what about the concept of _branch prediction_? Essentially, branches^4[If-else blocks, for example] stop [instruction pipelining](https://www.geeksforgeeks.org/computer-organization-architecture/arithmetic-pipeline-and-instruction-pipeline/) because the CPU must wait for the condition to be evaluated before continuing. In an effort to get around this, CPUs start guessing which way the branch will go and start speculatively executing instructions on the most probable branch. As programmers, we can help the CPU along with `[[likely]]` and `[[unlikely]]` directives by compiling the likely block into the "fall-through path"

```cpp
if (condition) [[likely]] {
    likely_function();
} else [[unlikely]] {
    unlikely_function();
}
```

```asm
test    %rax, %rax
jz      .unlikely_function
call    common_function
```

This example demonstrates that given a condition on line 1, if the unlikely condition happens it will incur a cost and jump to that section in memory. However, if the condition evaluates to the likely block, no jump is needed and it will "fall-through", which in assembly simply means it doesn't jump. So, adding these directives in the hot path helps the CPU with pipelining and branch prediction^5[An interesting caveat to this is that declaring one branch as `[[likely]]` does not imply that the other branch is `[[unlikely]]`. It is not complementary].

Ok... last thing: _inlining_. Inlining tells the compiler to put the code directly into the calling function. This is great because you don't need to incur the cost of a jump instruction. Unfortunately, inlining everything isn't the best idea. Imagine you have a helper function that you call from 20 different spots across your program. Not only will you have 20 different copies of this code, bloating your executable, but it is actually bad for the instruction cache and will lead to [cache thrashing](https://medium.com/@ali.gelenler/cache-trashing-and-false-sharing-ce044d131fc0). A general rule of thumb is that a function should only be inlined if it is small and is called in relatively few spots. So the only things I changed here were:

```cpp
void Orderbook::handle_buy(Order *buy_order) {...}
// To
inline void Orderbook::handle_buy(Order *buy_order) {...}


void Orderbook::handle_sell(Order *sell_order) {...}
// To
inline void Orderbook::handle_sell(Order *sell_order) {...}

void OrderbookLevels::add_ask(Order *ask) {...}
// To
inline void OrderbookLevels::add_ask(Order *ask) {...}

void OrderbookLevels::add_bid(Order *bid) {...}
// To
inline void OrderbookLevels::add_bid(Order *bid) {...}
```

Finally, for the third and last iteration, the benchmarks report a total throughput of 1.89M orders per second.^6[Yup... all of that for a 2% increase]

# Iteration X: Final Results & Reflections

It goes without saying that this is by no means the theoretical maximum throughput. HFT firms will go so far as to develop their own operating system tools to squeak out a few microseconds of edge against their competition. This project has been in the works for a while, partly because I redid it 4 times, but also because this is pretty neat stuff. The link to the GitHub is [here](https://github.com/AveryClapp/Orderbook). If I'm a bot and missed any low-hanging fruit, let me know or just create a PR. Thanks for reading!

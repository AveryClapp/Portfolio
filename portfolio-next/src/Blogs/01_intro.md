---
title: "Understanding Hash-Based Regression Testing"
date: "2024-03-21"
preview: "An exploration of how hash-based regression testing works in practice,
including its benefits and limitations."
slug: "hash-based-testing"
notes:
  - number: 1
    title: "Key Insight"
    content: "The main downside of hash-based regression testing during refactoring is that it doesn't check numerical stability."

---

# Understanding Hash-Based Regression Testing {1}

Hash-based regression testing is an innovative approach to ensuring code
changes don't introduce unexpected behaviors. Let's explore how it works
and when to use it.

## How It Works {2}

The core concept is straightforward:
1. Generate a hash of the function's output for a set of test inputs
2. Store these hashes as the expected results
3. After code changes, compare new hashes with stored ones

```python
def compute_output_hash(func, test_input):
    result = func(test_input)
        return hashlib.sha256(str(result).encode()).hexdigest()

# BCA-202N: Programming in Python
## Unit 3 Master Exam Revision Notes: Decision Making, Branching, Iteration & Functions
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `15140dd2-9187-5af3-bbe4-6817a037e910` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Conditional Branching: if Statement, if-else Statement, if-elif-else Ladder Architecture**
- [x] **Nested Decision Structures and Truth Value Testing (Truthy and Falsy Values)**
- [x] **While Loop: Entry-Controlled Iteration, Infinite Loops, while-else Construct Execution Semantics**
- [x] **For Loop: Sequence Iteration, range(start, stop, step) Generator, for-else Construct Execution Semantics**
- [x] **Loop Control Jump Statements: break (Immediate Loop Termination), continue (Skip Current Iteration), pass (Null Statement)**
- [x] **List Comprehensions: Compact Syntax [expr for item in iterable if condition], Nested Comprehensions**
- [x] **Dictionary and Set Comprehensions: {k: v for ...} and {x for ...}**
- [x] **Defining Functions in Python: def Keyword, Function Signature, docstrings (__doc__)**
- [x] **Function Parameters and Arguments: Positional Arguments, Keyword Arguments, Default Parameter Trap (Mutable Defaults)**
- [x] **Arbitrary Variable-Length Arguments: *args (Positional Tuple) and **kwargs (Keyword Dictionary)**
- [x] **Variable Scope & Lifetime: LEGB Rule (Local, Enclosing, Global, Built-in), global and nonlocal Keywords**
- [x] **Functional Programming Primitives: Anonymous Functions (lambda), map(), filter(), reduce() (functools)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the syntax of the `if-elif-else` ladder in Python?
**Model Answer:**
```python
if condition1:
    # statements
elif condition2:
    # statements
else:
    # default statements
```

### Q2. [2 Marks] How does the `else` block behave in a `for` or `while` loop in Python?
**Model Answer:**
The `else` block executes **only if the loop terminates normally** (without encountering a `break` statement). If the loop exits via `break`, the `else` block is skipped.

### Q3. [2 Marks] Differentiate between `break` and `continue`.
**Model Answer:**
- `break`: Immediately terminates the entire loop and transfers control to the statement after the loop.
- `continue`: Aborts the remainder of the current iteration and jumps to the next iteration of the loop.

### Q4. [2 Marks] What is the difference between positional arguments and keyword arguments?
**Model Answer:**
- Positional arguments must be passed in the exact order declared in the function signature.
- Keyword arguments are passed by explicit parameter name (`func(age=20, name='Amit')`), allowing arbitrary order.

### Q5. [2 Marks] Explain `*args` and `**kwargs` in Python function definitions.
**Model Answer:**
- `*args`: Collects an arbitrary number of extra positional arguments into a **tuple**.
- `**kwargs`: Collects an arbitrary number of extra keyword arguments into a **dictionary**.

### Q6. [2 Marks] What are lambda functions in Python?
**Model Answer:**
Lambda functions are anonymous, single-line functions created with the `lambda` keyword:
`add = lambda a, b: a + b`
They can take any number of arguments but contain only a single expression whose evaluated value is returned.

### Q7. [2 Marks] What is the purpose of the `global` keyword?
**Model Answer:**
The `global` keyword tells Python that a variable assignment inside a local function scope refers to a global variable defined outside, preventing the creation of a local shadow variable.

### Q8. [2 Marks] What does the `nonlocal` keyword do?
**Model Answer:**
`nonlocal` binds an identifier to a variable in the nearest enclosing (outer) non-global function scope, essential in nested functions and closures.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the LEGB Rule for Variable Scope Resolution in Python.
**Model Answer:**
### The LEGB Scope Hierarchy
When a variable is referenced in Python, the interpreter searches four scopes sequentially:
1. **L - Local**: Inside the currently executing function.
2. **E - Enclosing**: Inside enclosing/nested functions (from nearest to furthest).
3. **G - Global**: At top-level of module or declared with `global`.
4. **B - Built-in**: Python's pre-loaded standard namespace (`print`, `len`, `range`, `ValueError`).

If the identifier is not found in any of these four scopes, Python raises a `NameError`.

### Q2. [5 Marks] Explain Recursion in Python and How Recursion Limit is Managed.
**Model Answer:**
Recursion occurs when a function calls itself to solve smaller sub-problems. Every recursive function requires:
1. **Base Case**: Halting condition that stops recursion.
2. **Recursive Step**: Progress toward base case.

Python protects against infinite stack overflows via `sys.getrecursionlimit()` (default 1,000):
```python
import sys
print("Current limit:", sys.getrecursionlimit()) # 1000
sys.setrecursionlimit(2000) # Increases limit if strictly necessary
```

### Q3. [5 Marks] Explain `map()`, `filter()`, and `reduce()` Built-in Functional Utilities.
**Model Answer:**
| Function | Purpose | Syntax | Example |
| :--- | :--- | :--- | :--- |
| **`map()`** | Applies a function to all items in an iterable | `map(func, iterable)` | `list(map(lambda x: x*2, [1,2,3])) -> [2,4,6]` |
| **`filter()`** | Filters elements where condition function returns True | `filter(func, iterable)` | `list(filter(lambda x: x%2==0, [1,2,3,4])) -> [2,4]` |
| **`reduce()`** | Cumulatively reduces iterable to single scalar value (from `functools`) | `reduce(func, iterable)` | `reduce(lambda a,b: a*b, [1,2,3,4]) -> 24` |

### Q4. [5 Marks] Explain Default Arguments and the 'Mutable Default Argument' Trap.
**Model Answer:**
Default argument expressions are evaluated **once at function definition time**, not each time the function is called.

```python
# BAD: Default list persists across calls
def append_bad(val, lst=[]):
    lst.append(val)
    return lst

# GOOD: Using None as sentinel
def append_good(val, lst=None):
    if lst is None:
        lst = []
    lst.append(val)
    return lst
```


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Write a Complete Recursive Program in Python for the Towers of Hanoi Problem with Step-by-Step Move Logging.
**Comprehensive University Solution:**
```python
"""
MJPRU Examination Model Program: Unit 3
Towers of Hanoi - Recursive Mathematical Solution
"""

def towers_of_hanoi(n, source_rod, destination_rod, auxiliary_rod):
    """
    Solves Towers of Hanoi puzzle for n disks.
    Total moves required = 2^n - 1
    Time Complexity: O(2^n)
    """
    if n == 1:
        print(f"Move Disk 1 directly from Rod {source_rod} -> Rod {destination_rod}")
        return 1
    
    moves = 0
    # Step 1: Move top n-1 disks from Source to Aux using Dest as helper
    moves += towers_of_hanoi(n - 1, source_rod, auxiliary_rod, destination_rod)
    
    # Step 2: Move the nth (largest) disk directly to Dest
    print(f"Move Disk {n} from Rod {source_rod} -> Rod {destination_rod}")
    moves += 1
    
    # Step 3: Move the n-1 disks from Aux to Dest using Source as helper
    moves += towers_of_hanoi(n - 1, auxiliary_rod, destination_rod, source_rod)
    
    return moves

# Execution
disks = 3
print(f"Solving Towers of Hanoi for {disks} disks (Expected moves: {2**disks - 1}):\n")
total = towers_of_hanoi(disks, 'A', 'C', 'B')
print(f"\nPuzzle solved successfully in {total} total moves!")
```

### Q2. [10/15 Marks] Explain Python Decorators in Depth (Function Wrappers, `@` syntax, and Decorators with Arguments) with Full Code.
**Comprehensive University Solution:**
### Comprehensive Guide to Python Decorators
A decorator is a design pattern that dynamically alters or extends the behavior of a function or method without permanently modifying its source code.

```python
import time
from functools import wraps

# Execution Timing Decorator
def execution_timer(func):
    @wraps(func) # Preserves original function name and docstring
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        print(f"[PERF] Function '{func.__name__}' took {(end_time - start_time)*1000:.3f} ms")
        return result
    return wrapper

# Applying Decorator using @ syntactic sugar
@execution_timer
def calculate_factorial(n):
    """Calculates factorial recursively."""
    fact = 1
    for i in range(1, n + 1):
        fact *= i
    return fact

# Invocation
val = calculate_factorial(5000)
print(f"Result length: {len(str(val))} digits")
print(f"Function Name preserved: {calculate_factorial.__name__}")
```

### Q3. [10/15 Marks] Write a Program to Implement Binary Search and QuickSort Algorithms in Python with Big-O Complexity Analysis.
**Comprehensive University Solution:**
```python
# QuickSort and Binary Search Implementation

def quicksort(arr):
    """Divide-and-conquer QuickSort: Average O(n log n), Worst O(n^2)"""
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

def binary_search(arr, target):
    """Binary search on sorted array: O(log n)"""
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

data = [45, 12, 85, 32, 89, 39, 69, 44, 42, 1, 10]
sorted_data = quicksort(data)
print("Sorted Array:", sorted_data)

target = 42
idx = binary_search(sorted_data, target)
print(f"Target {target} found at index: {idx}")
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Master the Towers of Hanoi recursive derivation, LEGB variable scoping rules, and decorators with `@wraps`.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
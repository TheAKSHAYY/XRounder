# BCA-202N: Programming in Python
## Unit 2 Master Exam Revision Notes: Operators, Expressions & Creating Python Programs
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `c4a7ae5d-8bfb-5927-a617-a3980ee5c02a` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Arithmetic Operators: Addition (+), Subtraction (-), Multiplication (*), True Division (/), Floor Division (//), Modulo (%), Exponentiation (**)**
- [x] **Relational / Comparison Operators: ==, !=, >, <, >=, <=, Chained Comparisons (a < b < c)**
- [x] **Logical Operators: and, or, not (Short-Circuit Evaluation Semantics)**
- [x] **Bitwise Operators: Bitwise AND (&), OR (|), XOR (^), Inversion (~), Left Shift (<<), Right Shift (>>)**
- [x] **Assignment and Augmented Operators: =, +=, -=, *=, /=, //=, %=, **=**
- [x] **Identity and Membership Operators: is vs == (Object Identity vs Value Equality), in and not in Operators**
- [x] **Ternary Conditional Expression: x if condition else y Syntax and Precedence**
- [x] **Operator Precedence & Associativity Hierarchy: BEDMAS / PEMDAS Order of Evaluation**
- [x] **Python Collection Primitives: Lists (Mutable, Ordered, Indexable), List Methods (append, extend, pop, sort)**
- [x] **Tuples: Immutable Sequences, Packing and Unpacking, Single Element Tuple Syntax (1,)**
- [x] **Dictionaries (dict): Key-Value Mappings, Hashing Requirements, Dict Methods (keys, values, items, get, update)**
- [x] **Sets (set): Unordered Unique Elements, Set Operations (Union |, Intersection &, Difference -, Symmetric Difference ^)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the difference between `/` and `//` operators in Python?
**Model Answer:**
`/` is **True Division**, always returning a `float` (e.g., `7 / 2 = 3.5`). `//` is **Floor Division**, returning the greatest integer less than or equal to the quotient (e.g., `7 // 2 = 3`, `-7 // 2 = -4`).

### Q2. [2 Marks] What does the exponentiation operator `**` do?
**Model Answer:**
`**` raises the left operand to the power of the right operand: e.g., `2 ** 3 = 8` and `16 ** 0.5 = 4.0`.

### Q3. [2 Marks] Differentiate between `==` and `is` in Python.
**Model Answer:**
`==` tests **value equality** (whether both objects hold identical data). `is` tests **identity equality** (whether both variables point to the exact same memory address, `id(a) == id(b)`).

### Q4. [2 Marks] Explain membership operators `in` and `not in`.
**Model Answer:**
Membership operators test whether a specified element is present in a collection (string, list, tuple, dictionary, set): e.g., `'a' in 'apple'` yields `True`.

### Q5. [2 Marks] What are bitwise operators in Python?
**Model Answer:**
Bitwise operators work directly on binary bits: `&` (AND), `|` (OR), `^` (XOR), `~` (Bitwise NOT / inversion), `<<` (Left shift), `>>` (Right shift).

### Q6. [2 Marks] Explain short-circuit evaluation in Python logical operators.
**Model Answer:**
In `a and b`, if `a` is False, `b` is not evaluated (result is False). In `a or b`, if `a` is True, `b` is not evaluated (result is True).

### Q7. [2 Marks] What is the ternary conditional expression in Python?
**Model Answer:**
Syntax: `val_if_true if condition else val_if_false`
Example: `status = 'Adult' if age >= 18 else 'Minor'`.

### Q8. [2 Marks] What does the `pass` statement do in Python?
**Model Answer:**
`pass` is a null statement used as a syntactic placeholder where code is syntactically required but no action is needed (e.g., empty function or class stub).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain Operator Precedence and Associativity in Python with a Hierarchy Table.
**Model Answer:**
### Operator Precedence (Highest to Lowest)

| Level | Operators | Description | Associativity |
| :--- | :--- | :--- | :--- |
| **1** | `()` | Parentheses (grouping) | Left to Right |
| **2** | `**` | Exponentiation | **Right to Left** |
| **3** | `+x`, `-x`, `~x` | Unary plus, minus, bitwise NOT | Right to Left |
| **4** | `*`, `/`, `//`, `%` | Multiplication, division, floor div, modulo | Left to Right |
| **5** | `+`, `-` | Addition, Subtraction | Left to Right |
| **6** | `<<`, `>>` | Bitwise Shifts | Left to Right |
| **7** | `&` | Bitwise AND | Left to Right |
| **8** | `^` | Bitwise XOR | Left to Right |
| **9** | `|` | Bitwise OR | Left to Right |
| **10** | `==`, `!=`, `<`, `>`, `is`, `in` | Comparisons, Identity, Membership | Left to Right |
| **11** | `not` | Logical NOT | Right to Left |
| **12** | `and` | Logical AND | Left to Right |
| **13** | `or` | Logical OR | Left to Right |
| **14** | `=`, `+=`, `-=`, etc. | Assignment operators | Right to Left |

### Q2. [5 Marks] Explain Python List Comprehensions with Syntax, Performance, and Practical Examples.
**Model Answer:**
### List Comprehensions
List comprehension provides a concise syntax to create new lists based on existing iterables.

**Syntax:** `[expression for item in iterable if condition]`

```python
# 1. Squares of even numbers from 1 to 20
even_squares = [x**2 for x in range(1, 21) if x % 2 == 0]
print("Even Squares:", even_squares)

# 2. String manipulation: uppercase words
words = ["mjpru", "bca", "python", "exam"]
uppercase = [w.upper() for w in words if len(w) > 3]
print("Filtered Uppercase:", uppercase)
```
**Performance Advantage:** List comprehensions run at C-speed inside the Python interpreter, substantially outperforming traditional `for` loops with `.append()` calls.

### Q3. [5 Marks] Explain Dictionary and Set Comprehensions with Code Examples.
**Model Answer:**
### Dictionary and Set Comprehensions
- **Dict Comprehension:** `{key_expr: val_expr for item in iterable if condition}`
- **Set Comprehension:** `{expr for item in iterable if condition}`

```python
# Dictionary of number to its cube
cubes_dict = {n: n**3 for n in range(1, 6)}
print("Cubes:", cubes_dict) # {1: 1, 2: 8, 3: 27, 4: 64, 5: 125}

# Inverting a dictionary (swapping key and value)
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print("Inverted:", inverted) # {1: 'a', 2: 'b', 3: 'c'}

# Set comprehension (unique word lengths)
sentence = "Python is an interpreted elegant programming language"
word_lengths = {len(word) for word in sentence.split()}
print("Word Lengths:", word_lengths)
```

### Q4. [5 Marks] Explain How Python Internally Implements Integer Caching (Small Integer Optimization).
**Model Answer:**
Python pre-allocates and caches small integers in the range **`[-5, 256]`** during interpreter startup in CPython.
- Any assignment to an integer within `[-5, 256]` reuses the existing cached memory address.
- Integers outside this range instantiate brand-new object instances in memory:
```python
a = 250
b = 250
print(a is b) # True (Both point to identical cached CPython object)

x = 1000
y = 1000
print(x is y) # False (Distinct heap allocations, though x == y is True)
```


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Write a Complete Menu-Driven Program in Python Demonstrating Arithmetic, Bitwise, Logical, and Relational Operators.
**Comprehensive University Solution:**
```python
"""
MJPRU Bareilly BCA Examination Model Program: Unit 2
Menu-Driven Demonstration of All Major Python Operators
"""

def show_arithmetic(a, b):
    print("\n--- Arithmetic Operations ---")
    print(f"{a} + {b} = {a + b}")
    print(f"{a} - {b} = {a - b}")
    print(f"{a} * {b} = {a * b}")
    print(f"{a} / {b} = {a / b:.4f} (True Float Division)")
    print(f"{a} // {b} = {a // b} (Floor Division)")
    print(f"{a} % {b} = {a % b} (Remainder/Modulo)")
    print(f"{a} ** {b} = {a ** b} (Power)")

def show_bitwise(a, b):
    print("\n--- Bitwise Operations (Integer Level) ---")
    print(f"{a} & {b}  = {a & b}  (Binary: {bin(a & b)})")
    print(f"{a} | {b}  = {a | b}  (Binary: {bin(a | b)})")
    print(f"{a} ^ {b}  = {a ^ b}  (Binary: {bin(a ^ b)})")
    print(f"~{a}     = {~a}     (Inversion)")
    print(f"{a} << 1 = {a << 1} (Left Shift - Multiplies by 2)")
    print(f"{a} >> 1 = {a >> 1} (Right Shift - Divides by 2)")

def main():
    print("="*50)
    print("   PYTHON OPERATORS COMPREHENSIVE SUITE")
    print("="*50)
    num1 = int(input("Enter first integer (a): "))
    num2 = int(input("Enter second integer (b): "))
    
    show_arithmetic(num1, num2)
    show_bitwise(num1, num2)

if __name__ == "__main__":
    main()
```

### Q2. [10/15 Marks] Explain String Slicing, Methods, and Immutability in Python with Full Code.
**Comprehensive University Solution:**
### String Slicing and Manipulation Guide
Strings in Python are immutable sequences of Unicode characters.

**Slicing Syntax:** `string[start : stop : step]`

```python
text = "MJPRU University Bareilly"

# 1. Slicing Demonstrations
print("Substring [0:5]:", text[0:5])       # 'MJPRU'
print("Step slicing [::2]:", text[::2])     # Every 2nd char
print("Reverse string [::-1]:", text[::-1]) # 'yllieraB ytisrevinU URPJM'

# 2. Key String Methods
print("Lower:", text.lower())
print("Title Case:", text.title())
print("Count 'i':", text.count('i'))
print("Find 'Univ':", text.find('University')) # Returns index 6
print("Replace:", text.replace("Bareilly", "Uttar Pradesh"))

# 3. Splitting and Joining
tokens = text.split(" ")
print("Tokens:", tokens)
joined = "-".join(tokens)
print("Joined:", joined)

# 4. Immutability Proof
try:
    text[0] = 'K' # TypeError: 'str' object does not support item assignment
except TypeError as e:
    print("\nProof of Immutability Caught:", e)
```

### Q3. [10/15 Marks] Write a Program to Solve the Matrix Multiplication Problem in Python using Nested Lists and List Comprehensions.
**Comprehensive University Solution:**
```python
# Matrix Multiplication in Python without External Libraries

def multiply_matrices(A, B):
    # A is m x k, B is k x n
    rows_A = len(A)
    cols_A = len(A[0])
    rows_B = len(B)
    cols_B = len(B[0])
    
    if cols_A != rows_B:
        raise ValueError("Matrix multiplication impossible: cols of A must equal rows of B!")
    
    # Method 1: Traditional nested loops
    result = [[0 for _ in range(cols_B)] for _ in range(rows_A)]
    for i in range(rows_A):
        for j in range(cols_B):
            for k in range(cols_A):
                result[i][j] += A[i][k] * B[k][j]
    return result

# Test Matrices
mat1 = [
    [1, 2, 3],
    [4, 5, 6]
] # 2x3

mat2 = [
    [7, 8],
    [9, 1],
    [2, 3]
] # 3x2

prod = multiply_matrices(mat1, mat2)
print("Product Matrix (2x2):")
for row in prod:
    print(" ", row)
# Output:
#  [31, 19]
#  [85, 55]
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Practice `//` vs `/`, `is` vs `==`, bitwise operations, and list comprehension syntax; these are regular university exam targets.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
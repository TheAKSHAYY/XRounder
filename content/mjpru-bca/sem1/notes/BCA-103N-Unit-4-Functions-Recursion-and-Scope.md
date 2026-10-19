# BCA-103N: Programming with C
## Unit 4 Master Exam Revision Notes: Functions, Parameter Passing, Recursion & Scope
**Target Examination:** MJPRU Bareilly BCA Semester 1 (CBCS Pattern 2024–25)
**Unit Identifier:** `82bd3624-5f4d-4412-aec6-5cca36518690` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Modular Programming & Functional Decomposition: Advantages, Code Reusability & Maintainability**
- [x] **Function Elements: Function Declaration (Prototype), Function Definition & Function Call**
- [x] **Function Arguments & Return Types: void Functions, Returning Values, Return Statement Semantics**
- [x] **Parameter Passing Mechanisms: Actual Parameters vs Formal Parameters**
- [x] **Call by Value: Value Copying, Independence of Caller Variables, Limitations**
- [x] **Call by Reference: Simulating Reference Passing via Pointer Arguments, Swapping Variables**
- [x] **Passing Arrays to Functions: Array Name as Pointer to First Element, Passing 2D Arrays**
- [x] **Recursion Fundamentals: Direct vs Indirect Recursion, Base Condition (Anchor), Recursive Leap of Faith**
- [x] **Memory Call Stack in Recursion: Stack Frames, Activation Records, Stack Overflow Risks**
- [x] **Classic Recursive Algorithms: Factorial, Fibonacci Series, GCD (Euclid's Algorithm), Tower of Hanoi**
- [x] **Storage Classes in C: auto, register, static, extern**
- [x] **Scope, Visibility & Lifetime of Variables: Block Scope, Function Scope, File Scope & Global Variables**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is Modular Programming?
**Model Answer:**
A software design technique that decomposes a large complex program into smaller, self-contained, independent, and reusable subroutines or functions, improving readability, testing, and team collaboration.

### Q2. [2 Marks] Distinguish between Function Declaration (Prototype) and Function Definition.
**Model Answer:**
**Prototype:** Informs compiler about function name, return type, and parameter list before `main()` (e.g. `int add(int, int);`).
**Definition:** Contains the actual executable body code enclosed in braces.

### Q3. [2 Marks] What is the difference between Actual Parameters and Formal Parameters?
**Model Answer:**
**Actual Parameters:** Values or variables passed to the function in the calling statement (`add(x, y)`).
**Formal Parameters:** Variables declared in the function definition header that receive the incoming values (`int add(int a, int b)`).

### Q4. [2 Marks] Explain Call by Value with its limitation.
**Model Answer:**
C passes copies of actual argument values into formal parameters. Changes made to formal parameters inside the function do NOT affect caller variables in `main()`. Limitation: cannot modify caller arguments directly.

### Q5. [2 Marks] How does C simulate 'Call by Reference'?
**Model Answer:**
By passing memory addresses (pointers) of actual arguments into pointer formal parameters (`&x`), allowing the function to dereference the pointer (`*ptr`) and modify the original variable.

### Q6. [2 Marks] Define Recursion and state the two essential components of a recursive function.
**Model Answer:**
Recursion is a programming technique where a function calls itself directly or indirectly. Essential components:
1. **Base Case (Termination Anchor):** A non-recursive condition that halts recursion.
2. **Recursive Step:** Progressively reduces the problem toward the base case.

### Q7. [2 Marks] What happens if a recursive function lacks a base case?
**Model Answer:**
The function calls itself infinitely until the hardware runtime call stack runs out of memory, crashing the program with a **Stack Overflow** segmentation fault.

### Q8. [2 Marks] Name the four Storage Classes in C.
**Model Answer:**
1. `auto` (default for local variables, stack-allocated)
2. `register` (requests CPU register storage for speed)
3. `static` (preserves value between function calls, data segment)
4. `extern` (global scope across multiple source files).

### Q9. [2 Marks] What is the difference between Variable Scope and Variable Lifetime?
**Model Answer:**
**Scope:** The region of the source code where a variable is accessible/visible.
**Lifetime (Duration):** The period of runtime execution during which the variable retains allocated memory storage.

### Q10. [2 Marks] What is the advantage of using a `static` local variable?
**Model Answer:**
A `static` local variable is initialized only once when execution begins and retains its updated value across multiple calls to that function.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain Call by Value versus Call by Reference with a Variable Swapping code example.
**Model Answer:**
```c
#include <stdio.h>

// 1. Call by Value (FAILS to swap in caller!)
void swap_by_value(int a, int b) {
    int temp = a; a = b; b = temp;
}

// 2. Call by Reference (SUCCEEDS using pointers!)
void swap_by_reference(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 20;
    swap_by_value(x, y);
    printf("After swap_by_value: x = %d, y = %d (Unchanged!)\n", x, y);

    swap_by_reference(&x, &y); // Passing memory addresses
    printf("After swap_by_reference: x = %d, y = %d (Swapped!)\n", x, y);
    return 0;
}
```

### Q2. [5 Marks] Explain the Memory Call Stack mechanics during Recursion with an Activation Record diagram.
**Model Answer:**
Each function call allocates an **Activation Record (Stack Frame)** on the call stack containing:
1. Return address in caller code.
2. Function parameters.
3. Local variables.
```
CALL STACK FOR factorial(3):
+-------------------------------+
| factorial(1): n=1 -> returns 1|
+-------------------------------+
| factorial(2): n=2 * fact(1)   |
+-------------------------------+
| factorial(3): n=3 * fact(2)   |
+-------------------------------+
| main(): calls factorial(3)    |
+-------------------------------+
```
Frames are pushed on each recursive call and popped as base cases return values upwards.

### Q3. [5 Marks] Compare the four Storage Classes in C with a comprehensive comparison matrix.
**Model Answer:**
| Storage Class | Keyword | Storage Location | Default Initial Value | Scope | Lifetime |
|---|---|---|---|---|---|
| **Automatic** | `auto` | Stack Memory | Garbage (indeterminate) | Local block `{}` | Exits block |
| **Register** | `register` | CPU Register (if available) | Garbage | Local block `{}` | Exits block |
| **Static** | `static` | Data Segment (BSS) | Zero (`0`) | Local to block or File | Entire program execution |
| **External** | `extern` | Data Segment | Zero (`0`) | Global across all files | Entire program execution |

### Q4. [5 Marks] Write a recursive C function to compute Greatest Common Divisor (GCD) using Euclid's Algorithm.
**Model Answer:**
```c
#include <stdio.h>

// Euclidean Algorithm: gcd(a, b) = gcd(b, a % b); base case: gcd(a, 0) = a
int gcd(int a, int b) {
    if (b == 0) return a; // Base condition
    return gcd(b, a % b); // Recursive call
}

int main(void) {
    int a = 48, b = 18;
    printf("GCD of %d and %d = %d\n", a, b, gcd(a, b));
    return 0;
}
```

### Q5. [5 Marks] Explain Passing Arrays to Functions in C.
**Model Answer:**
In C, arrays are ALWAYS passed by reference (simulated) because the array name decays into a pointer to its first element:
```c
void print_and_double(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2; // Directly modifies original array in main!
    }
}
```


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Solve the classic Tower of Hanoi problem using Recursion in C with complete algorithm explanation and call trace for N = 3 disks.
**Comprehensive University Solution:**
### 1. Problem Formulation and Recursive Strategy
- **Objective:** Move $N$ disks from Source peg (A) to Destination peg (C) using Auxiliary peg (B).
- **Rules:** 1) Move only one disk at a time; 2) A larger disk can never be placed on top of a smaller disk.
- **Recursive Insight:**
  1. Move top $(N - 1)$ disks from Source (A) to Auxiliary (B) using Destination (C).
  2. Move the remaining largest $N$-th disk directly from Source (A) to Destination (C).
  3. Move the $(N - 1)$ disks from Auxiliary (B) to Destination (C) using Source (A).
- **Total Moves Formula:** $2^N - 1$. For $N = 3$, moves $= 2^3 - 1 = 7$.

### 2. Complete C Implementation
```c
#include <stdio.h>

void tower_of_hanoi(int n, char from_rod, char to_rod, char aux_rod) {
    if (n == 1) {
        printf("Move disk 1 from rod %c to rod %c\n", from_rod, to_rod);
        return;
    }
    // Step 1: Move n-1 disks from source to aux
    tower_of_hanoi(n - 1, from_rod, aux_rod, to_rod);

    // Step 2: Move nth disk from source to dest
    printf("Move disk %d from rod %c to rod %c\n", n, from_rod, to_rod);

    // Step 3: Move n-1 disks from aux to dest
    tower_of_hanoi(n - 1, aux_rod, to_rod, from_rod);
}

int main(void) {
    int n = 3;
    printf("Tower of Hanoi Solution for %d disks:\n", n);
    tower_of_hanoi(n, 'A', 'C', 'B');
    return 0;
}
```

### 3. Step-by-Step Execution Trace ($N = 3$)
1. Move disk 1 from A to C
2. Move disk 2 from A to B
3. Move disk 1 from C to B
4. Move disk 3 from A to C
5. Move disk 1 from B to A
6. Move disk 2 from B to C
7. Move disk 1 from A to C

### Q2. [10/15 Marks] Explain Recursion vs Iteration in depth: Performance, Memory Overhead, Stack Frames, and write recursive vs iterative Factorial code.
**Comprehensive University Solution:**
### 1. Comparative Analysis Matrix

| Feature | Recursion | Iteration |
|---|---|---|
| **Core Mechanism** | Function calls itself repeatedly until base condition | Repeats loop construct (`for`, `while`) until condition fails |
| **Termination** | Triggered by base case return | Triggered by loop condition becoming false |
| **Memory Consumption** | High memory overhead; allocates new stack frame for each call | Constant $O(1)$ memory; reuses existing local variables |
| **Execution Speed** | Slower due to function call overhead, stack pushing/popping | Significantly faster native hardware loop execution |
| **Stack Overflow Risk**| High vulnerability if recursion depth exceeds stack limits | No stack overflow risk |
| **Code Elegance** | Extremely clean for tree traversals, divide-and-conquer (Towers of Hanoi, MergeSort) | Can become verbose and complex for non-linear structures |

### 2. Code Comparison
```c
// Iterative: O(N) time, O(1) space
long long fact_iterative(int n) {
    long long res = 1;
    for (int i = 2; i <= n; i++) res *= i;
    return res;
}

// Recursive: O(N) time, O(N) stack space
long long fact_recursive(int n) {
    if (n <= 1) return 1;
    return n * fact_recursive(n - 1);
}
```

### Q3. [10/15 Marks] Elaborate on Scope, Visibility, and Lifetime of Variables in C: Block Scope, Function Scope, File Scope, and External Linkage.
**Comprehensive University Solution:**
### 1. Scope Dimensions in C
- **Block Scope (Local):** Variables declared inside `{ }` are accessible only within that block.
- **Function Scope:** Labels used with `goto` are visible throughout the entire enclosing function.
- **File Scope (Global):** Variables declared outside all functions are visible from their point of declaration through the end of the file.

### 2. Multi-File Compilation with `extern`
```c
// File 1: global_data.c
int global_counter = 100; // Definition & storage allocation

// File 2: main.c
#include <stdio.h>
extern int global_counter; // Declaration: informs linker variable exists elsewhere

int main(void) {
    printf("Counter = %d\n", global_counter);
    return 0;
}
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-103N Unit 4, the classic exam questions are: Call by Value vs Reference (with swap code), Tower of Hanoi recursive trace, and the 4 Storage Classes comparison table.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
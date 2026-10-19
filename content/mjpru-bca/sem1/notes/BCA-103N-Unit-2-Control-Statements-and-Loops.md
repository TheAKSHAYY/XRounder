# BCA-103N: Programming with C
## Unit 2 Master Exam Revision Notes: Control Statements, Branching & Looping Constructs
**Target Examination:** MJPRU Bareilly BCA Semester 1 (CBCS Pattern 2024–25)
**Unit Identifier:** `a07b13bd-36db-46de-9739-867e41126f4f` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Control Structures Overview: Sequential, Selective & Iterative Execution Flow**
- [x] **Decision Making Statements: Simple if, if-else, Nested if-else, Dangling Else Problem**
- [x] **Multi-way Selection: else-if Ladder vs switch-case Statement**
- [x] **Switch-case Mechanics: Expression Rules, case Labels, break Statement, default Clause & Fall-through Behavior**
- [x] **Conditional Operator (? :) as a Compact Branching Mechanism**
- [x] **Looping Fundamentals: Initialization, Test Condition, Update Expression & Loop Body**
- [x] **while Loop: Entry-Controlled Loop Syntax, Execution Cycle & Use Cases**
- [x] **for Loop: Syntax, Multiple Expressions, Empty Clauses, Infinite for Loops**
- [x] **do-while Loop: Exit-Controlled Loop Syntax, Guarantee of Minimum One Execution**
- [x] **Jump Statements: break Statement, continue Statement, return Statement**
- [x] **Unconditional Branching: goto Statement, Label Naming & Structured Programming Guidelines**
- [x] **Nested Loops: Multi-dimensional Iterations, Pattern Printing & Performance Considerations**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What are the three fundamental control structures in structured programming?
**Model Answer:**
1. **Sequence:** Executing statements one after another in linear order.
2. **Selection (Branching):** Making decisions based on conditions (`if`, `switch`).
3. **Iteration (Looping):** Repeating a block of code while a condition remains true (`for`, `while`, `do-while`).

### Q2. [2 Marks] Explain the 'Dangling Else' problem in C and how it is resolved.
**Model Answer:**
When nested `if` statements are used without braces `{ }`, an `else` ambiguously pairs with the *closest preceding unmatched* `if`. Resolution: Always enclose inner `if` blocks in explicit curly braces `{ }`.

### Q3. [2 Marks] What is the purpose of the `break` statement in a `switch-case` construct?
**Model Answer:**
Terminates execution of the `switch` block immediately and transfers control to the statement following the switch. Without `break`, execution continues sequentially into subsequent cases (**Fall-through**).

### Q4. [2 Marks] Can float or string values be used as `switch` expression in C?
**Model Answer:**
No. C strictly mandates that `switch` expressions and `case` labels must evaluate to an **integral type** (`int`, `char`, `enum`). Floats, doubles, and strings are syntactically illegal in C switch statements.

### Q5. [2 Marks] Differentiate between Entry-Controlled and Exit-Controlled loops.
**Model Answer:**
**Entry-Controlled (`while`, `for`):** Condition tested *before* entering loop body; if condition is false initially, body executes zero times.
**Exit-Controlled (`do-while`):** Condition tested *after* executing body; loop body is guaranteed to execute **at least once**.

### Q6. [2 Marks] What happens if the loop test condition is omitted in a `for` loop: `for ( ; ; )`?
**Model Answer:**
An empty condition is treated by the C compiler as permanently TRUE (1), creating an intentional **infinite loop** that runs indefinitely until broken by `break` or `return`.

### Q7. [2 Marks] Distinguish between `break` and `continue` statements.
**Model Answer:**
**`break`:** Terminates the entire enclosing loop or switch construct immediately.
**`continue`:** Skips the remaining statements in the *current iteration* and jumps directly to the loop condition/update step for the next iteration.

### Q8. [2 Marks] Why is the unconditional `goto` statement discouraged in modern software engineering?
**Model Answer:**
Unrestricted use of `goto` creates tangled 'spaghetti code', violating structured programming principles, complicating debugging, and making code unmaintainable.

### Q9. [2 Marks] What is a nested loop? Give one common use case.
**Model Answer:**
A loop placed entirely inside the body of another loop. Common use case: Traversing multi-dimensional arrays (matrices) with an outer loop for rows and an inner loop for columns.

### Q10. [2 Marks] Write a compact C statement using the conditional operator to find the maximum of three numbers `a`, `b`, and `c`.
**Model Answer:**
`max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);`


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare `while`, `do-while`, and `for` loops in C with syntax, execution flow, and typical use cases.
**Model Answer:**
| Feature | `for` Loop | `while` Loop | `do-while` Loop |
|---|---|---|---|
| **Loop Classification** | Entry-Controlled | Entry-Controlled | Exit-Controlled |
| **Syntax** | `for (init; cond; upd) { body }` | `while (cond) { body }` | `do { body } while (cond);` |
| **Minimum Executions** | 0 times | 0 times | **At least 1 time** |
| **Initialization & Update** | Compactly integrated in header | Explicitly written by programmer | Explicitly written by programmer |
| **Best Application** | When number of iterations is known in advance (counting loops) | When iteration depends on external condition without fixed count | Menu-driven programs where user sees choices at least once |

### Q2. [5 Marks] Explain the `switch-case` statement with syntax, rules, and fall-through demonstration.
**Model Answer:**
```c
switch (expression) {
    case constant1:
        // statements
        break;
    case constant2:
        // statements
        break;
    default:
        // default statements
}
```
**Key Rules:**
1. Expression must evaluate to integer or character.
2. Case labels must be unique compile-time constants (e.g. `case 1:`, `case 'A':`; variables like `case x:` are illegal).
3. `break` stops execution. If omitted, execution falls through all remaining cases until a break or end of switch is reached.
4. `default` block executes when no case matches (optional, but recommended).

### Q3. [5 Marks] Explain `break`, `continue`, and `goto` with comparative flowcharts and examples.
**Model Answer:**
- **`break`:** Exits the loop entirely. Useful for early termination upon finding a target element in searching algorithms.
- **`continue`:** Bypasses remaining lines in current iteration. Useful for skipping invalid inputs or odd/even filters without breaking loop.
- **`goto label;`:** Unconditional jump to a labeled statement `label:`. Acceptable primarily for jumping out of deeply nested multi-level loops during error recovery.

### Q4. [5 Marks] Write a C program to check whether a given integer is a Prime Number.
**Model Answer:**
```c
#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int n, i;
    bool is_prime = true;

    printf("Enter a positive integer: ");
    if (scanf("%d", &n) != 1 || n <= 1) {
        printf("Not a prime number (primes are integers > 1).\n");
        return 0;
    }

    // Optimized check up to sqrt(n)
    for (i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            is_prime = false;
            break; // Factor found, no need to check further
        }
    }

    if (is_prime)
        printf("%d is a PRIME number.\n", n);
    else
        printf("%d is a COMPOSITE number (not prime).\n", n);

    return 0;
}
```

### Q5. [5 Marks] Write a C program to generate the Fibonacci Series up to N terms.
**Model Answer:**
```c
#include <stdio.h>

int main(void) {
    int n, i;
    long long t1 = 0, t2 = 1, next_term;

    printf("Enter the number of terms: ");
    scanf("%d", &n);

    printf("Fibonacci Series (%d terms):\n", n);
    for (i = 1; i <= n; ++i) {
        printf("%lld ", t1);
        next_term = t1 + t2;
        t1 = t2;
        t2 = next_term;
    }
    printf("\n");
    return 0;
}
```


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Write a complete Menu-Driven Console Application in C using `switch-case` and a `do-while` loop for Basic Arithmetic and Number Analysis.
**Comprehensive University Solution:**
```c
/**
 * Program: Comprehensive Menu-Driven Mathematical Utility
 * Features: Arithmetic, Factorial, Prime Check, Palindrome Check
 * Architecture: switch-case embedded inside exit-controlled do-while
 */
#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int choice;
    int num, temp, reversed, remainder;
    long long fact;
    double a, b;

    do {
        printf("\n============================================\n");
        printf("      BCA-103N MATH UTILITY CONSOLE        \n");
        printf("============================================\n");
        printf("1. Basic Calculator (Add, Sub, Mul, Div)\n");
        printf("2. Factorial of a Number\n");
        printf("3. Check Prime Number\n");
        printf("4. Check Palindrome Number\n");
        printf("5. Exit Program\n");
        printf("--------------------------------------------\n");
        printf("Enter your choice (1-5): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter two numbers: ");
                scanf("%lf %lf", &a, &b);
                printf("Sum:        %.2lf\n", a + b);
                printf("Difference: %.2lf\n", a - b);
                printf("Product:    %.2lf\n", a * b);
                if (b != 0.0)
                    printf("Quotient:   %.2lf\n", a / b);
                else
                    printf("Error: Division by zero!\n");
                break;

            case 2:
                printf("Enter a non-negative integer: ");
                scanf("%d", &num);
                if (num < 0) {
                    printf("Error: Factorial not defined for negative numbers.\n");
                } else {
                    fact = 1;
                    for (int i = 1; i <= num; i++) fact *= i;
                    printf("Factorial of %d = %lld\n", num, fact);
                }
                break;

            case 3:
                printf("Enter a positive integer: ");
                scanf("%d", &num);
                if (num <= 1) {
                    printf("%d is NOT prime.\n", num);
                } else {
                    bool prime = true;
                    for (int i = 2; i * i <= num; i++) {
                        if (num % i == 0) { prime = false; break; }
                    }
                    printf("%d is %s.\n", num, prime ? "a PRIME number" : "NOT prime");
                }
                break;

            case 4:
                printf("Enter an integer: ");
                scanf("%d", &num);
                temp = num;
                reversed = 0;
                while (temp > 0) {
                    remainder = temp % 10;
                    reversed = reversed * 10 + remainder;
                    temp /= 10;
                }
                if (num == reversed)
                    printf("%d is a PALINDROME number.\n", num);
                else
                    printf("%d is NOT a palindrome.\n", num);
                break;

            case 5:
                printf("Exiting application. Goodbye!\n");
                break;

            default:
                printf("Invalid choice! Please select between 1 and 5.\n");
        }
    } while (choice != 5);

    return 0;
}
```

### Q2. [10/15 Marks] Explain Nested Loops with pattern printing in C. Write complete code to print a Floyd's Triangle and an Inverted Pyramid.
**Comprehensive University Solution:**
### 1. Mechanics of Nested Loops
In nested loops, the inner loop executes completely through all its iterations for *each single iteration* of the outer loop. If the outer loop runs $N$ times and the inner loop runs $M$ times, the inner body executes $N \times M$ times.

### 2. Pattern Implementations in C
```c
#include <stdio.h>

void print_floyds_triangle(int rows) {
    int num = 1;
    printf("\n--- Floyd's Triangle (%d rows) ---\n", rows);
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%d ", num++);
        }
        printf("\n");
    }
}

void print_pyramid(int rows) {
    printf("\n--- Centered Star Pyramid (%d rows) ---\n", rows);
    for (int i = 1; i <= rows; i++) {
        // Leading spaces for centering
        for (int space = 1; space <= rows - i; space++) {
            printf(" ");
        }
        // Odd number of stars (2*i - 1)
        for (int star = 1; star <= (2 * i - 1); star++) {
            printf("*");
        }
        printf("\n");
    }
}

int main(void) {
    print_floyds_triangle(5);
    print_pyramid(5);
    return 0;
}
```

### Q3. [10/15 Marks] Explain the Danger of Infinite Loops, Off-by-One Errors, and Dangling Else Bugs in C with code examples and prevention strategies.
**Comprehensive University Solution:**
### 1. The Dangling Else Problem
- **Defect:** In nested conditionals, `else` attaches to the immediately preceding `if`.
```c
// BUGGY CODE: Indentation is misleading!
if (x > 0)
    if (y > 0)
        printf("x and y positive");
else
    printf("x is negative"); // LOGICAL BUG: Attached to (y > 0), not (x > 0)!
```
- **Fix:** Always use explicit braces `{ }` around all control blocks.

### 2. Off-by-One Loop Boundary Errors
- **Defect:** Using `<=` instead of `<` when indexing zero-based arrays (e.g. `for (i = 0; i <= 5; i++) arr[i]`) causes an out-of-bounds access on index 5 of an array of size 5.
- **Fix:** Standard idiom for array traversal: `for (int i = 0; i < N; i++)`.

### 3. Unintended Infinite Loops
- **Defect:** Forgetting to update loop counter (e.g. missing `i++`), or using floating point equality in termination condition (`while (f != 1.0)` fails due to binary precision).
- **Fix:** Ensure loop variant advances monotonically toward termination condition.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-103N Unit 2, menu-driven programs using switch-case, prime/palindrome checks, and star pyramid patterns are staple 10-15 mark exam questions. Write neat, well-indented C code with input validation.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
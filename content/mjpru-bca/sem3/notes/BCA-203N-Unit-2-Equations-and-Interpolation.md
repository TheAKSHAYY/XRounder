# BCA-203N: Numerical Analysis and Statistical Techniques
## Unit 2 Master Exam Revision Notes: Algebraic/Transcendental Equations & Interpolation
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `823861ed-afab-5d0c-95d1-2ce548d7fc04` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Algebraic vs Transcendental Equations: Polynomial Roots, Trigonometric, Exponential, Logarithmic Equations**
- [x] **Initial Root Localization: Intermediate Value Theorem, Graphical and Tabular Sign-Change Detection**
- [x] **Bisection Method (Bolzano): Algorithm, Interval Halving, Guaranteed Convergence, Convergence Rate Analysis**
- [x] **Regula-Falsi Method (Method of False Position): Linear Secant Interpolation, Algorithm & Convergence Behavior**
- [x] **Secant Method: Open Two-Point Secant Iteration, Non-Bracketing Approach, Superlinear Convergence**
- [x] **Newton-Raphson Method: Derivation using Taylor Series, Tangent Iteration Formula x_{n+1} = x_n - f(x_n)/f'(x_n)**
- [x] **Convergence Analysis of Newton-Raphson: Quadratic Convergence Proof (Order 2), Failure Cases & Oscillations**
- [x] **Finite Differences: Forward Difference Operator (Delta), Backward Difference Operator (Nabla), Shift Operator (E)**
- [x] **Finite Difference Tables: Construction, Properties, Fundamental Theorem of Finite Differences**
- [x] **Newton's Forward Difference Interpolation Formula: Derivation, Formula, Application for Interpolating Near Start**
- [x] **Newton's Backward Difference Interpolation Formula: Derivation, Formula, Application for Interpolating Near End**
- [x] **Lagrange's Interpolation Formula for Unequally Spaced Data: Lagrange Polynomials, Advantages, Limitations**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the Bisection Method and its convergence rate?
**Model Answer:**
A bracketing root-finding algorithm that repeatedly halves an interval $[a, b]$ where $f(a)f(b) < 0$. It guarantees linear convergence with an error reduction factor of $0.5$ per iteration ($e_{n+1} = 0.5 e_n$).

### Q2. [2 Marks] What is the Newton-Raphson iteration formula?
**Model Answer:**
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
Derived by approximating $f(x)$ with its tangent line at $x_n$.

### Q3. [2 Marks] What is the order of convergence of the Newton-Raphson Method?
**Model Answer:**
The order of convergence is **2 (Quadratic)** for a simple root, meaning the number of correct decimal places roughly doubles with every iteration: $e_{n+1} \approx \frac{f''(r)}{2f'(r)} e_n^2$.

### Q4. [2 Marks] When does the Newton-Raphson Method fail?
**Model Answer:**
It fails when $f'(x_n) = 0$ (tangent line is horizontal, leading to division by zero), when starting near an inflection point causing wild oscillation, or when initial guess is too far from the root.

### Q5. [2 Marks] What is the Regula-Falsi (False Position) formula?
**Model Answer:**
$$c = \frac{a \cdot f(b) - b \cdot f(a)}{f(b) - f(a)}$$
Finds the root by taking the x-intercept of the chord (secant line) joining $(a, f(a))$ and $(b, f(b))$.

### Q6. [2 Marks] Differentiate between the Secant Method and Regula-Falsi Method.
**Model Answer:**
- **Regula-Falsi:** A bracketing method requiring $f(a)f(b) < 0$ at every step; guaranteed to converge, but can have slow linear convergence due to a stagnant endpoint.
- **Secant Method:** An open method using the two most recent iterates without requiring them to bracket the root; order of convergence is $\phi \approx 1.618$ (superlinear).

### Q7. [2 Marks] Define the Forward Difference operator ($\Delta$) and Backward Difference operator ($\nabla$).
**Model Answer:**
- **Forward Difference:** $\Delta f(x) = f(x + h) - f(x)$
- **Backward Difference:** $\nabla f(x) = f(x) - f(x - h)$

### Q8. [2 Marks] What is the Shift Operator $E$ and its relationship with $\Delta$?
**Model Answer:**
The shift operator is defined as $E f(x) = f(x + h)$. Its algebraic operator relationship with $\Delta$ is:
$$E = 1 + \Delta \implies \Delta = E - 1$$

### Q9. [2 Marks] When is Newton's Forward vs Newton's Backward Interpolation used?
**Model Answer:**
- **Newton's Forward:** Used for interpolating values near the **beginning** of an equally spaced table ($u = \frac{x - x_0}{h}$).
- **Newton's Backward:** Used for interpolating values near the **end** of an equally spaced table ($v = \frac{x - x_n}{h}$).

### Q10. [2 Marks] Why is Lagrange's Interpolation formula used for unequally spaced data?
**Model Answer:**
Lagrange's formula does not rely on constant difference intervals $h$; it constructs basis polynomials $L_i(x) = \prod_{j \ne i} \frac{x - x_j}{x_i - x_j}$ directly from arbitrary distinct coordinates $(x_i, y_i)$.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Prove that the Newton-Raphson Method has Quadratic Convergence.
**Model Answer:**
Let $r$ be the exact root so $f(r) = 0$. Let $x_n = r + e_n$ where $e_n$ is the error at step $n$.
Expanding $f(x_n)$ and $f'(x_n)$ using Taylor series about $r$:
$$f(x_n) = f(r + e_n) = f(r) + e_n f'(r) + \frac{e_n^2}{2} f''(r) + O(e_n^3) = e_n f'(r) + \frac{e_n^2}{2} f''(r)$$
$$f'(x_n) = f'(r + e_n) = f'(r) + e_n f''(r) + O(e_n^2)$$
Substituting into the Newton-Raphson recurrence:
$$e_{n+1} + r = r + e_n - \frac{e_n f'(r) + \frac{e_n^2}{2} f''(r)}{f'(r) + e_n f''(r)}$$
$$e_{n+1} = e_n - \frac{e_n [1 + \frac{e_n f''(r)}{2f'(r)}]}{1 + \frac{e_n f''(r)}{f'(r)}}$$
Using binomial expansion $(1 + z)^{-1} \approx 1 - z$:
$$e_{n+1} \approx e_n - e_n \left(1 + \frac{e_n f''(r)}{2f'(r)}\right) \left(1 - \frac{e_n f''(r)}{f'(r)}\right) \approx \frac{f''(r)}{2f'(r)} e_n^2$$
Thus, $e_{n+1} = C e_n^2$, proving **quadratic convergence (Order 2)**.

### Q2. [5 Marks] Derive Newton's Forward Difference Interpolation Formula.
**Model Answer:**
Using operator algebra: $f(x) = f(x_0 + uh) = E^u f(x_0) = (1 + \Delta)^u f(x_0)$.
Expanding $(1 + \Delta)^u$ via binomial theorem:
$$P_n(x) = y_0 + u \Delta y_0 + \frac{u(u-1)}{2!} \Delta^2 y_0 + \frac{u(u-1)(u-2)}{3!} \Delta^3 y_0 + \dots$$
where $u = \frac{x - x_0}{h}$ and $\Delta^k y_0$ are values from the top diagonal of the forward difference table.

### Q3. [5 Marks] State the Fundamental Theorem of Finite Differences.
**Model Answer:**
**Theorem:** The $n$-th forward difference of a polynomial of degree $n$ with constant step size $h$ is a CONSTANT, and its $(n+1)$-th difference is identically ZERO:
$$\Delta^n P_n(x) = a_n \cdot n! \cdot h^n = \text{Constant}$$
$$\Delta^{n+1} P_n(x) = 0$$

### Q4. [5 Marks] Explain Lagrange's Interpolation Formula and State its Limitations.
**Model Answer:**
For $n+1$ points $(x_0, y_0), \dots, (x_n, y_n)$:
$$P_n(x) = \sum_{i=0}^n y_i L_i(x) \quad \text{where} \quad L_i(x) = \prod_{j=0, j \ne i}^n \frac{x - x_j}{x_i - x_j}$$
**Limitations:**
1. High computational cost: $O(n^2)$ arithmetic operations.
2. Non-incremental: adding one new data point requires recomputing all basis polynomials from scratch.
3. Susceptible to **Runge's Phenomenon** for high-degree equispaced polynomials.

### Q5. [5 Marks] Derive the Babylonian Method for Square Roots using Newton-Raphson.
**Model Answer:**
To find $\sqrt{N}$, let $f(x) = x^2 - N = 0$. Then $f'(x) = 2x$.
Using Newton-Raphson:
$$x_{n+1} = x_n - \frac{x_n^2 - N}{2x_n} = \frac{2x_n^2 - x_n^2 + N}{2x_n} = \frac{x_n^2 + N}{2x_n} = \frac{1}{2} \left(x_n + \frac{N}{x_n}\right)$$
This converges quadratically to $\sqrt{N}$.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Find the Real Root of $f(x) = x^3 - 2x - 5 = 0$ using Newton-Raphson Method Correct to 4 Decimal Places.
**Comprehensive University Solution:**
**Step 1: Locate Initial Bracket**
$f(2) = 2^3 - 2(2) - 5 = 8 - 4 - 5 = -1 < 0$
$f(3) = 3^3 - 2(3) - 5 = 27 - 6 - 5 = 16 > 0$
Since $f(2)f(3) < 0$, a root lies in $[2, 3]$. Since $|f(2)| = 1 < 16$, root is much closer to 2. Choose initial guess $x_0 = 2.0$.

**Step 2: Derivative Formulation**
$f'(x) = 3x^2 - 2$
Iteration formula: $x_{n+1} = x_n - \frac{x_n^3 - 2x_n - 5}{3x_n^2 - 2} = \frac{2x_n^3 + 5}{3x_n^2 - 2}$

**Step 3: Iteration Execution**
- **Iteration 1:**
  $x_1 = \frac{2(2)^3 + 5}{3(2)^2 - 2} = \frac{16 + 5}{12 - 2} = \frac{21}{10} = 2.1000$
- **Iteration 2:**
  $x_2 = \frac{2(2.1)^3 + 5}{3(2.1)^2 - 2} = \frac{2(9.261) + 5}{3(4.41) - 2} = \frac{18.522 + 5}{13.23 - 2} = \frac{23.522}{11.23} \approx 2.094568$
- **Iteration 3:**
  $x_3 = \frac{2(2.094568)^3 + 5}{3(2.094568)^2 - 2} = \frac{23.37328}{11.16117} \approx 2.094551$

Notice $x_2$ and $x_3$ agree to 4 decimal places.
**Final Answer:** The real root correct to 4 decimal places is **2.0946**.

### Q2. [10/15 Marks] Construct the Difference Table and Find $f(2.5)$ using Newton's Forward Interpolation from the following data:
x: [1, 2, 3, 4], y: [1, 8, 27, 64].
**Comprehensive University Solution:**
**Step 1: Construct Forward Difference Table**
| $x$ | $y$ | $\Delta y$ | $\Delta^2 y$ | $\Delta^3 y$ |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **1** | | | |
| | | **7** | | |
| 2 | 8 | | **12** | |
| | | 19 | | **6** |
| 3 | 27 | | 18 | |
| | | 37 | | |
| 4 | 64 | | | |

Notice $\Delta^3 y = 6 = \text{constant}$ (since $y = x^3$, degree 3).

**Step 2: Compute Parameter $u$**
$x_0 = 1, h = 1, x = 2.5 \implies u = \frac{2.5 - 1}{1} = 1.5$

**Step 3: Apply Newton's Forward Formula**
$$f(2.5) = y_0 + u \Delta y_0 + \frac{u(u-1)}{2!} \Delta^2 y_0 + \frac{u(u-1)(u-2)}{3!} \Delta^3 y_0$$
$$f(2.5) = 1 + (1.5)(7) + \frac{(1.5)(0.5)}{2}(12) + \frac{(1.5)(0.5)(-0.5)}{6}(6)$$
$$f(2.5) = 1 + 10.5 + (0.375)(12) + (-0.375)(1) = 1 + 10.5 + 4.5 - 0.375 = 15.625$$

*(Verification: $2.5^3 = 15.625$, exact analytical match!).*

### Q3. [10/15 Marks] Find the value of $y$ at $x = 10$ using Lagrange's Interpolation Formula for given data: (5, 12), (6, 13), (9, 14), (11, 16).
**Comprehensive University Solution:**
Data points: $(x_0=5, y_0=12), (x_1=6, y_1=13), (x_2=9, y_2=14), (x_3=11, y_3=16)$. Target $x = 10$.

**Step 1: Calculate Basis Polynomials**
$$L_0(10) = \frac{(10-6)(10-9)(10-11)}{(5-6)(5-9)(5-11)} = \frac{(4)(1)(-1)}{(-1)(-4)(-6)} = \frac{-4}{-24} = \frac{1}{6}$$
$$L_1(10) = \frac{(10-5)(10-9)(10-11)}{(6-5)(6-9)(6-11)} = \frac{(5)(1)(-1)}{(1)(-3)(-5)} = \frac{-5}{15} = -\frac{1}{3}$$
$$L_2(10) = \frac{(10-5)(10-6)(10-11)}{(9-5)(9-6)(9-11)} = \frac{(5)(4)(-1)}{(4)(3)(-2)} = \frac{-20}{-24} = \frac{5}{6}$$
$$L_3(10) = \frac{(10-5)(10-6)(10-9)}{(11-5)(11-6)(11-9)} = \frac{(5)(4)(1)}{(6)(5)(2)} = \frac{20}{60} = \frac{1}{3}$$

**Step 2: Compute $y(10)$**
$$y(10) = 12\left(\frac{1}{6}\right) + 13\left(-\frac{1}{3}\right) + 14\left(\frac{5}{6}\right) + 16\left(\frac{1}{3}\right)$$
$$y(10) = 2 - 4.3333 + 11.6667 + 5.3333 = 14.6667$$
**Final Answer:** $y(10) \approx 14.67$.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Quadratic convergence proof of Newton-Raphson and numerical table calculations for Newton forward/backward or Lagrange interpolation appear on nearly every university paper.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
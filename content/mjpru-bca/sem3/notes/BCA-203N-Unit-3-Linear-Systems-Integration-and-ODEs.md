# BCA-203N: Numerical Analysis and Statistical Techniques
## Unit 3 Master Exam Revision Notes: Simultaneous Linear Equations, Numerical Differentiation & Integration, ODEs
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `438015e4-6f9e-53f3-b823-70f489c69f4e` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Systems of Linear Algebraic Equations: Matrix Representation Ax = B, Consistency & Rank Conditions**
- [x] **Gauss Elimination Method: Forward Elimination to Upper Triangular Form, Back-Substitution**
- [x] **Gauss-Jordan Method: Complete Diagonalization / Identity Matrix Reduction, Matrix Inversion**
- [x] **Iterative Methods for Linear Systems: Jacobi Iteration Method, Diagonally Dominant Condition for Convergence**
- [x] **Gauss-Seidel Iteration Method: Immediate Update Mechanism, Accelerated Convergence over Jacobi Method**
- [x] **Numerical Differentiation: Derivatives using Newton's Forward and Backward Difference Interpolation Polynomials**
- [x] **Numerical Integration Foundations: Newton-Cotes Quadrature Formulas, Trapezoidal Approximation**
- [x] **Trapezoidal Rule: Derivation (Linear Interpolant), Formula, Error Term (-h^3/12 * f''(xi)), Composite Form**
- [x] **Simpson's 1/3rd Rule: Derivation (Quadratic Interpolant, Even Subintervals), Formula, Error Term, Composite Form**
- [x] **Simpson's 3/8th Rule: Derivation (Cubic Interpolant, Subintervals Multiple of 3), Formula, Composite Form**
- [x] **Ordinary Differential Equations (ODEs) Initial Value Problems: dy/dx = f(x, y), y(x0) = y0**
- [x] **Taylor's Series Method for Solving 1st Order ODEs: Step-by-Step Expansion, High-Order Accuracy**
- [x] **Euler's Method: Tangent Line Approximation y_{n+1} = y_n + h*f(x_n, y_n), Local and Global Truncation Errors**
- [x] **Modified Euler's Method (Heun's Predictor-Corrector): Predictor Step, Trapezoidal Corrector Step**
- [x] **Runge-Kutta 2nd Order Method (RK2): Derivation, Midpoint Formulation, Improved Accuracy over Euler**
- [x] **Runge-Kutta 4th Order Method (RK4): Formulas for k1, k2, k3, k4, Weighted Average Slope, High-Precision Performance**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the Gauss Elimination Method?
**Model Answer:**
A direct systematic method to solve $Ax = b$ by applying elementary row operations to reduce the augmented matrix $[A|b]$ to upper triangular form, followed by back-substitution.

### Q2. [2 Marks] Why is Partial Pivoting necessary in Gauss Elimination?
**Model Answer:**
Partial pivoting swaps rows to ensure the pivot element $|a_{kk}|$ has the maximum magnitude in its column, preventing division by zero and reducing round-off error magnification.

### Q3. [2 Marks] Differentiate between Jacobi and Gauss-Seidel Iterative Methods.
**Model Answer:**
- **Jacobi:** Uses only values from the previous iteration $k$ to compute all values for iteration $k+1$.
- **Gauss-Seidel:** Immediately uses newly computed values of variables within the current iteration, typically converging twice as fast as Jacobi.

### Q4. [2 Marks] What is the condition for convergence of Gauss-Seidel iteration?
**Model Answer:**
The coefficient matrix $A$ must be strictly diagonally dominant: $|a_{ii}| > \sum_{j \ne i} |a_{ij}|$ for all rows $i$.

### Q5. [2 Marks] State the Trapezoidal Rule formula and its local error.
**Model Answer:**
$$I = \int_{x_0}^{x_1} f(x)dx \approx \frac{h}{2}[y_0 + y_1] \quad \text{with Error } E = -\frac{h^3}{12} f''(\xi)$$

### Q6. [2 Marks] State Simpson's 1/3rd Rule formula and its prerequisite.
**Model Answer:**
Prerequisite: Number of subintervals $n$ must be **EVEN**.
$$I \approx \frac{h}{3} \left[(y_0 + y_n) + 4(y_1 + y_3 + \dots) + 2(y_2 + y_4 + \dots)\right]$$

### Q7. [2 Marks] Why is Simpson's 1/3rd rule exact for cubic polynomials?
**Model Answer:**
Although derived from quadratic interpolation (degree 2), the symmetric error term $\int_{-h}^h t^3 dt = 0$ vanishes, making local error $O(h^5 f^{(4)}(\xi))$, integrating polynomials up to degree 3 with zero error.

### Q8. [2 Marks] State the step formula for Euler's Method for $dy/dx = f(x, y)$.
**Model Answer:**
$$y_{n+1} = y_n + h \cdot f(x_n, y_n) \quad \text{with global error } O(h)$$

### Q9. [2 Marks] What is the Runge-Kutta 4th Order (RK4) weighted average formula?
**Model Answer:**
$$y_{n+1} = y_n + \frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$
with global truncation error $O(h^4)$.

### Q10. [2 Marks] What are the formulas for $k_1, k_2, k_3, k_4$ in RK4?
**Model Answer:**
- $k_1 = h \cdot f(x_n, y_n)$
- $k_2 = h \cdot f(x_n + h/2, y_n + k_1/2)$
- $k_3 = h \cdot f(x_n + h/2, y_n + k_2/2)$
- $k_4 = h \cdot f(x_n + h, y_n + k_3)$


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Derive Simpson's 1/3rd Rule from Newton-Cotes Quadrature.
**Model Answer:**
General Newton-Cotes formula with $n = 2$ subintervals and step size $h$:
$$I = \int_{x_0}^{x_2} f(x)dx = h \left[ 2y_0 + \frac{2^2}{2}\Delta y_0 + \left(\frac{2^3}{3} - \frac{2^2}{2}\right)\frac{\Delta^2 y_0}{2} \right]$$
$$I = h \left[ 2y_0 + 2(y_1 - y_0) + \left(\frac{8}{3} - 2\right)\frac{y_2 - 2y_1 + y_0}{2} \right]$$
$$I = h \left[ 2y_1 + \frac{1}{3}(y_2 - 2y_1 + y_0) \right] = \frac{h}{3} [y_0 + 4y_1 + y_2]$$
For composite $n$ subintervals, summing pairs yields Simpson's 1/3rd rule.

### Q2. [5 Marks] Explain Modified Euler's (Heun's Predictor-Corrector) Method.
**Model Answer:**
Euler's method accumulates significant error by using only the slope at the start of the step. Modified Euler uses a Predictor-Corrector approach:
1. **Predictor (Euler):** $y^*_{n+1} = y_n + h \cdot f(x_n, y_n)$
2. **Corrector (Trapezoidal average):** $y_{n+1} = y_n + \frac{h}{2} [f(x_n, y_n) + f(x_{n+1}, y^*_{n+1})]$
This improves accuracy from first-order $O(h)$ to second-order $O(h^2)$.

### Q3. [5 Marks] Solve a $3 \times 3$ system using Gauss-Seidel Method: State setup and iteration rules.
**Model Answer:**
Given system:
$$a_{11}x + a_{12}y + a_{13}z = b_1$$
$$a_{21}x + a_{22}y + a_{23}z = b_2$$
$$a_{31}x + a_{32}y + a_{33}z = b_3$$
Rearranging each equation for its diagonal variable:
$$x^{(k+1)} = \frac{1}{a_{11}} [b_1 - a_{12}y^{(k)} - a_{13}z^{(k)}]$$
$$y^{(k+1)} = \frac{1}{a_{22}} [b_2 - a_{21}x^{(k+1)} - a_{23}z^{(k)}] \quad (\text{Uses new } x^{(k+1)}!)$$
$$z^{(k+1)} = \frac{1}{a_{33}} [b_3 - a_{31}x^{(k+1)} - a_{32}y^{(k+1)}] \quad (\text{Uses new } x^{(k+1)}, y^{(k+1)}!)$$

### Q4. [5 Marks] Explain the difference between Initial Value Problems (IVPs) and Boundary Value Problems (BVPs).
**Model Answer:**
- **IVP:** All boundary conditions are specified at a SINGLE initial independent variable point (e.g., $y(0) = 1, y'(0) = 0$). Solved by stepping forward via Euler, RK4, or predictor-corrector.
- **BVP:** Conditions are specified at TWO OR MORE distinct boundary points (e.g., $y(0) = 0, y(1) = 2$). Solved by finite-difference relaxation or the Shooting Method.

### Q5. [5 Marks] Compare Trapezoidal, Simpson's 1/3rd, and Simpson's 3/8th Rules.
**Model Answer:**
| Rule | Subintervals Required | Polynomial Degree Exact | Error Term |
| :--- | :--- | :--- | :--- |
| **Trapezoidal** | Any $n$ | Degree $\le 1$ | $-\frac{nh^3}{12} f''(\xi)$ |
| **Simpson's 1/3** | $n$ must be EVEN | Degree $\le 3$ | $-\frac{nh^5}{180} f^{(4)}(\xi)$ |
| **Simpson's 3/8** | $n$ multiple of 3 | Degree $\le 3$ | $-\frac{nh^5}{80} f^{(4)}(\xi)$ |


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Evaluate $\int_0^6 \frac{1}{1 + x^2} dx$ using Simpson's 1/3rd Rule with $n = 6$. Compare with Exact Analytical Value.
**Comprehensive University Solution:**
**Step 1: Discretization**
Interval $[0, 6], n = 6 \implies h = \frac{6 - 0}{6} = 1.0$.

**Step 2: Table of Values**
| $i$ | $x_i$ | $y_i = \frac{1}{1 + x_i^2}$ |
| :--- | :--- | :--- |
| 0 | 0 | $y_0 = 1.0000$ |
| 1 | 1 | $y_1 = 0.5000$ |
| 2 | 2 | $y_2 = 0.2000$ |
| 3 | 3 | $y_3 = 0.1000$ |
| 4 | 4 | $y_4 = 0.0588$ |
| 5 | 5 | $y_5 = 0.0385$ |
| 6 | 6 | $y_6 = 0.0270$ |

**Step 3: Grouping Ordinates**
- Extremes: $y_0 + y_6 = 1.0000 + 0.0270 = 1.0270$
- Odd: $y_1 + y_3 + y_5 = 0.5000 + 0.1000 + 0.0385 = 0.6385$
- Even: $y_2 + y_4 = 0.2000 + 0.0588 = 0.2588$

**Step 4: Apply Simpson's 1/3rd Formula**
$$I = \frac{h}{3} [ (y_0 + y_6) + 4(y_{\text{odd}}) + 2(y_{\text{even}}) ] = \frac{1}{3} [ 1.0270 + 4(0.6385) + 2(0.2588) ]$$
$$I = \frac{1}{3} [ 1.0270 + 2.5540 + 0.5176 ] = \frac{1}{3} [ 4.0986 ] = 1.3662$$

**Step 5: Exact Value**
$$\int_0^6 \frac{1}{1 + x^2} dx = [\tan^{-1}(x)]_0^6 = \tan^{-1}(6) - 0 \approx 1.4056$$
**Absolute Error:** $|1.4056 - 1.3662| = 0.0394$.

### Q2. [10/15 Marks] Solve $\frac{dy}{dx} = x + y, y(0) = 1$ to find $y(0.2)$ using Runge-Kutta 4th Order Method with $h = 0.2$.
**Comprehensive University Solution:**
Initial values: $x_0 = 0, y_0 = 1, h = 0.2, f(x, y) = x + y$.

**Step 1: Compute $k_1$**
$$k_1 = h \cdot f(x_0, y_0) = 0.2 \cdot (0 + 1) = 0.2000$$

**Step 2: Compute $k_2$**
$$x_0 + h/2 = 0 + 0.1 = 0.1, \quad y_0 + k_1/2 = 1 + 0.1 = 1.1$$
$$k_2 = 0.2 \cdot (0.1 + 1.1) = 0.2 \cdot (1.2) = 0.2400$$

**Step 3: Compute $k_3$**
$$x_0 + h/2 = 0.1, \quad y_0 + k_2/2 = 1 + 0.12 = 1.12$$
$$k_3 = 0.2 \cdot (0.1 + 1.12) = 0.2 \cdot (1.22) = 0.2440$$

**Step 4: Compute $k_4$**
$$x_0 + h = 0 + 0.2 = 0.2, \quad y_0 + k_3 = 1 + 0.2440 = 1.2440$$
$$k_4 = 0.2 \cdot (0.2 + 1.2440) = 0.2 \cdot (1.4440) = 0.2888$$

**Step 5: Calculate $y(0.2)$**
$$\Delta y = \frac{1}{6}[k_1 + 2k_2 + 2k_3 + k_4] = \frac{1}{6}[0.2000 + 2(0.2400) + 2(0.2440) + 0.2888]$$
$$\Delta y = \frac{1}{6}[0.2000 + 0.4800 + 0.4880 + 0.2888] = \frac{1.4568}{6} = 0.2428$$
$$y(0.2) = y_0 + \Delta y = 1.0 + 0.2428 = 1.2428$$
*(Analytical solution: $y = 2e^x - x - 1 \implies y(0.2) = 2e^{0.2} - 0.2 - 1 = 1.242805$. Perfect accuracy!).*

### Q3. [10/15 Marks] Solve the following system by Gauss Elimination with Partial Pivoting:
$2x + y + z = 10$, $3x + 2y + 3z = 18$, $x + 4y + 9z = 16$.
**Comprehensive University Solution:**
**Step 1: Augmented Matrix $[A|b]$**
$$\begin{bmatrix} 2 & 1 & 1 & | & 10 \\ 3 & 2 & 3 & | & 18 \\ 1 & 4 & 9 & | & 16 \end{bmatrix}$$

**Step 2: Pivot on Column 1**
Largest element in column 1 is 3 in Row 2. Swap $R_1 \leftrightarrow R_2$:
$$\begin{bmatrix} 3 & 2 & 3 & | & 18 \\ 2 & 1 & 1 & | & 10 \\ 1 & 4 & 9 & | & 16 \end{bmatrix}$$
Eliminate Column 1:
- $R_2 \leftarrow R_2 - (2/3)R_1 \implies [0, -1/3, -1, | -2]$
- $R_3 \leftarrow R_3 - (1/3)R_1 \implies [0, 10/3, 8, | 10]$

**Step 3: Pivot on Column 2**
In column 2, $|10/3| > |-1/3|$. Swap $R_2 \leftrightarrow R_3$:
$$\begin{bmatrix} 3 & 2 & 3 & | & 18 \\ 0 & 10/3 & 8 & | & 10 \\ 0 & -1/3 & -1 & | & -2 \end{bmatrix}$$
Eliminate Column 2:
- $R_3 \leftarrow R_3 - (-1/10)R_2 = R_3 + 0.1 R_2 \implies [0, 0, -1 + 0.8 = -0.2, | -2 + 1 = -1]$

**Step 4: Back-Substitution**
1. From Row 3: $-0.2z = -1 \implies z = 5$.
2. From Row 2: $(10/3)y + 8(5) = 10 \implies (10/3)y = -30 \implies y = -9$.
3. From Row 1: $3x + 2(-9) + 3(5) = 18 \implies 3x - 18 + 15 = 18 \implies 3x = 21 \implies x = 7$.

**Final Solution:** $x = 7, y = -9, z = 5$.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
RK4 step-by-step evaluation, Simpson's 1/3rd rule numerical integration, and Gauss elimination with pivoting are guaranteed 10/15 mark questions.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
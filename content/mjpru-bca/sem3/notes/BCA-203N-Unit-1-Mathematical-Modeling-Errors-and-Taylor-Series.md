# BCA-203N: Numerical Analysis and Statistical Techniques
## Unit 1 Master Exam Revision Notes: Mathematical Modeling, Errors & Taylor Series
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `96e6e0ec-a7dc-5b08-818e-fb1320c77a03` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Mathematical Modeling in Engineering & Computing: Formulation of Real-World Problems, Conservation Laws**
- [x] **Number Representation in Digital Computers: Floating-Point Format, Mantissa, Exponent, Machine Epsilon**
- [x] **Significant Figures: Rules for Identifying Significant Digits, Rounding-Off Rules**
- [x] **Accuracy vs Precision: Bias, Systematic Errors vs Random Inaccuracies in Numerical Methods**
- [x] **Error Definitions: Absolute Error (|True - Approx|), Relative Error, Percentage Error Formulas**
- [x] **Round-off Errors: Chopping vs Symmetric Rounding, Error Accumulation in Multi-Step Arithmetic**
- [x] **Truncation Errors: Error Arising from Replacing Infinite Mathematical Processes with Finite Approximations**
- [x] **Taylor Series Expansion: Statement, Formula, Remainder Term (Lagrange Form), Polynomial Approximation**
- [x] **Error Propagation: Error in Sum, Difference, Product, and Quotient of Numbers**
- [x] **Total Numerical Error: Interplay between Round-Off and Truncation Errors, Optimal Step Size Selection**
- [x] **Conditioning and Stability: Well-Posed Problems vs Ill-Conditioned Systems in Numerical Computation**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define Mathematical Modeling in computer science.
**Model Answer:**
Mathematical modeling is the formulation of a physical, engineering, or computational problem into a system of mathematical equations (algebraic, differential, statistical) that can be solved numerically by digital computers.

### Q2. [2 Marks] What is the difference between Inherent Error and Round-off Error?
**Model Answer:**
- **Inherent (Data) Error:** Errors present in the raw input data itself due to measurement limitations or human entry.
- **Round-off Error:** Errors introduced by the digital computer due to its finite word length representation (e.g., storing 1/3 as 0.333333).

### Q3. [2 Marks] Define Absolute Error, Relative Error, and Percentage Error.
**Model Answer:**
Let $X$ be the true value and $X'$ be the approximate value:
- **Absolute Error ($E_a$):** $|X - X'|$
- **Relative Error ($E_r$):** $\frac{|X - X'|}{|X|}$
- **Percentage Error ($E_p$):** $E_r \times 100\%$

### Q4. [2 Marks] What is Truncation Error in numerical computing?
**Model Answer:**
Truncation error arises when an infinite mathematical process is approximated by a finite sequence of operations (e.g., truncating an infinite Taylor series after a finite number of terms).

### Q5. [2 Marks] State Taylor's Theorem with Remainder.
**Model Answer:**
If $f(x)$ is $(n+1)$-times continuously differentiable in $[a, b]$, then:
$$f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \dots + \frac{f^{(n)}(a)}{n!}(x-a)^n + R_n(x)$$
where $R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}$ for some $\xi \in (a, x)$ (Lagrange Remainder).

### Q6. [2 Marks] What is the Maclaurin Series?
**Model Answer:**
A Maclaurin series is simply a Taylor series expanded about the origin $a = 0$:
$$f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \dots$$

### Q7. [2 Marks] Explain Catastrophic Cancellation in floating-point arithmetic.
**Model Answer:**
When two nearly equal numbers are subtracted (e.g., $1.0000000001 - 1.0000000000$), the leading significant digits cancel out, resulting in a dramatic loss of precision, leaving only noise and round-off error in the result.

### Q8. [2 Marks] What is Machine Epsilon (Unit Roundoff)?
**Model Answer:**
Machine epsilon ($\epsilon_{\text{mach}}$) is the smallest positive floating-point number $\epsilon$ such that $1.0 + \epsilon > 1.0$ in the computer's floating-point system, characterizing the upper bound on relative rounding error.

### Q9. [2 Marks] What is the error propagation rule for a product $u = x \cdot y$?
**Model Answer:**
The relative error in a product equals the sum of the relative errors of its components: $\frac{\Delta u}{u} \approx \frac{\Delta x}{x} + \frac{\Delta y}{y}$.

### Q10. [2 Marks] Define an 'Ill-Conditioned' problem.
**Model Answer:**
A problem is ill-conditioned if a small perturbation or error in the input data leads to a disproportionately large change in the output solution (high condition number $\kappa > 1000$).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Interplay between Truncation Error and Round-Off Error with Step Size $h$.
**Model Answer:**
In numerical differentiation and integration, total numerical error is the sum of mathematical truncation error and computational round-off error:

```
Error |
      |   Total Error
      |    \       /
      |     \     /  <-- Truncation Error O(h^p)
      |      \___/   
      |     /     \  <-- Round-off Error O(eps/h)
      +---------------------------> Step Size (h)
             Optimal h*
```
- As step size $h$ decreases, **Truncation Error** decreases according to $O(h^p)$.
- However, smaller $h$ requires vastly more arithmetic operations, causing accumulated **Round-Off Error** to explode as $O(\epsilon/h)$.
- The minimum total error occurs at the **optimal step size $h^*$** where both error curves intersect.

### Q2. [5 Marks] State and Derive the General Error Propagation Formula for $u = f(x_1, x_2, \dots, x_n)$.
**Model Answer:**
Using Taylor's first-order expansion in multiple variables:
$$\Delta u \approx \frac{\partial f}{\partial x_1}\Delta x_1 + \frac{\partial f}{\partial x_2}\Delta x_2 + \dots + \frac{\partial f}{\partial x_n}\Delta x_n$$
In the worst-case scenario, errors may combine additively:
$$(\Delta u)_{\max} \le \sum_{i=1}^n \left|\frac{\partial f}{\partial x_i}\right| \Delta x_i$$
Relative error is obtained by dividing by $u$:
$$\left(\frac{\Delta u}{u}\right)_{\max} \le \sum_{i=1}^n \left|\frac{\partial \ln f}{\partial x_i}\right| \Delta x_i$$

### Q3. [5 Marks] Explain Floating-Point Number Representation according to the IEEE 754 Standard.
**Model Answer:**
Real numbers are stored in normalized scientific notation: $\pm m \times 2^{e - \text{bias}}$
- **Single Precision (32-bit):**
  - 1 sign bit (0 = positive, 1 = negative)
  - 8 exponent bits (biased by 127)
  - 23 mantissa/fraction bits (~7 decimal digits of precision)
- **Double Precision (64-bit):**
  - 1 sign bit
  - 11 exponent bits (biased by 1023)
  - 52 mantissa bits (~16 decimal digits of precision)

### Q4. [5 Marks] Expand $f(x) = e^x$ using Maclaurin series and estimate the error when $x = 0.2$ using 4 terms.
**Model Answer:**
Maclaurin expansion of $e^x$:
$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \dots$$
Using 4 terms: $e^{0.2} \approx 1 + 0.2 + \frac{0.04}{2} + \frac{0.008}{6} = 1 + 0.2 + 0.02 + 0.001333 = 1.221333$.
Remainder error bound by Lagrange form: $|R_3(0.2)| \le \frac{e^{0.2}}{4!} (0.2)^4 \le \frac{1.3}{24} (0.0016) \approx 0.0000867$.

### Q5. [5 Marks] Discuss Significant Figures and Rules for Rounding Off.
**Model Answer:**
**Significant Figure Rules:**
1. All non-zero digits are significant.
2. Zeros between non-zero digits are significant ($405$ has 3).
3. Leading zeros are NOT significant ($0.0045$ has 2).
4. Trailing zeros after decimal point are significant ($4.500$ has 4).

**Round-to-Even (Banker's Rule):** When the digit to drop is exactly 5 followed by zeros, round to the nearest even number ($4.755 \to 4.76$, $4.745 \to 4.74$) to avoid systematic upward bias.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Perform Comprehensive Error Analysis on Calculating the Volume of a Cylinder $V = \pi r^2 h$ with Measured Tolerances.
**Comprehensive University Solution:**
**Problem Formulation:**
Let radius $r = 2.0 \pm 0.02$ cm and height $h = 10.0 \pm 0.05$ cm. Find the calculated volume, the maximum absolute error, and the percentage error.

**Step 1: Nominal Volume Calculation**
$$V = \pi r^2 h = \pi (2.0)^2 (10.0) = 40\pi \approx 125.6637 \text{ cm}^3$$

**Step 2: Partial Derivatives**
$$\frac{\partial V}{\partial r} = 2\pi r h = 2\pi (2.0)(10.0) = 40\pi \approx 125.66$$
$$\frac{\partial V}{\partial h} = \pi r^2 = \pi (2.0)^2 = 4\pi \approx 12.57$$

**Step 3: Maximum Absolute Error**
$$\Delta V \approx \left|\frac{\partial V}{\partial r}\right| \Delta r + \left|\frac{\partial V}{\partial h}\right| \Delta h = (40\pi)(0.02) + (4\pi)(0.05) = 0.8\pi + 0.2\pi = 1.0\pi \approx 3.1416 \text{ cm}^3$$

**Step 4: Relative and Percentage Error**
$$\frac{\Delta V}{V} = \frac{1.0\pi}{40\pi} = \frac{1}{40} = 0.025$$
$$\text{Percentage Error} = 0.025 \times 100\% = 2.5\%$$

**Conclusion:** The calculated volume is $V = 125.66 \pm 3.14 \text{ cm}^3$, with an overall relative error bound of $2.5\%$.

### Q2. [10/15 Marks] Derive Taylor's Series Formula and Prove the Lagrange Form of the Remainder Term.
**Comprehensive University Solution:**
### 1. Statement
Let $f: [a, b] \to \mathbb{R}$ have continuous derivatives up to order $n$ on $[a, b]$ and $f^{(n+1)}$ exist on $(a, b)$. Then for any $x \in [a, b]$:
$$f(x) = P_n(x) + R_n(x)$$
where $P_n(x) = \sum_{k=0}^n \frac{f^{(k)}(a)}{k!}(x - a)^k$ is the $n$-th degree Taylor polynomial.

### 2. Proof using Rolle's Theorem
Define an auxiliary function $F(t)$ on $[a, x]$:
$$F(t) = f(x) - f(t) - (x - t)f'(t) - \frac{(x - t)^2}{2!}f''(t) - \dots - \frac{(x - t)^n}{n!}f^{(n)}(t) - A(x - t)^{n+1}$$
Choose constant $A$ such that $F(a) = 0$. Note that $F(x) = 0$.
Since $F(t)$ is continuous on $[a, x]$ and differentiable on $(a, x)$ with $F(a) = F(x) = 0$, by **Rolle's Theorem** there exists $\xi \in (a, x)$ such that $F'(\xi) = 0$.

Differentiating $F(t)$ using product rule causes intermediate terms to cancel out telescopically:
$$F'(t) = -\frac{(x - t)^n}{n!}f^{(n+1)}(t) + (n+1)A(x - t)^n$$
Setting $F'(\xi) = 0$:
$$-\frac{(x - \xi)^n}{n!}f^{(n+1)}(\xi) + (n+1)A(x - \xi)^n = 0 \implies A = \frac{f^{(n+1)}(\xi)}{(n+1)!}$$
Since $F(a) = 0$, substituting $A$ into $F(a)$ yields:
$$R_n(x) = A(x - a)^{n+1} = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x - a)^{n+1} \quad \text{Q.E.D.}$

### Q3. [10/15 Marks] Explain Methods for Mitigating Floating-Point Arithmetic Instabilities (Cancellation, Underflow, and Pivot Scaling).
**Comprehensive University Solution:**
### 1. Rewriting Formulas to Eliminate Cancellation
- **Roots of Quadratic Equation:** Standard formula $x_1 = \frac{-b + \sqrt{b^2 - 4ac}}{2a}$ suffers catastrophic cancellation when $b > 0$ and $b^2 \gg 4ac$. Remedy: compute $x_1 = \frac{-2c}{b + \sqrt{b^2 - 4ac}}$ using algebraic conjugation.
- **Trigonometric Small Angles:** $1 - \cos x$ cancels when $x \approx 0$. Remedy: substitute $2\sin^2(x/2)$.

### 2. Guard Digits and Compensated Summation
Kahan's Summation Algorithm tracks small low-order lost bits in a compensation accumulator during long running sums, reducing error growth from $O(n\epsilon)$ to $O(2\epsilon)$.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Taylor series expansion derivation and the error propagation formula for u = f(x,y,z) are core 10/15 mark exam questions. Memorize the absolute, relative, and percentage error definitions.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
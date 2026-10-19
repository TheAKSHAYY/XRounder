# BCA-401E: Mathematics II
## Unit 4 Master Exam Revision Notes: Infinite Series & Tests of Convergence
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `92e71595-e501-433f-89dc-b4e303e6178b` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Infinite Series: Sequence of Partial Sums, Convergent, Divergent, and Oscillatory Series**
- [x] **Alternating Series & Leibniz's Alternating Series Test**
- [x] **Absolute Convergence vs Conditional Convergence of Series**
- [x] **Positive Term Series Tests: p-Series Test (1/n^p convergence conditions)**
- [x] **Comparison Tests: Direct Comparison Test and Limit Comparison Test**
- [x] **D'Alembert's Ratio Test: Statement, Proof Outline & Applied Problems**
- [x] **Cauchy's Root Test (nth Root Test) with Worked Examples**
- [x] **Raabe's Test and Logarithmic Ratio Test for Higher-Order Convergence Decisions**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define Convergence, Divergence, and Oscillation of an infinite series.
**Model Answer:**
- **Convergent:** $\lim_{n \to \infty} S_n = S$ (finite, unique sum).
- **Divergent:** $\lim_{n \to \infty} S_n = +\infty$ or $-\infty$.
- **Oscillatory:** $S_n$ oscillates between multiple values without approaching a single limit (e.g., $1 - 1 + 1 - 1 \dots$).

### Q2. [2 Marks] State the necessary condition for convergence and why it is not sufficient.
**Model Answer:**
If $\sum u_n$ converges, then $\lim_{n \to \infty} u_n = 0$. It is not sufficient because the Harmonic Series $\sum 1/n$ has $\lim 1/n = 0$, yet it diverges to infinity.

### Q3. [2 Marks] State the p-Series Test.
**Model Answer:**
$$\sum_{n=1}^\infty \frac{1}{n^p} = \frac{1}{1^p} + \frac{1}{2^p} + \frac{1}{3^p} + \dots$$
- **Converges** if and only if $p > 1$.
- **Diverges** if $p \le 1$.

### Q4. [2 Marks] State D'Alembert's Ratio Test.
**Model Answer:**
Let $\lim_{n \to \infty} \frac{u_{n+1}}{u_n} = L$ for a positive term series:
- Converges if $L < 1$.
- Diverges if $L > 1$.
- Test fails (inconclusive) if $L = 1$.

### Q5. [2 Marks] State Cauchy's Root Test (nth Root Test).
**Model Answer:**
Let $\lim_{n \to \infty} (u_n)^{1/n} = L$:
- Converges if $L < 1$.
- Diverges if $L > 1$.
- Test fails if $L = 1$.

### Q6. [2 Marks] State Leibniz's Test for Alternating Series $\sum (-1)^{n-1} u_n$.
**Model Answer:**
An alternating series converges if:
1. $u_{n+1} \le u_n$ for all $n$ (monotonically decreasing).
2. $\lim_{n \to \infty} u_n = 0$.

### Q7. [2 Marks] Differentiate Absolute Convergence from Conditional Convergence.
**Model Answer:**
- **Absolute Convergence:** $\sum |u_n|$ converges (implies $\sum u_n$ converges).
- **Conditional Convergence:** $\sum u_n$ converges, but $\sum |u_n|$ diverges (e.g., Alternating Harmonic Series $\sum (-1)^{n-1}/n$).

### Q8. [2 Marks] State Raabe's Test.
**Model Answer:**
When D'Alembert's ratio test gives $L = 1$, compute:
$$\lim_{n \to \infty} n \left( \frac{u_n}{u_{n+1}} - 1 \right) = R$$
- Converges if $R > 1$, diverges if $R < 1$, fails if $R = 1$.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Test the convergence of the series using D'Alembert's Ratio Test:
$$\sum_{n=1}^\infty \frac{n^2}{2^n}$$.
**Model Answer:**
### Solution
$u_n = \frac{n^2}{2^n}$
$u_{n+1} = \frac{(n + 1)^2}{2^{n+1}}$
Compute ratio:
$$\frac{u_{n+1}}{u_n} = \frac{(n + 1)^2}{2^{n+1}} \times \frac{2^n}{n^2} = \frac{1}{2} \left( \frac{n + 1}{n} \right)^2 = \frac{1}{2} \left( 1 + \frac{1}{n} \right)^2$$
Take limit as $n \to \infty$:
$$L = \lim_{n \to \infty} \frac{u_{n+1}}{u_n} = \frac{1}{2}(1 + 0)^2 = \frac{1}{2}$$
Since $L = \frac{1}{2} < 1$, the series is **Convergent** by D'Alembert's Ratio Test.

### Q2. [5 Marks] Test the convergence of the series using Cauchy's Root Test:
$$\sum_{n=1}^\infty \left( \frac{n}{n + 1} \right)^{n^2}$$.
**Model Answer:**
### Solution
$u_n = \left( \frac{n}{n + 1} \right)^{n^2}$
Apply Cauchy's root test:
$$(u_n)^{1/n} = \left[ \left( \frac{n}{n + 1} \right)^{n^2} \right]^{1/n} = \left( \frac{n}{n + 1} \right)^n = \frac{1}{\left( 1 + \frac{1}{n} \right)^n}$$
Take limit as $n \to \infty$:
$$L = \lim_{n \to \infty} (u_n)^{1/n} = \lim_{n \to \infty} \frac{1}{\left( 1 + \frac{1}{n} \right)^n} = \frac{1}{e}$$
Since $e \approx 2.718$, $L = \frac{1}{e} \approx 0.368 < 1$.
By Cauchy's Root Test, the series is **Convergent**.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Discuss Tests of Convergence in comprehensive detail. State the hierarchy of tests (Comparison -> Ratio -> Cauchy Root -> Raabe's) and test the convergence of:
$$\frac{x}{1 \cdot 2} + \frac{x^2}{3 \cdot 4} + \frac{x^3}{5 \cdot 6} + \dots \quad (x > 0)$$.
**Comprehensive University Solution:**
### 1. General Term Formulation
The $n$-th term is:
$$u_n = \frac{x^n}{(2n - 1)(2n)}$$
$$u_{n+1} = \frac{x^{n+1}}{(2n + 1)(2n + 2)}$$

### 2. D'Alembert's Ratio Test
$$\frac{u_{n+1}}{u_n} = \frac{x^{n+1}}{(2n + 1)(2n + 2)} \times \frac{(2n - 1)(2n)}{x^n} = x \cdot \frac{2n(2n - 1)}{(2n + 1)(2n + 2)} = x \cdot \frac{4n^2 - 2n}{4n^2 + 6n + 2}$$
Dividing by $n^2$:
$$L = \lim_{n \to \infty} \frac{u_{n+1}}{u_n} = x \cdot \lim_{n \to \infty} \frac{4 - 2/n}{4 + 6/n + 2/n^2} = x \cdot 1 = x$$
- If $x < 1$: Series **Converges**.
- If $x > 1$: Series **Diverges**.
- If $x = 1$: Ratio test fails ($L = 1$).

### 3. Investigation at $x = 1$ (Limit Comparison Test)
When $x = 1$:
$$u_n = \frac{1}{4n^2 - 2n}$$
Choose auxiliary series $v_n = \frac{1}{n^2}$ (which converges by $p$-series test, $p = 2 > 1$).
$$\lim_{n \to \infty} \frac{u_n}{v_n} = \lim_{n \to \infty} \frac{n^2}{4n^2 - 2n} = \lim_{n \to \infty} \frac{1}{4 - 2/n} = \frac{1}{4} \neq 0 \text{ (finite)}$$
By Limit Comparison Test, $\sum u_n$ converges at $x = 1$.

### 4. Final Conclusion
The series **Converges for $x \le 1$** and **Diverges for $x > 1$**.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-401E Unit 4, series involving powers of $x$ tested via D'Alembert's Ratio Test followed by testing boundary condition $x = 1$ using Comparison Test or Raabe's Test are the single most important 10–15 mark exam questions.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
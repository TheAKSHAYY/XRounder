# BCA-401E: Mathematics II
## Unit 5 Master Exam Revision Notes: Mean Value Theorems, Taylor/Maclaurin Series & Extrema
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `291be6f9-6552-4446-bcc9-1e062af8bfcd` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Rolle's Theorem: Statement, Geometric Interpretation & Verification Conditions**
- [x] **Lagrange's Mean Value Theorem: Statement, Geometric Meaning & Applications**
- [x] **Cauchy's Mean Value Theorem: Statement and Analytical Significance**
- [x] **Taylor's Theorem with Remainder Term and Maclaurin's Theorem**
- [x] **Maclaurin Series Expansion for Elementary Functions: sin(x), cos(x), tan(x), e^x, log(1+x), log(1-x)**
- [x] **Indeterminate Forms: L'Hospital's Rule applied to 0/0, infinity/infinity, 0*infinity, 1^infinity**
- [x] **Applications of Maxima and Minima to Practical Geometric and Economic Optimization Problems**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] State the three conditions and conclusion of Rolle's Theorem.
**Model Answer:**
1. $f(x)$ is continuous on $[a, b]$.
2. $f(x)$ is differentiable on $(a, b)$.
3. $f(a) = f(b)$.
**Conclusion:** There exists at least one $c \in (a, b)$ such that $f'(c) = 0$.

### Q2. [2 Marks] State Lagrange's Mean Value Theorem (LMVT) and its geometric meaning.
**Model Answer:**
If $f(x)$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then there exists $c \in (a, b)$ such that:
$$f'(c) = \frac{f(b) - f(a)}{b - a}$$
Geometric meaning: The tangent line to the curve at $x = c$ is parallel to the secant chord connecting endpoints $(a, f(a))$ and $(b, f(b))$.

### Q3. [2 Marks] State Cauchy's Mean Value Theorem.
**Model Answer:**
If $f(x)$ and $g(x)$ are continuous on $[a, b]$, differentiable on $(a, b)$, and $g'(x) \neq 0$ on $(a, b)$, then there exists $c \in (a, b)$ such that:
$$\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(c)}{g'(c)}$$

### Q4. [2 Marks] What is the Maclaurin Series formula for expanding $f(x)$ about $x = 0$?
**Model Answer:**
$$f(x) = f(0) + x f'(0) + \frac{x^2}{2!} f''(0) + \frac{x^3}{3!} f'''(0) + \dots + \frac{x^n}{n!} f^{(n)}(0) + \dots$$

### Q5. [2 Marks] Give the Maclaurin expansions for $e^x, \sin x, \cos x$, and $\log(1 + x)$.
**Model Answer:**
- $e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots$
- $\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots$
- $\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots$
- $\log(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \dots$

### Q6. [2 Marks] State L'Hospital's Rule for $0/0$ and $\infty/\infty$ indeterminate forms.
**Model Answer:**
If $\lim_{x \to a} f(x) = 0$ and $\lim_{x \to a} g(x) = 0$ (or both $\pm\infty$), then:
$$\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}$$
provided the limit on the right exists or is infinite.

### Q7. [2 Marks] How is an exponential indeterminate form ($1^\infty, 0^0, \infty^0$) evaluated?
**Model Answer:**
Set $y = f(x)^{g(x)}$. Take natural logarithm: $\ln y = g(x) \ln f(x)$, which converts the form to $0 \times \infty$. Rewrite as a quotient, apply L'Hospital's rule to find limit $L = \lim \ln y$, and obtain final answer $e^L$.

### Q8. [2 Marks] What is a Point of Inflexion?
**Model Answer:**
A point on a curve where concavity changes sign (concave up to concave down, or vice versa); at this point, $f''(x) = 0$ and $f''(x)$ changes sign across the point.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Verify Rolle's Theorem for $f(x) = (x - 1)(x - 2)(x - 3)$ on $[1, 3]$.
**Model Answer:**
### Solution
$f(x) = x^3 - 6x^2 + 11x - 6$.
1. $f(x)$ is a polynomial, hence continuous on $[1, 3]$ and differentiable on $(1, 3)$.
2. $f(1) = 0$ and $f(3) = 0$, so $f(1) = f(3)$.
All three conditions of Rolle's theorem are satisfied.
Now solve $f'(c) = 0$:
$$f'(x) = 3x^2 - 12x + 11 = 0$$
$$c = \frac{12 \pm \sqrt{(-12)^2 - 4(3)(11)}}{2(3)} = \frac{12 \pm \sqrt{144 - 132}}{6} = \frac{12 \pm \sqrt{12}}{6} = 2 \pm \frac{1}{\sqrt{3}}$$
$c_1 = 2 + 0.577 = 2.577 \in (1, 3)$
$c_2 = 2 - 0.577 = 1.423 \in (1, 3)$
Both values lie in $(1, 3)$, verifying Rolle's Theorem.

### Q2. [5 Marks] Evaluate the limit using L'Hospital's Rule:
$$\lim_{x \to 0} \left( \frac{1}{x} - \frac{1}{\sin x} \right)$$.
**Model Answer:**
### Solution
This is indeterminate form $\infty - \infty$.
Combine fractions into a single quotient:
$$\lim_{x \to 0} \frac{\sin x - x}{x \sin x} \quad \left( \text{Form } \frac{0}{0} \right)$$
Apply L'Hospital's Rule (differentiate numerator and denominator):
$$= \lim_{x \to 0} \frac{\cos x - 1}{\sin x + x \cos x} \quad \left( \text{Form } \frac{0}{0} \right)$$
Apply L'Hospital's Rule a second time:
$$= \lim_{x \to 0} \frac{-\sin x}{\cos x + (\cos x - x \sin x)} = \lim_{x \to 0} \frac{-\sin x}{2 \cos x - x \sin x}$$
Substitute $x = 0$:
$$= \frac{-\sin(0)}{2 \cos(0) - 0 \sin(0)} = \frac{0}{2(1) - 0} = \mathbf{0}$$.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Expand $\log(1 + x)$ in ascending powers of $x$ up to four terms using Maclaurin's Theorem, and evaluate $\lim_{x \to 0} (1 + x)^{1/x}$ using logarithmic limits.
**Comprehensive University Solution:**
### 1. Maclaurin Series Expansion of $f(x) = \log(1 + x)$
- $f(x) = \log(1 + x) \implies f(0) = \log(1) = 0$
- $f'(x) = \frac{1}{1 + x} \implies f'(0) = 1$
- $f''(x) = -\frac{1}{(1 + x)^2} \implies f''(0) = -1$
- $f'''(x) = \frac{2}{(1 + x)^3} \implies f'''(0) = 2$
- $f^{(4)}(x) = -\frac{6}{(1 + x)^4} \implies f^{(4)}(0) = -6$

Substitute into Maclaurin's series:
$$f(x) = f(0) + x f'(0) + \frac{x^2}{2!} f''(0) + \frac{x^3}{3!} f'''(0) + \frac{x^4}{4!} f^{(4)}(0) + \dots$$
$$= 0 + x(1) + \frac{x^2}{2}(-1) + \frac{x^3}{6}(2) + \frac{x^4}{24}(-6) + \dots$$
$$\mathbf{\log(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \dots} \quad (-1 < x \le 1)$$

### 2. Evaluation of $\lim_{x \to 0} (1 + x)^{1/x}$ (Form $1^\infty$)
Let $y = (1 + x)^{1/x}$.
Taking natural logarithm on both sides:
$$\ln y = \ln\left[ (1 + x)^{1/x} \right] = \frac{1}{x} \ln(1 + x) = \frac{\ln(1 + x)}{x}$$
As $x \to 0$, this is of form $\frac{0}{0}$.
Apply L'Hospital's Rule:
$$\lim_{x \to 0} \ln y = \lim_{x \to 0} \frac{\frac{d}{dx}[\ln(1 + x)]}{\frac{d}{dx}[x]} = \lim_{x \to 0} \frac{\frac{1}{1 + x}}{1} = \frac{1}{1 + 0} = 1$$
Since $\lim_{x \to 0} \ln y = 1$, we exponentiate:
$$\lim_{x \to 0} y = e^1 = \mathbf{e}$$.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-401E Unit 5, verifying Rolle's Theorem or Lagrange's Mean Value Theorem for polynomials/trig functions, expanding functions via Maclaurin's series, and solving $1^\infty$ limits using L'Hospital's Rule are standard exam problems.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
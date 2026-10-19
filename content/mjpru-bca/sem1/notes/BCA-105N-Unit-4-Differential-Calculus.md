# BCA-105N: Basic Mathematics
## Unit 4 Master Exam Revision Notes: Differential Calculus - Chain Rule, Logs & Trigonometric Differentiation
**Target Examination:** MJPRU Bareilly BCA Semester 1 (CBCS Pattern 2024–25)
**Unit Identifier:** `72c28231-474c-4b38-b3eb-f72ec12003dd` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Calculus Foundations: Concept of Limits, Left-Hand Limit, Right-Hand Limit, Continuity at a Point**
- [x] **Differentiability: Definition of Derivative, Tangent Slope, Geometric Meaning**
- [x] **Differentiation from First Principles (Delta Method): Proofs for x^n, sin x, cos x, e^x, a^x, ln x**
- [x] **Standard Differentiation Formulae: Algebraic, Trigonometric, Exponential & Logarithmic Derivatives**
- [x] **Rules of Differentiation: Derivative of a Constant, Constant Multiple Rule, Sum and Difference Rules**
- [x] **Product Rule (Leibniz Rule): d/dx [u * v] = u * (dv/dx) + v * (du/dx)**
- [x] **Quotient Rule: d/dx [u / v] = (v * du/dx - u * dv/dx) / v^2**
- [x] **Chain Rule (Function of a Function): Differentiation of Composite Functions y = f(g(x))**
- [x] **Derivatives of Exponential Functions: d/dx [e^(kx)], d/dx [a^x] = a^x * ln(a)**
- [x] **Derivatives of Logarithmic Functions: d/dx [ln x] = 1/x, d/dx [log_a x] = 1 / (x * ln a)**
- [x] **Derivatives of Inverse Trigonometric Functions: arcsin x, arccos x, arctan x, arccot x**
- [x] **Differentiation by Trigonometrical Transformations & Algebraic Substitutions**
- [x] **Differentiation of Implicit Functions: Equations where y cannot be explicitly expressed in terms of x**
- [x] **Logarithmic Differentiation: Differentiating Variable-Base Variable-Exponent Functions y = [f(x)]^[g(x)]**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] State the mathematical definition of a Limit: $\lim_{x \to a} f(x) = L$.
**Model Answer:**
For every $\epsilon > 0$, there exists a $\delta > 0$ such that $0 < |x - a| < \delta \implies |f(x) - L| < \epsilon$.

### Q2. [2 Marks] What is the condition for a function $f(x)$ to be continuous at $x = a$?
**Model Answer:**
1. $f(a)$ is defined.
2. $\lim_{x \to a} f(x)$ exists (LHL = RHL).
3. $\lim_{x \to a} f(x) = f(a)$.

### Q3. [2 Marks] State the First Principle definition of the Derivative $f'(x)$.
**Model Answer:**
$$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$

### Q4. [2 Marks] State the Product Rule (Leibniz Formula) of differentiation.
**Model Answer:**
$$\frac{d}{dx}[u \cdot v] = u \frac{dv}{dx} + v \frac{du}{dx}$$

### Q5. [2 Marks] State the Quotient Rule of differentiation.
**Model Answer:**
$$\frac{d}{dx}\left[\frac{u}{v}\right] = \frac{v \frac{du}{dx} - u \frac{dv}{dx}}{v^2}$$

### Q6. [2 Marks] State the Chain Rule for differentiating $y = f(g(x))$.
**Model Answer:**
$$\frac{dy}{dx} = f'(g(x)) \cdot g'(x) = \frac{dy}{du} \cdot \frac{du}{dx}$$ where $u = g(x)$.

### Q7. [2 Marks] What is the derivative of $a^x$ with respect to $x$?
**Model Answer:**
$$\frac{d}{dx}(a^x) = a^x \ln(a)$$

### Q8. [2 Marks] What is the derivative of $\tan^{-1}(x)$ and $\sin^{-1}(x)$?
**Model Answer:**
$$\frac{d}{dx}(\tan^{-1} x) = \frac{1}{1 + x^2}, \quad \frac{d}{dx}(\sin^{-1} x) = \frac{1}{\sqrt{1 - x^2}}$$

### Q9. [2 Marks] When is Logarithmic Differentiation required?
**Model Answer:**
When differentiating functions with a variable base raised to a variable exponent ($y = [f(x)]^{g(x)}$) or complicated products/quotients.

### Q10. [2 Marks] Evaluate standard limit: $\lim_{x \to 0} \frac{\sin x}{x}$.
**Model Answer:**
$$\lim_{x \to 0} \frac{\sin x}{x} = 1 \quad (x \text{ in radians})$$


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Differentiate $f(x) = x^n$ from First Principles (Delta Method).
**Model Answer:**
$$f'(x) = \lim_{h \to 0} \frac{(x + h)^n - x^n}{h}$$
Using binomial expansion for $(x + h)^n$:
$$(x + h)^n = x^n + n x^{n-1} h + \frac{n(n-1)}{2} x^{n-2} h^2 + \dots + h^n$$
Subtract $x^n$ and divide by $h$:
$$f'(x) = \lim_{h \to 0} \left[ n x^{n-1} + \frac{n(n-1)}{2} x^{n-2} h + \dots + h^{n-1} \right]$$
Taking limit as $h \to 0$, all terms containing $h$ vanish:
$$f'(x) = n x^{n-1} \quad \text{(Q.E.D.)}$$

### Q2. [5 Marks] Differentiate $f(x) = \sin(x)$ from First Principles.
**Model Answer:**
$$f'(x) = \lim_{h \to 0} \frac{\sin(x + h) - \sin(x)}{h}$$
Use identity $\sin C - \sin D = 2 \cos\left(\frac{C+D}{2}\right) \sin\left(\frac{C-D}{2}\right)$:
$$f'(x) = \lim_{h \to 0} \frac{2 \cos\left(x + \frac{h}{2}\right) \sin\left(\frac{h}{2}\right)}{h} = \lim_{h \to 0} \cos\left(x + \frac{h}{2}\right) \cdot \lim_{h \to 0} \frac{\sin(h/2)}{h/2}$$
As $h \to 0$: $\cos(x + 0) \times 1 = \cos(x)$. (Q.E.D.)

### Q3. [5 Marks] Differentiate $y = x^x$ using Logarithmic Differentiation.
**Model Answer:**
1. Take natural logarithm on both sides:
$$\ln(y) = \ln(x^x) = x \ln(x)$$
2. Differentiate both sides with respect to $x$ using Product Rule on RHS:
$$\frac{1}{y} \frac{dy}{dx} = 1 \cdot \ln(x) + x \cdot \frac{1}{x} = \ln(x) + 1$$
3. Multiply through by $y$:
$$\frac{dy}{dx} = y (1 + \ln x) = x^x (1 + \ln x)$$

### Q4. [5 Marks] Find $\frac{dy}{dx}$ if $x^3 + y^3 = 3axy$ (Folium of Descartes) using Implicit Differentiation.
**Model Answer:**
Differentiate each term with respect to $x$:
$$\frac{d}{dx}(x^3) + \frac{d}{dx}(y^3) = 3a \frac{d}{dx}(xy)$$
$$3x^2 + 3y^2 \frac{dy}{dx} = 3a \left( y + x \frac{dy}{dx} \right)$$
Divide by 3:
$$x^2 + y^2 \frac{dy}{dx} = ay + ax \frac{dy}{dx}$$
Collect $\frac{dy}{dx}$ terms:
$$(y^2 - ax) \frac{dy}{dx} = ay - x^2$$
$$\frac{dy}{dx} = \frac{ay - x^2}{y^2 - ax}$$

### Q5. [5 Marks] Find the derivative of $y = \tan^{-1}\left(\frac{2x}{1 - x^2}\right)$.
**Model Answer:**
Substitute $x = \tan(\theta) \implies \theta = \tan^{-1}(x)$:
$$y = \tan^{-1}\left(\frac{2 \tan\theta}{1 - \tan^2\theta}\right) = \tan^{-1}(\tan 2\theta) = 2\theta = 2 \tan^{-1}(x)$$
Differentiating with respect to $x$:
$$\frac{dy}{dx} = \frac{2}{1 + x^2}$$


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] If $y = e^{m \sin^{-1} x}$, prove that $(1 - x^2) y_2 - x y_1 - m^2 y = 0$ (Leibniz Theorem Application).
**Comprehensive University Solution:**
### 1. First Derivative $y_1$
$$y = e^{m \sin^{-1} x}$$
$$y_1 = \frac{dy}{dx} = e^{m \sin^{-1} x} \cdot \frac{d}{dx}(m \sin^{-1} x) = y \cdot \frac{m}{\sqrt{1 - x^2}}$$
Cross-multiply:
$$\sqrt{1 - x^2} \, y_1 = m y$$

### 2. Square Both Sides
$$(1 - x^2) y_1^2 = m^2 y^2$$

### 3. Differentiate with Respect to $x$
$$\frac{d}{dx}\left[(1 - x^2) y_1^2\right] = \frac{d}{dx}[m^2 y^2]$$
Using product rule on LHS and chain rule on RHS:
$$-2x y_1^2 + (1 - x^2) \cdot 2 y_1 y_2 = m^2 \cdot 2y y_1$$
Divide through by the common factor $2 y_1$ (since $y_1 \ne 0$):
$$-x y_1 + (1 - x^2) y_2 = m^2 y$$
Rearranging terms:
$$(1 - x^2) y_2 - x y_1 - m^2 y = 0 \quad \text{(Q.E.D.)}$$

### Q2. [10/15 Marks] Find the derivative of $y = (\sin x)^{\cos x} + (\cos x)^{\sin x}$.
**Comprehensive University Solution:**
Let $y = u + v$, so $\frac{dy}{dx} = \frac{du}{dx} + \frac{dv}{dx}$.

### 1. Differentiate $u = (\sin x)^{\cos x}$
$$\ln u = \cos x \cdot \ln(\sin x)$$
$$\frac{1}{u} \frac{du}{dx} = -\sin x \ln(\sin x) + \cos x \cdot \frac{\cos x}{\sin x} = -\sin x \ln(\sin x) + \frac{\cos^2 x}{\sin x}$$
$$\frac{du}{dx} = (\sin x)^{\cos x} [\cot x \cos x - \sin x \ln(\sin x)]$$

### 2. Differentiate $v = (\cos x)^{\sin x}$
$$\ln v = \sin x \cdot \ln(\cos x)$$
$$\frac{1}{v} \frac{dv}{dx} = \cos x \ln(\cos x) + \sin x \cdot \frac{-\sin x}{\cos x} = \cos x \ln(\cos x) - \frac{\sin^2 x}{\cos x}$$
$$\frac{dv}{dx} = (\cos x)^{\sin x} [\cos x \ln(\cos x) - \tan x \sin x]$$

### 3. Final Sum
$$\frac{dy}{dx} = (\sin x)^{\cos x} [\cot x \cos x - \sin x \ln(\sin x)] + (\cos x)^{\sin x} [\cos x \ln(\cos x) - \tan x \sin x]$$

### Q3. [10/15 Marks] Explain Tangents, Normals, and Extreme Values (Maxima and Minima) with the First and Second Derivative Tests.
**Comprehensive University Solution:**
### 1. Equations of Tangent and Normal
For a smooth curve $y = f(x)$ at point $(x_0, y_0)$:
- **Slope of Tangent:** $m = \left(\frac{dy}{dx}\right)_{(x_0, y_0)}$
- **Tangent Equation:** $y - y_0 = m(x - x_0)$
- **Slope of Normal:** $m_{\text{norm}} = -\frac{1}{m}$
- **Normal Equation:** $y - y_0 = -\frac{1}{m}(x - x_0)$

### 2. Second Derivative Test for Maxima and Minima
1. Find $f'(x)$ and solve $f'(x) = 0$ to obtain critical stationary points $x = c$.
2. Compute $f''(x)$ and evaluate at each critical point:
   - If $f''(c) < 0 \implies$ **Local Maximum** at $x = c$.
   - If $f''(c) > 0 \implies$ **Local Minimum** at $x = c$.
   - If $f''(c) = 0 \implies$ Test is inconclusive (inflection point analysis required).


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-105N Unit 4, the classic questions are: First Principles derivation of sin(x) or x^n, proving (1-x^2)y2 - xy1 - m^2y = 0, and differentiating variable-base functions like x^x. Show all intermediate steps clearly.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
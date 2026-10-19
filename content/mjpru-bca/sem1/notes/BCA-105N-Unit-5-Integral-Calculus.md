# BCA-105N: Basic Mathematics
## Unit 5 Master Exam Revision Notes: Integral Calculus - Substitution, Trigonometric Identities & Parts
**Target Examination:** MJPRU Bareilly BCA Semester 1 (CBCS Pattern 2024–25)
**Unit Identifier:** `849ab8b5-b2b2-4818-b154-382c76210676` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Indefinite Integration Fundamentals: Concept of Anti-Derivative, Indefinite Integral Notation, Constant of Integration (C)**
- [x] **Geometric Interpretation of Indefinite Integral: Family of Curves**
- [x] **Standard Integration Formulae: Power Rule int(x^n dx), Trigonometric, Exponential & Logarithmic Integrals**
- [x] **Properties of Integrals: Linearity Property, Integral of Constant Multiple, Integral of Sum/Difference**
- [x] **Integration by Substitution Method: Transformations of the Form int f(g(x)) * g'(x) dx**
- [x] **Standard Substitutions: Integrals involving sqrt(a^2 - x^2), sqrt(a^2 + x^2), sqrt(x^2 - a^2)**
- [x] **Integration Using Trigonometric Identities: Integrals of sin^2(x), cos^2(x), tan^2(x), sin(ax)cos(bx), sin(3x)**
- [x] **Integrals of Standard Rational & Irrational Functions: int dx / (x^2 + a^2), int dx / (x^2 - a^2), int dx / sqrt(a^2 - x^2)**
- [x] **Integration by Parts: Derivation from Product Rule of Differentiation (int u*v dx = u*int v dx - int (u' * int v dx) dx)**
- [x] **ILATE Rule for Selecting First Function (u): Inverse Trig, Logarithmic, Algebraic, Trigonometric, Exponential**
- [x] **Repeated Integration by Parts & Cyclic Integrals (e.g., int e^(ax) * sin(bx) dx)**
- [x] **Definite Integrals Preview: Fundamental Theorem of Calculus & Basic Evaluation**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define Indefinite Integration and explain the Constant of Integration $C$.
**Model Answer:**
Integration is the inverse operation of differentiation (antiderivative). If $\frac{d}{dx}[F(x)] = f(x)$, then $\int f(x) dx = F(x) + C$. $C$ represents an arbitrary constant because the derivative of any constant is zero.

### Q2. [2 Marks] State the Power Rule of integration.
**Model Answer:**
$$\int x^n dx = \frac{x^{n+1}}{n + 1} + C \quad (n \ne -1)$$

### Q3. [2 Marks] What is $\int \frac{1}{x} dx$?
**Model Answer:**
$$\int \frac{1}{x} dx = \ln|x| + C$$

### Q4. [2 Marks] State the formula for Integration by Parts.
**Model Answer:**
$$\int u v dx = u \int v dx - \int \left( \frac{du}{dx} \int v dx \right) dx$$

### Q5. [2 Marks] Explain the ILATE rule for selecting the first function $u$ in Integration by Parts.
**Model Answer:**
**I** = Inverse Trigonometric (e.g. $\sin^{-1} x$)
**L** = Logarithmic (e.g. $\ln x$)
**A** = Algebraic (e.g. $x^2, 3x$)
**T** = Trigonometric (e.g. $\sin x$)
**E** = Exponential (e.g. $e^x$)

### Q6. [2 Marks] State the standard formula for $\int \frac{dx}{x^2 + a^2}$.
**Model Answer:**
$$\int \frac{dx}{x^2 + a^2} = \frac{1}{a} \tan^{-1}\left(\frac{x}{a}\right) + C$$

### Q7. [2 Marks] State the standard formula for $\int \frac{dx}{\sqrt{a^2 - x^2}}$.
**Model Answer:**
$$\int \frac{dx}{\sqrt{a^2 - x^2}} = \sin^{-1}\left(\frac{x}{a}\right) + C$$

### Q8. [2 Marks] What is the King's Property of Definite Integrals?
**Model Answer:**
$$\int_{0}^{a} f(x) dx = \int_{0}^{a} f(a - x) dx$$

### Q9. [2 Marks] What is the integral of an odd function $f(-x) = -f(x)$ over a symmetric interval $[-a, a]$?
**Model Answer:**
$$\int_{-a}^{a} f(x) dx = 0$$

### Q10. [2 Marks] State the Fundamental Theorem of Calculus.
**Model Answer:**
If $f(x)$ is continuous on $[a, b]$ and $F'(x) = f(x)$, then $\int_{a}^{b} f(x) dx = F(b) - F(a)$.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Evaluate $\int \tan(x) dx$ and $\int \sec(x) dx$.
**Model Answer:**
1. $\int \tan x dx = \int \frac{\sin x}{\cos x} dx$. Let $u = \cos x \implies du = -\sin x dx$:
$$\int -\frac{du}{u} = -\ln|u| + C = -\ln|\cos x| + C = \ln|\sec x| + C$$
2. $\int \sec x dx$: Multiply numerator and denominator by $(\sec x + \tan x)$:
$$\int \frac{\sec^2 x + \sec x \tan x}{\sec x + \tan x} dx = \ln|\sec x + \tan x| + C$$

### Q2. [5 Marks] Evaluate $\int x e^x dx$ using Integration by Parts.
**Model Answer:**
Using ILATE: $u = x$ (Algebraic), $v = e^x$ (Exponential).
$$\int x e^x dx = x \int e^x dx - \int \left( \frac{d}{dx}(x) \int e^x dx \right) dx$$
$$= x e^x - \int 1 \cdot e^x dx = x e^x - e^x + C = e^x(x - 1) + C$$

### Q3. [5 Marks] Evaluate $\int \ln(x) dx$.
**Model Answer:**
Rewrite as $\int (\ln x \cdot 1) dx$. By ILATE: $u = \ln x, v = 1$.
$$\int \ln x \cdot 1 dx = \ln x \int 1 dx - \int \left( \frac{1}{x} \cdot x \right) dx$$
$$= x \ln x - \int 1 dx = x \ln x - x + C = x(\ln x - 1) + C$$

### Q4. [5 Marks] Evaluate $\int \sin^2(x) dx$.
**Model Answer:**
Use trigonometric half-angle identity: $\sin^2 x = \frac{1 - \cos 2x}{2}$:
$$\int \sin^2 x dx = \int \frac{1 - \cos 2x}{2} dx = \frac{1}{2} \int 1 dx - \frac{1}{2} \int \cos 2x dx$$
$$= \frac{x}{2} - \frac{\sin 2x}{4} + C$$

### Q5. [5 Marks] Evaluate the definite integral $\int_{0}^{\pi/2} \frac{\sqrt{\sin x}}{\sqrt{\sin x} + \sqrt{\cos x}} dx$.
**Model Answer:**
Let $I = \int_{0}^{\pi/2} \frac{\sqrt{\sin x}}{\sqrt{\sin x} + \sqrt{\cos x}} dx$ --- (1)
Apply King's property $\int_0^a f(x) dx = \int_0^a f(a - x) dx$:
$$I = \int_{0}^{\pi/2} \frac{\sqrt{\sin(\pi/2 - x)}}{\sqrt{\sin(\pi/2 - x)} + \sqrt{\cos(\pi/2 - x)}} dx = \int_{0}^{\pi/2} \frac{\sqrt{\cos x}}{\sqrt{\cos x} + \sqrt{\sin x}} dx \text{ --- (2)}$$
Add (1) and (2):
$$2I = \int_{0}^{\pi/2} \frac{\sqrt{\sin x} + \sqrt{\cos x}}{\sqrt{\sin x} + \sqrt{\cos x}} dx = \int_{0}^{\pi/2} 1 dx = [x]_0^{\pi/2} = \frac{\pi}{2}$$
$$I = \frac{\pi}{4}$$


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Evaluate the cyclic integral $\int e^{ax} \sin(bx) dx$ using repeated Integration by Parts.
**Comprehensive University Solution:**
Let $I = \int e^{ax} \sin(bx) dx$. By ILATE: $u = \sin(bx), v = e^{ax}$.

### 1. First Integration by Parts
$$I = \sin(bx) \left( \frac{e^{ax}}{a} \right) - \int b \cos(bx) \left( \frac{e^{ax}}{a} \right) dx$$
$$I = \frac{e^{ax} \sin(bx)}{a} - \frac{b}{a} \int e^{ax} \cos(bx) dx \quad \text{--- (1)}$$

### 2. Second Integration by Parts on $\int e^{ax} \cos(bx) dx$
Let $J = \int e^{ax} \cos(bx) dx$ where $u = \cos(bx), v = e^{ax}$:
$$J = \cos(bx) \left(\frac{e^{ax}}{a}\right) - \int -b \sin(bx) \left(\frac{e^{ax}}{a}\right) dx$$
$$J = \frac{e^{ax} \cos(bx)}{a} + \frac{b}{a} \int e^{ax} \sin(bx) dx = \frac{e^{ax} \cos(bx)}{a} + \frac{b}{a} I$$

### 3. Substitute $J$ back into (1)
$$I = \frac{e^{ax} \sin(bx)}{a} - \frac{b}{a} \left[ \frac{e^{ax} \cos(bx)}{a} + \frac{b}{a} I \right]$$
$$I = \frac{e^{ax} \sin(bx)}{a} - \frac{b e^{ax} \cos(bx)}{a^2} - \frac{b^2}{a^2} I$$

### 4. Solve for $I$
$$\left( 1 + \frac{b^2}{a^2} \right) I = \frac{e^{ax}}{a^2} [a \sin(bx) - b \cos(bx)]$$
$$\left( \frac{a^2 + b^2}{a^2} \right) I = \frac{e^{ax}}{a^2} [a \sin(bx) - b \cos(bx)]$$
$$I = \frac{e^{ax}}{a^2 + b^2} [a \sin(bx) - b \cos(bx)] + C$$

### Q2. [10/15 Marks] Evaluate $\int \frac{2x + 3}{(x - 1)(x + 2)(x + 3)} dx$ using Partial Fractions.
**Comprehensive University Solution:**
Set up partial fractions:
$$\frac{2x + 3}{(x - 1)(x + 2)(x + 3)} = \frac{A}{x - 1} + \frac{B}{x + 2} + \frac{C}{x + 3}$$
Multiply through by $(x - 1)(x + 2)(x + 3)$:
$$2x + 3 = A(x + 2)(x + 3) + B(x - 1)(x + 3) + C(x - 1)(x + 2)$$

1. Set $x = 1$:
$$2(1) + 3 = A(3)(4) \implies 5 = 12A \implies A = \frac{5}{12}$$
2. Set $x = -2$:
$$2(-2) + 3 = B(-3)(1) \implies -1 = -3B \implies B = \frac{1}{3}$$
3. Set $x = -3$:
$$2(-3) + 3 = C(-4)(-1) \implies -3 = 4C \implies C = -\frac{3}{4}$$

Now integrate each term:
$$\int \left( \frac{5/12}{x - 1} + \frac{1/3}{x + 2} - \frac{3/4}{x + 3} \right) dx$$
$$= \frac{5}{12} \ln|x - 1| + \frac{1}{3} \ln|x + 2| - \frac{3}{4} \ln|x + 3| + C$$

### Q3. [10/15 Marks] Find the area enclosed by the parabola $y^2 = 4ax$ and its latus rectum $x = a$.
**Comprehensive University Solution:**
### 1. Curve Analysis
The parabola opens to the right, symmetric about the x-axis. Latus rectum is the vertical line $x = a$.

### 2. Area Formulation
Due to symmetry above and below the x-axis:
$$\text{Total Area} = 2 \int_{0}^{a} y dx = 2 \int_{0}^{a} \sqrt{4ax} \, dx = 2 \times 2 \sqrt{a} \int_{0}^{a} x^{1/2} dx$$
$$= 4 \sqrt{a} \left[ \frac{x^{3/2}}{3/2} \right]_{0}^{a} = 4 \sqrt{a} \times \frac{2}{3} [a^{3/2} - 0]$$
$$= \frac{8}{3} \sqrt{a} \cdot a^{3/2} = \frac{8}{3} a^2 \quad \text{sq. units}$$


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-105N Unit 5, the famous definite integral yielding pi/4 using King's property, e^(ax)sin(bx) by parts, and area under parabola y^2 = 4ax are constant university exam questions.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
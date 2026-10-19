# BCA-401E: Mathematics II
## Unit 3 Master Exam Revision Notes: Functions of Several Variables & Partial Differentiation
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `ac0fb7be-e747-43a9-918d-c9f6cd2ae5e0` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Functions of Several Variables: Limit and Continuity of Two-Variable Functions**
- [x] **Indeterminate Forms and Evaluation Techniques**
- [x] **Partial Differentiation: First-Order and Higher-Order Partial Derivatives**
- [x] **Chain Rule for Functions of Two and Three Independent Variables**
- [x] **Euler's Theorem for Homogeneous Functions and Verification with Examples**
- [x] **Jacobians: Definition, Properties, Chain Rule for Jacobians & Functional Dependence**
- [x] **Extrema of Functions of Two Variables: Necessary and Sufficient Conditions for Maxima and Minima**
- [x] **Vector Differentiation: Scalar and Vector Fields, Gradient, Divergence, and Curl Operators**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Why does the limit of $(xy) / (x^2 + y^2)$ not exist as $(x, y) \to (0, 0)$?
**Model Answer:**
Approaching along straight lines $y = mx$:
$$\lim_{x \to 0} \frac{x(mx)}{x^2 + m^2 x^2} = \lim_{x \to 0} \frac{m x^2}{x^2(1 + m^2)} = \frac{m}{1 + m^2}$$
Since the limit depends on the path slope $m$, the multivariable limit does not exist.

### Q2. [2 Marks] State Euler's Theorem for a Homogeneous Function $u = f(x, y)$ of degree $n$.
**Model Answer:**
$$x \frac{\partial u}{\partial x} + y \frac{\partial u}{\partial y} = n u$$
And its second-order form: $x^2 \frac{\partial^2 u}{\partial x^2} + 2xy \frac{\partial^2 u}{\partial x \partial y} + y^2 \frac{\partial^2 u}{\partial y^2} = n(n - 1) u$.

### Q3. [2 Marks] Define the Jacobian of $u, v$ with respect to $x, y$.
**Model Answer:**
$$J = \frac{\partial(u, v)}{\partial(x, y)} = \begin{vmatrix} \frac{\partial u}{\partial x} & \frac{\partial u}{\partial y} \\ \frac{\partial v}{\partial x} & \frac{\partial v}{\partial y} \end{vmatrix} = \frac{\partial u}{\partial x} \frac{\partial v}{\partial y} - \frac{\partial u}{\partial y} \frac{\partial v}{\partial x}$$

### Q4. [2 Marks] State the necessary and sufficient conditions for $f(x, y)$ to have a local maximum or minimum at $(a, b)$.
**Model Answer:**
- **Necessary:** $f_x(a, b) = 0$ and $f_y(a, b) = 0$.
- Let $r = f_{xx}, s = f_{xy}, t = f_{yy}$ at $(a, b)$:
  - If $rt - s^2 > 0$ and $r < 0$ => **Local Maximum**.
  - If $rt - s^2 > 0$ and $r > 0$ => **Local Minimum**.
  - If $rt - s^2 < 0$ => **Saddle Point**.
  - If $rt - s^2 = 0$ => **Inconclusive**.

### Q5. [2 Marks] Define Gradient, Divergence, and Curl.
**Model Answer:**
- **Gradient (grad $\phi$):** $\nabla \phi = i \frac{\partial \phi}{\partial x} + j \frac{\partial \phi}{\partial y} + k \frac{\partial \phi}{\partial z}$ (Vector normal to level surface).
- **Divergence (div $V$):** $\nabla \cdot V = \frac{\partial V_1}{\partial x} + \frac{\partial V_2}{\partial y} + \frac{\partial V_3}{\partial z}$ (Scalar flux).
- **Curl (curl $V$):** $\nabla \times V = \begin{vmatrix} i & j & k \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ V_1 & V_2 & V_3 \end{vmatrix}$ (Rotational circulation).

### Q6. [2 Marks] What is a Solenoidal Vector Field and an Irrotational Vector Field?
**Model Answer:**
- **Solenoidal:** $\text{div } V = \nabla \cdot V = 0$.
- **Irrotational:** $\text{curl } V = \nabla \times V = 0$ (implies $V = \nabla \phi$ for scalar potential $\phi$).

### Q7. [2 Marks] Prove that $\text{div}(\text{curl } V) = 0$ for any vector field $V$.
**Model Answer:**
$$\nabla \cdot (\nabla \times V) = \frac{\partial}{\partial x}\left(\frac{\partial V_3}{\partial y} - \frac{\partial V_2}{\partial z}\right) + \frac{\partial}{\partial y}\left(\frac{\partial V_1}{\partial z} - \frac{\partial V_3}{\partial x}\right) + \frac{\partial}{\partial z}\left(\frac{\partial V_2}{\partial x} - \frac{\partial V_1}{\partial y}\right) = 0$$
By equality of mixed partial derivatives.

### Q8. [2 Marks] What is the Directional Derivative of $\phi$ in the direction of vector $A$?
**Model Answer:**
$$\text{Directional Derivative} = \nabla \phi \cdot \hat{A} = \nabla \phi \cdot \frac{A}{|A|}$$


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] If $u = \sin^{-1} \left[ \frac{x^2 + y^2}{x + y} \right]$, prove using Euler's Theorem that $x \frac{\partial u}{\partial x} + y \frac{\partial u}{\partial y} = \tan u$.
**Model Answer:**
### Proof
Let $z = \sin u = \frac{x^2 + y^2}{x + y}$.
$z(tx, ty) = \frac{t^2(x^2 + y^2)}{t(x + y)} = t^1 z(x, y)$.
Thus $z$ is a homogeneous function of degree $n = 1$.
By Euler's Theorem on $z$:
$$x \frac{\partial z}{\partial x} + y \frac{\partial z}{\partial y} = 1 \cdot z$$
Since $z = \sin u$:
$$\frac{\partial z}{\partial x} = \cos u \frac{\partial u}{\partial x}, \quad \frac{\partial z}{\partial y} = \cos u \frac{\partial u}{\partial y}$$
Substitute into Euler's equation:
$$x \left( \cos u \frac{\partial u}{\partial x} \right) + y \left( \cos u \frac{\partial u}{\partial y} \right) = \sin u$$
Divide both sides by $\cos u$:
$$x \frac{\partial u}{\partial x} + y \frac{\partial u}{\partial y} = \frac{\sin u}{\cos u} = \mathbf{\tan u}$$.
Hence proved.

### Q2. [5 Marks] Find the directional derivative of $\phi = x^2 y z + 4 x z^2$ at the point $(1, -2, -1)$ in the direction of vector $2i - j - 2k$.
**Model Answer:**
### 1. Compute $\nabla \phi$
$\frac{\partial \phi}{\partial x} = 2xyz + 4z^2$
$\frac{\partial \phi}{\partial y} = x^2 z$
$\frac{\partial \phi}{\partial z} = x^2 y + 8xz$
At point $(1, -2, -1)$:
- $\frac{\partial \phi}{\partial x} = 2(1)(-2)(-1) + 4(-1)^2 = 4 + 4 = 8$
- $\frac{\partial \phi}{\partial y} = (1)^2(-1) = -1$
- $\frac{\partial \phi}{\partial z} = (1)^2(-2) + 8(1)(-1) = -2 - 8 = -10$
$$\nabla \phi = 8i - j - 10k$$

### 2. Unit Vector in direction $A = 2i - j - 2k$
$|A| = \sqrt{2^2 + (-1)^2 + (-2)^2} = \sqrt{4 + 1 + 4} = \sqrt{9} = 3$.
$$\hat{A} = \frac{2i - j - 2k}{3}$$

### 3. Directional Derivative
$$\nabla \phi \cdot \hat{A} = \frac{8(2) + (-1)(-1) + (-10)(-2)}{3} = \frac{16 + 1 + 20}{3} = \frac{37}{3}$$.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Find the local extrema and saddle points of the function $f(x, y) = x^3 + y^3 - 3axy$ ($a > 0$).
**Comprehensive University Solution:**
### 1. Find Stationary (Critical) Points
$f_x = 3x^2 - 3ay = 0 \implies x^2 = ay \implies y = \frac{x^2}{a}$
$f_y = 3y^2 - 3ax = 0 \implies y^2 = ax$
Substitute $y = x^2 / a$ into second equation:
$$\left( \frac{x^2}{a} \right)^2 = ax \implies \frac{x^4}{a^2} = ax \implies x(x^3 - a^3) = 0$$
$x = 0$ or $x = a$.
- If $x = 0 \implies y = 0$. Stationary point: **$(0, 0)$**.
- If $x = a \implies y = a^2 / a = a$. Stationary point: **$(a, a)$**.

### 2. Second Partial Derivatives
$r = f_{xx} = 6x$
$s = f_{xy} = -3a$
$t = f_{yy} = 6y$
Discriminant $D = rt - s^2 = (6x)(6y) - (-3a)^2 = 36xy - 9a^2$.

### 3. Classify Point $(0, 0)$
$D = 36(0)(0) - 9a^2 = -9a^2 < 0$.
Since $rt - s^2 < 0$, **$(0, 0)$ is a Saddle Point**.

### 4. Classify Point $(a, a)$
$D = 36(a)(a) - 9a^2 = 36a^2 - 9a^2 = 27a^2 > 0$.
$r = 6a > 0$.
Since $rt - s^2 > 0$ and $r > 0$, **$f(x, y)$ has a Local Minimum at $(a, a)$**.
Minimum value: $f(a, a) = a^3 + a^3 - 3a(a)(a) = 2a^3 - 3a^3 = \mathbf{-a^3}$.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-401E Unit 3, Euler's Theorem trigonometric problems, Directional Derivative calculations, and Maxima/Minima of $x^3 + y^3 - 3axy$ are the most frequently asked university problems. Work through every derivative step.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
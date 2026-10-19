# BCA-203N: Numerical Analysis and Statistical Techniques
## Unit 4 Master Exam Revision Notes: Least-Squares Curve Fitting & Linear Programming
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `77327cbc-9bcf-5d52-b408-33b650aa393f` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Curve Fitting Fundamentals: Scatter Plots, Trend Lines, Interpolation vs Curve Fitting Approximation**
- [x] **Principle of Least Squares: Minimizing Sum of Squared Residuals (Errors) S = sum(y_i - f(x_i))^2**
- [x] **Linear Regression / Straight Line Fitting (y = a + bx): Derivation of Normal Equations, Slope and Intercept**
- [x] **Polynomial Regression / Parabolic Curve Fitting (y = a + bx + cx^2): Derivation of 3 Normal Equations**
- [x] **Fitting Exponential Curves (y = ae^(bx) and y = ab^x): Logarithmic Linearization Transformations**
- [x] **Fitting Power Curves (y = ax^b): Double-Logarithmic Linearization and Parameter Estimation**
- [x] **Multiple Linear Regression Overview: Dependent Variable with Two or More Independent Variables**
- [x] **Correlation Analysis: Karl Pearson's Coefficient of Linear Correlation (r), Range [-1, +1], Interpretation**
- [x] **Rank Correlation: Spearman's Rank Correlation Coefficient for Qualitative / Ranked Data**
- [x] **Linear Programming Problems (LPP): Components (Decision Variables, Objective Function, Constraints, Non-Negativity)**
- [x] **LPP Mathematical Formulation: Manufacturing, Diet, Transportation & Resource Allocation Enterprise Problems**
- [x] **Graphical Method for Solving LPP: Plotting Constraint Lines, Identifying Feasible Region (Bounded vs Unbounded)**
- [x] **Corner Point / Extreme Point Method: Evaluating Objective Function at Vertices, Multiple Optimal Solutions**
- [x] **Infeasible and Unbounded Solutions in Linear Programming: Identification and Physical Interpretation**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the Principle of Least Squares in curve fitting?
**Model Answer:**
The principle states that the best-fit curve to a set of data points is the one that minimizes the sum of the squares of the vertical residuals: $S = \sum_{i=1}^n (y_i - f(x_i))^2$.

### Q2. [2 Marks] State the Normal Equations for fitting a straight line $y = a + bx$.
**Model Answer:**
1. $\sum y = n a + b \sum x$
2. $\sum xy = a \sum x + b \sum x^2$

### Q3. [2 Marks] How is an exponential curve $y = a \cdot e^{bx}$ linearized for least squares?
**Model Answer:**
Take natural logarithm of both sides: $\ln y = \ln a + bx$. Letting $Y = \ln y, A = \ln a, B = b$, it becomes the linear equation $Y = A + Bx$.

### Q4. [2 Marks] What is Karl Pearson's Coefficient of Correlation ($r$)?
**Model Answer:**
A dimensionless metric measuring the degree and direction of linear association between two variables: $r = \frac{\text{Cov}(X, Y)}{\sigma_x \sigma_y}$, bounded strictly in $[-1, +1]$.

### Q5. [2 Marks] What is the relationship between correlation coefficient $r$ and regression coefficients $b_{yx}$ and $b_{xy}$?
**Model Answer:**
$$r = \pm \sqrt{b_{yx} \cdot b_{xy}}$$
The sign of $r$ matches the signs of both regression slopes $b_{yx}$ and $b_{xy}$.

### Q6. [2 Marks] What does a correlation coefficient $r = 0$ mean?
**Model Answer:**
It indicates zero linear correlation between the two variables. (Non-linear relationships may still exist).

### Q7. [2 Marks] Define a Linear Programming Problem (LPP).
**Model Answer:**
An optimization problem where a linear objective function $Z = c_1 x_1 + c_2 x_2$ is maximized or minimized subject to a set of linear equality or inequality constraints and non-negativity restrictions $x_j \ge 0$.

### Q8. [2 Marks] What is the 'Feasible Region' in graphical LPP?
**Model Answer:**
The convex polygon formed by the intersection of all half-planes defined by the problem constraints and non-negativity conditions.

### Q9. [2 Marks] State the Extreme Point (Corner Point) Theorem of LPP.
**Model Answer:**
If an optimal solution to an LPP exists, it must occur at one of the extreme points (vertices / corner points) of the convex feasible region.

### Q10. [2 Marks] What is an 'Unbounded Solution' in LPP?
**Model Answer:**
A situation where the feasible region extends indefinitely in the direction of optimization, allowing the objective function value to increase (for max) or decrease (for min) without bound.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Derive the Normal Equations for Fitting a Straight Line $y = a + bx$.
**Model Answer:**
Sum of squared residuals: $S(a, b) = \sum_{i=1}^n (y_i - a - bx_i)^2$.
To minimize $S$, set partial derivatives with respect to $a$ and $b$ to zero:
1. $\frac{\partial S}{\partial a} = -2 \sum (y_i - a - bx_i) = 0 \implies \sum y_i = n a + b \sum x_i$
2. $\frac{\partial S}{\partial b} = -2 \sum x_i(y_i - a - bx_i) = 0 \implies \sum x_i y_i = a \sum x_i + b \sum x_i^2$
These are the two standard Normal Equations.

### Q2. [5 Marks] Explain the Properties of Regression Coefficients $b_{yx}$ and $b_{xy}$.
**Model Answer:**
1. **Same Sign:** $b_{yx}, b_{xy}$, and $r$ must all share the same algebraic sign.
2. **Geometric Mean:** $r = \pm \sqrt{b_{yx} b_{xy}}$, implying $b_{yx} \cdot b_{xy} \le 1$.
3. **Magnitude:** If one regression coefficient is $> 1$, the other MUST be $< 1$.
4. **Intersection:** The two regression lines always intersect at the centroid $(\bar{x}, \bar{y})$.

### Q3. [5 Marks] Explain the Steps of the Graphical Method for Solving a 2-Variable LPP.
**Model Answer:**
1. Formulate decision variables, objective function, and constraints.
2. Treat inequalities as equations and plot lines on Cartesian plane.
3. Determine half-planes using test points (e.g., origin $(0, 0)$).
4. Shade the common overlapping Feasible Region.
5. Find coordinates of all corner points (vertices) by solving intersecting line equations.
6. Evaluate objective function $Z$ at each corner point. The vertex yielding maximum (or minimum) value is the optimal solution.

### Q4. [5 Marks] Differentiate between Feasible, Infeasible, Unbounded, and Alternative Optimal Solutions in LPP.
**Model Answer:**
- **Feasible:** Non-empty convex polygon containing valid points.
- **Infeasible:** Constraints contradict each other; no overlapping feasible space.
- **Unbounded:** Feasible space is open/unbounded in optimization direction; $Z \to \infty$.
- **Alternative Optima:** Objective function line is parallel to a binding constraint edge; infinite optimal solutions along that line segment.

### Q5. [5 Marks] Explain Spearman's Rank Correlation Coefficient and its Formula.
**Model Answer:**
Used for measuring correlation between ranked or qualitative attributes (e.g., beauty contest ranks, interview scores):
$$\rho = 1 - \frac{6 \sum d_i^2}{n(n^2 - 1)}$$
where $d_i = R_{xi} - R_{yi}$ is the difference in ranks for each individual.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Fit a Straight Line $y = a + bx$ to the following data using the Method of Least Squares:
x: [1, 2, 3, 4, 5], y: [14, 27, 40, 55, 68].
**Comprehensive University Solution:**
**Step 1: Construct Calculation Table**
| $x$ | $y$ | $x^2$ | $xy$ |
| :--- | :--- | :--- | :--- |
| 1 | 14 | 1 | 14 |
| 2 | 27 | 4 | 54 |
| 3 | 40 | 9 | 120 |
| 4 | 55 | 16 | 220 |
| 5 | 68 | 25 | 340 |
| **$\sum x = 15$** | **$\sum y = 204$** | **$\sum x^2 = 55$** | **$\sum xy = 748$** |
$n = 5$.

**Step 2: Normal Equations**
1. $204 = 5a + 15b$
2. $748 = 15a + 55b$

**Step 3: Solve the Linear System**
Multiply Eq (1) by 3:
$612 = 15a + 45b$
Subtract from Eq (2):
$748 - 612 = (15a - 15a) + (55b - 45b) \implies 136 = 10b \implies b = 13.6$
Substitute $b = 13.6$ back into Eq (1):
$204 = 5a + 15(13.6) \implies 204 = 5a + 204 \implies 5a = 0 \implies a = 0.0$

**Final Fitted Line Equation:**
$$y = 13.6x$$

### Q2. [10/15 Marks] Solve the following LPP Graphically: Maximize $Z = 3x + 5y$ subject to $x + 2y \le 2000$, $x + y \le 1500$, $y \le 600$, $x, y \ge 0$.
**Comprehensive University Solution:**
**Step 1: Plot Constraint Boundary Lines**
1. $L_1: x + 2y = 2000 \implies (0, 1000)$ and $(2000, 0)$
2. $L_2: x + y = 1500 \implies (0, 1500)$ and $(1500, 0)$
3. $L_3: y = 600$ (Horizontal line)

**Step 2: Identify Vertices of the Feasible Polygon**
- $O(0, 0)$
- $A(1500, 0)$ (x-intercept of $L_2$)
- $B$: Intersection of $L_1$ and $L_2$:
  $(x + 2y) - (x + y) = 2000 - 1500 \implies y = 500$.
  $x = 1500 - 500 = 1000 \implies B(1000, 500)$. Check $y \le 600$: Valid!
- $C$: Intersection of $L_1$ and $L_3 (y = 600)$:
  $x + 2(600) = 2000 \implies x = 800 \implies C(800, 600)$.
- $D(0, 600)$ (y-intercept under $L_3$).

**Step 3: Evaluate Objective Function $Z = 3x + 5y$**
- At $O(0, 0): Z = 0$
- At $A(1500, 0): Z = 3(1500) + 0 = 4500$
- At $B(1000, 500): Z = 3(1000) + 5(500) = 3000 + 2500 = 5500$
- At $C(800, 600): Z = 3(800) + 5(600) = 2400 + 3000 = \mathbf{5400}$
- At $D(0, 600): Z = 0 + 5(600) = 3000$

**Optimal Solution:** Maximum value of $Z = \mathbf{5500}$ occurs at vertex $B(1000, 500)$.

### Q3. [10/15 Marks] Calculate Karl Pearson's Coefficient of Correlation between advertising expenditure ($X$) and sales ($Y$):
X: [10, 12, 18, 24, 30, 32], Y: [15, 18, 22, 26, 35, 38].
**Comprehensive University Solution:**
Calculations show strong positive correlation $r \approx 0.985$, indicating that sales increase in direct linear proportion to advertising expenditure.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Least-squares line fitting and graphical LPP maximization with corner-point evaluation are 100% recurring 10/15 mark exam questions.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
# BCA-305N: Computer Graphics and Animation
## Unit 4 Master Exam Revision Notes: Curves, Surfaces & Spline Representations
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Curved Lines and Surfaces: Analytic Equations vs Parametric Representations, Limitations of Non-Parametric Equations**
- [x] **Quadric Surfaces: Mathematical Formulations and Geometric Properties of Spheres, Ellipsoids & Torus**
- [x] **Superquadrics: Superellipse and Superellipsoid Geometric Formulations, Exponent Variations for Industrial Shape Modeling**
- [x] **Spline Representations: Definition, Control Points, Interpolating Curves vs Approximating Curves, Convex Hull Property**
- [x] **Parametric Continuity (C0, C1, C2) vs Geometric Continuity (G0, G1, G2): Tangent Vectors, Curvature Alignment at Segment Boundaries**
- [x] **Cubic Spline Curves: Need for Cubic Representation, Natural Cubic Splines, Boundary Conditions (Clamped, Free)**
- [x] **Bezier Curves: Pierre Bezier Formulation, Bernstein Polynomials Basis Functions, Mathematical Formula P(t) = Σ B_i,n(t) * P_i**
- [x] **Properties of Bezier Curves: Affine Invariance, Convex Hull Property, Endpoint Interpolation, Tangency Condition, Variation Diminishing Property**
- [x] **Algorithms for Drawing Bezier Curves: De Casteljau's Algorithm, Recursive Midpoint Subdivision, Direct Polynomial Evaluation**
- [x] **Bezier Surfaces: Tensor Product Bezier Patches, Control Net, Evaluation and Surface Rendering**
- [x] **B-Spline Curves: Limitations of Bezier Curves (Global Control, Degree Tied to Number of Control Points), Cox-de Boor Recursive Definition**
- [x] **Properties of B-Splines: Local Control, Knot Vectors (Uniform, Open Uniform, Non-Uniform), Non-Uniform Rational B-Splines (NURBS) Overview**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is a Spline Curve?
**Model Answer:**
A **Spline** is a flexible curve defined mathematically by a piecewise polynomial function of degree $n$ whose pieces connect smoothly with specified parametric continuity ($C^0, C^1, C^2$) at joint points called **knots**.

### Q2. [2 Marks] Differentiate between Parametric Continuity ($C^k$) and Geometric Continuity ($G^k$).
**Model Answer:**
- **$C^0$:** Curves simply touch at joint ($P_1(1) = P_2(0)$).
- **$C^1$:** First derivatives (tangent vectors) are equal in both magnitude and direction.
- **$C^2$:** Second derivatives (curvature) are equal.
- **$G^1$:** Tangents point in the same direction, but magnitudes may differ.

### Q3. [2 Marks] State the mathematical formula for a Bezier Curve.
**Model Answer:**
A Bezier curve of degree $n$ defined by $n+1$ control points $P_i$ is given by:
$$P(u) = \sum_{i=0}^n B_{i, n}(u) P_i \quad (0 \le u \le 1)$$
Where $B_{i, n}(u) = \binom{n}{i} u^i (1 - u)^{n-i}$ are **Bernstein Polynomials**.

### Q4. [2 Marks] List three key mathematical properties of Bezier Curves.
**Model Answer:**
1. **Convex Hull Property:** The curve lies entirely within the convex hull of its control points.
2. **Affine Invariance:** Transforming the control points transforms the curve identically.
3. **Endpoint Interpolation:** Always passes through first ($P_0$) and last ($P_n$) control points.

### Q5. [2 Marks] What is the primary drawback of Bezier Curves and how do B-Splines solve it?
**Model Answer:**
Bezier curves lack **local control**: moving a single control point alters the entire curve globally, and degree is tied to the number of points ($n = \text{points} - 1$). **B-Splines** decouple degree from point count and offer **local control** via knot vectors.

### Q6. [2 Marks] What is Visible Surface Determination (Hidden Surface Removal)?
**Model Answer:**
The algorithmic identification and culling of surfaces and line segments that are occluded or hidden from view by other opaque objects along the line of sight from the viewpoint.

### Q7. [2 Marks] Explain the Z-Buffer (Depth-Buffer) Algorithm.
**Model Answer:**
A raster image-space algorithm maintaining two buffers: a **Frame Buffer** (color values) and a **Z-Buffer** (depth values from viewpoint). When rendering a pixel at $(x, y)$, if its depth $z < \text{zbuffer}[x, y]$ (closer to camera), the pixel color is updated and $\text{zbuffer}[x, y] = z$.

### Q8. [2 Marks] What is the Painter's Algorithm (Depth-Sort)?
**Model Answer:**
An object-space algorithm that sorts polygons by decreasing distance from the viewpoint ($z_{\max}$) and paints them into the frame buffer from back-to-front, naturally overwriting distant surfaces with closer ones.

### Q9. [2 Marks] What is Back-Face Culling?
**Model Answer:**
A geometric test that culls non-visible polygons of closed polyhedra whose surface normal points away from the viewer: polygon is a back-face if $\mathbf{N} \cdot \mathbf{V} > 0$ (or $A x_{\text{eye}} + B y_{\text{eye}} + C z_{\text{eye}} + D < 0$).

### Q10. [2 Marks] Explain Warnock's Area Subdivision Algorithm.
**Model Answer:**
An image-space divide-and-conquer algorithm that recursively subdivides display areas into four equal quadrants until each area is either completely empty, completely covered by a single polygon, or reduced to the size of a single pixel.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Derive the Blending Functions for a Cubic Bezier Curve ($n=3$).
**Model Answer:**
### Cubic Bezier Bernstein Polynomials ($n=3$):
For $i = 0, 1, 2, 3$ with $u \in [0, 1]$:
$$B_{i, 3}(u) = \binom{3}{i} u^i (1 - u)^{3-i}$$
1. $B_{0, 3}(u) = \binom{3}{0} u^0 (1 - u)^3 = \mathbf{(1 - u)^3}$
2. $B_{1, 3}(u) = \binom{3}{1} u^1 (1 - u)^2 = \mathbf{3u(1 - u)^2}$
3. $B_{2, 3}(u) = \binom{3}{2} u^2 (1 - u)^1 = \mathbf{3u^2(1 - u)}$
4. $B_{3, 3}(u) = \binom{3}{3} u^3 (1 - u)^0 = \mathbf{u^3}$

**Partition of Unity Property:**
$$\sum_{i=0}^3 B_{i, 3}(u) = (1 - u)^3 + 3u(1-u)^2 + 3u^2(1-u) + u^3 = [(1 - u) + u]^3 = 1^3 = \mathbf{1}$$

### Q2. [5 Marks] Compare Bezier Curves vs B-Spline Curves.
**Model Answer:**
| Dimension | Bezier Curve | B-Spline Curve |
| :--- | :--- | :--- |
| **Local Control** | No (Global effect: moving one point alters entire curve) | Yes (Moving a point affects only $k$ neighboring segments) |
| **Degree of Curve** | Fixed to $n = m - 1$ ($m$ = number of points) | Chosen independently of number of control points |
| **Basis Functions** | Bernstein polynomials | Cox-de Boor recursive basis functions |
| **Interpolation** | Interpolates endpoints $P_0$ and $P_n$ | Can interpolate or approximate based on knot vector |
| **Complexity** | Simple mathematical formula | More complex knot vector calculations |

### Q3. [5 Marks] Explain the Z-Buffer Algorithm Flow with Pseudocode.
**Model Answer:**
```
Algorithm: Z-Buffer (Depth Buffer)
1. Initialize for all pixels (x, y):
   FrameBuffer[x, y] = BackgroundColor
   ZBuffer[x, y] = 1.0 (Maximum Depth / Far Plane)

2. For each polygon in the scene:
   For each pixel (x, y) covered by polygon during scan-conversion:
     Calculate depth z at pixel (x, y)
     If z < ZBuffer[x, y]:
       ZBuffer[x, y] = z
       FrameBuffer[x, y] = PolygonColor(x, y)
```
- **Pros:** Handles arbitrary polygon overlaps, independent of scene complexity, easily hardware accelerated (modern GPUs).
- **Cons:** High memory overhead for depth buffer; susceptible to z-fighting if depth precision is limited.

### Q4. [5 Marks] Explain the Painter's Algorithm and the Problem of Cyclic Overlap.
**Model Answer:**
```
  [ Cyclic Overlap Triangle Loop ]
       Poly A overlaps Poly B
       Poly B overlaps Poly C
       Poly C overlaps Poly A
  (No simple depth sorting order exists!)
```
- When polygons cyclically overlap or pierce each other, no valid front-to-back or back-to-front order exists.
- **Resolution:** Polygons must be split into sub-polygons using plane partitioning (e.g., BSP Trees).

### Q5. [5 Marks] Explain Back-Face Culling Formulation.
**Model Answer:**
For a polygon plane equation $Ax + By + Cz + D = 0$ with surface normal vector $\mathbf{N} = [A, B, C]^T$:
- If the viewing vector from viewer to polygon is $\mathbf{V}$:
  $$\text{If } \mathbf{N} \cdot \mathbf{V} > 0 \implies \text{Back-face (Culled / Hidden)}$$
  $$\text{If } \mathbf{N} \cdot \mathbf{V} \le 0 \implies \text{Front-face (Visible / Retained)}$$
- For orthographic viewing along the negative Z-axis, this simplifies to inspecting the sign of $C$: if $C \le 0$, the surface is visible.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Prove the Convex Hull and Endpoint Interpolation Properties of Bezier Curves, and Compute Point Coordinates for Given Control Points.
**Comprehensive University Solution:**
### Mathematical Proofs of Bezier Properties

#### 1. Endpoint Interpolation Proof:
- At parameter $u = 0$:
  $$B_{0, n}(0) = \binom{n}{0} 0^0 (1 - 0)^n = 1$$
  $$B_{i, n}(0) = 0 \quad (\text{for all } i > 0)$$
  $$\implies P(0) = 1 \cdot P_0 + 0 = \mathbf{P_0}$$
- At parameter $u = 1$:
  $$B_{n, n}(1) = \binom{n}{n} 1^n (1 - 1)^0 = 1$$
  $$B_{i, n}(1) = 0 \quad (\text{for all } i < n)$$
  $$\implies P(1) = 1 \cdot P_n + 0 = \mathbf{P_n}$$
  *Hence, the curve always begins at $P_0$ and terminates at $P_n$.*

#### 2. Convex Hull Property Proof:
By definition, a point $P$ is in the convex hull of points $\{P_i\}$ if $P = \sum \alpha_i P_i$ where $\alpha_i \ge 0$ and $\sum \alpha_i = 1$.
- For $u \in [0, 1]$, each Bernstein basis function $B_{i, n}(u) = \binom{n}{i} u^i (1 - u)^{n-i} \ge 0$.
- By the binomial theorem, $\sum_{i=0}^n B_{i, n}(u) = [u + (1 - u)]^n = 1^n = 1$.
- Therefore, for all $u \in [0, 1]$, $P(u)$ is a convex combination of control points, guaranteeing that the curve lies completely inside the polygon formed by its control vertices.

#### 3. Numerical Problem:
- Given control points: $P_0(0, 0), P_1(1, 4), P_2(3, 4), P_3(4, 0)$.
- Find the coordinate $P(0.5)$ at the midpoint of the curve:
  $$B_{0, 3}(0.5) = (1 - 0.5)^3 = 0.125$$
  $$B_{1, 3}(0.5) = 3(0.5)(0.5)^2 = 0.375$$
  $$B_{2, 3}(0.5) = 3(0.5)^2(0.5) = 0.375$$
  $$B_{3, 3}(0.5) = (0.5)^3 = 0.125$$
- Calculate $X$-coordinate:
  $$x(0.5) = 0.125(0) + 0.375(1) + 0.375(3) + 0.125(4) = 0 + 0.375 + 1.125 + 0.5 = \mathbf{2.0}$$
- Calculate $Y$-coordinate:
  $$y(0.5) = 0.125(0) + 0.375(4) + 0.375(4) + 0.125(0) = 0 + 1.5 + 1.5 + 0 = \mathbf{3.0}$$
- Result: Point on Bezier curve at $u = 0.5$ is **$(2.0, 3.0)$**.

### Q2. [10/15 Marks] Detail Hidden Surface Removal Algorithms: Z-Buffer vs A-Buffer vs Warnock Area-Subdivision.
**Comprehensive University Solution:**
### Comprehensive Comparison of Hidden Surface Removal Algorithms

```
+----------------------------------------------------------------------------------+
|                   HIDDEN SURFACE REMOVAL TAXONOMIES                              |
|                                                                                  |
|  [ Object-Space Algorithms ]                  [ Image-Space Algorithms ]         |
|  - Compare objects directly in 3D world       - Compare at each screen pixel     |
|  - Precision: Arbitrary physical units         - Precision: Frame buffer pixels   |
|  - Examples: Back-Face Culling, Painter's     - Examples: Z-Buffer, A-Buffer     |
+----------------------------------------------------------------------------------+
```

#### 1. Z-Buffer (Catmull 1974):
- Compares depth at each pixel. Operates in $O(N \times \text{pixels})$ time.
- Limitation: Handles only opaque surfaces; cannot blend transparent or translucent materials.

#### 2. A-Buffer (Carpenter 1984 - Antialiased, Area-Averaged, Accumulation Buffer):
- Extends Z-Buffer by associating each pixel with a **linked list of surface fragments**.
- Each fragment stores: RGB color, depth $z$, surface percentage coverage mask, transparency factor, and pointer to next fragment.
- Enables order-independent transparency blending and edge antialiasing.

#### 3. Warnock's Area Subdivision Algorithm:
- Evaluates relationships between polygons and candidate rectangular screen quadrant:
  1. **Disjoint:** Polygon completely outside $\implies$ ignored.
  2. **Intersecting:** Partially inside $\implies$ subdivided further.
  3. **Contained:** Completely inside quadrant $\implies$ drawn if unobstructed.
  4. **Surrounding:** Completely covers quadrant $\implies$ if closest, display its color and stop subdividing.

### Q3. [10/15 Marks] Implement a Python Script to Calculate and Plot a Cubic Bezier Curve via Bernstein Polynomials.
**Comprehensive University Solution:**
```python
import numpy as np

def bernstein_poly(i, n, t):
    """Calculates Bernstein polynomial B_{i, n}(t)."""
    from math import comb
    return comb(n, i) * (t ** i) * ((1 - t) ** (n - i))

def bezier_curve(control_points, num_points=100):
    """
    Computes 2D Bezier curve from control points array of shape (N+1, 2).
    """
    n = len(control_points) - 1
    t_vals = np.linspace(0.0, 1.0, num_points)
    curve = np.zeros((num_points, 2))
    
    for idx, t in enumerate(t_vals):
        pt = np.zeros(2)
        for i in range(n + 1):
            b = bernstein_poly(i, n, t)
            pt += b * control_points[i]
        curve[idx] = pt
        
    return curve

# Control Points
ctrl_pts = np.array([
    [0.0, 0.0],
    [1.0, 4.0],
    [3.0, 4.0],
    [4.0, 0.0]
])

curve_points = bezier_curve(ctrl_pts, num_points=11)
print("Sampled points along Bezier curve:")
for t_step, pt in zip(np.linspace(0, 1, 11), curve_points):
    print(f"t = {t_step:0.1f} -> ({pt[0]:0.3f}, {pt[1]:0.3f})")
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently ask: Bezier Curve properties and Bernstein polynomial formulation (guaranteed 10 marks), Z-buffer vs Painter's algorithm, and local control comparison with B-Splines.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
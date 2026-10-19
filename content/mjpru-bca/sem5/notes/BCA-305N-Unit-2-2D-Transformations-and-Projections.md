# BCA-305N: Computer Graphics and Animation
## Unit 2 Master Exam Revision Notes: 2D Transformations, Window-to-Viewport Mapping & 3D Projections
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `430e8853-ce2d-5441-8c38-e276958b1442` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **2D Geometric Transformations: Translation (P' = P + T), Scaling (x' = x*Sx, y' = y*Sy), Rotation about the Origin (θ)**
- [x] **Matrix Representations of 2D Transformations: Coordinate Vectors, Transformation Matrices, Linearity and Limitations**
- [x] **Homogeneous Coordinate Systems: Need for Homogeneous Representation, Projective Geometry, Matrix Representation (3x3)**
- [x] **Composite 2D Transformations: Matrix Multiplication Order, Non-Commutative Nature, Successive Translations, Scalings, Rotations**
- [x] **General 2D Rotation about an Arbitrary Point (xr, yr): Translation to Origin, Rotation, Inverse Translation Sequence**
- [x] **Other 2D Transformations: Reflection (About X-Axis, Y-Axis, Origin, Line y = x), Shear Transformations (X-Shear, Y-Shear)**
- [x] **Window-to-Viewport Coordinate Transformation: World Coordinate System (WCS), Viewing Coordinates, Normalized Device Coordinates (NDC)**
- [x] **Viewing Pipeline & Clipping Operations: Interior vs Exterior Clipping, Point Clipping Algorithm against Rectangular Window**
- [x] **Cohen-Sutherland Line Clipping Algorithm: 4-Bit Outcodes (Top, Bottom, Right, Left), Trivial Accept, Trivial Reject, Intersection Calculations**
- [x] **Midpoint Subdivision Line Clipping Algorithm: Binary Search Approach, Hardware Implementations for Line Clipping**
- [x] **Polygon Clipping: Sutherland-Hodgeman Polygon Clipping Algorithm, Edge-by-Edge Processing (Left, Right, Bottom, Top), Vertex Output Rules**
- [x] **Text Clipping Techniques: All-or-None String Clipping, All-or-None Character Clipping, Component Character/Stroke Clipping**
- [x] **3D Geometric Transformations: 3D Homogeneous Coordinates (4x4 Matrices), 3D Translation, 3D Scaling, 3D Rotation (X, Y, Z axes)**
- [x] **3D Projections: Taxonomy, Parallel Projection (Orthographic, Oblique - Cavalier, Cabinet), Perspective Projection (Vanishing Points, Center of Projection)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is a 2D Transformation and why are Homogeneous Coordinates necessary?
**Model Answer:**
A transformation alters an object's position, size, or orientation. In Cartesian coordinates, translation is additive ($x' = x + t_x$), while rotation and scaling are multiplicative, preventing matrix composition. **Homogeneous Coordinates** represent a 2D point as $[x, y, 1]^T$, converting all affine transformations into unified $3 \times 3$ matrix multiplications.

### Q2. [2 Marks] State the $3 \times 3$ matrix for 2D Translation by $(t_x, t_y)$.
**Model Answer:**
$$T(t_x, t_y) = \begin{bmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{bmatrix}$$

### Q3. [2 Marks] State the $3 \times 3$ matrix for 2D Rotation about the origin by angle $\theta$.
**Model Answer:**
$$R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

### Q4. [2 Marks] State the $3 \times 3$ matrix for 2D Scaling by $(s_x, s_y)$.
**Model Answer:**
$$S(s_x, s_y) = \begin{bmatrix} s_x & 0 & 0 \\ 0 & s_y & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

### Q5. [2 Marks] What is the difference between Window and Viewport?
**Model Answer:**
- **Window:** A world-coordinate area selected for viewing (what is to be viewed in world space).
- **Viewport:** The display device area where the contents of the window are mapped and displayed (where it is to be viewed on screen).

### Q6. [2 Marks] What is Clipping in Computer Graphics?
**Model Answer:**
Clipping is the process of identifying and removing parts of geometric primitives that lie outside a designated clipping window/boundary so that only visible elements are rendered.

### Q7. [2 Marks] Explain the 4-bit region code (TBRL) in the Cohen-Sutherland line clipping algorithm.
**Model Answer:**
Every endpoint is assigned a 4-bit Outcode `[Top, Bottom, Right, Left]`:
- Bit 1 (Top): Set if $y > y_{\max}$
- Bit 2 (Bottom): Set if $y < y_{\min}$
- Bit 3 (Right): Set if $x > x_{\max}$
- Bit 4 (Left): Set if $x < x_{\min}$
If outcode is `0000`, the point lies inside the clip window.

### Q8. [2 Marks] What are the two trivial acceptance/rejection tests in Cohen-Sutherland clipping?
**Model Answer:**
- **Trivial Accept:** If $Code(P_1) = 0000$ AND $Code(P_2) = 0000$ (both endpoints completely inside).
- **Trivial Reject:** If $Code(P_1) \ \text{BITWISE-AND} \ Code(P_2) \neq 0000$ (both endpoints lie entirely on the same external side).

### Q9. [2 Marks] Differentiate between Parallel Projection and Perspective Projection.
**Model Answer:**
- **Parallel Projection:** Projection lines are parallel; preserves relative proportions and dimensions; objects do not appear smaller with distance; used in engineering blueprints (orthographic).
- **Perspective Projection:** Projection lines converge at a Center of Projection (cop); objects farther away appear smaller (foreshortening); models human vision.

### Q10. [2 Marks] What is Vanishing Point in Perspective Projection?
**Model Answer:**
The point in a perspective projection where a set of parallel lines that are not parallel to the projection plane appear to converge.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Derive the Composite Transformation Matrix for 2D Rotation about an Arbitrary Point $(x_r, y_r)$.
**Model Answer:**
### 3-Step Rotation about an Arbitrary Pivot $(x_r, y_r)$:
1. Translate pivot point to origin: $T(-x_r, -y_r)$
2. Rotate by angle $\theta$ about origin: $R(\theta)$
3. Translate origin back to pivot point: $T(x_r, y_r)$

$$M = T(x_r, y_r) \cdot R(\theta) \cdot T(-x_r, -y_r)$$

$$\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 & x_r \\ 0 & 1 & y_r \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 & -x_r \\ 0 & 1 & -y_r \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$$

$$\mathbf{x' = x_r + (x - x_r)\cos\theta - (y - y_r)\sin\theta}$$
$$\mathbf{y' = y_r + (x - x_r)\sin\theta + (y - y_r)\cos\theta}$$

### Q2. [5 Marks] Derive the Window-to-Viewport Transformation Equations.
**Model Answer:**
```
[ WORLD COORDINATE WINDOW ]                     [ DEVICE VIEWPORT ]
(xw_max, yw_max)                                (xv_max, yv_max)
       +-------------+                                 +-------------+
       |   (xw, yw)  |                                 |   (xv, yv)  |
       |      *      |       ==============>           |      *      |
       +-------------+                                 +-------------+
(xw_min, yw_min)                                (xv_min, yv_min)
```
To maintain identical relative positioning:
$$\frac{xv - xv_{\min}}{xv_{\max} - xv_{\min}} = \frac{xw - xw_{\min}}{xw_{\max} - xw_{\min}} \implies xv = xv_{\min} + (xw - xw_{\min}) \cdot S_x$$
$$\frac{yv - yv_{\min}}{yv_{\max} - yv_{\min}} = \frac{yw - yw_{\min}}{yw_{\max} - yw_{\min}} \implies yv = yv_{\min} + (yw - yw_{\min}) \cdot S_y$$
Where scaling factors are:
$$S_x = \frac{xv_{\max} - xv_{\min}}{xw_{\max} - xw_{\min}} \quad \text{and} \quad S_y = \frac{yv_{\max} - yv_{\min}}{yw_{\max} - yw_{\min}}$$

### Q3. [5 Marks] Explain the Sutherland-Hodgman Polygon Clipping Algorithm.
**Model Answer:**
The algorithm clips an entire polygon against each of the four clipping boundaries sequentially (Left, Right, Bottom, Top):
- For each edge from vertex $v_1$ to $v_2$, evaluate transition:
  1. **In to In:** Output $v_2$.
  2. **In to Out:** Output intersection point $I$.
  3. **Out to Out:** Output nothing.
  4. **Out to In:** Output intersection point $I$ and vertex $v_2$.

### Q4. [5 Marks] Explain 2D Reflection and Shearing Matrices.
**Model Answer:**
- **Reflection about X-axis:** $x' = x, y' = -y \implies \begin{bmatrix} 1 & 0 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$
- **Reflection about Y-axis:** $x' = -x, y' = y \implies \begin{bmatrix} -1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$
- **X-direction Shear:** $x' = x + sh_x \cdot y, y' = y \implies \begin{bmatrix} 1 & sh_x & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$

### Q5. [5 Marks] Explain Parallel Projections: Orthographic vs Oblique (Cavalier vs Cabinet).
**Model Answer:**
In **Parallel Projections**:
- **Orthographic:** Projection rays are perpendicular to the projection plane ($90^\circ$). Includes Isometric, Dimetric, Trimetric.
- **Oblique:** Projection rays intersect projection plane at an oblique angle $\alpha$:
  - **Cavalier Projection:** Angle is $45^\circ$; line segments perpendicular to viewing plane are projected with **full length (1:1)**.
  - **Cabinet Projection:** Angle is $\approx 63.4^\circ$; lines perpendicular to view plane are drawn at **half scale (1:2)**, providing more natural visual depth.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Demonstrate the Complete Cohen-Sutherland Line Clipping Algorithm with Mathematical Intersection Derivations and Worked Numerical Example.
**Comprehensive University Solution:**
### Comprehensive Cohen-Sutherland Algorithm Study

```
                       Top Boundary (ymax)
          1001   |          1000          |   1010
        ---------+------------------------+---------
          0001   |       CLIP WINDOW      |   0010
                 |          0000          |  (xmax)
        ---------+------------------------+---------
          0101   |          0100          |   0110
        (xmin)   | Bottom Boundary (ymin) |
```

#### 1. Outcode Bit Allocation (4 bits):
- Bit 1 (Sign of $y - y_{\max}$): 1 if $y > y_{\max}$
- Bit 2 (Sign of $y_{\min} - y$): 1 if $y < y_{\min}$
- Bit 3 (Sign of $x - x_{\max}$): 1 if $x > x_{\max}$
- Bit 4 (Sign of $x_{\min} - x$): 1 if $x < x_{\min}$

#### 2. Intersection Calculation with Window Boundary:
For line between $(x_1, y_1)$ and $(x_2, y_2)$ with slope $m = \frac{y_2 - y_1}{x_2 - x_1}$:
- If clipping against **Vertical Edge** ($x = x_{\min}$ or $x = x_{\max}$):
  $$x = x_{\text{edge}}, \quad y = y_1 + m(x_{\text{edge}} - x_1)$$
- If clipping against **Horizontal Edge** ($y = y_{\min}$ or $y = y_{\max}$):
  $$y = y_{\text{edge}}, \quad x = x_1 + \frac{y_{\text{edge}} - y_1}{m}$$

#### 3. Worked Numerical Problem:
- Clip Window: $[x_{\min} = 10, y_{\min} = 10, x_{\max} = 100, y_{\max} = 100]$
- Line Segment: $P_1(5, 40)$ to $P_2(120, 80)$
- **Step 1: Compute Outcodes:**
  - $P_1(5, 40)$: $x < 10 \implies$ Left bit set $\implies Code(P_1) = \mathbf{0001}$
  - $P_2(120, 80)$: $x > 100 \implies$ Right bit set $\implies Code(P_2) = \mathbf{0010}$
- **Step 2: Acceptance/Rejection Tests:**
  - Both codes are not zero $\implies$ not trivially accepted.
  - $Code(P_1) \ \& \ Code(P_2) = 0001 \ \& \ 0010 = 0000 \implies$ not trivially rejected. Line must be clipped!
- **Step 3: Clip $P_1$ against Left Edge ($x = 10$):**
  - Slope $m = \frac{80 - 40}{120 - 5} = \frac{40}{115} \approx 0.3478$
  - $x' = 10$
  - $y' = 40 + 0.3478(10 - 5) = 40 + 1.74 = 41.74$
  - New $P_1'(10, 41.74)$ has code $\mathbf{0000}$!
- **Step 4: Clip $P_2$ against Right Edge ($x = 100$):**
  - $x'' = 100$
  - $y'' = 80 + 0.3478(100 - 120) = 80 - 6.96 = 73.04$
  - New $P_2'(100, 73.04)$ has code $\mathbf{0000}$!
- **Conclusion:** Clipped visible line segment connects **$(10, 41.74)$ to $(100, 73.04)$**.

### Q2. [10/15 Marks] Derive the Complete Mathematical Formulation of Perspective Projection onto the $z = 0$ View Plane with Center of Projection at $(0, 0, -d)$.
**Comprehensive University Solution:**
### Mathematical Derivation of Perspective Transformation

```
          Y-axis
            ^
            |         P(x, y, z) [3D Object Point]
            |        *
            |       /|
            |  P'  / |
            |  *  /  |
            | /| /   |
  ----------+--|-+---+---------> Z-axis
          C |  | |
  (0,0,-d)  |  | |
            |  View Plane (z = 0)
```

#### 1. Geometric Triangles Similarity:
By similar triangles formed by line connecting COP $(0, 0, -d)$ to point $P(x, y, z)$ intersecting view plane at $P'(x', y', 0)$:
$$\frac{x'}{d} = \frac{x}{z + d} \implies x' = \frac{x}{\frac{z}{d} + 1}$$
$$\frac{y'}{d} = \frac{y}{z + d} \implies y' = \frac{y}{\frac{z}{d} + 1}$$

#### 2. Homogeneous Matrix Formulation:
In 4D projective space $[x_h, y_h, z_h, w_h]^T$:
$$M_{\text{persp}} = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & \frac{1}{d} & 1 \end{bmatrix}$$
Multiplying with $P = [x, y, z, 1]^T$:
$$P_h' = M_{\text{persp}} \cdot P = \begin{bmatrix} x \\ y \\ 0 \\ \frac{z}{d} + 1 \end{bmatrix}$$
Dividing by the homogeneous coordinate $w_h = \frac{z}{d} + 1$ (Perspective Division):
$$x' = \frac{x}{\frac{z}{d} + 1}, \quad y' = \frac{y}{\frac{z}{d} + 1}, \quad z' = 0$$
As distance $z \to \infty$, $w_h$ increases, causing $x'$ and $y'$ to shrink towards 0, perfectly producing the visual phenomenon of perspective foreshortening.

### Q3. [10/15 Marks] Implement a Python 2D Transformation Pipeline for Scaling, Rotation about Arbitrary Pivot, and Translation.
**Comprehensive University Solution:**
```python
import numpy as np

def get_translation_matrix(tx, ty):
    return np.array([
        [1, 0, tx],
        [0, 1, ty],
        [0, 0, 1]
    ])

def get_rotation_matrix(angle_deg):
    theta = np.radians(angle_deg)
    return np.array([
        [np.cos(theta), -np.sin(theta), 0],
        [np.sin(theta),  np.cos(theta), 0],
        [0,              0,             1]
    ])

def get_scaling_matrix(sx, sy):
    return np.array([
        [sx, 0,  0],
        [0,  sy, 0],
        [0,  0,  1]
    ])

def rotate_around_pivot(points, angle_deg, px, py):
    # 1. Translate to origin
    T1 = get_translation_matrix(-px, -py)
    # 2. Rotate
    R = get_rotation_matrix(angle_deg)
    # 3. Translate back
    T2 = get_translation_matrix(px, py)
    
    # Composite Matrix M = T2 * R * T1
    M = T2 @ R @ T1
    
    # Points format: 3 x N homogeneous matrix
    homog_points = np.vstack([points.T, np.ones(points.shape[0])])
    transformed = M @ homog_points
    return transformed[:2].T

# Triangle vertices
triangle = np.array([
    [10.0, 10.0],
    [30.0, 10.0],
    [20.0, 40.0]
])

# Rotate 45 degrees around pivot (20, 20)
transformed_triangle = rotate_around_pivot(triangle, 45, 20, 20)
print("Original Triangle:\n", triangle)
print("\nTransformed Triangle:\n", np.round(transformed_triangle, 2))
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently ask: Cohen-Sutherland Line Clipping (with numerical problem), 2D composite rotation about arbitrary pivot derivation, and Perspective vs Parallel projection differences.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
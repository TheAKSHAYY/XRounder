# BCA-305N: Computer Graphics and Animation
## Unit 3 Master Exam Revision Notes: Scan Conversion Algorithms for Primitives & Curves
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `f8b15c04-3d58-59e4-8ec3-68f83b0918fe` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Scan Conversion Fundamentals: Frame Buffer, Video Memory, Bit Planes, Pixel Grid Mapping, Anti-Aliasing Challenges**
- [x] **Point and Line Primitive Plotting: Line Equation y = mx + c, Incremental Methods, Floating-Point Calculations**
- [x] **Digital Differential Analyzer (DDA) Line Drawing Algorithm: Slope Cases (|m| < 1 vs |m| > 1), Incremental Form, Derivation and Step-by-Step Execution**
- [x] **Bresenham's Line Drawing Algorithm: Integer Arithmetic Only, Decision Parameter dk Derivation, Mathematical Proof of Incremental Updates**
- [x] **Comparison of Line Algorithms: Computational Efficiency, Speed, Visual Smoothness of DDA vs Bresenham's Algorithm**
- [x] **Circle Geometric Characteristics: Implicit Equation (x^2 + y^2 = R^2), Eight-Way Symmetry Property of Circles**
- [x] **Midpoint Circle Drawing Algorithm: Implicit Function f(x,y), Decision Parameter pk Derivation, Midpoint Evaluation, Step-by-Step Plotting**
- [x] **Bresenham's Circle Drawing Algorithm: Error Term Formulation, Selection Between Diagonal and Horizontal Pixels**
- [x] **Ellipse Geometric Properties: Implicit Equation (b^2*x^2 + a^2*y^2 - a^2*b^2 = 0), Four-Way Symmetry Property**
- [x] **Midpoint Ellipse Algorithm: Division into Region 1 (Slope dy/dx > -1) and Region 2 (Slope dy/dx < -1), Decision Parameters p1k and p2k Derivations**
- [x] **Polygon Fill Area Primitives: Inside-Outside Tests (Odd-Even Rule, Winding Number Method)**
- [x] **Polygon Filling Algorithms: Boundary-Fill Algorithm (4-Connected vs 8-Connected), Flood-Fill Algorithm, Scan-Line Polygon Fill Algorithm & Edge Table**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is Scan Conversion?
**Model Answer:**
Scan Conversion (or rasterization) is the algorithmic process of digitizing continuous mathematical geometric descriptions of graphics primitives (lines, circles, polygons) into discrete pixel coordinate arrays in the frame buffer.

### Q2. [2 Marks] State the core formulation of the DDA (Digital Differential Analyzer) Line Algorithm.
**Model Answer:**
DDA calculates differential increments $\Delta x$ and $\Delta y$. For slope $|m| \le 1$: step $\Delta x = 1$, and $y_{k+1} = y_k + m$. For $|m| > 1$: step $\Delta y = 1$, and $x_{k+1} = x_k + \frac{1}{m}$.

### Q3. [2 Marks] Why is Bresenham's Line Algorithm superior to DDA?
**Model Answer:**
DDA uses floating-point additions and `round()` operations at each pixel step. Bresenham's algorithm uses **pure integer arithmetic and fast bit-shift additions** without any floating-point calculations or rounding.

### Q4. [2 Marks] What is the initial decision parameter $p_0$ in Bresenham's Line Algorithm?
**Model Answer:**
For line from $(x_1, y_1)$ to $(x_2, y_2)$ with $\Delta x = x_2 - x_1$ and $\Delta y = y_2 - y_1$ ($0 \le m \le 1$):
$$p_0 = 2\Delta y - \Delta x$$

### Q5. [2 Marks] Explain the 8-way symmetry of a Circle.
**Model Answer:**
If a point $(x, y)$ lies on a circle centered at origin $x^2 + y^2 = r^2$, seven other symmetric points can be generated without recalculation: $(y, x), (-y, x), (-x, y), (-x, -y), (-y, -x), (y, -x), (x, -y)$.

### Q6. [2 Marks] What is the initial decision parameter in the Midpoint Circle Algorithm?
**Model Answer:**
Evaluating circle function at midpoint $(1, r - 1/2)$:
$$p_0 = \frac{5}{4} - r \approx 1 - r \quad (\text{for integer radii})$$

### Q7. [2 Marks] What is the difference between Boundary Fill and Flood Fill algorithms?
**Model Answer:**
- **Boundary Fill:** Paints pixels until a specified boundary color edge is encountered.
- **Flood Fill:** Replaces all connected pixels of an existing target interior color with a new replacement color (used when boundaries are multi-colored).

### Q8. [2 Marks] What is 4-connected vs 8-connected polygon fill?
**Model Answer:**
- **4-connected:** Only tests adjacent horizontal and vertical neighbors $(x\pm 1, y), (x, y\pm 1)$.
- **8-connected:** Tests horizontal, vertical, and all four diagonal neighbors, preventing leakages across diagonally touching boundaries.

### Q9. [2 Marks] What is the parity rule in Scanline Polygon Fill?
**Model Answer:**
A scanline counts how many polygon edges it intersects from left to right. Starting outside (odd/even parity initialized to even), parity inverts at each edge intersection: **Odd = Inside (fill pixels)**, **Even = Outside (do not fill)**.

### Q10. [2 Marks] What is the Midpoint Ellipse Algorithm's two regions?
**Model Answer:**
The first quadrant of an ellipse is divided into: **Region 1** where slope $|dy/dx| < 1$ (step in $x$), and **Region 2** where $|dy/dx| \ge 1$ (step in $y$).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare DDA Line Algorithm vs Bresenham's Line Algorithm.
**Model Answer:**
| Attribute | DDA Algorithm | Bresenham's Algorithm |
| :--- | :--- | :--- |
| **Arithmetic** | Floating-point additions & divisions | Pure integer additions and subtractions |
| **Rounding** | Requires explicit `round()` per pixel | No rounding needed; exact decision variable |
| **Speed** | Slower due to floating-point unit | Blazing fast, hardware-implementable |
| **Accuracy** | Cumulative rounding errors can drift | Exact, mathematically optimal line path |
| **Multiplication**| Division $\frac{1}{m}$ or multiplication | Only multiplication by 2 (bit-shift `<< 1`) |

### Q2. [5 Marks] Explain the Midpoint Circle Generation Decision Rules.
**Model Answer:**
At step $k$, with current pixel $(x_k, y_k)$, test midpoint between candidate pixels $E(x_k+1, y_k)$ and $SE(x_k+1, y_k-1)$:
- Decision parameter $p_k = f_{\text{circle}}(x_k + 1, y_k - 1/2)$.
- **If $p_k < 0$:** Midpoint is inside circle $\implies$ Choose East pixel $(x_{k+1} = x_k + 1, y_{k+1} = y_k)$.
  $$p_{k+1} = p_k + 2x_{k+1} + 1$$
- **If $p_k \ge 0$:** Midpoint is outside/on circle $\implies$ Choose South-East pixel $(x_{k+1} = x_k + 1, y_{k+1} = y_k - 1)$.
  $$p_{k+1} = p_k + 2x_{k+1} + 1 - 2y_{k+1}$$

### Q3. [5 Marks] Explain the Recursive Boundary Fill Algorithm.
**Model Answer:**
```c
void boundaryFill4(int x, int y, int fillColor, int boundaryColor) {
    int current = getPixel(x, y);
    if (current != boundaryColor && current != fillColor) {
        setPixel(x, y, fillColor);
        boundaryFill4(x + 1, y, fillColor, boundaryColor); // Right
        boundaryFill4(x - 1, y, fillColor, boundaryColor); // Left
        boundaryFill4(x, y + 1, fillColor, boundaryColor); // Up
        boundaryFill4(x, y - 1, fillColor, boundaryColor); // Down
    }
}
```
- Uses recursion to explore neighbors; high stack memory consumption on large regions.

### Q4. [5 Marks] Describe the Edge Table (ET) and Active Edge Table (AET) in Scanline Polygon Filling.
**Model Answer:**
1. **Edge Table (ET):** Stores all non-horizontal polygon edges sorted by their minimum y-coordinate ($y_{\min}$). Contains $y_{\max}$, current $x$, and slope inverse $1/m$.
2. **Active Edge Table (AET):** Stores edges intersecting the current scanline $y$. Edges are sorted by current $x$. Pixels are filled in pairs between consecutive edges; $x$ is updated as $x_{k+1} = x_k + 1/m$.

### Q5. [5 Marks] Explain Antialiasing Techniques in Scan Conversion.
**Model Answer:**
- **Supersampling (Post-filtering):** Render scene at higher internal resolution (e.g., $4\times$) and average subpixel color intensities into the display pixel.
- **Area Sampling (Pre-filtering):** Calculate the exact geometric fractional area of the pixel box covered by the primitive line/polygon and scale the pixel intensity proportionally.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Provide the Complete Mathematical Derivation of Bresenham's Line Drawing Algorithm for $0 \le m \le 1$ with a Worked Numerical Problem.
**Comprehensive University Solution:**
### Derivation of Bresenham's Integer Line Algorithm

```
  y-axis
    ^
    |                Line Equation: y = m(x+1) + c
    |                      *
    |        (x_k+1, y_k+1)  [ Pixel T ]  d2
    |                      +-------+
    |                      |       |
    |             ---------+-------+---------- Actual Line Point (y)
    |                      |       |
    |        (x_k+1, y_k)    [ Pixel S ]  d1
    +-------------------------------------------> x-axis
                   x_k     x_k+1
```

#### 1. Geometric Distances Formulation:
At step $x_{k+1} = x_k + 1$, the vertical line coordinate is $y = m(x_k + 1) + c$.
Candidate pixels are $S(x_k + 1, y_k)$ and $T(x_k + 1, y_k + 1)$:
- Distance $d_1 = y - y_k = m(x_k + 1) + c - y_k$
- Distance $d_2 = (y_k + 1) - y = y_k + 1 - m(x_k + 1) - c$

#### 2. Difference Between Distances:
$$d_1 - d_2 = 2m(x_k + 1) - 2y_k + 2c - 1$$
Substitute slope $m = \frac{\Delta y}{\Delta x}$ and multiply by $\Delta x$ to eliminate fractions:
$$p_k = \Delta x (d_1 - d_2) = 2\Delta y \cdot x_k - 2\Delta x \cdot y_k + C$$
Where constant $C = 2\Delta y + \Delta x (2c - 1)$.

#### 3. Recurrence Relation for Subsequent Step:
$$p_{k+1} - p_k = 2\Delta y (x_{k+1} - x_k) - 2\Delta x (y_{k+1} - y_k)$$
Since $x_{k+1} - x_k = 1$:
$$p_{k+1} = p_k + 2\Delta y - 2\Delta x (y_{k+1} - y_k)$$
- **If $p_k < 0$:** Pixel $S$ is closer ($d_1 < d_2$). Choose $y_{k+1} = y_k$:
  $$p_{k+1} = p_k + 2\Delta y$$
- **If $p_k \ge 0$:** Pixel $T$ is closer. Choose $y_{k+1} = y_k + 1$:
  $$p_{k+1} = p_k + 2\Delta y - 2\Delta x$$

#### 4. Initial Parameter $p_0$:
At start point $(x_0, y_0)$ with $c = y_0 - m x_0$:
$$p_0 = 2\Delta y - \Delta x$$

#### 5. Worked Numerical Example:
- Rasterize line from $(20, 10)$ to $(30, 18)$:
  - $\Delta x = 30 - 20 = 10, \quad \Delta y = 18 - 10 = 8$
  - $2\Delta y = 16, \quad 2\Delta y - 2\Delta x = 16 - 20 = -4$
  - $p_0 = 2(8) - 10 = \mathbf{6}$

| $k$ | $p_k$ | Chosen $(x_{k+1}, y_{k+1})$ | Next $p_{k+1}$ |
| :--- | :--- | :--- | :--- |
| 0 | 6 ($\ge 0$) | $(21, 11)$ | $6 + (-4) = 2$ |
| 1 | 2 ($\ge 0$) | $(22, 12)$ | $2 + (-4) = -2$ |
| 2 | -2 ($< 0$) | $(23, 12)$ | $-2 + 16 = 14$ |
| 3 | 14 ($\ge 0$)| $(24, 13)$ | $14 + (-4) = 10$ |
| 4 | 10 ($\ge 0$)| $(25, 14)$ | $10 + (-4) = 6$ |
| 5 | 6 ($\ge 0$) | $(26, 15)$ | $6 + (-4) = 2$ |
| 6 | 2 ($\ge 0$) | $(27, 16)$ | $2 + (-4) = -2$ |
| 7 | -2 ($< 0$) | $(28, 16)$ | $-2 + 16 = 14$ |
| 8 | 14 ($\ge 0$)| $(29, 17)$ | $14 + (-4) = 10$ |
| 9 | 10 ($\ge 0$)| $(30, 18)$ | Target Reached! |

### Q2. [10/15 Marks] Derive and Implement the Midpoint Circle Generation Algorithm in Python.
**Comprehensive University Solution:**
```python
def midpoint_circle(radius, xc=0, yc=0):
    """Midpoint Circle Generation Algorithm."""
    x = 0
    y = radius
    p = 1 - radius # Initial decision parameter for integer radius
    
    pixels = []
    
    def add_symmetric_points(cx, cy, px, py):
        return [
            (cx + px, cy + py), (cx - px, cy + py),
            (cx + px, cy - py), (cx - px, cy - py),
            (cx + py, cy + px), (cx - py, cy + px),
            (cx + py, cy - px), (cx - py, cy - px)
        ]
    
    pixels.extend(add_symmetric_points(xc, yc, x, y))
    
    while x < y:
        x += 1
        if p < 0:
            p += 2 * x + 1
        else:
            y -= 1
            p += 2 * (x - y) + 1
        pixels.extend(add_symmetric_points(xc, yc, x, y))
        
    return sorted(list(set(pixels)))

# Calculate points for Circle radius 8 centered at (0,0)
circle_pts = midpoint_circle(8)
print(f"Generated {len(circle_pts)} unique pixel points for radius 8 circle.")
print("First Octant Points:", [pt for pt in circle_pts if 0 <= pt[0] <= pt[1] and pt[1] > 0][:5])
```

### Q3. [10/15 Marks] Explain the Scanline Polygon Fill Algorithm with Full Edge Table Structure and Parity Handling.
**Comprehensive University Solution:**
### Scanline Polygon Fill Architecture

```
Scanline y=6  --------+=============+--------------------> (Inverts Parity: OUT -> IN -> OUT)
                      |  POLYGON    |
Scanline y=4  ----+===+=============+===+----------------> (4 Intersections: OUT -> IN -> OUT -> IN -> OUT)
                  |                     |
```

#### Data Structures:
1. **Edge Tuple:** `(ymax, x_with_ymin, 1/m)`
2. **Edge Table (ET):** Linked list array indexed from $y_{\min}$ to $y_{\max}$ of the polygon bounding box.
3. **Active Edge Table (AET):** Dynamic list of edges intersecting current scanline $y$, sorted strictly by ascending $x$.

#### Algorithm Execution Steps:
1. Construct ET by inserting non-horizontal edges at `ET[ymin]`.
2. Initialize empty AET. Set current scanline $y$ to smallest non-empty index in ET.
3. While AET or ET is not empty:
   a. Move edges whose $y_{\min} = y$ from ET to AET.
   b. Remove edges from AET whose $y_{\max} = y$ (expired edges).
   c. Sort AET edges by $x$-coordinate.
   d. Pair consecutive edges $(e_1, e_2), (e_3, e_4)$ and fill all pixels from $x_1$ to $x_2$ on scanline $y$.
   e. Increment $y$ by 1.
   f. For each edge remaining in AET, update $x = x + 1/m$.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently ask: Bresenham Line derivation with step-by-step numerical table (10-15 marks), Midpoint Circle algorithm, and Scanline Polygon fill parity rule.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
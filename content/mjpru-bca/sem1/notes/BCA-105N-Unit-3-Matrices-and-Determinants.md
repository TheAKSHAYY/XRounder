# BCA-105N: Basic Mathematics
## Unit 3 Master Exam Revision Notes: Matrices and Determinants - Operations & Inverse
**Target Examination:** MJPRU Bareilly BCA Semester 1 (CBCS Pattern 2024–25)
**Unit Identifier:** `cc1f38ec-8b64-4375-bd8d-74bd14d3a0eb` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Matrix Fundamentals: Definition, Order of a Matrix (m x n), Elements & Matrix Notation**
- [x] **Types of Matrices: Row, Column, Zero/Null, Square, Diagonal, Scalar, Identity/Unit Matrices**
- [x] **Special Square Matrices: Upper Triangular, Lower Triangular, Symmetric & Skew-Symmetric Matrices**
- [x] **Matrix Operations: Addition, Subtraction, Properties (Commutative, Associative), Scalar Multiplication**
- [x] **Matrix Multiplication: Conformability Condition, Row-by-Column Rule, Non-Commutativity, Associativity, Distributivity**
- [x] **Transpose of a Matrix: Properties ((A^T)^T = A, (A+B)^T = A^T + B^T, (AB)^T = B^T A^T)**
- [x] **Orthogonal Matrices & Decomposition of Matrix into Symmetric and Skew-Symmetric Parts**
- [x] **Elementary Operations: Elementary Row Operations (ERO) & Column Operations (ECO)**
- [x] **Inverse of a Matrix using Elementary Row Operations (Gauss-Jordan Elimination Method)**
- [x] **Determinants: Definition, Determinant of Order 1, 2, and 3, Sarrus Rule**
- [x] **Minors and Cofactors: Calculation of Minors M_ij, Cofactors C_ij = (-1)^(i+j) * M_ij**
- [x] **Properties of Determinants: Reflection, All-Zero, Identical Rows/Cols, Scalar Multiplication, Sum Property**
- [x] **Adjoint of a Square Matrix: adj(A) Definition, Properties (A * adj(A) = adj(A) * A = |A| * I)**
- [x] **Inverse of a Matrix via Adjoint Formula: A^(-1) = adj(A) / |A| (for non-singular matrices |A| != 0)**
- [x] **System of Linear Equations: Cramer's Rule for Solving 2x2 and 3x3 Systems, Matrix Inversion Method (X = A^(-1)B)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define a Square Matrix and an Identity Matrix.
**Model Answer:**
**Square Matrix:** A matrix having an equal number of rows and columns ($m = n$).
**Identity Matrix ($I$):** A square matrix where all diagonal elements $a_{ii} = 1$ and all off-diagonal elements $a_{ij} = 0$ for $i \ne j$.

### Q2. [2 Marks] What is a Skew-Symmetric Matrix? What must its diagonal elements be?
**Model Answer:**
A matrix $A$ where $A^T = -A$. Its main diagonal elements MUST all be strictly **ZERO** ($a_{ii} = -a_{ii} \implies 2a_{ii} = 0 \implies a_{ii} = 0$).

### Q3. [2 Marks] State the Reversal Law of Transposition and Inversion.
**Model Answer:**
$(AB)^T = B^T A^T$ and $(AB)^{-1} = B^{-1} A^{-1}$

### Q4. [2 Marks] What is an Orthogonal Matrix?
**Model Answer:**
A square real matrix $A$ satisfying $A A^T = A^T A = I$, which implies $A^{-1} = A^T$ and $|A| = \pm 1$.

### Q5. [2 Marks] When is a square matrix $A$ said to be Singular?
**Model Answer:**
When its determinant is equal to zero ($|A| = 0$). A singular matrix has no inverse ($A^{-1}$ does not exist).

### Q6. [2 Marks] What is the relation connecting a matrix $A$ and its Adjoint $\text{adj}(A)$?
**Model Answer:**
$$A \cdot \text{adj}(A) = \text{adj}(A) \cdot A = |A| \cdot I$$

### Q7. [2 Marks] If $A$ is an $n \times n$ matrix, what is $|k A|$ in terms of $|A|$?
**Model Answer:**
$$|k A| = k^n |A|$$

### Q8. [2 Marks] If $A$ is an invertible matrix of order $n$, what is $|\text{adj}(A)|$?
**Model Answer:**
$$|\text{adj}(A)| = |A|^{n - 1}$$

### Q9. [2 Marks] State Cramer's Rule condition for a system of linear equations to have a unique solution.
**Model Answer:**
The determinant of the coefficient matrix must be non-zero ($D \ne 0$). The unique solution is $x = \frac{D_x}{D}, y = \frac{D_y}{D}, z = \frac{D_z}{D}$.

### Q10. [2 Marks] How can any square matrix $A$ be decomposed into symmetric and skew-symmetric parts?
**Model Answer:**
$$A = \frac{1}{2}(A + A^T) + \frac{1}{2}(A - A^T)$$ where $\frac{1}{2}(A + A^T)$ is symmetric and $\frac{1}{2}(A - A^T)$ is skew-symmetric.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Evaluate the determinant of order 3: $\begin{vmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{vmatrix}$.
**Model Answer:**
Expanding along Row 1:
$$|A| = 1(5 \times 9 - 6 \times 8) - 2(4 \times 9 - 6 \times 7) + 3(4 \times 8 - 5 \times 7)$$
$$= 1(45 - 48) - 2(36 - 42) + 3(32 - 35)$$
$$= 1(-3) - 2(-6) + 3(-3) = -3 + 12 - 9 = 0$$

### Q2. [5 Marks] Find the inverse of the matrix $A = \begin{bmatrix} 2 & 1 \\ 5 & 3 \end{bmatrix}$ using the Adjoint method.
**Model Answer:**
1. Determinant: $|A| = (2 \times 3) - (1 \times 5) = 6 - 5 = 1 \ne 0$.
2. Cofactors: $C_{11} = 3$, $C_{12} = -5$, $C_{21} = -1$, $C_{22} = 2$.
3. Adjoint: $\text{adj}(A) = \begin{bmatrix} 3 & -1 \\ -5 & 2 \end{bmatrix}$.
4. Inverse: $A^{-1} = \frac{\text{adj}(A)}{|A|} = \frac{1}{1} \begin{bmatrix} 3 & -1 \\ -5 & 2 \end{bmatrix} = \begin{bmatrix} 3 & -1 \\ -5 & 2 \end{bmatrix}$.

### Q3. [5 Marks] Solve the system using Cramer's Rule: $2x - y = 5$, $3x + 2y = 4$.
**Model Answer:**
- $D = \begin{vmatrix} 2 & -1 \\ 3 & 2 \end{vmatrix} = 2(2) - (-1)(3) = 4 + 3 = 7 \ne 0$
- $D_x = \begin{vmatrix} 5 & -1 \\ 4 & 2 \end{vmatrix} = 5(2) - (-1)(4) = 10 + 4 = 14$
- $D_y = \begin{vmatrix} 2 & 5 \\ 3 & 4 \end{vmatrix} = 2(4) - 5(3) = 8 - 15 = -7$
$$x = \frac{D_x}{D} = \frac{14}{7} = 2, \quad y = \frac{D_y}{D} = \frac{-7}{7} = -1$$
Solution: **$x = 2, y = -1$**.

### Q4. [5 Marks] Prove that the determinant of a Skew-Symmetric matrix of ODD order is always ZERO.
**Model Answer:**
Let $A$ be a skew-symmetric matrix of odd order $n$ ($n = 2k + 1$).
By definition: $A^T = -A$.
Take determinant on both sides:
$$|A^T| = |-A|$$
Using properties $|A^T| = |A|$ and $|-A| = (-1)^n |A|$:
$$|A| = (-1)^n |A|$$
Since $n$ is odd, $(-1)^n = -1$:
$$|A| = -|A| \implies 2|A| = 0 \implies |A| = 0 \quad \text{(Q.E.D.)}$$

### Q5. [5 Marks] Express the matrix $A = \begin{bmatrix} 3 & 5 \\ 1 & -1 \end{bmatrix}$ as the sum of a symmetric and a skew-symmetric matrix.
**Model Answer:**
- $A^T = \begin{bmatrix} 3 & 1 \\ 5 & -1 \end{bmatrix}$
- Symmetric part $P = \frac{1}{2}(A + A^T) = \frac{1}{2}\begin{bmatrix} 6 & 6 \\ 6 & -2 \end{bmatrix} = \begin{bmatrix} 3 & 3 \\ 3 & -1 \end{bmatrix}$
- Skew-symmetric part $Q = \frac{1}{2}(A - A^T) = \frac{1}{2}\begin{bmatrix} 0 & 4 \\ -4 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 2 \\ -2 & 0 \end{bmatrix}$
Verification: $P + Q = \begin{bmatrix} 3 & 5 \\ 1 & -1 \end{bmatrix} = A$.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Find the inverse of the $3 \times 3$ matrix $A = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{bmatrix}$ using the Adjoint Method.
**Comprehensive University Solution:**
### 1. Determinant $|A|$
Expand along Row 1:
$$|A| = 1(0 - 24) - 2(0 - 20) + 3(0 - 5) = -24 + 40 - 15 = 1$$
Since $|A| = 1 \ne 0$, $A^{-1}$ exists.

### 2. Matrix of Cofactors $C_{ij} = (-1)^{i+j} M_{ij}$
- $C_{11} = +(0 - 24) = -24$
- $C_{12} = -(0 - 20) = 20$
- $C_{13} = +(0 - 5) = -5$
- $C_{21} = -(0 - 18) = 18$
- $C_{22} = +(0 - 15) = -15$
- $C_{23} = -(6 - 10) = 4$
- $C_{31} = +(8 - 3) = 5$
- $C_{32} = -(4 - 0) = -4$
- $C_{33} = +(1 - 0) = 1$

### 3. Adjoint Matrix $\text{adj}(A) = C^T$
$$\text{adj}(A) = \begin{bmatrix} -24 & 18 & 5 \\ 20 & -15 & -4 \\ -5 & 4 & 1 \end{bmatrix}$$

### 4. Compute Inverse $A^{-1} = \frac{\text{adj}(A)}{|A|}$
Since $|A| = 1$:
$$A^{-1} = \begin{bmatrix} -24 & 18 & 5 \\ 20 & -15 & -4 \\ -5 & 4 & 1 \end{bmatrix}$$

### Q2. [10/15 Marks] Solve the system of 3 linear equations using Cramer's Rule: $x + y + z = 6$, $x - y + z = 2$, $2x + y - z = 1$.
**Comprehensive University Solution:**
### 1. Coefficient Determinant $D$
$$D = \begin{vmatrix} 1 & 1 & 1 \\ 1 & -1 & 1 \\ 2 & 1 & -1 \end{vmatrix}$$
Expand along Row 1:
$$D = 1(1 - 1) - 1(-1 - 2) + 1(1 - (-2)) = 1(0) - 1(-3) + 1(3) = 3 + 3 = 6 \ne 0$$

### 2. Numerator Determinants
$$D_x = \begin{vmatrix} 6 & 1 & 1 \\ 2 & -1 & 1 \\ 1 & 1 & -1 \end{vmatrix} = 6(1 - 1) - 1(-2 - 1) + 1(2 - (-1)) = 0 + 3 + 3 = 6$$
$$D_y = \begin{vmatrix} 1 & 6 & 1 \\ 1 & 2 & 1 \\ 2 & 1 & -1 \end{vmatrix} = 1(-2 - 1) - 6(-1 - 2) + 1(1 - 4) = -3 + 18 - 3 = 12$$
$$D_z = \begin{vmatrix} 1 & 1 & 6 \\ 1 & -1 & 2 \\ 2 & 1 & 1 \end{vmatrix} = 1(-1 - 2) - 1(1 - 4) + 6(1 - (-2)) = -3 + 3 + 18 = 18$$

### 3. Final Solutions
$$x = \frac{D_x}{D} = \frac{6}{6} = 1, \quad y = \frac{D_y}{D} = \frac{12}{6} = 2, \quad z = \frac{D_z}{D} = \frac{18}{6} = 3$$
Solution: **$x = 1, y = 2, z = 3$**.

### Q3. [10/15 Marks] Find the inverse of matrix $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$ using Elementary Row Operations (Gauss-Jordan Method).
**Comprehensive University Solution:**
Set up the augmented matrix $[A \mid I]$:
$$\left[ \begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 3 & 4 & 0 & 1 \end{array} \right]$$
1. Operation $R_2 \to R_2 - 3R_1$:
$$\left[ \begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 0 & -2 & -3 & 1 \end{array} \right]$$
2. Operation $R_2 \to -\frac{1}{2} R_2$:
$$\left[ \begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 0 & 1 & 3/2 & -1/2 \end{array} \right]$$
3. Operation $R_1 \to R_1 - 2R_2$:
$$\left[ \begin{array}{cc|cc} 1 & 0 & 1 - 2(3/2) & 0 - 2(-1/2) \\ 0 & 1 & 3/2 & -1/2 \end{array} \right] = \left[ \begin{array}{cc|cc} 1 & 0 & -2 & 1 \\ 0 & 1 & 3/2 & -1/2 \end{array} \right]$$
Since left side is now $I$, the right side is $A^{-1}$:
$$A^{-1} = \begin{bmatrix} -2 & 1 \\ 3/2 & -1/2 \end{bmatrix}$$


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-105N Unit 3, 3x3 Matrix Inversion via Adjoint method and solving 3 equations with Cramer's Rule are 100% guaranteed 15-mark questions. Practice arithmetic calculations carefully to avoid sign errors.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
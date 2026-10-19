# BCA-102N: Data Structures using C
## Unit 1 Master Exam Revision Notes: Introduction to Data Structures, Complexity & Arrays
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `ba474b73-58b8-4728-847b-aabb00b9bb6b` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Basic Terminology & Elementary Data Organizations**
- [x] **Need of Data Structures & Classification (Linear vs Non-Linear, Static vs Dynamic)**
- [x] **Operations on Data Structures (Traversing, Insertion, Deletion, Searching, Sorting, Merging)**
- [x] **Algorithm Complexity: Time-Space Trade-off & Asymptotic Notations (Big-O, Omega, Theta)**
- [x] **Arrays: Memory Representation of Single and Multidimensional Arrays (Row-Major vs Column-Major)**
- [x] **Address Calculation in 1D, 2D, and 3D Arrays**
- [x] **Sparse Arrays: Concept, Representation & Lower/Upper Triangular and Tri-diagonal Matrices**
- [x] **Addition and Subtraction Operations on Sparse Arrays**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define Data Structure and classify them into Linear and Non-Linear.
**Model Answer:**
A **Data Structure** is a specialized format for organizing, storing, and manipulating data efficiently in computer memory.
- **Linear:** Elements form a sequential sequence where each element has a unique predecessor and successor (e.g., Arrays, Stacks, Queues, Linked Lists).
- **Non-Linear:** Elements are organized hierarchically or interconnected arbitrarily without single sequencing (e.g., Trees, Graphs).

### Q2. [2 Marks] Differentiate between Static and Dynamic Data Structures.
**Model Answer:**
- **Static:** Memory size is fixed at compile-time and cannot grow or shrink during execution (e.g., standard Arrays in C).
- **Dynamic:** Memory is allocated at runtime from the heap (e.g., via `malloc()`/`calloc()`) and can adjust in size dynamically (e.g., Linked Lists).

### Q3. [2 Marks] Explain Big-O (O), Big-Omega (Ω), and Big-Theta (Θ) asymptotic notations.
**Model Answer:**
- **Big-O (O):** Represents the asymptotic **upper bound** (worst-case execution growth rate): f(n) <= c * g(n) for n >= n0.
- **Big-Omega (Ω):** Represents the asymptotic **lower bound** (best-case execution growth rate): f(n) >= c * g(n) for n >= n0.
- **Big-Theta (Θ):** Represents the asymptotic **tight bound** (both upper and lower bound): c1 * g(n) <= f(n) <= c2 * g(n).

### Q4. [2 Marks] What is the Time-Space Trade-off in algorithm design?
**Model Answer:**
It refers to the trade-off where algorithms can either run faster by consuming more memory (e.g., precomputed lookup tables, hash tables), or reduce memory consumption at the expense of additional computation time.

### Q5. [2 Marks] State the formula for 1D Array element address calculation in byte-addressable memory.
**Model Answer:**
For an array `A[L...U]` with base address `B` and element size `W` bytes:
`Address(A[i]) = B + (i - L) * W`
When 0-indexed (L = 0): `Address(A[i]) = B + i * W`.

### Q6. [2 Marks] Give the formulas for Row-Major and Column-Major address calculation of `A[i][j]` in a 2D array.
**Model Answer:**
For array `A[Lr...Ur, Lc...Uc]` with `M` rows, `N` columns, base `B`, and element size `W`:
- **Row-Major Order (RMO):** `Address(A[i][j]) = B + [ (i - Lr) * N + (j - Lc) ] * W`
- **Column-Major Order (CMO):** `Address(A[i][j]) = B + [ (j - Lc) * M + (i - Lr) ] * W`

### Q7. [2 Marks] What is a Sparse Matrix and how is it represented efficiently?
**Model Answer:**
A sparse matrix is a matrix where the vast majority of elements are zero. Storing all elements wastes memory. It is efficiently represented using **3-tuple (triplet) representation** storing only non-zero elements: `(Row_Index, Column_Index, Value)` along with header `(Total_Rows, Total_Cols, Non_Zero_Count)`.

### Q8. [2 Marks] Define Lower Triangular, Upper Triangular, and Tri-diagonal Matrices.
**Model Answer:**
- **Lower Triangular:** All entries above the main diagonal are zero: `A[i][j] = 0` for `i < j`.
- **Upper Triangular:** All entries below the main diagonal are zero: `A[i][j] = 0` for `i > j`.
- **Tri-diagonal:** All entries except main diagonal and immediate adjacent diagonals are zero: `A[i][j] = 0` for `|i - j| > 1`.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the elementary operations performed on Data Structures with their standard time complexities.
**Model Answer:**
1. **Traversing:** Accessing and processing each element exactly once (O(n)).
2. **Insertion:** Adding a new element at beginning, end, or middle (O(1) to O(n)).
3. **Deletion:** Removing an existing element and reorganizing remaining items (O(1) to O(n)).
4. **Searching:** Finding the location of a target element with a specific key (O(1) in Hash tables, O(log n) in Binary Search, O(n) in Linear Search).
5. **Sorting:** Arranging elements in ascending or descending logical sequence (O(n log n) in Merge/Quick sort, O(n^2) in Bubble/Selection sort).
6. **Merging:** Combining two sorted structures into a single sorted structure (O(n + m)).

### Q2. [5 Marks] Compare Row-Major Order and Column-Major Order with an illustrative 3x3 matrix example.
**Model Answer:**
Consider matrix `A` of size 3x3:
```
[ a00  a01  a02 ]
[ a10  a11  a12 ]
[ a20  a21  a22 ]
```
- **Row-Major Order (Used in C/C++, Java, Python):** Elements are stored row-by-row consecutively in linear RAM:
  `a00, a01, a02, a10, a11, a12, a20, a21, a22`
- **Column-Major Order (Used in Fortran, MATLAB, R):** Elements are stored column-by-column consecutively in RAM:
  `a00, a10, a20, a01, a11, a21, a02, a12, a22`
Understanding this layout is crucial for cache locality and memory strides in nested loops.

### Q3. [5 Marks] Solve a University Address Calculation Problem: Given a 2D array `A[10...30, 20...50]` stored in row-major order with base address 5000 and each element occupying 4 bytes. Find the address of `A[25, 35]`.
**Model Answer:**
**Given Data:**
- `Lr = 10`, `Ur = 30` => Rows `M = 30 - 10 + 1 = 21`
- `Lc = 20`, `Uc = 50` => Columns `N = 50 - 20 + 1 = 31`
- `Base Address (B) = 5000`
- `Element Size (W) = 4 bytes`
- Target Indices: `i = 25`, `j = 35`

**Row-Major Formula:**
`Address(A[i][j]) = B + [ (i - Lr) * N + (j - Lc) ] * W`
`Address(A[25][35]) = 5000 + [ (25 - 10) * 31 + (35 - 20) ] * 4`
`= 5000 + [ 15 * 31 + 15 ] * 4`
`= 5000 + [ 465 + 15 ] * 4 = 5000 + [ 480 ] * 4`
`= 5000 + 1920 = 6920`
**Result:** The address of `A[25, 35]` is **6920**.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Discuss Sparse Matrices in detail. Explain the 3-Tuple Representation and write a complete C program to perform Addition of two Sparse Matrices.
**Comprehensive University Solution:**
### 1. Conceptual Need for Sparse Matrices
In scientific and enterprise computing (e.g., finite element analysis, graph adjacency matrices), matrices often contain 85%–99% zero entries. Allocating full 2D arrays wastes gigabytes of memory and burns CPU cycles multiplying by zero. A sparse representation stores only non-zero coordinates.

### 2. Triplet (3-Tuple) Structure
Row 0 stores metadata: `[Total_Rows, Total_Cols, Total_Non_Zero]`.
Subsequent rows store: `[Row_Index, Col_Index, Non_Zero_Value]`.

### 3. C Implementation of Sparse Matrix Addition
```c
#include <stdio.h>

#define MAX 100

typedef struct {
    int row;
    int col;
    int val;
} Element;

void addSparse(Element a[], Element b[], Element c[]) {
    if (a[0].row != b[0].row || a[0].col != b[0].col) {
        printf("Error: Matrix dimensions do not match for addition!\n");
        return;
    }
    c[0].row = a[0].row;
    c[0].col = a[0].col;
    
    int i = 1, j = 1, k = 1;
    int t1 = a[0].val, t2 = b[0].val;
    
    while (i <= t1 && j <= t2) {
        if (a[i].row < b[j].row || (a[i].row == b[j].row && a[i].col < b[j].col)) {
            c[k++] = a[i++];
        } else if (b[j].row < a[i].row || (b[j].row == a[i].row && b[j].col < a[i].col)) {
            c[k++] = b[j++];
        } else {
            int sum = a[i].val + b[j].val;
            if (sum != 0) {
                c[k].row = a[i].row;
                c[k].col = a[i].col;
                c[k].val = sum;
                k++;
            }
            i++; j++;
        }
    }
    while (i <= t1) c[k++] = a[i++];
    while (j <= t2) c[k++] = b[j++];
    c[0].val = k - 1;
}

void printSparse(Element a[]) {
    printf("Row\tCol\tVal\n");
    for (int i = 0; i <= a[0].val; i++) {
        printf("%d\t%d\t%d\n", a[i].row, a[i].col, a[i].val);
    }
}
```
### 4. Complexity Analysis
- Space Complexity: `O(nz1 + nz2)` where `nz` is non-zero count, saving up to 90% memory.
- Time Complexity: Linear `O(nz1 + nz2)` in single coordinated pass through both sorted arrays.

### Q2. [10/15 Marks] Derive the general address calculation formula for a 3-Dimensional Array `A[1...L, 1...M, 1...N]` in both Row-Major and Column-Major order.
**Comprehensive University Solution:**
### 1. Representation of 3D Array in Memory
A 3D array `A[L][M][N]` can be visualized as `L` 2D planes/sheets, each containing `M` rows and `N` columns.

### 2. Derivation in Row-Major Order (RMO)
In Row-Major order, the entire first plane is stored, then the second plane, and so on. Within each plane, elements are stored row by row.
To access element `A[i][j][k]`:
1. We must skip `(i - 1)` entire planes. Each plane contains `M * N` elements.
2. In the `i`-th plane, we must skip `(j - 1)` complete rows. Each row contains `N` elements.
3. In the `j`-th row, we must skip `(k - 1)` elements.

Total elements skipped before `A[i][j][k]`:
`Elements_Skipped = (i - 1) * M * N + (j - 1) * N + (k - 1)`
Multiplying by element size `W` and adding Base Address `B`:
$$\text{Address}(A[i][j][k]) = B + [ (i - 1)MN + (j - 1)N + (k - 1) ] \times W$$

### 3. General Lower-Bound Form:
For array with lower bounds `L1, L2, L3` and upper bounds `U1, U2, U3` where dimension lengths are `d1, d2, d3`:
$$\text{Address}(A[i][j][k]) = B + [ (i - L1)d2 d3 + (j - L2)d3 + (k - L3) ] \times W$$

### 4. Derivation in Column-Major Order (CMO)
In CMO, inner indices cycle last. Columns across planes are stored first:
$$\text{Address}(A[i][j][k]) = B + [ (k - L3)d1 d2 + (j - L2)d1 + (i - L1) ] \times W$$


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-102N Unit 1, university examiners consistently set one 5-mark numerical problem on 2D array address calculation (Row-Major or Column-Major) and one 10-mark question on Sparse Matrix representation or Algorithm Asymptotics. Always clearly state the formula, identify all variables, and double-check arithmetic.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
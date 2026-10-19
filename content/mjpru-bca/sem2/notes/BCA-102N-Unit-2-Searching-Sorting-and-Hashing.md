# BCA-102N: Data Structures using C
## Unit 2 Master Exam Revision Notes: Searching, Sorting Techniques & Hashing
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `f5a68165-ba67-4174-8fa1-ab0a947cf0b7` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Searching Techniques: Linear Search (Algorithm, Complexity & Implementation)**
- [x] **Binary Search: Divide & Conquer Approach, Prerequisite, Algorithm & Complexity Analysis**
- [x] **Hashing Concepts: Hash Functions (Division, Mid-Square, Folding), Collision Resolution Strategies**
- [x] **Collision Handling: Open Addressing (Linear Probing, Quadratic Probing, Double Hashing) vs Separate Chaining**
- [x] **Insertion Sort: Working Principle, Algorithm, Trace & Time Complexity Analysis**
- [x] **Selection Sort: Working Principle, Minimum Element Selection, Algorithm & Trace**
- [x] **Merge Sort: Divide, Conquer & Combine Algorithm, Recurrence Relation & Trace**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] State the mandatory prerequisite for executing Binary Search.
**Model Answer:**
The array must be strictly **sorted** in ascending or descending order, and random access to elements in O(1) time must be supported (e.g., contiguous array).

### Q2. [2 Marks] Give the Best, Average, and Worst-case time complexity of Binary Search.
**Model Answer:**
- **Best Case:** O(1) (target element is located at the exact middle index on first comparison).
- **Average Case:** O(log2 n).
- **Worst Case:** O(log2 n) (target element is at extreme boundary or not present).

### Q3. [2 Marks] Define a Hash Function and list three desirable properties.
**Model Answer:**
A hash function `h(k)` maps a large key `k` to a fixed integer slot index in a hash table `[0...m-1]`. Desirable properties: (1) Deterministic, (2) Uniform distribution (minimizes clustering/collisions), (3) Extremely fast O(1) computation.

### Q4. [2 Marks] Explain the Division and Mid-Square methods of hashing.
**Model Answer:**
- **Division Method:** `h(k) = k mod m`, where `m` is chosen as a prime number not close to a power of 2.
- **Mid-Square Method:** The key `k` is squared (`k^2`), and the middle `r` digits of the product are extracted to produce the hash address.

### Q5. [2 Marks] What is a Collision in hashing? Name two major categories of collision resolution.
**Model Answer:**
A collision occurs when two distinct keys `k1 != k2` produce the identical hash address `h(k1) == h(k2)`.
Categories: (1) **Open Addressing / Closed Hashing** (Linear Probing, Quadratic Probing, Double Hashing), (2) **Separate Chaining / Open Hashing** (linked lists).

### Q6. [2 Marks] What is Primary Clustering in Linear Probing?
**Model Answer:**
Primary clustering is the tendency of occupied slots to form long contiguous blocks in the hash table, causing future probes to take progressively longer and degrading average search performance from O(1) toward O(n).

### Q7. [2 Marks] What is the working principle of Insertion Sort?
**Model Answer:**
Insertion sort builds the final sorted array one element at a time by picking the next element and inserting it into its correct relative position within the already sorted subarray to its left.

### Q8. [2 Marks] Why is Merge Sort called a Divide-and-Conquer algorithm?
**Model Answer:**
It recursively **divides** the array into two equal halves until subarrays of size 1 remain, **conquers** each half by sorting, and **combines** (merges) the two sorted subarrays into a single sorted array.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare Linear Search and Binary Search across all performance metrics.
**Model Answer:**
| Metric | Linear Search | Binary Search |
| :--- | :--- | :--- |
| **Prerequisite** | Unsorted or sorted array | Strictly sorted array |
| **Strategy** | Sequential scan | Divide and Conquer |
| **Best Case Time** | O(1) | O(1) |
| **Worst Case Time** | O(n) | O(log2 n) |
| **Data Structure** | Array or Linked List | Array (requires O(1) random access) |
| **Suitability** | Small or frequently mutated data | Large static or read-heavy datasets |

### Q2. [5 Marks] Explain Collision Resolution using Separate Chaining with a neat diagram.
**Model Answer:**
In **Separate Chaining**, each slot of the hash table array contains a pointer to the head of a singly linked list. When multiple keys hash to slot `i`, they are simply appended to the linked list at `table[i]`.
```
Hash Table Index   Linked List of Collided Keys
   [0] ---------> [ Key 20 ] -> [ Key 50 ] -> NULL
   [1] ---------> NULL
   [2] ---------> [ Key 42 ] -> NULL
   [3] ---------> [ Key 13 ] -> [ Key 33 ] -> [ Key 93 ] -> NULL
```
- **Advantages:** Never gets full; load factor `α = n/m` can exceed 1; simple deletion.
- **Disadvantages:** Pointer overhead consumes additional RAM; cache locality is poor compared to open addressing.

### Q3. [5 Marks] Trace Selection Sort step-by-step for the array: `[29, 10, 14, 37, 13]`.
**Model Answer:**
Selection sort scans for the minimum element in the unsorted suffix and swaps it with the first unsorted position:
- **Pass 1:** Subarray `[29, 10, 14, 37, 13]`. Minimum is `10` (at index 1). Swap with index 0:
  `[10 | 29, 14, 37, 13]`
- **Pass 2:** Subarray `[29, 14, 37, 13]`. Minimum is `13` (at index 4). Swap with index 1:
  `[10, 13 | 14, 37, 29]`
- **Pass 3:** Subarray `[14, 37, 29]`. Minimum is `14` (at index 2). Already in place:
  `[10, 13, 14 | 37, 29]`
- **Pass 4:** Subarray `[37, 29]`. Minimum is `29` (at index 4). Swap with index 3:
  `[10, 13, 14, 29, 37]`
Array is sorted in `n - 1 = 4` passes.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Write a complete, working C program for Merge Sort and derive its time complexity using the recurrence relation.
**Comprehensive University Solution:**
### 1. Working C Implementation
```c
#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    
    mergeSort(arr, 0, n - 1);
    
    printf("Sorted Array:   ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
```

### 2. Recurrence Relation & Complexity Derivation
Dividing an array of size `n` into two halves takes `O(1)` time. Solving each half takes `T(n/2)`. Merging the two halves of size `n/2` takes linear `O(n)` time.
$$T(n) = 2T(n/2) + c n$$
Using **Master Theorem** ($a = 2, b = 2, f(n) = cn$):
- $n^{\log_b a} = n^{\log_2 2} = n^1$.
- Since $f(n) = \Theta(n^1)$, Case 2 of Master Theorem applies:
$$T(n) = \Theta(n \log_2 n)$$
- **Best Case:** $\Omega(n \log n)$
- **Worst Case:** $O(n \log n)$
- **Space Complexity:** $O(n)$ auxiliary array memory.

### Q2. [10/15 Marks] Explain Open Addressing collision resolution methods: Linear Probing, Quadratic Probing, and Double Hashing with probe sequence formulas and examples.
**Comprehensive University Solution:**
### 1. Concept of Open Addressing
In open addressing, all elements are stored directly inside the hash table array itself. When a collision occurs at slot `h(k)`, alternative slots are examined (probed) systematically until an empty slot is located.

### 2. Linear Probing
- **Formula:** `h(k, i) = (h'(k) + i) mod m`, where `i = 0, 1, 2, ..., m - 1`.
- **Working:** Probes consecutive adjacent slots: `h'(k), h'(k)+1, h'(k)+2...`
- **Drawback:** Suffers severely from **Primary Clustering** (clusters merge into long contiguous chains).

### 3. Quadratic Probing
- **Formula:** `h(k, i) = (h'(k) + c1 * i + c2 * i^2) mod m` (commonly `(h'(k) + i^2) mod m`).
- **Working:** Probes slots at non-linear quadratic intervals: `h', h'+1, h'+4, h'+9...`
- **Advantage:** Eliminates primary clustering.
- **Drawback:** Suffers from **Secondary Clustering** (keys hashing to the same initial slot trace the identical probe sequence).

### 4. Double Hashing
- **Formula:** `h(k, i) = (h1(k) + i * h2(k)) mod m`.
- **Working:** Uses two distinct hash functions `h1(k)` (determines starting index) and `h2(k)` (determines step offset).
- **Condition:** `h2(k)` must return a non-zero value that is relatively prime to table size `m` (e.g., `h2(k) = 1 + (k mod (m - 1))` when `m` is prime).
- **Advantage:** Completely eliminates both primary and secondary clustering; yields performance closest to ideal uniform hashing.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-102N Unit 2, university examiners invariably ask for the C implementation of Merge Sort or Binary Search, along with a theoretical comparison of Hashing collision resolution techniques. Memorize the Master Theorem recurrence for Merge Sort and write clean, commented C code.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
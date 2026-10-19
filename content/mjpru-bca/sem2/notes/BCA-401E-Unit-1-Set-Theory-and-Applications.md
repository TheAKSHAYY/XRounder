# BCA-401E: Mathematics II
## Unit 1 Master Exam Revision Notes: Set Theory, Set Operations & Applications
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `7844c00f-50ca-4135-b0d4-daaeca67d7ee` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Sets Definition, Representation (Roster vs Set-Builder Form), Subsets & Proper Subsets**
- [x] **Equal Sets, Equivalent Sets, Universal Sets, Finite and Infinite Sets**
- [x] **Set Operations: Union, Intersection, Difference, Symmetric Difference, and Complements**
- [x] **Properties & Laws of Set Operations: Commutative, Associative, Distributive, De Morgan's Laws**
- [x] **Cartesian Product of Sets, Ordered Pairs & Cardinality Properties**
- [x] **Power Set: Definition, Cardinality Calculation (2^n) & Properties**
- [x] **Venn Diagrams and Practical Word Problem Applications involving Cardinality Formulae**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define a Set and distinguish between Roster and Set-Builder notation.
**Model Answer:**
- **Set:** A well-defined collection of distinct objects.
- **Roster (Tabular) Form:** Explicitly lists every element separated by commas: `A = {2, 4, 6, 8}`.
- **Set-Builder (Rule) Form:** States the defining mathematical predicate satisfied by all members: `A = {x : x is an even natural number, x <= 8}`.

### Q2. [2 Marks] Differentiate between Subset and Proper Subset.
**Model Answer:**
- **Subset (A ⊆ B):** Every element of A belongs to B (A may equal B).
- **Proper Subset (A ⊂ B):** Every element of A belongs to B, and B contains at least one element not in A ($A \neq B$).

### Q3. [2 Marks] State the formula for the number of subsets and proper subsets of a finite set with n elements.
**Model Answer:**
- Number of Subsets in Power Set $P(A) = 2^n$.
- Number of Proper Subsets = $2^n - 1$ (excluding set A itself).

### Q4. [2 Marks] Define Universal Set and Empty Set.
**Model Answer:**
- **Universal Set (U):** The comprehensive set containing all possible objects under consideration in a particular mathematical discourse.
- **Empty (Null) Set (∅):** The unique set containing zero elements ($|\emptyset| = 0$).

### Q5. [2 Marks] State De Morgan's Laws of Set Theory.
**Model Answer:**
1. $(A \cup B)' = A' \cap B'$
2. $(A \cap B)' = A' \cup B'$

### Q6. [2 Marks] What is the Symmetric Difference of two sets A and B (A Δ B)?
**Model Answer:**
The set of elements belonging to either A or B, but not both: `A Δ B = (A - B) ∪ (B - A) = (A ∪ B) - (A ∩ B)`.

### Q7. [2 Marks] Define Cartesian Product of two sets A and B (A x B) and state its cardinality.
**Model Answer:**
The set of all ordered pairs: `A x B = {(a, b) : a ∈ A and b ∈ B}`. If $|A| = m$ and $|B| = n$, then $|A \times B| = m \times n$.

### Q8. [2 Marks] State the Principle of Inclusion-Exclusion for two and three finite sets.
**Model Answer:**
- For 2 sets: $|A \cup B| = |A| + |B| - |A \cap B|$.
- For 3 sets: $|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |B \cap C| - |A \cap C| + |A \cap B \cap C|$.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Prove algebraically that $(A \cup B)' = A' \cap B'$ (De Morgan's First Law).
**Model Answer:**
### Proof
Let $x \in (A \cup B)'$.
$\iff x \notin (A \cup B)$
$\iff x \notin A$ and $x \notin B$
$\iff x \in A'$ and $x \in B'$
$\iff x \in (A' \cap B')$.
Since every element of $(A \cup B)'$ is in $A' \cap B'$ and vice versa, $(A \cup B)' = A' \cap B'$.

### Q2. [5 Marks] Solve a practical University Venn diagram problem: In a college of 500 students, 280 study C Programming, 230 study Database Systems, and 120 study both. How many students study: (1) At least one of these subjects? (2) Only C Programming? (3) Neither subject?
**Model Answer:**
**Given Data:**
Total students $|U| = 500$
$|C| = 280$, $|D| = 230$, $|C \cap D| = 120$

1. **Students studying at least one subject:**
   $|C \cup D| = |C| + |D| - |C \cap D| = 280 + 230 - 120 = \mathbf{390}$.
2. **Students studying Only C Programming:**
   $|C - D| = |C| - |C \cap D| = 280 - 120 = \mathbf{160}$.
3. **Students studying Neither subject:**
   $|(C \cup D)'| = |U| - |C \cup D| = 500 - 390 = \mathbf{110}$.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Discuss Set Theory in comprehensive detail. Define Power Sets, Cartesian products, and solve a 3-set survey word problem: In a survey of 100 IT professionals, 45 use Python, 40 use Java, 38 use C++, 18 use Python & Java, 15 use Java & C++, 16 use Python & C++, and 8 use all three. Find the number of professionals using: (1) Exactly one language, (2) None of the languages.
**Comprehensive University Solution:**
### 1. Principle of Inclusion-Exclusion for 3 Sets
Let $P$ = Python, $J$ = Java, $C$ = C++.
$|U| = 100$
$|P| = 45$, $|J| = 40$, $|C| = 38$
$|P \cap J| = 18$, $|J \cap C| = 15$, $|P \cap C| = 16$
$|P \cap J \cap C| = 8$

### 2. Total professionals using at least one language ($|P \cup J \cup C|$)
$|P \cup J \cup C| = (|P| + |J| + |C|) - (|P \cap J| + |J \cap C| + |P \cap C|) + |P \cap J \cap C|$
$= (45 + 40 + 38) - (18 + 15 + 16) + 8$
$= 123 - 49 + 8 = \mathbf{82}$.

### 3. Number of professionals using None of the languages
$|(P \cup J \cup C)'| = |U| - |P \cup J \cup C| = 100 - 82 = \mathbf{18}$.

### 4. Number of professionals using Exactly One language
- Only Python: $45 - (18 - 8) - (16 - 8) - 8 = 45 - 10 - 8 - 8 = 19$.
- Only Java: $40 - (18 - 8) - (15 - 8) - 8 = 40 - 10 - 7 - 8 = 15$.
- Only C++: $38 - (16 - 8) - (15 - 8) - 8 = 38 - 8 - 7 - 8 = 15$.
Total using exactly one language = $19 + 15 + 15 = \mathbf{49}$.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-401E Unit 1, practical cardinality problems involving 2 or 3 sets and algebraic proofs of De Morgan's laws are standard 5-to-10 mark questions. Draw labeled Venn diagrams with all regional numerical values.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
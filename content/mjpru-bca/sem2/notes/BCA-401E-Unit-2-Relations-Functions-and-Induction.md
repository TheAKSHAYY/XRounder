# BCA-401E: Mathematics II
## Unit 2 Master Exam Revision Notes: Relations, Equivalence & Types of Functions
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `f271ca33-4e1e-4aea-a31e-c4d8909fd49e` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Binary Relations: Domain, Range, and Inverse of a Relation**
- [x] **Properties of Relations: Reflexive, Symmetric, Transitive, and Anti-Symmetric Relations**
- [x] **Equivalence Relations: Definition, Equivalence Classes, Partitions of Sets & Proofs**
- [x] **Partial Order Relations: Posets, Hasse Diagrams & Chain/Antichain Concepts**
- [x] **Functions: Definition as Special Relations, Domain, Co-domain, and Range**
- [x] **Types of Functions: One-to-One (Injective), Onto (Surjective), Bijective, Into Functions**
- [x] **Composition of Functions: Associativity of Composite Functions & Inverse Functions**
- [x] **Principle of Mathematical Induction: First and Second Principles with Proofs**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define a Binary Relation and state the maximum number of relations on a set with n elements.
**Model Answer:**
A binary relation $R$ from set $A$ to $B$ is any subset of the Cartesian product: $R \subseteq A \times B$. If $|A| = n$, the total number of binary relations on $A$ is $2^{n^2}$.

### Q2. [2 Marks] Define Reflexive, Symmetric, and Transitive Relations.
**Model Answer:**
- **Reflexive:** $(a, a) \in R$ for every $a \in A$.
- **Symmetric:** If $(a, b) \in R$, then $(b, a) \in R$ for all $a, b \in A$.
- **Transitive:** If $(a, b) \in R$ and $(b, c) \in R$, then $(a, c) \in R$ for all $a, b, c \in A$.

### Q3. [2 Marks] What is an Equivalence Relation?
**Model Answer:**
A relation $R$ on a set $A$ that is simultaneously **Reflexive, Symmetric, and Transitive**.

### Q4. [2 Marks] Define an Equivalence Class $[a]$ and state the Fundamental Partition Theorem.
**Model Answer:**
The equivalence class of $a$ is $[a] = \{x \in A : (x, a) \in R\}$. The Fundamental Theorem of Equivalence Relations states that an equivalence relation partitions set $A$ into mutually disjoint equivalence classes whose union equals $A$.

### Q5. [2 Marks] What is a Partial Order Relation (Poset)?
**Model Answer:**
A relation $R$ that is **Reflexive, Anti-Symmetric** (if $(a,b) \in R$ and $(b,a) \in R$, then $a = b$), and **Transitive**.

### Q6. [2 Marks] Differentiate Injective, Surjective, and Bijective functions.
**Model Answer:**
- **Injective (One-to-One):** Distinct domain elements map to distinct codomain elements: $f(x_1) = f(x_2) \implies x_1 = x_2$.
- **Surjective (Onto):** Every element in codomain has at least one pre-image in domain: $\text{Range}(f) = \text{Codomain}$.
- **Bijective:** Both Injective and Surjective (has an inverse function $f^{-1}$).

### Q7. [2 Marks] State the Principle of Mathematical Induction (PMI).
**Model Answer:**
To prove a statement $P(n)$ is true for all natural numbers $n \ge 1$:
1. **Base Case:** Prove $P(1)$ is true.
2. **Induction Step:** Assume $P(k)$ is true for arbitrary $k \ge 1$, and prove that $P(k + 1)$ must be true. Then $P(n)$ holds for all $n \in \mathbb{N}$.

### Q8. [2 Marks] State the Pigeonhole Principle with an everyday example.
**Model Answer:**
If $k + 1$ or more objects (pigeons) are placed into $k$ boxes (pigeonholes), then at least one box must contain two or more objects. Example: In any group of 13 people, at least two share a birth month.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Prove that the congruence modulo $m$ relation on the set of Integers $\mathbb{Z}$ is an Equivalence Relation:
$a \equiv b \pmod m \iff m \mid (a - b)$.
**Model Answer:**
### 1. Reflexivity
For any $a \in \mathbb{Z}$, $a - a = 0 = 0 \times m$. Since $m \mid 0$, $a \equiv a \pmod m$. Hence reflexive.

### 2. Symmetry
Assume $a \equiv b \pmod m$. Then $m \mid (a - b) \implies a - b = k m$ for some $k \in \mathbb{Z}$.
Multiplying by $-1$: $b - a = (-k)m$. Since $-k \in \mathbb{Z}$, $m \mid (b - a) \implies b \equiv a \pmod m$. Hence symmetric.

### 3. Transitivity
Assume $a \equiv b \pmod m$ and $b \equiv c \pmod m$.
Then $a - b = k_1 m$ and $b - c = k_2 m$.
Adding: $(a - b) + (b - c) = a - c = (k_1 + k_2)m$.
Since $k_1 + k_2 \in \mathbb{Z}$, $m \mid (a - c) \implies a \equiv c \pmod m$. Hence transitive.
Since it is reflexive, symmetric, and transitive, congruence modulo $m$ is an Equivalence Relation.

### Q2. [5 Marks] Prove by Mathematical Induction that for all $n \ge 1$:
$$1^2 + 2^2 + 3^2 + \dots + n^2 = \frac{n(n + 1)(2n + 1)}{6}$$.
**Model Answer:**
### 1. Base Step ($n = 1$)
LHS = $1^2 = 1$.
RHS = $\frac{1(1 + 1)(2(1) + 1)}{6} = \frac{1 \times 2 \times 3}{6} = 1$.
LHS = RHS. The base case holds.

### 2. Induction Hypothesis
Assume the formula holds for $n = k$:
$$1^2 + 2^2 + \dots + k^2 = \frac{k(k + 1)(2k + 1)}{6}$$

### 3. Induction Step (Prove for $n = k + 1$)
$$1^2 + 2^2 + \dots + k^2 + (k + 1)^2 = \frac{k(k + 1)(2k + 1)}{6} + (k + 1)^2$$
Factor out $(k + 1)$:
$$= (k + 1) \left[ \frac{k(2k + 1) + 6(k + 1)}{6} \right] = (k + 1) \left[ \frac{2k^2 + 7k + 6}{6} \right]$$
Factor quadratic $2k^2 + 7k + 6 = (k + 2)(2k + 3)$:
$$= \frac{(k + 1)(k + 2)(2k + 3)}{6} = \frac{(k + 1)((k + 1) + 1)(2(k + 1) + 1)}{6}$$
This is the formula for $n = k + 1$. By PMI, the statement holds for all $n \in \mathbb{N}$.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Explain Functions in discrete mathematics. Define Composition of Functions, Invertible Functions, and prove that if $f: A \to B$ and $g: B \to C$ are both bijections, then $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$.
**Comprehensive University Solution:**
### 1. Function Fundamentals
A function $f: A \to B$ is a rule assigning to each $a \in A$ a unique $b \in B$. It is bijective if it is both one-to-one and onto. A function is invertible if and only if it is bijective.

### 2. Composition of Functions
For $f: A \to B$ and $g: B \to C$, the composite function $g \circ f: A \to C$ is defined by:
$$(g \circ f)(x) = g(f(x)) \quad \forall x \in A$$

### 3. Proof of the Reversal Rule for Inverse Composition
To prove $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$, we must show:
1. $(f^{-1} \circ g^{-1}) \circ (g \circ f) = I_A$
2. $(g \circ f) \circ (f^{-1} \circ g^{-1}) = I_C$

By associativity of function composition:
$$(f^{-1} \circ g^{-1}) \circ (g \circ f) = f^{-1} \circ (g^{-1} \circ g) \circ f$$
Since $g^{-1} \circ g = I_B$ (Identity on B):
$$= f^{-1} \circ I_B \circ f = f^{-1} \circ f = I_A$$
Similarly:
$$(g \circ f) \circ (f^{-1} \circ g^{-1}) = g \circ (f \circ f^{-1}) \circ g^{-1} = g \circ I_B \circ g^{-1} = g \circ g^{-1} = I_C$$
Since the two-sided inverse is unique, $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-401E Unit 2, proofs of Equivalence Relations (congruence modulo m) and Mathematical Induction proofs for summation formulas are guaranteed questions. Show every algebraic factoring step cleanly.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
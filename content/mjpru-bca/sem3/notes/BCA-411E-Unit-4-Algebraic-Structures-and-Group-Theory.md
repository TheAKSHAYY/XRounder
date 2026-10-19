# BCA-411E: Discrete Mathematics
## Unit 4 Master Exam Revision Notes: Algebraic Structures & Group Theory
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `3c40208d-2d50-5404-bdb1-936bbe24f1c1` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Binary Operations: Definition on a Set, Closure Property, Commutativity, Associativity, Distributivity**
- [x] **Identity and Invertible Elements: Existence of Unique Identity Element, Inverse of an Element**
- [x] **Algebraic Structures Hierarchy: Groupoids (Closure), Semigroups (Closure + Associativity)**
- [x] **Monoids: Semigroups with Identity Element, Matrix and String Monoids**
- [x] **Groups: Definition, Four Group Axioms (Closure, Associativity, Identity, Inverses)**
- [x] **Abelian (Commutative) Groups: Definition, Examples (Integer Addition (Z, +), Real Multiplication (R*, *))**
- [x] **Finite Groups and Group Order: Order of a Group |G|, Order of an Element o(a), Group Multiplication Tables (Cayley Tables)**
- [x] **Subgroups: Definition, Necessary and Sufficient Conditions for a Subset to be a Subgroup (Two-Step and One-Step Subgroup Tests)**
- [x] **Cyclic Groups: Generator Elements, Properties of Cyclic Groups, Subgroups of Cyclic Groups**
- [x] **Cosets: Left Cosets (aH) and Right Cosets (Ha), Properties of Cosets, Partitioning of Group into Disjoint Cosets**
- [x] **Lagrange's Theorem: Statement (Order of Subgroup Divides Order of Finite Group), Proof and Corollaries**
- [x] **Normal Subgroups: Definition (gH = Hg for all g in G), Criterion for Normal Subgroups, Quotient (Factor) Groups**
- [x] **Group Homomorphisms: Definition (f(ab) = f(a)f(b)), Kernel of Homomorphism, Group Isomorphisms (Fundamental Theorem)**
- [x] **Burnside's Lemma / Theorem: Orbits, Stabilizers, Orbit-Counting Theorem for Combinatorial Symmetries**
- [x] **Applications of Group Theory to Coding: Binary Symmetric Channels, Group Codes, Generator and Parity-Check Matrices**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define an Algebraic Structure.
**Model Answer:**
An **Algebraic Structure** is a non-empty set $S$ equipped with one or more binary operations defined on it, denoted $(S, *)$.

### Q2. [2 Marks] Differentiate between a Semigroup and a Monoid.
**Model Answer:**
A **Semigroup** $(S, *)$ satisfies Closure and Associativity ($a * (b * c) = (a * b) * c$).
A **Monoid** $(M, *, e)$ is a semigroup that additionally contains an Identity Element $e$ such that $a * e = e * a = a$ for all $a \in M$.

### Q3. [2 Marks] Define a Group and an Abelian Group.
**Model Answer:**
A **Group** $(G, *)$ is an algebraic structure satisfying 4 axioms: Closure, Associativity, Identity existence, and Inverse existence ($a * a^{-1} = e$).
An **Abelian (Commutative) Group** is a group that additionally satisfies Commutativity ($a * b = b * a$ for all $a, b \in G$).

### Q4. [2 Marks] Define the Order of a Group and Order of an Element.
**Model Answer:**
The **Order of a Group ($|G|$)** is the cardinality (total number of elements) of the set $G$.
The **Order of an Element $a \in G$ ($o(a)$)** is the smallest positive integer $m$ such that $a^m = e$ (where $e$ is identity). If no such $m$ exists, $a$ has infinite order.

### Q5. [2 Marks] State Lagrange's Theorem in finite group theory.
**Model Answer:**
**Lagrange's Theorem:** If $G$ is a finite group and $H$ is a subgroup of $G$, then the order of $H$ divides the order of $G$:
$$|H| \mid |G| \quad \implies \quad \frac{|G|}{|H|} = [G : H] \quad (\text{Index of } H \text{ in } G)$$

### Q6. [2 Marks] Define a Cyclic Group and give an example.
**Model Answer:**
A group $(G, *)$ is **Cyclic** if every element in $G$ can be generated as an integral power of a single generator element $a \in G$ ($G = \langle a \rangle = \{a^n \mid n \in \mathbb{Z}\}$).
*Example:* $(\mathbb{Z}_4, +_4) = \{0, 1, 2, 3\}$ with generator $1$.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Prove that the set $G = \{1, -1, i, -i\}$ forms an Abelian Group under complex multiplication.
**Model Answer:**
### Proof: Fourth Roots of Unity Form an Abelian Group

Let $G = \{1, -1, i, -i\}$ with binary operation standard complex multiplication ($\cdot$). Note that $i^2 = -1, i^3 = -i, i^4 = 1$.

#### Constructing the Cayley Table:
| $\cdot$ | **1** | **-1** | **i** | **-i** |
| :---: | :---: | :---: | :---: | :---: |
| **1** | 1 | -1 | i | -i |
| **-1** | -1 | 1 | -i | i |
| **i** | i | -i | -1 | 1 |
| **-i** | -i | i | 1 | -1 |

#### Verification of Group Axioms:
1. **Closure:** Every entry in the table belongs to $G = \{1, -1, i, -i\}$. Hence closure holds.
2. **Associativity:** Complex multiplication is universally associative.
3. **Identity Element:** The row and column for $1$ reproduce the headers identically. Hence, **$e = 1 \in G$** is the identity element.
4. **Inverse Existence:**
   - $1^{-1} = 1$
   - $(-1)^{-1} = -1$
   - $i^{-1} = -i$ (since $i \cdot (-i) = -i^2 = 1$)
   - $(-i)^{-1} = i$
   Every element has a unique inverse in $G$.
5. **Commutativity:** The Cayley table is perfectly symmetric about its main diagonal ($a \cdot b = b \cdot a$).

$$\mathbf{Q.E.D.}$$
*(Therefore, $(G, \cdot)$ is a finite Abelian group of order 4. Furthermore, since $i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1$, it is a Cyclic group generated by $i$).*

### Q2. [5 Marks] State and prove the necessary and sufficient condition for a non-empty subset H to be a subgroup of G (One-Step Subgroup Test).
**Model Answer:**
### One-Step Subgroup Test

#### Theorem Statement:
A non-empty subset $H$ of a group $(G, *)$ is a subgroup of $G$ if and only if for all $a, b \in H$, $a * b^{-1} \in H$.

---

#### Proof:
1. **Necessary Condition ($\implies$):**  
   Assume $H$ is a subgroup of $G$.  
   Then for any $a, b \in H$: since $H$ is a group, $b^{-1} \in H$ (inverse axiom).  
   By closure in $H$, $a * b^{-1} \in H$.

2. **Sufficient Condition ($\impliedby$):**  
   Assume $H \ne \emptyset$ and $a * b^{-1} \in H$ for all $a, b \in H$.
   - **Identity Element:** Since $H \ne \emptyset$, take any $x \in H$. Setting $a = x, b = x$:
     $$e = x * x^{-1} \in H$$
   - **Inverse Element:** For any $x \in H$, set $a = e, b = x$:
     $$e * x^{-1} = x^{-1} \in H$$
   - **Closure:** For any $x, y \in H$, since $y^{-1} \in H$, set $a = x, b = y^{-1}$:
     $$a * b^{-1} = x * (y^{-1})^{-1} = x * y \in H$$
   - **Associativity:** Holds automatically since $H \subseteq G$ inherits associativity.
Thus, $H$ satisfies all 4 group axioms and is a subgroup of $G$.

### Q3. [5 Marks] Define Cosets and Normal Subgroups. Explain the construction of Quotient Groups.
**Model Answer:**
### Cosets, Normal Subgroups, and Quotient Groups

#### 1. Cosets:
Let $H$ be a subgroup of $G$ and $a \in G$.
- **Left Coset of $H$ generated by $a$:** $aH = \{a * h \mid h \in H\}$.
- **Right Coset of $H$ generated by $a$:** $Ha = \{h * a \mid h \in H\}$.
*Properties:* Cosets partition $G$ into mutually disjoint equivalence classes of equal size $|H|$.

---

#### 2. Normal Subgroup:
A subgroup $N$ of $G$ is called a **Normal Subgroup** (denoted $N \trianglelefteq G$) if its left and right cosets coincide for every element in $G$:
$$gN = Ng \quad \forall g \in G \quad (\text{or equivalently, } gng^{-1} \in N \; \forall g \in G, n \in N)$$
*(Note: In an Abelian group, EVERY subgroup is automatically normal).*

---

#### 3. Quotient (Factor) Group ($G / N$):
If $N \trianglelefteq G$, the collection of all cosets $G/N = \{gN \mid g \in G\}$ forms a group under coset multiplication:
$$(aN)(bN) = (ab)N$$
By Lagrange's Theorem, the order of the quotient group is:
$$|G/N| = \frac{|G|}{|N|}$$


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] State and prove Lagrange's Theorem for finite groups in comprehensive detail. State and prove three of its major corollaries: (1) Order of an element divides order of group, (2) Groups of prime order are cyclic, and (3) Fermat's Little Theorem.
**Comprehensive University Solution:**
### Comprehensive Proof of Lagrange's Theorem and Its Corollaries

---

### Theorem Statement:
If $G$ is a finite group and $H$ is a subgroup of $G$, then the order of $H$ divides the order of $G$ ($|H| \mid |G|$).

---

### Proof:
Let $|G| = n$ and $|H| = m$. Let $H = \{h_1, h_2, \dots, h_m\}$.

#### Step 1: Cardinality of Left Cosets
For any $a \in G$, the left coset is $aH = \{ah_1, ah_2, \dots, ah_m\}$.  
Suppose $ah_i = ah_j$. By left cancellation in $G$, $h_i = h_j$.  
Hence, all $m$ elements in $aH$ are distinct. Thus:
$$|aH| = |H| = m \quad \text{for every } a \in G$$

#### Step 2: Cosets Form a Partition of $G$
1. **Exhaustive Union:** For any $x \in G$, $x = x \cdot e \in xH$. Therefore:
   $$\bigcup_{a \in G} aH = G$$
2. **Disjointness:** Any two left cosets $aH$ and $bH$ are either identical or completely disjoint.  
   *(Proof: If $aH \cap bH \ne \emptyset$, let $c \in aH \cap bH$. Then $c = ah_1 = bh_2 \implies a = bh_2 h_1^{-1} \in bH \implies aH = bH$).*

#### Step 3: Counting the Elements
Since $G$ is finite, it is partitioned into a finite number $k$ of mutually disjoint left cosets:
$$G = a_1 H \cup a_2 H \cup \dots \cup a_k H$$
$$|G| = |a_1 H| + |a_2 H| + \dots + |a_k H|$$
$$n = m + m + \dots + m = k \cdot m$$
$$|G| = k \cdot |H| \implies \frac{|G|}{|H|} = k = [G : H]$$
Therefore, **$|H|$ divides $|G|$**. $\mathbf{Q.E.D.}$

---

### Corollaries of Lagrange's Theorem:

#### Corollary 1: Order of any element divides group order
- Let $a \in G$. The cyclic subgroup generated by $a$, $H = \langle a \rangle$, has order equal to the order of $a$ ($|H| = o(a)$).
- By Lagrange's Theorem, $|H| \mid |G|$. Hence:
  $$\mathbf{o(a) \mid |G|}$$
- Consequently, $a^{|G|} = e$ for every $a \in G$.

#### Corollary 2: Every group of prime order is Cyclic and Abelian
- Let $|G| = p$ (where $p$ is a prime number: 2, 3, 5, 7, 11...).
- Choose any element $a \in G$ with $a \ne e$.
- Then $o(a) > 1$. By Corollary 1, $o(a) \mid p$.
- Since $p$ is prime, the only divisors of $p$ are 1 and $p$. Hence, $o(a) = p$.
- Therefore, $\langle a \rangle$ has $p$ elements, meaning $\langle a \rangle = G$.
- **Thus, $G$ is cyclic, and every cyclic group is Abelian!**

#### Corollary 3: Fermat's Little Theorem
- In the multiplicative group of integers modulo prime $p$, $G = (\mathbb{Z}_p^*, \cdot_p) = \{1, 2, \dots, p-1\}$, the order is $|G| = p - 1$.
- For any integer $a$ not divisible by $p$, $(a \bmod p) \in G$.
- By Corollary 1: $a^{|G|} \equiv 1 \pmod p \implies \mathbf{a^{p-1} \equiv 1 \pmod p}$.

### Q2. [10/15 Marks] Explain Group Codes in Coding Theory: Generation of Parity-Check Matrices, Encoding, and Syndrome Decoding with an example for an (n, k) block code.
**Comprehensive University Solution:**
### Group Codes in Algebraic Coding Theory

Coding theory utilizes vector spaces over Galois Field $GF(2) = \{0, 1\}$ to detect and correct transmission errors across noisy binary symmetric channels.

```
Message m (k bits) ---> [ Generator Matrix G (k x n) ] ---> Codeword c = mG (n bits)
                                                                     |
                                                          (Noisy Channel e)
                                                                     v
                                                            Received Vector r = c + e
                                                                     |
                                                                     v
 Syndrome S = r * H^T <--- [ Parity Check Matrix H ((n-k) x n) ] <---+
```

---

### 1. Parity Check Matrix ($H$) and Generator Matrix ($G$)
For an $(n, k)$ linear block code (where $k$ data bits are encoded into $n$ code bits):
- **Generator Matrix:** $G = [I_k \mid P]$, where $I_k$ is $k \times k$ identity and $P$ is $k \times (n - k)$ parity matrix.
- **Parity Check Matrix:** $H = [P^T \mid I_{n-k}]$.
- **Fundamental Orthogonality Property:**
  $$G \cdot H^T = 0 \pmod 2$$

---

### 2. Encoding and Syndrome Decoding Example for $(6, 3)$ Code:
Let parity matrix $P$ be:
$$P = \begin{pmatrix} 1 & 1 & 0 \\ 0 & 1 & 1 \\ 1 & 0 & 1 \end{pmatrix}$$
Then Generator Matrix $G$ ($3 \times 6$):
$$G = \begin{pmatrix} 1 & 0 & 0 & 1 & 1 & 0 \\ 0 & 1 & 0 & 0 & 1 & 1 \\ 0 & 0 & 1 & 1 & 0 & 1 \end{pmatrix}$$

- **Encoding:** To transmit message $m = (1, 1, 0)$:
  $$c = m \cdot G = (1, 0, 0, 1, 1, 0) \oplus (0, 1, 0, 0, 1, 1) = \mathbf{(1, 1, 0, 1, 0, 1)}$$

- **Syndrome Decoding:**
  If received word $r = c + e$, receiver computes **Syndrome**:
  $$S = r \cdot H^T = (c + e) H^T = c H^T + e H^T = 0 + e H^T = \mathbf{e H^T}$$
  If $S = 0$, no transmission error occurred. If $S \ne 0$, matching $S$ to columns of $H^T$ locates the exact corrupted bit for instantaneous 1-bit error correction!


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
### Examiner Insights & University Exam Strategy:
1. **Guaranteed 10/15-Mark Question:** The proof of Lagrange's Theorem ($|H| \mid |G|$) and its corollaries (especially that groups of prime order are cyclic) is a guaranteed top-tier question on every MJPRU Discrete Mathematics exam.
2. **Cayley Table Verification:** Practice drawing the 4x4 Cayley table for $\{1, -1, i, -i\}$ or $(\mathbb{Z}_4, +_4)$ to prove group properties.
3. **One-Step Subgroup Test:** Write the two-way proof for $a * b^{-1} \in H$ with clear section headers.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
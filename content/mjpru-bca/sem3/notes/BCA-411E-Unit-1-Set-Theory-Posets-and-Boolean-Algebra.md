# BCA-411E: Discrete Mathematics
## Unit 1 Master Exam Revision Notes: Set Theory, Posets, Lattices & Boolean Algebra
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `64ceb1cb-1e27-503e-abd6-757dd220abf4` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Sets and Elements: Set Notations, Universal Set, Empty (Null) Set, Singleton Sets, Subsets and Supersets**
- [x] **Set Operations: Union, Intersection, Difference, Symmetric Difference, Absolute and Relative Complements**
- [x] **Venn Diagrams and Visual Set Representations: Modeling Multi-Set Relationships**
- [x] **Laws of Set Algebra: Idempotent, Associative, Commutative, Distributive, Identity, De Morgan's Laws**
- [x] **Principle of Duality in Set Theory and Boolean Structures**
- [x] **Partially Ordered Sets (Posets): Partial Order Relation (Reflexive, Anti-Symmetric, Transitive)**
- [x] **Hasse Diagrams: Visualizing Posets, Construction Rules, Covering Relations**
- [x] **Extremal Elements in Posets: Maximal, Minimal, Greatest (Maximum), and Least (Minimum) Elements**
- [x] **Bounds in Posets: Upper Bounds, Lower Bounds, Least Upper Bound (LUB / Supremum / Join), Greatest Lower Bound (GLB / Infimum / Meet)**
- [x] **Lattices as Algebraic Systems: Definition as Poset where every Pair has LUB and GLB (a v b, a ^ b)**
- [x] **Properties of Lattices: Idempotency, Commutativity, Associativity, Absorption Laws**
- [x] **Special Lattices: Distributive Lattices, Complemented Lattices, Bounded Lattices**
- [x] **Boolean Algebra Foundations: Definition as a Complemented Distributive Lattice (B, +, *, ', 0, 1)**
- [x] **Uniqueness of Finite Boolean Algebras: Isomorphism to Power Set Boolean Algebra (Cardinality 2^n)**
- [x] **Boolean Functions & Boolean Expressions: Truth Values, Sum-of-Products (SOP), Product-of-Sums (POS) Normal Forms**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define a Set and distinguish between Subset and Proper Subset.
**Model Answer:**
A **Set** is a well-defined collection of distinct objects.
$A$ is a **Subset** of $B$ ($A \subseteq B$) if every element in $A$ also belongs to $B$.
$A$ is a **Proper Subset** of $B$ ($A \subset B$) if $A \subseteq B$ and $A \ne B$ (i.e., there exists at least one element $x \in B$ such that $x \notin A$).

### Q2. [2 Marks] State De Morgan's Laws of Set Algebra.
**Model Answer:**
For any two sets $A$ and $B$ under a universal set $U$:
1. $(A \cup B)' = A' \cap B'$
2. $(A \cap B)' = A' \cup B'$
*(The complement of a union is the intersection of the complements, and vice versa).* 

### Q3. [2 Marks] Define a Partially Ordered Set (Poset).
**Model Answer:**
A relation $R$ on a set $A$ is a **Partial Order** if it satisfies three axioms:
1. **Reflexivity:** $a R a$ for all $a \in A$.
2. **Anti-symmetry:** If $a R b$ and $b R a$, then $a = b$.
3. **Transitivity:** If $a R b$ and $b R c$, then $a R c$.
A set $A$ together with a partial order relation $R$, denoted $(A, R)$ or $(A, \le)$, is called a **Poset**.

### Q4. [2 Marks] What is a Hasse Diagram? State its construction conventions.
**Model Answer:**
A **Hasse Diagram** is a simplified graphical representation of a finite poset where:
1. Elements are drawn as vertices.
2. If $a < b$, vertex $b$ is drawn higher than vertex $a$.
3. An edge connects $a$ to $b$ iff $b$ **covers** $a$ (i.e., $a < b$ and no $c$ exists such that $a < c < b$).
4. Self-loops (reflexivity) and transitive shortcut edges are omitted.

### Q5. [2 Marks] Define a Lattice as an algebraic structure.
**Model Answer:**
A poset $(L, \le)$ is called a **Lattice** if for every pair of elements $a, b \in L$, their Least Upper Bound (LUB / Join, denoted $a \lor b$) and Greatest Lower Bound (GLB / Meet, denoted $a \land b$) exist in $L$.

### Q6. [2 Marks] What is a Boolean Algebra?
**Model Answer:**
A **Boolean Algebra** is an algebraic structure $(B, +, \cdot, ', 0, 1)$ consisting of a set $B$ with two binary operations $+$ (Join) and $\cdot$ (Meet), one unary operation $'$ (Complement), and two special elements $0$ (least) and $1$ (greatest) that forms a **bounded, distributive, and complemented lattice**.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Draw the Hasse Diagram for the divisibility poset $(D_{30}, \mid)$, where $D_{30} = \{1, 2, 3, 5, 6, 10, 15, 30\}$. Identify its maximal, minimal, greatest, and least elements.
**Model Answer:**
### Hasse Diagram for $(D_{30}, \mid)$

The set of divisors of 30 is $D_{30} = \{1, 2, 3, 5, 6, 10, 15, 30\}$. The partial ordering is divisibility ($a \mid b$).

```
                       30  (Greatest / Maximal)
                     /  |  \
                   /    |    \
                 6     10     15
               /  \   /  \   /  \
              /    \ /    \ /    \
             2      3      5
              \     |     /
               \    |    /
                 \  |  /
                    1  (Least / Minimal)
```

#### Element Analysis:
1. **Covering Relations:**
   - 1 is covered by 2, 3, and 5.
   - 2 covers into 6 and 10; 3 covers into 6 and 15; 5 covers into 10 and 15.
   - 6, 10, and 15 are covered by 30.
2. **Extremal Elements:**
   - **Minimal Element:** $1$ (no element divides 1 except itself).
   - **Maximal Element:** $30$ (divides no element except itself).
   - **Least Element (Zero element $0$):** $1$, since $1 \mid x$ for all $x \in D_{30}$.
   - **Greatest Element (Unit element $1$):** $30$, since $x \mid 30$ for all $x \in D_{30}$.

### Q2. [5 Marks] State and prove the Absorption Laws in a Lattice $(L, \le)$.
**Model Answer:**
### Absorption Laws in a Lattice

#### Statement:
In any lattice $(L, \le)$, for any $a, b \in L$:
1. $a \lor (a \land b) = a$
2. $a \land (a \lor b) = a$

---

#### Proof of Part 1: $a \lor (a \land b) = a$
By definition of Greatest Lower Bound (GLB / Meet):
$$(a \land b) \le a$$
Also, by reflexivity of partial order:
$$a \le a$$
Now, $a \lor (a \land b)$ is the Least Upper Bound (LUB) of the elements $a$ and $(a \land b)$.
Since both $a \le a$ and $(a \land b) \le a$, $a$ is an **upper bound** of $a$ and $(a \land b)$.
By definition of LUB (which is the smallest upper bound):
$$a \lor (a \land b) \le a \quad \text{--- (Equation 1)}$$

Furthermore, by definition of Join ($x \lor y$):
$$a \le a \lor (a \land b) \quad \text{--- (Equation 2)}$$

From (Equation 1) and (Equation 2), by anti-symmetry of partial orders:
$$\mathbf{a \lor (a \land b) = a}$$

*(The proof for $a \land (a \lor b) = a$ follows by exact mathematical duality).*

### Q3. [5 Marks] Differentiate between Distributive and Complemented Lattices with examples.
**Model Answer:**
### Distributive vs Complemented Lattices

| Dimension | Distributive Lattice | Complemented Lattice |
| :--- | :--- | :--- |
| **Axiomatic Definition** | Meets and Joins distribute over each other: <br>$a \land (b \lor c) = (a \land b) \lor (a \land c)$ <br>$a \lor (b \land c) = (a \lor b) \land (a \lor c)$ | In a bounded lattice $(L, \land, \lor, 0, 1)$, every element $a \in L$ has at least one complement $a'$ such that: <br>$a \lor a' = 1$ and $a \land a' = 0$. |
| **Uniqueness of Complements** | If complements exist, they are **strictly unique**. | Complements may not be unique (an element can have multiple complements). |
| **Non-Distributive Counter-Examples** | The Diamond Lattice $M_3$ and the Pentagon Lattice $N_5$. | A lattice where some elements lack a complementary partner (e.g., chains of length $\ge 3$). |
| **Combined Structure** | A lattice that is **both** distributive and complemented is a **Boolean Algebra**. |


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] State and prove that any finite Boolean algebra is isomorphic to the power set Boolean algebra of some finite set. What is the fundamental constraint on the number of elements in any finite Boolean algebra? Explain with an example for n=3.
**Comprehensive University Solution:**
### Stone's Representation Theorem for Finite Boolean Algebras

---

### Part 1: Cardinality Constraint
A fundamental theorem of discrete mathematics states:  
**Every finite Boolean algebra $(B, +, \cdot, ', 0, 1)$ has exactly $2^n$ elements for some non-negative integer $n \in \mathbb{N}$:**
$$|B| = 2^n$$
*(A Boolean algebra can NEVER have 3, 5, 6, 7, 10, or 12 elements. It must be a power of 2: 1, 2, 4, 8, 16, 32, ...).*

---

### Part 2: Definition of Atoms and Isomorphism
Let $B$ be a finite Boolean algebra. An element $a \in B$ is called an **Atom** if:
1. $a \ne 0$
2. For every $x \in B$, $x \le a \implies x = 0$ or $x = a$ (i.e., $a$ covers the zero element $0$).

Let $A = \{a_1, a_2, \dots, a_n\}$ be the set of all atoms of $B$. There are exactly $n$ atoms.

#### Representation Theorem:
Every element $x \in B$ can be uniquely expressed as the join (sum) of a subset of atoms:
$$x = a_{i_1} \lor a_{i_2} \lor \dots \lor a_{i_k}$$

Define the mapping $f: B \to \mathcal{P}(A)$ by:
$$f(x) = \{a \in A \mid a \le x\}$$

#### Proof of Isomorphism:
1. **Injective (One-to-One):** By the unique atom factorization property, if $f(x) = f(y)$, the set of atoms under $x$ equals the set under $y$, hence $x = \bigvee f(x) = \bigvee f(y) = y$.
2. **Surjective (Onto):** For any subset of atoms $S \subseteq A$, the join $\bigvee_{a \in S} a$ is an element of $B$ mapping precisely to $S$.
3. **Preserves Operations:**
   - $f(x \lor y) = f(x) \cup f(y)$
   - $f(x \land y) = f(x) \cap f(y)$
   - $f(x') = (f(x))^c$
Thus, $(B, \lor, \land, ', 0, 1) \cong (\mathcal{P}(A), \cup, \cap, ^c, \emptyset, A)$.

---

### Part 3: Example for $n = 3$ ($|B| = 2^3 = 8$)
Consider $D_{30} = \{1, 2, 3, 5, 6, 10, 15, 30\}$ under divisibility.
- Zero element: $0_B = 1$
- Unit element: $1_B = 30$
- Atoms (elements covering 1): $\text{Atoms} = \{2, 3, 5\}$ ($n = 3$ atoms).
- Isomorphic to the power set $\mathcal{P}(\{x, y, z\})$:
  - $1 \leftrightarrow \emptyset$
  - $2 \leftrightarrow \{x\}, 3 \leftrightarrow \{y\}, 5 \leftrightarrow \{z\}$
  - $6 = 2 \times 3 \leftrightarrow \{x, y\}$
  - $10 = 2 \times 5 \leftrightarrow \{x, z\}$
  - $15 = 3 \times 5 \leftrightarrow \{y, z\}$
  - $30 = 2 \times 3 \times 5 \leftrightarrow \{x, y, z\}$

### Q2. [10/15 Marks] Explain Sum-of-Products (SOP) and Product-of-Sums (POS) Boolean expressions. Given the Boolean function $f(x, y, z) = (x + y)(x' + z)$, express it in: (1) Canonical SOP form (Minterms), and (2) Canonical POS form (Maxterms).
**Comprehensive University Solution:**
### Canonical SOP and POS Representations

#### Definitions:
- **Minterm ($m_i$):** A product of literals in which each variable appears exactly once (in either complemented or uncomplemented form).
- **Maxterm ($M_i$):** A sum of literals in which each variable appears exactly once.
- **Canonical SOP:** Disjunction (sum) of all minterms where the function evaluates to `1`.
- **Canonical POS:** Conjunction (product) of all maxterms where the function evaluates to `0`.

---

### Step-by-Step Problem Solution: $f(x, y, z) = (x + y)(x' + z)$

#### Truth Table Evaluation:
| $x$ | $y$ | $z$ | $x+y$ | $x'+z$ | $f = (x+y)(x'+z)$ | Minterm / Maxterm |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | 0 | 0 | 1 | **0** | Maxterm $M_0$ ($x + y + z$) |
| 0 | 0 | 1 | 0 | 1 | **0** | Maxterm $M_1$ ($x + y + z'$) |
| 0 | 1 | 0 | 1 | 1 | **1** | Minterm $m_2$ ($x' y z'$) |
| 0 | 1 | 1 | 1 | 1 | **1** | Minterm $m_3$ ($x' y z$) |
| 1 | 0 | 0 | 1 | 0 | **0** | Maxterm $M_4$ ($x' + y + z$) |
| 1 | 0 | 1 | 1 | 1 | **1** | Minterm $m_5$ ($x y' z$) |
| 1 | 1 | 0 | 1 | 0 | **0** | Maxterm $M_6$ ($x' + y' + z$) |
| 1 | 1 | 1 | 1 | 1 | **1** | Minterm $m_7$ ($x y z$) |

---

### (1) Canonical SOP Form (Minterms):
Function is 1 for rows $2, 3, 5, 7$:
$$f(x, y, z) = \sum m(2, 3, 5, 7) = x'yz' + x'yz + xy'z + xyz$$

### (2) Canonical POS Form (Maxterms):
Function is 0 for rows $0, 1, 4, 6$:
$$f(x, y, z) = \prod M(0, 1, 4, 6) = (x + y + z)(x + y + z')(x' + y + z)(x' + y' + z)$$


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
### Examiner Insights & University Exam Strategy:
1. **Guaranteed Hasse Diagram:** Drawing the Hasse diagram for $(D_n, \mid)$ (especially $D_{24}, D_{30}, D_{36}$) is a favorite 5-mark question. Always list maximal, minimal, greatest, and least elements.
2. **Boolean Algebra Cardinality:** Remember that finite Boolean algebras always have $2^n$ elements; if a university question asks "Can a Boolean algebra have 6 elements?", explain why not using atom isomorphism.
3. **Canonical SOP/POS:** Practice converting truth tables into minterms $\sum m$ and maxterms $\prod M$ systematically.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
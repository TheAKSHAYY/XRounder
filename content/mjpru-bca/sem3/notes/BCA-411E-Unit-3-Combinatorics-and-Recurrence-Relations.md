# BCA-411E: Discrete Mathematics
## Unit 3 Master Exam Revision Notes: Combinatorics, Recurrence Relations & Binomial Theorem
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `94294521-6157-5d4f-9937-0600e47a0186` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Fundamental Principles of Counting: Addition Principle (Rule of Sum) and Multiplication Principle (Rule of Product)**
- [x] **Factorial Notation: n!, Properties, Recursive Definition 0! = 1**
- [x] **Permutations: Linear Permutations of n Distinct Objects, Formulas P(n, r) = n! / (n - r)!**
- [x] **Permutations with Repetition: Objects Not All Distinct (n! / (n1! * n2! * ... * nk!))**
- [x] **Circular Permutations: Arrangements in a Circle ((n - 1)! for Distinct Sense, (n - 1)! / 2 for Reversible)**
- [x] **Combinations: Selection without Regard to Order, Formula C(n, r) = n! / (r! * (n - r)!)**
- [x] **Combinatorial Identities: Symmetry Identity C(n, r) = C(n, n-r), Pascal's Identity C(n, r) + C(n, r-1) = C(n+1, r)**
- [x] **Binomial Theorem for Positive Integral Index: Statement, Expansion Formula, Pascal's Triangle Geometry**
- [x] **Key Terms in Binomial Expansions: General (r+1)th Term Formula T_{r+1} = nCr * a^(n-r) * b^r**
- [x] **Determination of Middle Term(s) in Binomial Expansion (n is Even vs n is Odd)**
- [x] **Term Independent of Variable (Constant Term) and Finding Specific Coefficients in Expansions**
- [x] **Pigeonhole Principle: Basic Statement, Generalized Pigeonhole Principle, Applications to Discrete Sets**
- [x] **Recurrence Relations: First-Order and Second-Order Linear Homogeneous Recurrence Relations with Constant Coefficients**
- [x] **Solving Recurrence Relations: Characteristic Equation Method, Fibonacci Sequence Closed-Form Derivation**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] State the Rule of Sum and Rule of Product in Combinatorics.
**Model Answer:**
**Rule of Sum (Addition Principle):** If task $A$ can be done in $m$ ways and task $B$ in $n$ ways, and they are mutually exclusive, then doing either task $A$ or task $B$ can be done in **$m + n$** ways.
**Rule of Product (Multiplication Principle):** If a procedure can be broken down into two successive stages, where stage 1 has $m$ outcomes and stage 2 has $n$ outcomes, then the total procedure has **$m \times n$** outcomes.

### Q2. [2 Marks] Define Permutations and Combinations with formulas.
**Model Answer:**
**Permutation:** An ordered arrangement of $r$ objects chosen from $n$ distinct objects:
$$P(n, r) = \frac{n!}{(n - r)!}$$
**Combination:** An unordered selection of $r$ objects chosen from $n$ distinct objects:
$$C(n, r) = \binom{n}{r} = \frac{n!}{r!(n - r)!}$$

### Q3. [2 Marks] State Pascal's Identity for combinations.
**Model Answer:**
For integers $n, r$ with $1 \le r \le n$:
$$\binom{n}{r} + \binom{n}{r - 1} = \binom{n + 1}{r}$$

### Q4. [2 Marks] State the Binomial Theorem for a positive integral index n.
**Model Answer:**
$$(a + b)^n = \sum_{r=0}^n \binom{n}{r} a^{n-r} b^r = \binom{n}{0}a^n + \binom{n}{1}a^{n-1}b + \dots + \binom{n}{n}b^n$$

### Q5. [2 Marks] State the Pigeonhole Principle (PHP).
**Model Answer:**
**Basic PHP:** If $n$ pigeonholes are occupied by $n + 1$ or more pigeons, then at least one pigeonhole must contain two or more pigeons.
**Generalized PHP:** If $N$ objects are placed into $k$ boxes, then at least one box must contain at least $\lceil N / k \rceil$ objects.

### Q6. [2 Marks] What is a Second-Order Linear Homogeneous Recurrence Relation with Constant Coefficients?
**Model Answer:**
An equation of the form:
$$a_n + c_1 a_{n-1} + c_2 a_{n-2} = 0 \quad (c_2 \ne 0)$$
where $c_1, c_2$ are real constants and the highest subscript minus lowest subscript equals 2.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Find the coefficient of $x^7$ in the binomial expansion of $(x^2 + 1/x)^{11}$.
**Model Answer:**
### Finding Specific Coefficient in Binomial Expansion

#### Step 1: Write General $(r+1)$-th Term Formula
For $(a + b)^n$, $T_{r+1} = \binom{n}{r} a^{n-r} b^r$.  
Here $a = x^2, b = x^{-1}, n = 11$:
$$T_{r+1} = \binom{11}{r} (x^2)^{11-r} (x^{-1})^r = \binom{11}{r} x^{22 - 2r} x^{-r} = \binom{11}{r} x^{22 - 3r}$$

#### Step 2: Equate Power of $x$ to 7
$$22 - 3r = 7 \implies 3r = 15 \implies \mathbf{r = 5}$$

#### Step 3: Compute the Coefficient
$$\text{Coefficient} = \binom{11}{5} = \frac{11 \times 10 \times 9 \times 8 \times 7}{5 \times 4 \times 3 \times 2 \times 1} = 11 \times 3 \times 2 \times 7 = \mathbf{462}$$
*(Thus, the term is $462 x^7$ and the required coefficient is $462$).*

### Q2. [5 Marks] Solve a real-world problem using the Pigeonhole Principle: Show that among any 13 people, at least two must be born in the same month.
**Model Answer:**
### Pigeonhole Principle Proof

#### System Assignment:
- **Pigeons:** $N = 13$ people.
- **Pigeonholes:** $k = 12$ months of the year (January through December).
- **Mapping:** Each person is placed into the pigeonhole corresponding to their birth month.

#### Application of Generalized PHP:
According to the Pigeonhole Principle, at least one month must contain at least:
$$\left\lceil \frac{N}{k} \right\rceil = \left\lceil \frac{13}{12} \right\rceil = \lceil 1.083 \rceil = \mathbf{2\text{ people}}$$

$$\mathbf{Q.E.D.}$$
*(Therefore, among any 13 individuals, at least two must share a common birth month).*

### Q3. [5 Marks] Explain the Characteristic Equation Method for solving Linear Homogeneous Recurrence Relations.
**Model Answer:**
### Characteristic Equation Method

Consider $a_n + c_1 a_{n-1} + c_2 a_{n-2} = 0$.

#### Step 1: Form Characteristic Equation
Substitute trial solution $a_n = r^n$:
$$r^2 + c_1 r + c_2 = 0$$

#### Step 2: Find Characteristic Roots $r_1, r_2$
- **Case 1: Distinct Real Roots ($r_1 \ne r_2$):**
  $$a_n = C_1 r_1^n + C_2 r_2^n$$
- **Case 2: Equal Real Roots ($r_1 = r_2 = r$):**
  $$a_n = (C_1 + C_2 n) r^n$$
- **Case 3: Complex Conjugate Roots ($r = \alpha \pm i\beta = \rho e^{\pm i\theta}$):**
  $$a_n = \rho^n (C_1 \cos n\theta + C_2 \sin n\theta)$$

#### Step 3: Determine Constants
Constants $C_1, C_2$ are evaluated using initial boundary conditions (e.g., $a_0, a_1$).


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Solve the recurrence relation: $a_n - 7a_{n-1} + 12a_{n-2} = 0$ for $n \ge 2$ with initial conditions $a_0 = 2$ and $a_1 = 7$. Also, solve the Fibonacci sequence recurrence $F_n = F_{n-1} + F_{n-2}$ with $F_0 = 0, F_1 = 1$.
**Comprehensive University Solution:**
### Step-by-Step Solution of Recurrence Relations

---

### Part 1: Solving $a_n - 7a_{n-1} + 12a_{n-2} = 0$

#### Step 1: Characteristic Equation
$$r^2 - 7r + 12 = 0$$
$$(r - 3)(r - 4) = 0 \implies r_1 = 3, \; r_2 = 4$$

#### Step 2: General Solution Form (Distinct Real Roots)
$$a_n = C_1 (3)^n + C_2 (4)^n$$

#### Step 3: Apply Initial Conditions
1. For $n = 0$:
   $$a_0 = C_1 (1) + C_2 (1) = 2 \implies C_1 + C_2 = 2$$
2. For $n = 1$:
   $$a_1 = C_1 (3) + C_2 (4) = 7 \implies 3C_1 + 4C_2 = 7$$

Multiply first equation by 3: $3C_1 + 3C_2 = 6$.  
Subtract from second: $(3C_1 + 4C_2) - (3C_1 + 3C_2) = 7 - 6 \implies \mathbf{C_2 = 1}$.  
Then $C_1 = 2 - 1 = \mathbf{1}$.

#### Final Explicit Solution:
$$\mathbf{a_n = 3^n + 4^n}$$
*(Verification: $a_0 = 1+1=2, a_1 = 3+4=7, a_2 = 9+16=25$. From recurrence: $a_2 = 7(7) - 12(2) = 49 - 24 = 25$. Correct!).*

---

### Part 2: Closed-Form Derivation of Fibonacci Sequence ($F_n = F_{n-1} + F_{n-2}$)

#### Step 1: Characteristic Equation
$$r^2 - r - 1 = 0$$
Using quadratic formula:
$$r = \frac{1 \pm \sqrt{1 - 4(1)(-1)}}{2} = \frac{1 \pm \sqrt{5}}{2}$$
Let $\phi = \frac{1 + \sqrt{5}}{2}$ (Golden Ratio) and $\hat{\phi} = \frac{1 - \sqrt{5}}{2}$.

#### Step 2: General Solution
$$F_n = C_1 \left( \frac{1 + \sqrt{5}}{2} \right)^n + C_2 \left( \frac{1 - \sqrt{5}}{2} \right)^n$$

#### Step 3: Apply $F_0 = 0, F_1 = 1$
1. $F_0 = C_1 + C_2 = 0 \implies C_2 = -C_1$
2. $F_1 = C_1 \phi + C_2 \hat{\phi} = C_1 (\phi - \hat{\phi}) = 1$
   $$\phi - \hat{\phi} = \frac{1+\sqrt{5}}{2} - \frac{1-\sqrt{5}}{2} = \sqrt{5}$$
   $$C_1 = \frac{1}{\sqrt{5}}, \quad C_2 = -\frac{1}{\sqrt{5}}$$

#### Binet's Formula (Final Closed Form):
$$\mathbf{F_n = \frac{1}{\sqrt{5}} \left[ \left( \frac{1 + \sqrt{5}}{2} \right)^n - \left( \frac{1 - \sqrt{5}}{2} \right)^n \right]}$$

### Q2. [10/15 Marks] Critically evaluate Permutations with Repetitions, Circular Permutations, and Combinatorial Identities. Solve: (1) In how many ways can the letters of the word 'MISSISSIPPI' be arranged? (2) In how many ways can 6 people be seated around a round table?
**Comprehensive University Solution:**
### Permutations and Combinatorics Problems

---

### Part 1: Permutations with Repetition
If a collection has $n$ total objects where object 1 repeats $n_1$ times, object 2 repeats $n_2$ times, $\dots$, object $k$ repeats $n_k$ times:
$$\text{Total Distinct Arrangements} = \frac{n!}{n_1! \cdot n_2! \cdot \dots \cdot n_k!}$$

#### Solving 'MISSISSIPPI':
- Total letters $n = 11$.
- Letter frequencies:
  - M = 1
  - I = 4
  - S = 4
  - P = 2
- Total distinct arrangements:
  $$\text{Ways} = \frac{11!}{1! \cdot 4! \cdot 4! \cdot 2!} = \frac{39,916,800}{1 \times 24 \times 24 \times 2} = \frac{39,916,800}{1152} = \mathbf{34,650}$$

---

### Part 2: Circular Permutations
The number of ways to arrange $n$ distinct persons in a circle where clockwise and counterclockwise orders are distinct is:
$$P_{\text{circ}} = (n - 1)!$$
*(One person is fixed to eliminate rotational equivalence).*

#### Solving for 6 people around a round table:
$$\text{Ways} = (6 - 1)! = 5! = 5 \times 4 \times 3 \times 2 \times 1 = \mathbf{120\text{ ways}}$$
*(If the arrangement were a necklace/keyring where flipping is permitted, it would be $\frac{(n-1)!}{2} = 60$).*


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
### Examiner Insights & University Exam Strategy:
1. **Guaranteed 10/15-Mark Recurrence Relation:** Solving a second-order linear homogeneous recurrence relation (like $a_n - 7a_{n-1} + 12a_{n-2} = 0$) or deriving Fibonacci's Binet formula is almost certain.
2. **Binomial Expansions:** Practice finding the middle term or term independent of $x$ using $T_{r+1} = \binom{n}{r} a^{n-r} b^r$.
3. **Pigeonhole Principle:** Write the mathematical statement $\lceil N/k \rceil$ and identify clearly what constitutes pigeons vs pigeonholes.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
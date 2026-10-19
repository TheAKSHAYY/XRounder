# BCA-105N: Basic Mathematics
## Unit 2 Master Exam Revision Notes: Sequences, Series & Progressions (AP, GP, HP, AM, GM, HM)
**Target Examination:** MJPRU Bareilly BCA Semester 1 (CBCS Pattern 2024–25)
**Unit Identifier:** `17b2f4f2-9228-4f4f-8f81-09bc7aac93af` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Sequences & Series: Definition of Sequence, Finite vs Infinite Sequences, Series & Summation Notation**
- [x] **Arithmetic Progression (AP): First Term (a), Common Difference (d), General Form of an AP**
- [x] **nth Term of an AP: Derivation of T_n = a + (n - 1)d & nth Term from the End**
- [x] **Sum of n Terms of an AP: Derivation of S_n = (n/2)[2a + (n-1)d] = (n/2)[a + l]**
- [x] **Arithmetic Mean (AM): Single Arithmetic Mean between Two Numbers, Insertion of n Arithmetic Means**
- [x] **Properties of AP: Linear Transformations, Addition/Subtraction of Constants**
- [x] **Geometric Progression (GP): First Term (a), Common Ratio (r), General Form of a GP**
- [x] **nth Term of a GP: Derivation of T_n = a * r^(n-1)**
- [x] **Sum of n Terms of a GP: S_n = a(1 - r^n)/(1 - r) for r < 1 and a(r^n - 1)/(r - 1) for r > 1**
- [x] **Sum of an Infinite GP: S_infinity = a / (1 - r) for |r| < 1**
- [x] **Geometric Mean (GM): Single GM between Two Numbers, Insertion of n Geometric Means**
- [x] **Harmonic Progression (HP): Definition, Relation to AP, nth Term of HP, Harmonic Mean (HM)**
- [x] **Interrelationships Between Means: Proof that AM >= GM >= HM & G^2 = A * H for Two Positive Numbers**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define Arithmetic Progression (AP) and state the formula for its $n^{\text{th}}$ term.
**Model Answer:**
An AP is a sequence where each term after the first is formed by adding a fixed constant $d$ (common difference) to the preceding term. Formula: $T_n = a + (n - 1)d$.

### Q2. [2 Marks] State the formula for the sum of the first $n$ terms of an AP.
**Model Answer:**
$$S_n = \frac{n}{2}[2a + (n - 1)d] = \frac{n}{2}[a + l]$$ where $l$ is the last term.

### Q3. [2 Marks] What is the single Arithmetic Mean (AM) between two numbers $a$ and $b$?
**Model Answer:**
$$\text{AM} = \frac{a + b}{2}$$

### Q4. [2 Marks] Define Geometric Progression (GP) and state the formula for its $n^{\text{th}}$ term.
**Model Answer:**
A GP is a sequence where the ratio of any term to its preceding term is a constant $r$ (common ratio). Formula: $T_n = a r^{n-1}$.

### Q5. [2 Marks] State the formula for the sum of an Infinite GP.
**Model Answer:**
$$S_\infty = \frac{a}{1 - r} \quad \text{valid strictly when } |r| < 1$$

### Q6. [2 Marks] What is the Geometric Mean (GM) between two positive numbers $a$ and $b$?
**Model Answer:**
$$\text{GM} = \sqrt{ab}$$

### Q7. [2 Marks] Define Harmonic Progression (HP).
**Model Answer:**
A sequence $a_1, a_2, a_3, \dots$ is in HP if their reciprocals $\frac{1}{a_1}, \frac{1}{a_2}, \frac{1}{a_3}, \dots$ form an Arithmetic Progression (AP).

### Q8. [2 Marks] What is the Harmonic Mean (HM) between two positive numbers $a$ and $b$?
**Model Answer:**
$$\text{HM} = \frac{2ab}{a + b}$$

### Q9. [2 Marks] State the inequality relating AM, GM, and HM for two unequal positive numbers.
**Model Answer:**
$$\text{AM} > \text{GM} > \text{HM} \quad (\text{with equality } \text{AM} = \text{GM} = \text{HM} \iff a = b)$$

### Q10. [2 Marks] What is the relationship between AM ($A$), GM ($G$), and HM ($H$) of two positive numbers?
**Model Answer:**
$$G^2 = A \times H \iff G = \sqrt{A \cdot H}$$


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] If the $p^{\text{th}}$ term of an AP is $q$ and the $q^{\text{th}}$ term is $p$, prove that the $(p+q)^{\text{th}}$ term is zero.
**Model Answer:**
Let first term be $a$ and common difference be $d$.
1. $T_p = a + (p - 1)d = q$  --- (1)
2. $T_q = a + (q - 1)d = p$  --- (2)
Subtract (2) from (1):
$$(p - q)d = q - p = -(p - q) \implies d = -1$$
Substitute $d = -1$ into (1):
$$a + (p - 1)(-1) = q \implies a - p + 1 = q \implies a = p + q - 1$$
Now compute $(p+q)^{\text{th}}$ term:
$$T_{p+q} = a + (p + q - 1)d = (p + q - 1) + (p + q - 1)(-1) = 0 \quad \text{(Q.E.D.)}$$

### Q2. [5 Marks] Find the sum of the series $7 + 77 + 777 + \dots$ to $n$ terms.
**Model Answer:**
$$S_n = 7(1 + 11 + 111 + \dots \text{ to } n \text{ terms})$$
Multiply and divide by 9:
$$S_n = \frac{7}{9} (9 + 99 + 999 + \dots \text{ to } n \text{ terms})$$
Rewrite each term as $10^k - 1$:
$$S_n = \frac{7}{9} [(10 - 1) + (10^2 - 1) + (10^3 - 1) + \dots + (10^n - 1)]$$
$$S_n = \frac{7}{9} [(10 + 10^2 + \dots + 10^n) - n]$$
The bracketed terms form a GP with $a = 10, r = 10$:
$$S_n = \frac{7}{9} \left[ \frac{10(10^n - 1)}{10 - 1} - n \right] = \frac{7}{9} \left[ \frac{10}{9}(10^n - 1) - n \right]$$

### Q3. [5 Marks] Insert 4 Geometric Means between 3 and 96.
**Model Answer:**
Let the 4 GMs be $G_1, G_2, G_3, G_4$. The full sequence is $3, G_1, G_2, G_3, G_4, 96$.
Total terms $N = 6$, $a = 3$, $T_6 = 96$.
$$T_6 = a r^5 \implies 3 r^5 = 96 \implies r^5 = 32 \implies r = 2$$
- $G_1 = a r = 3 \times 2 = 6$
- $G_2 = a r^2 = 3 \times 4 = 12$
- $G_3 = a r^3 = 3 \times 8 = 24$
- $G_4 = a r^4 = 3 \times 16 = 48$
The 4 GMs are **6, 12, 24, 48**.

### Q4. [5 Marks] Prove that for two positive unequal numbers $a$ and $b$, $\text{AM} > \text{GM} > \text{HM}$.
**Model Answer:**
1. $\text{AM} - \text{GM} = \frac{a + b}{2} - \sqrt{ab} = \frac{a + b - 2\sqrt{ab}}{2} = \frac{(\sqrt{a} - \sqrt{b})^2}{2} > 0$ (since $a \ne b$). Thus $\text{AM} > \text{GM}$.
2. $\text{GM}^2 = ab$, and $\text{AM} \times \text{HM} = \frac{a+b}{2} \times \frac{2ab}{a+b} = ab = \text{GM}^2$.
Since $\text{AM} > \text{GM}$ and $\text{HM} = \frac{\text{GM}^2}{\text{AM}}$, it follows that $\text{HM} < \text{GM}$.
Combining yields $\text{AM} > \text{GM} > \text{HM}$. (Q.E.D.)

### Q5. [5 Marks] If $a, b, c$ are in AP, prove that $\frac{1}{bc}, \frac{1}{ca}, \frac{1}{ab}$ are also in AP.
**Model Answer:**
Since $a, b, c$ are in AP, dividing each term by the non-zero constant $abc$ preserves the AP:
$$\frac{a}{abc}, \frac{b}{abc}, \frac{c}{abc} \text{ are in AP}$$
Simplifying the fractions:
$$\frac{1}{bc}, \frac{1}{ca}, \frac{1}{ab} \text{ are in AP} \quad \text{(Q.E.D.)}$$


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] If $S_1, S_2, S_3$ denote the sum of $n, 2n, 3n$ terms respectively of an AP, prove that $S_3 = 3(S_2 - S_1)$.
**Comprehensive University Solution:**
### 1. Expressions for Sums
- $S_1 = \frac{n}{2}[2a + (n - 1)d]$
- $S_2 = \frac{2n}{2}[2a + (2n - 1)d] = n[2a + (2n - 1)d]$
- $S_3 = \frac{3n}{2}[2a + (3n - 1)d]$

### 2. Compute $S_2 - S_1$
$$S_2 - S_1 = n[2a + (2n - 1)d] - \frac{n}{2}[2a + (n - 1)d]$$
Take $\frac{n}{2}$ common:
$$S_2 - S_1 = \frac{n}{2} [ 2(2a + (2n - 1)d) - (2a + (n - 1)d) ]$$
$$= \frac{n}{2} [ 4a + (4n - 2)d - 2a - (n - 1)d ]$$
$$= \frac{n}{2} [ 2a + (4n - 2 - n + 1)d ] = \frac{n}{2} [ 2a + (3n - 1)d ]$$

### 3. Multiply by 3
$$3(S_2 - S_1) = 3 \times \frac{n}{2} [ 2a + (3n - 1)d ] = \frac{3n}{2}[2a + (3n - 1)d] = S_3$$
Hence, $S_3 = 3(S_2 - S_1)$. (Q.E.D.)

### Q2. [10/15 Marks] Find the sum to $n$ terms of the Arithmetic-Geometric series: $1 + 4x + 7x^2 + 10x^3 + \dots$
**Comprehensive University Solution:**
### 1. Set up the Series
$$S_n = 1 + 4x + 7x^2 + 10x^3 + \dots + (3n - 2)x^{n-1}$$
Multiply both sides by $x$:
$$x S_n = x + 4x^2 + 7x^3 + \dots + (3n - 5)x^{n-1} + (3n - 2)x^n$$
Subtract the two equations:
$$(1 - x)S_n = 1 + [3x + 3x^2 + 3x^3 + \dots + 3x^{n-1}] - (3n - 2)x^n$$
$$(1 - x)S_n = 1 + 3x(1 + x + x^2 + \dots + x^{n-2}) - (3n - 2)x^n$$
Sum of GP inside parentheses is $\frac{1 - x^{n-1}}{1 - x}$:
$$(1 - x)S_n = 1 + \frac{3x(1 - x^{n-1})}{1 - x} - (3n - 2)x^n$$
Divide through by $(1 - x)$:
$$S_n = \frac{1}{1 - x} + \frac{3x(1 - x^{n-1})}{(1 - x)^2} - \frac{(3n - 2)x^n}{1 - x}$$

### Q3. [10/15 Marks] If the $p^{\text{th}}$, $q^{\text{th}}$, and $r^{\text{th}}$ terms of a GP are $a, b, c$ respectively, prove that $a^{q-r} b^{r-p} c^{p-q} = 1$.
**Comprehensive University Solution:**
Let first term of GP be $A$ and common ratio be $R$.
- $a = A R^{p-1}$
- $b = A R^{q-1}$
- $c = A R^{r-1}$
Substitute into expression $E = a^{q-r} b^{r-p} c^{p-q}$:
$$E = (A R^{p-1})^{q-r} \times (A R^{q-1})^{r-p} \times (A R^{r-1})^{p-q}$$
Collect powers of $A$ and $R$ separately:
Power of $A$:
$$(q - r) + (r - p) + (p - q) = 0 \implies A^0 = 1$$
Power of $R$:
$$(p - 1)(q - r) + (q - 1)(r - p) + (r - 1)(p - q)$$
$$= [p(q - r) + q(r - p) + r(p - q)] - [(q - r) + (r - p) + (p - q)]$$
$$= [pq - pr + qr - qp + rp - rq] - [0] = 0 \implies R^0 = 1$$
Therefore, $E = A^0 \times R^0 = 1 \times 1 = 1$. (Q.E.D.)


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-105N Unit 2, questions on the sum of series 7+77+777..., proof of S3 = 3(S2 - S1), and the relation AM >= GM >= HM are recurring MJPRU exam favorites.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
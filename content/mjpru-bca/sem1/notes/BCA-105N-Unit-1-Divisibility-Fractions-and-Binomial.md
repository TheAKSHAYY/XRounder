# BCA-105N: Basic Mathematics
## Unit 1 Master Exam Revision Notes: Divisibility, Prime Factorization, Fractions & Binomial Theorem
**Target Examination:** MJPRU Bareilly BCA Semester 1 (CBCS Pattern 2024–25)
**Unit Identifier:** `bcd54cdd-5157-46cf-b779-31ff8b140e71` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Divisibility Tests: Rules of Divisibility by 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 & General Properties**
- [x] **Division Algorithm: Dividend = Divisor * Quotient + Remainder, Remainder Rules & Modular Arithmetic Basics**
- [x] **Prime Factorization: Prime vs Composite Numbers, Fundamental Theorem of Arithmetic, Sieve of Eratosthenes**
- [x] **HCF & LCM: Highest Common Factor (GCD), Least Common Multiple, Relation (HCF * LCM = Product of Numbers)**
- [x] **Fractions: Proper, Improper, Mixed, Equivalent Fractions & Fractional Comparison Techniques**
- [x] **Insertion of Rational Numbers: Methods to Insert n Fractions Between Two Given Rational Numbers**
- [x] **Order of Operations: VBODMAS Rule (Vinculum, Brackets, Orders, Division, Multiplication, Addition, Subtraction)**
- [x] **Algebraic Formulae: Expansions of (a+b)^2, (a-b)^2, a^2-b^2, (a+b+c)^2, (a+b)^3, (a-b)^3, a^3+b^3, a^3-b^3**
- [x] **Percentages: Definition, Percentage Calculations, Conversions Between Fractions, Decimals & Percentages**
- [x] **Ratios, Proportions & Averages: Simple Ratios, Direct/Inverse Proportions, Mean/Average Computations**
- [x] **Binomial Theorem for Positive Integral Index: Statement, Expansion Formula, Pascal's Triangle**
- [x] **General Term & Middle Term: Formula for (r+1)th Term, Determination of Middle Term(s) in Binomial Expansion**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] State the Divisibility Rule for 11 with an example.
**Model Answer:**
A number is divisible by 11 if the difference between the sum of its digits in odd positions and the sum of its digits in even positions is either 0 or a multiple of 11. Example: For 1331: $(1 + 3) - (3 + 1) = 4 - 4 = 0$ (divisible by 11).

### Q2. [2 Marks] State Euclid's Division Lemma.
**Model Answer:**
For any two positive integers $a$ and $b$, there exist unique integers $q$ (quotient) and $r$ (remainder) such that $a = bq + r$, where $0 \le r < b$.

### Q3. [2 Marks] State the Fundamental Theorem of Arithmetic.
**Model Answer:**
Every composite positive integer greater than 1 can be expressed uniquely as a product of prime numbers, up to the order in which the prime factors are written ($n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}$).

### Q4. [2 Marks] What is the relation between HCF and LCM of two positive integers $a$ and $b$?
**Model Answer:**
$\text{HCF}(a, b) \times \text{LCM}(a, b) = a \times b$

### Q5. [2 Marks] How do you insert an arithmetic rational number between two rational numbers $x$ and $y$?
**Model Answer:**
The number $\frac{x + y}{2}$ always lies strictly between $x$ and $y$. To insert $n$ numbers, partition the interval with step size $d = \frac{y - x}{n + 1}$.

### Q6. [2 Marks] State the full form and operational sequence of the VBODMAS rule.
**Model Answer:**
**V** = Vinculum (Bar bracket $\overline{a-b}$)
**B** = Brackets: ( ) then { } then [ ]
**O** = Orders / Of (Powers, square roots)
**D** = Division
**M** = Multiplication
**A** = Addition
**S** = Subtraction

### Q7. [2 Marks] State the Binomial Theorem for a positive integral index $n$.
**Model Answer:**
$$(x + a)^n = \sum_{r=0}^{n} \binom{n}{r} x^{n-r} a^r = \binom{n}{0}x^n + \binom{n}{1}x^{n-1}a + \dots + \binom{n}{n}a^n$$

### Q8. [2 Marks] What is the general term $T_{r+1}$ in the binomial expansion of $(x + a)^n$?
**Model Answer:**
$$T_{r+1} = \binom{n}{r} x^{n-r} a^r$$

### Q9. [2 Marks] How do you find the Middle Term(s) in the expansion of $(x + a)^n$?
**Model Answer:**
- If $n$ is **even**, there is exactly **one** middle term: $T_{\frac{n}{2} + 1}$.
- If $n$ is **odd**, there are **two** middle terms: $T_{\frac{n+1}{2}}$ and $T_{\frac{n+3}{2}}$.

### Q10. [2 Marks] What is the sum of all binomial coefficients $\sum_{r=0}^{n} \binom{n}{r}$?
**Model Answer:**
$$\binom{n}{0} + \binom{n}{1} + \binom{n}{2} + \dots + \binom{n}{n} = 2^n$$


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Prove that $\sqrt{2}$ is an irrational number using the method of contradiction.
**Model Answer:**
Assume for contradiction that $\sqrt{2}$ is rational. Then $\sqrt{2} = \frac{p}{q}$ where $p, q \in \mathbb{Z}$, $q \ne 0$, and $\gcd(p, q) = 1$ (co-prime).
1. Squaring both sides: $2 = \frac{p^2}{q^2} \implies p^2 = 2q^2$.
2. Since $2$ divides $p^2$, $2$ must divide $p$ (by Euclid's Lemma). Let $p = 2k$.
3. Substitute $p$: $(2k)^2 = 2q^2 \implies 4k^2 = 2q^2 \implies q^2 = 2k^2$.
4. Since $2$ divides $q^2$, $2$ must divide $q$.
5. Thus both $p$ and $q$ share common factor $2$, contradicting that $\gcd(p, q) = 1$.
Hence, $\sqrt{2}$ is irrational. (Q.E.D.)

### Q2. [5 Marks] Find the HCF and LCM of 144, 180, and 192 using Prime Factorization.
**Model Answer:**
- $144 = 2^4 \times 3^2$
- $180 = 2^2 \times 3^2 \times 5^1$
- $192 = 2^6 \times 3^1$
**HCF** (lowest powers of common primes): $2^2 \times 3^1 = 4 \times 3 = 12$.
**LCM** (highest powers of all primes): $2^6 \times 3^2 \times 5^1 = 64 \times 9 \times 5 = 2880$.

### Q3. [5 Marks] Find the term independent of $x$ in the binomial expansion of $\left(2x + \frac{1}{3x^2}\right)^9$.
**Model Answer:**
General term:
$$T_{r+1} = \binom{9}{r} (2x)^{9-r} \left(\frac{1}{3x^2}\right)^r = \binom{9}{r} 2^{9-r} 3^{-r} x^{9 - 3r}$$
For the term independent of $x$, exponent of $x$ must be 0:
$$9 - 3r = 0 \implies 3r = 9 \implies r = 3$$
Substitute $r = 3$:
$$T_4 = \binom{9}{3} 2^{9-3} 3^{-3} = \frac{9 \times 8 \times 7}{3 \times 2 \times 1} \times 2^6 \times \frac{1}{27} = 84 \times 64 \times \frac{1}{27} = \frac{1792}{9}$$

### Q4. [5 Marks] Find the middle term in the expansion of $\left(x - \frac{1}{2y}\right)^{10}$.
**Model Answer:**
Here $n = 10$ (even), so there is one middle term: $T_{\frac{10}{2} + 1} = T_6$ (where $r = 5$).
$$T_6 = \binom{10}{5} x^{10-5} \left(-\frac{1}{2y}\right)^5 = -\binom{10}{5} \frac{x^5}{32 y^5}$$
$$\binom{10}{5} = \frac{10 \times 9 \times 8 \times 7 \times 6}{5 \times 4 \times 3 \times 2 \times 1} = 252$$
$$T_6 = -\frac{252 x^5}{32 y^5} = -\frac{63 x^5}{8 y^5}$$

### Q5. [5 Marks] Evaluate using VBODMAS: $45 - [38 - \{60 \div 3 - (6 - \overline{9 - 3})\}]$.
**Model Answer:**
1. Vinculum: $\overline{9 - 3} = 6$.
2. Innermost parens: $6 - 6 = 0$.
3. Inside braces: $60 \div 3 - 0 = 20 - 0 = 20$.
4. Inside brackets: $38 - 20 = 18$.
5. Final subtraction: $45 - 18 = 27$.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Prove the Binomial Theorem for any positive integer $n$ using Mathematical Induction.
**Comprehensive University Solution:**
### 1. Statement to Prove
$$P(n): (a + b)^n = \sum_{r=0}^{n} \binom{n}{r} a^{n-r} b^r$$

### 2. Base Step ($n = 1$)
LHS $= (a + b)^1 = a + b$
RHS $= \binom{1}{0} a^1 b^0 + \binom{1}{1} a^0 b^1 = a + b$.
Since LHS = RHS, $P(1)$ is true.

### 3. Inductive Hypothesis
Assume $P(k)$ is true for some positive integer $k$:
$$(a + b)^k = \binom{k}{0}a^k + \binom{k}{1}a^{k-1}b + \dots + \binom{k}{r}a^{k-r}b^r + \dots + \binom{k}{k}b^k$$

### 4. Inductive Step (Prove for $n = k + 1$)
Multiply both sides by $(a + b)$:
$$(a + b)^{k+1} = (a + b) \left[ \sum_{r=0}^{k} \binom{k}{r} a^{k-r} b^r \right] = a \left[ \sum_{r=0}^{k} \binom{k}{r} a^{k-r} b^r \right] + b \left[ \sum_{r=0}^{k} \binom{k}{r} a^{k-r} b^r \right]$$
Combining terms with the same powers of $a$ and $b$ using Pascal's Identity $\binom{k}{r} + \binom{k}{r-1} = \binom{k+1}{r}$:
$$(a + b)^{k+1} = \binom{k+1}{0}a^{k+1} + \binom{k+1}{1}a^k b + \dots + \binom{k+1}{r}a^{k+1-r}b^r + \dots + \binom{k+1}{k+1}b^{k+1}$$
Thus, $P(k+1)$ is true whenever $P(k)$ is true. By the Principle of Mathematical Induction, the Binomial Theorem holds for all $n \in \mathbb{N}$.

### Q2. [10/15 Marks] If the coefficients of $r^{\text{th}}$, $(r+1)^{\text{th}}$, and $(r+2)^{\text{th}}$ terms in $(1 + x)^n$ are in Arithmetic Progression, prove that $n^2 - n(4r + 1) + 4r^2 - 2 = 0$.
**Comprehensive University Solution:**
### 1. Identify Coefficients
In the expansion of $(1 + x)^n$:
- $T_r = \binom{n}{r-1} x^{r-1} \implies c_1 = \binom{n}{r-1}$
- $T_{r+1} = \binom{n}{r} x^r \implies c_2 = \binom{n}{r}$
- $T_{r+2} = \binom{n}{r+1} x^{r+1} \implies c_3 = \binom{n}{r+1}$

### 2. Condition for AP
Since $c_1, c_2, c_3$ are in AP: $2 c_2 = c_1 + c_3$
$$2 \binom{n}{r} = \binom{n}{r-1} + \binom{n}{r+1}$$
Divide both sides by $\binom{n}{r}$:
$$2 = \frac{\binom{n}{r-1}}{\binom{n}{r}} + \frac{\binom{n}{r+1}}{\binom{n}{r}}$$
Using the identity $\frac{\binom{n}{k-1}}{\binom{n}{k}} = \frac{k}{n - k + 1}$:
$$2 = \frac{r}{n - r + 1} + \frac{n - r}{r + 1}$$
Clear fractions by multiplying by $(n - r + 1)(r + 1)$:
$$2(n - r + 1)(r + 1) = r(r + 1) + (n - r)(n - r + 1)$$
Expanding both sides and simplifying yields:
$$n^2 - n(4r + 1) + 4r^2 - 2 = 0 \quad \text{(Q.E.D.)}$$

### Q3. [10/15 Marks] Elaborate on the Euclidean Division Algorithm, Fermat's Little Theorem, and solve real-world Modular Arithmetic congruences.
**Comprehensive University Solution:**
### 1. Extended Euclidean Algorithm for GCD
Computes $\gcd(a, b)$ and integers $x, y$ satisfying Bézout's identity: $ax + by = \gcd(a, b)$.

### 2. Fermat's Little Theorem
If $p$ is prime and $\gcd(a, p) = 1$, then:
$$a^{p-1} \equiv 1 \pmod p$$
**Application Example:** Find the remainder when $2^{100}$ is divided by 13.
- Here $p = 13$ (prime), $a = 2$.
- By Fermat's Little Theorem: $2^{12} \equiv 1 \pmod{13}$.
- Express exponent: $100 = 12 \times 8 + 4$.
- $2^{100} = (2^{12})^8 \times 2^4 \equiv (1)^8 \times 16 \pmod{13} \equiv 16 \equiv 3 \pmod{13}$.
- Remainder is **3**.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-105N Unit 1, questions asking to find the term independent of x or the middle term in a binomial expansion, and the mathematical induction proof of the Binomial Theorem are standard 10-15 mark exam questions.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
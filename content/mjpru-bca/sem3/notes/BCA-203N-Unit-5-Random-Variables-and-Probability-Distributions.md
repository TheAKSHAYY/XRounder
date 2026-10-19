# BCA-203N: Numerical Analysis and Statistical Techniques
## Unit 5 Master Exam Revision Notes: Random Variables & Theoretical Probability Distributions
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `ea73fc67-550d-53f5-acd4-19053adb0116` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Random Variables: Definition, Sample Space Mapping, Discrete vs Continuous Random Variables**
- [x] **Probability Mass Function (PMF): Definition, Properties (P(X=x) >= 0, sum P(x) = 1), Cumulative Distribution Function (CDF)**
- [x] **Probability Density Function (PDF): Definition, Properties (f(x) >= 0, integral f(x)dx = 1), Cumulative Distribution Function**
- [x] **Mathematical Expectation (Expected Value): E(X) Formula for Discrete and Continuous Distributions, Properties of Expectation**
- [x] **Variance and Standard Deviation: Var(X) = E(X^2) - [E(X)]^2, Properties of Variance, Moments of Distributions**
- [x] **Discrete Uniform Distribution: PMF, Mean, Variance, Real-World Applications (Fair Die Toss)**
- [x] **Bernoulli Distribution: Single Trial with Success Probability p, Mean = p, Variance = pq**
- [x] **Binomial Distribution: Assumptions (n Independent Bernoulli Trials), PMF P(X=r) = nCr * p^r * q^(n-r)**
- [x] **Characteristics of Binomial Distribution: Mean = np, Variance = npq, Conditions (Mean > Variance), Practical Applications**
- [x] **Poisson Distribution: Rare Events Model, Limiting Form of Binomial Distribution (n -> inf, p -> 0, np = lambda)**
- [x] **Characteristics of Poisson Distribution: PMF P(X=r) = (e^(-lambda) * lambda^r) / r!, Mean = Variance = lambda**
- [x] **Continuous Uniform (Rectangular) Distribution: PDF, CDF, Mean = (a+b)/2, Variance = (b-a)^2 / 12**
- [x] **Exponential Distribution: Memoryless Property, PDF f(x) = lambda * e^(-lambda*x), Mean = 1/lambda, Reliability Models**
- [x] **Normal (Gaussian) Distribution: Bell-Shaped Curve, PDF Formula, Parameters Mean (mu) and Variance (sigma^2)**
- [x] **Properties of Normal Curve: Symmetry about Mean, Unimodal, Area Properties (Empirical Rule 68-95-99.7%)**
- [x] **Standard Normal Distribution (Z): Z-Score Transformation Z = (X - mu)/sigma, Standard Normal Probability Tables**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define a Random Variable.
**Model Answer:**
A real-valued function $X: S \to \mathbb{R}$ that maps each sample point of sample space $S$ to a real number.

### Q2. [2 Marks] Differentiate between Discrete and Continuous Random Variables.
**Model Answer:**
- **Discrete:** Takes isolated, countable values (e.g., number of defective items), defined by a Probability Mass Function (PMF) $P(X = x)$.
- **Continuous:** Takes any value within an unbroken interval (e.g., height, temperature), defined by a Probability Density Function (PDF) $f(x)$.

### Q3. [2 Marks] State the two axiomatic conditions for a valid Probability Density Function (PDF).
**Model Answer:**
1. $f(x) \ge 0$ for all $x \in \mathbb{R}$
2. $\int_{-\infty}^{+\infty} f(x)dx = 1$

### Q4. [2 Marks] Define Mathematical Expectation $E(X)$.
**Model Answer:**
- Discrete: $E(X) = \sum x_i P(x_i)$
- Continuous: $E(X) = \int_{-\infty}^{+\infty} x f(x)dx$

### Q5. [2 Marks] What is the formula for Variance $\text{Var}(X)$?
**Model Answer:**
$$\text{Var}(X) = E(X^2) - [E(X)]^2$$

### Q6. [2 Marks] State the PMF, Mean, and Variance of the Binomial Distribution.
**Model Answer:**
- PMF: $P(X = r) = \binom{n}{r} p^r q^{n-r}$ for $r = 0, 1, \dots, n$
- Mean $\mu = np$
- Variance $\sigma^2 = npq$ (where $q = 1 - p$)

### Q7. [2 Marks] Why is Mean > Variance in a Binomial Distribution?
**Model Answer:**
Since probability of failure $q = 1 - p < 1$, $\text{Variance} = npq = \text{Mean} \times q < \text{Mean}$.

### Q8. [2 Marks] State the PMF, Mean, and Variance of the Poisson Distribution.
**Model Answer:**
- PMF: $P(X = r) = \frac{e^{-\lambda} \lambda^r}{r!}$ for $r = 0, 1, 2, \dots$
- Distinctive property: $\text{Mean} = \text{Variance} = \lambda$

### Q9. [2 Marks] Under what conditions does the Binomial Distribution tend to the Poisson Distribution?
**Model Answer:**
When number of trials $n \to \infty$ and success probability $p \to 0$, such that the product $np = \lambda$ remains a finite constant (Law of Rare Events).

### Q10. [2 Marks] State the Empirical Rule (68-95-99.7) for a Normal Distribution.
**Model Answer:**
- $\mu \pm 1\sigma$ contains $\approx 68.27\%$ of data.
- $\mu \pm 2\sigma$ contains $\approx 95.45\%$ of data.
- $\mu \pm 3\sigma$ contains $\approx 99.73\%$ of data.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Derive the Mean and Variance of the Binomial Distribution.
**Model Answer:**
**Mean:**
$$E(X) = \sum_{r=0}^n r \binom{n}{r} p^r q^{n-r} = \sum_{r=1}^n r \frac{n}{r} \binom{n-1}{r-1} p \cdot p^{r-1} q^{(n-1)-(r-1)}$$
$$E(X) = np \sum_{k=0}^{n-1} \binom{n-1}{k} p^k q^{n-1-k} = np(p + q)^{n-1} = np(1) = np$$

**Variance:**
$$E(X(X-1)) = \sum_{r=2}^n r(r-1) \binom{n}{r} p^r q^{n-r} = n(n-1)p^2$$
$$E(X^2) = E(X(X-1)) + E(X) = n(n-1)p^2 + np$$
$$\text{Var}(X) = E(X^2) - [E(X)]^2 = n^2 p^2 - np^2 + np - n^2 p^2 = np(1 - p) = npq$$

### Q2. [5 Marks] Derive the Mean and Variance of the Poisson Distribution.
**Model Answer:**
**Mean:**
$$E(X) = \sum_{r=0}^\infty r \frac{e^{-\lambda} \lambda^r}{r!} = e^{-\lambda} \sum_{r=1}^\infty \frac{\lambda \cdot \lambda^{r-1}}{(r-1)!} = \lambda e^{-\lambda} e^\lambda = \lambda$$
**Variance:**
$$E(X(X-1)) = e^{-\lambda} \sum_{r=2}^\infty \frac{\lambda^2 \cdot \lambda^{r-2}}{(r-2)!} = \lambda^2 e^{-\lambda} e^\lambda = \lambda^2$$
$$\text{Var}(X) = E(X^2) - [E(X)]^2 = (\lambda^2 + \lambda) - \lambda^2 = \lambda$$

### Q3. [5 Marks] Explain the Properties of the Normal (Gaussian) Probability Distribution Curve.
**Model Answer:**
1. **Symmetry:** Bell-shaped curve, perfectly symmetric about vertical line $x = \mu$.
2. **Unimodal:** Mean = Median = Mode, all coinciding at the central peak.
3. **Inflection Points:** Occur at $x = \mu \pm \sigma$.
4. **Total Area:** $\int_{-\infty}^{+\infty} f(x)dx = 1$.
5. **Standard Normal Transformation:** $Z = \frac{X - \mu}{\sigma} \sim N(0, 1)$.

### Q4. [5 Marks] Explain the Memoryless Property of the Exponential Distribution.
**Model Answer:**
A random variable $X$ has memoryless property if: $P(X > s + t \mid X > s) = P(X > t)$ for all $s, t > 0$.
For exponential distribution with $P(X > x) = e^{-\lambda x}$:
$$P(X > s + t \mid X > s) = \frac{P(X > s + t)}{P(X > s)} = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = P(X > t)$$
Elapsed wait time $s$ has zero effect on future wait time $t$.

### Q5. [5 Marks] State the Central Limit Theorem (CLT) and Explain its Practical Significance.
**Model Answer:**
**Theorem:** Let $X_1, X_2, \dots, X_n$ be independent, identically distributed random variables with mean $\mu$ and finite variance $\sigma^2$. As sample size $n \to \infty$, the standardized sample mean approaches a standard normal distribution:
$$Z = \frac{\bar{X} - \mu}{\sigma / \sqrt{n}} \xrightarrow{d} N(0, 1)$$
**Significance:** Allows applying normal probability tools to real-world samples even when the underlying population distribution is skewed or non-normal.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] A manufacturer knows that 2% of items produced are defective. Find the probability that in a random sample of 200 items, exactly 3 are defective using the Poisson approximation.
**Comprehensive University Solution:**
**Step 1: Check Poisson Suitability**
$n = 200$ (large), $p = 0.02$ (small). Poisson approximation is ideal.
Parameter $\lambda = np = 200 \times 0.02 = 4.0$.

**Step 2: Apply Poisson PMF**
$$P(X = r) = \frac{e^{-\lambda} \lambda^r}{r!}$$
For $r = 3, \lambda = 4$:
$$P(X = 3) = \frac{e^{-4} \cdot 4^3}{3!} = \frac{e^{-4} \cdot 64}{6} = \frac{32}{3} e^{-4}$$
Using $e^{-4} \approx 0.0183156$:
$$P(X = 3) = \frac{32}{3} (0.0183156) = 10.6667 \times 0.0183156 \approx \mathbf{0.1954}$$
**Final Answer:** The probability that exactly 3 items are defective is approximately **19.54%**.

### Q2. [10/15 Marks] The scores of students in an examination are normally distributed with Mean $\mu = 60$ and Standard Deviation $\sigma = 10$. Find the percentage of students scoring between 50 and 80. (Given: Area under standard normal curve from 0 to 1 is 0.3413, and from 0 to 2 is 0.4772).
**Comprehensive University Solution:**
**Step 1: Convert to Standard Normal Z-Scores**
For $X_1 = 50$: $Z_1 = \frac{50 - 60}{10} = -1.0$
For $X_2 = 80$: $Z_2 = \frac{80 - 60}{10} = +2.0$

**Step 2: Probability Area Calculation**
$$P(50 \le X \le 80) = P(-1.0 \le Z \le 2.0) = P(-1.0 \le Z \le 0) + P(0 \le Z \le 2.0)$$
By symmetry: $P(-1.0 \le Z \le 0) = P(0 \le Z \le 1.0) = 0.3413$
From given table: $P(0 \le Z \le 2.0) = 0.4772$
$$P = 0.3413 + 0.4772 = 0.8185$$
**Percentage:** $0.8185 \times 100\% = \mathbf{81.85\%}$ of students scored between 50 and 80.

### Q3. [10/15 Marks] Find the constant $k$ and compute the Mean and Variance for the Continuous Random Variable with PDF $f(x) = kx(2 - x)$ for $0 \le x \le 2$, and $0$ elsewhere.
**Comprehensive University Solution:**
**Step 1: Find Constant $k$ using $\int f(x)dx = 1$**
$$\int_0^2 k(2x - x^2)dx = 1 \implies k \left[ x^2 - \frac{x^3}{3} \right]_0^2 = 1 \implies k \left[ 4 - \frac{8}{3} \right] = 1 \implies k \left( \frac{4}{3} \right) = 1 \implies k = \frac{3}{4}$$

**Step 2: Compute Mean $E(X)$**
$$E(X) = \int_0^2 x f(x)dx = \frac{3}{4} \int_0^2 (2x^2 - x^3)dx = \frac{3}{4} \left[ \frac{2x^3}{3} - \frac{x^4}{4} \right]_0^2 = \frac{3}{4} \left[ \frac{16}{3} - 4 \right] = \frac{3}{4} \left( \frac{4}{3} \right) = 1.0$$

**Step 3: Compute $E(X^2)$ and Variance**
$$E(X^2) = \frac{3}{4} \int_0^2 (2x^3 - x^4)dx = \frac{3}{4} \left[ \frac{2x^4}{4} - \frac{x^5}{5} \right]_0^2 = \frac{3}{4} \left[ 8 - \frac{32}{5} \right] = \frac{3}{4} \left( \frac{8}{5} \right) = \frac{6}{5} = 1.2$$
$$\text{Var}(X) = E(X^2) - [E(X)]^2 = 1.2 - (1.0)^2 = 0.2$$
**Final Result:** $k = 3/4$, $\text{Mean} = 1.0$, $\text{Variance} = 0.2$.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Mean/Variance derivations for Binomial and Poisson distributions, and Normal distribution Z-score word problems appear frequently in university exams.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
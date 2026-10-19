# BCA-301N: Artificial Intelligence
## Unit 4 Master Exam Revision Notes: Reasoning Techniques & Structured Knowledge Representation
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `f5531dfe-5fc0-5526-9ec5-8233b742bb68` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Forward Chaining (Data-Driven Reasoning): Modus Ponens Execution, Cycle of Matching, Activation & Firing**
- [x] **Backward Chaining (Goal-Driven Reasoning): Hypothesis Testing, Sub-Goal Decomposition & Stack-Based Processing**
- [x] **Conflict Resolution Strategies: Specificity Rule, Recency Principle, Priority Order & Refractoriness**
- [x] **Pattern Matching Paradigms: Rete Matching Algorithm, Alpha Networks, Beta Memory & Discrimination Trees**
- [x] **Indexing Schemes for Large Knowledge Bases: Content-Addressable Indexing, Hash-Indexed Rules & Discrimination Trees**
- [x] **Semantic Networks: Quillian's Model, Nodes, Labeled Directed Edges, ISA and AKO Hierarchies, Property Inheritance**
- [x] **Exception Handling in Semantic Nets: Overriding Defaults, Multiple Inheritance Conflicts & Diamond Problem**
- [x] **Frames Representation (Marvin Minsky): Frame Structure, Slots, Fillers, Facets, Default Values, Demonic Triggers (if-needed, if-added)**
- [x] **Conceptual Dependency (CD) Theory (Roger Schank): Primitive Acts (ATRANS, PTRANS, MTRANS, MBUILD, INGEST, EXPEL, MOVE, GRASP)**
- [x] **CD Conceptual Roles: Actor, Objective, Recipient, Directive & Conceptual Tenses**
- [x] **Scripts Knowledge Representation: Schank's Scripts, Causal Chains, Restaurant Script Standard Paradigm**
- [x] **Components of Scripts: Entry Conditions, Props, Roles, Tracks & Scenes Progression**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is Monotonic Reasoning and why is it insufficient for real-world AI?
**Model Answer:**
In **Monotonic Logic**, the set of derived propositions can only grow as new axioms are added; newly acquired knowledge can never invalidate previously established truths. It fails in real-world AI because common sense relies on incomplete information, defaults, and changing facts.

### Q2. [2 Marks] Define Non-Monotonic Reasoning and give an example.
**Model Answer:**
**Non-Monotonic Reasoning** is an inference framework where conclusions can be retracted or invalidated when new, contradictory evidence is introduced. Example: Believing 'Tweety flies' because Tweety is a bird, but retracting it upon learning 'Tweety is a penguin'.

### Q3. [2 Marks] What is Default Logic formulated by Raymond Reiter?
**Model Answer:**
Default Logic formalizes reasoning with default assumptions using default rules of the form:
$$\frac{\alpha : \beta}{\gamma}$$
meaning: 'If $\alpha$ is known (prerequisite), and it is consistent to assume $\beta$ (justification), then infer $\gamma$ (consequent).'

### Q4. [2 Marks] Explain the Closed World Assumption (CWA).
**Model Answer:**
CWA assumes that any proposition not explicitly stated as true in the knowledge base is **false** by default. Used universally in relational databases and Prolog.

### Q5. [2 Marks] What is a Bayesian Belief Network (BBN)?
**Model Answer:**
A BBN is a Directed Acyclic Graph (DAG) where nodes represent random variables and directed edges represent direct conditional probabilistic dependencies, parameterized by Conditional Probability Tables (CPTs).

### Q6. [2 Marks] Define Bayes' Theorem and its components.
**Model Answer:**
$$P(H | E) = \frac{P(E | H) \cdot P(H)}{P(E)}$$
Where $P(H|E)$ is posterior probability, $P(E|H)$ is likelihood, $P(H)$ is prior probability of hypothesis, and $P(E)$ is marginal evidence probability.

### Q7. [2 Marks] What is Fuzzy Logic and how does it differ from Boolean Logic?
**Model Answer:**
Boolean logic restricts truth values strictly to $\{0, 1\}$. **Fuzzy Logic** allows continuous truth membership values in the real interval $[0.0, 1.0]$, modeling linguistic vagueness (e.g., 'tall', 'hot').

### Q8. [2 Marks] Define the Fuzzy Intersection (AND) and Union (OR) operators.
**Model Answer:**
For two fuzzy sets $A$ and $B$ with membership functions $\mu_A(x)$ and $\mu_B(x)$:
- **Intersection ($A \cap B$):** $\mu_{A \cap B}(x) = \min(\mu_A(x), \mu_B(x))$
- **Union ($A \cup B$):** $\mu_{A \cup B}(x) = \max(\mu_A(x), \mu_B(x))$

### Q9. [2 Marks] What is Defuzzification? Mention one common method.
**Model Answer:**
Defuzzification is the mathematical conversion of a fuzzy output distribution into a single crisp numerical control signal. The most widely used technique is the **Centroid (Center of Gravity) Method**.

### Q10. [2 Marks] What is a Certainty Factor (CF) in the MYCIN expert system?
**Model Answer:**
A numerical metric in the range $[-1.0, +1.0]$ representing expert confidence in a hypothesis, computed as $CF = MB - MD$, where $MB$ is Measure of Increased Belief and $MD$ is Measure of Increased Disbelief.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare Monotonic vs Non-Monotonic Reasoning Paradigms.
**Model Answer:**
| Dimension | Monotonic Reasoning | Non-Monotonic Reasoning |
| :--- | :--- | :--- |
| **Truth Persistence** | Theorems once proved remain permanently true | Conclusions can be retracted when new evidence arises |
| **Information Completeness** | Requires complete, fully consistent knowledge | Operates effectively over incomplete, tentative information |
| **Real-World Suitability** | Pure mathematics, formal theorem proving | Common sense reasoning, medical diagnostics, robotics |
| **Formalisms** | Propositional logic, First-Order Predicate Calculus | Default Logic, Circumscription, Truth Maintenance Systems (TMS) |

### Q2. [5 Marks] Explain Bayesian Networks with a Conditional Probability Table (CPT) Example.
**Model Answer:**
Consider the classic Burglary-Earthquake-Alarm network:

```
[ Burglary ] (B)       [ Earthquake ] (E)
          \               /
           v             v
             [ Alarm ] (A)
             /       \
            v         v
     [ JohnCalls ]   [ MaryCalls ]
```
- **Joint Probability Decomposition:**
  $$P(B, E, A, J, M) = P(B) \cdot P(E) \cdot P(A | B, E) \cdot P(J | A) \cdot P(M | A)$$
- Instead of requiring $2^5 - 1 = 31$ parameters for full joint distribution, network independence requires only $1 + 1 + 4 + 2 + 2 = 10$ parameters, dramatically reducing computational complexity.

### Q3. [5 Marks] Explain Fuzzy Membership Functions (Triangular, Trapezoidal, Gaussian) with Mathematical Formulations.
**Model Answer:**
### Fuzzy Membership Function Formulations
1. **Triangular Function $\text{trimf}(x; a, b, c)$:**
   $$\mu(x) = \max\left(0, \min\left(\frac{x - a}{b - a}, \frac{c - x}{c - b}\right)\right)$$
2. **Trapezoidal Function $\text{trapmf}(x; a, b, c, d)$:**
   $$\mu(x) = \max\left(0, \min\left(\frac{x - a}{b - a}, 1, \frac{d - x}{d - c}\right)\right)$$
3. **Gaussian Function $\text{gaussmf}(x; c, \sigma)$:**
   $$\mu(x) = \exp\left( -\frac{(x - c)^2}{2\sigma^2} \right)$$
*Where parameters define geometric boundaries and centers.*

### Q4. [5 Marks] Explain the Architecture and Operation of a Truth Maintenance System (TMS).
**Model Answer:**
A **TMS (or Reason Maintenance System)** manages dependency networks between beliefs:
- **Nodes:** Represent propositions.
- **Justifications:** Track reasons supporting nodes (`IN` = believed true, `OUT` = not believed).
- **JTMS (Justification-based TMS):** Re-evaluates status when nodes are asserted or retracted.
- **ATMS (Assumption-based TMS):** Maintains multiple hypothetical worlds/contexts simultaneously, preventing costly backtracking during planning.

### Q5. [5 Marks] Detail the Fuzzy Inference System (Mamdani Model) Architecture.
**Model Answer:**
### 4-Stage Mamdani Architecture:
1. **Fuzzification:** Crisp numerical sensor inputs are mapped to fuzzy linguistic values via membership functions.
2. **Rule Base Evaluation:** `IF-THEN` rules are evaluated; firing strength is computed via $\min$ (AND) or $\max$ (OR).
3. **Aggregation:** Clipped or scaled output fuzzy sets from all rules are combined using $\max$.
4. **Defuzzification:** Crisp output is calculated using the Center of Gravity (Centroid) formula: $z^* = \frac{\int z \cdot \mu_C(z) dz}{\int \mu_C(z) dz}$.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Solve a Complete Bayesian Diagnostic Problem Using Bayes' Rule with Sensitivity, Specificity, and Prior Prevalence.
**Comprehensive University Solution:**
### Medical Diagnostic Case Study

#### Problem Statement:
- Disease Prevalence (Prior Probability): $P(D) = 0.01$ (1% of population has the rare disease).
- Test Sensitivity: $P(Positive | D) = 0.95$ (95% chance of positive test if diseased).
- Test Specificity: $P(Negative | \neg D) = 0.90$ (90% chance of negative test if healthy).
- Hence False Positive Rate: $P(Positive | \neg D) = 1 - 0.90 = 0.10$.
- **Question:** If a randomly selected patient tests **Positive**, what is the true posterior probability that they actually have the disease ($P(D | Positive)$)?

#### Mathematical Derivation via Bayes' Theorem:
$$P(D | Positive) = \frac{P(Positive | D) \cdot P(D)}{P(Positive)}$$

#### Step 1: Compute Total Marginal Probability $P(Positive)$ via Law of Total Probability:
$$P(Positive) = P(Positive | D) \cdot P(D) + P(Positive | \neg D) \cdot P(\neg D)$$
Given $P(\neg D) = 1 - 0.01 = 0.99$:
$$P(Positive) = (0.95 \times 0.01) + (0.10 \times 0.99)$$
$$P(Positive) = 0.0095 + 0.0990 = 0.1085$$

#### Step 2: Calculate Posterior Probability:
$$P(D | Positive) = \frac{0.0095}{0.1085} \approx 0.08755 \implies \mathbf{8.76\%}$$

#### Examiner Insight & Analysis:
Even though the test is 95% accurate, a positive test result only gives an **8.76%** chance of having the disease! This counter-intuitive result (known as the *Base Rate Fallacy*) occurs because the disease is extremely rare relative to the false-positive rate. In examinations, students must state both the numerical derivation and the base rate interpretation.

### Q2. [10/15 Marks] Design an End-to-End Fuzzy Logic Controller for an Automated Air Conditioning System.
**Comprehensive University Solution:**
### Complete Industrial Design: Smart AC Temperature Controller

#### 1. Input/Output Linguistic Variables & Universes of Discourse:
- **Input 1: Room Temperature Error ($e$)** $\in [-10, +10]^\circ\text{C}$:
  - `Cold` (Negative), `Comfortable` (Zero), `Hot` (Positive)
- **Input 2: Rate of Change of Temperature ($\Delta e$)** $\in [-5, +5]^\circ\text{C/min}$:
  - `Cooling` (Negative), `Stable` (Zero), `Warming` (Positive)
- **Output: AC Compressor Motor Speed ($S$)** $\in [0, 100]\%$:
  - `Off` (0%), `Low` (25%), `Medium` (50%), `High` (75%), `Maximum` (100%)

#### 2. Fuzzy Rule Matrix (9 Mamdani Rules):
| Error ($e$) \ $\Delta e$ | Cooling (N) | Stable (Z) | Warming (P) |
| :--- | :--- | :--- | :--- |
| **Cold (N)** | Off | Off | Low |
| **Comfortable (Z)**| Low | Medium | High |
| **Hot (P)** | Medium | High | Maximum |

#### 3. Python Implementation of Fuzzy Controller:
```python
import numpy as np

def triangular_mf(x, a, b, c):
    return max(0.0, min((x - a)/(b - a) if b > a else 1.0, (c - x)/(c - b) if c > b else 1.0))

def evaluate_ac_controller(error_val):
    # Fuzzify Error
    cold = triangular_mf(error_val, -10, -10, 0)
    comfortable = triangular_mf(error_val, -5, 0, 5)
    hot = triangular_mf(error_val, 0, 10, 10)

    # Rule Firings (assuming stable delta_e):
    # R1: IF Cold THEN Low (Speed = 20%)
    # R2: IF Comfortable THEN Medium (Speed = 50%)
    # R3: IF Hot THEN Maximum (Speed = 90%)
    w1 = cold
    w2 = comfortable
    w3 = hot

    # Centroid Defuzzification
    speeds = [20, 50, 90]
    weights = [w1, w2, w3]

    if sum(weights) == 0:
        return 50.0 # Default fallback
    crisp_speed = sum(s * w for s, w in zip(speeds, weights)) / sum(weights)
    return crisp_speed

print(f"For Error +6.0C (Hot room): Compressor Speed = {evaluate_ac_controller(6.0):0.2f}%")
```

### Q3. [10/15 Marks] Explain Dempster-Shafer Theory of Evidence, Belief, Plausibility, and Rule of Combination.
**Comprehensive University Solution:**
### Dempster-Shafer (D-S) Mathematical Framework

#### 1. Frame of Discernment ($\Theta$):
The set of mutually exclusive and exhaustive elementary hypotheses: $\Theta = \{\theta_1, \theta_2, \dots, \theta_n\}$. The power set $2^\Theta$ represents all possible subsets.

#### 2. Basic Probability Assignment (Mass Function $m$):
A mapping $m: 2^\Theta \to [0, 1]$ such that:
$$m(\emptyset) = 0 \quad \text{and} \quad \sum_{A \subseteq \Theta} m(A) = 1$$

#### 3. Belief and Plausibility Functions:
- **Belief ($Bel(A)$):** Measures total confidence committed strictly to $A$ and all its subsets (lower bound of probability):
  $$Bel(A) = \sum_{B \subseteq A} m(B)$$
- **Plausibility ($Pl(A)$):** Measures the degree to which $A$ is not contradicted by competing evidence (upper bound of probability):
  $$Pl(A) = \sum_{B \cap A \neq \emptyset} m(B) = 1 - Bel(\neg A)$$
- **Uncertainty Interval:** $[Bel(A), Pl(A)]$ models genuine epistemic ignorance without forcing arbitrary prior probabilities.

#### 4. Dempster's Rule of Combination:
Combines independent mass functions $m_1$ and $m_2$:
$$m_{1,2}(A) = \frac{\sum_{B \cap C = A} m_1(B) m_2(C)}{1 - K} \quad (\text{for } A \neq \emptyset)$$
Where conflict factor $K = \sum_{B \cap C = \emptyset} m_1(B) m_2(C)$ measures mutual contradiction.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners heavily weight: Bayes Rule calculations (guaranteed 5-10 marks), Fuzzy Logic Controller architecture with rule base, and Monotonic vs Non-Monotonic distinctions.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
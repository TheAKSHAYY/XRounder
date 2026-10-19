# BCA-411E: Discrete Mathematics
## Unit 2 Master Exam Revision Notes: Propositional Logic, Predicate Calculus & Mathematical Proofs
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `fc7b0943-6502-577f-9b55-ba67821c4b0a` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Propositions: Declarative Statements, Truth Values (True/False), Atomic vs Compound Propositions**
- [x] **Basic Logical Connectives: Negation (NOT ~), Conjunction (AND ^), Disjunction (OR v)**
- [x] **Conditional (Implication ->) and Biconditional (<->) Statements: Truth Tables, Antecedents and Consequents**
- [x] **Converse, Inverse, and Contrapositive of Conditional Statements: Logical Equivalence Proof of Implication and Contrapositive**
- [x] **Truth Tables for Complex Logical Formulas: Construction and Step-by-Step Evaluation**
- [x] **Tautologies, Contradictions, and Contingencies: Definitions, Truth Table Identification**
- [x] **Logical Equivalence: Equivalence Laws (Identity, Domination, Double Negation, De Morgan's Laws for Logic)**
- [x] **Algebra of Propositions: Simplifying Boolean Propositional Expressions using Logical Equivalences**
- [x] **Rules of Inference: Modus Ponens, Modus Tollens, Hypothetical Syllogism, Disjunctive Syllogism, Resolution**
- [x] **Valid and Invalid Arguments: Fallacies, Testing Argument Validity via Truth Tables and Derivation Rules**
- [x] **Predicate Logic & Propositional Functions: Variables, Predicates P(x), Domain of Discourse**
- [x] **Quantifiers: Universal Quantifier (For All), Existential Quantifier (There Exists)**
- [x] **Negation of Quantified Statements: De Morgan's Laws for Quantifiers (~(For All x P(x)) <=> There Exists x ~P(x))**
- [x] **Normal Forms in Propositional Logic: Disjunctive Normal Form (DNF) and Conjunctive Normal Form (CNF)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define a Proposition in mathematical logic.
**Model Answer:**
A **Proposition** (or statement) is a declarative sentence that is either **True (T)** or **False (F)**, but not both simultaneously.
*Example:* 'Bareilly is in Uttar Pradesh' is a proposition (True). 'What time is it?' is not a proposition (interrogative sentence).

### Q2. [2 Marks] State the truth table for Conditional Statement ($p \to q$).
**Model Answer:**
| $p$ | $q$ | $p \to q$ |
| :---: | :---: | :---: |
| T | T | **T** |
| T | F | **F** |
| F | T | **T** |
| F | F | **T** |
*(A conditional statement $p \to q$ is false IF AND ONLY IF the antecedent $p$ is true and consequent $q$ is false)*.

### Q3. [2 Marks] Define Converse, Inverse, and Contrapositive of $p \to q$.
**Model Answer:**
For an implication $p \to q$:
1. **Converse:** $q \to p$
2. **Inverse:** $\neg p \to \neg q$
3. **Contrapositive:** $\neg q \to \neg p$
*(A conditional statement is logically equivalent to its contrapositive: $p \to q \equiv \neg q \to \neg p$)*.

### Q4. [2 Marks] Differentiate between Tautology, Contradiction, and Contingency.
**Model Answer:**
A **Tautology** is a compound proposition that is True for all possible truth assignments (e.g., $p \lor \neg p$).
A **Contradiction** (or Absurdity) is False for all possible truth assignments (e.g., $p \land \neg p$).
A **Contingency** is neither a tautology nor a contradiction (it is true for some cases and false for others).

### Q5. [2 Marks] State Modus Ponens and Modus Tollens rules of inference.
**Model Answer:**
1. **Modus Ponens (Law of Detachment):**
   $$\frac{p, \quad p \to q}{\therefore q}$$
2. **Modus Tollens:**
   $$\frac{\neg q, \quad p \to q}{\therefore \neg p}$$

### Q6. [2 Marks] State De Morgan's Laws for Quantifiers.
**Model Answer:**
1. $\neg (\forall x P(x)) \equiv \exists x \neg P(x)$
2. $\neg (\exists x P(x)) \equiv \forall x \neg P(x)$


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Prove using Truth Tables that $(p \to q) \equiv (\neg p \lor q)$ and deduce that $(p \to q) \equiv (\neg q \to \neg p)$.
**Model Answer:**
### Truth Table Proof of Equivalence

#### Construction Table:
| $p$ | $q$ | $\neg p$ | $\neg q$ | $p \to q$ (Col 5) | $\neg p \lor q$ (Col 6) | $\neg q \to \neg p$ (Col 7) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| T | T | F | F | **T** | **T** | **T** |
| T | F | F | T | **F** | **F** | **F** |
| F | T | T | F | **T** | **T** | **T** |
| F | F | T | T | **T** | **T** | **T** |

#### Conclusion:
- Columns 5 and 6 have identical truth values in every row, proving:
  $$(p \to q) \equiv (\neg p \lor q)$$
- Columns 5 and 7 also have identical truth values in every row, proving:
  $$(p \to q) \equiv (\neg q \to \neg p) \quad \text{(Equivalence with Contrapositive)}$$

### Q2. [5 Marks] Determine whether the formula $(p \to q) \land (q \to r) \to (p \to r)$ is a Tautology.
**Model Answer:**
### Proof of Hypothetical Syllogism

We evaluate the truth table for $[(p \to q) \land (q \to r)] \to (p \to r)$:

| $p$ | $q$ | $r$ | $p \to q$ | $q \to r$ | Premise: $(p \to q) \land (q \to r)$ | Conclusion: $p \to r$ | Formula |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| T | T | T | T | T | T | T | **T** |
| T | T | F | T | F | F | F | **T** |
| T | F | T | F | T | F | T | **T** |
| T | F | F | F | T | F | F | **T** |
| F | T | T | T | T | T | T | **T** |
| F | T | F | T | F | F | T | **T** |
| F | F | T | T | T | T | T | **T** |
| F | F | F | T | T | T | T | **T** |

Since the final column evaluates to **True (T)** across all 8 possible truth assignments, the formula is a **TAUTOLOGY** (known as the Law of Hypothetical Syllogism).

### Q3. [5 Marks] Explain Rules of Inference in Propositional Logic: Hypothetical Syllogism, Disjunctive Syllogism, and Resolution.
**Model Answer:**
### Rules of Inference Summary

| Rule of Inference | Tautological Form | Description |
| :--- | :--- | :--- |
| **Modus Ponens** | $[p \land (p \to q)] \to q$ | Affirming the antecedent yields consequent. |
| **Modus Tollens** | $[\neg q \land (p \to q)] \to \neg p$ | Denying consequent denies antecedent. |
| **Hypothetical Syllogism** | $[(p \to q) \land (q \to r)] \to (p \to r)$ | Transitivity of implication. |
| **Disjunctive Syllogism** | $[(p \lor q) \land \neg p] \to q$ | If disjunction holds and one is false, the other must be true. |
| **Resolution** | $[(p \lor q) \land (\neg p \lor r)] \to (q \lor r)$ | Core inference engine for automated theorem proving. |


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Demonstrate the validity of an argument using Rules of Inference: Given premises: (1) p -> ~q, (2) ~r -> p, (3) q. Prove the conclusion r.
**Comprehensive University Solution:**
### Formal Proof of Validity using Rules of Inference

#### Given Premises:
1. $p \to \neg q$
2. $\neg r \to p$
3. $q$
**To Prove Conclusion:** $r$

---

### Step-by-Step Derivation Table:
| Step | Statement | Justification |
| :---: | :--- | :--- |
| **1.** | $p \to \neg q$ | Premise (1) |
| **2.** | $q$ | Premise (3) |
| **3.** | $\neg (\neg q)$ | Double Negation on Step 2 |
| **4.** | $\neg p$ | **Modus Tollens** on Step 1 and Step 3 ($[p \to \neg q] \land \neg(\neg q) \implies \neg p$) |
| **5.** | $\neg r \to p$ | Premise (2) |
| **6.** | $\neg (\neg r)$ | **Modus Tollens** on Step 5 and Step 4 ($[\neg r \to p] \land \neg p \implies \neg(\neg r)$) |
| **7.** | **$r$** | **Double Negation** on Step 6 |

$$\mathbf{Q.E.D.}$$
*(The argument is proven mathematically valid).*

### Q2. [10/15 Marks] Explain Predicate Calculus, Universal (\forall) and Existential (\exists) Quantifiers, and Negation of Nested Quantifiers. Translate into English and find negations for: (1) \forall x \exists y (x + y = 0), (2) \exists x \forall y (x \le y).
**Comprehensive University Solution:**
### Predicate Calculus, Quantifiers, and Negations

---

### 1. Fundamental Definitions
- **Predicate:** A propositional function $P(x)$ whose truth value depends on variable $x$ chosen from a **Domain of Discourse ($D$)**.
- **Universal Quantifier ($\forall$):** $\forall x P(x)$ is True iff $P(x)$ is True for *every* $x \in D$.
- **Existential Quantifier ($\exists$):** $\exists x P(x)$ is True iff there is *at least one* $x \in D$ where $P(x)$ is True.

---

### 2. Solving Statement (1): $\forall x \exists y (x + y = 0)$ over the Real Numbers $\mathbb{R}$
- **English Translation:** "For every real number $x$, there exists a real number $y$ such that their sum is 0." *(This asserts the existence of additive inverses: $y = -x$. It is True).*
- **Forming Negation:**
  $$\neg [\forall x \exists y (x + y = 0)] \equiv \exists x \neg [\exists y (x + y = 0)] \equiv \mathbf{\exists x \forall y (x + y \ne 0)}$$
- **Negation in English:** "There exists a real number $x$ such that for all real numbers $y$, $x + y \ne 0$."

---

### 3. Solving Statement (2): $\exists x \forall y (x \le y)$ over Positive Integers $\mathbb{Z}^+$
- **English Translation:** "There exists a positive integer $x$ such that for all positive integers $y$, $x \le y$." *(This asserts the existence of a minimum element in $\mathbb{Z}^+$, namely $x = 1$. It is True).*
- **Forming Negation:**
  $$\neg [\exists x \forall y (x \le y)] \equiv \forall x \neg [\forall y (x \le y)] \equiv \mathbf{\forall x \exists y (x > y)}$$
- **Negation in English:** "For every positive integer $x$, there exists a positive integer $y$ such that $x > y$." *(False).*


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
### Examiner Insights & University Exam Strategy:
1. **Guaranteed 5/10-Mark Problem:** Constructing a Truth Table to prove whether a given compound expression is a Tautology, Contradiction, or Contingency. Draw clear, step-by-step columns.
2. **Rules of Inference:** Practice formal step-by-step proofs using Modus Ponens, Modus Tollens, and Hypothetical Syllogism.
3. **Quantifier Negations:** Remember to swap $\forall \leftrightarrow \exists$ and negate the inner predicate ($P(x) \leftrightarrow \neg P(x)$).

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
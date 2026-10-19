# BCA-301N: Artificial Intelligence
## Unit 3 Master Exam Revision Notes: Knowledge Representation & Classical Logic
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `764eacbb-fee3-569f-b664-c298ddc775a9` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Knowledge Representation Requirements: Representational Adequacy, Inferential Adequacy, Inferential Efficiency & Acquisitional Efficiency**
- [x] **Propositional Logic: Syntax, Semantics, Truth Tables, Logical Connectives, Validity, Satisfiability & Tautologies**
- [x] **First-Order Predicate Logic (FOPL): Universal (∀) and Existential (∃) Quantifiers, Predicates, Terms, Functions & Arity**
- [x] **Conversion to Conjunctive Normal Form (CNF): 9-Step Standard Procedure (Eliminating Implications, De Morgan's, Skolemization)**
- [x] **Skolemization Paradigm: Skolem Constants vs Skolem Functions for Existential Quantifiers**
- [x] **Clause Form Transformation: Prenex Normal Form, Eliminating Universal Quantifiers & Dropping Conjunctions**
- [x] **Unification Algorithm in FOPL: Most General Unifier (MGU), Substitution Sets & Occur Check Implementation**
- [x] **Resolution Refutation Principle: J. Alan Robinson's Rule of Inference, Proof by Contradiction in Clause Logic**
- [x] **Resolution Refutation Trees: Linear Resolution, Binary Resolution & Resolvent Construction**
- [x] **Deduction, Induction, and Abduction: Formal Distinctions, Defeasible Reasoning & Soundness**
- [x] **Automated Theorem Proving: Robinson's Algorithm Application to Mathematical & Logical Proofs**
- [x] **Question Answering Systems: Green's Method, Answer Literals, Binding Accumulation & Extracting Variable Substitutions**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the Knowledge Representation Hypothesis by Brian Smith?
**Model Answer:**
It asserts that any intelligent agent must contain an explicit internal representation of its knowledge expressed in symbols, and its behavior must be causally determined by manipulations of these symbolic structures.

### Q2. [2 Marks] Differentiate between Declarative Knowledge and Procedural Knowledge.
**Model Answer:**
**Declarative Knowledge** represents facts, concepts, and assertions ('knowing *what*', e.g., 'Bareilly is in UP', represented via logic or semantic networks). **Procedural Knowledge** represents operational rules, sequences, and procedures ('knowing *how*', e.g., code, production rules).

### Q3. [2 Marks] Define Modus Ponens and Modus Tollens.
**Model Answer:**
- **Modus Ponens:** Given $P \to Q$ and $P$, infer $Q$.
- **Modus Tollens:** Given $P \to Q$ and $\neg Q$, infer $\neg P$.

### Q4. [2 Marks] What is Conjunctive Normal Form (CNF)?
**Model Answer:**
A logical formula is in **CNF** if it is a conjunction (AND, $\wedge$) of one or more clauses, where each clause is a disjunction (OR, $\vee$) of literals (e.g., $(A \vee B) \wedge (\neg B \vee C)$).

### Q5. [2 Marks] What is the purpose of Skolemization in converting FOL to CNF?
**Model Answer:**
Skolemization eliminates existential quantifiers ($\exists$). If $\exists x$ is within the scope of universal quantifiers $\forall y$, $x$ is replaced by a **Skolem function** $f(y)$. If not in any scope, it is replaced by a **Skolem constant** $c$.

### Q6. [2 Marks] Explain Unification in First-Order Logic.
**Model Answer:**
Unification is the algorithmic process of finding a substitution $\theta = \{x_1/t_1, x_2/t_2, \dots\}$ that makes two distinct logical expressions syntactically identical, i.e., $UNIFY(p, q) = \theta$ such that $SUBST(\theta, p) = SUBST(\theta, q)$.

### Q7. [2 Marks] What is the Most General Unifier (MGU)?
**Model Answer:**
An MGU is a substitution $\theta$ that unifies two expressions while placing the minimum possible constraint on variables, meaning any other unifying substitution $\sigma$ can be expressed as a composition $\sigma = \theta \circ \gamma$.

### Q8. [2 Marks] Define a Horn Clause and its importance in logic programming.
**Model Answer:**
A **Horn Clause** is a clause with at most one positive literal: e.g., $\neg A \vee \neg B \vee C \equiv (A \wedge B) \to C$. It is computationally tractable ($O(N)$ linear inference time) and forms the foundation of Prolog.

### Q9. [2 Marks] Compare Forward Chaining and Backward Chaining.
**Model Answer:**
- **Forward Chaining (Data-driven):** Starts with known facts and applies inference rules iteratively to derive new facts until a goal is reached.
- **Backward Chaining (Goal-driven):** Starts with the hypothesized goal and searches backward through rules to find supporting known facts.

### Q10. [2 Marks] What is Resolution Refutation?
**Model Answer:**
A proof technique that proves formula $\alpha$ follows from knowledge base $KB$ by assuming $\neg \alpha$ (the negated goal), adding it to $KB$ in CNF, and applying resolution rules to derive a contradiction (the empty clause $\Box$).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the 8-Step Procedure to Convert First-Order Logic Statements into CNF.
**Model Answer:**
### Systematic FOL to CNF Conversion Algorithm
1. **Eliminate Implications:** Replace $P \to Q$ with $\neg P \vee Q$, and $P \leftrightarrow Q$ with $(\neg P \vee Q) \wedge (\neg Q \vee P)$.
2. **Move Negation Inward (De Morgan's Laws):**
   - $\neg (P \wedge Q) \equiv \neg P \vee \neg Q$
   - $\neg (P \vee Q) \equiv \neg P \wedge \neg Q$
   - $\neg \forall x P \equiv \exists x \neg P$
   - $\neg \exists x P \equiv \forall x \neg P$
3. **Standardize Variables:** Rename variables so each quantifier binds a unique variable: $\forall x P(x) \vee \forall x Q(x) \to \forall x P(x) \vee \forall y Q(y)$.
4. **Skolemize (Eliminate $\exists$):** Replace existentially quantified variables with Skolem constants or functions depending on outer universal quantifiers.
5. **Drop Universal Quantifiers:** Since all remaining variables are universally quantified, omit $\forall$.
6. **Distribute $\vee$ over $\wedge$:** Convert into clauses using $A \vee (B \wedge C) \equiv (A \vee B) \wedge (A \vee C)$.
7. **Flatten and Separate Clauses:** Treat each conjunct as an independent clause.
8. **Standardize Variables Apart:** Rename variables across separate clauses so no variable name is shared.

### Q2. [5 Marks] Compare Forward Chaining vs Backward Chaining with an Architecture Diagram.
**Model Answer:**
```
[ FORWARD CHAINING : Data-Driven ]        [ BACKWARD CHAINING : Goal-Driven ]
  Known Facts (Database)                   Hypothesized Goal
          |\                                        |
          v                                        v
  Fire Matching Rules                     Find Rules that Conclude Goal
          |                                        |
          v                                        v
  Derive New Facts                        Sub-goals to be Verified
          |                                        |
          v                                        v
  Stop when Goal is Generated             Stop when Base Facts Support Sub-goals
```

| Criteria | Forward Chaining | Backward Chaining |
| :--- | :--- | :--- |
| **Search Direction** | Bottom-up (Facts $\to$ Conclusions) | Top-down (Hypothesis $\to$ Supporting Evidence) |
| **Best Used When** | Lots of data available, open-ended outcomes | Specific query needs verification (e.g., Medical diagnosis) |
| **Control Mechanism**| Match-Resolve-Act cycle | Recursive depth-first stack search |
| **Computational Cost**| Can generate many irrelevant facts | Focused strictly on goal-relevant clauses |

### Q3. [5 Marks] Explain the Unification Algorithm with Worked Examples.
**Model Answer:**
### Unification Step-by-Step
To unify two atomic sentences $P(x, f(y))$ and $P(a, f(b))$:
1. Check predicate symbols: Both are $P$ (Match).
2. First arguments: $x$ (variable) and $a$ (constant). Substitute $\theta_1 = \{x / a\}$.
3. Apply $\theta_1$ to expressions.
4. Second arguments: $f(y)$ and $f(b)$. Predicates match ($f$). Inner arguments $y$ and $b$ unify with $\theta_2 = \{y / b\}$.
5. Compose substitutions: $\theta = \{x / a, y / b\}$.

**Occurs Check:** A variable $x$ cannot be unified with a term containing $x$ (e.g., $UNIFY(x, f(x))$ must fail), preventing infinite recursive structures.

### Q4. [5 Marks] Discuss Wumpus World as a Knowledge-Based Agent Environment.
**Model Answer:**
The **Wumpus World** is a $4 \times 4$ grid game illustrating logical reasoning under partial observability:
- **Percepts:** `[Stench, Breeze, Glitter, Bump, Scream]`
  - *Stench:* In rooms adjacent to Wumpus.
  - *Breeze:* In rooms adjacent to a Pit.
  - *Glitter:* In room containing Gold.
- **Propositional Reasoning:** An agent in $[1,1]$ detects no breeze $\implies \neg P_{1,2} \wedge \neg P_{2,1}$. Moving to $[2,1]$, it detects breeze $\implies P_{2,2} \vee P_{3,1}$. Combining knowledge, the agent safely deduces $[1,2]$ is safe!

### Q5. [5 Marks] What is the Resolution Principle in Propositional Logic?
**Model Answer:**
Given two parent clauses containing complementary literals $L$ and $\neg L$:
$$C_1 = A \vee L \quad \text{and} \quad C_2 = B \vee \neg L$$
The **Resolvent** is:
$$C = A \vee B$$
If the resolvent produces an empty clause $\Box$ (from resolving $P$ and $\neg P$), a logical contradiction is proven.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Prove the Classic Socratic Syllogism Using Resolution Refutation in First-Order Logic.
**Comprehensive University Solution:**
### Resolution Refutation Proof for 'Socrates is Mortal'

#### Problem Formulation:
1. **Statement 1:** All men are mortal.
   $$\forall x (Man(x) \to Mortal(x))$$
2. **Statement 2:** Socrates is a man.
   $$Man(Socrates)$$
3. **Goal Query:** Prove that Socrates is mortal.
   $$Mortal(Socrates)$$

#### Step 1: Negate the Goal Query
$$\neg Mortal(Socrates)$$

#### Step 2: Convert All Statements into Clause Normal Form (CNF)
- From Statement 1:
  $$\forall x (\neg Man(x) \vee Mortal(x)) \implies \neg Man(x) \vee Mortal(x) \quad \text{[Clause 1]}$$
- From Statement 2:
  $$Man(Socrates) \quad \text{[Clause 2]}$$
- From Negated Goal:
  $$\neg Mortal(Socrates) \quad \text{[Clause 3]}$$

#### Step 3: Resolution Graph (Derivation of Contradiction)

```
   Clause 1: ~Man(x) v Mortal(x)       Clause 2: Man(Socrates)
                 \                           /
                  \                         /
                   \    theta = {x/Socrates}
                    \                     /
                     v                   v
                  Clause 4: Mortal(Socrates)     Clause 3: ~Mortal(Socrates)
                                \                       /
                                 \                     /
                                  v                   v
                                   +-----------------+
                                   |   Empty Clause  |
                                   |      ( # )      |
                                   |  CONTRADICTION  |
                                   +-----------------+
```

#### Step 4: Resolution Steps:
1. Resolve **Clause 1** and **Clause 2** with substitution $\theta = \{x / Socrates\}$. The complementary literals $\neg Man(Socrates)$ and $Man(Socrates)$ cancel out, yielding **Clause 4:** $Mortal(Socrates)$.
2. Resolve **Clause 4** with **Clause 3** (Negated Goal). The complementary literals $Mortal(Socrates)$ and $\neg Mortal(Socrates)$ cancel out, producing the **Empty Clause ($\Box$)**.
3. **Conclusion:** The derivation of the empty clause proves that assuming Socrates is not mortal leads to an impossible logical contradiction. Therefore, by refutation, **Socrates is Mortal is proved true**! $\blacksquare$

### Q2. [10/15 Marks] Detail Knowledge Representation Schemes: Semantic Networks, Frames, and Conceptual Dependency (CD) with Comparative Analysis.
**Comprehensive University Solution:**
### Structured Knowledge Representation Paradigms

```
1. SEMANTIC NETWORKS              2. FRAMES                          3. CONCEPTUAL DEPENDENCY
+--------+      is-a       +-------+    Frame: BIRD                        [John] <=> ATRANS
| Canary | --------------> | Bird  |    - superclass: ANIMAL                  <- (object) -> [Money]
+--------+                 +-------+    - can_fly: True (default)             <- (recipient) -> [Mary]
    |                          |        - legs: 2                             <- (donor) -> [John]
    | color                    | covers - wings: 2
    v                          v        - if_needed: check_species_slot
[Yellow]                   [Feathers]
```

#### 1. Semantic Networks (Quillian):
- Graph-based representation where nodes represent concepts/objects and directed edges represent semantic relations (`is-a`, `has-a`, `part-of`).
- **Inference Mechanism:** Inheritance through transitive closure along `is-a` taxonomies.

#### 2. Frames (Marvin Minsky):
- Object-oriented record structures consisting of a collection of named **Slots** and associated **Values** or default values.
- Supports **Demons** (procedural attachments like `if-added`, `if-removed`, `if-needed`) for active computation when slot values change.

#### 3. Conceptual Dependency Theory (Roger Schank):
- Models the meaning of natural language sentences independent of grammatical surface structures using a set of 11 primitive actions (e.g., `ATRANS` - transfer of possession, `PTRANS` - transfer of physical location, `MTRANS` - transfer of mental info).

#### Comparative Evaluation Matrix:
| Feature | Semantic Networks | Frames | Conceptual Dependency |
| :--- | :--- | :--- | :--- |
| **Primary Representation** | Graph (Nodes & Links) | Slotted Record / Objects | Primitive ACT Graphs |
| **Inference Type** | Inheritance traversal | Default values & Demons | Semantic slot filling |
| **Expressive Power** | Moderate | High (Procedural hooks) | Very High (for NLP) |
| **Computational Cost** | Fast graph traversal | Moderate | Complex parsing required |

### Q3. [10/15 Marks] Write a Complete Python Resolution Theorem Prover for Propositional Clauses.
**Comprehensive University Solution:**
```python
def resolve(ci, cj):
    """Resolves two propositional clauses (sets of literals)."""
    resolvents = set()
    for di in ci:
        # Look for complementary literal
        neg_di = di[1:] if di.startswith('~') else '~' + di
        if neg_di in cj:
            # Form new clause by removing di and neg_di
            new_clause = (ci - {di}) | (cj - {neg_di})
            resolvents.add(frozenset(new_clause))
    return resolvents

def pl_resolution(clauses, query):
    """
    Propositional Logic Resolution Refutation.
    Proves query follows from clauses if contradiction (empty set) is derived.
    """
    # Add negated query to KB clauses
    neg_query = query[1:] if query.startswith('~') else '~' + query
    clause_set = set(frozenset(c) for c in clauses)
    clause_set.add(frozenset([neg_query]))

    new = set()
    step = 1
    print(f"Initial Clause Set with Negated Query: {clause_set}")

    while True:
        pairs = [(ci, cj) for ci in clause_set for cj in clause_set if ci != cj]
        for (ci, cj) in pairs:
            resolvents = resolve(ci, cj)
            if frozenset() in resolvents: # Empty clause derived
                print(f"\n[SUCCESS] Empty clause derived at step {step} from {set(ci)} and {set(cj)}!")
                return True # Query is provably TRUE
            new.update(resolvents)

        if new.issubset(clause_set):
            print("\n[FAILURE] No new clauses derived. Query cannot be proved.")
            return False
        clause_set.update(new)
        step += 1

# Verification: A v B, ~A v C, ~B -> Prove C
kb = [{'A', 'B'}, {'~A', 'C'}, {'~B'}]
query_literal = 'C'
print("Proof Result:", pl_resolution(kb, query_literal))
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently ask for: Resolution Refutation of a logical argument (guaranteed 10/15 marks Section C), FOL to CNF 8 steps, and Forward vs Backward Chaining.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
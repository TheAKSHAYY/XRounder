# BCA-301N: Artificial Intelligence
## Unit 5 Master Exam Revision Notes: AI Applications, Expert Systems & Natural Language Processing
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `ba6f1839-340f-5efc-b7cd-74cb5c9a25de` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Introduction to Expert Systems: Definition, Domain Specificity, Human Expert vs AI Expert Comparison**
- [x] **Architecture of Expert Systems: Knowledge Base, Inference Engine, Working Memory, User Interface & Explanation Facility**
- [x] **Knowledge Acquisition Process: Knowledge Engineers, Domain Experts, Protocol Analysis & Elicitation Bottleneck**
- [x] **Explanation Subsystem: 'How' Explanations (Sub-goal Trees) and 'Why' Explanations (Rule Tracing)**
- [x] **Rule-Based Expert Systems: MYCIN (Infectious Diseases Diagnosis, Certainty Factors CF), DENDRAL & PROSPECTOR Case Studies**
- [x] **Certainty Factor Theory: Measures of Belief (MB), Measures of Disbelief (MD), Combining Evidence in MYCIN**
- [x] **Expert System Shells: Architecture, CLIPS, JESS, Separation of Domain Knowledge from Inference Mechanisms**
- [x] **Natural Language Processing (NLP) Overview: Communication Pipeline, Ambiguity Challenges (Lexical, Syntactic, Semantic, Pragmatic)**
- [x] **Morphological Analysis & Tokenization: Stems, Roots, Affixes, Lemmatization vs Porter Stemmer Algorithm**
- [x] **Syntactic Analysis: Context-Free Grammars (CFG), Parse Trees, Top-Down vs Bottom-Up Parsing, Cocke-Younger-Kasami (CYK)**
- [x] **Semantic Analysis & Pragmatics: Compositional Semantics, Word Sense Disambiguation (WSD), Discourse Analysis & Reference Resolution**
- [x] **Contemporary AI Paradigms: Introduction to Machine Learning (Supervised, Unsupervised, RL), Artificial Neural Networks (ANN), SVM & Fuzzy Logic Basics**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is an Expert System?
**Model Answer:**
An **Expert System** is a knowledge-intensive computer application that emulates the decision-making ability of a human specialist in a narrow, specific domain using domain knowledge and automated inference.

### Q2. [2 Marks] List the core components of an Expert System Architecture.
**Model Answer:**
1. **Knowledge Base:** Stores domain rules and facts.
2. **Inference Engine:** Applies logical reasoning to infer conclusions.
3. **Working Memory:** Stores current session data.
4. **Explanation Facility:** Justifies 'How' and 'Why' a decision was made.
5. **Knowledge Acquisition Module:** Enters expert knowledge.
6. **User Interface:** Facilitates user interaction.

### Q3. [2 Marks] What domain did MYCIN address and what reasoning technique did it pioneer?
**Model Answer:**
Developed at Stanford in the 1970s, **MYCIN** diagnosed blood-borne bacterial infections (bacteremia and meningitis). It pioneered backward chaining rule-based inference with **Certainty Factors** under uncertainty.

### Q4. [2 Marks] What was DENDRAL's historical significance?
**Model Answer:**
Developed in 1965 at Stanford, **DENDRAL** was the first successful knowledge-based expert system, deducing the chemical molecular structure of unknown organic compounds from mass spectrometer data.

### Q5. [2 Marks] What are the five classical phases of Natural Language Processing (NLP)?
**Model Answer:**
1. Morphological/Lexical Analysis
2. Syntactic Analysis (Parsing)
3. Semantic Analysis
4. Discourse Integration
5. Pragmatic Analysis

### Q6. [2 Marks] Define Morphological Analysis in NLP.
**Model Answer:**
Morphological analysis breaks words down into their most fundamental meaningful units (**morphemes**), performing stemming, lemmatization, and affix stripping (e.g., `unbelievable` $\to$ `un-` + `believe` + `-able`).

### Q7. [2 Marks] What is the role of a Grammar in Syntactic Parsing?
**Model Answer:**
A grammar (typically Context-Free Grammar, CFG) defines formal structural rules determining whether a sequence of tokens constitutes a syntactically valid sentence according to terminal and non-terminal symbols.

### Q8. [2 Marks] Differentiate between Supervised, Unsupervised, and Reinforcement Learning.
**Model Answer:**
- **Supervised:** Learns from labeled training data pairs $(x, y)$.
- **Unsupervised:** Discovers hidden patterns/clusters in unlabeled data $x$.
- **Reinforcement:** Learns through trial-and-error by maximizing numerical scalar rewards from an environment.

### Q9. [2 Marks] What is the role of an Activation Function in Artificial Neural Networks?
**Model Answer:**
An activation function (e.g., ReLU, Sigmoid) introduces **non-linearity** into the network, allowing it to approximate arbitrary complex, non-linear mathematical mappings beyond simple linear separation.

### Q10. [2 Marks] Explain the Turing Test Loebner Prize.
**Model Answer:**
The Loebner Prize was an annual competition launched in 1990 awarding prizes to chatbot programs considered most indistinguishable from humans based on standard Turing Test evaluation panels.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Architecture of an Expert System with a Detailed Block Diagram.
**Model Answer:**
```
+--------------------------------------------------------------+
|                    EXPERT SYSTEM SHELL                       |
|                                                              |
|   +-------------+                     +------------------+   |
|   |  Knowledge  |                     |  Explanation     |   |
|   |  Base (KB)  |                     |  Facility        |   |
|   | Rules/Facts |                     |  ("HOW" / "WHY") |   |
|   +-------------+                     +------------------+   |
|          ^                                      ^            |
|          |                                      |            |
|          v                                      v            |
|   +------------------------------------------------------+   |
|   |              INFERENCE ENGINE                        |   |
|   |  (Forward / Backward Chaining, Conflict Resolution)  |   |
|   +------------------------------------------------------+   |
|          ^                                      ^            |
|          |                                      |            |
|          v                                      v            |
|   +-------------+                     +------------------+   |
|   |   Working   |                     |  User Interface  |   |
|   |   Memory    | <-----------------> |  (Client/Web)    |   |
|   +-------------+                     +------------------+   |
+--------------------------------------------------------------+
         ^                                      ^
         |                                      |
[ Knowledge Engineer ]                     [ End User ]
```
- **Inference Engine:** Decoupled from knowledge base, enabling system shells (e.g., CLIPS, JESS) to be repurposed across diverse domains.

### Q2. [5 Marks] Compare Forward Chaining vs Backward Chaining in Expert System Inference Engines.
**Model Answer:**
| Feature | Forward Chaining (Data-Driven) | Backward Chaining (Goal-Driven) |
| :--- | :--- | :--- |
| **Starting Point** | Working memory containing known symptoms/facts | Hypothesized disease or diagnosis goal |
| **Rule Selection** | Matches rule antecedents (`IF` conditions) | Matches rule consequents (`THEN` conclusions) |
| **Prompting** | Asks questions only after exhausting inferences | Asks targeted questions to verify specific sub-goals |
| **Classic System** | R1/XCON (Digital Equipment Corp computer config) | MYCIN (Medical diagnosis) |
| **Cycle** | Recognize-Act Cycle | Recursive Goal-Stack Resolution |

### Q3. [5 Marks] Explain the 5 Classical Levels of Natural Language Processing.
**Model Answer:**
1. **Lexical/Morphological Analysis:** Tokenizes text into words and punctuation; analyzes word stems, prefixes, and suffixes.
2. **Syntactic Analysis (Parsing):** Verifies grammatical rules using Context-Free Grammars (CFGs) to produce hierarchical Parse Trees.
3. **Semantic Analysis:** Assigns literal, context-free meaning to sentence components, verifying semantic type compatibility (e.g., rejecting *'Colorless green ideas sleep furiously'*).
4. **Discourse Integration:** Resolves meaning across multi-sentence passages and coreference resolution (e.g., determining what *'it'* refers to in *'The dog chased the ball because it was bouncing'*).
5. **Pragmatic Analysis:** Interprets intended meaning in real-world communicative context (e.g., recognizing *'Can you pass the salt?'* is a request, not a physical ability inquiry).

### Q4. [5 Marks] Explain the Working of Perceptrons and the XOR Problem.
**Model Answer:**
A single-layer Perceptron computes $y = f\left(\sum_{i=1}^n w_i x_i + b\right)$.
- **XOR Problem (Minsky & Papert 1969):** A single-layer perceptron can only learn **linearly separable** functions (AND, OR).
- The XOR truth table: $(0,0)\to 0, (0,1)\to 1, (1,0)\to 1, (1,1)\to 0$ cannot be separated by any single straight line in 2D space.
- **Resolution:** Overcome by Multi-Layer Perceptrons (MLPs) with non-linear activation functions trained via the Backpropagation algorithm.

### Q5. [5 Marks] Explain Expert System Shells vs Native Development.
**Model Answer:**
An **Expert System Shell** is a pre-built expert system package containing the inference engine, user interface, explanation module, and working memory, but lacking domain knowledge.
- **Benefit:** Developers need only provide rules and facts without writing low-level parsing or inference code.
- **Examples:** CLIPS, JESS, Drools, EMYCIN (Empty MYCIN).


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Provide an In-Depth Analysis of the MYCIN Expert System Architecture, Certainty Factor Calculus, and Clinical Impact.
**Comprehensive University Solution:**
### Comprehensive Study of the MYCIN Expert System (Stanford 1976)

#### 1. System Genesis and Purpose:
Developed by Edward Shortliffe at Stanford University, MYCIN was designed to assist physicians in prescribing antimicrobial therapy for patients with severe bacterial blood infections (bacteremia and meningitis).

#### 2. Knowledge Representation in MYCIN:
MYCIN stored approximately 450 production rules in the following standard syntax:
```
RULE 035
IF: 1) The gram stain of the organism is gramneg,
    2) The morphology of the organism is rod,
    3) The aerobicity of the organism is anaerobic
THEN: There is suggestive evidence (0.6) that the identity
      of the organism is Bacteroides.
```

#### 3. Certainty Factor (CF) Mathematical Calculus:
In clinical medicine, relationships are probabilistic rather than absolute. MYCIN developed Certainty Factor calculus:
- **Measure of Belief ($MB(H, E)$):** Increase in belief in hypothesis $H$ given evidence $E$.
- **Measure of Disbelief ($MD(H, E)$):** Increase in disbelief in hypothesis $H$ given evidence $E$.
- **Certainty Factor Definition:**
  $$CF(H, E) = MB(H, E) - MD(H, E) \quad \text{where } CF \in [-1.0, +1.0]$$

#### Combination Rules:
1. **Conjunctive Antecedents (AND):**
   $$CF(E_1 \wedge E_2) = \min(CF(E_1), CF(E_2))$$
2. **Disjunctive Antecedents (OR):**
   $$CF(E_1 \vee E_2) = \max(CF(E_1), CF(E_2))$$
3. **Rule Application:**
   $$CF(H) = CF(E) \times CF_{rule}$$
4. **Combining Multiple Independent Rules Supporting Same Hypothesis:**
   $$CF_{comb}(CF_1, CF_2) = \begin{cases} CF_1 + CF_2 - (CF_1 \cdot CF_2) & \text{if } CF_1, CF_2 \ge 0 \\ CF_1 + CF_2 + (CF_1 \cdot CF_2) & \text{if } CF_1, CF_2 < 0 \\ \frac{CF_1 + CF_2}{1 - \min(|CF_1|, |CF_2|)} & \text{otherwise} \end{cases}$$

#### 4. Clinical Impact and Legacy:
In blinded clinical trials, MYCIN's therapeutic recommendations achieved a **65% acceptability rating by independent infectious disease specialists**, outperforming resident physicians and matching senior Stanford infectious disease faculty. It established the paradigm for explanation-based decision support systems.

### Q2. [10/15 Marks] Construct a Top-Down Context-Free Grammar (CFG) and Parse Tree for Natural Language Sentences.
**Comprehensive University Solution:**
### Natural Language Parsing Case Study

#### Sentence to Parse: *'The student wrote an intelligent program'*

#### 1. Context-Free Grammar Production Rules:
- **Sentence Rule:** $S \to NP \; VP$
- **Noun Phrase Rules:** $NP \to Det \; N \mid Det \; Adj \; N$
- **Verb Phrase Rules:** $VP \to V \; NP$
- **Lexicon (Terminals):**
  - $Det \to \text{'The'} \mid \text{'an'}$
  - $N \to \text{'student'} \mid \text{'program'}$
  - $Adj \to \text{'intelligent'}$
  - $V \to \text{'wrote'}$

#### 2. Generated Hierarchical Parse Tree:
```
                                    [ S ]
                                   /     \
                        +---------+       +---------+
                        |                           |
                     [ NP ]                      [ VP ]
                    /      \                    /      \
             [ Det ]        [ N ]            [ V ]     [ NP ]
                |             |                |      /   |   \
              'The'       'student'         'wrote' [Det][Adj] [N]
                                                       |    |    |
                                                     'an' 'intelligent' 'program'
```

#### 3. Syntactic Ambiguity:
When sentences possess multiple valid parse trees (e.g., *'I saw the man with a telescope'*), semantic disambiguation and probabilistic context-free grammars (PCFGs) must be employed to select the most probable parse tree.

### Q3. [10/15 Marks] Implement a Complete Rule-Based Forward Chaining Expert System in Python.
**Comprehensive University Solution:**
```python
class Rule:
    def __init__(self, antecedents, consequent, name=""):
        self.antecedents = set(antecedents) # Pre-conditions
        self.consequent = consequent        # Inferred new fact
        self.name = name

class ForwardChainingEngine:
    def __init__(self):
        self.rules = []
        self.facts = set()

    def add_rule(self, rule):
        self.rules.append(rule)

    def add_fact(self, fact):
        self.facts.add(fact)

    def run(self):
        print(f"Initial Facts: {self.facts}")
        fired = True
        step = 1
        while fired:
            fired = False
            for rule in self.rules:
                # Check if all antecedents exist in known facts and consequent is not yet known
                if rule.antecedents.issubset(self.facts) and rule.consequent not in self.facts:
                    self.facts.add(rule.consequent)
                    print(f"Step {step}: Fired Rule '{rule.name}' -> Added Fact: '{rule.consequent}'")
                    fired = True
                    step += 1
        print(f"Final Established Facts Base: {self.facts}")
        return self.facts

# Configure Expert System for Technical Troubleshooting
engine = ForwardChainingEngine()
engine.add_fact("screen_black")
engine.add_fact("power_light_blinking")

engine.add_rule(Rule(["screen_black", "power_light_blinking"], "power_supply_issue", "R1"))
engine.add_rule(Rule(["power_supply_issue"], "replace_power_cable", "R2"))
engine.add_rule(Rule(["replace_power_cable"], "contact_hardware_support", "R3"))

# Execute System
engine.run()
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiner high-yield focus: Expert System Architecture with explanation module, MYCIN Certainty Factor math, and 5 stages of NLP.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
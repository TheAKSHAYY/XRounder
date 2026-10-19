# BCA-423E: Software Engineering
## Unit 5 Master Exam Revision Notes: Software Testing, Maintenance, Reliability & Reengineering
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `bdc2265d-5322-5fef-82b8-31f64062fa3f` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Software Testing Fundamentals: Verification vs Validation (V&V - Boehm's Question), Error vs Fault (Defect/Bug) vs Failure**
- [x] **Testing Psychology & Principles: Exhaustive Testing is Impossible, Pesticide Paradox, Early Testing Saves Costs**
- [x] **White-Box (Glass-Box / Structural) Testing: Basis Path Testing, Control Flow Graphs (CFG), Cyclomatic Complexity Formula**
- [x] **Coverage Criteria: Statement Coverage, Branch / Decision Coverage, Condition Coverage, Path Coverage**
- [x] **Black-Box (Functional / Behavioral) Testing: Equivalence Partitioning (Valid and Invalid Classes), Boundary Value Analysis (BVA)**
- [x] **Specialized Black-Box Techniques: Cause-Effect Graphing, Decision Table Testing, Error Guessing**
- [x] **Strategic Levels of Testing: Unit Testing (Stubs and Drivers), Integration Testing (Top-Down, Bottom-Up, Big-Bang, Sandwich)**
- [x] **System Testing (Sanity, Smoke, Stress, Load, Performance, Security Testing), Regression Testing, Acceptance Testing (Alpha & Beta Testing)**
- [x] **Debugging Process & Strategies: Brute Force, Backtracking, Cause Elimination, Automated Debugging Tools**
- [x] **Software Maintenance: Meaning, Need, Categories of Maintenance (Corrective, Adaptive, Perfective, Preventive Maintenance)**
- [x] **Software Maintenance Cost Drivers: Lehman's Laws of Software Evolution, Reverse Engineering and Software Reengineering Cycle**
- [x] **Software Reliability and Availability: Mean Time Between Failures (MTBF = MTTF + MTTR), Availability Formula (A = MTTF / (MTTF + MTTR))**
- [x] **Cleanroom Software Engineering Approach: Zero-Defect Philosophy, Formal Specification, Statistical Usage Testing without Unit Testing**
- [x] **Software Reuse & Standards: Component-Based Software Engineering (CBSE), IEEE Software Engineering Standards (IEEE 730, 829, 830, 1012, 1074)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Differentiate between Error, Fault (Bug), and Failure.
**Model Answer:**
- **Error**: A human developer mistake or misunderstanding during design or coding.
- **Fault (Bug)**: The physical flaw or incorrect line written into the software code.
- **Failure**: The observable departure of program execution from its specified requirements.

### Q2. [2 Marks] Differentiate between Verification and Validation.
**Model Answer:**
- **Verification**: 'Are we building the product right?' Checks conformance to specifications without running code (reviews, walkthroughs, inspections).
- **Validation**: 'Are we building the right product?' Executes code to ensure it satisfies user needs (system & acceptance testing).

### Q3. [2 Marks] What are Test Stubs and Test Drivers in integration testing?
**Model Answer:**
- **Stub**: A dummy called routine simulating unfinished lower-level modules in **Top-Down** testing.
- **Driver**: A dummy calling routine that invokes the module under test in **Bottom-Up** testing.

### Q4. [2 Marks] Differentiate between Alpha Testing and Beta Testing.
**Model Answer:**
- **Alpha Testing**: Acceptance testing conducted by users at the **developer's site** in a controlled lab environment.
- **Beta Testing**: Acceptance testing conducted by real end-users in their own **live operational environments** at customer sites.

### Q5. [2 Marks] What are the four recognized categories of Software Maintenance?
**Model Answer:**
1. **Corrective**: Fixing residual bugs/defects.
2. **Adaptive**: Adapting software to changes in OS, hardware, or statutory laws.
3. **Perfective**: Adding new user features and improving performance (over 50% of cost).
4. **Preventive**: Refactoring code to enhance future maintainability.

### Q6. [2 Marks] State the formulas for MTBF and System Availability ($A$).
**Model Answer:**
$$\text{MTBF} = \text{MTTF} + \text{MTTR}$$
$$\text{Availability (A)} = \frac{\text{MTTF}}{\text{MTTF} + \text{MTTR}} \times 100\%$$

### Q7. [2 Marks] What is Mutation Testing?
**Model Answer:**
A fault-based testing technique where intentional syntactic mutations (errors) are injected into the source code to verify whether the test suite detects and 'kills' the mutants.

### Q8. [2 Marks] What is Cleanroom Software Engineering?
**Model Answer:**
A formal software development philosophy combining mathematical formal specifications, box structure designs, and statistical usage testing to certify correctness without standard trial-and-error unit debugging.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare Black-Box Testing vs White-Box Testing in a Structured Matrix.
**Model Answer:**
| Dimension | Black-Box Testing (Functional) | White-Box Testing (Structural) |
| :--- | :--- | :--- |
| **Knowledge of Code** | **Zero** knowledge of internal code structure | **Full** access to source code and control logic |
| **Basis for Tests** | Requirements specification (SRS) | Control flow graphs, logic branches, conditions |
| **Performed By** | Independent QA Testers / End-users | Software Developers / Test Engineers |
| **Core Techniques** | - Equivalence Class Partitioning (ECP)<br>- Boundary Value Analysis (BVA)<br>- Cause-Effect Graphing | - Statement Coverage<br>- Branch / Decision Coverage<br>- Basis Path Testing |
| **Primary Objective** | Validate external functional behavior | Verify internal algorithms and code paths |

### Q2. [5 Marks] Explain Equivalence Class Partitioning (ECP) and Boundary Value Analysis (BVA) with a Practical Case.
**Model Answer:**
### Black-Box Testing Case Study
**Requirement:** An employee bonus calculator accepts integer years of service between **1 and 30** years.

### 1. Equivalence Class Partitioning (ECP):
- **Invalid Partition 1**: $Years < 1$ (e.g., -5, 0) $\implies$ Rejection.
- **Valid Partition**: $1 \le Years \le 30$ (e.g., 15) $\implies$ Bonus Calculated.
- **Invalid Partition 2**: $Years > 30$ (e.g., 35, 100) $\implies$ Rejection.

### 2. Boundary Value Analysis (BVA):
Experience proves errors cluster at boundaries ($min, min+1, nom, max-1, max$):
- **Lower Boundary**: $0$ (Invalid), **$1$** (Boundary), $2$ (Valid).
- **Nominal Value**: $15$ (Valid).
- **Upper Boundary**: $29$ (Valid), **$30$** (Boundary), $31$ (Invalid).
- *Test Values:* **0, 1, 2, 15, 29, 30, 31**.

### Q3. [5 Marks] Explain Top-Down vs Bottom-Up Integration Testing Strategies.
**Model Answer:**
| Feature | Top-Down Integration | Bottom-Up Integration |
| :--- | :--- | :--- |
| **Starting Point** | Main control executive module | Lowest-level leaf modules |
| **Scaffolding Needed** | Requires **Stubs** to simulate lower children | Requires **Drivers** to simulate calling parents |
| **Early Advantage** | Major architectural control verified early | Critical low-level I/O & utility routines verified early |
| **Disadvantage** | Stubs are complex to mock realistically | System architecture is not seen until final integration |

### Q4. [5 Marks] Explain Software Maintenance Cost Distribution and Maintenance Process.
**Model Answer:**
### Software Maintenance Effort Distribution
Empirical software engineering data reveals that maintenance consumes **60% to 80%** of total lifecycle cost:
- **Perfective Maintenance**: **50% to 55%** (Continuous feature requests, UI upgrades).
- **Adaptive Maintenance**: **20% to 25%** (OS migrations, cloud deployment).
- **Corrective Maintenance**: **15% to 20%** (Bug fixes).
- **Preventive Maintenance**: **5%** (Code refactoring).

```
Change Request ---> Impact Analysis ---> Approval ---> Design Update ---> Regression Test ---> Baseline
```


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Solve a Comprehensive Software Reliability Problem Calculating MTTF, MTTR, MTBF, and Percentage Availability.
**Comprehensive University Solution:**
### University Examination Model Numerical Solution

**Operational System Metrics for a Web Server over 1 Year (8,760 Hours):**
- Total operational runtime observed: **8,760 hours**.
- During the year, the server experienced **6 unexpected crashes (failures)**.
- Total downtime spent diagnosing and repairing the 6 failures: **30 hours**.

### Step-by-Step Mathematical Derivations:

1. **Total Uptime**:
   $$\text{Uptime} = \text{Total Time} - \text{Downtime} = 8,760 - 30 = \mathbf{8,730 \text{ hours}}$$

2. **Mean Time To Failure (MTTF)**:
   $$MTTF = \frac{\text{Total Operational Uptime}}{\text{Number of Failures}} = \frac{8,730}{6} = \mathbf{1,455 \text{ hours}}$$

3. **Mean Time To Repair (MTTR)**:
   $$MTTR = \frac{\text{Total Repair Downtime}}{\text{Number of Failures}} = \frac{30}{6} = \mathbf{5 \text{ hours}}$$

4. **Mean Time Between Failures (MTBF)**:
   $$MTBF = MTTF + MTTR = 1,455 + 5 = \mathbf{1,460 \text{ hours}}$$

5. **Percentage Availability ($A$)**:
   $$A = \frac{MTTF}{MTBF} \times 100 = \frac{1,455}{1,460} \times 100 = \mathbf{99.657\%}$$

*The system satisfies 'Three Nines' availability standards.*

### Q2. [10/15 Marks] Explain Code Coverage Metrics in White-Box Testing (Statement, Branch, Condition, Path Coverage) with Code.
**Comprehensive University Solution:**
```c
// Code Segment to evaluate test coverage
int process_order(int stock, int is_vip) {
    int discount = 0;
    if (stock > 0) {            // Decision 1
        if (is_vip == 1) {      // Decision 2
            discount = 20;
        }
    }
    return discount;
}
```

### 1. Statement Coverage vs Branch Coverage Trap:
- **Test Case 1**: `stock = 10, is_vip = 1` $\implies$ Executes all lines! **100% Statement Coverage achieved!**
- **Vulnerability**: If `stock = 0`, an implicit else branch exists that was NEVER tested! Branch coverage is only **50%**.

### 2. Comprehensive Coverage Hierarchy:
1. **Statement Coverage**: Percentage of executable lines traversed.
2. **Branch (Decision) Coverage**: Every `if`/`else` branch evaluates to both TRUE and FALSE.
3. **Condition Coverage**: Each individual boolean sub-condition in a compound expression evaluates to TRUE and FALSE.
4. **Path Coverage**: Every distinct combination of paths from entry to exit is executed (most rigorous; required in aerospace).

### Q3. [10/15 Marks] Explain the Software Reengineering Lifecycle: Reverse Engineering, Code Restructuring, and Forward Engineering.
**Comprehensive University Solution:**
### The Software Reengineering Paradigm

```text
Legacy System                           Target System
=================                       =================
Legacy Source Code                      Modern Source Code
      |                                         ^
      | (Reverse Engineering)                   | (Forward Engineering)
      v                                         |
Design Abstractions === (Restructuring) ===> Modern Architecture
(DFDs, Call Graphs)                          (Clean Microservices)
```

### 3 Stages of Software Reengineering:
1. **Reverse Engineering**: Analyzing legacy binaries and unmaintained source code to extract high-level architectural designs, entity relationships, and business rules.
2. **Restructuring & Refactoring**: Removing code smells, eliminating dead code, transforming spaghetti code into modular functions, and migrating data schemas without altering business rules.
3. **Forward Engineering**: Re-implementing the modernized design using contemporary programming languages, frameworks, and modern automated CI/CD testing pipelines.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Solve the numerical problem for MTTF/MTTR/Availability, explain ECP/BVA with boundary values, and contrast Black-box vs White-box testing.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
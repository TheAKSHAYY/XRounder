# BCA-441E: Software Testing
## Unit 2 Master Exam Revision Notes: Approaches to Testing (White Box, Black Box, Gray Box and Integration)
**Target Examination:** MJPRU Bareilly BCA Semester 6 (CBCS Pattern 2024–25)
**Unit Identifier:** `8741448e-79a6-5f6f-8305-88fc28150f12` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Taxonomy of Testing Approaches: White Box vs Black Box vs Gray Box Testing**
- [x] **White Box Testing: Structural Testing, Code Visibility & Internal Logic Verification**
- [x] **Control Flow Testing: Statement Coverage, Decision/Branch Coverage & Condition Coverage**
- [x] **Path Coverage: Independent Execution Paths & Flow Graph Notation**
- [x] **Cyclomatic Complexity: McCabe's Formula (V(G) = E - N + 2P) & Test Case Derivation**
- [x] **Data Flow Testing: Definition-Use (DU) Chains, Variable Anomalies (UR, DD, DU)**
- [x] **Black Box Testing: Functional Testing, Specifications-Driven Without Code Access**
- [x] **Equivalence Class Partitioning (ECP): Valid and Invalid Input Equivalence Classes**
- [x] **Boundary Value Analysis (BVA): Normal, Robust, Extreme Boundary Testing (Min, Min+, Nom, Max-, Max)**
- [x] **Decision Table Testing & Cause-Effect Graphing for Complex Logical Business Rules**
- [x] **State Transition Testing & Use Case-Based Testing Techniques**
- [x] **Gray Box Testing: Combining Functional Understanding with Database/Architecture Insights**
- [x] **Unit Testing: Driver Modules, Stub Modules & Test Isolation**
- [x] **Integration Testing: Top-Down Approach with Stubs (Depth-First vs Breadth-First)**
- [x] **Integration Testing: Bottom-Up Approach with Drivers & Sandwich (Hybrid) Strategy**
- [x] **Big-Bang Integration: Limitations, Fault Isolation Hazards & Anti-Patterns**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define White Box Testing (Glass Box / Structural Testing).
**Model Answer:**
A testing methodology where the tester has complete visibility and access to internal program source code, architecture, and logic paths, designing test cases based on statements, branches, and conditions.

### Q2. [2 Marks] Define Black Box Testing (Behavioral / Specification-Based Testing).
**Model Answer:**
A testing methodology where the software is treated as an opaque black box with zero visibility into internal source code. Test cases are derived strictly from functional requirements and specifications.

### Q3. [2 Marks] What is Gray Box Testing?
**Model Answer:**
A hybrid testing approach where the tester has partial knowledge of internal structures, database schemas, or system architecture (e.g., verifying database state changes after submitting a GUI form).

### Q4. [2 Marks] Define Statement Coverage and its mathematical formula.
**Model Answer:**
Measures the proportion of executable source code statements executed by a test suite:
$$\text{Statement Coverage} = \frac{\text{Number of Executed Statements}}{\text{Total Number of Executable Statements}} \times 100\%$$

### Q5. [2 Marks] Define Branch / Decision Coverage.
**Model Answer:**
Measures whether every boolean decision branch (both `True` and `False` outcomes) in control flow structures (`if`, `while`, `switch`) has been executed by test cases:
$$\text{Branch Coverage} = \frac{\text{Number of Traversed Decision Outcomes}}{\text{Total Number of Decision Outcomes}} \times 100\%$$

### Q6. [2 Marks] What is Equivalence Partitioning (EP)?
**Model Answer:**
A black-box technique that divides the input domain into distinct partitions of equivalent data where the system is expected to behave identically, selecting one representative test case from each valid and invalid partition.

### Q7. [2 Marks] What is Boundary Value Analysis (BVA)?
**Model Answer:**
A black-box testing technique focused on testing values at the boundaries/edges of input partitions (Minimum, Just above Minimum, Nominal, Just below Maximum, Maximum), where defects disproportionately cluster.

### Q8. [2 Marks] What is Unit Testing?
**Model Answer:**
The testing of individual software units, functions, classes, or modules in complete isolation from the rest of the application, typically automated by developers using frameworks like JUnit or Jest.

### Q9. [2 Marks] Differentiate between a Test Stub and a Test Driver.
**Model Answer:**
- **Test Stub:** A dummy mock component that replaces a low-level module called by the unit under test (used in Top-Down integration).
- **Test Driver:** A dummy test harness that invokes and passes parameters to the module under test (used in Bottom-Up integration).

### Q10. [2 Marks] What is Big-Bang Integration Testing?
**Model Answer:**
A non-incremental integration strategy where all developed modules are combined simultaneously into a single build and tested as a whole. Disadvantage: Pinpointing the root cause of failures is exceptionally difficult.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare White Box Testing and Black Box Testing Across All Key Dimensions.
**Model Answer:**
| Dimension | White Box Testing | Black Box Testing |
| :--- | :--- | :--- |
| **Code Visibility** | Complete access to source code & logic | Zero access to internal source code |
| **Basis for Tests** | Control flow graphs, branch decisions | Requirements, user stories, specifications |
| **Performed By** | Developers & Specialized SDETs | Dedicated QA testers, business analysts |
| **Granularity** | Unit level, function level | System level, integration, acceptance |
| **Strengths** | Discovers dead code, hidden logic errors | Validates genuine user workflows |
| **Weaknesses** | Cannot detect missing requirements | Cannot identify unexercised hidden code paths |

### Q2. [5 Marks] Explain Integration Testing Strategies: Top-Down vs Bottom-Up vs Sandwich.
**Model Answer:**
### Integration Testing Hierarchies

```
          [ Module A (Root) ]
              /         \
   [ Module B ]         [ Module C ]
      /     \                 \
  [ Mod D ] [ Mod E ]      [ Mod F (Leaf) ]
```
1. **Top-Down Integration:** Starts from the top-level control module (A). Lower-level modules are simulated using **Stubs**. Verifies high-level system control logic early; stubs require significant coding effort.
2. **Bottom-Up Integration:** Starts with primitive leaf modules (D, E, F). Invoked via **Drivers**. Simplifies test harness construction; critical architectural design flaws are discovered late.
3. **Sandwich (Hybrid) Integration:** Combines Top-Down and Bottom-Up simultaneously, meeting at a predefined middle target layer. Minimizes total stub and driver development overhead.

### Q3. [5 Marks] Detail Boundary Value Analysis (BVA) with Concrete Numeric Range Example.
**Model Answer:**
### BVA Mathematical Example
Suppose a university admission system accepts age $X$ in the range $18 \le X \le 60$.
- **Valid Partition:** $[18, 60]$
- **Invalid Partitions:** $X < 18$ and $X > 60$

**Standard 2-Boundary Values Tested:**
1. $X = 17$ (Just below Minimum - Invalid)
2. $X = 18$ (Minimum - Valid Boundary)
3. $X = 19$ (Just above Minimum - Valid)
4. $X = 35$ (Nominal interior value - Valid)
5. $X = 59$ (Just below Maximum - Valid)
6. $X = 60$ (Maximum - Valid Boundary)
7. $X = 61$ (Just above Maximum - Invalid)
- **Rationale:** Off-by-one errors (using `<` instead of `<=`) are among the most common bugs in computer science.

### Q4. [5 Marks] Explain Decision Table Testing for Complex Business Logic.
**Model Answer:**
### Decision Table Structure (E-Commerce Discount Example)
```
+---------------------------+----+----+----+----+
| Conditions (Inputs)       | R1 | R2 | R3 | R4 |
+---------------------------+----+----+----+----+
| Order Total > $1000?      | Y  | Y  | N  | N  |
| Premium Member Loyalty?   | Y  | N  | Y  | N  |
+---------------------------+----+----+----+----+
| Actions (Outputs)         |    |    |    |    |
+---------------------------+----+----+----+----+
| Apply 20% Discount        | X  |    |    |    |
| Apply 10% Discount        |    | X  | X  |    |
| Standard Shipping ($10)   |    |    |    | X  |
+---------------------------+----+----+----+----+
```
- Systematically tests all $2^n$ combinations of conditions, guaranteeing that zero logical edge combinations are overlooked by QA.

### Q5. [5 Marks] Explain State Transition Testing for Finite State Machines (FSM).
**Model Answer:**
### State Transition Methodology
Used for event-driven systems transitioning between finite states (e.g., ATM card authentication, order checkout):
1. **States:** Logged Out, Logged In, Account Locked.
2. **Events/Transitions:** Enter Correct PIN $\to$ Logged In; Enter Wrong PIN (1st/2nd try) $\to$ Re-prompt; Enter Wrong PIN (3rd try) $\to$ Account Locked.
3. **State Transition Matrix:** Tabulates all valid and invalid transitions, testing both positive paths and negative transition rejection.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Provide the Complete Mathematical and Algorithmic Formulation of Thomas McCabe's Cyclomatic Complexity, Control Flow Graph Construction, and Basis Path Testing.
**Comprehensive University Solution:**
### McCabe's Cyclomatic Complexity Theory

```
        [ Node 1: Entry / x > 0? ]
               /          \
       (True) /            \ (False)
             v              v
      [ Node 2: y = 10 ]  [ Node 3: y = 20 ]
             \              /
              v            v
           [ Node 4: Exit ]
```

#### 1. Control Flow Graph (CFG) Definitions
A directed graph $G = (V, E)$ where:
- $V$: Nodes representing sequential statements or basic blocks.
- $E$: Directed edges representing control flow transfers between nodes.

#### 2. Three Equivalent Cyclomatic Complexity Formulas
1. **Formula 1 (Edges and Nodes):**
   $$V(G) = E - N + 2P$$
   where $E$ is edge count, $N$ is node count, and $P$ is connected components (typically $P=1$).
2. **Formula 2 (Predicate Nodes):**
   $$V(G) = P_{\text{pred}} + 1$$
   where $P_{\text{pred}}$ is the number of decision/predicate nodes containing binary conditions.
3. **Formula 3 (Enclosed Regions):**
   $$V(G) = R$$
   where $R$ is the number of planar bounded regions plus the 1 unbounded external region.

#### 3. Basis Path Testing Execution Steps
1. Draw the formal CFG from program source code.
2. Calculate $V(G)$. This number defines the **exact upper bound on the number of linearly independent paths** required to achieve 100% branch and statement coverage.
3. Identify a Basis Set of linearly independent execution paths through $G$.
4. Author test cases with inputs specifically engineered to execute each identified basis path.

### Q2. [10/15 Marks] Design and Implement an Automated White-Box and Black-Box Test Harness in Python using PyTest.
**Comprehensive University Solution:**
### Comprehensive PyTest Implementation

```python
import pytest

def calculate_ticket_price(age: int, is_student: bool) -> float:
    """
    Business Logic:
    - Age < 5: Free (0.0)
    - Age 5-17: Child ($10.0)
    - Age 18-59: Adult ($20.0), Students get 25% discount ($15.0)
    - Age >= 60: Senior ($12.0)
    """
    if age < 0 or age > 120:
        raise ValueError("Invalid age boundary")
    if age < 5:
        return 0.0
    elif age <= 17:
        return 10.0
    elif age <= 59:
        return 15.0 if is_student else 20.0
    else:
        return 12.0

# --- Black Box Boundary Value Analysis (BVA) Test Suite ---
@pytest.mark.parametrize("age, is_student, expected_price", [
    (0, False, 0.0),       # Min Valid Boundary
    (4, False, 0.0),       # Boundary: Under 5
    (5, False, 10.0),      # Boundary: Child Start
    (17, False, 10.0),     # Boundary: Child End
    (18, False, 20.0),     # Boundary: Adult Start
    (18, True, 15.0),      # Boundary: Student Discount
    (59, False, 20.0),     # Boundary: Adult End
    (60, False, 12.0),     # Boundary: Senior Start
    (120, False, 12.0),    # Boundary: Max Valid
])
def test_bva_pricing(age, is_student, expected_price):
    assert calculate_ticket_price(age, is_student) == expected_price

# --- Negative Partition Testing ---
@pytest.mark.parametrize("invalid_age", [-1, -50, 121, 200])
def test_invalid_boundaries(invalid_age):
    with pytest.raises(ValueError):
        calculate_ticket_price(invalid_age, False)
```

### Q3. [10/15 Marks] Analyze Integration Testing Dynamics: Top-Down vs Bottom-Up Stub/Driver Engineering Complexity.
**Comprehensive University Solution:**
### Integration Engineering Complexity Analysis

#### 1. Mathematical Stub Overhead in Top-Down
- In a tree-structured system of branching factor $b$ and depth $d$, testing root Module 1 requires writing $b$ stubs.
- Testing level $k$ requires mocking all unbuilt descendants at level $k+1$.
- Stubs often need complex state simulation (returning dynamic responses based on previous calls), inflating test maintenance costs.

#### 2. Driver Overhead in Bottom-Up
- Primitive modules require drivers to simulate environment setups, instantiate database connections, and inject test arguments.
- **Advantage:** Reusable in automated unit test suites.

#### 3. Continuous Integration (CI) Paradigm Shift
- Modern agile teams avoid prolonged monolithic integration phases by adopting **Continuous Integration (CI)**: micro-integrations occurring multiple times daily, automated via GitHub Actions with ephemeral containerized dependencies (Testcontainers), rendering manual big-bang integration obsolete.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently evaluate: Equivalence Partitioning & BVA numeric problems (10 marks), McCabe Cyclomatic Complexity formula and CFG (10/15 marks), and Stubs vs Drivers in Integration (5 marks).

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
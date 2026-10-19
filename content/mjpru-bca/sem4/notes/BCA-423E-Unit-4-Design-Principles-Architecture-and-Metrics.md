# BCA-423E: Software Engineering
## Unit 4 Master Exam Revision Notes: Software Design Principles, Architecture & Strategies
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `257f27a7-7fc7-5a7a-bf86-4827249b1d9e` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Software Design Concept: Transforming Analysis Model to Design Model, Design Quality Guidelines**
- [x] **Fundamental Design Concepts: Abstraction (Data, Procedural), Architecture, Modularity, Information Hiding (Parnas Principle)**
- [x] **Functional Independence: Cohesion and Coupling (The Golden Rule: High Cohesion and Low Coupling)**
- [x] **Types of Cohesion (Worst to Best): Coincidental, Logical, Temporal, Procedural, Communicational, Sequential, Functional Cohesion**
- [x] **Types of Coupling (Worst to Best): Content, Common (Global), Control, Stamp (Data Structure), Data, Uncoupled**
- [x] **Architectural Design Styles: Data-Centered (Repository/Blackboard), Data-Flow (Pipe-and-Filter), Call-and-Return, Layered Architecture, Client-Server**
- [x] **Structured Design Methodology: Structure Charts, Transform Analysis (Transform Center Flow) vs Transaction Analysis**
- [x] **Object-Oriented Design (OOD): SOLID Design Principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)**
- [x] **Design Patterns: Creational (Singleton, Factory Method), Structural (Adapter, Decorator), Behavioral (Observer, Strategy)**
- [x] **User Interface (UI) Design: Golden Rules (Theo Mandel - Place User in Control, Reduce Memory Load, Make UI Consistent), Usability Engineering**
- [x] **Design Specification and Verification: Design Walkthroughs, Critical Design Reviews (CDR), Design Translation Process (Mapping Design to Source Code)**
- [x] **Design Metrics: Architectural Complexity Metrics, Cyclomatic Complexity (Thomas McCabe: V(G) = E - N + 2P or P + 1)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the golden rule of modular design regarding Cohesion and Coupling?
**Model Answer:**
Software modules should possess **High Cohesion** (strong internal functional relatedness) and **Low (Loose) Coupling** (minimal interdependence between modules).

### Q2. [2 Marks] Who formulated the principle of Information Hiding?
**Model Answer:**
**David L. Parnas** in 1972: Modules should encapsulate implementation secrets and data structures behind stable abstract interfaces.

### Q3. [2 Marks] Name the seven levels of Cohesion from lowest (worst) to highest (best).
**Model Answer:**
1. Coincidental (worst)
2. Logical
3. Temporal
4. Procedural
5. Communicational
6. Sequential
7. **Functional (best)**

### Q4. [2 Marks] Name the seven levels of Coupling from tightest (worst) to loosest (best).
**Model Answer:**
1. Content Coupling (worst)
2. Common Coupling
3. External Coupling
4. Control Coupling
5. Stamp Coupling
6. **Data Coupling (best)**
7. Uncoupled

### Q5. [2 Marks] What is McCabe's Cyclomatic Complexity formula?
**Model Answer:**
$$V(G) = E - N + 2P$$
For a single connected component ($P=1$), $V(G) = E - N + 2 = P_r + 1$ (where $P_r$ is the count of predicate/decision nodes).

### Q6. [2 Marks] What does Cyclomatic Complexity represent for a test engineer?
**Model Answer:**
It represents the exact number of **linearly independent execution paths** through the program, establishing the upper bound on test cases needed for basis path coverage.

### Q7. [2 Marks] Differentiate between Transform Analysis and Transaction Analysis in structured design.
**Model Answer:**
- **Transform Analysis**: Used when DFD shows linear input, central transform, and output streams.
- **Transaction Analysis**: Used when DFD branches from a transaction dispatcher to parallel specialized action handlers.

### Q8. [2 Marks] Explain the Model-View-Controller (MVC) architectural pattern.
**Model Answer:**
- **Model**: Manages application state and business logic.
- **View**: Renders user interface.
- **Controller**: Accepts user inputs and updates Model/View.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the 7 Levels of Cohesion with Real-World Programming Examples.
**Model Answer:**
| Cohesion Level | Quality | Description | Concrete Code Example |
| :--- | :---: | :--- | :--- |
| **1. Functional** | **Highest (Best)** | Module executes single well-defined task | `calculate_square_root(x)` |
| **2. Sequential** | High | Output of one step is direct input to next | `parse_file() -> clean_tokens() -> write_output()` |
| **3. Communicational** | Moderate | Functions operate on same shared data | `update_student_record()` & `print_student_record()` |
| **4. Procedural** | Moderate | Tasks executed in specific procedural order | `check_auth() -> log_attempt() -> read_profile()` |
| **5. Temporal** | Weak | Grouped because executed at same time | `initialize_system()` (opens DB, sets fonts, resets timers) |
| **6. Logical** | Poor | Grouped by category; uses flag to select | `process_all(flag)` (if 1 prints, if 2 saves, if 3 emails) |
| **7. Coincidental** | **Lowest (Worst)** | Random arbitrary collection of tasks | `misc_utilities()` (validates credit card, draws circle) |

### Q2. [5 Marks] Explain the 7 Levels of Coupling with Real-World Programming Examples.
**Model Answer:**
| Coupling Level | Quality | Description | Hazard |
| :--- | :---: | :--- | :--- |
| **1. Data Coupling** | **Loosest (Best)** | Pass atomic primitive parameters (`int`, `str`) | Clean, isolated, reusable interfaces |
| **2. Stamp Coupling** | Moderate | Pass entire record/struct when only 1 field needed | Module depends on full record layout |
| **3. Control Coupling** | Poor | Pass flag directing internal execution branch | Caller must know callee internal control logic |
| **4. External Coupling** | Poor | Modules depend on external OS/hardware format | Hardware changes break multiple modules |
| **5. Common Coupling** | Very Poor | Multiple modules share global variables | Silent corruption across distant files |
| **6. Content Coupling** | **Tightest (Worst)**| Module directly modifies private data of another | Catastrophic maintenance breakdown |

### Q3. [5 Marks] Explain Structure Chart Notations and Symbols.
**Model Answer:**
### Structure Chart Elements
1. **Module Box**: Rectangle containing module name.
2. **Invocation Line**: Directed line from parent module pointing to child module.
3. **Data Couple**: Arrow with **Open Circle** ($-\circ\to$) denoting data passed.
4. **Control Couple (Flag)**: Arrow with **Filled Solid Dot** ($-\bullet\to$) denoting status flag.
5. **Conditional Branch**: Diamond symbol at root of invocation arrows.
6. **Repetitive Loop**: Curved semicircular arrow across invocation arrows.

### Q4. [5 Marks] Explain Object-Oriented Design Metrics (CK Metric Suite: WMC, DIT, NOC, CBO, RFC, LCOM).
**Model Answer:**
### Chidamber and Kemerer (CK) Metrics
- **WMC (Weighted Methods per Class)**: Sum of complexities of all methods in class. High WMC $\implies$ high maintenance effort.
- **DIT (Depth of Inheritance Tree)**: Max path from root to class. Deep DIT $\implies$ high reuse but complex debugging.
- **NOC (Number of Children)**: Count of direct immediate subclasses.
- **CBO (Coupling Between Objects)**: Count of other classes to which class is coupled. High CBO $\implies$ low reusability.
- **RFC (Response for a Class)**: Methods in class + methods invoked by them.
- **LCOM (Lack of Cohesion in Methods)**: Number of method pairs with zero shared instance variables.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Calculate Cyclomatic Complexity and Derive the Basis Path Test Suite for a Program Code Segment.
**Comprehensive University Solution:**
### McCabe's Cyclomatic Complexity Problem Solution

```c
// Function to classify student grades
void classify_grade(int marks) {
    if (marks >= 40) {              // Node 1 (Predicate)
        if (marks >= 75) {          // Node 2 (Predicate)
            printf("Distinction");  // Node 3
        } else {
            printf("Pass");         // Node 4
        }
    } else {
        printf("Fail");             // Node 5
    }
}                                   // Node 6 (Exit)
```

### 1. Construct Control Flow Graph (CFG):
- Nodes: $N = 6$ (1, 2, 3, 4, 5, 6)
- Edges: $E = 7$ ((1,2), (1,5), (2,3), (2,4), (3,6), (4,6), (5,6))
- Predicate Nodes: $P = 2$ (Node 1, Node 2)

### 2. Cyclomatic Complexity Formulations:
- **Formula 1**: $V(G) = E - N + 2 = 7 - 6 + 2 = \mathbf{3}$
- **Formula 2**: $V(G) = P + 1 = 2 + 1 = \mathbf{3}$
- **Formula 3**: Number of enclosed regions + 1 = $2 + 1 = \mathbf{3}$

### 3. Linearly Independent Basis Paths:
- **Path 1**: $1 \to 5 \to 6$ (Input marks = 30 $\implies$ 'Fail')
- **Path 2**: $1 \to 2 \to 4 \to 6$ (Input marks = 60 $\implies$ 'Pass')
- **Path 3**: $1 \to 2 \to 3 \to 6$ (Input marks = 85 $\implies$ 'Distinction')

*A test suite executing these 3 paths achieves 100% statement and branch coverage.*

### Q2. [10/15 Marks] Explain Architectural Styles: Layered, Client-Server, Pipe-and-Filter, and Model-View-Controller (MVC) with Diagrams.
**Comprehensive University Solution:**
### 1. Pipe-and-Filter Architecture

```text
[Raw Stream] ---> | Filter 1 | === Pipe ===> | Filter 2 | === Pipe ===> | Output |
                  (Lexer)                    (Parser)                    (Code Generator)
```
- Decoupled filters process incoming data streams independently (e.g., Unix CLI pipelines).

### 2. Layered (N-Tier) Architecture

```text
+-------------------------------------------------------+
| Presentation Layer (React / Web UI)                   |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
| Business Logic Layer (Spring Boot / Python Backend)   |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
| Data Access Layer (Hibernate / SQL ORM)               |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
| Database Layer (PostgreSQL / Oracle)                  |
+-------------------------------------------------------+
```
- Each layer interacts strictly with adjacent layers, isolating architectural modifications.

### Q3. [10/15 Marks] Explain SOLID Object-Oriented Design Principles with Code Demonstrations.
**Comprehensive University Solution:**
### The SOLID Principles
1. **S - Single Responsibility Principle (SRP)**: A class should have one reason to change.
2. **O - Open/Closed Principle (OCP)**: Open for extension, closed for modification.
3. **L - Liskov Substitution Principle (LSP)**: Derived types must be substitutable for base types.
4. **I - Interface Segregation Principle (ISP)**: Clients should not depend on interfaces they do not use.
5. **D - Dependency Inversion Principle (DIP)**: Depend on abstractions, not concretions.

```python
# Demonstrating OCP and DIP
from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

class UpiPayment(PaymentProcessor):
    def pay(self, amount):
        print(f"Paid Rs. {amount} via UPI QR.")

class CreditCardPayment(PaymentProcessor):
    def pay(self, amount):
        print(f"Paid Rs. {amount} via Credit Card.")

# High-level module depends on abstraction (DIP)
class CheckoutService:
    def __init__(self, processor: PaymentProcessor):
        self.processor = processor
    def checkout(self, amount):
        self.processor.pay(amount)
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Master the 7 levels of cohesion and coupling, McCabe's Cyclomatic Complexity calculation, and SOLID principles.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
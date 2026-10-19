# BCA-423E: Software Engineering
## Unit 2 Master Exam Revision Notes: Requirements Analysis, Specification (SRS) & Modeling
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `08a5e1de-2fb0-5799-936e-4073b00b027d` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Requirements Engineering Process: Inception, Elicitation, Elaboration, Negotiation, Specification, Validation, Management**
- [x] **Requirements Elicitation Techniques: Interviews, Questionnaires, FAST (Facilitated Application Specification Techniques), JAD, Brainstorming**
- [x] **Types of Requirements: Functional Requirements (User Interactions, System Behaviors) vs Non-Functional Requirements (Performance, Security, Reliability)**
- [x] **Software Requirements Specification (SRS): Meaning, Importance, Target Audience, IEEE 830 Recommended Practice for SRS**
- [x] **Characteristics of a Good SRS: Correct, Unambiguous, Complete, Consistent, Ranked for Importance/Stability, Verifiable, Modifiable, Traceable**
- [x] **Specification Languages & Formal Methods: Natural Language, Structured English, Z-Notation, Finite State Machines (FSM)**
- [x] **Requirements Validation: Requirements Reviews, Walkthroughs, Audits, Prototyping, Acceptance Test Generation**
- [x] **Requirements Monitoring and Control: Requirements Traceability Matrix (RTM - Forward and Backward Traceability), Change Control Boards (CCB)**
- [x] **Structured Analysis Modeling: Data Flow Diagrams (DFD - Level 0 Context Diagram, Level 1, Level 2 Decomposition Rules), Data Dictionaries**
- [x] **Entity-Relationship Diagrams (ERD) in Requirements Modeling: Entities, Attributes, Relationships, Cardinality**
- [x] **Object-Oriented Analysis (OOA) Modeling with UML: Use Case Diagrams (Actors, Use Cases, <<include>>, <<extend>> Relationships)**
- [x] **UML Structural and Behavioral Diagrams: Class Diagrams, Sequence Diagrams, Statechart Diagrams, Activity Diagrams**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the primary objective of an SRS document according to IEEE 830?
**Model Answer:**
An SRS (Software Requirements Specification) completely describes the external behavior, functional capabilities, and performance constraints of a software system before design begins.

### Q2. [2 Marks] Name five essential characteristics of a good SRS.
**Model Answer:**
1. **Unambiguous**: Only one interpretation possible.
2. **Complete**: Covers all scenarios, inputs, responses.
3. **Consistent**: No contradictory requirements.
4. **Verifiable**: An objective test can prove fulfillment.
5. **Traceable**: Origin and downstream implementation can be tracked.

### Q3. [2 Marks] Differentiate between Functional and Non-Functional Requirements.
**Model Answer:**
- **Functional**: Specific features, computations, and services the software must perform (e.g., 'User can generate a PDF report').
- **Non-Functional**: Quality attributes, performance benchmarks, and security constraints (e.g., 'Page loads in < 1.5 seconds under 5,000 concurrent sessions').

### Q4. [2 Marks] What are the four primary symbols used in Data Flow Diagrams (DFDs)?
**Model Answer:**
1. **Process (Circle / Bubble)**: Transforms incoming data flows into outgoing data flows.
2. **Data Store (Two parallel lines)**: Storage repository where data rests.
3. **External Entity (Rectangle)**: Outside producer or consumer of information.
4. **Data Flow (Directed Arrow)**: Pathway carrying data packets.

### Q5. [2 Marks] What is a Context Diagram (Level 0 DFD)?
**Model Answer:**
The highest conceptual overview of a system showing the entire application as a single process bubble interacting with surrounding external entities.

### Q6. [2 Marks] What is a Data Dictionary?
**Model Answer:**
A structured metadata repository defining the syntax, structure, elementary data elements, aliases, and validation constraints for every data item in the system.

### Q7. [2 Marks] In Data Dictionary notation, what do `+`, `[ | ]`, `{ }`, and `( )` mean?
**Model Answer:**
- `+`: Sequence (concatenation).
- `[ | ]`: Selection (choice between alternatives).
- `{ }`: Iteration (repetition zero or more times).
- `( )`: Optional component.

### Q8. [2 Marks] Differentiate between `<<include>>` and `<<extend>>` in UML Use Case Diagrams.
**Model Answer:**
- `<<include>>`: Mandatory sub-routine; base use case cannot complete without executing it.
- `<<extend>>`: Optional/conditional behavior triggered only when specific extension point conditions are met.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain DFD Balancing and Common DFD Construction Errors (Black Hole, Miracle, Gray Hole).
**Model Answer:**
### 1. DFD Level Balancing Principle
Data flows entering and leaving a parent process bubble in a high-level DFD must exactly match the external input and output data flows in its child decomposed DFD.

### 2. Common DFD Errors:
- **Black Hole**: A process that receives input data flows but produces **NO output data flows**.
- **Miracle**: A process that produces output data flows without having **ANY input data flows**.
- **Gray Hole**: Output requires information that is not available in incoming input flows.
- **Direct Data Store to Data Store link**: Illegal without intervening process.
- **Direct Entity to Data Store link**: Illegal without intervening process.

### Q2. [5 Marks] Explain Decision Tables: Structure, Types, and Reduction Rules.
**Model Answer:**
### Decision Table Structure (4 Quadrants)

| | Rules: Rule 1 | Rule 2 | Rule 3 |
| :--- | :---: | :---: | :---:: |
| **Condition Stub** | Age >= 18?<br>Has Driving License? | Y<br>Y | Y<br>N | N<br>- |
| **Action Stub** | Issue Rental Car<br>Reject Application | **X**<br>- | -<br>**X** | -<br>**X** |

- Upper Left: Condition Stub (List of condition questions).
- Upper Right: Condition Entries (Y/N patterns; total $2^N$ for $N$ conditions).
- Lower Left: Action Stub (Possible actions).
- Lower Right: Action Entries (X marks executed actions).
- **Rule Reduction**: If two rules yield identical actions and differ by only one condition, that condition is redundant and combined with a hyphen (`-`).

### Q3. [5 Marks] Explain Object-Oriented Analysis (OOA): Object, Dynamic, and Functional Models (OMT Methodology).
**Model Answer:**
### James Rumbaugh's OMT (Object Modeling Technique)
1. **Object Model (Static Structure)**: Identifies classes, attributes, operations, associations, inheritance, and aggregations (Class Diagrams).
2. **Dynamic Model (Behavior over Time)**: Depicts reactive states, events, state transitions, and actions (Statechart & Sequence Diagrams).
3. **Functional Model (Data Transformations)**: Captures computations, input-output relationships, and data dependencies (DFD / Activity Diagrams).

### Q4. [5 Marks] Explain Requirements Validation Techniques (Reviews, Walkthroughs, Inspections, Prototyping).
**Model Answer:**
- **Requirements Reviews**: Structured committee meetings of analysts and clients checking compliance.
- **Walkthroughs**: Informal author-led peer tour through the SRS to uncover ambiguities.
- **Formal Inspections (Fagan)**: Rigorous formal inspection with checklists, defect logging, and metrics.
- **Prototyping**: Building interactive mockups to validate expected behavior against user mental models.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Construct a Complete Level 0 (Context Diagram) and Level 1 DFD for an Online Library Management System.
**Comprehensive University Solution:**
### Online Library Management System DFD

### 1. Level 0: Context Diagram

```text
+---------------+           Book Request / Student Credentials           +-------------+
|               | -----------------------------------------------------> |             |
|    STUDENT    |                                                        |   LIBRARY   |
|   (Entity)    | <----------------------------------------------------- | MANAGEMENT  |
+---------------+              Issued Book Details / Fine Receipt        |   SYSTEM    |
                                                                         |  (Process 0)|
+---------------+           Book Catalog Updates / Vendor Invoices       |             |
|   LIBRARIAN   | -----------------------------------------------------> |             |
|   (Entity)    | <----------------------------------------------------- |             |
+---------------+              Inventory & Overdue Borrowers Report      +-------------+
```

### 2. Level 1: Decomposed DFD

```text
[Student] ----> (1.0 Authenticate Student) <==== [Student DB]
                     |
             Verified Student Token
                     v
                (2.0 Search & Reserve Book) <==== [Books DB]
                     |
             Reservation Slip
                     v
                (3.0 Issue / Return Book) <==== [Borrow Records DB]
                     |
              Overdue Days
                     v
                (4.0 Compute Fine & Receipt) ----> [Student Receipt]
```

### Q2. [10/15 Marks] Draft a Formal SRS Document Outline Strictly Adhering to the IEEE 830 Standard.
**Comprehensive University Solution:**
### IEEE 830 Standard SRS Architecture

```text
1. Introduction
   1.1 Purpose of the Document
   1.2 Document Conventions & Formatting
   1.3 Intended Audience & Reading Suggestions
   1.4 Project Scope & Business Objectives
   1.5 References (Standards, Policies)

2. Overall Description
   2.1 Product Perspective (Context diagram, System interfaces)
   2.2 Product Features & Functional Summary
   2.3 User Classes and Characteristics
   2.4 Operating Environment (Hardware, OS, Network specs)
   2.5 Design and Implementation Constraints (Statutory, Language)
   2.6 User Documentation (User manuals, Online tutorials)
   2.7 Assumptions and Dependencies

3. External Interface Requirements
   3.1 User Interfaces (Screen layouts, Menus)
   3.2 Hardware Interfaces (Supported devices, Protocols)
   3.3 Software Interfaces (Database drivers, OS APIs)
   3.4 Communications Interfaces (HTTPS, WebSockets, Encryption)

4. System Features (Functional Requirements)
   4.1 Feature 1: User Registration & Authentication
       4.1.1 Description and Priority
       4.1.2 Stimulus/Response Sequences
       4.1.3 Functional Requirements Specifications
   4.2 Feature 2: Financial Transaction Processing

5. Other Non-Functional Requirements
   5.1 Performance Requirements (Latency, Throughput)
   5.2 Safety & Security Requirements (MFA, RBAC)
   5.3 Software Quality Attributes (Availability 99.9%, Portability)

6. Other Requirements & Appendices (Data Dictionary, Analysis Models)
```

### Q3. [10/15 Marks] Explain UML Sequence Diagrams and Activity Diagrams with Concrete E-Commerce Checkout Examples.
**Comprehensive University Solution:**
### 1. Sequence Diagram: E-Commerce Order Placement

```text
User          WebBrowser         OrderService       PaymentGateway       InventoryDB
 |                |                    |                   |                   |
 |--- PlaceOrder->|                    |                   |                   |
 |                |--- submitOrder() ->|                   |                   |
 |                |                    |--- checkStock() --------------------->|
 |                |                    |<-- stockAvailable --------------------|
 |                |                    |                   |                   |
 |                |                    |--- processPay() ->|                   |
 |                |                    |<-- paySuccess ----|                   |
 |                |                    |                   |                   |
 |                |                    |--- deductStock() -------------------->|
 |                |<-- orderConfirmed -|                   |                   |
 |<-- DisplayPage-|                    |                   |                   |
```

### 2. Activity Diagram: Order Processing Workflow
- **Initial Node** $\to$ [Select Items] $\to$ [Enter Shipping Address] $\to$ **Fork Bar**:
  - Branch 1: [Send Confirmation Email]
  - Branch 2: [Pack Physical Warehouse Box]
- **Join Bar** (waits for both) $\to$ [Dispatch Courier] $\to$ **Final Node**.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Practice drawing DFD Level 0 and Level 1 with balanced flows and memorize the IEEE 830 SRS table of contents.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
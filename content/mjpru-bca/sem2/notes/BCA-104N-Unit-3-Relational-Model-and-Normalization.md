# BCA-104N: Introduction to Database System
## Unit 3 Master Exam Revision Notes: Relational Data Model, Constraints & Normalization
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `a62a03f9-7839-40fa-99b3-2bd54a85c960` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Relational Model Concepts: Relations, Tuples, Attributes, Cardinality, Degree & Domain**
- [x] **Relational Integrity Constraints: Domain Constraints, Key Constraints, Entity Integrity Constraint**
- [x] **Referential Integrity Constraint & Foreign Keys (CASCADE, SET NULL, RESTRICT Actions)**
- [x] **Functional Dependency (FD): Definition, Trivial vs Non-Trivial FDs, Armstrong's Axioms**
- [x] **Closure of Attribute Sets and Candidate Key Determination**
- [x] **Database Anomalies: Insertion, Deletion, and Modification/Update Anomalies**
- [x] **Normalization: First Normal Form (1NF) - Elimination of Multi-Valued Attributes**
- [x] **Second Normal Form (2NF) - Elimination of Partial Functional Dependencies**
- [x] **Third Normal Form (3NF) - Elimination of Transitive Dependencies**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define Tuple, Attribute, Degree, and Cardinality in Relational Model.
**Model Answer:**
- **Tuple:** A single row in a relation representing an entity record.
- **Attribute:** A named column representing a property.
- **Degree:** The total number of attributes (columns) in a relation.
- **Cardinality:** The total number of tuples (rows) in a relation.

### Q2. [2 Marks] Explain Entity Integrity Constraint and Referential Integrity Constraint.
**Model Answer:**
- **Entity Integrity:** No primary key attribute value can be NULL.
- **Referential Integrity:** A foreign key in a referencing relation must either match an existing primary key value in the referenced relation or be completely NULL.

### Q3. [2 Marks] What are Foreign Key action options (CASCADE, SET NULL, RESTRICT)?
**Model Answer:**
- **ON DELETE CASCADE:** Automatically deletes child rows when the parent row is deleted.
- **ON DELETE SET NULL:** Sets foreign key column in child rows to NULL when parent is deleted.
- **ON DELETE RESTRICT / NO ACTION:** Rejects parent deletion if child references exist.

### Q4. [2 Marks] Define Functional Dependency (FD) and differentiate Trivial vs Non-Trivial FD.
**Model Answer:**
An FD `X -> Y` holds on relation `R` if whenever two tuples have identical values for attribute set `X`, they must have identical values for attribute set `Y`.
- **Trivial FD:** `Y ⊆ X` (e.g., `(Roll_No, Name) -> Roll_No`).
- **Non-Trivial FD:** `Y` is not a subset of `X` (e.g., `Roll_No -> Name`).

### Q5. [2 Marks] State Armstrong's Axioms of Functional Dependency.
**Model Answer:**
1. **Reflexivity:** If `Y ⊆ X`, then `X -> Y`.
2. **Augmentation:** If `X -> Y`, then `XZ -> YZ`.
3. **Transitivity:** If `X -> Y` and `Y -> Z`, then `X -> Z`.

### Q6. [2 Marks] What is the Attribute Closure (X+) and how is it used to find Candidate Keys?
**Model Answer:**
The attribute closure `X+` is the set of all attributes functionally determined by `X` under given FDs. If `X+` contains all attributes of relation `R`, then `X` is a **Super Key**. If no proper subset of `X` is a super key, `X` is a **Candidate Key**.

### Q7. [2 Marks] Identify the three types of Database Anomalies.
**Model Answer:**
1. **Insertion Anomaly:** Inability to record certain facts without adding unrelated dummy data.
2. **Deletion Anomaly:** Deletion of certain data accidentally removes other unrelated critical facts.
3. **Update (Modification) Anomaly:** Updating data in one place leaves conflicting old copies elsewhere.

### Q8. [2 Marks] State the definitions of First, Second, and Third Normal Forms (1NF, 2NF, 3NF).
**Model Answer:**
- **1NF:** Every attribute contains only atomic (indivisible) values; no repeating groups.
- **2NF:** Relation is in 1NF and contains **no Partial Dependencies** (every non-prime attribute is fully functionally dependent on the entire candidate key).
- **3NF:** Relation is in 2NF and contains **no Transitive Dependencies** (no non-prime attribute depends on another non-prime attribute: for every `X -> Y`, `X` is a super key or `Y` is a prime attribute).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Given relation `R(A, B, C, D, E)` with FDs: `F = { A -> BC, CD -> E, B -> D, E -> A }`. Compute closures and find all Candidate Keys of `R`.
**Model Answer:**
### 1. Compute Attribute Closures
- `A+`:
  - Start: `{A}`
  - Apply `A -> BC`: `{A, B, C}`
  - Apply `B -> D`: `{A, B, C, D}`
  - Apply `CD -> E`: `{A, B, C, D, E}`
  Since `A+ = {A, B, C, D, E}`, **`A` is a Candidate Key**.
- `E+`:
  - Start: `{E}`
  - Apply `E -> A`: `{E, A}`
  - Since `A+` includes all attributes, `E+ = {A, B, C, D, E}`. **`E` is a Candidate Key**.
- `(CD)+`:
  - Start: `{C, D}`
  - Apply `CD -> E`: `{C, D, E}`
  - Apply `E -> A`: `{A, C, D, E}`
  - Apply `A -> BC`: `{A, B, C, D, E}`. **`CD` is a Candidate Key**.
- `(BC)+`:
  - Start: `{B, C}`
  - Apply `B -> D`: `{B, C, D}`
  - Since `(CD)+` derives all attributes, `(BC)+ = {A, B, C, D, E}`. **`BC` is a Candidate Key**.

### 2. Candidate Keys of R
The Candidate Keys are: **`A`**, **`E`**, **`BC`**, and **`CD`**.

### Q2. [5 Marks] Explain Partial Functional Dependency and illustrate 2NF decomposition with a concrete example.
**Model Answer:**
### 1. Partial Dependency Defined
A partial dependency occurs when a non-prime attribute is dependent on only a part of a composite candidate key, violating 2NF.

### 2. Example
Consider relation `STUDENT_COURSE_SCORE`:
- Schema: `(Student_ID, Course_ID, Student_Name, Marks)`
- Primary Key: `(Student_ID, Course_ID)`
- FDs:
  1. `(Student_ID, Course_ID) -> Marks` (Full dependency on compound key)
  2. `Student_ID -> Student_Name` (**Partial Dependency**: `Student_Name` depends only on `Student_ID`).

### 3. Decomposition into 2NF
Decompose into two relations eliminating partial dependency:
1. `STUDENT` ( **Student_ID**, Student_Name )
2. `COURSE_SCORE` ( ***Student_ID***, ***Course_ID***, Marks )


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Explain Database Normalization in complete detail. Walk through an unnormalized table and decompose it systematically through 1NF, 2NF, and 3NF, explaining the elimination of anomalies at each stage.
**Comprehensive University Solution:**
### 1. Purpose of Normalization
Normalization is the systematic process of organizing relational database tables to minimize data redundancy and eliminate insertion, update, and deletion anomalies while preserving functional dependencies and lossless joins.

### 2. Unnormalized Table (UNF)
Consider an employee project assignment sheet:
`EMP_PROJ(Emp_ID, Emp_Name, Dept_ID, Dept_Name, {Project_ID, Project_Name, Hours})`
Here, projects are repeating multi-valued groups for each employee.

### 3. Step 1: Conversion to 1NF (Atomicity)
- **Rule:** Eliminate repeating groups and multivalued attributes so every cell holds an atomic value.
- **1NF Schema:** `EMP_PROJ_1NF(Emp_ID, Emp_Name, Dept_ID, Dept_Name, Project_ID, Project_Name, Hours)`
- **Candidate Key:** `(Emp_ID, Project_ID)`
- **Identified FDs:**
  - `(Emp_ID, Project_ID) -> Hours` (Full Key dependency)
  - `Emp_ID -> Emp_Name, Dept_ID, Dept_Name` (Partial dependency on `Emp_ID`)
  - `Project_ID -> Project_Name` (Partial dependency on `Project_ID`)
  - `Dept_ID -> Dept_Name` (Transitive dependency via `Dept_ID`)
- **Anomalies in 1NF:** We cannot add an employee with no project (Insertion Anomaly); deleting a project deletes the employee (Deletion Anomaly).

### 4. Step 2: Conversion to 2NF (Elimination of Partial Dependencies)
- **Rule:** Every non-prime attribute must depend on the whole candidate key.
- **Decomposition:**
  1. `PROJECT` ( **Project_ID**, Project_Name )
  2. `EMP_DEPT` ( **Emp_ID**, Emp_Name, Dept_ID, Dept_Name )
  3. `EMP_ASSIGNMENT` ( ***Emp_ID***, ***Project_ID***, Hours )
Now, all three tables are in 2NF.

### 5. Step 3: Conversion to 3NF (Elimination of Transitive Dependencies)
- In table `EMP_DEPT`:
  `Emp_ID -> Dept_ID` and `Dept_ID -> Dept_Name`.
  Therefore, `Emp_ID -> Dept_Name` is a **Transitive Dependency** (non-key attribute depends on non-key attribute).
- **Rule:** For every non-trivial FD `X -> Y`, `X` must be a super key or `Y` must be a prime attribute.
- **Decomposition of `EMP_DEPT`:**
  1. `DEPARTMENT` ( **Dept_ID**, Dept_Name )
  2. `EMPLOYEE` ( **Emp_ID**, Emp_Name, *Dept_ID* )

### 6. Final Normalized 3NF Database Schema
1. `EMPLOYEE` ( **Emp_ID**, Emp_Name, *Dept_ID* )
2. `DEPARTMENT` ( **Dept_ID**, Dept_Name )
3. `PROJECT` ( **Project_ID**, Project_Name )
4. `EMP_ASSIGNMENT` ( ***Emp_ID***, ***Project_ID***, Hours )
All redundancy and anomalies are completely eliminated.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-104N Unit 3, candidate key determination using attribute closures and a full walkthrough of 1NF -> 2NF -> 3NF decomposition with table examples are the most heavily weighted topics in university exams. Always write the mathematical definitions of 1NF, 2NF, and 3NF before working through an example.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
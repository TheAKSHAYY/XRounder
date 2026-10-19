# BCA-104N: Introduction to Database System
## Unit 2 Master Exam Revision Notes: Entity-Relationship (E-R) Modeling & Conceptual Design
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `c5f7f235-66b4-40e5-90a1-c51017b09cef` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **E-R Modeling Concepts: Entity Types, Entity Sets, Weak Entities vs Strong Entities**
- [x] **Attributes: Simple, Composite, Single-Valued, Multi-Valued, Stored, Derived & Key Attributes**
- [x] **Relationship Types & Degrees: Unary (Recursive), Binary, Ternary Relationships**
- [x] **Mapping Cardinalities: One-to-One (1:1), One-to-Many (1:N), Many-to-One (N:1), Many-to-Many (M:N)**
- [x] **Participation Constraints: Total Participation vs Partial Participation**
- [x] **E-R Diagram Notations: Symbols, Entities, Attributes, Relationships & Roles**
- [x] **Database Design using E-R Diagrams: Real-world Case Studies (University, Hospital, Banking)**
- [x] **Reduction of E-R Schemas to Relational Tables with Integrity Rules**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define an Entity, Entity Type, and Entity Set in E-R modeling.
**Model Answer:**
- **Entity:** A distinguishable real-world object or concept (e.g., student John).
- **Entity Type:** A collection of entities sharing identical attributes (e.g., `STUDENT`).
- **Entity Set:** The current collection of all entities of an entity type in the database at a specific instant.

### Q2. [2 Marks] Differentiate between Strong Entity Set and Weak Entity Set.
**Model Answer:**
- **Strong Entity Set:** Has a primary key sufficient to uniquely identify its entities independently (represented by a single rectangle).
- **Weak Entity Set:** Lacks a primary key of its own; relies on an **identifying owner entity** and a **partial key (discriminator)** (represented by a double rectangle).

### Q3. [2 Marks] Explain Simple vs Composite and Single-Valued vs Multi-Valued Attributes.
**Model Answer:**
- **Simple:** Atomic, indivisible (e.g., `Age`, `Salary`).
- **Composite:** Can be divided into smaller subparts (e.g., `Name` into `First_Name`, `Last_Name`).
- **Single-Valued:** Holds a single value per entity (e.g., `DOB`).
- **Multi-Valued:** Can hold multiple values for a single entity (e.g., `Phone_Numbers`, `Degrees`; drawn as double ellipse).

### Q4. [2 Marks] Define Stored and Derived Attributes with examples.
**Model Answer:**
- **Stored:** Saved directly in physical storage (e.g., `Date_of_Birth`).
- **Derived:** Computed dynamically on demand from stored attributes (e.g., `Age = Current_Date - Date_of_Birth`; drawn as dashed ellipse).

### Q5. [2 Marks] Explain Relationship Degree: Unary, Binary, and Ternary relationships.
**Model Answer:**
- **Unary (Recursive):** An entity set relates to itself (e.g., `EMPLOYEE` manages `EMPLOYEE`).
- **Binary:** Relates two distinct entity sets (e.g., `STUDENT` enrolls in `COURSE`).
- **Ternary:** Relates three entity sets simultaneously (e.g., `SUPPLIER` supplies `PART` for `PROJECT`).

### Q6. [2 Marks] Define Mapping Cardinalities (1:1, 1:N, N:1, M:N).
**Model Answer:**
Cardinality ratio expresses the number of entity instances to which another entity instance can be associated via a relationship set: One-to-One, One-to-Many, Many-to-One, or Many-to-Many.

### Q7. [2 Marks] Differentiate Total Participation from Partial Participation.
**Model Answer:**
- **Total Participation (Existence Dependency):** Every entity in the set must participate in at least one relationship instance (drawn as double lines).
- **Partial Participation:** Some entities may not participate in any relationship instance (drawn as single line).

### Q8. [2 Marks] State the standard E-R Diagram symbols for Entity, Weak Entity, Attribute, Key Attribute, and Relationship.
**Model Answer:**
- **Entity:** Rectangle | **Weak Entity:** Double Rectangle
- **Attribute:** Ellipse | **Key Attribute:** Ellipse with underlined text
- **Multi-valued Attribute:** Double Ellipse | **Derived Attribute:** Dashed Ellipse
- **Relationship:** Diamond | **Identifying Relationship:** Double Diamond


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the step-by-step Rules for Reducing an E-R Diagram into Relational Tables.
**Model Answer:**
1. **Strong Entity Set:** Becomes a table with all simple attributes; key attribute becomes Primary Key.
2. **Composite Attributes:** Flatten into individual simple column components.
3. **Multi-valued Attribute:** Becomes a separate table containing `(Foreign_Key_to_Owner, Multi_Valued_Attribute)`, with compound primary key.
4. **Weak Entity Set:** Becomes a table containing its own partial discriminator plus the Primary Key of identifying strong entity as Foreign Key.
5. **1:1 Relationship:** Place the primary key of one side as a foreign key into the table of the other side (preferably the side with total participation).
6. **1:N Relationship:** Place the primary key of the '1' side as a Foreign Key into the table of the 'N' side.
7. **M:N Relationship:** Becomes a distinct **Bridge (Junction) Table** whose primary key is the combination of primary keys from both participating entity sets.

### Q2. [5 Marks] Design an E-R Schema for a University Management System.
**Model Answer:**
### 1. Participating Entity Sets & Attributes
- **STUDENT:** `Roll_No` (PK), `Name` (`Fname`, `Lname`), `DOB`, `Age` (Derived), `{Phone_No}` (Multivalued).
- **DEPARTMENT:** `Dept_Code` (PK), `Dept_Name`, `Office_Location`.
- **COURSE:** `Course_ID` (PK), `Title`, `Credits`.
- **PROFESSOR:** `Emp_ID` (PK), `Name`, `Designation`, `Salary`.

### 2. Relationships & Cardinalities
- `STUDENT` **Belongs_To (N:1)** `DEPARTMENT` (Total participation for Student).
- `PROFESSOR` **Works_In (N:1)** `DEPARTMENT`.
- `PROFESSOR` **Teaches (1:N)** `COURSE`.
- `STUDENT` **Enrolls_In (M:N)** `COURSE` with attribute `Grade`.
- `PROFESSOR` **Heads (1:1)** `DEPARTMENT`.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Construct a comprehensive, end-to-end Enterprise E-R Diagram for a Hospital Management System and reduce it completely into Relational Tables with primary and foreign keys.
**Comprehensive University Solution:**
### 1. Requirements & Entities
- **PATIENT:** `Patient_ID` (PK), `Name`, `Address`, `DOB`, `Blood_Group`.
- **DOCTOR:** `Doctor_ID` (PK), `Doctor_Name`, `Specialization`, `Phone`.
- **DEPARTMENT:** `Dept_ID` (PK), `Dept_Name`, `Building`.
- **ROOM / BED:** `Room_No` (PK), `Room_Type` (ICU, General), `Charge_Per_Day`.
- **TREATMENT_RECORD (Weak Entity):** Dependent on `PATIENT`. Discriminator: `Record_No`. Attributes: `Diagnosis`, `Date`.

### 2. Relationships
- `DOCTOR` **Works_In (N:1)** `DEPARTMENT`.
- `DOCTOR` **Treats (M:N)** `PATIENT` (Descriptive attribute: `Consultation_Fee`).
- `PATIENT` **Assigned_To (N:1)** `ROOM` (Descriptive attributes: `Admit_Date`, `Discharge_Date`).
- `PATIENT` **Has (1:N)** `TREATMENT_RECORD` (Identifying relationship).

### 3. Relational Table Schema Reduction
1. `DEPARTMENT` ( **Dept_ID**, Dept_Name, Building )
2. `DOCTOR` ( **Doctor_ID**, Doctor_Name, Specialization, Phone, *Dept_ID* )
   - *Dept_ID* references `DEPARTMENT(Dept_ID)`.
3. `ROOM` ( **Room_No**, Room_Type, Charge_Per_Day )
4. `PATIENT` ( **Patient_ID**, Name, Address, DOB, Blood_Group, *Room_No*, Admit_Date, Discharge_Date )
   - *Room_No* references `ROOM(Room_No)`.
5. `DOCTOR_PATIENT_TREATS` ( ***Doctor_ID***, ***Patient_ID***, Consultation_Fee )
   - Compound PK: `(Doctor_ID, Patient_ID)` referencing respective parent tables.
6. `TREATMENT_RECORD` ( ***Patient_ID***, ***Record_No***, Diagnosis, Date )
   - Compound PK: `(Patient_ID, Record_No)` referencing `PATIENT(Patient_ID)`.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-104N Unit 2, designing an E-R diagram for a University, Bank, or Hospital and reducing it to Relational Tables with underlined primary keys and italicized foreign keys is a 10–15 mark staple. Always explicitly state all reduction rules used.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
# BCA-104N: Introduction to Database System
## Unit 5 Master Exam Revision Notes: Database Security, Integrity, Control & Recent Trends
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `0ec279fb-4293-4eef-ac5d-1896e25d5b9c` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Database Security Threats: SQL Injection, Unauthorized Access, Privilege Abuse, Data Loss**
- [x] **Defense Mechanisms: Authentication, Authorization, Role-Based Access Control (RBAC), Data Encryption**
- [x] **Granting and Revoking Privileges: GRANT and REVOKE SQL Statements**
- [x] **Transaction Concepts: ACID Properties (Atomicity, Consistency, Isolation, Durability)**
- [x] **Concurrency Control Overview: Lock-Based Protocols, Deadlocks & Recovery Techniques**
- [x] **Recent Trends in DBMS: Distributed Databases (Architecture, Fragmentation, Replication)**
- [x] **Deductive Databases & Rule-Based Query Evaluation**
- [x] **NoSQL Databases & Big Data Storage Overview**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] State and explain the ACID Properties of database transactions.
**Model Answer:**
- **Atomicity:** All operations of a transaction succeed completely or none do ('All or Nothing').
- **Consistency:** Execution of a transaction preserves database integrity invariants.
- **Isolation:** Concurrent transactions execute without interfering with one another.
- **Durability:** Once committed, updates persist permanently even in the event of power crash.

### Q2. [2 Marks] What is SQL Injection (SQLi) and how is it prevented?
**Model Answer:**
SQLi occurs when malicious SQL code is injected into input form fields to alter database commands. Prevented by using **Parameterized Queries (Prepared Statements)**, input validation, and least privilege accounts.

### Q3. [2 Marks] Explain Role-Based Access Control (RBAC).
**Model Answer:**
RBAC assigns permissions to specific business roles (e.g., `accountant`, `cashier`) rather than directly to individual users. Users are assigned roles, simplifying security administration.

### Q4. [2 Marks] Give the syntax and examples of GRANT and REVOKE commands.
**Model Answer:**
- `GRANT SELECT, INSERT ON Employee TO user_ravi;`
- `REVOKE INSERT ON Employee FROM user_ravi;`

### Q5. [2 Marks] Define a Deadlock in database concurrency control.
**Model Answer:**
A deadlock occurs when two or more transactions are in a simultaneous circular wait state, each holding a lock that the other requires to proceed.

### Q6. [2 Marks] Differentiate Shared Locks (S) from Exclusive Locks (X).
**Model Answer:**
- **Shared Lock (S):** Allows concurrent transactions to read data, but prevents writes.
- **Exclusive Lock (X):** Grants exclusive read and write access to a single transaction; all other transactions are locked out.

### Q7. [2 Marks] What is Data Fragmentation in Distributed DBMS? Name its three types.
**Model Answer:**
Dividing a database relation into smaller pieces stored across multiple network sites.
Types: (1) **Horizontal Fragmentation** (subsets of rows via selection), (2) **Vertical Fragmentation** (subsets of columns via projection), (3) **Hybrid / Mixed Fragmentation**.

### Q8. [2 Marks] What is NoSQL and in what scenarios is it preferred over RDBMS?
**Model Answer:**
NoSQL (Not Only SQL) databases provide schema-less storage, horizontal scale-out across clusters, and high-velocity ingestion for unstructured/semi-structured data (Key-Value, Document, Column-Family, Graph databases).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Two-Phase Locking (2PL) Protocol and its role in ensuring serializability.
**Model Answer:**
### 1. Two-Phase Locking Principle
2PL guarantees serializable transaction schedules by requiring each transaction to acquire and release locks in two separate distinct phases:
1. **Growing Phase:** Transaction may acquire new locks, but cannot release any lock.
2. **Shrinking Phase:** Once the first lock is released, the transaction enters the shrinking phase where it may release remaining locks, but cannot acquire any new lock.
```
Number of Locks
      ^            Peak / Lock Point
      |                /\
      |   Growing     /  \    Shrinking
      |   Phase      /    \   Phase
      |             /      \
      +------------------------> Time
```
- **Strict 2PL:** Holds all Exclusive locks until `COMMIT` or `ROLLBACK`, eliminating cascading rollbacks.

### Q2. [5 Marks] Explain Distributed Databases: Compare Synchronous vs Asynchronous Replication and Horizontal vs Vertical Fragmentation.
**Model Answer:**
### 1. Data Fragmentation
- **Horizontal Fragmentation:** Tuples of table `R` are split into subsets using `WHERE` clauses (e.g., `Emp_North` and `Emp_South`). Reconstructed via `UNION`.
- **Vertical Fragmentation:** Attributes are split into subsets containing the primary key (e.g., `Emp_Personal` and `Emp_Salary`). Reconstructed via `NATURAL JOIN`.

### 2. Data Replication
- **Synchronous Replication:** Master updates all replicas before committing transaction; guarantees strong consistency at the expense of higher write latency.
- **Asynchronous Replication:** Master commits locally immediately and propagates updates in background; high write throughput with eventual consistency.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Discuss Transaction Processing in DBMS. Explain the Transaction State Diagram, the Write-Ahead Logging (WAL) protocol, and log-based recovery (Undo and Redo operations).
**Comprehensive University Solution:**
### 1. Transaction State Diagram
```
           +-----------------+          +----------------+
           |     Active      |--------->| Partially      |
           +-----------------+          | Committed      |
              |            |            +----------------+
              |            |                     |
              v            v                     v
       +-----------+  +-----------+     +----------------+
       |  Failed   |<-|  Aborted  |     |   Committed    |
       +-----------+  +-----------+     +----------------+
```
- **Active:** Initial state; transaction executes read/write operations.
- **Partially Committed:** Final statement executed, but updates still reside in memory buffers.
- **Committed:** Updates flushed safely to disk; transaction completes successfully.
- **Failed:** Normal execution cannot proceed due to hardware error, logic error, or deadlock.
- **Aborted:** Transaction rolled back and database restored to prior consistent state.

### 2. Write-Ahead Logging (WAL) Protocol
WAL dictates that any change to a database block must be written to stable non-volatile log storage on disk **before** the modified buffer page is written to the database disk file. Every log entry contains: `<T_id, Variable, Old_Value, New_Value>`.

### 3. Log-Based Crash Recovery: Undo and Redo
When the system reboots following an abrupt power failure:
- **Redo List:** Contains transactions whose log has both `START` and `COMMIT` records. The recovery manager re-applies `New_Value` to ensure durability.
- **Undo List:** Contains active transactions having `START` but no `COMMIT` record. The recovery manager restores `Old_Value` backwards to guarantee atomicity.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-104N Unit 5, the ACID properties, transaction state transition diagram, and Two-Phase Locking (2PL) protocol appear regularly for 10–15 marks. Draw the transaction state machine and explain the commit point clearly.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
# BCA-104N: Introduction to Database System
## Unit 4 Master Exam Revision Notes: Structured Query Language (SQL) & Table Management
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `532c7166-9acf-4af8-aa7b-0d6453823ee5` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **SQL Language Architecture: DDL (Data Definition Language), DML (Data Manipulation Language), DCL, TCL**
- [x] **Data Types in SQL: Numeric, Character (CHAR/VARCHAR), Date, Time, Boolean**
- [x] **DDL Commands: CREATE TABLE, ALTER TABLE (ADD, MODIFY, DROP Column), DROP TABLE, TRUNCATE**
- [x] **Constraints in SQL: PRIMARY KEY, UNIQUE, NOT NULL, CHECK, DEFAULT, FOREIGN KEY REFERENCES**
- [x] **DML Commands: INSERT INTO, UPDATE SET WHERE, DELETE FROM WHERE**
- [x] **SQL Queries: SELECT Clause, WHERE Filtering, ORDER BY, DISTINCT, LIKE Wildcards, BETWEEN, IN**
- [x] **Aggregate Functions: COUNT, SUM, AVG, MIN, MAX & GROUP BY, HAVING Clause Filtering**
- [x] **SQL Joins: Inner Join, Left Outer Join, Right Outer Join, Full Outer Join, Cross Join**
- [x] **Subqueries: Nested Queries, Correlated Subqueries & Table Views (CREATE VIEW)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Classify SQL statements into DDL, DML, DCL, and TCL.
**Model Answer:**
- **DDL (Data Definition Language):** Defines structure (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`).
- **DML (Data Manipulation Language):** Manages data rows (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
- **DCL (Data Control Language):** Manages permissions (`GRANT`, `REVOKE`).
- **TCL (Transaction Control Language):** Manages transactions (`COMMIT`, `ROLLBACK`, `SAVEPOINT`).

### Q2. [2 Marks] Differentiate between DROP TABLE and TRUNCATE TABLE.
**Model Answer:**
- **DROP TABLE:** DDL command that removes both table data and the entire schema definition permanently from the data dictionary.
- **TRUNCATE TABLE:** DDL command that deletes all data rows instantaneously while preserving table structure; it cannot be rolled back in most DBMS and resets auto-increment.

### Q3. [2 Marks] Explain the difference between CHAR and VARCHAR data types.
**Model Answer:**
- **CHAR(n):** Fixed-length character string. If input is shorter than `n`, it is right-padded with blanks to occupy exactly `n` bytes.
- **VARCHAR(n):** Variable-length character string. Stores only actual characters entered plus 1-2 bytes length prefix, conserving disk space.

### Q4. [2 Marks] List five column integrity constraints in SQL.
**Model Answer:**
1. `PRIMARY KEY` (Uniquely identifies rows, non-null).
2. `UNIQUE` (Ensures unique values, allows nulls).
3. `NOT NULL` (Forbids null values).
4. `CHECK` (Enforces custom condition/range).
5. `DEFAULT` (Supplies fallback default value).
6. `FOREIGN KEY` (Enforces referential integrity).

### Q5. [2 Marks] Differentiate WHERE clause from HAVING clause.
**Model Answer:**
- **WHERE:** Filters individual rows **before** any grouping or aggregation takes place; cannot contain aggregate functions.
- **HAVING:** Filters aggregated groups **after** `GROUP BY` execution; explicitly designed for aggregate conditions (e.g., `HAVING COUNT(*) > 5`).

### Q6. [2 Marks] What is the difference between INNER JOIN and LEFT OUTER JOIN?
**Model Answer:**
- **INNER JOIN:** Returns only rows having matching keys in both participating tables.
- **LEFT OUTER JOIN:** Returns all rows from left table plus matching rows from right table; unmatched right attributes are populated with `NULL`.

### Q7. [2 Marks] Explain Correlated Subqueries versus Non-Correlated Subqueries.
**Model Answer:**
- **Non-Correlated:** Subquery executes independently once; its result is passed to outer query.
- **Correlated:** Subquery references a column from the outer query row, executing once for every row evaluated by outer query.

### Q8. [2 Marks] What is a View in SQL? Give the syntax to create a view.
**Model Answer:**
A **View** is a virtual table defined by a stored SQL query; it does not store physical data rows itself.
Syntax: `CREATE VIEW view_name AS SELECT col1, col2 FROM table_name WHERE condition;`


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain SQL Aggregate Functions (COUNT, SUM, AVG, MIN, MAX) with a GROUP BY and HAVING example.
**Model Answer:**
Aggregate functions compute a single summary value over a set of rows:
- `COUNT(col)`: Returns total non-null row count.
- `SUM(col)`: Returns arithmetic sum of numeric values.
- `AVG(col)`: Returns arithmetic mean.
- `MIN(col)` / `MAX(col)`: Returns minimum or maximum value.

### Practical Query Example
Find departments having more than 3 employees and average salary exceeding 50,000:
```sql
SELECT dept_id, COUNT(*) AS total_employees, AVG(salary) AS avg_salary
FROM Employee
WHERE status = 'Active'
GROUP BY dept_id
HAVING COUNT(*) > 3 AND AVG(salary) > 50000
ORDER BY avg_salary DESC;
```

### Q2. [5 Marks] Explain all types of SQL Joins (Inner, Left, Right, Full, Cross) with Venn diagrams.
**Model Answer:**
```
      INNER JOIN                 LEFT JOIN                RIGHT JOIN
     /----------\              /----------\              /----------\ 
    /    ####    \            /  ########  \            /    ######## \
   (  A  ####  B  )          (  A ####### B )          (  A  ####### B)
    \    ####    /            \  ########  /            \    ######## /
     \----------/              \----------/              \----------/
     Matched Only               All A + Matched B         All B + Matched A
```
- **FULL OUTER JOIN:** Returns all rows from both tables; unmatched rows on either side contain NULLs.
- **CROSS JOIN:** Cartesian product returning `M * N` rows pairing every row of table A with every row of table B.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Write comprehensive SQL DDL and DML scripts to create a Normalized Employee Database, enforce all constraints, and solve 8 university exam query patterns.
**Comprehensive University Solution:**
### 1. DDL Schema Definition with Integrity Constraints
```sql
CREATE TABLE Department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL UNIQUE,
    location VARCHAR(50) DEFAULT 'Bareilly'
);

CREATE TABLE Employee (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10, 2) CHECK (salary >= 10000),
    hire_date DATE NOT NULL,
    dept_id INT,
    CONSTRAINT fk_dept FOREIGN KEY (dept_id) 
        REFERENCES Department(dept_id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);
```

### 2. High-Yield University Exam SQL Query Problems
1. **Find employees with salary between 40,000 and 80,000 in 'IT' or 'Finance':**
```sql
SELECT e.emp_id, e.emp_name, e.salary, d.dept_name
FROM Employee e
JOIN Department d ON e.dept_id = d.dept_id
WHERE e.salary BETWEEN 40000 AND 80000
  AND d.dept_name IN ('IT', 'Finance');
```
2. **Find the 2nd Highest Salary in the Company (using Subquery):**
```sql
SELECT MAX(salary) AS second_highest_salary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);
```
3. **Find employees earning more than the average salary of their own department (Correlated Subquery):**
```sql
SELECT e1.emp_name, e1.salary, e1.dept_id
FROM Employee e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM Employee e2
    WHERE e2.dept_id = e1.dept_id
);
```
4. **Find departments with no assigned employees (Outer Join):**
```sql
SELECT d.dept_id, d.dept_name
FROM Department d
LEFT JOIN Employee e ON d.dept_id = e.dept_id
WHERE e.emp_id IS NULL;
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-104N Unit 4, the university examination always features direct SQL query problems. Master writing syntactically correct `JOIN`, `GROUP BY`, `HAVING`, and nested subqueries (like N-th highest salary).

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
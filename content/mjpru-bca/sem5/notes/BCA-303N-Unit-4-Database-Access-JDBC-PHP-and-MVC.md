# BCA-303N: Web Technologies
## Unit 4 Master Exam Revision Notes: Database Access with JDBC, PHP-MySQL & MVC Frameworks
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `a87cc4e0-6705-5a63-bd49-71c515cd279a` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Database Access in Web Applications: Two-Tier vs Three-Tier Architecture, Persistence Layer Principles**
- [x] **Java Database Connectivity (JDBC) Architecture: Driver Manager, Connection, Statement, PreparedStatement & ResultSet**
- [x] **JDBC Driver Types: Type 1 (JDBC-ODBC Bridge), Type 2 (Native-API Driver), Type 3 (Network-Protocol Driver), Type 4 (Thin Driver)**
- [x] **Executing SQL Statements via JDBC: executeQuery(), executeUpdate(), execute(), Scrollable & Updatable ResultSets**
- [x] **Parameterized Queries with PreparedStatement: Preventing SQL Injection Vulnerabilities, In-Memory Compilation**
- [x] **Advanced JDBC Features: Database Transactions (commit, rollback, setAutoCommit(false)), Savepoints, Batch Updates**
- [x] **javax.sql Package: DataSource Interface, Connection Pooling Mechanisms, High-Performance Database Pooling**
- [x] **Accessing Database from Servlets: Connecting Servlet Controller to Backend RDBMS, Forwarding Results to View**
- [x] **PHP-MySQL Connectivity: mysqli Extension (Procedural vs Object-Oriented API), PDO (PHP Data Objects) Extension**
- [x] **Executing Database Queries in PHP: Establishing Connection, Prepared Statements (bind_param, execute), Fetching Associative Rows**
- [x] **Model-View-Controller (MVC) Pattern: Separation of Concerns, Model (Business Logic), View (Presentation), Controller (Flow)**
- [x] **Apache Struts Framework: Architecture, ActionServlet (Front Controller), ActionForm, Action Class, struts-config.xml Workflow**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is JDBC and what layer does it occupy in Java Enterprise architecture?
**Model Answer:**
**JDBC** (Java Database Connectivity) is a standard Java API (`java.sql`, `javax.sql`) that defines interfaces for connecting Java applications to relational databases, abstracting vendor-specific database protocols.

### Q2. [2 Marks] Name the four types of JDBC Drivers.
**Model Answer:**
1. **Type 1:** JDBC-ODBC Bridge Driver (Deprecated)
2. **Type 2:** Native-API Driver (Partially Java, requires client library)
3. **Type 3:** Network-Protocol Driver (Pure Java, uses middleware)
4. **Type 4:** Thin Driver (Direct-to-Database Pure Java - Industry standard)

### Q3. [2 Marks] Explain the difference between `Statement` and `PreparedStatement`.
**Model Answer:**
| Feature | `Statement` | `PreparedStatement` |
| :--- | :--- | :--- |
| **Query Compilation**| Compiled by DB engine every time | Pre-compiled once, executed repeatedly |
| **Performance** | Slower for repetitive queries | Fast due to compiled execution plan |
| **SQL Injection** | Vulnerable to SQL injection | Immune (parameters bound safely) |
| **Syntax** | String concatenation (`'" + id + "'`) | Placeholders (`?`) |

### Q4. [2 Marks] What is a `CallableStatement` in JDBC?
**Model Answer:**
`CallableStatement` extends `PreparedStatement` to execute **Stored Procedures** and stored functions located in the database, allowing `IN`, `OUT`, and `INOUT` parameters.

### Q5. [2 Marks] What does ACID stand for in Database Transactions?
**Model Answer:**
- **A - Atomicity:** All operations complete successfully or all are rolled back.
- **C - Consistency:** Database moves from one valid state to another.
- **I - Isolation:** Concurrent transactions do not interfere with each other.
- **D - Durability:** Committed transaction results survive system crashes.

### Q6. [2 Marks] How do you manage transactions programmatically in JDBC?
**Model Answer:**
1. Disable auto-commit: `connection.setAutoCommit(false);`
2. Execute DML queries.
3. Commit on success: `connection.commit();`
4. Roll back on exception: `connection.rollback();`

### Q7. [2 Marks] What is Connection Pooling?
**Model Answer:**
Connection Pooling maintains a cache of pre-created, reusable physical database connections, eliminating the high latency of repeatedly opening and closing TCP socket database handshakes for every user request.

### Q8. [2 Marks] Explain the three tiers in MVC (Model-View-Controller) Architecture.
**Model Answer:**
- **Model:** Represents business data, entities, and database logic.
- **View:** Generates presentation/UI displayed to the client (HTML, JSP, React).
- **Controller:** Intercepts client requests, updates Model, and picks next View.

### Q9. [2 Marks] What is PDO in PHP and why is it preferred over `mysqli`?
**Model Answer:**
**PDO (PHP Data Objects)** provides a uniform, database-agnostic data access abstraction layer supporting 12+ relational database systems, whereas `mysqli` only works with MySQL.

### Q10. [2 Marks] What is an ORM (Object-Relational Mapping)?
**Model Answer:**
An ORM (e.g., Hibernate, JPA, Doctrine) automatically maps object-oriented classes and properties to relational database tables and foreign keys, abstracting raw SQL queries.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare the 4 Types of JDBC Drivers with an Architecture Diagram.
**Model Answer:**
```
+-------------------------------------------------------------+
| Type 1: JDBC-ODBC Bridge   | Java App -> JDBC -> ODBC -> DB |
| Type 2: Native-API Driver  | Java App -> JDBC -> C/C++ API  |
| Type 3: Network Protocol   | Java App -> Middleware Server  |
| Type 4: Pure Java Thin     | Java App -> Direct TCP/IP -> DB|
+-------------------------------------------------------------+
```

| Driver Type | Pure Java? | Client Installation Required? | Performance |
| :--- | :--- | :--- | :--- |
| **Type 1** | No | Requires native ODBC driver | Slowest |
| **Type 2** | No | Requires native vendor client library | Moderate |
| **Type 3** | Yes | No client installation | Good |
| **Type 4** | Yes | No client installation (Direct socket) | Fastest & Preferred |

### Q2. [5 Marks] Explain the 5 Standard Steps to Execute a Query in JDBC.
**Model Answer:**
### 5-Step JDBC Execution Lifecycle
1. **Load Driver Class:** `Class.forName("com.mysql.cj.jdbc.Driver");` (Modern JDBC 4.0 does this automatically via `DriverManager` SPI).
2. **Establish Connection:** `Connection conn = DriverManager.getConnection(url, user, pass);`
3. **Create Statement:** `PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ?");`
4. **Execute Query:** `ResultSet rs = ps.executeQuery();` or `int rows = ps.executeUpdate();`
5. **Close Resources:** Close `ResultSet`, `Statement`, and `Connection` (or use `try-with-resources`).

### Q3. [5 Marks] Explain Transaction Management in JDBC with Rollback.
**Model Answer:**
```java
Connection conn = null;
try {
    conn = dataSource.getConnection();
    conn.setAutoCommit(false); // Begin Transaction

    // Debit Account A
    PreparedStatement psDebit = conn.prepareStatement("UPDATE accounts SET balance = balance - ? WHERE id = ?");
    psDebit.setDouble(1, 5000.0);
    psDebit.setInt(2, 101);
    psDebit.executeUpdate();

    // Credit Account B
    PreparedStatement psCredit = conn.prepareStatement("UPDATE accounts SET balance = balance + ? WHERE id = ?");
    psCredit.setDouble(1, 5000.0);
    psCredit.setInt(2, 202);
    psCredit.executeUpdate();

    conn.commit(); // Commit Transaction
    System.out.println("Transfer successful!");
} catch (SQLException e) {
    if (conn != null) conn.rollback(); // Rollback on failure!
    System.err.println("Transaction rolled back: " + e.getMessage());
} finally {
    if (conn != null) conn.setAutoCommit(true);
}
```

### Q4. [5 Marks] Explain the MVC (Model-View-Controller) Flow in Web Applications.
**Model Answer:**
```
                      [ Client Browser ]
                        |          ^
         1. HTTP Request|          | 6. Rendered HTML View
                        v          |
                 [ CONTROLLER (Servlet) ]
                   |               ^
         2. Updates|               | 5. Selects View & passes Data
                   v               |
            [ MODEL (JavaBean) ]   [ VIEW (JSP) ]
                   |                     ^
         3. SQL    |                     | 4. Reads Model
                   v                     |
            [ DATABASE ] ----------------+
```

### Q5. [5 Marks] Explain Database Metadata in JDBC (`DatabaseMetaData` and `ResultSetMetaData`).
**Model Answer:**
- **`DatabaseMetaData`:** Obtains comprehensive information about the database software itself (product name, version, driver name, list of tables, supported SQL dialects).
- **`ResultSetMetaData`:** Obtains schema information about the returned query columns (column count, column names, column data types, nullability).


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Complete Enterprise JDBC Data Access Object (DAO) Pattern Implementation with PreparedStatement and Connection Pooling.
**Comprehensive University Solution:**
```java
package com.mjpru.bca.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

// Student Entity Model
class Student {
    private int rollNo;
    private String name;
    private double marks;

    public Student(int rollNo, String name, double marks) {
        this.rollNo = rollNo;
        this.name = name;
        this.marks = marks;
    }
    public int getRollNo() { return rollNo; }
    public String getName() { return name; }
    public double getMarks() { return marks; }
}

// DAO Interface
interface StudentDAO {
    void addStudent(Student s) throws SQLException;
    Student getStudentByRoll(int rollNo) throws SQLException;
    List<Student> getAllStudents() throws SQLException;
}

// DAO Implementation
public class StudentDAOImpl implements StudentDAO {
    private final String jdbcURL = "jdbc:mysql://localhost:3306/mjpru_exam";
    private final String jdbcUser = "bca_admin";
    private final String jdbcPass = "exam2025";

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(jdbcURL, jdbcUser, jdbcPass);
    }

    @Override
    public void addStudent(Student s) throws SQLException {
        String sql = "INSERT INTO students (roll_no, name, marks) VALUES (?, ?, ?)";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, s.getRollNo());
            ps.setString(2, s.getName());
            ps.setDouble(3, s.getMarks());
            ps.executeUpdate();
            System.out.println("Student inserted successfully: " + s.getName());
        }
    }

    @Override
    public Student getStudentByRoll(int rollNo) throws SQLException {
        String sql = "SELECT roll_no, name, marks FROM students WHERE roll_no = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, rollNo);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Student(rs.getInt("roll_no"), rs.getString("name"), rs.getDouble("marks"));
                }
            }
        }
        return null; // Not found
    }

    @Override
    public List<Student> getAllStudents() throws SQLException {
        List<Student> list = new ArrayList<>();
        String sql = "SELECT roll_no, name, marks FROM students ORDER BY roll_no ASC";
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                list.add(new Student(rs.getInt("roll_no"), rs.getString("name"), rs.getDouble("marks")));
            }
        }
        return list;
    }
}
```

### Q2. [10/15 Marks] Explain Database Connection Pooling Architecture and Compare HikariCP vs Traditional DriverManager.
**Comprehensive University Solution:**
### Connection Pooling vs DriverManager Architecture

```
[ TRADITIONAL DriverManager ]
Request 1 ---> Open Socket -> DB Handshake -> Auth -> Run SQL -> Close Socket (HIGH LATENCY!)
Request 2 ---> Open Socket -> DB Handshake -> Auth -> Run SQL -> Close Socket (HIGH LATENCY!)

[ CONNECTION POOLING (HikariCP / DBCP) ]
Initial Startup: Pre-allocates 10-50 physical persistent TCP connections to DB
Request 1 ---> Borrow Connection from Pool -> Run SQL -> Return to Pool (LOW LATENCY! <1ms)
Request 2 ---> Borrow Connection from Pool -> Run SQL -> Return to Pool
```

#### Why HikariCP Outperforms Others:
1. **Bytecode Engineering:** Extremely lean assembly and bytecode optimization.
2. **Zero Overhead:** Eliminates lock contention via lock-free collections (`FastList`, `ConcurrentBag`).
3. **Thread Safety:** Prevents connection leakage and connection stall through rigorous timeouts (`connectionTimeout`, `idleTimeout`, `maxLifetime`).

### Q3. [10/15 Marks] Explain the Complete MVC Web Architecture with a Working End-to-End Case Study in Java Servlets and JSP.
**Comprehensive University Solution:**
### Enterprise MVC Case Study

#### 1. Model: `StudentBean.java`
Represents state and database records with getter/setter properties.

#### 2. Controller: `StudentControllerServlet.java`
- Intercepts requests like `/students?action=list`.
- Calls `StudentDAO` to retrieve list of student objects.
- Places student list into request scope: `request.setAttribute("studentList", list);`.
- Dispatches to View: `request.getRequestDispatcher("student_view.jsp").forward(request, response);`.

#### 3. View: `student_view.jsp`
- Uses JSTL `<c:forEach>` to loop through `${studentList}` and render formatted HTML tables.
- Contains **zero business or database code**, guaranteeing clean separation of concerns and maintainability.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiner high-yield focus: 4 types of JDBC drivers, Statement vs PreparedStatement, and DAO Pattern with Transaction rollback.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
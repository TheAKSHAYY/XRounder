# BCA-303N: Web Technologies
## Unit 2 Master Exam Revision Notes: XML Technologies & Server-Side PHP Programming
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `b38e3aa6-b72d-5b22-b98d-ad3c748d4a50` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Introduction to XML: Extensible Markup Language, Syntax Rules, Well-Formed vs Valid XML Documents**
- [x] **Document Type Definition (DTD): Internal vs External DTD, Elements, Attributes (CDATA, ID, IDREF), Entities**
- [x] **XML Schemas (XSD): Data Typing, Schema Definition, Complex Types vs Simple Types, Namespaces**
- [x] **Presenting XML: Extensible Stylesheet Language (XSL), XSL Transformations (XSLT), XPath Expressions**
- [x] **XHTML: Strict, Transitional & Frameset Specifications, Differences Between HTML and XHTML Syntax**
- [x] **XML Parsing APIs: Document Object Model (DOM) Tree-Based Parser vs Simple API for XML (SAX) Event-Driven Parser**
- [x] **PHP Server-Side Architecture: PHP Engine, Server Interaction (Apache/Nginx mod_php), <?php ... ?> Tagging**
- [x] **PHP Language Primitives: Variables ($ prefix), Dynamic Typing, Constants, Arithmetic, Logical and Bitwise Operators**
- [x] **PHP Control Structures: Conditional Statements (if-else, switch-case), Iterative Loops (for, while, do-while, foreach)**
- [x] **PHP Arrays: Indexed Arrays, Associative Arrays, Multidimensional Arrays, Array Manipulation Functions**
- [x] **PHP Functions & Parameter Mechanisms: User-Defined Functions, Default Arguments, Pass by Value vs Pass by Reference (&)**
- [x] **PHP Superglobals & Form Handling: $_GET, $_POST, $_REQUEST, $_SERVER, Form Data Sanitization (htmlspecialchars, strip_tags)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What does XML stand for and what is its primary purpose?
**Model Answer:**
**XML** (eXtensible Markup Language) is a W3C-standard, platform-independent text format designed to store, transport, and structure data, separating content from display formatting.

### Q2. [2 Marks] What is the difference between a 'Well-Formed' and a 'Valid' XML document?
**Model Answer:**
- **Well-Formed:** Follows XML basic syntax rules (single root element, matching closing tags, case-sensitive tags, properly nested elements, quoted attribute values).
- **Valid:** A well-formed XML document that additionally conforms to a declared schema (**DTD** or **XML Schema / XSD**).

### Q3. [2 Marks] Compare DTD (Document Type Definition) and XML Schema (XSD).
**Model Answer:**
| Feature | DTD | XML Schema (XSD) |
| :--- | :--- | :--- |
| **Syntax** | Unique non-XML syntax | Standard XML syntax (`<xs:schema>`) |
| **Data Types** | Minimal (Strings only - `PCDATA`, `CDATA`) | Rich built-in types (`integer`, `date`, `boolean`, `decimal`) |
| **Namespaces**| Does not support XML Namespaces | Full native support for Namespaces |
| **Extensibility**| Fixed, non-extensible | Extensible with custom user types |

### Q4. [2 Marks] What is XSLT and what is its primary function?
**Model Answer:**
**XSLT** (Extensible Stylesheet Language Transformations) transforms XML source documents into other formats such as HTML, XHTML, plain text, or alternative XML structures using transformation rule templates.

### Q5. [2 Marks] Explain the difference between SAX and DOM XML parsers.
**Model Answer:**
- **DOM (Document Object Model):** Tree-based; loads the entire XML file into memory as an interactive node graph (high memory, enables random access).
- **SAX (Simple API for XML):** Event-driven; streams through XML linearly firing events (`startElement`, `endElement`) without loading everything in memory (low memory footprint).

### Q6. [2 Marks] What does PHP stand for and how are PHP code blocks delimited?
**Model Answer:**
PHP stands for **Hypertext Preprocessor** (recursive acronym). PHP code blocks are delimited by `<?php` and `?>` tags and execute on the server.

### Q7. [2 Marks] Name four core PHP Superglobal arrays.
**Model Answer:**
1. `$_GET`: URL query parameters.
2. `$_POST`: Form payload submitted via POST.
3. `$_SESSION`: Session variables stored on server.
4. `$_COOKIE`: HTTP cookie values sent by browser.

### Q8. [2 Marks] What is the purpose of `session_start()` in PHP?
**Model Answer:**
`session_start()` initializes a new session or resumes an existing session based on a session identifier passed via a GET/POST request or via cookie (`PHPSESSID`). It must be called before sending any HTML output.

### Q9. [2 Marks] Differentiate between `include` and `require` in PHP.
**Model Answer:**
- `include`: If the specified file is missing, it emits a **warning (`E_WARNING`)** and script execution **continues**.
- `require`: If missing, it raises a **fatal error (`E_COMPILE_ERROR`)** and halts script execution immediately.

### Q10. [2 Marks] How do you prevent SQL Injection in PHP?
**Model Answer:**
By using **Prepared Statements** with parameterized queries via **PDO (PHP Data Objects)** or **MySQLi**, which separates SQL query structure from untrusted user inputs.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Structure of an XML Schema (XSD) with a Comprehensive Example.
**Model Answer:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <!-- Root Element Declaration -->
  <xs:element name="university">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="student" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="rollNumber" type="xs:positiveInteger"/>
              <xs:element name="fullName" type="xs:string"/>
              <xs:element name="course" type="xs:string"/>
              <xs:element name="marks" type="xs:decimal"/>
            </xs:sequence>
            <xs:attribute name="category" type="xs:string" use="required"/>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>
```
- Features: Strongly typed tags, cardinality rules (`maxOccurs`), and attribute constraints (`use="required"`).

### Q2. [5 Marks] Explain the Complete PHP Session Lifecycle and State Management.
**Model Answer:**
### PHP Session Architecture

```
[ CLIENT (Browser) ]                          [ SERVER (Apache / PHP) ]
        |                                                |
        | ----- 1. Initial Request (No Cookie) --------> |
        |                                                | -> session_start()
        |                                                | -> Generates unique 32-char ID
        |                                                |    e.g. "a8f9c1..."
        |                                                | -> Creates /tmp/sess_a8f9c1...
        | <-- 2. Response + Set-Cookie: PHPSESSID=... -- |
        |                                                |
        | ----- 3. Subsequent Request with Cookie -----> |
        |          Cookie: PHPSESSID=a8f9c1...           | -> session_start()
        |                                                | -> Loads $_SESSION from file
```
- **Destruction:** `session_unset()` clears variables in memory; `session_destroy()` deletes the session data from the server's filesystem storage.

### Q3. [5 Marks] Explain File Upload Handling in PHP with `$_FILES`.
**Model Answer:**
When uploading files via `<form method="POST" enctype="multipart/form-data">`:
- The superglobal `$_FILES['uploaded_file']` provides:
  1. `name`: Original client filename.
  2. `type`: MIME type (e.g., `image/png`).
  3. `size`: File size in bytes.
  4. `tmp_name`: Temporary location on server.
  5. `error`: Error code (`UPLOAD_ERR_OK = 0`).
- Function `move_uploaded_file(tmp_name, destination)` securely moves the validated file to the permanent upload folder.

### Q4. [5 Marks] Explain XML Namespaces and Why They Prevent Naming Collisions.
**Model Answer:**
When combining XML documents from different sources, tag name collisions occur (e.g., `<table` for furniture vs `<table>` for HTML data).
- **Solution:** XML Namespaces assign unique URIs via `xmlns:prefix="URI"`:
```xml
<root xmlns:f="https://furnitures.org/specs" xmlns:h="http://www.w3.org/1999/xhtml">
  <f:table><f:name>Oak Coffee Table</f:name></f:table>
  <h:table><h:tr><h:td>Student Name</h:td></h:tr></h:table>
</root>
```

### Q5. [5 Marks] Compare PHP GET vs POST Security and Processing.
**Model Answer:**
### Superglobal Input Handling
- `$_GET`: Data appears in query string; easily manipulated via address bar; vulnerable to URL logging in proxy servers. Never use for passwords, payment data, or state mutations.
- `$_POST`: Data sent in HTTP body; not visible in browser address bar; suitable for large files and passwords.
- **Sanitization:** Always apply `htmlspecialchars()` and `filter_var()` before displaying or processing input to prevent Cross-Site Scripting (XSS).


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Build a Complete Secure PHP Student Management CRUD Application with Database Connectivity, Session Authentication, and Prepared Statements.
**Comprehensive University Solution:**
```php
<?php
// session_auth.php: Complete Authentication and CRUD Module
session_start();

// 1. Database Connection via PDO
$dsn = "mysql:host=localhost;dbname=mjpru_exam;charset=utf8mb4";
$db_user = "root";
$db_pass = "secret";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false, // Ensures native server-side prepared statements
];

try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
    die("Database connection failed: " . htmlspecialchars($e->getMessage()));
}

// 2. Authentication Check
if (!isset($_SESSION['user_id'])) {
    // Handle Login
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
        $email = trim($_POST['email']);
        $password = $_POST['password'];

        $stmt = $pdo->prepare("SELECT id, username, password_hash FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            session_regenerate_id(true); // Protect against Session Fixation
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            header("Location: student_portal.php");
            exit();
        } else {
            $error = "Invalid credentials!";
        }
    }
}

// 3. Secure Student Record Insertion (POST)
if (isset($_SESSION['user_id']) && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_student'])) {
    $roll_no = filter_input(INPUT_POST, 'roll_no', FILTER_VALIDATE_INT);
    $student_name = trim(htmlspecialchars($_POST['student_name']));
    $course = trim(htmlspecialchars($_POST['course']));
    $marks = filter_input(INPUT_POST, 'marks', FILTER_VALIDATE_FLOAT);

    if ($roll_no && !empty($student_name) && $marks !== false) {
        // Parameterized Query eliminates SQL Injection
        $insertStmt = $pdo->prepare("INSERT INTO students (roll_no, student_name, course, marks) VALUES (:roll, :name, :course, :marks)");
        $insertStmt->execute([
            'roll' => $roll_no,
            'name' => $student_name,
            'course' => $course,
            'marks' => $marks
        ]);
        $msg = "Student successfully enrolled!";
    } else {
        $error = "Validation failed. Please verify input formats.";
    }
}

// 4. Retrieve Student Records
$students = [];
if (isset($_SESSION['user_id'])) {
    $query = $pdo->query("SELECT * FROM students ORDER BY roll_no ASC");
    $students = $query->fetchAll();
}
?>
<!DOCTYPE html>
<html>
<head><title>MJPRU BCA PHP Portal</title></head>
<body>
  <h1>Welcome, <?php echo htmlspecialchars($_SESSION['username'] ?? 'Guest'); ?></h1>
  <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
  <?php if (isset($msg)) echo "<p style='color:green;'>$msg</p>"; ?>
  
  <table border="1" cellpadding="8">
    <tr><th>Roll No</th><th>Name</th><th>Course</th><th>Marks</th></tr>
    <?php foreach ($students as $s): ?>
      <tr>
        <td><?= htmlspecialchars($s['roll_no']) ?></td>
        <td><?= htmlspecialchars($s['student_name']) ?></td>
        <td><?= htmlspecialchars($s['course']) ?></td>
        <td><?= htmlspecialchars($s['marks']) ?></td>
      </tr>
    <?php endforeach; ?>
  </table>
</body>
</html>
```

### Q2. [10/15 Marks] Explain XSLT Transformation with a Complete XML Source Document, XSL Stylesheet, and Transformed Output.
**Comprehensive University Solution:**
### End-to-End XSLT Transformation

#### 1. Input Source XML (`students.xml`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="transform.xsl"?>
<class>
  <student roll="101">
    <name>Amit Kumar</name>
    <subject>Web Technologies</subject>
    <score>88</score>
  </student>
  <student roll="102">
    <name>Priya Sharma</name>
    <subject>Artificial Intelligence</subject>
    <score>94</score>
  </student>
</class>
```

#### 2. XSL Transformation Stylesheet (`transform.xsl`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <h2>MJPRU BCA Student Performance Report</h2>
        <table border="1">
          <tr bgcolor="#9acd32">
            <th>Roll</th><th>Student Name</th><th>Subject</th><th>Score</th>
          </tr>
          <xsl:for-each select="class/student">
            <xsl:sort select="score" order="descending"/>
            <tr>
              <td><xsl:value-of select="@roll"/></td>
              <td><xsl:value-of select="name"/></td>
              <td><xsl:value-of select="subject"/></td>
              <td><xsl:value-of select="score"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
```

#### 3. Execution Mechanics:
- The browser or an XSLT processor (e.g., `XSLTProcessor` in JS or `xsltproc` in PHP) matches the root `/` template.
- `<xsl:for-each>` iterates over `<student>` nodes, sorts by `<score>`, and transforms hierarchical XML tags into an HTML table structure.

### Q3. [10/15 Marks] Explain DTD Element and Attribute Declarations with Symbols (`?`, `*`, `+`, `|`, `,`).
**Comprehensive University Solution:**
### Complete DTD Syntax and Cardinality Operators

#### Syntax Rules:
- **`?` (Zero or One):** Element is optional but cannot appear more than once.
- **`*` (Zero or More):** Element can appear any number of times.
- **`+` (One or More):** Element must appear at least once.
- **`,` (Sequence):** Elements must appear in strict specified order.
- **`|` (Alternative):** Either element may appear (choice).

```xml
<!DOCTYPE university [
  <!ELEMENT university (department+)>
  <!ELEMENT department (dept_name, faculty*, course+)>
  <!ELEMENT dept_name (#PCDATA)>
  <!ELEMENT faculty (faculty_name, designation?, phone*)>
  <!ELEMENT faculty_name (#PCDATA)>
  <!ELEMENT designation (#PCDATA)>
  <!ELEMENT phone (#PCDATA)>
  <!ELEMENT course (course_code, title, credits)>
  <!ELEMENT course_code (#PCDATA)>
  <!ELEMENT title (#PCDATA)>
  <!ELEMENT credits (#PCDATA)>
  
  <!-- Attribute Declarations -->
  <!ATTLIST department 
    id ID #REQUIRED
    code CDATA #IMPLIED
    status (active | archived) "active"
  >
]>
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiner high-yield focus: DTD vs XSD differences, PHP Session handling code, and XSLT transformation rules.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
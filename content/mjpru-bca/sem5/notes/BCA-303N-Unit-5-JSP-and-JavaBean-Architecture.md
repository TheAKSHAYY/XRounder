# BCA-303N: Web Technologies
## Unit 5 Master Exam Revision Notes: JavaServer Pages (JSP) & JavaBean Architecture
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `2c937fe4-96fb-5a2b-9256-48fef51f613f` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Introduction to JavaServer Pages (JSP): JSP Motivation, Comparison of Servlets vs JSP Pages, Separation of Roles**
- [x] **JSP Page Anatomy & Lifecycle: Translation Phase (JSP to Servlet Source), Compilation Phase (.class), Instantiation, _jspInit, _jspService, _jspDestroy**
- [x] **JSP Directive Elements: <%@ page ... %>, <%@ include ... %>, <%@ taglib ... %>, Attributes (import, contentType, session, errorPage)**
- [x] **JSP Scripting Elements: Scriptlets (<% ... %>), Expressions (<%= ... %>), Declarations (<%! ... %>), Syntax & Best Practices**
- [x] **JSP Implicit Objects: request, response, out (JspWriter), session, application, config, pageContext, page, exception**
- [x] **JSP Standard Action Elements: <jsp:include> (Dynamic Inclusion vs Directive Static Inclusion), <jsp:forward>, <jsp:param>**
- [x] **JavaBeans Architecture: JavaBean Specification, Zero-Argument Constructor, Private Properties, Getters and Setters, Serializable**
- [x] **Deploying JavaBeans in JSP: <jsp:useBean> Tag, Scope Attributes (page, request, session, application)**
- [x] **Setting and Getting Bean Properties: <jsp:setProperty name='...' property='*'/> Automapping, <jsp:getProperty>**
- [x] **JSP Expression Language (EL): Syntax (${expression}), Implicit Objects (param, header, cookie), Operators, Simplifying Data Access**
- [x] **JSTL (JSP Standard Tag Library): Core Tags (<c:out>, <c:set>, <c:if>, <c:forEach>, <c:choose>), Formatting & SQL Tags**
- [x] **Security & Performance Optimization in JSP: Preventing XSS Attacks, Disabling Scriptlets, Custom Error Pages & Caching Strategies**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is JavaServer Pages (JSP) and how does it relate to Servlets?
**Model Answer:**
**JSP** is a server-side presentation technology that allows developers to write standard HTML embedded with dynamic Java tags. At runtime, the JSP engine translates the JSP file into an equivalent **Java Servlet source file (`.java`)**, which is then compiled into bytecode (`.class`).

### Q2. [2 Marks] Explain the JSP Lifecycle phases.
**Model Answer:**
1. **Translation:** JSP page is translated into a Java Servlet source file (`_jsp.java`).
2. **Compilation:** Servlet source is compiled into bytecode (`_jsp.class`).
3. **Loading & Instantiation:** Servlet class is loaded into memory.
4. **Initialization:** `jspInit()` is invoked once.
5. **Execution:** `_jspService(req, res)` is called for each client request.
6. **Destruction:** `jspDestroy()` cleans up resources when unloaded.

### Q3. [2 Marks] Name the three types of JSP Directives.
**Model Answer:**
1. `<%@ page ... %>`: Defines page-dependent attributes (language, contentType, import, errorPage).
2. `<%@ include ... %>`: Static include of another file at translation time.
3. `<%@ taglib ... %>`: Declares custom tag libraries (such as JSTL).

### Q4. [2 Marks] What are the three core JSP Scripting Elements?
**Model Answer:**
1. **Scriptlet (`<% ... %>`):** Arbitrary Java statements executed inside `_jspService()`.
2. **Expression (`<%= ... %>`):** Evaluates an expression and prints to output (no semicolon).
3. **Declaration (`<%! ... %>`):** Declares class-level instance variables and methods outside `_jspService()`.

### Q5. [2 Marks] List the 9 Implicit Objects in JSP.
**Model Answer:**
1. `request` (`HttpServletRequest`)
2. `response` (`HttpServletResponse`)
3. `out` (`JspWriter`)
4. `session` (`HttpSession`)
5. `application` (`ServletContext`)
6. `config` (`ServletConfig`)
7. `pageContext` (`PageContext`)
8. `page` (`Object / this`)
9. `exception` (`Throwable` - only on error pages).

### Q6. [2 Marks] What constitutes a valid JavaBean class?
**Model Answer:**
1. Must implement `java.io.Serializable`.
2. Must have a public zero-argument constructor.
3. All properties must be private and accessible via standard public `getProp()` and `setProp()` methods.

### Q7. [2 Marks] What are the three standard JSP Action tags for JavaBeans?
**Model Answer:**
1. `<jsp:useBean id="..." class="..." scope="..."/>`: Locates or instantiates a bean.
2. `<jsp:setProperty name="..." property="..."/>`: Sets property value.
3. `<jsp:getProperty name="..." property="..."/>`: Retrieves property value and writes to output.

### Q8. [2 Marks] Explain the four scopes in JSP.
**Model Answer:**
1. **`page`:** Accessible only within the current JSP page.
2. **`request`:** Accessible across pages handling the same request (`forward`).
3. **`session`:** Accessible across multiple requests within the user's active session.
4. **`application`:** Accessible to all users across the entire web application.

### Q9. [2 Marks] What is the JSP Expression Language (EL) syntax and purpose?
**Model Answer:**
EL uses the syntax `${expression}` (e.g., `${student.name}`) to access JavaBean properties, implicit objects, and collection elements simply and cleanly without requiring Java scriptlets.

### Q10. [2 Marks] What is JSTL (JSP Standard Tag Library)?
**Model Answer:**
JSTL is a standardized collection of custom JSP tags providing core functions (loops `<c:forEach>`, conditionals `<c:if>`), XML processing, formatting (dates/numbers), and SQL access.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Translation and Compilation Lifecycle of a JSP Page.
**Model Answer:**
```
[ Client Request: index.jsp ]
          |
          v
[ JSP Engine / Container ]
          |
          +---> Checks: Is Translated Servlet up to date?
          |     If NO:
          |     1. [ Translation Phase ]: Translates index.jsp -> index_jsp.java
          |     2. [ Compilation Phase ]: Compiles index_jsp.java -> index_jsp.class
          |
          v
[ Load & Initialize ]
          |
          +---> jspInit() (Executed once)
          |
          v
[ Request Handling ]
          |
          +---> _jspService(request, response) (Invoked for every request)
          |
          v
[ Container Shutdown ]
          |
          +---> jspDestroy() (Executed once)
```

### Q2. [5 Marks] Compare JSP Scripting Elements: Scriptlet vs Expression vs Declaration.
**Model Answer:**
| Element | Syntax | Generated Location in Servlet | Example |
| :--- | :--- | :--- | :--- |
| **Scriptlet** | `<% ... %>` | Inside `_jspService()` method | `<% int count = 10; %>` |
| **Expression**| `<%= ... %>`| Inside `_jspService()` wrapped in `out.print(...)` | `<%= Math.sqrt(16) %>` |
| **Declaration**| `<%! ... %>`| Outside `_jspService()` as Class Member | `<%! private int visits = 0; %>` |

### Q3. [5 Marks] Explain JSP Directive Tags (`page`, `include`, `taglib`) with Attributes.
**Model Answer:**
### 1. Page Directive (`<%@ page ... %>`):
Configures page-wide attributes:
```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    import="java.util.List, com.mjpru.Student"
    isErrorPage="false" errorPage="error.jsp" session="true" %>
```
### 2. Include Directive (`<%@ include file="header.jsp" %>`):
Merges target file into current page during translation (static include).
### 3. Taglib Directive (`<%@ taglib uri="..." prefix="c" %>`):
Imports tag libraries such as JSTL core (`xmlns:c`).

### Q4. [5 Marks] Explain the 4 Scopes of `<jsp:useBean>` with Lifespan Comparison.
**Model Answer:**
| Scope | Lifespan | Stored In | Shared With |
| :--- | :--- | :--- | :--- |
| **`page`** | Duration of single JSP page execution | `PageContext` | Current page only |
| **`request`** | Lifetime of the HTTP request | `HttpServletRequest` | Current page and forwarded JSPs |
| **`session`** | User session duration (browser session) | `HttpSession` | All pages visited by same user |
| **`application`** | Server uptime (application lifetime) | `ServletContext` | All users across entire web app |

### Q5. [5 Marks] Describe JSTL Core Tags (`<c:if>`, `<c:forEach>`, `<c:choose>`) with Examples.
**Model Answer:**
```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Conditional Rendering -->
<c:if test="${score >= 50}">
  <p style="color:green;">Status: Passed</p>
</c:if>

<!-- Multi-way Branching -->
<c:choose>
  <c:when test="${marks >= 75}"><p>Distinction</p></c:when>
  <c:when test="${marks >= 60}"><p>First Class</p></c:when>
  <c:otherwise><p>Second Class / Pass</p></c:otherwise>
</c:choose>

<!-- Iteration over Collections -->
<c:forEach var="item" items="${productList}">
  <li>${item.name} - &#8377;${item.price}</li>
</c:forEach>
```


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Complete Enterprise JavaBean and JSP Application Demonstrating `<jsp:useBean>`, Property Population, and EL Rendering.
**Comprehensive University Solution:**
### Complete JavaBean and JSP Implementation

#### 1. JavaBean Class: `StudentBean.java`
```java
package com.mjpru.bca.beans;

import java.io.Serializable;

public class StudentBean implements Serializable {
    private static final long serialVersionUID = 1L;
    private int rollNo;
    private String studentName;
    private double marks;

    public StudentBean() {} // Mandatory no-arg constructor

    public int getRollNo() { return rollNo; }
    public void setRollNo(int rollNo) { this.rollNo = rollNo; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public double getMarks() { return marks; }
    public void setMarks(double marks) { this.marks = marks; }

    public String getGrade() {
        if (marks >= 80) return "A+";
        if (marks >= 60) return "A";
        if (marks >= 50) return "B";
        return "C";
    }
}
```

#### 2. JSP Page: `student_entry.jsp` (Input Form)
```jsp
<!DOCTYPE html>
<html>
<head><title>Student Registration</title></head>
<body>
  <h2>Enter BCA Student Details</h2>
  <form action="student_display.jsp" method="POST">
    Roll Number: <input type="text" name="rollNo"><br><br>
    Student Name: <input type="text" name="studentName"><br><br>
    Marks (out of 100): <input type="text" name="marks"><br><br>
    <input type="submit" value="Register Student">
  </form>
</body>
</html>
```

#### 3. JSP Page: `student_display.jsp` (Processing & Display via Bean & EL)
```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 1. Instantiate or Locate JavaBean in Request Scope -->
<jsp:useBean id="student" class="com.mjpru.bca.beans.StudentBean" scope="request"/>

<!-- 2. Automatically populate all bean properties matching HTTP POST parameter names -->
<jsp:setProperty name="student" property="*"/>

<!DOCTYPE html>
<html>
<head>
  <title>Student Profile Display</title>
  <style>
    .profile-card { border: 1px solid #0284c7; padding: 20px; border-radius: 8px; max-width: 400px; }
  </style>
</head>
<body>
  <div class="profile-card">
    <h2>Student Examination Record</h2>
    <!-- Render properties using modern Expression Language (EL) -->
    <p><strong>Roll Number:</strong> ${student.rollNo}</p>
    <p><strong>Student Name:</strong> ${student.studentName}</p>
    <p><strong>Marks:</strong> ${student.marks} / 100</p>
    <p><strong>Assigned Grade:</strong> <span style="color:blue;">${student.grade}</span></p>
  </div>
</body>
</html>
```

### Q2. [10/15 Marks] Explain Error Handling in JSP: `errorPage` and `isErrorPage` Directives with Custom Error Handler Architecture.
**Comprehensive University Solution:**
### Declarative Error Handling in JSP

```
[ Business JSP (calculate.jsp) ] -- Throws Runtime Exception --> [ Container ]
                                                                       |
                                                                       v
[ Client Browser ] <--- Renders User-Friendly Message <--- [ error_handler.jsp ]
```

#### 1. Business Page (`calculate.jsp`):
Specifies the error handling page via the `page` directive:
```jsp
<%@ page errorPage="error_handler.jsp" %>
<% 
  int a = 100;
  int b = 0;
  int c = a / b; // Causes java.lang.ArithmeticException: / by zero
%>
```

#### 2. Custom Error Handler Page (`error_handler.jsp`):
Must declare `isErrorPage="true"`, which enables access to the implicit `exception` object:
```jsp
<%@ page isErrorPage="true" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head><title>System Error Occurred</title></head>
<body style="font-family:sans-serif; background:#fff1f2;">
  <h2 style="color:#e11d48;">Application Error</h2>
  <p>We apologize for the inconvenience. Our engineering team has been notified.</p>
  <div style="background:#fff; border:1px solid #fecdd3; padding:15px; border-radius:6px;">
    <p><strong>Exception Type:</strong> <%= exception.getClass().getName() %></p>
    <p><strong>Error Message:</strong> <%= exception.getMessage() %></p>
  </div>
</body>
</html>
```

### Q3. [10/15 Marks] Compare Static Include (`<%@ include %>`) vs Dynamic Include (`<jsp:include>`) with Architectural Trade-offs.
**Comprehensive University Solution:**
### Static Include vs Dynamic Include

| Criteria | Static Include (`<%@ include file="..." %>`) | Dynamic Include (`<jsp:include page="..." />`) |
| :--- | :--- | :--- |
| **Execution Phase** | **Translation Phase** (Source file level) | **Runtime / Request Phase** (Invocation level) |
| **Mechanism** | Copies raw source code text of child into parent file before compilation | Intercepts at runtime via `RequestDispatcher.include()` |
| **Output Servlets** | Produces a **single** translated Servlet class | Produces **two separate** independent Servlet classes |
| **Dynamic Parameters**| Cannot pass parameters (`<jsp:param>` invalid) | Can pass runtime parameters via `<jsp:param>` |
| **File Changes** | Modification in included file may not recompile parent automatically | Changes in child page reflect immediately on next request |
| **Best Used For** | Static copyright banners, common HTML headers | Dynamic user profile widgets, navigation bars with active state |


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiner high-yield focus: JSP Lifecycle (guaranteed 10 marks), 9 Implicit objects table, and Static vs Dynamic include comparison.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
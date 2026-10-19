# BCA-431E: Introduction to Cyber Security
## Unit 2 Master Exam Revision Notes: Classes of Security Attacks & Security Models
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `0d25abda-3786-520e-bfaf-c25fdb49d3bc` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Taxonomy of Security Attacks: Passive Attacks (Eavesdropping, Traffic Analysis) vs Active Attacks (Masquerade, Replay, Modification, Denial of Service)**
- [x] **Network-Level Attacks: Man-in-the-Middle (MitM), ARP Spoofing, DNS Cache Poisoning, IP Spoofing & Session Hijacking**
- [x] **Denial of Service (DoS) and Distributed Denial of Service (DDoS): Smurf Attack, SYN Flood, UDP Flood, NTP Amplification, Botnets**
- [x] **Application-Level Attacks: SQL Injection (SQLi), Cross-Site Scripting (XSS - Stored, Reflected, DOM-Based), Cross-Site Request Forgery (CSRF)**
- [x] **Buffer Overflow Attacks: Stack-Based Buffer Overflows, Return-Oriented Programming (ROP), Pointer Corruption & Defense (ASLR, DEP)**
- [x] **Impact of Cyber Attacks: Financial Losses, Reputational Damage, Operational Disruptions, Legal Penalties & Critical Infrastructure Failures**
- [x] **Principles of Cyber Security Architecture: Simplicity, Fail-Safe Defaults, Complete Mediation, Open Design, Separation of Privilege**
- [x] **Classic Security Models: Bell-LaPadula Model (Confidentiality: No Read Up, No Write Down), Biba Model (Integrity: No Read Down, No Write Up)**
- [x] **Commercial Security Models: Clark-Wilson Model (Well-Formed Transactions, Separation of Duties), Chinese Wall Model (Conflict of Interest)**
- [x] **The CIA Triad: Core Tenets, Mutual Trade-offs, Availability vs Confidentiality Tensions in High-Speed Computing**
- [x] **The Star Model: Comprehensive Interlocking Framework for Cyber Security Strategy and Risk Governance**
- [x] **The Parkerian Hexad (Donn Parker): Confidentiality, Integrity, Availability, Authenticity, Possession/Control, and Utility Extensions**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Differentiate between Passive Attacks and Active Attacks.
**Model Answer:**
- **Passive Attacks:** Monitor or listen to transmissions to obtain information without altering data or system resources (e.g., eavesdropping, traffic analysis). Hard to detect, prevented via encryption.
- **Active Attacks:** Involve modification of the data stream or creation of a false stream (e.g., masquerade, replay, message modification, DoS). Detected and recovered via integrity controls.

### Q2. [2 Marks] Explain a Denial of Service (DoS) Attack.
**Model Answer:**
An attack designed to shut down a machine, service, or network, making it inaccessible to its intended users by overwhelming the target with spurious traffic or triggering a crash condition.

### Q3. [2 Marks] What is a Distributed Denial of Service (DDoS) Attack?
**Model Answer:**
A large-scale DoS attack launched simultaneously from thousands of compromised distributed internet machines (a **botnet** of infected zombies) controlled by a botmaster.

### Q4. [2 Marks] Explain a Man-in-the-Middle (MitM) Attack.
**Model Answer:**
An attacker secretly intercepts and relays communications between two parties who believe they are communicating directly with each other (e.g., via ARP poisoning or rogue Wi-Fi access points).

### Q5. [2 Marks] What is ARP Poisoning (ARP Spoofing)?
**Model Answer:**
An attack where an adversary sends forged ARP replies over a local area network (LAN) to associate the attacker's MAC address with the IP address of the legitimate default gateway, redirecting all LAN traffic through the attacker.

### Q6. [2 Marks] What are the two core rules of the Bell-LaPadula Security Model?
**Model Answer:**
1. **Simple Security Property (No Read Up):** A subject at a given security clearance cannot read an object at a higher classification level ($L(S) \ge L(O)$).
2. **$\star$-Property (No Write Down):** A subject at a higher clearance cannot write data to an object at a lower classification level ($L(S) \le L(O)$).

### Q7. [2 Marks] What is the primary focus of the Biba Integrity Model?
**Model Answer:**
The Biba Model focuses strictly on **data integrity** (preventing unauthorized modification) using dual rules:
1. **Simple Integrity (No Read Down):** A subject cannot read an object of lower integrity.
2. **$\star$-Integrity (No Write Up):** A subject cannot write to an object of higher integrity.

### Q8. [2 Marks] What is the Clark-Wilson Security Model?
**Model Answer:**
An integrity model designed for commercial environments based on transactions: ensures data can only be modified through certified **Transformation Procedures (TPs)** applied to **Constrained Data Items (CDIs)**, enforcing separation of duties.

### Q9. [2 Marks] Explain the Chinese Wall (Brewer-Nash) Security Model.
**Model Answer:**
A security model developed to avoid **conflicts of interest** in commercial consulting and finance. It dynamically restricts access: an analyst who accesses data belonging to Company A is immediately barred from accessing data belonging to Company B (Company A's competitor).

### Q10. [2 Marks] What is a Replay Attack and how is it mitigated?
**Model Answer:**
An active attack where valid network data transmission is maliciously captured and repeated later. Mitigated using cryptographic **nonces**, sequence numbers, and ephemeral session timestamps.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare the Bell-LaPadula Confidentiality Model vs Biba Integrity Model.
**Model Answer:**
| Dimension | Bell-LaPadula (BLP) Model | Biba Model |
| :--- | :--- | :--- |
| **Primary Objective** | **Confidentiality** (Prevents data leakage) | **Integrity** (Prevents data corruption) |
| **Read Rule** | **No Read Up** (Simple Security) | **No Read Down** (Simple Integrity) |
| **Write Rule** | **No Write Down** ($\star$-Property) | **No Write Up** ($\star$-Integrity) |
| **Domain** | Military / Government intelligence | Commercial enterprise, banking, accounting |
| **Philosophy** | Prevent secret info from leaking down | Prevent low-integrity noise from polluting high integrity |

### Q2. [5 Marks] Explain SYN Flood DDoS Attack and SYN Cookies Defense.
**Model Answer:**
### TCP 3-Way Handshake Exhaustion

```
Attacker (Botnet)                   Target Server
       |                                |
       | ----- 1. Send SYN ------------> | -> Allocates TCB in Half-Open Queue
       |                                |    (Sends SYN-ACK)
       | (Never sends final ACK!)       | -> Half-Open queue fills up to 100%
       |                                | -> Legitimate users DROPPED!
```
- **Defense (SYN Cookies):** Server does not allocate memory for half-open connection. Instead, it encodes client IP, port, and secret salt into the initial TCP sequence number. Memory is allocated only when client returns valid sequence number $+ 1$ in final ACK.

### Q3. [5 Marks] Explain DNS Amplification and Reflection DDoS Attacks.
**Model Answer:**
In a **DNS Amplification Attack**:
1. Attacker sends small UDP DNS query packets (e.g., 60 bytes) requesting maximum records (`ANY`).
2. Attacker **spoofs the source IP** to be the victim's server IP.
3. The public recursive DNS resolvers send massive amplified responses (up to 3000 bytes - a $50\times$ amplification factor) directly to the unsuspecting victim, saturating their bandwidth.

### Q4. [5 Marks] Describe the Clark-Wilson Model Components (CDI, UDI, TP, IVP).
**Model Answer:**
- **Constrained Data Item (CDI):** Highly sensitive data items whose integrity must be preserved (e.g., ledger balances).
- **Unconstrained Data Item (UDI):** Unvalidated inputs from outside world.
- **Transformation Procedure (TP):** Certified programs that alone have permission to alter CDIs.
- **Integrity Verification Procedure (IVP):** Confirms that CDIs conform to valid system state.

### Q5. [5 Marks] Explain Smurf and Fraggle Attacks.
**Model Answer:**
- **Smurf Attack:** Attacker sends ICMP Echo requests (pings) with a spoofed victim source IP to an IP broadcast address; all LAN hosts reply simultaneously to the victim.
- **Fraggle Attack:** Similar to Smurf, but utilizes UDP echo packets (Port 7) instead of ICMP.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Provide an In-Depth Analysis of the Bell-LaPadula Mathematical Security Model, Proving How the $\star$-Property Prevents Covert Downward Leaks.
**Comprehensive University Solution:**
### Formal Mathematical Analysis of Bell-LaPadula (BLP 1973)

#### 1. Mathematical Elements:
- Let $S$ be the set of Subjects (users, processes).
- Let $O$ be the set of Objects (files, databases, memory segments).
- Let $(L, \le)$ be a partially ordered lattice of security classifications:
  $$\text{Unclassified} < \text{Confidential} < \text{Secret} < \text{Top Secret}$$
- Each subject has clearance $L(s) \in L$, and each object has classification $L(o) \in L$.

#### 2. The Two Axiomatic Properties:

```
                [ Top Secret Object ]
                     ^         |
                     |         | CANNOT READ UP
      CANNOT WRITE   |         |
      DOWN (*)       |         v
                [ Secret Subject ]
                     ^         |
                     |         | CAN READ DOWN
      CAN WRITE      |         |
      UP (*)         |         v
                [ Unclassified Object ]
```

1. **Simple Security Property (ss-property - No Read Up):**
   A subject $s$ may have read access to an object $o$ if and only if:
   $$L(s) \ge L(o)$$
   *Proof:* A user with Secret clearance can read Unclassified or Secret documents, but cannot view Top Secret records.

2. **The $\star$-Property (Star Property - No Write Down):**
   A subject $s$ with read access to an object $o_1$ may have write access to an object $o_2$ if and only if:
   $$L(o_2) \ge L(o_1)$$
   *(Or in discretionary form: $L(o) \ge L(s)$)*.

#### 3. Mathematical Proof of Leak Prevention:
- Suppose the $\star$-property did not exist.
- A malicious Trojan Horse process running with **Top Secret** clearance could read a Top Secret cryptographic key ($o_1$).
- The Trojan could then open an **Unclassified** log file ($o_2$) and write the secret key into it.
- Any user with Unclassified clearance could then read $o_2$ and steal the Top Secret key!
- By enforcing $L(o_2) \ge L(s)$, the Top Secret process is strictly prohibited from writing to any object below Top Secret clearance. Thus, downward information flow is mathematically impossible. $\blacksquare$

### Q2. [10/15 Marks] Detail the Mechanics of ARP Cache Poisoning and Man-in-the-Middle Attacks with Packet Flow Schematics and Python Scapy Script.
**Comprehensive University Solution:**
### ARP Cache Poisoning Architecture

```
[ VICTIM (Client) ]               [ ATTACKER ]               [ GATEWAY (Router) ]
IP: 192.168.1.50               IP: 192.168.1.100              IP: 192.168.1.1
MAC: AA:AA:AA:AA:AA:AA         MAC: CC:CC:CC:CC:CC:CC         MAC: BB:BB:BB:BB:BB:BB
         |                              |                                |
         | <--- Gratuitous ARP Reply ---|                                |
         |      "192.168.1.1 is at      |                                |
         |       CC:CC:CC:CC:CC:CC"     |                                |
         |                              |--- Gratuitous ARP Reply -----> |
         |                              |    "192.168.1.50 is at         |
         |                              |     CC:CC:CC:CC:CC:CC"         |
```

#### Attack Flow:
1. Attacker continuously transmits unsolicited ARP reply packets to Victim asserting that the Gateway IP has the Attacker's MAC.
2. Attacker transmits ARP reply to Gateway asserting that the Victim IP has the Attacker's MAC.
3. Both victim and gateway overwrite their internal ARP tables without verification (stateless protocol flaw).
4. All outbound and inbound traffic routes through the attacker's network interface.

#### Python Scapy Implementation:
```python
from scapy.all import Ether, ARP, sendp
import time

def arp_spoof(target_ip, target_mac, spoof_ip):
    """Sends forged ARP reply to poison ARP cache."""
    # op=2 signifies ARP Reply (is-at)
    packet = Ether(dst=target_mac) / ARP(op=2, pdst=target_ip, hwdst=target_mac, psrc=spoof_ip)
    sendp(packet, verbose=False)

print("ARP Spoofing simulation ready (Requires Scapy + Root privileges).")
```

### Q3. [10/15 Marks] Explain the Chinese Wall (Brewer-Nash) Security Model for Commercial Conflicts of Interest.
**Comprehensive University Solution:**
### Brewer-Nash Chinese Wall Formalism (1989)

#### 1. Entity Hierarchy:
- **Company Datasets (CDs):** Files belonging to an individual corporation (e.g., Bank of Baroda).
- **Conflict of Interest (COI) Classes:** Datasets of companies in direct competition with each other (e.g., $\{ \text{Bank A}, \text{Bank B}, \text{Bank C} \}$).

#### 2. Dynamic Access Rules:
- A subject $s$ is allowed access to object $o$ if and only if:
  1. $o$ is in the same Company Dataset that $s$ has previously accessed, OR
  2. $o$ belongs to an entirely different Conflict of Interest class.
- **Result:** The wall is dynamic. Before the analyst opens any file, they have access to all companies. The moment they open their first document for Bank A, the 'wall drops' permanently barring them from ever opening records for Bank B or Bank C.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently ask: Bell-LaPadula vs Biba comparison table (10 marks Section C), MitM ARP poisoning mechanics, and DDoS SYN flood explanation.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
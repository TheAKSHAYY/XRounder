# BCA-431E: Introduction to Cyber Security
## Unit 1 Master Exam Revision Notes: Introduction to Cyber Security, Cyberspace & Threats
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `9a72b703-7561-57b7-81fb-929bdf3f20fd` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Introduction to Cyber Security: Definition, Scope, Need for Security in Digitized Society & Economic Impacts**
- [x] **Concept of Cyberspace: Architecture, Virtual Interconnected Environments, Cyber Ecosystem Components & Infrastructure**
- [x] **Evolution of Cyber Crimes and Cyber Attacks: Historical Trajectory, Hobbyist Hackers to State-Sponsored Advanced Persistent Threats (APTs)**
- [x] **Fundamental Security Concepts: Assets, Threats, Vulnerabilities, Exploits, Risks & Attack Surfaces**
- [x] **Threat Modeling: STRIDE Model (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)**
- [x] **The Fundamental Security Triad: Confidentiality (Privacy, Secrecy), Integrity (Data Authenticity, Non-Alteration) & Availability (Reliable Access)**
- [x] **Authentication and Non-Repudiation: Identity Verification Factors (Something You Know, Have, Are) & Digital Evidence Integrity**
- [x] **Access Control Principles: Subject, Object, Principle of Least Privilege, Separation of Duties & Defense in Depth**
- [x] **Categories of Cyber Criminals: Script Kiddies, Cyber Insiders, Hacktivists, Organized Cyber syndicates & Nation-State Actors**
- [x] **Classification of Vulnerabilities: Common Vulnerabilities and Exposures (CVE), CVSS Scoring System, Zero-Day Exploits**
- [x] **Overview of Malicious Software (Malware): Viruses, Worms, Trojan Horses, Spyware, Adware, Ransomware & Rootkits**
- [x] **Social Engineering Attacks: Phishing (Spear, Whaling), Pretexting, Baiting, Vishing, Smishing & Human Exploitation Vectors**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define Cyber Security and Cyberspace.
**Model Answer:**
**Cyberspace** is the complex, interdependent global environment of computer networks, information systems, software, and digital communications. **Cyber Security** is the practice of protecting cyberspace, systems, networks, devices, and data from unauthorized digital attacks, damage, or unauthorized access.

### Q2. [2 Marks] What are the three pillars of the CIA Triad?
**Model Answer:**
1. **Confidentiality:** Preventing unauthorized disclosure of sensitive data (encryption, access control).
2. **Integrity:** Ensuring information is authentic, accurate, and protected against unauthorized modification (checksums, hashing).
3. **Availability:** Ensuring authorized users have timely, reliable access to critical assets and services (redundancy, DDoS defense).

### Q3. [2 Marks] Differentiate between a Threat, a Vulnerability, and a Risk.
**Model Answer:**
- **Vulnerability:** A weakness or flaw in a system's design, configuration, or implementation (e.g., unpatched software).
- **Threat:** Any potential circumstance or event with the capacity to exploit a vulnerability and cause harm (e.g., hacker, malware).
- **Risk:** The expected likelihood and magnitude of impact resulting from a threat exploiting a vulnerability ($\text{Risk} = \text{Threat} \times \text{Vulnerability} \times \text{Impact}$).

### Q4. [2 Marks] What is Social Engineering in cyber security?
**Model Answer:**
The psychological manipulation of individuals into divulging confidential information or performing actions that compromise security (e.g., pretexting, baiting, tailgating).

### Q5. [2 Marks] Explain Phishing and Spear Phishing.
**Model Answer:**
- **Phishing:** Mass broadcast fraudulent communications masquerading as trustworthy entities to trick users into revealing credentials.
- **Spear Phishing:** Highly customized, targeted phishing directed at specific high-profile individuals using customized intelligence.

### Q6. [2 Marks] What is Ransomware and how does it propagate?
**Model Answer:**
A malicious software that encrypts victim data using military-grade asymmetric/symmetric ciphers, demanding extortion payment (typically in cryptocurrency) for the decryption key. Propagates via phishing emails, exploit kits, or unpatched RDP ports.

### Q7. [2 Marks] Differentiate between a Virus, a Worm, and a Trojan Horse.
**Model Answer:**
| Malware Type | Host File Required? | Self-Replicating? | Primary Mechanism |
| :--- | :--- | :--- | :--- |
| **Virus** | Yes (attaches to host executable) | Yes (replicates when host runs) | Corrupts host files |
| **Worm** | No (standalone process) | Yes (propagates autonomously via network) | Consumes bandwidth & system resources |
| **Trojan** | Yes/No (masquerades as useful app) | No | Provides stealth backdoor for attackers |

### Q8. [2 Marks] What is an Attack Surface?
**Model Answer:**
The total sum of all possible points (vectors) where an unauthorized user can attempt to enter data into or extract data from a software environment or network (open ports, web forms, API endpoints, employee credentials).

### Q9. [2 Marks] Define Non-Repudiation in security architecture.
**Model Answer:**
The assurance that a sender or transacting party cannot deny the authenticity of their signature or having sent a message (guaranteed through asymmetric digital signatures and audit logging).

### Q10. [2 Marks] What is Zero Trust Architecture (ZTA)?
**Model Answer:**
A security paradigm based on the principle **'Never Trust, Always Verify'**. It eliminates implicit trust based on network perimeter location and requires strict continuous authentication and least-privilege verification for every user and device.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the CIA Triad with Real-World Security Breach Scenarios.
**Model Answer:**
```
                      [ CONFIDENTIALITY ]
                              /   \
                             /     \
                            /       \
                           /         \
           [ INTEGRITY ] ------------- [ AVAILABILITY ]
```

1. **Confidentiality Violation:** A hospital database breach exposing unencrypted medical patient records and financial credit card data on the dark web.
2. **Integrity Violation:** A financial attacker intercepting a wire transfer transaction and tampering with the bank recipient account number and transaction amount.
3. **Availability Violation:** A distributed denial-of-service (DDoS) attack flooding a university examination portal with 50 Gbps of bogus traffic on the morning of final exams, causing server crash.

### Q2. [5 Marks] Compare Black Hat, White Hat, and Grey Hat Hackers.
**Model Answer:**
| Hacker Type | Intent & Motivation | Authorization | Legality |
| :--- | :--- | :--- | :--- |
| **White Hat** (Ethical Hacker) | Discovers security holes to patch them | Explicit written authorization | Completely legal |
| **Black Hat** (Cyber Criminal) | Personal gain, extortion, political malice | Zero authorization | Illegal / Criminal offense |
| **Grey Hat** | Curiosity or public disclosure without permission | Unauthorized, but reports flaw without extortion | Legally ambiguous / Unauthorized |

### Q3. [5 Marks] Explain the Cyber Kill Chain Framework (Lockheed Martin).
**Model Answer:**
### 7 Stages of the Cyber Kill Chain
1. **Reconnaissance:** Harvesting email addresses, DNS data, employee LinkedIn profiles.
2. **Weaponization:** Coupling an exploit with a malicious payload (e.g., infected PDF).
3. **Delivery:** Transmitting weaponized payload via phishing email or malicious URL.
4. **Exploitation:** Triggering vulnerability in victim software (e.g., buffer overflow).
5. **Installation:** Installing malware / remote access trojan (RAT) on victim asset.
6. **Command & Control (C2):** Establishing encrypted beaconing back to attacker server.
7. **Actions on Objectives:** Data exfiltration, file encryption, or destruction.

### Q4. [5 Marks] Describe Common Social Engineering Tactics and Defenses.
**Model Answer:**
- **Pretexting:** Creating an elaborate fabricated scenario (impersonating IT support) to manipulate victim into resetting passwords.
- **Baiting:** Leaving malware-infected USB drives in company parking lots labeled 'Executive Salaries 2025'.
- **Tailgating (Piggybacking):** Unauthorized person physically following an authorized employee through a secure RFID access door.
- **Defenses:** Mandatory security awareness training, multi-factor authentication (MFA), strict visitor verification policies.

### Q5. [5 Marks] Explain Advanced Persistent Threats (APTs) and their Characteristics.
**Model Answer:**
An **APT** is a prolonged, stealthy cyber attack campaign orchestrated by well-funded state actors or organized syndicates:
- Characteristics: Highly targeted, customized zero-day exploits, deep persistence inside network for months/years, quiet low-bandwidth data exfiltration to evade IDS alerts.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Provide an In-Depth Examination of Modern Ransomware Architectures, Hybrid Cryptography Mechanisms, and Mitigation Strategies.
**Comprehensive University Solution:**
### Anatomy of Modern Dual-Extortion Ransomware

```
[ INFILTRATION ]
Phishing / Exploit ---> Dropper Execution ---> Disables Shadow Copies (vssadmin delete shadows)
                               |
                               v
[ HYBRID ENCRYPTION ENGINE ]
1. Generates local symmetric session key: AES-256 (High-speed encryption)
2. Encrypts all user documents (*.docx, *.xlsx, *.db, *.pdf) in-place
3. Encrypts AES key with Attacker's embedded Public Key (RSA-4096)
4. Destroys plaintext AES key from RAM
                               |
                               v
[ EXFILTRATION & EXTORTION ]
Exfiltrates sensitive files to C2 ---> Drops 'RESTORE_README.txt' ---> Demands Bitcoin / Monero
```

#### 1. Why Symmetric + Asymmetric Hybrid Encryption is Used:
- **Pure RSA-4096:** Computationally slow; cannot encrypt gigabytes of enterprise file storage in reasonable time.
- **Pure AES-256:** Extremely fast, but if the symmetric key remains on the infected machine, forensic analysts can recover it from memory dump.
- **Hybrid Solution:** Fast AES-256 encrypts the files, and the attacker's public RSA key encrypts the AES key. Only the attacker's private key (safely stored on their command server) can decrypt the AES key.

#### 2. The 3-2-1 Backup Strategy (The Gold Standard Defense):
- Maintain **3** total copies of critical business data.
- Store backups on **2** different physical media types (e.g., Local NVMe NAS and Tape/Cloud).
- Keep **1** copy completely **offsite and air-gapped / immutable** (WORM - Write Once, Read Many).

### Q2. [10/15 Marks] Detail the Attack Surface Analysis and Threat Modeling using STRIDE.
**Comprehensive University Solution:**
### Microsoft STRIDE Threat Modeling Methodology

```
+-----------------------------------------------------------------------------------+
| S - Spoofing          | Pretending to be someone or something else                |
| T - Tampering         | Modifying data or code unauthorizedly                     |
| R - Repudiation       | Denying having performed an action                        |
| I - Information Disc. | Exposing private data to unauthorized individuals         |
| D - Denial of Service | Degrade or halt system availability                       |
| E - Elevation of Priv.| Gaining higher permissions than authorized                |
+-----------------------------------------------------------------------------------+
```

#### Application to Banking API:
1. **Spoofing:** Attacker sends fake HTTP requests claiming to be account owner $\to$ **Mitigation:** Mutual TLS (mTLS) and OAuth 2.0 Bearer tokens.
2. **Tampering:** Modifying transfer amount in transit $\to$ **Mitigation:** HMAC-SHA256 digital signatures.
3. **Repudiation:** Customer denies transferring money $\to$ **Mitigation:** Cryptographic audit trail with non-repudiation timestamps.
4. **Information Disclosure:** Unencrypted credit card numbers in logs $\to$ **Mitigation:** Tokenization and AES-GCM data-at-rest encryption.
5. **Denial of Service:** Flooding API endpoints $\to$ **Mitigation:** Rate limiting with token bucket algorithms and cloud WAFs.
6. **Elevation of Privilege:** Standard user accessing `/admin/dashboard` $\to$ **Mitigation:** Role-Based Access Control (RBAC) enforced on server side.

### Q3. [10/15 Marks] Implement a Python Network Socket Scanner for Port Vulnerability Assessment.
**Comprehensive University Solution:**
```python
import socket
import sys
from datetime import datetime

def scan_ports(target_host, start_port, end_port):
    """Scans TCP ports on target host to assess attack surface."""
    try:
        target_ip = socket.gethostbyname(target_host)
    except socket.gaierror:
        print(f"[ERROR] Hostname {target_host} could not be resolved.")
        return

    print("=" * 60)
    print(f"Scanning Target: {target_host} ({target_ip})")
    print(f"Port Range: {start_port} to {end_port}")
    print(f"Time started: {str(datetime.now())}")
    print("=" * 60)

    open_ports = []
    for port in range(start_port, end_port + 1):
        # Create TCP socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.5) # Fast 500ms timeout
        
        result = sock.connect_ex((target_ip, port))
        if result == 0:
            try:
                service = socket.getservbyport(port, 'tcp')
            except:
                service = "Unknown Service"
            print(f"[OPEN] Port {port:5d}/tcp - Service: {service}")
            open_ports.append(port)
        sock.close()
        
    print("-" * 60)
    print(f"Scan complete. Found {len(open_ports)} open ports: {open_ports}")

# Scan localhost common administrative ports
if __name__ == '__main__':
    scan_ports('127.0.0.1', 20, 85)
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiner high-yield focus: CIA Triad definitions with examples (guaranteed 5-10 marks), STRIDE threat modeling, and Ransomware hybrid encryption mechanics.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
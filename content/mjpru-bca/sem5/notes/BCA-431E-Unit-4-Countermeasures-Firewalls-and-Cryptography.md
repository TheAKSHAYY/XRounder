# BCA-431E: Introduction to Cyber Security
## Unit 4 Master Exam Revision Notes: Security Countermeasures, Firewalls & Cryptography
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `2c6daea1-ce26-5b85-a594-f87b5bf054ba` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Security Countermeasure Architecture: Preventative, Detective, Corrective, Compensating & Deterrent Controls**
- [x] **Firewall Technologies: Definition, Packet Filtering Firewalls (Stateless vs Stateful Inspection), Circuit-Level Gateways**
- [x] **Application-Level Gateways (Proxy Firewalls) & Next-Generation Firewalls (NGFW): Deep Packet Inspection (DPI), Intrusion Prevention, SSL Decryption**
- [x] **Firewall Architectures: Dual-Homed Host, Screened Host, Screened Subnet (Demilitarized Zone - DMZ) Topologies**
- [x] **Antivirus and Anti-Malware Systems: Signature-Based Scanning, Heuristic Analysis, Behavior Monitoring, Sandboxing Execution**
- [x] **System Hardening Techniques: Disabling Default Accounts, Closing Unused Ports/Services, Patch Management, OS Configuration Baselines**
- [x] **Fundamentals of Cryptography: Plaintext, Ciphertext, Ciphers, Keys, Cryptanalysis, Kerckhoffs's Principle**
- [x] **Symmetric (Secret Key) Cryptography: Stream Ciphers vs Block Ciphers, Substitution-Permutation Networks, Feistel Cipher Structure**
- [x] **Symmetric Encryption Standards: Data Encryption Standard (DES), Triple-DES (3DES), Advanced Encryption Standard (AES - 128, 192, 256 bits)**
- [x] **Asymmetric (Public Key) Cryptography: Trapdoor One-Way Functions, Key Pairs (Public/Private), RSA Algorithm & Elliptic Curve Cryptography (ECC)**
- [x] **Cryptographic Hash Functions: Properties (Pre-image Resistance, Collision Resistance), MD5, SHA-1, SHA-256, Message Authentication Codes (MAC, HMAC)**
- [x] **Digital Signatures & Public Key Infrastructure (PKI): Digital Signatures (Non-Repudiation), X.509 Digital Certificates, Certificate Authorities (CA), SSL/TLS Handshake**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is Cryptography and what are its two primary branches?
**Model Answer:**
Cryptography is the science of securing communication through mathematical encryption techniques. The two branches are **Symmetric Key Cryptography** (single shared secret key) and **Asymmetric Key Cryptography** (public-private key pair).

### Q2. [2 Marks] Differentiate between Symmetric and Asymmetric Encryption.
**Model Answer:**
| Feature | Symmetric Encryption (AES, DES) | Asymmetric Encryption (RSA, ECC) |
| :--- | :--- | :--- |
| **Key Count** | Single shared secret key | Two mathematically linked keys (Public & Private) |
| **Execution Speed** | Extremely fast (hardware accelerated) | Slower (complex modular exponentiation) |
| **Key Distribution**| High risk (must share secret key safely) | Easy (public key is openly distributed) |
| **Primary Use** | Bulk data-at-rest & payload encryption | Key exchange, digital signatures, authentication |

### Q3. [2 Marks] What is a Cryptographic Hash Function? Name three properties.
**Model Answer:**
A mathematical algorithm that maps arbitrary-length data to a fixed-size bit string (digest). Properties: 1. **Pre-image resistance** (one-way), 2. **Second pre-image resistance** (weak collision), 3. **Collision resistance** (hard to find two distinct inputs with identical hash).

### Q4. [2 Marks] Explain the working of a Digital Signature.
**Model Answer:**
The sender hashes the message to produce a digest and encrypts the digest with their **Private Key**. The recipient decrypts the signature using the sender's **Public Key** and compares it with their computed hash. Ensures authenticity, integrity, and non-repudiation.

### Q5. [2 Marks] What is a Firewall and where is it deployed?
**Model Answer:**
A network security device/software that monitors and controls incoming and outgoing network traffic based on predetermined security rules, positioned at the perimeter boundary between trusted internal LAN and untrusted public internet.

### Q6. [2 Marks] Compare Packet-Filtering Firewalls and Stateful Inspection Firewalls.
**Model Answer:**
- **Packet-Filtering (Stateless):** Inspects individual packets in isolation based on static rules (source/dest IP, port, protocol) without tracking connection state.
- **Stateful Inspection:** Tracks active TCP/UDP connection states in a state table, verifying whether incoming packets belong to established, legitimate flows.

### Q7. [2 Marks] What is an Application-Level Gateway (Proxy Firewall)?
**Model Answer:**
A firewall operating at the Application Layer (Layer 7) that acts as an intermediary, inspecting full payload contents, HTTP headers, and URL paths before forwarding requests.

### Q8. [2 Marks] Differentiate between an IDS and an IPS.
**Model Answer:**
- **IDS (Intrusion Detection System):** Passive monitoring sensor that detects suspicious activity and raises security alerts without stopping traffic.
- **IPS (Intrusion Prevention System):** Active in-line device that detects attacks and immediately **blocks/drops malicious packets** in real-time.

### Q9. [2 Marks] What is Signature-Based Detection vs Anomaly-Based Detection in IDS?
**Model Answer:**
- **Signature-Based:** Compares traffic against a database of known attack byte patterns (fast, high accuracy, but blind to zero-days).
- **Anomaly-Based:** Establishes a baseline of normal network behavior and flags statistical deviations (detects zero-days, but higher false-positive rate).

### Q10. [2 Marks] What is a Demilitarized Zone (DMZ) in network architecture?
**Model Answer:**
A physical or logical subnetwork that contains and exposes an organization's external-facing services (web, mail, DNS) to an untrusted network, while isolating the private internal corporate network behind an interior firewall.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the RSA Public Key Algorithm Mathematical Steps.
**Model Answer:**
### RSA Algorithm Formulation (Rivest, Shamir, Adleman 1977)
1. Select two large distinct prime numbers $p$ and $q$.
2. Compute modulus $n = p \cdot q$.
3. Compute Euler's totient: $\phi(n) = (p - 1)(q - 1)$.
4. Choose public exponent $e$ such that $1 < e < \phi(n)$ and $\gcd(e, \phi(n)) = 1$.
5. Compute private exponent $d$ such that $d \cdot e \equiv 1 \pmod{\phi(n)}$ (modular multiplicative inverse).
6. **Public Key:** $(e, n)$, **Private Key:** $(d, n)$.

- **Encryption:** $C = M^e \pmod n$
- **Decryption:** $M = C^d \pmod n$

### Q2. [5 Marks] Explain the Advanced Encryption Standard (AES) Architecture.
**Model Answer:**
AES is an iterative symmetric block cipher operating on 128-bit blocks with key sizes 128, 192, or 256 bits:
- **Rounds:** 10 rounds (128-bit), 12 rounds (192-bit), 14 rounds (256-bit).
- **4 Core Transformations per Round:**
  1. `SubBytes`: Non-linear byte substitution using Rijndael S-Box.
  2. `ShiftRows`: Cyclically shifting rows of the state array.
  3. `MixColumns`: Matrix multiplication over Galois Field $GF(2^8)$.
  4. `AddRoundKey`: Bitwise XOR with round subkey.

### Q3. [5 Marks] Explain Network Perimeter Architecture with DMZ and Dual Firewalls.
**Model Answer:**
```
[ INTERNET ]
     |
     v
[ External Firewall ]
     |
     +---> [ DMZ Subnet: Public Web Server, DNS Server, Mail Proxy ]
     |
     v
[ Internal Firewall ]
     |
     +---> [ Internal LAN: Active Directory, Database, Core Enterprise ]
```
- If an external attacker compromises the Web Server in the DMZ, the interior firewall prevents direct traversal into confidential backend databases.

### Q4. [5 Marks] Compare Network IDS (NIDS) vs Host IDS (HIDS).
**Model Answer:**
| Attribute | Network IDS (NIDS) | Host IDS (HIDS) |
| :--- | :--- | :--- |
| **Deployment** | Promiscuous tap on core network switches | Installed directly on individual servers/endpoints |
| **Visibility** | Analyzes full network packet streams | Inspects local system logs, file integrity, API calls |
| **Encrypted Traffic**| Cannot inspect encrypted TLS/HTTPS packets | Can inspect decrypted data in system memory |
| **Performance** | Zero impact on host CPU/RAM | Consumes host system resources |

### Q5. [5 Marks] Explain Diffie-Hellman Key Exchange and the Man-in-the-Middle Vulnerability.
**Model Answer:**
Diffie-Hellman enables two parties to negotiate a shared secret over an insecure channel without transmitting the secret:
- Based on the discrete logarithm problem in modular arithmetic: $A = g^a \pmod p$, $B = g^b \pmod p$.
- Shared Secret: $K = B^a \pmod p = A^b \pmod p$.
- **Vulnerability:** Unauthenticated! An active attacker can intercept $A$ and $B$, establishing separate DH sessions with both parties (solved via digital certificates in TLS).


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Trace the Complete RSA Public Key Encryption and Decryption with a Full Numerical Problem.
**Comprehensive University Solution:**
### Step-by-Step RSA Numerical Proof

#### Step 1: Prime Selection
Let prime $p = 7$, and prime $q = 11$.

#### Step 2: Compute Modulus $n$
$$n = p \times q = 7 \times 11 = \mathbf{77}$$

#### Step 3: Compute Euler's Totient $\phi(n)$
$$\phi(n) = (p - 1)(q - 1) = (7 - 1)(11 - 1) = 6 \times 10 = \mathbf{60}$$

#### Step 4: Choose Public Encryption Exponent $e$
Find $e$ coprime to $60$ ($\gcd(e, 60) = 1$):
Choose $\mathbf{e = 7}$ (since $\gcd(7, 60) = 1$).

#### Step 5: Compute Private Decryption Exponent $d$
Find $d$ such that $d \times e \equiv 1 \pmod{\phi(n)} \implies 7d \equiv 1 \pmod{60}$:
$$7d = 60k + 1$$
- For $k = 1: 61 / 7$ (not integer)
- For $k = 2: 121 / 7$ (not integer)
- For $k = 3: 181 / 7$ (not integer)
- For $k = 4: 241 / 7$ (not integer)
- For $k = 5: 301 / 7 = \mathbf{43}$!
$$\mathbf{d = 43}$$
- **Public Key:** $(e=7, n=77)$
- **Private Key:** $(d=43, n=77)$

#### Step 6: Encryption Operation
Let plaintext message $M = 9$:
$$C = M^e \pmod n = 9^7 \pmod{77}$$
Using modular exponentiation:
- $9^1 = 9$
- $9^2 = 81 \equiv 4 \pmod{77}$
- $9^4 = 4^2 = 16 \pmod{77}$
- $9^7 = 9^4 \times 9^2 \times 9^1 = 16 \times 4 \times 9 = 64 \times 9 = 576 \pmod{77}$
- $576 = 77 \times 7 + 37 \implies \mathbf{C = 37}$
Ciphertext transmitted across network is **37**.

#### Step 7: Decryption Operation
$$M = C^d \pmod n = 37^{43} \pmod{77}$$
Decompose $43 = 32 + 8 + 2 + 1$:
- $37^1 \equiv 37 \pmod{77}$
- $37^2 = 1369 \equiv 60 \pmod{77}$
- $37^4 = 60^2 = 3600 \equiv 58 \pmod{77}$
- $37^8 = 58^2 = 3364 \equiv 53 \pmod{77}$
- $37^{16} = 53^2 = 2809 \equiv 37 \pmod{77}$
- $37^{32} = 37^2 = 1369 \equiv 60 \pmod{77}$
Multiply components:
$$M = 37^{32} \times 37^8 \times 37^2 \times 37^1 \pmod{77}$$
$$M = (60 \times 53 \times 60 \times 37) \pmod{77}$$
- $60 \times 53 = 3180 \equiv 23 \pmod{77}$
- $60 \times 37 = 2220 \equiv 64 \pmod{77}$
- $23 \times 64 = 1472 = 77 \times 19 + 9 \implies \mathbf{M = 9}$!
**Decryption successfully restored the original message $M = 9$!**

### Q2. [10/15 Marks] Explain Firewall Generations and Deep Packet Inspection (DPI) with Packet Filtering iptables Architecture.
**Comprehensive University Solution:**
### Firewall Architectural Evolution

```
Generation 1: Packet Filtering (L3/L4 - IP/Port Header only)
Generation 2: Stateful Inspection (L4 - State Connection Tracking)
Generation 3: Application Proxy (L7 - Protocol Compliance)
Generation 4: Next-Gen Firewall (NGFW) with Deep Packet Inspection (DPI, SSL Decryption, IPS)
```

#### Linux Netfilter / iptables Architecture:
Traffic flows through sequential tables (`raw`, `mangle`, `nat`, `filter`) and chains (`PREROUTING`, `INPUT`, `FORWARD`, `OUTPUT`, `POSTROUTING`):
```bash
# 1. Set default drop policy
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# 2. Allow established and related connections (Stateful tracking)
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# 3. Allow loopback interface
iptables -A INPUT -i lo -j ACCEPT

# 4. Allow SSH (Port 22) and HTTPS (Port 443)
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

### Q3. [10/15 Marks] Implement a Python Cryptographic Hashing and Digital Signature Simulation.
**Comprehensive University Solution:**
```python
import hashlib

def simple_hash(message):
    return hashlib.sha256(message.encode('utf-8')).hexdigest()

# Toy RSA Digital Signature Simulation
def toy_rsa_sign(message_digest_int, d, n):
    # Signature = (Hash)^d mod n
    return pow(message_digest_int, d, n)

def toy_rsa_verify(signature, e, n):
    # Recovered Hash = (Signature)^e mod n
    return pow(signature, e, n)

# Using previous parameters: e=7, d=43, n=77
e, d, n = 7, 43, 77

# Document hash truncated for toy math: 15
document_digest = 15
signature = toy_rsa_sign(document_digest, d, n)
print(f"Original Digest: {document_digest} | Generated Digital Signature: {signature}")

# Recipient Verification
recovered_digest = toy_rsa_verify(signature, e, n)
print(f"Verified Digest from Public Key: {recovered_digest}")
assert recovered_digest == document_digest, "Signature Verification Failed!"
print("[SUCCESS] Digital Signature verified: Authenticity and Non-Repudiation guaranteed.")
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently ask: RSA algorithm derivation with numerical example (guaranteed 10/15 marks Section C), Firewall types comparison, and Symmetric vs Asymmetric encryption.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
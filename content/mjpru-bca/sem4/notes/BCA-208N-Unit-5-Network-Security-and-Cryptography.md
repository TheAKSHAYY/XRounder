# BCA-208N: Computer Networks
## Unit 5 Master Exam Revision Notes: Network Security, Cryptography & Secure Protocols
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Network Security Fundamentals: Security Goals (Confidentiality, Integrity, Availability - CIA Triad), Non-Repudiation, Authentication**
- [x] **Threats and Cyber Attacks: Passive Attacks (Eavesdropping, Traffic Analysis) vs Active Attacks (Masquerade, Replay, Modification, Denial of Service - DoS/DDoS)**
- [x] **Cryptography Basics: Plaintext, Ciphertext, Encryption, Decryption, Kerckhoffs's Principle**
- [x] **Symmetric-Key (Secret-Key) Cryptography: Principles, Advantages, Shared Secret Distribution Problem, DES, Triple-DES, Advanced Encryption Standard (AES)**
- [x] **Asymmetric-Key (Public-Key) Cryptography: Key Pairs (Public Key, Private Key), Mathematical Trapdoor Functions, RSA Algorithm**
- [x] **Message Authentication & Integrity: Cryptographic Hash Functions (MD5, SHA-256), Collision Resistance, Message Authentication Codes (MAC / HMAC)**
- [x] **Digital Signatures: Signing with Private Key, Verification with Public Key, Non-Repudiation Proof, Digital Certificates (X.509 Standard, Certificate Authority - CA)**
- [x] **Key Management & Distribution: Public Key Infrastructure (PKI), Diffie-Hellman Key Exchange Algorithm (Discrete Logarithm Problem)**
- [x] **Network Layer Security - IP Security (IPSec): Architecture, Authentication Header (AH), Encapsulating Security Payload (ESP), Transport Mode vs Tunnel Mode**
- [x] **Transport Layer Security (TLS / SSL): Handshake Protocol, Record Protocol, HTTPS (Port 443), Securing Web Transactions**
- [x] **Application Layer Security: Pretty Good Privacy (PGP) for Email Security (Confidentiality, Authentication, Compression, Radix-64 Conversion)**
- [x] **Perimeter Defense: Firewalls (Packet Filtering Firewalls, Stateful Inspection Firewalls, Application Proxy Firewalls), Virtual Private Networks (VPNs - IPsec/SSL VPNs)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What are the three pillars of the CIA Triad in information security?
**Model Answer:**
1. **Confidentiality**: Ensuring data is accessible only to authorized entities.
2. **Integrity**: Protecting data against unauthorized modification or tampering.
3. **Availability**: Ensuring network systems and resources remain accessible when needed.

### Q2. [2 Marks] Differentiate between Passive Attacks and Active Attacks.
**Model Answer:**
- **Passive Attacks**: Adversary monitors or eavesdrops on communication channels without altering data (e.g., packet sniffing, traffic analysis).
- **Active Attacks**: Adversary alters data streams, injects forged messages, replays packets, or disrupts system availability (e.g., DoS, MitM, IP spoofing).

### Q3. [2 Marks] What is the difference between Symmetric and Asymmetric Cryptography?
**Model Answer:**
- **Symmetric**: Single shared secret key used for both encryption and decryption (e.g., AES, DES).
- **Asymmetric**: Mathematically paired keys; Public Key encrypts, and matching Private Key decrypts (e.g., RSA, ECC).

### Q4. [2 Marks] What mathematical problem forms the basis of the RSA cryptosystem?
**Model Answer:**
The computational difficulty of factoring large composite integers into their two giant prime factors ($N = p \times q$).

### Q5. [2 Marks] What is a Digital Signature, and which key is used to create it?
**Model Answer:**
A Digital Signature is an encrypted hash of a message created using the **Sender's Private Key**. Anyone with the sender's Public Key can verify authenticity, integrity, and non-repudiation.

### Q6. [2 Marks] What does a Certificate Authority (CA) do in Public Key Infrastructure (PKI)?
**Model Answer:**
A CA acts as a trusted third party that verifies an entity's legal identity and issues digitally signed X.509 certificates binding the entity's identity to their public key.

### Q7. [2 Marks] At which network layer does IPsec operate?
**Model Answer:**
IPsec operates at the **Network Layer (Layer 3)**, securing all IP traffic transparently without requiring application modifications.

### Q8. [2 Marks] What is a Demilitarized Zone (DMZ) in network security?
**Model Answer:**
A dedicated subnet located between the untrusted external Internet and the private internal enterprise LAN, hosting public-facing servers (Web, Mail, DNS) to isolate core corporate assets.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare Symmetric Key Cryptography vs Asymmetric Key Cryptography.
**Model Answer:**
| Dimension | Symmetric Key Cryptography | Asymmetric Key Cryptography |
| :--- | :--- | :--- |
| **Key Pair** | Single identical shared secret key | Public Key (open) + Private Key (secret) |
| **Key Management** | $N(N-1)/2$ keys (key explosion) | $2N$ keys (scalable for billions of users) |
| **Encryption Speed** | **Extremely Fast** (Hardware accelerated) | **Slow** (Computationally heavy modular math) |
| **Primary Use** | Bulk data encryption (files, network traffic) | Key exchange, digital signatures, authentication |
| **Prominent Algorithms** | AES-256, DES, 3DES, ChaCha20 | RSA, Diffie-Hellman, ECC (Elliptic Curve) |

### Q2. [5 Marks] Explain Cryptographic Hash Functions and the Avalanche Effect.
**Model Answer:**
### Cryptographic Hash Function Properties
1. **Deterministic**: Same input message always produces identical digest.
2. **One-Way (Pre-image Resistance)**: Infeasible to reverse $h = H(m)$ to find $m$.
3. **Second Pre-image Resistance**: Infeasible to find $m_2 \ne m_1$ such that $H(m_1) = H(m_2)$.
4. **Collision Resistance**: Infeasible to find any two arbitrary messages hashing to same output.
5. **Avalanche Effect**: Flipping a single bit in the input message completely randomizes more than 50% of the bits in the output hash digest.

### Q3. [5 Marks] Compare IPsec Transport Mode vs Tunnel Mode.
**Model Answer:**
| Mode | What is Encrypted? | Header Architecture | Typical Use Case |
| :--- | :--- | :--- | :--- |
| **Transport Mode** | Only IP Payload (TCP/UDP + Data) | Original IP Header remains unencrypted | Host-to-Host communication on private LAN |
| **Tunnel Mode** | **Entire Original IP Packet** (Header + Data) | Wrapped in a brand-new outer IP header | **Site-to-Site Gateway-to-Gateway VPN** |

### Q4. [5 Marks] Explain Types of Firewalls (Packet Filtering, Stateful Inspection, Proxy / Application Gateway).
**Model Answer:**
1. **Packet Filtering Firewall (Stateless - Layer 3/4)**: Inspects source/destination IP, port, and protocol against static ACL rules. Fast, but vulnerable to spoofing.
2. **Stateful Inspection Firewall (Layer 3/4)**: Tracks state of active TCP connections in a state table, automatically permitting legitimate inbound response traffic.
3. **Application-Level Gateway (Proxy - Layer 7)**: Disassembles and inspects application payloads (HTTP, FTP commands) to block malicious application attacks.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Explain the RSA Public-Key Cryptographic Algorithm with Full Mathematical Steps and a Solved Example.
**Comprehensive University Solution:**
### RSA Algorithm Formulation & Derivation

### Step-by-Step Mathematical Algorithm:
1. Choose two distinct prime numbers $p$ and $q$.
2. Compute modulus $n = p \times q$.
3. Compute Euler's totient $\phi(n) = (p - 1)(q - 1)$.
4. Choose public exponent $e$ such that $1 < e < \phi(n)$ and $\gcd(e, \phi(n)) = 1$.
5. Compute private exponent $d$ such that $d \times e \equiv 1 \pmod{\phi(n)}$ (Modular Multiplicative Inverse).
6. **Public Key**: $(e, n)$ | **Private Key**: $(d, n)$.
7. **Encryption**: $C = M^e \pmod n$.
8. **Decryption**: $M = C^d \pmod n$.

---

### Solved Numerical Example:
- Let $p = 3$, $q = 11$.
- Modulus $n = 3 \times 11 = \mathbf{33}$.
- $\phi(n) = (3 - 1)(11 - 1) = 2 \times 10 = \mathbf{20}$.
- Choose $e = 7$ (since $\gcd(7, 20) = 1$).
- Compute $d$: $(d \times 7) \pmod{20} = 1 \implies 7d = 21 \implies \mathbf{d = 3}$.

**Test Encryption with Plaintext Message $M = 2$**:
$$C = 2^7 \pmod{33} = 128 \pmod{33} = \mathbf{29} \quad (\text{Ciphertext})$$

**Test Decryption of Ciphertext $C = 29$**:
$$M = 29^3 \pmod{33} = 24,389 \pmod{33} = \mathbf{2} \quad (\text{Original Message Restored!})$$

### Q2. [10/15 Marks] Explain Diffie-Hellman Key Exchange Algorithm and the Man-in-the-Middle (MitM) Vulnerability.
**Comprehensive University Solution:**
### Diffie-Hellman Key Exchange Protocol

```text
Alice                                                            Bob
--------------------------------------------------------------------
Agrees publicly on prime p and base g (primitive root mod p)
Chooses private secret a                                        Chooses private secret b
Computes Public A = g^a mod p -----[ Sends A publicly ]----->
                               <-----[ Sends B publicly ]----- Computes Public B = g^b mod p
Computes Shared Key:                                            Computes Shared Key:
K = B^a mod p                                                  K = A^b mod p
[ Both compute identical shared secret: K = g^(ab) mod p ]
```

### Man-in-the-Middle (MitM) Attack:
Because basic Diffie-Hellman has no authentication:
1. Attacker Darth intercepts Alice's public $A$ and sends his own $D_1$ to Bob.
2. Attacker intercepts Bob's public $B$ and sends his own $D_2$ to Alice.
3. Alice establishes key $K_1$ with Darth; Bob establishes key $K_2$ with Darth.
4. Darth transparently decrypts, reads, alters, and re-encrypts all messages.
- **Defense**: Must combine Diffie-Hellman with **Digital Signatures or X.509 Certificates** for mutual endpoint authentication.

### Q3. [10/15 Marks] Explain SSL/TLS Handshake Protocol Architecture and HTTPS Security.
**Comprehensive University Solution:**
### The TLS 1.3 Handshake Protocol Architecture

```text
Client                                                      Server
  |                                                            |
  | ----- 1. ClientHello (Cipher suites, Key Share) ---------> |
  |                                                            |
  | <---- 2. ServerHello (Selected cipher, Key Share) -------- |
  | <---- 3. EncryptedExtensions ----------------------------- |
  | <---- 4. Certificate (Server X.509 Cert) ----------------- |
  | <---- 5. CertificateVerify (Digital Signature of Handshake)| 
  | <---- 6. Finished (HMAC of entire handshake) ------------- |
  |                                                            |
  | [Client verifies Server Certificate against CA Root]       |
  | [Both derive identical Symmetric AES Session Keys]         |
  |                                                            |
  | ----- 7. Finished ---------------------------------------> |
  |                                                            |
  | <==== SECURE APPLICATION DATA (AES-256-GCM / Port 443) ===>|
```
- Eliminates eavesdropping and tampering for web commerce, banking, and confidential API transactions.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Solve RSA numerical encryption/decryption step-by-step and draw the full TLS handshake sequence.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
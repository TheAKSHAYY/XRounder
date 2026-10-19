# BCA-431E: Introduction to Cyber Security
## Unit 3 Master Exam Revision Notes: Cyber Security Policy, Governance & Stakeholders
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `7ea00fff-11c2-52dd-8185-03c3d21940c4` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Defining a Cyber Security Policy: Concept, Objectives, Hierarchy (Policies, Standards, Guidelines, Procedures)**
- [x] **Types of Security Policies: Program Policy, Issue-Specific Policy (ISSP), System-Specific Policy (SSSP)**
- [x] **Acceptable Use Policy (AUP): Permitted Organizational Resource Usage, Internet, Email, Personal Device Guidelines (BYOD)**
- [x] **General Security Expectations: Confidentiality Agreements, Password Hygiene, Clean Desk Policy & Clear Screen Policy**
- [x] **Roles and Responsibilities: Board of Directors, Chief Information Security Officer (CISO), Security Operations Center (SOC), System Administrators**
- [x] **Organizational Stakeholders: Internal Users, Third-Party Vendors, Customers, External Regulators & Supply Chain Partners**
- [x] **Incident Response Policy & Management: CIRT/CSIRT Formation, Preparation, Detection & Analysis, Containment, Eradication, Recovery & Post-Incident Review**
- [x] **Business Continuity Planning (BCP) & Disaster Recovery (DR): Recovery Time Objective (RTO), Recovery Point Objective (RPO), Backup Strategies**
- [x] **Risk Management Framework (NIST RMF): Categorize, Select, Implement, Assess, Authorize & Monitor Information Systems**
- [x] **Regulatory and Compliance Standards: ISO/IEC 27001 (ISMS), PCI-DSS (Payment Cards), HIPAA (Healthcare), GDPR (Data Privacy)**
- [x] **Indian Cyber Regulatory Context: IT Act 2000 (Section 43, 66, 72A), CERT-In Mandatory Incident Reporting Guidelines**
- [x] **Cyber Security Auditing & Compliance Monitoring: Continuous Monitoring, Log Retention Policies, Third-Party Vendor Risk Audits**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is a Cyber Security Policy?
**Model Answer:**
A formal, documented set of rules, directives, and operational practices issued by an organization to guide the security management of information assets and define acceptable computer usage.

### Q2. [2 Marks] What is the difference between Policies, Standards, and Guidelines?
**Model Answer:**
- **Policy:** High-level executive mandate; mandatory; defines *what* must be done.
- **Standard:** Specific, mandatory technical baseline (e.g., 'All passwords must be 12+ characters with special symbols').
- **Guideline:** Recommended best practices; non-mandatory suggestions.

### Q3. [2 Marks] What is ISO/IEC 27001?
**Model Answer:**
An internationally recognized standard that specifies requirements for establishing, implementing, maintaining, and continually improving an **Information Security Management System (ISMS)**.

### Q4. [2 Marks] What are the 5 core functions of the NIST Cybersecurity Framework (CSF)?
**Model Answer:**
1. **Identify** (develop organizational understanding of systems/risks)
2. **Protect** (implement safeguards)
3. **Detect** (identify cybersecurity events)
4. **Respond** (take action regarding detected incident)
5. **Recover** (restore impaired services/capabilities).

### Q5. [2 Marks] What is the role of a Computer Emergency Response Team (CERT)?
**Model Answer:**
A specialized organizational or national team (e.g., **CERT-In** in India) responsible for receiving, analyzing, and responding to cyber incidents, tracking vulnerabilities, and publishing security advisories.

### Q6. [2 Marks] What is the primary legislation governing cyber crimes in India?
**Model Answer:**
The **Information Technology Act, 2000 (IT Act 2000)** and its subsequent major **IT (Amendment) Act, 2008**.

### Q7. [2 Marks] State the significance of Section 66C and 66D of the Indian IT Act.
**Model Answer:**
- **Section 66C:** Punishment for identity theft (fraudulent use of electronic signatures, passwords, or unique identification features - up to 3 years imprisonment).
- **Section 66D:** Punishment for cheating by personation by using computer resources.

### Q8. [2 Marks] What does Section 43A of the Indian IT Act prescribe?
**Model Answer:**
Mandates that bodies corporate handling **Sensitive Personal Data or Information (SPDI)** that are negligent in implementing reasonable security practices and cause wrongful loss are liable to pay compensation to affected persons.

### Q9. [2 Marks] What is Business Continuity Planning (BCP) vs Disaster Recovery (DR)?
**Model Answer:**
- **BCP:** Holistic business strategy ensuring critical business processes continue operating during and immediately following an interruption.
- **DR:** The technical subset of BCP focusing specifically on restoring IT infrastructure, databases, and network connectivity after a disaster.

### Q10. [2 Marks] Define RPO (Recovery Point Objective) and RTO (Recovery Time Objective).
**Model Answer:**
- **RPO:** The maximum acceptable age of data loss following a disaster (how much historical data can be lost without fatal business damage).
- **RTO:** The maximum acceptable duration of time system services can be down before normal operations must be restored.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Structure of an Information Security Management System (ISMS) under ISO 27001.
**Model Answer:**
ISO/IEC 27001 follows the **Plan-Do-Check-Act (PDCA)** continuous improvement cycle:

```
[ PLAN ] Define Security Policy, Scope & Risk Assessment
   |
   v
[ DO ] Implement Controls, Training & Procedures (Annex A)
   |
   v
[ CHECK ] Internal Audits, Management Reviews & Metrics
   |
   v
[ ACT ] Corrective & Preventive Action Plans (Continual Improvement)
```
- Contains 93 controls in Annex A structured across 4 themes: Organizational, People, Physical, and Technological controls.

### Q2. [5 Marks] Explain the NIST Cybersecurity Framework (CSF) Core Functions and Tiers.
**Model Answer:**
| NIST CSF Function | Core Objective | Key Categories |
| :--- | :--- | :--- |
| **Identify (ID)** | Understand asset risks | Asset Management, Risk Assessment, Governance |
| **Protect (PR)** | Safeguard delivery of services | Access Control, Data Security, Maintenance |
| **Detect (DE)** | Identify occurrence of event | Anomalies & Events, Continuous Monitoring |
| **Respond (RS)** | Take action upon detection | Response Planning, Mitigation, Communications |
| **Recover (RC)** | Restore capabilities | Recovery Planning, Improvements |

### Q3. [5 Marks] Explain Key Sections of the Indian Information Technology Act, 2000.
**Model Answer:**
| Section | Offense Description | Penalty |
| :--- | :--- | :--- |
| **Section 43** | Unauthorized access, data downloading, virus introduction | Civil damages / compensation up to ₹1 Crore |
| **Section 65** | Tampering with computer source documents | Imprisonment up to 3 years or fine up to ₹2 Lakh |
| **Section 66** | Hacking and fraudulent computer-related offenses | Imprisonment up to 3 years or fine up to ₹5 Lakh |
| **Section 66E**| Violation of privacy (capturing/publishing private images)| Imprisonment up to 3 years or fine up to ₹2 Lakh |
| **Section 66F**| Cyber Terrorism (threatening unity, integrity, defense) | **Life Imprisonment** |

### Q4. [5 Marks] Describe the 6 Phases of the Incident Response Lifecycle (NIST SP 800-61).
**Model Answer:**
1. **Preparation:** Establishing incident response team, tools, and training.
2. **Detection & Analysis:** Identifying precursors, alerts, and confirming true incidents.
3. **Containment:** Stopping threat propagation (short-term isolation vs long-term remediation).
4. **Eradication:** Removing malware, deleting backdoors, closing compromised ports.
5. **Recovery:** Restoring systems to production from clean backups and testing operations.
6. **Post-Incident Activity (Lessons Learned):** Documenting root causes and improving policies.

### Q5. [5 Marks] Explain the Role of CERT-In (Indian Computer Emergency Response Team).
**Model Answer:**
CERT-In is the designated national agency under Section 70B of the IT Act:
- Collection, analysis, and dissemination of information on cyber incidents.
- Emergency response services and incident coordination.
- Issuance of mandatory 6-hour cybersecurity incident reporting directives for all Indian enterprises.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Comprehensive Enterprise Cyber Security Policy Document for an Academic Institution.
**Comprehensive University Solution:**
### MJPRU University Enterprise Cyber Security Policy Framework

#### 1. Purpose and Scope:
This policy governs all digital computing resources, servers, networks, examination databases, and endpoints owned, leased, or operated by MJP Rohilkhand University, binding faculty, administrative staff, students, and third-party contractors.

#### 2. Access Control and Authentication Policy:
- **Identity Management:** All accounts must be tied to verified university identity registries.
- **Password Complexity:** Passwords must be at least 12 characters long, containing uppercase, lowercase, numeric, and special symbols; expired every 90 days.
- **Multi-Factor Authentication (MFA):** Mandatory for all remote VPN access, student grading portals, and administrative accounts.
- **Least Privilege:** Access granted on a strict 'Need-to-Know' and Role-Based Access Control (RBAC) basis.

#### 3. Acceptable Use Policy (AUP):
- Users must not attempt unauthorized penetration testing, port scanning, or sniffing of campus networks.
- Prohibited: Torrenting copyrighted materials, hosting non-academic servers, and sharing account credentials.

#### 4. Incident Response Escalation Matrix:
```
[ Severity Level ]    [ Criteria ]                          [ Response SLA ]
Severity 1 (Critical) Ransomware, Exam DB Leak, Defacement   < 15 minutes
Severity 2 (High)     Single Host Malware, Phishing Campaign < 1 hour
Severity 3 (Medium)   Failed login spikes, Policy violation  < 4 hours
```

#### 5. Data Classification Scheme:
1. **Public:** General syllabus, press releases, website homepage.
2. **Internal:** Department memos, routine administrative emails.
3. **Confidential:** Student academic transcripts, financial fee accounts.
4. **Restricted / Top Secret:** Sealed examination question banks, master encryption keys.

### Q2. [10/15 Marks] Analyze the Indian IT Act 2000 (with 2008 Amendments): Landmark Provisions, Judicial Precedents, and Global Comparison.
**Comprehensive University Solution:**
### Judicial and Regulatory Study of the Indian IT Act

#### 1. Historical Context and Objective:
Enacted on 9 June 2000 based on the UNCITRAL Model Law on Electronic Commerce (1996) to provide legal recognition to electronic transactions, digital signatures, and e-governance.

#### 2. The 2008 Amendment (Pivotal Overhaul):
- Introduced **Section 66A** (punishment for offensive messages - struck down in 2015 by the Supreme Court in *Shreya Singhal v. Union of India* as unconstitutional violation of free speech Art 19(1)(a)).
- Introduced **Section 66F: Cyber Terrorism** with non-bailable lifetime imprisonment.
- Added **Section 69A: Power to issue directions for blocking public access** of information in the interest of sovereignty, defense, or public order.

#### 3. Comparison with EU GDPR:
| Dimension | Indian IT Act (Sec 43A / DPDP Act 2023) | EU General Data Protection Regulation (GDPR) |
| :--- | :--- | :--- |
| **Territorial Scope** | Primarily within India / operations affecting Indians | Extra-territorial global application |
| **Penalties** | Civil compensation / Fines up to ₹250 Cr under DPDP | Up to €20M or 4% of global annual turnover |
| **Data Subject Rights**| Right to access, correction, erasure | Comprehensive Right to be Forgotten, Data Portability |

### Q3. [10/15 Marks] Explain Disaster Recovery Strategies: Hot Sites vs Warm Sites vs Cold Sites with RPO and RTO Mathematical Formulations.
**Comprehensive University Solution:**
### Disaster Recovery Architecture

```
+----------------------------------------------------------------------------------+
|               DISASTER RECOVERY (DR) SITES SPECTRUM                              |
|                                                                                  |
| [ HOT SITE ]                   [ WARM SITE ]                  [ COLD SITE ]      |
| - Mirrored live data           - Hardware pre-installed       - Shell facility   |
| - Real-time replication        - Daily/Weekly backups         - No hardware      |
| - RTO: Minutes / Instant       - RTO: Hours to Days           - RTO: Weeks       |
| - RPO: Near Zero               - RPO: Hours                   - RPO: Days/Weeks  |
| - Cost: Extremely High         - Cost: Moderate               - Cost: Lowest     |
+----------------------------------------------------------------------------------+
```

#### Mathematical Metrics:
1. **Recovery Point Objective (RPO):**
   $$RPO = T_{\text{disaster}} - T_{\text{last valid backup}}$$
2. **Recovery Time Objective (RTO):**
   $$RTO = T_{\text{restored service}} - T_{\text{disaster}}$$
- Financial institutions require $RPO \approx 0$ (synchronous multi-region database mirroring) and $RTO < 1 \text{ hour}$.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently ask: IT Act 2000 key sections (Section 65, 66, 66C, 66F), NIST CSF 5 functions, and Hot site vs Cold site DR comparison.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
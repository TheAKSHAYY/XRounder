# BCA-423E: Software Engineering
## Unit 3 Master Exam Revision Notes: Software Project Planning, Cost Estimation & SCM
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `1af7ec2f-3e14-51e4-88a2-14fc5cf15835` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Software Project Management Overview: The 4 P's (People, Product, Process, Project), Project Manager Roles**
- [x] **Software Project Estimation: Size-Oriented Metrics (KLOC), Function-Oriented Metrics (Function Point Analysis - FPA)**
- [x] **Function Point Analysis (Albrecht): Five Function Types (ILF, EIF, EI, EO, EQ), Complexity Weighting, Value Adjustment Factor (VAF), FP Formula**
- [x] **Empirical Estimation Models: COCOMO Model (Constructive Cost Model by Barry Boehm), Basic COCOMO Modes (Organic, Semidetached, Embedded)**
- [x] **COCOMO Mathematical Equations: Effort = a * (KLOC)^b (Person-Months), Development Time = c * (Effort)^d (Months)**
- [x] **Intermediate COCOMO: Cost Drivers (Product, Hardware, Personnel, Project Attributes), Effort Multipliers (EAF)**
- [x] **Detailed COCOMO (COCOMO II): Application Composition, Early Design, Post-Architecture Estimation Models**
- [x] **Project Scheduling & Tracking: Work Breakdown Structure (WBS), Task Networks, Effort Distribution (40-20-40 Rule)**
- [x] **Critical Path Method (CPM) and PERT: Earliest Start/Finish, Latest Start/Finish, Slack Time, Gantt Charts, Milestone Tracking**
- [x] **Software Team Organizations: Democratic Decentralized (DD), Controlled Decentralized (CD), Controlled Centralized (Chief Programmer Team)**
- [x] **Risk Management: Reactive vs Proactive Risk Strategies, Risk Identification, Risk Projection (Impact and Likelihood Rating), RMMM Plan**
- [x] **Software Configuration Management (SCM): Need for SCM, Baselines, SCM Process (Identification, Version Control, Change Control, Configuration Auditing)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the primary formula for Effort in Boehm's Basic COCOMO model?
**Model Answer:**
$$E = a \times (\text{KLOC})^b \quad [\text{Person-Months}]$$
Where $a$ and $b$ are empirical constants determined by the project mode (Organic, Semi-Detached, Embedded).

### Q2. [2 Marks] State the values of $a$ and $b$ for the three modes in Basic COCOMO.
**Model Answer:**
- **Organic Mode**: $a = 2.4, b = 1.05$
- **Semi-Detached Mode**: $a = 3.0, b = 1.12$
- **Embedded Mode**: $a = 3.6, b = 1.20$

### Q3. [2 Marks] State the formula for Development Time ($T_{\text{dev}}$) in Basic COCOMO.
**Model Answer:**
$$T_{\text{dev}} = c \times E^d \quad [\text{Months}]$$
Organic: $c = 2.5, d = 0.38$. Average Staff Size = $E / T_{\text{dev}}$.

### Q4. [2 Marks] What is a Baseline in Software Configuration Management (SCM)?
**Model Answer:**
A formally reviewed and agreed-upon milestone version of a Software Configuration Item (SCI) that serves as the basis for further development and can only be altered through formal change control procedures.

### Q5. [2 Marks] What does the Change Control Board (CCB) do?
**Model Answer:**
The CCB reviews, assesses technical/budget impact, and authorizes or rejects all proposed formal Change Requests (CRs) to baselined artifacts.

### Q6. [2 Marks] State the PERT formula for Expected Activity Duration ($T_e$).
**Model Answer:**
$$T_e = \frac{a + 4m + b}{6}$$
Where $a$ = Optimistic time, $m$ = Most likely time, and $b$ = Pessimistic time.

### Q7. [2 Marks] What is the Critical Path in a CPM project network?
**Model Answer:**
The longest sequence of dependent activities through the project network that has **zero total slack (float)** and dictates the minimum duration required to complete the project.

### Q8. [2 Marks] Define Schedule Variance (SV) and Cost Variance (CV) in Earned Value Management.
**Model Answer:**
- $\text{Schedule Variance (SV)} = \text{Earned Value (EV)} - \text{Planned Value (PV)}$
- $\text{Cost Variance (CV)} = \text{Earned Value (EV)} - \text{Actual Cost (AC)}$


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare the Three Modes of Software Projects in Boehm's COCOMO Model.
**Model Answer:**
| Dimension | Organic Mode | Semi-Detached Mode | Embedded Mode |
| :--- | :--- | :--- | :--- |
| **Team Characteristics** | Small, highly experienced teams | Medium-sized, mixed experience levels | Large teams, diverse specialized skills |
| **Problem Familiarity** | Well-understood, thoroughly familiar | Intermediate familiarity; some novel aspects | Unprecedented, innovative, complex problems |
| **Operational Constraints** | Flexible, relaxed deadlines | Medium constraints | Extremely stringent hardware, safety, real-time deadlines |
| **Effort Equation** | $E = 2.4 (\text{KLOC})^{1.05}$ | $E = 3.0 (\text{KLOC})^{1.12}$ | $E = 3.6 (\text{KLOC})^{1.20}$ |
| **Typical Examples** | Payroll, simple inventory system | New OS compiler, database engine | Air traffic control, nuclear reactor software |

### Q2. [5 Marks] Explain SCM Core Tasks: Identification, Version Control, Change Control, and Configuration Audit.
**Model Answer:**
### The 4 Pillars of Software Configuration Management
1. **Configuration Identification**: Labeling and tracking every Software Configuration Item (SCI) with unique IDs and revision numbers.
2. **Version Control**: Managing concurrent edits, branches, and merges using tools like Git.
3. **Change Control**: Enforcing formal Change Requests (CRs), engineering impact analysis, and CCB approval before baselines are modified.
4. **Configuration Audit**: Functional and physical audits verifying that all approved changes are correctly implemented and verified by QA.

### Q3. [5 Marks] Explain Project Team Organizational Structures: DD, CD, and CC (Chief Programmer Team).
**Model Answer:**
| Team Structure | Authority & Leadership | Communication Channels | Best Suited For |
| :--- | :--- | :--- | :--- |
| **Democratic Decentralized (DD)** | Consensus-driven; fluid leadership | All-to-all horizontal ($N(N-1)/2$) | Complex research projects |
| **Controlled Decentralized (CD)** | Hierarchical leader with sub-leads | Vertical with horizontal clusters | Large standard production projects |
| **Controlled Centralized (CC)** | **Chief Programmer** directs all coding | Strict vertical reporting | Simple, tightly focused critical tasks |

### Q4. [5 Marks] Explain Risk Management Strategies: RMMM (Risk Mitigation, Monitoring, and Management).
**Model Answer:**
### RMMM Plan
- **Mitigation (Prevention)**: Proactive steps taken before risk occurs to reduce probability (e.g., cross-training to mitigate staff turnover).
- **Monitoring (Tracking)**: Tracking early-warning indicator metrics (e.g., team morale, defect backlog, test pass rates).
- **Management (Contingency)**: Fallback execution steps if risk event occurs (e.g., executing backup data restore if ransomware strikes).


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Solve a Complete Numerical Problem Using Basic COCOMO for an Organic Project of 40 KLOC.
**Comprehensive University Solution:**
### University Examination Model Solution: COCOMO Calculation

**Given:**
- Project Mode: **Organic**
- Estimated Size: **40 KLOC**
- Basic COCOMO Constants: $a = 2.4, b = 1.05, c = 2.5, d = 0.38$.

### Step-by-Step Calculation:

1. **Effort Estimation ($E$)**:
   $$E = a \times (\text{KLOC})^b = 2.4 \times (40)^{1.05}$$
   Calculate $(40)^{1.05}$:
   $$\ln(40) = 3.688879 \implies 1.05 \times 3.688879 = 3.873323$$
   $$e^{3.873323} \approx 48.102$$
   $$E = 2.4 \times 48.102 = \mathbf{115.44 \text{ Person-Months}}$$

2. **Development Time Schedule ($T_{\text{dev}}$)**:
   $$T_{\text{dev}} = c \times E^d = 2.5 \times (115.44)^{0.38}$$
   Calculate $(115.44)^{0.38}$:
   $$\ln(115.44) = 4.7487 \implies 0.38 \times 4.7487 = 1.8045$$
   $$e^{1.8045} \approx 6.077$$
   $$T_{\text{dev}} = 2.5 \times 6.077 = \mathbf{15.19 \text{ Months}}$$

3. **Average Staff Size ($SS$)**:
   $$SS = \frac{E}{T_{\text{dev}}} = \frac{115.44}{15.19} = \mathbf{7.6 \implies 8 \text{ Engineers}}$$

4. **Productivity ($P$)**:
   $$P = \frac{\text{KLOC} \times 1000}{E} = \frac{40,000}{115.44} = \mathbf{346.5 \text{ LOC / Person-Month}}$$

---
*Final Summary:* Total Effort = 115.4 Person-Months, Development Time = 15.2 Months, Staff Size = 8 Developers.

### Q2. [10/15 Marks] Solve a CPM/PERT Project Network Problem Calculating Earliest/Latest Times, Float, and Critical Path.
**Comprehensive University Solution:**
### University CPM Project Network Solution

**Given Activities, Predecessors, and Durations:**
- Activity A (Start): 4 days
- Activity B (Predecessor A): 3 days
- Activity C (Predecessor A): 6 days
- Activity D (Predecessor B): 5 days
- Activity E (Predecessor C): 4 days
- Activity F (Predecessors D, E): 2 days

### Forward Pass (Earliest Start ES, Earliest Finish EF = ES + t):
- Node 1: $ES_A = 0 \implies EF_A = 0 + 4 = 4$.
- Node 2: $ES_B = 4 \implies EF_B = 4 + 3 = 7$.
- Node 2: $ES_C = 4 \implies EF_C = 4 + 6 = 10$.
- Node 3: $ES_D = 7 \implies EF_D = 7 + 5 = 12$.
- Node 4: $ES_E = 10 \implies EF_E = 10 + 4 = 14$.
- Node 5: $ES_F = \max(EF_D, EF_E) = \max(12, 14) = 14 \implies EF_F = 14 + 2 = \mathbf{16 \text{ days}}$.

### Backward Pass (Latest Finish LF, Latest Start LS = LF - t):
- Activity F: $LF_F = 16 \implies LS_F = 16 - 2 = 14$.
- Activity D: $LF_D = LS_F = 14 \implies LS_D = 14 - 5 = 9$.
- Activity E: $LF_E = LS_F = 14 \implies LS_E = 14 - 4 = 10$.
- Activity B: $LF_B = LS_D = 9 \implies LS_B = 9 - 3 = 6$.
- Activity C: $LF_C = LS_E = 10 \implies LS_C = 10 - 6 = 4$.
- Activity A: $LF_A = \min(LS_B, LS_C) = \min(6, 4) = 4 \implies LS_A = 4 - 4 = 0$.

### Float & Critical Path Identification:
- Activity A: Slack = $LS - ES = 0 - 0 = 0$ **(Critical)**
- Activity B: Slack = $LS - ES = 6 - 4 = 2$ days
- Activity C: Slack = $LS - ES = 4 - 4 = 0$ **(Critical)**
- Activity D: Slack = $LS - ES = 9 - 7 = 2$ days
- Activity E: Slack = $LS - ES = 10 - 10 = 0$ **(Critical)**
- Activity F: Slack = $LS - ES = 14 - 14 = 0$ **(Critical)**

**CRITICAL PATH:** $\mathbf{A \to C \to E \to F}$ with minimum total duration of **16 Days**.

### Q3. [10/15 Marks] Explain Earned Value Analysis (EVA) with a Numerical Comprehensive Case Study.
**Comprehensive University Solution:**
### Earned Value Analysis Case Study

**Scenario at Month 6 of a 12-Month Project:**
- Total Project Budget at Completion ($BAC$): Rs. 10,00,000
- Planned Schedule: 50% work should be done by Month 6 $\implies \text{Planned Value (PV)} = 0.50 \times 10,00,000 = \mathbf{Rs. 5,00,000}$.
- Actual Progress Achieved: 40% work physically completed $\implies \text{Earned Value (EV)} = 0.40 \times 10,00,000 = \mathbf{Rs. 4,00,000}$.
- Actual Cost Incurred ($AC$): **Rs. 4,80,000** spent so far.

### Comprehensive Variance & Index Calculations:
1. **Cost Variance (CV)**: $EV - AC = 4,00,000 - 4,80,000 = \mathbf{-Rs. 80,000}$ *(Over Budget)*.
2. **Schedule Variance (SV)**: $EV - PV = 4,00,000 - 5,00,000 = \mathbf{-Rs. 1,00,000}$ *(Behind Schedule)*.
3. **Cost Performance Index (CPI)**:
   $$CPI = \frac{EV}{AC} = \frac{4,00,000}{4,80,000} = \mathbf{0.833}$$
   *(Getting 83.3 cents of value per rupee spent)*.
4. **Schedule Performance Index (SPI)**:
   $$SPI = \frac{EV}{PV} = \frac{4,00,000}{5,00,000} = \mathbf{0.80}$$
   *(Progressing at only 80% of planned pace)*.
5. **Estimate at Completion ($EAC$)**:
   $$EAC = \frac{BAC}{CPI} = \frac{10,00,000}{0.833} = \mathbf{Rs. 12,00,480} \quad (\text{Final budget overrun: Rs. 2,00,480})$$


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Solve COCOMO effort/time calculations and CPM critical path forward/backward pass network problems.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
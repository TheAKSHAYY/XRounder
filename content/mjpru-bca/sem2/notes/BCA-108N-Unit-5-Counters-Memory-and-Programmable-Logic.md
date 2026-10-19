# BCA-108N: Digital Electronics
## Unit 5 Master Exam Revision Notes: Counters, Modulo Circuits & Programmable Logic
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `bca10805-0002-4000-8000-000000000108` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Asynchronous (Ripple) Counters: Up-Counter, Down-Counter, Timing Diagrams & Propagation Delay**
- [x] **Synchronous Counters: Design Steps, State Diagram, Excitation Tables, Up/Down Counters**
- [x] **Modulo Counters: Mod-N Counters, Decade / BCD Counter (Mod-10) Design**
- [x] **Ring Counter: Operation, State Sequence & Clock Waveforms**
- [x] **Johnson (Twisted Ring) Counter: Self-Starting Property & Waveforms**
- [x] **Memory Devices: RAM (SRAM vs DRAM Cells) and ROM Types (PROM, EPROM, EEPROM, Flash)**
- [x] **Programmable Logic Devices: PAL (Programmable Array Logic) vs PLA (Programmable Logic Array) Architecture**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Differentiate Asynchronous (Ripple) Counters from Synchronous Counters.
**Model Answer:**
- **Asynchronous Counter:** Only the first flip-flop is clocked by external clock; subsequent flip-flops are clocked by outputs of preceding flip-flops. Propagation delays accumulate (`O(n)`).
- **Synchronous Counter:** All flip-flops are clocked simultaneously by a common external clock pulse; state changes happen concurrently, enabling high operating frequencies.

### Q2. [2 Marks] What is a Mod-N Counter? How many flip-flops are required to construct a Mod-12 counter?
**Model Answer:**
A Mod-N counter has `N` distinct counting states (`0` to `N-1`). The number of flip-flops `n` required satisfies: `2^(n - 1) < N <= 2^n`. For Mod-12: `2^3 = 8 < 12 <= 2^4 = 16`. Thus, **4 flip-flops** are required.

### Q3. [2 Marks] What is a Decade (BCD / Mod-10) Counter?
**Model Answer:**
A counter that counts from `0000` (0) through `1001` (9) and resets back to `0000` on the 10th clock pulse using a NAND gate connected to reset inputs when state reaches `1010` (10).

### Q4. [2 Marks] Explain Ring Counter versus Johnson (Twisted Ring) Counter.
**Model Answer:**
- **Ring Counter:** A circular shift register where the output of the last flip-flop is fed back to the input of the first. An `n`-bit ring counter has `n` states.
- **Johnson Counter:** The inverted output (`Q'`) of the last flip-flop is fed back to the first flip-flop. An `n`-bit Johnson counter has `2n` states.

### Q5. [2 Marks] Differentiate SRAM from DRAM cells.
**Model Answer:**
- **SRAM (Static RAM):** Built from bistable cross-coupled flip-flop inverters; faster, does not require refreshing, used for cache.
- **DRAM (Dynamic RAM):** Stores data as electrical charge in tiny capacitor-transistor pairs; requires periodic memory refresh cycles, high density, economical, used for main RAM.

### Q6. [2 Marks] Classify ROM types (PROM, EPROM, EEPROM, Flash).
**Model Answer:**
- **PROM:** Programmable once using high voltage fuse blowing.
- **EPROM:** Erased by exposure to ultraviolet (UV) light through a quartz window.
- **EEPROM:** Erased electrically byte-by-byte in circuit.
- **Flash Memory:** High-speed EEPROM erased and rewritten in blocks/sectors.

### Q7. [2 Marks] How many address and data lines are required for a 32K x 8 memory chip?
**Model Answer:**
- Capacity: `32K = 32 * 1024 = 32,768 = 2^15` locations => **15 Address Lines**.
- Word width: 8 bits => **8 Data Lines**.

### Q8. [2 Marks] Differentiate PAL (Programmable Array Logic) from PLA (Programmable Logic Array).
**Model Answer:**
- **PLA:** Both AND array and OR array are fully programmable (maximum flexibility, higher cost/delay).
- **PAL:** Programmable AND array, but **Fixed OR array** (easier to program, faster, economical).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Design a 3-Bit Synchronous Up-Counter using T Flip-Flops.
**Model Answer:**
### 1. State Table & T Flip-Flop Transitions
| Present State ($Q_2 Q_1 Q_0$) | Next State ($Q_2 Q_1 Q_0$) | $T_2$ | $T_1$ | $T_0$ |
| :---: | :---: | :---: | :---: | :---: |
| 000 | 001 | 0 | 0 | 1 |
| 001 | 010 | 0 | 1 | 1 |
| 010 | 011 | 0 | 0 | 1 |
| 011 | 100 | 1 | 1 | 1 |
| 100 | 101 | 0 | 0 | 1 |
| 101 | 110 | 0 | 1 | 1 |
| 110 | 111 | 0 | 0 | 1 |
| 111 | 000 | 1 | 1 | 1 |

### 2. Excitation Equations
- $T_0 = 1$ (Toggles on every clock cycle)
- $T_1 = Q_0$ (Toggles when $Q_0 = 1$)
- $T_2 = Q_1 Q_0$ (Toggles when both $Q_1 = 1$ and $Q_0 = 1$)
All flip-flops share the same common clock line.

### Q2. [5 Marks] Explain PLA vs PAL architecture with block diagrams and comparison table.
**Model Answer:**
| Feature | PLA (Programmable Logic Array) | PAL (Programmable Array Logic) |
| :--- | :--- | :--- |
| **AND Array** | Programmable | Programmable |
| **OR Array** | Programmable | Fixed |
| **Flexibility** | High (can share product terms across outputs) | Moderate |
| **Hardware Complexity**| High propagation delay | Lower propagation delay; faster |
| **Programming Ease** | Complex | Simpler, widely supported in CAD tools |


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Discuss Asynchronous (Ripple) and Synchronous Counters in comprehensive detail. Design a 4-bit Asynchronous Mod-10 (Decade) Counter with timing waveforms and reset logic.
**Comprehensive University Solution:**
### 1. Asynchronous Mod-10 Counter Architecture
A 4-bit ripple counter naturally cycles through 16 states ($0000$ to $1111$). To create a decade counter (Mod-10), we force the counter to reset asynchronously to $0000$ the instant it hits $1010$ (decimal 10).

### 2. Reset Logic Formulation
- Binary state 10 is: $Q_3 = 1, Q_2 = 0, Q_1 = 1, Q_0 = 0$.
- A 2-input **NAND gate** connects to $Q_3$ and $Q_1$.
- The output of the NAND gate: $\text{Reset} = (Q_3 \cdot Q_1)'$.
- When count reaches 10 ($Q_3=1, Q_1=1$), NAND output drops to Logic 0, immediately triggering active-low Clear (CLR) inputs of all four flip-flops to reset back to $0000$.

### 3. State Sequence & Waveforms
States: `0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> (10 temporary glitch) -> 0`.
Frequency at $Q_3$ output is $f_{clk} / 10$, functioning as a frequency divide-by-10 circuit.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-108N Unit 5, synchronous counter design using state transition tables and excitation equations, along with PLA vs PAL architecture comparisons, appear frequently for 10–15 marks.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
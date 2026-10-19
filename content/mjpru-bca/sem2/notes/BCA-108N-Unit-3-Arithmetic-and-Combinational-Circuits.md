# BCA-108N: Digital Electronics
## Unit 3 Master Exam Revision Notes: Arithmetic Circuits & Combinational Logic Design
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `bca10803-0002-4000-8000-000000000108` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Half Adder and Full Adder: Circuit Design, Truth Tables & Boolean Expressions**
- [x] **Half Subtractor and Full Subtractor: Logic Circuit Design & Truth Tables**
- [x] **Parallel Binary Adder/Subtractor using 2's Complement Logic & 7483 IC Overview**
- [x] **Binary Multipliers and Dividers Overview**
- [x] **Multiplexers (Data Selectors): 2:1, 4:1, 8:1 MUX Design, Truth Tables & Function Realization**
- [x] **De-Multiplexers (Data Distributors): 1:2, 1:4, 1:8 DEMUX Design and Operation**
- [x] **Decoders: 2-to-4, 3-to-8 Binary Decoders, BCD-to-7-Segment Decoder Operation**
- [x] **Encoders: Decimal-to-BCD Encoders and Priority Encoders**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define a Combinational Logic Circuit.
**Model Answer:**
A circuit whose output at any instant depends strictly and exclusively on the present combination of input variables, having zero memory elements or feedback loops.

### Q2. [2 Marks] Give the Boolean expressions for Sum and Carry of a Half Adder.
**Model Answer:**
- `Sum (S) = A ⊕ B = A'B + AB'`
- `Carry (C) = A * B`

### Q3. [2 Marks] Give the Boolean expressions for Sum and Carry-out of a Full Adder.
**Model Answer:**
- `Sum (S) = A ⊕ B ⊕ Cin`
- `Carry-out (Cout) = AB + BCin + ACin = AB + Cin(A ⊕ B)`

### Q4. [2 Marks] How many Half Adders and OR gates are required to construct a Full Adder?
**Model Answer:**
**Two Half Adders and one OR gate** (the carries of both half adders are ORed together to form the final carry-out).

### Q5. [2 Marks] What is the primary advantage of a Look-Ahead Carry Adder over a Ripple Carry Adder?
**Model Answer:**
In a ripple carry adder, each full adder stage must wait for carry propagation from the previous stage, yielding `O(n)` delay. A Look-Ahead Carry Adder generates carries simultaneously using generate (`G = AB`) and propagate (`P = A ⊕ B`) logic, reducing delay to constant `O(1)`.

### Q6. [2 Marks] Define a Multiplexer (MUX) and write the relation between data inputs and select lines.
**Model Answer:**
A MUX (Data Selector) routes one of `2^n` input data lines to a single output line based on the bit pattern applied to `n` select lines: `Inputs = 2^n, Select Lines = n`.

### Q7. [2 Marks] What is a Demultiplexer (DEMUX)?
**Model Answer:**
A circuit that takes a single input data line and routes it to one of `2^n` output lines based on `n` select control lines (the inverse of a multiplexer).

### Q8. [2 Marks] Differentiate between an Encoder and a Priority Encoder.
**Model Answer:**
- **Standard Encoder:** Converts `2^n` input lines to `n` binary output lines; assumes only one input is active at any time.
- **Priority Encoder:** Multiple inputs can be active simultaneously; the output binary code corresponds to the active input with the **highest priority**.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Design a Full Subtractor using basic logic gates (Truth table, K-maps, Equations, Circuit).
**Model Answer:**
### 1. Truth Table (Inputs: A, B, Bin; Outputs: Difference D, Borrow Bout)
| A | B | Bin | D | Bout |
| :-: | :-: | :-: | :-: | :-: |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 0 |
| 1 | 1 | 0 | 0 | 0 |
| 1 | 1 | 1 | 1 | 1 |

### 2. Boolean Equations
- **Difference:** `D = A ⊕ B ⊕ Bin`
- **Borrow-out:** `Bout = A'B + A'Bin + BBin = A'B + Bin(A ⊕ B)'`
Can be implemented using two Half Subtractors and one OR gate.

### Q2. [5 Marks] Implement the Boolean function `F(A, B, C) = Σ m(1, 3, 5, 6)` using an 8:1 Multiplexer and a 4:1 Multiplexer.
**Model Answer:**
### 1. Implementation using 8:1 MUX
Connect inputs A, B, C to select lines `S2, S1, S0`. Connect minterm data lines `I1, I3, I5, I6` to Logic 1 (Vcc), and lines `I0, I2, I4, I7` to Logic 0 (Ground).

### 2. Implementation using 4:1 MUX (Inputs A, B on Select Lines S1, S0)
| AB | C=0 | C=1 | MUX Input Line |
| :-: | :-: | :-: | :--- |
| 00 (0,1) | 0 | 1 | `I0 = C` |
| 01 (2,3) | 0 | 1 | `I1 = C` |
| 10 (4,5) | 0 | 1 | `I2 = C` |
| 11 (6,7) | 1 | 0 | `I3 = C'` |
Inputs to 4:1 MUX: `I0 = C`, `I1 = C`, `I2 = C`, `I3 = C'`, with select lines `S1 = A, S0 = B`.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Explain Decoders in detail. Design a 3-to-8 Line Decoder with Enable input using truth table and logic gates, and demonstrate how to construct a 4-to-16 Line Decoder using two 3-to-8 Decoders.
**Comprehensive University Solution:**
### 1. 3-to-8 Line Decoder Architecture
A 3-to-8 decoder activates one of 8 output lines ($Y_0$ to $Y_7$) corresponding to the 3-bit binary input ($A, B, C$) when Enable ($E$) is asserted active-high.
Equations:
$Y_0 = E \cdot A' B' C', \quad Y_1 = E \cdot A' B' C, \quad \dots, \quad Y_7 = E \cdot A B C$

### 2. Construction of 4-to-16 Decoder using Two 3-to-8 Decoders
A 4-to-16 decoder has 4 input variables ($w, x, y, z$).
- Connect the 3 lower-order bits ($x, y, z$) in parallel to inputs ($A, B, C$) of both 3-to-8 decoders.
- Connect the most significant bit ($w$) to control the Enable inputs:
  - For the **First Decoder (Outputs 0 to 7):** Connect $w$ through a **NOT gate** to Enable $E_1$ ($E_1 = w'$). When $w = 0$, Decoder 1 is active.
  - For the **Second Decoder (Outputs 8 to 15):** Connect $w$ directly to Enable $E_2$ ($E_2 = w$). When $w = 1$, Decoder 2 is active.
```
                  w (MSB)
                  |  |
                  |  +---[ NOT ]---> E1 [ 3-to-8 Decoder 1 ] ---> Y0 to Y7
                  +----------------> E2 [ 3-to-8 Decoder 2 ] ---> Y8 to Y15
                       x, y, z ======> (A, B, C inputs of both decoders)
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-108N Unit 3, Full Adder circuit design from two Half Adders, 8:1 MUX implementation of a Boolean function, and Decoder tree expansion (3-to-8 to 4-to-16) are the top 3 university exam questions.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
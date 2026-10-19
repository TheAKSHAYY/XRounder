# BCA-108N: Digital Electronics
## Unit 2 Master Exam Revision Notes: Number Systems, Binary Codes & Error Detection
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `bca10802-0002-4000-8000-000000000108` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Review of Number Systems: Binary, Octal, Decimal, and Hexadecimal Number Systems**
- [x] **Number Base Conversions: Between Binary, Octal, Decimal, and Hexadecimal**
- [x] **Binary Arithmetic: Unsigned Addition, Subtraction, Multiplication & Division**
- [x] **Complements: r's and (r-1)'s Complements (1's and 2's Complements) & Signed Binary Subtraction**
- [x] **Binary Coded Decimal (BCD): 8421 Code, BCD Addition & Invalid BCD Correction**
- [x] **Gray Codes: Definition, Properties, Binary-to-Gray and Gray-to-Binary Conversions**
- [x] **Excess-3 Code: Self-Complementing Property and Applications**
- [x] **Alphanumeric Codes & Parity Codes for Error Detection**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] How is negative number representation achieved in 1's Complement and 2's Complement?
**Model Answer:**
- **1's Complement:** Invert all bits (0 becomes 1, 1 becomes 0). Suffers from dual zero (+0: `0000`, -0: `1111`).
- **2's Complement:** Take 1's complement and add 1 to the LSB (`2's comp = 1's comp + 1`). Has a single unique zero (`0000`).

### Q2. [2 Marks] Why is 2's Complement arithmetic universally preferred in digital computer hardware?
**Model Answer:**
1. Unique representation for zero.
2. Subtraction is performed using standard addition hardware: `A - B = A + (2's comp of B)`.
3. End-around carry is discarded rather than requiring an extra addition cycle as in 1's complement.

### Q3. [2 Marks] Define BCD (Binary Coded Decimal / 8421 Code) and state its valid range.
**Model Answer:**
BCD represents each decimal digit (0 to 9) using an individual 4-bit binary nibble (`0000` to `1001`). Binary combinations `1010` to `1111` (10 to 15) are invalid states requiring correction by adding `0110` (6).

### Q4. [2 Marks] What is Excess-3 (XS-3) Code and why is it called a Self-Complementing Code?
**Model Answer:**
Excess-3 is obtained by adding 3 (`0011`) to each BCD digit. It is **self-complementing** because the 1's complement of an Excess-3 representation directly produces the Excess-3 representation of its 9's complement.

### Q5. [2 Marks] Explain Gray Code (Reflected Binary Code) and state its primary engineering application.
**Model Answer:**
A non-weighted unit-distance code where two successive code words differ in **only one bit position**. Application: Optical rotary shaft encoders to prevent erroneous multi-bit transition glitches.

### Q6. [2 Marks] Convert Binary `10110` to Gray Code.
**Model Answer:**
MSB remains same: `g4 = b4 = 1`.
`g3 = b4 ⊕ b3 = 1 ⊕ 0 = 1`.
`g2 = b3 ⊕ b2 = 0 ⊕ 1 = 1`.
`g1 = b2 ⊕ b1 = 1 ⊕ 1 = 0`.
`g0 = b1 ⊕ b0 = 1 ⊕ 0 = 1`.
**Gray Code: `11101`**.

### Q7. [2 Marks] Differentiate Even Parity from Odd Parity.
**Model Answer:**
- **Even Parity:** Parity bit is set to 1 if the count of 1s in data is odd, ensuring total count of 1s is always even.
- **Odd Parity:** Parity bit is set to 1 if the count of 1s in data is even, ensuring total count of 1s is always odd.

### Q8. [2 Marks] State the Hamming Rule formula for determining the number of parity check bits `p` for `m` data bits.
**Model Answer:**
$$2^p \ge m + p + 1$$
For 4 data bits ($m = 4$): $2^3 = 8 \ge 4 + 3 + 1 = 8$. Thus, $p = 3$ parity bits are required (positions 1, 2, 4).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain BCD Addition and show how invalid states are corrected with an example: `28 + 45`.
**Model Answer:**
### 1. BCD Addition Rule
Add two BCD numbers using binary addition. If the sum of any 4-bit nibble exceeds 9 (`1001`) or generates an output carry, add `0110` (decimal 6) to correct the nibble and propagate carry to the next decimal digit.

### 2. Example: 28 + 45 (Decimal = 73)
- `28` in BCD = `0010  1000`
- `45` in BCD = `0100  0101`

Add lower nibbles:
```
    1000 (8)
  + 0101 (5)
  -------
    1101 (13 in binary > 9, INVALID!)
  + 0110 (Add 6 correction)
  -------
 (1)0011 (Carry 1 generated, Lower nibble = 3)
```
Add upper nibbles with carry:
```
    0010 (2)
  + 0100 (4)
  + 0001 (Carry from lower nibble)
  -------
    0111 (7, valid <= 9)
```
**Combined Result:** `0111  0011` = **73 in BCD**.

### Q2. [5 Marks] Perform binary subtraction using 2's Complement method: (1) `25 - 14`, (2) `14 - 25` using 8-bit registers.
**Model Answer:**
### 1. Case 1: 25 - 14 (Positive Result)
- `+25` = `00011001`
- `+14` = `00001110` => 1's comp = `11110001` => 2's comp of 14 = `11110010`
Add `25 + (-14)`:
```
    00011001 (25)
  + 11110010 (-14)
  ----------
  1 00001011
```
End carry `1` indicates positive result. Discard carry: `00001011` = **+11**.

### 2. Case 2: 14 - 25 (Negative Result)
- `+14` = `00001110`
- `+25` = `00011001` => 2's comp of 25 = `11100111`
Add `14 + (-25)`:
```
    00001110 (14)
  + 11100111 (-25)
  ----------
    11110101
```
No end carry indicates **negative result** in 2's complement form.
Magnitude = 2's comp of `11110101` = `00001010 + 1 = 00001011` (11).
Result: **-11**.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Explain the 7-bit Hamming Code (Single Error Detection and Correction) in complete detail. Construct a 7-bit Hamming code for 4-bit data `1011`, and demonstrate how an error in bit position 5 is detected and corrected.
**Comprehensive University Solution:**
### 1. Structure of 7-Bit Hamming Code
For $m = 4$ data bits ($D_7, D_6, D_5, D_3$), parity bits occupy powers of 2: $P_1, P_2, P_4$.
Bit positions: `1, 2, 3, 4, 5, 6, 7`
- $P_1$ checks bits with bit 1 set in binary address (1, 3, 5, 7): $P_1 = D_3 \oplus D_5 \oplus D_7$
- $P_2$ checks bits with bit 2 set in binary address (2, 3, 6, 7): $P_2 = D_3 \oplus D_6 \oplus D_7$
- $P_4$ checks bits with bit 4 set in binary address (4, 5, 6, 7): $P_4 = D_5 \oplus D_6 \oplus D_7$

### 2. Encoding Data `1011` ($D_7=1, D_6=0, D_5=1, D_3=1$)
- $P_1 = D_3 \oplus D_5 \oplus D_7 = 1 \oplus 1 \oplus 1 = 1$
- $P_2 = D_3 \oplus D_6 \oplus D_7 = 1 \oplus 0 \oplus 1 = 0$
- $P_4 = D_5 \oplus D_6 \oplus D_7 = 1 \oplus 0 \oplus 1 = 0$
**Transmitted 7-bit Code Word:**
| Pos 7 | Pos 6 | Pos 5 | Pos 4 | Pos 3 | Pos 2 | Pos 1 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| D7=1  | D6=0  | D5=1  | P4=0  | D3=1  | P2=0  | P1=1  |
Code Word = **`1010101`**

### 3. Error Detection & Correction Trace
Suppose bit position 5 is corrupted during transmission (`1` flips to `0`):
Received Code Word: **`1000101`** ($b_7=1, b_6=0, b_5=0, b_4=0, b_3=1, b_2=0, b_1=1$).
Compute Syndrome Bits ($S_4, S_2, S_1$):
- $S_1 = b_1 \oplus b_3 \oplus b_5 \oplus b_7 = 1 \oplus 1 \oplus 0 \oplus 1 = 1$
- $S_2 = b_2 \oplus b_3 \oplus b_6 \oplus b_7 = 0 \oplus 1 \oplus 0 \oplus 1 = 0$
- $S_4 = b_4 \oplus b_5 \oplus b_6 \oplus b_7 = 0 \oplus 0 \oplus 0 \oplus 1 = 1$

**Syndrome Word:** $S_4 S_2 S_1 = 101_2 = \mathbf{5}_{10}$.
Since syndrome is non-zero (5), an error occurred at **Bit Position 5**!
Correction: Invert bit 5 from `0` back to `1`, restoring the original data `1011` without retransmission.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-108N Unit 2, 2's complement arithmetic and 7-bit Hamming code error correction generation/detection are classic exam problems. Always show the binary bit position mapping and syndrome evaluation.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
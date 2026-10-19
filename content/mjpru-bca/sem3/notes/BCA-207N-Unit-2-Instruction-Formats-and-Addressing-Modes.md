# BCA-207N: Computer Organization and Architecture
## Unit 2 Master Exam Revision Notes: CPU Functioning, Instruction Formats & Addressing Modes
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Instruction Format Architecture: Three-Address, Two-Address, One-Address (Accumulator), Zero-Address (Stack) Instructions**
- [x] **Instruction Types: Data Transfer, Data Manipulation (Arithmetic, Logical, Shift), Program Control (Branches, Subroutines)**
- [x] **Addressing Modes: Purpose (Relocatability, Pointer Indexing, Memory Saving)**
- [x] **Immediate Addressing Mode: Operand Specified Explicitly Inside Instruction Word**
- [x] **Direct Addressing Mode: Instruction Contains Memory Address of Target Operand**
- [x] **Indirect Addressing Mode: Instruction Points to Memory Location Containing Actual Target Address**
- [x] **Register Addressing & Register Indirect Addressing Modes: High-Speed Register Access and Pointer Manipulation**
- [x] **Relative Addressing Mode: Program Counter (PC) Relative Offset, Branching Efficiency**
- [x] **Indexed Addressing Mode: Base Register + Index Register Calculation, Array Traversal**
- [x] **Base Register Addressing Mode: Segment Base + Displacement, Dynamic Program Relocation**
- [x] **Auto-Increment and Auto-Decrement Addressing Modes: Stack Pointer and Sequential Array Handling**
- [x] **Reduced Instruction Set Computer (RISC) vs Complex Instruction Set Computer (CISC) Paradigms**
- [x] **Modern Multi-core Microprocessor Architecture: Shared L3 Cache, Point-to-Point Interconnects (QPI), Simultaneous Multithreading**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is an Instruction Format? List the three fields in a standard instruction word.
**Model Answer:**
An **Instruction Format** defines the internal bit layout of a machine instruction word. Standard fields include:
1. **Mode Field:** Specifies addressing mode (direct/indirect/indexed).
2. **Opcode (Operation Code):** Specifies operation to perform (ADD, SUB, MOV).
3. **Address / Operand Field:** Designates memory address or register containing operand.

### Q2. [2 Marks] Differentiate between Zero-Address Instructions and One-Address Instructions.
**Model Answer:**
**Zero-Address Instructions** operate on operands implicitly located at the top of an execution stack (e.g., `ADD` pops top two stack values, adds them, and pushes sum back; used in stack machines).
**One-Address Instructions** implicitly assume the Accumulator (AC) register holds one operand and receives the result (e.g., `ADD X` executes $AC \leftarrow AC + M[X]$).

### Q3. [2 Marks] Define Immediate Addressing Mode and give an assembly example.
**Model Answer:**
In **Immediate Addressing Mode**, the operand value is specified explicitly inside the instruction word itself rather than in memory or registers.
*Example:* `ADD #25` (adds constant value 25 directly to Accumulator).

### Q4. [2 Marks] What is Indirect Addressing Mode and why is it useful?
**Model Answer:**
In **Indirect Addressing Mode**, the instruction contains the memory address of a location that holds the *effective address* of the actual operand ($EA = M[ADRS]$). It is essential for implementing pointers, passing parameters by reference, and subroutine link tables.

### Q5. [2 Marks] Explain Relative Addressing Mode.
**Model Answer:**
In **Relative Addressing Mode**, the effective address is computed by adding the instruction's offset field to the contents of the Program Counter ($EA = PC + \text{Offset}$). It produces position-independent code and compact branch instructions.

### Q6. [2 Marks] Compare RISC and CISC paradigms in two sentences.
**Model Answer:**
**RISC (Reduced Instruction Set Computer)** uses a small set of simple, single-cycle, uniform-length instructions operating strictly via a Load/Store architecture with hardwired control.
**CISC (Complex Instruction Set Computer)** provides hundreds of specialized, variable-length instructions capable of direct memory-to-memory manipulations implemented via microprogrammed control.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Evaluate the expression $X = (A + B) \times (C + D)$ using Zero-Address, One-Address, Two-Address, and Three-Address instructions.
**Model Answer:**
### Instruction Format Evaluation for $X = (A + B) \times (C + D)$

---

#### 1. Three-Address Instructions:
Format: `OP Destination, Source1, Source2`
```assembly
ADD  R1, A, B       ; R1 <- M[A] + M[B]
ADD  R2, C, D       ; R2 <- M[C] + M[D]
MUL  X,  R1, R2     ; M[X] <- R1 * R2
```
*Total Instructions:* **3** (Shortest code, longest instruction word).

---

#### 2. Two-Address Instructions:
Format: `OP Destination, Source` (Destination also acts as first operand).
```assembly
MOV  R1, A          ; R1 <- M[A]
ADD  R1, B          ; R1 <- R1 + M[B]
MOV  R2, C          ; R2 <- M[C]
ADD  R2, D          ; R2 <- R2 + M[D]
MUL  R1, R2         ; R1 <- R1 * R2
MOV  X,  R1         ; M[X] <- R1
```
*Total Instructions:* **6**.

---

#### 3. One-Address Instructions (Accumulator Machine):
Format: `OP Address` (Implicitly uses Accumulator `AC`).
```assembly
LOAD  A             ; AC <- M[A]
ADD   B             ; AC <- AC + M[B]
STORE T             ; M[T] <- AC (store temporary sum A+B)
LOAD  C             ; AC <- M[C]
ADD   D             ; AC <- AC + M[D]
MUL   T             ; AC <- AC * M[T]
STORE X             ; M[X] <- AC
```
*Total Instructions:* **7**.

---

#### 4. Zero-Address Instructions (Stack Machine):
Format: `OP` (Operands popped from stack; result pushed back).
```assembly
PUSH A              ; TOS <- M[A]
PUSH B              ; TOS <- M[B]
ADD                 ; TOS <- (A + B)
PUSH C              ; TOS <- M[C]
PUSH D              ; TOS <- M[D]
ADD                 ; TOS <- (C + D)
MUL                 ; TOS <- (A + B) * (C + D)
POP  X              ; M[X] <- TOS
```
*Total Instructions:* **8**.

### Q2. [5 Marks] Explain Addressing Modes with formulas for Effective Address (EA): Immediate, Direct, Indirect, Register Indirect, Indexed, and Base Register.
**Model Answer:**
### Comprehensive Summary of CPU Addressing Modes

| Addressing Mode | Effective Address ($EA$) Formula | Meaning & Practical Use Case |
| :--- | :--- | :--- |
| **Immediate** | None ($Operand = Address$) | Operand is a hardcoded constant inside instruction. Used to initialize variables. |
| **Direct (Absolute)** | $EA = Address$ | Instruction holds direct memory address. Fast memory lookup for global variables. |
| **Indirect** | $EA = M[Address]$ | Instruction points to a pointer variable containing operand address. |
| **Register** | Operand in register $R$ | Operand stored in high-speed CPU register. Fastest execution. |
| **Register Indirect** | $EA = R$ | Register contains the memory pointer to the operand. Dynamic memory allocation. |
| **Relative** | $EA = PC + Offset$ | Address calculated relative to Program Counter. Branching and relocatable code. |
| **Indexed** | $EA = XR + Address$ | Index Register ($XR$) added to base address. Array element traversal (`arr[i]`). |
| **Base Register** | $EA = BR + Displacement$ | Base Register added to offset. Segment relocation in multi-user operating systems. |
| **Auto-Increment** | $EA = R; R \leftarrow R + 1$ | Step pointer forward automatically. Stepping through linked lists/arrays. |

### Q3. [5 Marks] Explain RISC vs CISC Architecture across design philosophy, register usage, pipeline efficiency, and instruction decoding.
**Model Answer:**
### RISC vs CISC Architectural Comparison

```
              RISC Pipeline Philosophy                   CISC Microcode Philosophy
+-------------------------------------------------+  +-------------------------------+
| Single-cycle instructions, Fixed 32-bit length  |  | Variable length (1 to 15 bytes)
| Large Register File (32+ GPRs)                  |  | Few Registers (Accumulator-heavy)
| Memory access strictly via LOAD / STORE         |  | Memory-to-Memory operations   |
| Hardwired Control Unit, High Pipeline Speed     |  | Microprogrammed ROM Control   |
+-------------------------------------------------+  +-------------------------------+
```

1. **Instruction Set & Complexity:** RISC contains ~50–100 simple instructions that execute in a single clock cycle. CISC contains 300+ complex instructions that take multiple cycles.
2. **Memory Access Paradigm:** In RISC, ALU instructions operate exclusively on CPU registers (`ADD R1, R2, R3`). Only explicit `LOAD` and `STORE` access RAM. In CISC, instructions can directly fetch from memory, compute, and store back (`ADD [EAX], EBX`).
3. **Pipelining Suitability:** RISC's fixed instruction length and single-cycle execution make it exceptionally easy to pipeline. CISC variable-length instructions require complex pre-decoders.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Discuss Addressing Modes in detail. Explain at least 8 addressing modes with schematic diagrams, effective address derivations, and assembly language examples. Why are addressing modes essential in modern computer architecture?
**Comprehensive University Solution:**
### Comprehensive Analysis of Addressing Modes in Computer Architecture

Addressing modes define the operational rules for interpreting or transforming the operand address field within an instruction before operand fetching.

---

### Importance of Addressing Modes:
1. **Flexibility:** Allows pointers, arrays, records, and linked data structures to be manipulated dynamically.
2. **Instruction Compaction:** Reduces the total number of bits required to specify memory addresses.
3. **Program Relocatability:** Programs can be loaded anywhere in physical memory without rewriting branch addresses.

---

### 1. Immediate Addressing Mode
- **Mechanism:** Operand value is part of the instruction.
- **Diagram:** `[ Opcode | Operand Value ]`
- **Example:** `MOV R1, #500` (Loads integer constant 500 into register R1).

### 2. Direct (Absolute) Addressing Mode
- **Mechanism:** Instruction field explicitly gives target RAM memory address.
- **Formula:** $EA = A$
- **Diagram:** `[ Opcode | Address A ] ---> Memory Location [ A ] (Contains Operand)`
- **Example:** `LOAD 2050` (Loads content of memory cell 2050 into Accumulator).

### 3. Indirect Addressing Mode
- **Mechanism:** Address field points to memory location holding the actual pointer.
- **Formula:** $EA = M[A]$
- **Diagram:** `[ Opcode | Address A ] ---> Memory [ A ] holds Pointer P ---> Memory [ P ] holds Operand`
- **Example:** `LOAD @2050` (Fetches operand from address pointed to by RAM cell 2050).

### 4. Register Direct Addressing Mode
- **Mechanism:** Operand resides within one of the CPU general-purpose registers.
- **Formula:** $Operand = R$
- **Example:** `ADD R1, R2` (Adds register R2 to R1; zero memory bus access required).

### 5. Register Indirect Addressing Mode
- **Mechanism:** CPU register contains the effective memory address of operand.
- **Formula:** $EA = [R_i]$
- **Example:** `LOAD (R1)` (Loads operand from memory address stored inside R1).

### 6. Relative Addressing Mode
- **Mechanism:** Offset is added to current Program Counter ($PC$).
- **Formula:** $EA = PC + \text{Offset}$
- **Application:** Conditional branch jumps (`JMP +12`). Code remains position-independent.

### 7. Indexed Addressing Mode
- **Mechanism:** Base memory address is modified by the content of an Index Register ($XR$).
- **Formula:** $EA = A + XR$
- **Application:** Accessing element $i$ of array: `MOV R1, ArrayBase(XR)`. Incrementing $XR$ steps to next array index.

### 8. Base Register Addressing Mode
- **Mechanism:** Content of Base Register ($BR$) is added to instruction's address displacement.
- **Formula:** $EA = BR + \text{Displacement}$
- **Application:** Virtual memory relocation; OS sets $BR$ to segment start.

### Q2. [10/15 Marks] Critically evaluate General Purpose Register (GPR) Organization. Explain the Bus Organization for a 7-CPU register system with ALU and discuss the Control Word format and micro-operations.
**Comprehensive University Solution:**
### General Purpose Register (GPR) Organization & Control Word Specification

In modern CPUs, multiple General Purpose Registers ($R_1$ to $R_7$) are interconnected via multiplexers to provide fast source operands to the ALU and store destination results.

```
                  +-----------------------------------+
                  |   Register Set (R1, R2 ... R7)    |
                  +-----------------------------------+
                    |                               |
                    v (Multiplexer A)               v (Multiplexer B)
              +-----------+                   +-----------+
              |   Bus A   |                   |   Bus B   |
              +-----------+                   +-----------+
                    \                               /
                     \                             /
                      v                           v
                  +-----------------------------------+
                  |      Arithmetic Logic Unit        |
                  +-----------------------------------+
                                    |
                                    v
                  +-----------------------------------+
                  |       Output Bus (Dest Decoder)   |
                  +-----------------------------------+
                                    |
                                    +---> Writes back to selected Register
```

---

### Control Word Bit Fields (14-Bit Format):
To execute an instruction like $R1 \leftarrow R2 + R3$, the control unit issues a 14-bit **Control Word**:

```
+------------+------------+------------+------------+
|  SELA (3)  |  SELB (3)  |  SELD (3)  |   OPR (5)  |
+------------+------------+------------+------------+
```

1. **SELA (3 bits):** Selects which register places data onto Bus A (Source 1).
2. **SELB (3 bits):** Selects which register places data onto Bus B (Source 2).
3. **SELD (3 bits):** Destination decoder selecting which register loads the ALU output.
4. **OPR (5 bits):** Specifies the specific ALU micro-operation (ADD, SUB, AND, SHL, etc.).

#### Encoding Table:
| Binary Code | SELA (Bus A) | SELB (Bus B) | SELD (Destination) |
| :---: | :---: | :---: | :---: |
| 000 | None | None | None |
| 001 | $R_1$ | $R_1$ | $R_1$ |
| 010 | $R_2$ | $R_2$ | $R_2$ |
| 011 | $R_3$ | $R_3$ | $R_3$ |
| 100 | $R_4$ | $R_4$ | $R_4$ |
| 101 | $R_5$ | $R_5$ | $R_5$ |
| 110 | $R_6$ | $R_6$ | $R_6$ |
| 111 | $R_7$ | $R_7$ | $R_7$ |

- **Execution Example ($R1 \leftarrow R2 - R3$):**  
  Control word: `SELA = 010 (R2), SELB = 011 (R3), SELD = 001 (R1), OPR = 00101 (SUB)`.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
### Examiner Insights & University Exam Strategy:
1. **Guaranteed Expression Evaluation:** Writing assembly instructions for an expression like $(A+B) \times (C+D)$ in 3, 2, 1, and 0-address formats is a top 10-mark question. Practice writing clean code sequences for each.
2. **Addressing Modes:** Memorize the exact EA formula for at least 6 modes (Immediate, Direct, Indirect, Relative, Indexed, Register Indirect).
3. **RISC vs CISC Table:** Always present in a clean two-column comparison format emphasizing instruction count, registers, and execution cycle time.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
# The Instruction Execution Cycle (Machine Cycle)

The primary function of the Central Processing Unit is to continuously execute machine instructions stored in main memory. This continuous loop is known as the **Instruction Execution Cycle** or **Fetch-Decode-Execute Cycle**.

---

## The Four Essential Phases

```
   +--------------------------------------------------------+
   |                                                        |
   v                                                        |
+-------------+      +--------------+      +-------------+  |
| 1. FETCH    | ---> |  2. DECODE   | ---> | 3. EXECUTE  | -+
| PC -> MAR   |      | IR -> Opcode |      | ALU Computes|  |
| RAM -> MBR  |      | Control Unit |      | Flags Set   |  |
| MBR -> IR   |      | Logic Signals|      +-------------+  |
| PC = PC + 1 |      +--------------+             |         |
+-------------+                                   v         |
                                           +-------------+  |
                                           |  4. STORE   | -+
                                           | ACC -> RAM  |
                                           | or Register |
                                           +-------------+
```

---

## Step-by-Step Register Transfer Language (RTL) Walkthrough

### Phase 1: Instruction Fetch (IF)
Retrieve the next binary instruction from memory into the CPU:
1. **MAR $\leftarrow$ PC**: The address held in the Program Counter is placed onto the address bus via the Memory Address Register.
2. **MBR $\leftarrow$ Memory[MAR]**: The memory subsystem responds by asserting the binary instruction onto the data bus into the Memory Buffer Register.
3. **PC $\leftarrow$ PC + 1**: The Program Counter is incremented by the instruction word length, pointing immediately to the subsequent instruction.
4. **IR $\leftarrow$ MBR**: The fetched instruction is latched into the Instruction Register.

### Phase 2: Instruction Decode (ID)
The Control Unit analyzes the instruction word in the IR:
- **Opcode Field**: The binary operation code is routed to a binary decoder (e.g., an 8-to-256 line decoder) to determine the exact operation: `ADD`, `SUB`, `JMP`, `MOV`.
- **Addressing Mode & Operands**: Determines whether data resides in a register, an immediate value, or a memory location requiring effective address calculation.

### Phase 3: Execute (EX)
The decoded control lines activate the required hardware components:
- If arithmetic: ALU inputs are loaded from registers/memory, the computation executes, and status flags (`Zero`, `Carry`, `Sign`) update.
- If control transfer (`JMP`/`BRANCH`): If condition evaluates true, the target address is written directly into the Program Counter: $	ext{PC} \leftarrow 	ext{Target Address}$.

### Phase 4: Store / Writeback (WB)
The result produced by the ALU is saved into its permanent destination:
- Internal register (e.g., Accumulator `ACC`, general-purpose `EBX`).
- Or written back across the system bus into main memory.

---

## Clock Cycles, Machine Cycles, and Instruction Time

```
|<----------------------- ONE INSTRUCTION CYCLE ----------------------->|
|                                                                       |
+--------------------------+--------------------------+-----------------+
|       FETCH CYCLE        |       EXECUTE CYCLE      |   WRITEBACK     |
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
| T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 |T10|T11|T12|T13|T14|
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
|<-- Clock Period (1/GHz) ->|
```

- **Clock Cycle ($T$-state)**: The smallest unit of time in a processor, governed by the internal quartz crystal oscillator ($T = 1 / f$). For a 4 GHz CPU, 1 $T$-state $= 0.25	ext{ nanoseconds}$.
- **Machine Cycle**: The time required by the CPU to complete a discrete bus transaction (Memory Read, Memory Write, I/O Read, or I/O Write). Typically spans 3 to 6 $T$-states.
- **Instruction Cycle**: The total duration required to fetch, decode, execute, and store an entire instruction. Spans multiple machine cycles.

---

## High-Weightage Exam Tips

> [!IMPORTANT]
> When answering a 5-mark or 15-mark university question on the **Machine Cycle**:
> 1. Draw the **circular 4-phase state diagram** (Fetch $ightarrow$ Decode $ightarrow$ Execute $ightarrow$ Store).
> 2. Write the exact **Register Transfer Language (RTL)** expressions: $	ext{MAR} \leftarrow 	ext{PC}$, $	ext{MBR} \leftarrow 	ext{Memory}$, $	ext{PC} \leftarrow 	ext{PC} + 1$, $	ext{IR} \leftarrow 	ext{MBR}$.

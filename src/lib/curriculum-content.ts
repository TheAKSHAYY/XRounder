// Curriculum Content Engine: High-yield GfG-style Educational Articles & Calibrated MCQs
// Official MJPRU Bareilly BCA Syllabus w.e.f. 2024-25

export interface CuratedArticle {
  id: string;
  topicTitle: string;
  title: string;
  body: string;
  sortOrder: number;
}

export interface CuratedMcq {
  prompt: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard" | string;
  topic_title?: string;
  options: Array<{
    text: string;
    is_correct: boolean;
    letter?: string;
  }>;
}

// BCA-101N Unit 1 Educational Articles (Pilot Unit)
export const BCA_101N_UNIT_1_ARTICLES: CuratedArticle[] = [
  {
    "id": "bca-101n-u1-art-01",
    "topicTitle": "Definition & Characteristics of Computers",
    "title": "Definition & Characteristics of Computers",
    "body": "# Definition & Characteristics of Computers\n\nA computer is a programmable electronic device that accepts raw data as input, performs mathematical and logical operations at high speed based on a sequence of instructions, and produces meaningful information as output. The word originates from the Latin term *computare*, meaning to calculate or reckon.\n\n---\n\n## The Input-Process-Output (IPO) Architecture\n\nEvery modern computing system operates on the fundamental **IPO Cycle**:\n\n```\n+---------------+      +-------------------+      +----------------+\n|  INPUT DATA   | ---> |  PROCESSING (CPU) | ---> | OUTPUT (INFO)  |\n| Keyboard, Mic |      | ALU, Registers, CU|      | Monitor, Audio |\n+---------------+      +-------------------+      +----------------+\n         ^                       |                        |\n         |                       v                        v\n         +------------ STORAGE (RAM / SSD / HDD) <--------+\n```\n\n1. **Input Phase**: Raw, unstructured alphanumeric characters, sensor readings, or audio samples enter the system via peripheral devices (keyboard, mouse, barcode scanner, ADC).\n2. **Processing Phase**: The Central Processing Unit (CPU) retrieves instructions from primary storage, decodes them, and manipulates registers via the Arithmetic Logic Unit (ALU).\n3. **Output Phase**: Transformed results are presented in human-readable formats (visual display, audio signal, printout) or transmitted to an external actuator.\n4. **Storage Phase**: Intermediate calculations and persistent records are written to volatile RAM or non-volatile secondary media.\n\n### Data vs. Information: The Critical Distinction\n\n| Attribute | Data | Information |\n| :--- | :--- | :--- |\n| **Nature** | Raw, unorganized, isolated facts and symbols | Processed, contextualized, organized data |\n| **Meaning** | Carries no inherent meaning or intent | Conveys direct meaning, intent, and relevance |\n| **Example** | `42`, `\"Bareilly\"`, `38.5` | `\"Daily high temperature in Bareilly: 38.5°C\"` |\n| **Dependency** | Input to the processing cycle | Output of the processing cycle |\n| **Decision Value** | Insufficient for making decisions | Directly usable for decision-making |\n\n---\n\n## Six Essential Characteristics of Modern Computers\n\nComputers transformed industry because human biological cognition has distinct physical limits. The six defining characteristics are:\n\n### 1. High Processing Speed\nComputers execute millions to billions of machine operations per second. Modern processors operate with clock frequencies in the Gigahertz (GHz) range (1 GHz = $10^9$ clock ticks per second).\n- Cycle times are measured in **nanoseconds ($10^{-9}$ s)** and **picoseconds ($10^{-12}$ s)**.\n- Floating-point workloads are quantified in **MFLOPS** (Million Floating-Point Operations Per Second) or **TFLOPS** (TeraFLOPS).\n\n### 2. Pinpoint Accuracy & The GIGO Principle\nComputers execute boolean logic without mathematical deviation. Errors occurring in computing systems almost universally trace back to faulty software logic, corrupt input data, or damaged storage media.\n\n> [!IMPORTANT]\n> **The GIGO Principle (Garbage In, Garbage Out)**: A computer's output accuracy is bound to the fidelity of the input data. If incorrect, incomplete, or corrupted data is supplied, the computational engine produces an erroneous output with mathematical precision.\n\n### 3. Tireless Diligence\nUnlike biological workers, electronic circuits experience:\n- Zero physical fatigue or muscular strain\n- Zero loss of attention, boredom, or psychological distraction\n- Consistent speed on the 10-millionth iteration identical to the 1st iteration\n\n### 4. Exceptional Versatility\nA single computer unit can calculate complex linear regression models, compose vector graphics, route global network packets, stream 4K video, and synthesize speech by simply altering the resident instruction sequence (software).\n\n### 5. Vast Storage Capacity & Fast Retrieval\nModern systems utilize a multi-tier memory hierarchy capable of holding terabytes ($10^{12}$ bytes) of data permanently with random access times in microseconds or nanoseconds.\n\n### 6. Full Automation\nOnce an instruction sequence (program) is loaded into memory and initiated, the CPU sequences fetch-decode-execute cycles autonomously without human intervention until reaching a `HALT` or interrupt condition.\n\n---\n\n## Practical Applications in Modern Industry\n\n- **Banking & High-Frequency Trading**: Clearing millions of instant UPI and NEFT transactions per second while maintaining strict ACID transactional consistency.\n- **Meteorological Simulation**: Solving partial differential equations across billions of atmospheric grid points on supercomputers to forecast cyclonic storm paths.\n- **Healthcare & Radiology**: Reconstructing 3D tissue density tomograms from raw CT/MRI sensor attenuation readings.\n\n---\n\n## Summary for University Exams\n\n- **Computer**: An electronic machine executing programmed stored instructions on raw data to yield contextual information.\n- **IPO Flow**: Input $\nightarrow$ Processing $\nightarrow$ Output with bi-directional Storage access.\n- **GIGO Rule**: Output reliability is strictly bounded by input data integrity.\n- **Core Strengths**: Speed (GHz), Accuracy (Zero logic drift), Diligence (No fatigue), Versatility (Multi-purpose software), Storage, and Automation.",
    "sortOrder": 1
  },
  {
    "id": "bca-101n-u1-art-02",
    "topicTitle": "Computer Generations & Evolution",
    "title": "Computer Generations & Evolution",
    "body": "# Computer Generations & Evolution\n\nComputer hardware evolution is cataloged into **five distinct generations**, each demarcated by a fundamental breakthrough in core electronic switching technology, memory media, and programming paradigms.\n\n---\n\n## Generational Comparison Matrix\n\n| Generation | Timeline | Core Switching Hardware | Primary Memory | Programming Language | Typical Execution Speed | Representative Systems |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **1st Gen** | 1940–1956 | Vacuum Tubes (Thermionic Valves) | Magnetic Drums, Delay Lines | Machine Language (Binary 0s and 1s) | Milliseconds ($10^{-3}$ s) | ENIAC, EDVAC, UNIVAC I, IBM 701 |\n| **2nd Gen** | 1956–1963 | Discrete Bipolar Transistors | Magnetic Core Memory | Assembly Language, Early HLL (FORTRAN, COBOL) | Microseconds ($10^{-6}$ s) | IBM 1401, IBM 7094, CDC 1604 |\n| **3rd Gen** | 1964–1971 | Integrated Circuits (Small & Medium Scale ICs) | Magnetic Core, Semiconductor RAM | Structured HLL (BASIC, Pascal, C), Time-sharing OS | Nanoseconds ($10^{-9}$ s) | IBM System/360, PDP-8, PDP-11 |\n| **4th Gen** | 1971–Present | Microprocessors (VLSI & ULSI Silicon Chips) | High-speed Semiconductor SRAM & DRAM | Modern Object-Oriented Languages (C++, Java, Python, SQL) | Picoseconds / Multiple GHz | Intel x86, Apple M-Series, AMD Ryzen |\n| **5th Gen** | Present & Beyond | Artificial Intelligence, Massive Parallelism, Quantum Bits | Multi-die HBM, Optical Storage, Quantum Registers | Natural Language Querying, Neural Net Models (Python, Mojo) | PetaFLOPS & ExaFLOPS | PARAM Siddhi, Fugaku, Frontier |\n\n---\n\n## Detailed Generational Breakdown\n\n### First Generation (1940–1956): The Thermionic Valve Era\n- **Core Technology**: Vacuum tubes constructed from sealed glass containing filaments and plates.\n- **Physical Characteristics**: Massive physical footprints (occupying entire rooms), immense power draw (150+ kW), continuous heat generation, and frequent filament burnout.\n- **Memory**: Mercury delay lines and rotating magnetic drums.\n- **Data Input/Output**: Punched paper cards and paper tape.\n- **Key Machines**:\n  - **ENIAC (1946)**: Electronic Numerical Integrator and Computer (18,000 vacuum tubes, weighed 30 tons).\n  - **UNIVAC I (1951)**: First commercially available electronic computer purchased by the US Census Bureau.\n\n### Second Generation (1956–1963): The Transistor Revolution\n- **Breakthrough**: Invention of the point-contact and junction transistor at Bell Labs (1947) by William Shockley, John Bardeen, and Walter Brattain.\n- **Advantages over Tubes**: 1/1000th the volume, negligible heat emission, solid-state reliability, and 10x lower electrical power requirements.\n- **Memory Innovation**: Tiny magnetized ferrite rings called **Magnetic Cores** threaded onto copper wire grids.\n- **Software**: Introduction of mnemonic Assembly language and standardized high-level compilers (FORTRAN for science, COBOL for enterprise).\n\n### Third Generation (1964–1971): Integrated Circuits (ICs)\n- **Breakthrough**: Jack Kilby (Texas Instruments) and Robert Noyce (Fairchild Semiconductor) integrated dozens of transistors, resistors, and capacitors onto a single miniature silicon chip.\n  - SSI (Small-Scale Integration): Up to 30 components per chip.\n  - MSI (Medium-Scale Integration): Up to 500 components per chip.\n- **User Interface Shift**: Replaced punched cards with **monitors (CRTs) and keyboards**.\n- **Operating Systems**: Time-sharing supervisory kernels allowed multiple users to share a single CPU concurrently.\n\n### Fourth Generation (1971–Present): The Microprocessor & Personal Computing\n- **Breakthrough**: The entire Central Processing Unit fabricated onto a single silicon chip (Intel 4004 in 1971, followed by the 8080 and x86 architectures).\n  - VLSI (Very Large Scale Integration): $10^4$ to $10^5$ transistors per chip.\n  - ULSI (Ultra Large Scale Integration): Over $10^7$ transistors on a thumb-sized die.\n- **Impact**: Gave birth to the personal computer (PC), workstations, local area networking (LAN), graphical user interfaces (GUI), and the modern Internet.\n\n### Fifth Generation (Present & Emerging): Parallelism & Machine Intelligence\n- Characterized by multi-core and massively parallel graphics processing units (GPUs/TPUs).\n- Hardware support for neural network inference and quantum computing paradigms (superposition and entanglement).\n- Evolution from rigid programmatic logic to autonomous adaptive learning systems.\n\n---\n\n## High-Weightage Exam Tips\n\n> [!TIP]\n> In semester exams, always include the **Generational Comparison Matrix** first. Examiners award full marks when you explicitly cite the switching device, memory type, cycle speed, and two machine examples for each generation.",
    "sortOrder": 2
  },
  {
    "id": "bca-101n-u1-art-03",
    "topicTitle": "Von Neumann Architecture & The Stored Program Concept",
    "title": "Von Neumann Architecture & The Stored Program Concept",
    "body": "# Von Neumann Architecture & The Stored Program Concept\n\nFormulated in 1945 by mathematician and physicist **John von Neumann** in his landmark paper *\"First Draft of a Report on the EDVAC\"*, the Von Neumann architecture remains the theoretical foundation for general-purpose digital computers.\n\n---\n\n## The Stored Program Concept\n\nPrior to 1945, early computers like the ENIAC were \"fixed-program\" machines: reprogramming required technicians to physically re-plug patch cables and turn manual rotary switches.\n\nThe **Stored Program Concept** revolutionized computing with two fundamental axioms:\n1. **Unified Memory**: Program instructions and operational data share the exact same physical address space.\n2. **Sequential Execution**: Instructions reside in consecutive memory addresses and execute in sequential order unless an explicit branch or jump instruction alters the Program Counter.\n\n---\n\n## Architectural Schematic Diagram\n\n```\n+-------------------------------------------------------------------------+\n|                      CENTRAL PROCESSING UNIT (CPU)                      |\n|                                                                         |\n|  +------------------------+             +----------------------------+  |\n|  |     CONTROL UNIT       |             |   ARITHMETIC LOGIC UNIT    |  |\n|  |                        |             |          (ALU)             |  |\n|  |  +------------------+  |             |                            |  |\n|  |  | Program Counter  |  |             |  +-----------------------+ |  |\n|  |  |       (PC)       |  |             |  |      Accumulator      | |  |\n|  |  +------------------+  |             |  |         (ACC)         | |  |\n|  |  +------------------+  |             |  +-----------------------+ |  |\n|  |  | Instruction Reg  |  |             |  +-----------------------+ |  |\n|  |  |       (IR)       |  |             |  |    Status Register    | |  |\n|  |  +------------------+  |             |  |        (Flags)        | |  |\n|  +-----------|------------+             +--------------|-------------+  |\n|              | Control Signals                         | Data           |\n+--------------|-----------------------------------------|----------------+\n               |                                         |\n               |       COMMON SYSTEM BUS (Shared Path)   |\n  =============v=========================================v=================\n       | Address Bus               | Data Bus               | Control Bus\n  =====v===========================v========================v==============\n               |                                         |\n+--------------v------------------+       +--------------v----------------+\n|          MAIN MEMORY            |       |      INPUT / OUTPUT (I/O)     |\n|   (Shared Instructions & Data)  |       |                               |\n|                                 |       |   [Keyboard]      [Monitor]   |\n| Address 0x00: MOV AX, [0x10]    |       |   [Disk Drive]    [Network]   |\n| Address 0x04: ADD AX, 5         |       |                               |\n| Address 0x10: 42 (Raw Data)     |       |                               |\n+---------------------------------+       +-------------------------------+\n```\n\n---\n\n## Core Subsystems & Register Operations\n\n### 1. The Central Processing Unit (CPU)\n- **Control Unit (CU)**: Decodes binary opcodes, manages the clock generator, and transmits timing strobe pulses over control lines to synchronize all subsystems.\n- **Arithmetic Logic Unit (ALU)**: Contains combinational logic gates to execute:\n  - Arithmetic operations: `ADD`, `SUB`, `MUL`, `DIV`.\n  - Logical operations: `AND`, `OR`, `NOT`, `XOR`, and bitwise shifts.\n- **Dedicated Internal Registers**:\n  - **Program Counter (PC)**: Stores the memory address of the next instruction to fetch.\n  - **Memory Address Register (MAR)**: Holds the memory address currently being read from or written to via the Address Bus.\n  - **Memory Buffer / Data Register (MBR / MDR)**: Latches the actual binary word fetched from or directed to RAM.\n  - **Instruction Register (IR)**: Stores the opcode of the instruction currently undergoing decoding.\n  - **Accumulator (ACC)**: Holds intermediate arithmetic results.\n\n### 2. The Main Memory Unit\nLinear array of addressable storage cells holding both program instructions and variables in binary form.\n\n---\n\n## The Von Neumann Bottleneck\n\n> [!WARNING]\n> **The Von Neumann Bottleneck**: Because both instructions and data must travel across the **same shared physical bus**, the CPU cannot fetch an instruction and read/write operational data simultaneously. \n\nAs CPU clock frequencies increased exponentially while memory bus latencies decreased slowly, the shared bus became a critical choke-point. Modern computing resolves this limitation via:\n- Multi-level internal caches (L1 Instruction Cache separated from L1 Data Cache)\n- Speculative execution and instruction pre-fetching pipelines\n- Branch prediction algorithms\n\n---\n\n## Comparison: Von Neumann vs. Harvard Architecture\n\n| Feature | Von Neumann Architecture | Harvard Architecture |\n| :--- | :--- | :--- |\n| **Memory Structure** | Single shared memory for data & instructions | Physically separate memories for data & instructions |\n| **Bus System** | One shared address & data bus | Independent data and instruction buses |\n| **Speed** | Slower (Shared bus bottleneck) | Faster (Simultaneous instruction fetch & data access) |\n| **Circuit Complexity** | Simple hardware design | Complex circuitry with duplicate bus paths |\n| **Use Cases** | General-purpose desktop & server computers | Microcontrollers (AVR, PIC, ARM Cortex-M), DSPs |",
    "sortOrder": 3
  },
  {
    "id": "bca-101n-u1-art-04",
    "topicTitle": "Classification of Computers",
    "title": "Classification of Computers",
    "body": "# Classification of Computers\n\nDigital computers are classified according to their **physical size, computational throughput, memory capacity, architectural parallelism, and intended operational environment**.\n\n---\n\n## Comprehensive Classification Spectrum\n\n```\n                               DIGITAL COMPUTERS\n                                       |\n    +-------------------+--------------+--------------+------------------+\n    |                   |                             |                  |\nMICROCOMPUTERS    MINICOMPUTERS                 MAINFRAMES         SUPERCOMPUTERS\n- Desktops        - Mid-range departmental      - High-volume      - Massively Parallel\n- Laptops           servers                       I/O throughput   - Floating-Point Heavy\n- Tablets / Phones- Industrial controllers      - Fault-tolerant   - Scientific & Weather\n- Embedded          (e.g., PDP-11, VAX)         - Banking & Core     (e.g., PARAM Siddhi,\n  Systems                                         Enterprise         Frontier, Fugaku)\n```\n\n---\n\n## Detailed Classification Comparison\n\n| Class | Processing Units | Typical Users | Primary Strength | Typical Cost Range | Primary Real-World Application |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **Microcomputer** | Single Microprocessor (1 to 16 cores) | 1 user at a time | Low cost, portable, versatile | $100 – $4,000 | Personal productivity, web browsing, office software |\n| **Minicomputer (Midrange)** | Multi-chip CPUs (8 to 64 cores) | 10 to 200 concurrent users | Departmental data handling, control | $10,000 – $150,000 | Factory automation, college laboratories, mid-tier databases |\n| **Mainframe** | Specialized fault-tolerant multi-processor clusters | 1,000s to 100,000s of concurrent users | Unrivaled I/O throughput, zero downtime (99.999% reliability) | $250,000 – $5,000,000+ | Core banking (SBI, HDFC), airline reservation (Amadeus), insurance claims |\n| **Supercomputer** | 10,000s to millions of parallel vector/GPU cores | Scientific teams running single batch jobs | Unrivaled floating-point arithmetic (PetaFLOPS/ExaFLOPS) | $50,000,000 – $500,000,000 | Climate modeling, nuclear weapons simulations, genomics |\n\n---\n\n## Architectural Paradigms: Parallel vs. Distributed Computing\n\n### Parallel Computing\n- Multiple processors are co-located within the **same physical chassis**.\n- Processors communicate over an ultra-high-speed internal bus or crossbar switch.\n- **Shared Memory Model**: All processing units access a single global physical address space (SMP - Symmetric Multiprocessing).\n- Primary goal: Accelerating the execution of a single computation-heavy program.\n\n### Distributed Computing\n- Multiple autonomous computers (nodes) reside at **geographically dispersed locations**.\n- Nodes communicate across local or wide-area computer networks (Ethernet, TCP/IP, Fiber).\n- **Independent Memory**: Each node possesses its own private RAM and storage; communication occurs exclusively via message passing (RPC, HTTP, ZeroMQ).\n- Primary goal: Resource sharing, high fault tolerance, and scalable web services (e.g., Google Search, Cloud clusters, Blockchain).\n\n---\n\n## India's Supercomputing Milestone: The PARAM Series\n\nDeveloped by **C-DAC** (Centre for Development of Advanced Computing, Pune) under the leadership of Dr. Vijay Bhatkar after international technology denial in the late 1980s:\n1. **PARAM 8000 (1991)**: India's first indigenously designed supercomputer built using Transputer parallel chips (benchmarked at 1 GFLOPS).\n2. **PARAM 10000 (1998)**: Reached 100 GFLOPS using open-architecture clusters.\n3. **PARAM Siddhi-AI (Recent)**: National Supercomputing Mission (NSM) cluster delivering 210 PetaFLOPS peak AI compute capacity.\n\n---\n\n## Important Exam Points\n\n> [!NOTE]\n> Distinguish between **Mainframes** and **Supercomputers**: Mainframes are engineered for **maximum Input/Output throughput and concurrent transaction processing** (handling millions of small ATM requests simultaneously). Supercomputers are engineered for **maximum raw floating-point calculation speed** on a single large mathematical model.",
    "sortOrder": 4
  },
  {
    "id": "bca-101n-u1-art-05",
    "topicTitle": "Basic Components: Control Unit, ALU, Memory Unit & I/O Interfaces",
    "title": "Basic Components: Control Unit, ALU, Memory Unit & I/O Interfaces",
    "body": "# Basic Components: Control Unit, ALU, Memory Unit & I/O Interfaces\n\nA digital computer system functions through the coordinated interaction of four foundational hardware subsystems interconnected by the **System Bus**:\n\n```\n+----------------------------------------------------------------+\n|                   CENTRAL PROCESSING UNIT                      |\n|                                                                |\n|  +--------------------+               +--------------------+   |\n|  |    Control Unit    |               |  Arithmetic Logic  |   |\n|  |     (The Brain)    |               |     Unit (ALU)     |   |\n|  +---------|----------+               +---------|----------+   |\n|            | Timing & Control Signals           | Operands     |\n|  +---------|------------------------------------|----------+   |\n|  |                   CPU REGISTERS                         |   |\n|  |   [PC]   [MAR]   [MBR]   [IR]   [ACC]   [FLAGS]         |   |\n|  +-------------------------|-------------------------------+   |\n+----------------------------|-----------------------------------+\n                             | Internal Bus\n=============================v====================================\n                        THE SYSTEM BUS\n   ------------------------------------------------------------\n   [1] ADDRESS BUS (Unidirectional from CPU to System)\n   ------------------------------------------------------------\n   [2] DATA BUS (Bidirectional between CPU, Memory & I/O)\n   ------------------------------------------------------------\n   [3] CONTROL BUS (Bidirectional Control & Strobe Lines)\n=============================^====================================\n                             |\n         +-------------------+-------------------+\n         |                                       |\n+--------v-----------+                 +---------v----------+\n|    MAIN MEMORY     |                 |   I/O INTERFACES   |\n|                    |                 |                    |\n|   RAM (SRAM/DRAM)  |                 | [Video Card / GPU] |\n|   ROM (BIOS/UEFI)  |                 | [Storage Host HBA] |\n|                    |                 | [NIC Ethernet Port]|\n+--------------------+                 +--------------------+\n```\n\n---\n\n## 1. The Control Unit (CU)\nThe Control Unit acts as the central conductor. It does not execute mathematical calculations; instead, it extracts instructions from main memory, decodes their binary patterns, and issues synchronized micro-operations across the datapath.\n\n### Hardwired vs. Microprogrammed Control Units\n\n| Feature | Hardwired Control Unit | Microprogrammed Control Unit |\n| :--- | :--- | :--- |\n| **Implementation** | Fixed combinational logic gates, decoders, and flip-flops | Micro-instructions stored in dedicated Control ROM |\n| **Execution Speed** | Extremely fast (Gate-level propagation) | Slower (Requires microcode memory lookup) |\n| **Flexibility** | Rigid; modifying instructions requires PCB re-design | Highly flexible; instruction sets updated via microcode |\n| **Design Complexity** | High for complex CISC architectures | Structured and easier to debug |\n| **Common Use** | RISC processors (ARM, MIPS) | CISC processors (Intel x86) |\n\n---\n\n## 2. The Arithmetic Logic Unit (ALU)\nThe ALU executes all arithmetic transformations and binary evaluations:\n- **Arithmetic Engine**: High-speed parallel adders (Carry-Lookahead Adders), subtractors, two's complement inverters, multipliers, and dividers.\n- **Logic Engine**: Bitwise boolean operations (`AND`, `OR`, `XOR`, `NOT`).\n- **Bit-Shifting Unit**: Logical shifts, arithmetic shifts, and circular rotations.\n- **Status Flags Register**:\n  - `Z` (Zero Flag): Set when an operation produces zero.\n  - `S` (Sign Flag): Set when the result is negative (MSB = 1).\n  - `C` (Carry Flag): Set when an arithmetic overflow occurs out of the highest bit.\n  - `V` (Overflow Flag): Set during signed two's complement overflow.\n\n---\n\n## 3. The System Bus Architecture\n\nA bus is a shared collection of parallel conducting electrical tracks across which binary signals travel:\n\n### 1. Address Bus (Unidirectional)\nCarries the physical memory address or I/O port address that the CPU intends to access.\n- **Width Determines Capacity**: A bus with $N$ address lines can uniquely address $2^N$ memory bytes.\n- *Example*: A 32-bit address bus addresses $2^{32} = 4,294,967,296\text{ bytes} = 4\text{ GB}$. A 64-bit address bus can theoretically address 16 Exabytes.\n\n### 2. Data Bus (Bidirectional)\nTransmits actual data words and instruction opcodes between the CPU, RAM, and I/O devices.\n- **Width Determines Word Size**: A 64-bit data bus moves 8 bytes in a single memory clock cycle.\n\n### 3. Control Bus (Bidirectional)\nCarries control signals and timing pulses generated by the CU:\n- `MEMR` (Memory Read) / `MEMW` (Memory Write)\n- `IOR` (I/O Read) / `IOW` (I/O Write)\n- `READY` (Memory wait state synchronization)\n- `INTR` (Hardware Interrupt Request) / `INTA` (Interrupt Acknowledge)\n\n---\n\n## 4. Input / Output (I/O) Interfaces\n\nPeripherals cannot connect directly to the high-speed CPU bus due to voltage differences, mismatched data transfer speeds, and differing data encoding formats. An **I/O Interface Module** bridges this gap:\n- **Isolated (Port-Mapped) I/O**: The CPU maintains distinct address spaces and specific machine instructions (`IN`, `OUT` in x86) for peripherals separate from RAM.\n- **Memory-Mapped I/O**: Peripherals are assigned reserved addresses within the unified memory address map; standard memory instructions (`MOV`, `LOAD`, `STORE`) interact directly with device registers.",
    "sortOrder": 5
  },
  {
    "id": "bca-101n-u1-art-06",
    "topicTitle": "The Instruction Execution Cycle (Machine Cycle)",
    "title": "The Instruction Execution Cycle (Machine Cycle)",
    "body": "# The Instruction Execution Cycle (Machine Cycle)\n\nThe primary function of the Central Processing Unit is to continuously execute machine instructions stored in main memory. This continuous loop is known as the **Instruction Execution Cycle** or **Fetch-Decode-Execute Cycle**.\n\n---\n\n## The Four Essential Phases\n\n```\n   +--------------------------------------------------------+\n   |                                                        |\n   v                                                        |\n+-------------+      +--------------+      +-------------+  |\n| 1. FETCH    | ---> |  2. DECODE   | ---> | 3. EXECUTE  | -+\n| PC -> MAR   |      | IR -> Opcode |      | ALU Computes|  |\n| RAM -> MBR  |      | Control Unit |      | Flags Set   |  |\n| MBR -> IR   |      | Logic Signals|      +-------------+  |\n| PC = PC + 1 |      +--------------+             |         |\n+-------------+                                   v         |\n                                           +-------------+  |\n                                           |  4. STORE   | -+\n                                           | ACC -> RAM  |\n                                           | or Register |\n                                           +-------------+\n```\n\n---\n\n## Step-by-Step Register Transfer Language (RTL) Walkthrough\n\n### Phase 1: Instruction Fetch (IF)\nRetrieve the next binary instruction from memory into the CPU:\n1. **MAR $\\leftarrow$ PC**: The address held in the Program Counter is placed onto the address bus via the Memory Address Register.\n2. **MBR $\\leftarrow$ Memory[MAR]**: The memory subsystem responds by asserting the binary instruction onto the data bus into the Memory Buffer Register.\n3. **PC $\\leftarrow$ PC + 1**: The Program Counter is incremented by the instruction word length, pointing immediately to the subsequent instruction.\n4. **IR $\\leftarrow$ MBR**: The fetched instruction is latched into the Instruction Register.\n\n### Phase 2: Instruction Decode (ID)\nThe Control Unit analyzes the instruction word in the IR:\n- **Opcode Field**: The binary operation code is routed to a binary decoder (e.g., an 8-to-256 line decoder) to determine the exact operation: `ADD`, `SUB`, `JMP`, `MOV`.\n- **Addressing Mode & Operands**: Determines whether data resides in a register, an immediate value, or a memory location requiring effective address calculation.\n\n### Phase 3: Execute (EX)\nThe decoded control lines activate the required hardware components:\n- If arithmetic: ALU inputs are loaded from registers/memory, the computation executes, and status flags (`Zero`, `Carry`, `Sign`) update.\n- If control transfer (`JMP`/`BRANCH`): If condition evaluates true, the target address is written directly into the Program Counter: $\text{PC} \\leftarrow \text{Target Address}$.\n\n### Phase 4: Store / Writeback (WB)\nThe result produced by the ALU is saved into its permanent destination:\n- Internal register (e.g., Accumulator `ACC`, general-purpose `EBX`).\n- Or written back across the system bus into main memory.\n\n---\n\n## Clock Cycles, Machine Cycles, and Instruction Time\n\n```\n|<----------------------- ONE INSTRUCTION CYCLE ----------------------->|\n|                                                                       |\n+--------------------------+--------------------------+-----------------+\n|       FETCH CYCLE        |       EXECUTE CYCLE      |   WRITEBACK     |\n+----+----+----+----+----+----+----+----+----+----+----+----+----+----+\n| T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 |T10|T11|T12|T13|T14|\n+----+----+----+----+----+----+----+----+----+----+----+----+----+----+\n|<-- Clock Period (1/GHz) ->|\n```\n\n- **Clock Cycle ($T$-state)**: The smallest unit of time in a processor, governed by the internal quartz crystal oscillator ($T = 1 / f$). For a 4 GHz CPU, 1 $T$-state $= 0.25\text{ nanoseconds}$.\n- **Machine Cycle**: The time required by the CPU to complete a discrete bus transaction (Memory Read, Memory Write, I/O Read, or I/O Write). Typically spans 3 to 6 $T$-states.\n- **Instruction Cycle**: The total duration required to fetch, decode, execute, and store an entire instruction. Spans multiple machine cycles.\n\n---\n\n## High-Weightage Exam Tips\n\n> [!IMPORTANT]\n> When answering a 5-mark or 15-mark university question on the **Machine Cycle**:\n> 1. Draw the **circular 4-phase state diagram** (Fetch $\nightarrow$ Decode $\nightarrow$ Execute $\nightarrow$ Store).\n> 2. Write the exact **Register Transfer Language (RTL)** expressions: $\text{MAR} \\leftarrow \text{PC}$, $\text{MBR} \\leftarrow \text{Memory}$, $\text{PC} \\leftarrow \text{PC} + 1$, $\text{IR} \\leftarrow \text{MBR}$.",
    "sortOrder": 6
  },
  {
    "id": "bca-101n-u1-art-07",
    "topicTitle": "Memory Hierarchy: Registers, Cache, RAM & ROM",
    "title": "Memory Hierarchy: Registers, Cache, RAM & ROM",
    "body": "# Memory Hierarchy: Registers, Cache, RAM & ROM\n\nComputer memory design balances three competing engineering trade-offs: **Speed (Access Latency)**, **Cost per Bit**, and **Storage Capacity**. \n\nTo reconcile these constraints, computer architects construct a multi-tiered **Memory Hierarchy**.\n\n---\n\n## The Classical Memory Pyramid\n\n```\n                /\\\n               /  \\           Level 0: CPU REGISTERS\n              / L0 \\          (< 1 ns, Bytes to KB, Extremely Expensive)\n             /------\\\n            /   L1   \\        Level 1: L1 CACHE (On-die, ~1 ns, 32-64 KB)\n           /----------\\\n          /     L2     \\      Level 2: L2 CACHE (On-die, 3-5 ns, 512KB - 1MB)\n         /--------------\\\n        /       L3       \\    Level 3: L3 SHARED CACHE (10-20 ns, 16-64 MB)\n       /------------------\\\n      /      MAIN RAM      \\  Level 4: MAIN MEMORY (DRAM, 50-80 ns, 8-64 GB)\n     /----------------------\\\n    /   SECONDARY STORAGE    \\ Level 5: SSDs / NVMe / HDDs (Micro- to Milliseconds)\n   /--------------------------\\\n  /     TERTIARY / BACKUP      \\ Level 6: Magnetic Tape / Cloud Archive (Seconds)\n /------------------------------\\\n```\n\n---\n\n## Memory Tier Specifications\n\n| Hierarchy Level | Technology | Typical Capacity | Access Time | Relative Cost | Volatility |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **Internal Registers** | Flip-flops (CMOS) | 32 to 64 words | 0.2 – 0.5 ns | Astronomical | Volatile |\n| **Level 1 Cache** | Static RAM (6T SRAM) | 32 KB – 128 KB | 0.8 – 1.5 ns | Extremely High | Volatile |\n| **Level 2 Cache** | Static RAM (SRAM) | 512 KB – 2 MB | 3 – 5 ns | Very High | Volatile |\n| **Level 3 Cache** | Shared SRAM | 16 MB – 96 MB | 10 – 20 ns | High | Volatile |\n| **Main Memory (RAM)** | Dynamic RAM (DRAM) | 8 GB – 128 GB | 50 – 80 ns | Moderate | Volatile |\n| **Solid-State Drive** | NAND Flash Memory | 512 GB – 4 TB | 15 – 50 $\\mu$s | Low | Non-Volatile |\n| **Hard Disk Drive** | Magnetic Platters | 1 TB – 20 TB | 5 – 15 ms | Very Low | Non-Volatile |\n\n---\n\n## Random Access Memory (RAM): SRAM vs. DRAM\n\nRAM allows random, immediate access to any memory address with uniform latency regardless of its physical coordinate.\n\n```\n       STATIC RAM CELL (6-Transistor)          DYNAMIC RAM CELL (1T + 1C)\n             Vdd                                           Bit Line\n              |                                               |\n         [P1]   [P2]                                          |\n           \\     /                                      [Transfer Gate]\n            X---X  <-- Cross-coupled                       ---|--- Word Line\n           /     \\      Inverters                             |\n         [N1]   [N2]                                     +-----+\n          |       |                                      | === | Capacitor (Stores Charge)\n         GND     GND                                     +-----+\n                                                            |\n   (Holds state indefinitely while powered)                GND (Leads charge; requires refresh)\n```\n\n### In-Depth Comparison: SRAM vs. DRAM\n\n| Comparison Metric | Static RAM (SRAM) | Dynamic RAM (DRAM) |\n| :--- | :--- | :--- |\n| **Basic Storage Element** | 4 to 6 transistor bistable flip-flop latch | 1 transistor + 1 tiny capacitor cell |\n| **Need for Refreshing** | **No** (Retains charge as long as Vdd supplied) | **Yes** (Capacitor leaks charge; refreshed every 64 ms) |\n| **Access Latency** | Extremely fast (0.5 – 5 ns) | Slower (50 – 80 ns) |\n| **Physical Density** | Low (Large 6-transistor footprint per bit) | Very High (1 transistor allows billions of cells per die) |\n| **Power Consumption** | Low dynamic, higher static leakage | High during periodic capacitive refresh cycles |\n| **Manufacturing Cost** | Expensive per gigabyte | Economical per gigabyte |\n| **Primary Placement** | CPU L1, L2, L3 Cache memory | Main System RAM (DDR4, DDR5 modules) |\n\n---\n\n## Read-Only Memory (ROM) Variants\n\nROM is non-volatile memory that retains stored bootstrap instructions even when the system is completely powered down.\n\n1. **Mask ROM (MROM)**: Hardwired physically at the silicon fabrication plant during photolithography. Permanent and impossible to alter.\n2. **PROM (Programmable ROM)**: Shipped unprogrammed with internal microscopic fuses. A technician uses a specialized PROM Programmer to burn fuses permanently (\"one-time programmable\").\n3. **EPROM (Erasable Programmable ROM)**: Contains a transparent quartz crystal window above the silicon die. Exposing the chip to intense **Ultraviolet (UV) light** for 20–30 minutes discharges all floating gates, resetting the chip for reprogramming.\n4. **EEPROM (Electrically Erasable Programmable ROM)**: Can be erased and rewritten byte-by-byte using electrical voltage pulses in-circuit without removing the chip.\n5. **Flash Memory**: High-density variant of EEPROM that erases and writes data in multi-kilobyte blocks rather than single bytes. Forms the basis of modern BIOS/UEFI firmware chips, USB drives, and SSDs.\n\n---\n\n## The Principle of Locality of Reference\n\nCache memory functions effectively due to a predictable behavioral property of computer programs called **Locality of Reference**:\n- **Temporal Locality**: If a memory location was accessed once, it is highly likely to be accessed again in the near future (e.g., loop counters, accumulator variables).\n- **Spatial Locality**: If a memory location is accessed, nearby contiguous addresses are likely to be accessed soon (e.g., sequential array iterations, linear instruction fetch).",
    "sortOrder": 7
  },
  {
    "id": "bca-101n-u1-art-08",
    "topicTitle": "Secondary Storage Technologies",
    "title": "Secondary Storage Technologies",
    "body": "# Secondary Storage Technologies\n\nPrimary memory (RAM) is volatile and loses all stored data when electricity is disconnected. **Secondary Storage** provides high-capacity, permanent, non-volatile data persistence.\n\n---\n\n## Comparison of Secondary Storage Technologies\n\n| Feature | Magnetic HDD | Optical Disc (DVD / BD) | Solid-State Drive (SATA) | NVMe SSD (PCIe Gen 4/5) |\n| :--- | :--- | :--- | :--- | :--- |\n| **Storage Medium** | Magnetized Ferromagnetic Platters | Polycarbonate dye with Laser Pits/Lands | NAND Flash Semiconductor Cells | 3D TLC/QLC NAND Flash |\n| **Sequential Read** | 120 – 250 MB/s | 15 – 35 MB/s | 500 – 550 MB/s | 5,000 – 12,000 MB/s |\n| **Random Latency** | 5 – 15 milliseconds (ms) | 100 – 150 ms | 50 – 100 microseconds ($\\mu$s)| 10 – 20 microseconds ($\\mu$s) |\n| **Moving Parts** | Spindle motor, voice-coil actuator arm | High-speed optical spindle motor | Zero mechanical parts | Zero mechanical parts |\n| **Shock Resistance** | Vulnerable to physical drops/vibration | Fragile (scratches on surface) | High durability & shock resistance | Extremely high durability |\n| **Typical Capacity** | 2 TB – 22 TB | 4.7 GB (DVD) – 50 GB (Blu-Ray)| 500 GB – 4 TB | 1 TB – 8 TB |\n\n---\n\n## 1. Magnetic Storage (Hard Disk Drives - HDDs)\n\n```\n       +---------------------------------------------+\n       |           MAGNETIC PLATTER SURFACE          |\n       |                                             |\n       |         Track (Concentric Circle)           |\n       |       /                                     |\n       |     .---.   Sector (512B / 4KB Block)       |\n       |    /     \\  /                              |\n       |   |   O   | ===> Read/Write Head Assembly   |\n       |    \\     /                                  |\n       |     '---'                                   |\n       |       |                                     |\n       |    Spindle (5400 / 7200 RPM)                |\n       +---------------------------------------------+\n```\n\n### Components and Working\n1. **Platters**: Rigid aluminum or ceramic discs coated with a microscopic magnetic iron-oxide substrate, rotating at 5,400 to 15,000 RPM.\n2. **Read/Write Heads**: Aerodynamic sliders flying on a cushion of air nanometers above the spinning platter, detecting magnetic polarity orientations representing binary 0s and 1s.\n3. **Geometry**:\n   - **Track**: One of hundreds of concentric circular data paths on a platter surface.\n   - **Sector**: The smallest addressable physical segment of a track (standardized at 512 bytes or 4,096 bytes under Advanced Format).\n   - **Cylinder**: The set of matching tracks across all stacked platter surfaces.\n\n### Latency Calculations in HDDs\nThe total access time to read data from a magnetic HDD is:\n$$\text{Total Access Time} = \text{Seek Time} + \text{Rotational Latency} + \text{Transfer Time}$$\n- **Seek Time**: Mechanical delay while the actuator arm moves the head to the target track (typically 3–9 ms).\n- **Rotational Latency**: Time spent waiting for the platter to rotate the target sector beneath the head. Average latency is the time for half a revolution:\n  $$\text{Average Rotational Latency} = \frac{1}{2 \times (\text{RPM} / 60)}$$\n  *(For a 7,200 RPM drive: $\u0007pprox 4.16\text{ ms}$)*.\n\n---\n\n## 2. Solid-State Storage (SSDs & Flash)\n\nSolid-state drives eliminate all mechanical latency by using semiconductor **Floating-Gate Transistors** or **Charge-Trap Flash (CTF)** organized into 3D vertical stacks:\n\n```\n+-------------------------------------------------------+\n|                    NVMe SOLID STATE DRIVE             |\n|                                                       |\n|  +---------------------+     +---------------------+  |\n|  |   FLASH CONTROLLER  |     |   DRAM CACHE BUFFER |  |\n|  | - Wear-leveling     |     | - Fast translation  |  |\n|  | - Garbage collection|     |   table (FTL lookup)|  |\n|  | - ECC correction    |     +---------------------+  |\n|  +----------|----------+                              |\n|             | Multi-channel flash bus                 |\n|  +----------v--------------------------------------+  |\n|  |   3D NAND FLASH DIES (Non-volatile cells)       |  |\n|  |   [Page: 4-16 KB]  -->  [Block: 128-512 Pages]  |  |\n|  +-------------------------------------------------+  |\n+-------------------------------------------------------+\n```\n\n### Fundamental Operational Rule of Flash Memory\n- **Reads and Writes** occur at the **Page Level** (typically 4 KB to 16 KB).\n- **Erasures** can ONLY occur at the **Block Level** (typically 128 to 512 Pages, $\u0007pprox 2\text{ to }8\text{ MB}$).\n- To overwrite existing data, an SSD controller must read the entire block, modify the target page in DRAM, erase the old flash block, and write the new block back. This overhead is managed by the **Flash Translation Layer (FTL)** via **Trim commands** and **Wear Leveling**.\n\n---\n\n## Summary for University Exams\n\n- **Magnetic Disks**: Mechanical latency dominated by Seek Time and Rotational Delay; cost-effective for large cold storage.\n- **SSDs**: Solid-state flash memory with no moving parts; 20x to 100x faster random I/O performance.\n- **Optical Media**: Uses focused laser reflection differences between surface **Pits** and **Lands** (Infrared for CD, Red laser for DVD, Blue-Violet 405nm laser for Blu-Ray).",
    "sortOrder": 8
  },
  {
    "id": "bca-101n-u1-art-09",
    "topicTitle": "Types of Software",
    "title": "Types of Software",
    "body": "# Types of Software\n\n**Software** is an organized collection of computer instructions, data definitions, and documentation that guides hardware execution. Hardware provides computational power; software provides structured logic.\n\n---\n\n## Software Taxonomy Hierarchy\n\n```\n                               COMPUTER SOFTWARE\n                                       |\n        +------------------------------+------------------------------+\n        |                                                             |\n SYSTEM SOFTWARE                                             APPLICATION SOFTWARE\n        |                                                             |\n +------+------+-------+                               +--------------+-------------+\n |             |       |                               |                            |\nOPERATING   SYSTEM   DEVICE                        GENERAL-PURPOSE              BESPOKE / CUSTOM\nSYSTEMS    UTILITIES DRIVERS                       PACKAGES                     SOLUTIONS\n- Windows   - Backup  - Print Driver               - Word Processors (MS Word)   - Banking Core (Finacle)\n- Linux     - Antivirus- GPU Drivers               - Spreadsheets (Excel)        - University ERP\n- macOS     - Disk Defrag- Audio DAC               - Browsers (Chrome, Firefox)  - Airline Ticketing\n```\n\n---\n\n## Detailed Classification Comparison\n\n| Software Category | Primary Objective | Operating Privilege Level | Hardware Dependency | User Interaction | Representative Examples |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **System Software** | Manages hardware resources and provides execution platform | Kernel Mode (Ring 0 / Supervisor) | High (Tightly coupled to CPU & motherboard architecture) | Indirect (Behind the scenes) | Linux Kernel, Windows 11, Apple macOS, BIOS/UEFI |\n| **Application Software**| Solves user-specific tasks and business operations | User Mode (Ring 3 / Unprivileged) | Low (Operates via standardized OS system call APIs) | Direct interactive interface | Microsoft Excel, Photoshop, VLC, AutoCAD |\n| **Utility Software** | Maintains, tunes, diagnoses, and protects computer resources | User or Elevated Administrator | Moderate (Interacts directly with file system and hardware) | Periodic administrative maintenance | Disk Defragmenter, 7-Zip, BitLocker, Malwarebytes |\n\n---\n\n## 1. System Software Breakdown\n\nSystem software operates as the fundamental intermediary layer between hardware registers and end-user programs:\n\n### 1. The Operating System (OS)\nThe master supervisory control program responsible for:\n- **Processor Management**: Scheduling process threads across multi-core CPU queues.\n- **Memory Management**: Allocating physical RAM and managing virtual memory page tables.\n- **Storage & File Systems**: Tracking directory trees, allocation tables (NTFS, ext4), and access control lists.\n- **Device Management**: Buffering, spooling, and dispatching I/O commands to device controllers.\n\n### 2. Device Drivers\nSpecialized translation modules that expose a standardized API to the OS kernel while communicating with hardware using proprietary electrical protocols and register maps.\n\n---\n\n## 2. Utility Software: The System Health Fleet\n\nUtilities keep system performance optimal and safeguard data integrity:\n1. **Disk Cleanup & Defragmentation**: Reorganizes non-contiguous file fragments on magnetic platters into contiguous sectors to minimize mechanical seek latency.\n2. **Antivirus & Malware Scanners**: Scans file headers and memory regions against cryptographic signatures and behavioral heuristics to quarantine malicious payloads.\n3. **Backup & Disaster Recovery Software**: Creates incremental snapshots of disk partitions to remote cloud or off-site media.\n4. **Compression Utilities**: Employs Lempel-Ziv-Welch (LZW) or Huffman encoding algorithms to reduce file sizes (e.g., ZIP, RAR, GZ).\n\n---\n\n## 3. Application Software: General Purpose vs. Tailored\n\n- **General Purpose Application Packages (Commercial Off-The-Shelf - COTS)**: Engineered for mass-market deployment across diverse industries with common business requirements (e.g., Microsoft Office 365, Adobe Creative Cloud).\n- **Custom / Bespoke Software**: Custom-engineered to support the unique workflow and regulatory rules of a specific organization (e.g., Indian Railways IRCTC ticketing engine, banking core systems).",
    "sortOrder": 9
  },
  {
    "id": "bca-101n-u1-art-10",
    "topicTitle": "Software Licensing Models",
    "title": "Software Licensing Models",
    "body": "# Software Licensing Models\n\nSoftware is intellectual property protected by international copyright laws. When an individual or corporation purchases software, they purchase a **license granting defined usage rights**, rather than outright ownership of the underlying source code.\n\n---\n\n## The Software Legal Spectrum\n\n```\n[  OPEN SOURCE & FREE SOFTWARE  ] <=======================> [ PROPRIETARY CLOSED SOURCE ]\n- Complete Source Code Access                                 - Binary Machine Code Only\n- Modification & Redistribution                              - Restricted Usage Rights\n- Public Collaborative Auditing                               - Trade Secrets Protected\n(GPL, MIT, Apache, BSD)                                      (Commercial EULAs)\n```\n\n---\n\n## In-Depth Comparison Matrix of Licensing Models\n\n| License Model | Monetary Cost | Source Code Access | Modification Permitted | Redistribution Permitted | Functional Limitations | Representative Examples |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **FOSS / Free Software** | Zero (Gratis) or Paid | **Full Source Code** | **Yes** (Unrestricted) | **Yes** (Under license terms) | None | Linux Kernel, GNU Utilities, Apache HTTP Server |\n| **Freeware** | Zero ($0.00) | **No** (Closed binary) | **No** | **Yes** (Without charging) | Full software functionality | Adobe Acrobat Reader, VLC Player, Google Chrome |\n| **Shareware** | Free evaluation; paid afterward | **No** (Closed binary) | **No** | Permitted during trial | Time-limited (e.g., 30-day trial) | WinRAR, early IDM, Total Commander |\n| **Demoware / Crippleware**| Zero for demo | **No** (Closed binary) | **No** | Permitted for demo | Core features locked (e.g., \"Save\" disabled, watermark) | Video editors exporting with watermarks, game demos |\n| **Proprietary / Commercial**| Paid per seat / license | **No** (Strict Trade Secret) | **No** (Violation of EULA) | **No** (Illegal piracy) | Enforced via license activation keys / DRM | Microsoft Windows, MS Office, Oracle Database |\n| **Firmware** | Bundled with hardware | Usually closed (Unless open core)| **No** | Not applicable | Hard-coded to specific hardware revision | Motherboard UEFI/BIOS, Router microcode |\n\n---\n\n## The Philosophy of Free Software (FOSS)\n\nChampioned by **Richard Stallman** in 1983 via the GNU Project and Free Software Foundation (FSF), Free Software centers on **liberty, not price** (*\"Free as in free speech, not as in free beer\"*).\n\n### The Four Essential Freedoms\n- **Freedom 0**: The freedom to run the program for any purpose without restriction.\n- **Freedom 1**: The freedom to study how the program works and adapt it to your computing needs (requires source code access).\n- **Freedom 2**: The freedom to redistribute exact copies to help your neighbor.\n- **Freedom 3**: The freedom to improve the program and release your improvements to the public.\n\n### Copyleft vs. Permissive Licenses\n- **Copyleft (e.g., GNU GPL v3)**: Requires that any modified or derivative software must also be distributed under the exact same open terms (\"hereditary freedom\").\n- **Permissive (e.g., MIT, BSD, Apache 2.0)**: Allows developers to take the source code, modify it, and even incorporate it into closed-source commercial software without releasing changes.\n\n---\n\n## Firmware: The Hardware-Software Nexus\n\n> [!NOTE]\n> **Firmware** is a specialized category of software permanently written into non-volatile memory (ROM, EEPROM, or Flash) on a hardware device. It executes initial hardware power-on diagnostics (POST) and acts as the basic operational interface for higher-level operating systems.",
    "sortOrder": 10
  },
  {
    "id": "bca-101n-u1-art-11",
    "topicTitle": "Computer Languages: Machine, Assembly & High-Level",
    "title": "Computer Languages: Machine, Assembly & High-Level",
    "body": "# Computer Languages: Machine, Assembly & High-Level\n\nA **programming language** is a formal notation system containing syntactic rules and semantic definitions designed to instruct a computer on data transformations and control flow.\n\n---\n\n## The Language Hierarchy Pyramid\n\n```\n                  HIGH-LEVEL LANGUAGES (HLL)\n           (Python, Java, C++, C#, JavaScript)\n      - Abstract from hardware; portable across CPU architectures\n      - Human-readable mathematical and English syntax\n                         |\n                         v  [Translated by Compilers / Interpreters]\n                 ASSEMBLY LANGUAGE\n           (Intel x86, ARM64, RISC-V Assembly)\n      - Mnemonic representation of machine instructions (MOV, ADD, JMP)\n      - Direct 1-to-1 mapping with underlying machine opcodes\n                         |\n                         v  [Translated by Assembler]\n                 MACHINE LANGUAGE\n                (Pure Binary 0s & 1s)\n      - Directly executed by CPU decoding circuits without translation\n      - Completely hardware-dependent; specific to one processor family\n```\n\n---\n\n## Detailed Language Tier Comparison\n\n| Feature | Machine Language (1GL) | Assembly Language (2GL) | High-Level Language (3GL / 4GL) |\n| :--- | :--- | :--- | :--- |\n| **Form of Representation** | Streams of binary digits (`01001000 10001001`) | English-like mnemonics (`MOV EAX, EBX`) | Structured mathematical English (`total = price * 1.18;`) |\n| **Need for Translator** | **None** (Directly executed by hardware) | **Assembler** | **Compiler** or **Interpreter** |\n| **Hardware Portability** | Completely machine-dependent | Strictly architecture-specific | Highly portable across different CPUs |\n| **Execution Speed** | Maximum hardware speed (Zero translation) | Near-maximum hardware speed | Very high (compiled) to moderate (interpreted) |\n| **Programmer Productivity**| Extremely poor; error-prone | Low; requires tracking registers & memory stacks | High; rapid application development |\n| **Memory Management** | Direct physical address manipulation | Direct hardware address & register allocation | Automatic / Abstracted (Stack, Heap, Garbage Collection) |\n\n---\n\n## Side-by-Side Code Comparison: Adding Two Numbers\n\n### 1. Machine Language (x86 Binary representation in Hexadecimal)\n```text\nB8 05 00 00 00    // MOV EAX, 5\n05 0A 00 00 00    // ADD EAX, 10\nA3 20 40 00 00    // MOV [0x4020], EAX\n```\n*Problem*: Opcodes like `B8` or `05` are cryptic, tedious to write, and prone to bit transposition errors.\n\n### 2. Assembly Language\n```assembly\nsection .data\n    result dd 0\n\nsection .text\n    global _start\n_start:\n    MOV EAX, 5          ; Load immediate integer 5 into register EAX\n    ADD EAX, 10         ; Add immediate integer 10 to EAX\n    MOV [result], EAX   ; Store result from register to memory variable\n```\n*Advantage*: Mnemonics (`MOV`, `ADD`) and variable names (`result`) replace raw binary codes.\n\n### 3. High-Level Language (C / Python)\n```c\n#include <stdio.h>\n\nint main() {\n    int a = 5, b = 10;\n    int result = a + b;\n    printf(\"Result: %d\n\", result);\n    return 0;\n}\n```\n*Advantage*: Self-documenting, readable, and compiles seamlessly on x86, ARM64, or RISC-V without modifying code.\n\n---\n\n## Characteristics of a Good Programming Language\n\nWhen computer scientists design new languages, they evaluate these core attributes:\n1. **Clarity & Readability**: Clean, unambiguous syntax that simplifies maintenance.\n2. **Orthogonality**: Language features can be combined freely without unexpected side-effects.\n3. **Portability**: Source code compiles or runs uniformly across diverse host architectures.\n4. **Strong Typing & Safety**: Catches data mismatches and memory leaks at compile-time rather than crashing in production.\n5. **Efficiency**: Generates compact machine code with low runtime overhead.",
    "sortOrder": 11
  },
  {
    "id": "bca-101n-u1-art-12",
    "topicTitle": "Language Translators: Assemblers, Compilers, Interpreters, Linkers & Loaders",
    "title": "Language Translators: Assemblers, Compilers, Interpreters, Linkers & Loaders",
    "body": "# Language Translators: Assemblers, Compilers, Interpreters, Linkers & Loaders\n\nSilicon hardware can only decode binary pulses (0s and 1s). **Language Translators** are system software programs that convert human-readable source code into native machine code.\n\n---\n\n## The Complete Build Pipeline (Source to Execution)\n\n```\n+---------------------------+\n|    SOURCE CODE (.c / .cpp)|\n+-------------|-------------+\n              |\n              v  [COMPILER PRE-PROCESSOR]\n+---------------------------+\n|    TRANSLATED SOURCE      |\n+-------------|-------------+\n              |\n              v  [COMPILER]\n+---------------------------+\n|    ASSEMBLY CODE (.s)     |\n+-------------|-------------+\n              |\n              v  [ASSEMBLER]\n+---------------------------+      +---------------------------+\n|    OBJECT MODULE (.obj/.o)| ---> |   PRE-COMPILED LIBRARIES  |\n+-------------|-------------+      |   (printf, math.h, libc)  |\n              |                    +-------------|-------------+\n              +------------------+---------------+\n                                 |\n                                 v  [LINKER]\n                    +---------------------------+\n                    |    EXECUTABLE FILE (.exe) |\n                    +-------------|-------------+\n                                  |\n                                  v  [LOADER]\n                    +---------------------------+\n                    |     ACTIVE RAM MEMORY     |\n                    |   (Allocates Stack, Heap) |\n                    +---------------------------+\n```\n\n---\n\n## Compilers vs. Interpreters: The Fundamental Comparison\n\n| Comparison Parameter | Compiler | Interpreter |\n| :--- | :--- | :--- |\n| **Input Translation** | Scans and translates entire source code in **one batch pass** | Reads, parses, and translates source code **line-by-line** |\n| **Intermediate Object File**| Generates a permanent standalone binary object file (`.obj` / `.exe`)| **No intermediate object file** created |\n| **Execution Speed** | Fast runtime execution (Already native machine code) | Slower execution (Every line translated repeatedly during loops)|\n| **Error Reporting** | Compiles full syntax error list after scanning the whole file | Stops execution immediately upon encountering the first error |\n| **Memory Requirement** | Low runtime memory overhead | Higher runtime memory (Interpreter must stay in RAM) |\n| **Typical Languages** | C, C++, Rust, Go, Fortran | Python, JavaScript, PHP, Ruby, early BASIC |\n\n> [!NOTE]\n> **Hybrid Implementations (Java & C#)**: Java combines both paradigms. The `javac` compiler translates `.java` source code into platform-independent intermediate **Bytecode** (`.class`). At runtime, the **Java Virtual Machine (JVM)** uses an interpreter combined with a **Just-In-Time (JIT) Compiler** to translate bytecode into native machine instructions on the fly.\n\n---\n\n## Specialized Translation Software\n\n### 1. The Assembler\nTranslates low-level symbolic Assembly mnemonics into machine code. Operates in two passes:\n- **Pass 1**: Constructs a **Symbol Table** recording all label definitions and memory offsets.\n- **Pass 2**: Emits binary opcodes and resolves all forward symbol references using the table.\n\n### 2. The Linker\nStandalone source files rarely contain all required functionality. A program that calls `printf()` relies on standard library routines.\n- Combines multiple independently compiled object files into a single coherent binary.\n- Resolves external references and assigns relative address offsets.\n- **Static Linking**: Embeds library routines directly into the final `.exe` (larger file size, self-contained).\n- **Dynamic Linking**: Leaves unresolved pointers to external Dynamic Link Libraries (`.dll` in Windows, `.so` in Linux) resolved at runtime.\n\n### 3. The Loader\nA core operating system component that prepares an executable on disk for live CPU execution:\n1. Allocates a fresh virtual address space in RAM.\n2. Copies text segments (code) and data segments from the `.exe` into memory.\n3. Initializes CPU registers, sets up the execution Stack and Heap.\n4. Jumps to the program entry point (`main()` or `_start`).",
    "sortOrder": 12
  },
  {
    "id": "bca-101n-u1-art-13",
    "topicTitle": "Problem-Solving Tools: Algorithms, Flowcharts & Pseudo-code",
    "title": "Problem-Solving Tools: Algorithms, Flowcharts & Pseudo-code",
    "body": "# Problem-Solving Tools: Algorithms, Flowcharts & Pseudo-code\n\nBefore writing code in a programming language, software engineers formalize the computational logic using three standard problem-solving tools: **Algorithms**, **Flowcharts**, and **Pseudo-code**.\n\n---\n\n## 1. What is an Algorithm?\n\nAn **Algorithm** is an unambiguous, finite sequence of step-by-step instructions designed to solve a specific computational problem or accomplish a defined task.\n\n### Five Mandatory Properties of a Valid Algorithm\n1. **Finiteness**: An algorithm must terminate after a finite number of steps for all valid inputs; it must never run indefinitely.\n2. **Definiteness**: Each instruction must be clear, precise, and completely unambiguous (no vague terms like \"add some numbers\").\n3. **Input**: Must accept zero or more well-defined inputs from an external source.\n4. **Output**: Must produce one or more distinct outputs corresponding to the input.\n5. **Effectiveness**: Every instruction must be sufficiently basic to be executed mechanically with pencil and paper in finite time.\n\n---\n\n## 2. Standard Flowchart Geometric Symbols\n\nA **Flowchart** is a standardized graphical diagram illustrating the sequential control flow and decision logic of an algorithm:\n\n```\n+--------------------+-----------------------------------------------------+\n|      SYMBOL        |                 FUNCTION & USAGE                    |\n+--------------------+-----------------------------------------------------+\n|      (      )      |  TERMINAL (Oval / Rounded Rectangle):               |\n|      ( START )     |  Marks the entry or exit boundary of the program    |\n|      (  STOP )     |  (e.g., START, STOP, RETURN).                       |\n+--------------------+-----------------------------------------------------+\n|   /              / |  INPUT / OUTPUT (Parallelogram):                    |\n|  /  READ A, B   /  |  Denotes data read from input or written to output  |\n| /              /   |  (e.g., INPUT X, PRINT \"Result\").                   |\n+--------------------+-----------------------------------------------------+\n| +----------------+ |  PROCESS (Rectangle):                               |\n| | Sum = A + B    | |  Denotes data calculation, assignment, or internal  |\n| +----------------+ |  memory manipulation.                               |\n+--------------------+-----------------------------------------------------+\n|        /\\         |  DECISION (Diamond / Rhombus):                      |\n|       /  \\        |  Evaluates a boolean condition and branches into    |\n|      < A>B >       |  two alternate paths based on True / False          |\n|       \\  /        |  (or Yes / No).                                     |\n|        \\/         |                                                     |\n+--------------------+-----------------------------------------------------+\n|        (O)         |  CONNECTOR (Small Circle):                          |\n|                    |  Connects intersecting control flow lines on the   |\n|                    |  same page without crossing lines.                  |\n+--------------------+-----------------------------------------------------+\n|    --------->      |  FLOWLINE (Arrowed Line):                           |\n|                    |  Indicates the exact direction of control flow.    |\n+--------------------+-----------------------------------------------------+\n```\n\n---\n\n## 3. Concrete Example: Finding the Maximum of Three Numbers\n\n### Step 1: Formal Algorithm Formulation\n```text\nStep 1: Start\nStep 2: Read three numerical values into variables A, B, and C\nStep 3: If A >= B and A >= C, then\n            Set Max = A\n        Else If B >= A and B >= C, then\n            Set Max = B\n        Else\n            Set Max = C\nStep 4: Display Max as the largest number\nStep 5: Stop\n```\n\n### Step 2: Structured Pseudo-code\n```text\nBEGIN FindLargest\n    DECLARE Integer A, B, C, Max\n    PROMPT \"Enter three integers: \"\n    INPUT A, B, C\n\n    IF (A >= B AND A >= C) THEN\n        Max = A\n    ELSE IF (B >= C) THEN\n        Max = B\n    ELSE\n        Max = C\n    END IF\n\n    PRINT \"The largest value is: \", Max\nEND\n```\n\n### Step 3: Textual Representation of Flowchart Logic\n```\n          [ START ]\n              |\n              v\n       [/ READ A, B, C /]\n              |\n              v\n          < A >= B? >\n         /           \\\n    YES /             \\ NO\n       v               v\n  < A >= C? >      < B >= C? >\n   /       \\        /       \\\nYES/      NO\\   YES/       NO\\\n  v         v     v          v\n[Max=A]  [Max=C] [Max=B]  [Max=C]\n  |         |     |          |\n  +---------+--+--+----------+\n               |\n               v\n       [/ PRINT Max /]\n               |\n               v\n           [ STOP ]\n```\n\n---\n\n## Benefits of Pseudo-code vs. Flowcharts\n\n| Aspect | Flowcharts | Pseudo-code |\n| :--- | :--- | :--- |\n| **Format** | Visual, geometric diagram | Structured, semi-formal text |\n| **Ease of Creation**| Time-consuming to draw and re-draw | Fast to type, edit, and maintain |\n| **Complexity Limit**| Cluttered and unwieldy for large systems | Scales cleanly to complex industrial logic |\n| **Code Proximity** | Far from actual language syntax | Very close to structured programming syntax |\n| **Best Used For** | High-level system overview & teaching | Detailed algorithm design before coding |",
    "sortOrder": 13
  }
];

// BCA-101N Unit 1 Calibrated Question Bank (50 MCQs: 25 Easy, 15 Medium, 10 Hard)
export const BCA_101N_UNIT_1_MCQS: CuratedMcq[] = [
  {
    "prompt": "Which component in the Von Neumann architecture coordinates and sequences operations across all components?",
    "explanation": "The Control Unit (CU) decodes program instructions and generates control timing signals that synchronize CPU and system operations.",
    "difficulty": "easy",
    "topic_title": "Von Neumann Architecture & Stored Program Concept",
    "options": [
      {
        "text": "Arithmetic Logic Unit (ALU)",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Control Unit (CU)",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Memory Unit",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "I/O Interface",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Which computer generation introduced Integrated Circuits (ICs) replacing discrete transistors?",
    "explanation": "Third generation computers (1964-1971) incorporated ICs developed by Jack Kilby and Robert Noyce, drastically improving speed and shrinking machine size.",
    "difficulty": "easy",
    "topic_title": "Computer Generations (1st to 5th Generation) & Evolution",
    "options": [
      {
        "text": "First Generation",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Second Generation",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "Third Generation",
        "is_correct": true,
        "letter": "C"
      },
      {
        "text": "Fourth Generation",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "The key electronic component of First Generation computers was:",
    "explanation": "First-generation computers (1940-1956) like ENIAC and UNIVAC utilized vacuum tubes (thermionic valves) as primary switching and memory elements.",
    "difficulty": "easy",
    "topic_title": "Computer Generations (1st to 5th Generation) & Evolution",
    "options": [
      {
        "text": "Transistors",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Vacuum Tubes",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Integrated Circuits",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Microprocessors",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "VLSI (Very Large Scale Integration) and ULSI technologies were primarily introduced in which generation?",
    "explanation": "Fourth generation computers utilized VLSI (thousands of transistors on a chip) and later ULSI, leading to modern single-chip microprocessors.",
    "difficulty": "easy",
    "topic_title": "Computer Generations (1st to 5th Generation) & Evolution",
    "options": [
      {
        "text": "Third Generation",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Fourth Generation",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Second Generation",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "First Generation",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Which register holds the memory address of the next instruction to be fetched and executed?",
    "explanation": "The Program Counter (PC) automatically holds and increments the memory address of the next sequential machine instruction to execute.",
    "difficulty": "medium",
    "topic_title": "Memory Hierarchy: Registers, Cache, RAM (SRAM/DRAM), ROM (PROM/EPROM/EEPROM)",
    "options": [
      {
        "text": "Instruction Register (IR)",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Memory Data Register (MDR)",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "Program Counter (PC)",
        "is_correct": true,
        "letter": "C"
      },
      {
        "text": "Accumulator (ACC)",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "In the instruction execution cycle, the correct sequential order of phases is:",
    "explanation": "The instruction machine cycle strictly follows: Fetch from memory -> Decode opcode -> Execute ALU/Control operation -> Store result back to register/memory.",
    "difficulty": "easy",
    "topic_title": "Instruction Execution Cycle (Fetch, Decode, Execute, Store)",
    "options": [
      {
        "text": "Execute -> Fetch -> Decode -> Store",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Fetch -> Decode -> Execute -> Store",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Decode -> Fetch -> Execute -> Store",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Fetch -> Execute -> Decode -> Store",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "What architecture features physically separate memory and buses for program instructions and data storage?",
    "explanation": "Harvard architecture provides dedicated, separate address and data paths for instructions and data, allowing simultaneous memory access.",
    "difficulty": "hard",
    "topic_title": "Secondary Storage: Magnetic Disks, Optical Disks, Flash Storage & SSDs",
    "options": [
      {
        "text": "Von Neumann Architecture",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Harvard Architecture",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Turing Machine",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "SIMD Architecture",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "The 'Von Neumann Bottleneck' refers to throughput limitations caused by:",
    "explanation": "The Von Neumann bottleneck occurs because program memory and data memory share the same physical bus, constraining CPU execution to bus transfer rates.",
    "difficulty": "hard",
    "topic_title": "Von Neumann Architecture & Stored Program Concept",
    "options": [
      {
        "text": "Slow clock speeds in the ALU",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Sharing a single bus between CPU and memory for both data and code",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Inefficient cooling fans",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Lack of registers in the Control Unit",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Which classification of computers is designed specifically to process intensive mathematical calculations like weather modeling and nuclear simulations?",
    "explanation": "Supercomputers (e.g., PARAM Siddhi, Fugaku) are engineered with thousands of parallel processing units specifically for ultra-high compute workloads.",
    "difficulty": "easy",
    "topic_title": "Classification of Computers (Micro, Mini, Mainframe, Supercomputer, Distributed & Parallel)",
    "options": [
      {
        "text": "Microcomputer",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Minicomputer",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "Mainframe Computer",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Supercomputer",
        "is_correct": true,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Computers that handle large-scale enterprise transaction processing and serve thousands of simultaneous online users are known as:",
    "explanation": "Mainframe computers (e.g., IBM zSeries) excel in massive I/O throughput, continuous uptime, and enterprise batch and transaction processing.",
    "difficulty": "easy",
    "topic_title": "Classification of Computers (Micro, Mini, Mainframe, Supercomputer, Distributed & Parallel)",
    "options": [
      {
        "text": "Workstations",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Mainframe Computers",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Personal Computers",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Embedded Computers",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Which type of computer memory is fastest and placed closest to the CPU execution core?",
    "explanation": "Internal CPU registers operate directly at the processor's core clock speed (picoseconds access time), making them the fastest storage element in the hierarchy.",
    "difficulty": "easy",
    "topic_title": "Memory Hierarchy: Registers, Cache, RAM (SRAM/DRAM), ROM (PROM/EPROM/EEPROM)",
    "options": [
      {
        "text": "L1 Cache",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "CPU Registers",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "DRAM Main Memory",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Solid State Drive",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "SRAM (Static RAM) differs fundamentally from DRAM (Dynamic RAM) because SRAM:",
    "explanation": "SRAM uses 4 to 6 transistors configured as a bistable latch (flip-flop) to store bits without capacitor refresh cycles, making it significantly faster and ideal for CPU caches.",
    "difficulty": "medium",
    "topic_title": "Memory Hierarchy: Registers, Cache, RAM (SRAM/DRAM), ROM (PROM/EPROM/EEPROM)",
    "options": [
      {
        "text": "Requires periodic electrical refreshing",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Is made of flip-flops and does not require periodic capacitor refreshing",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Is cheaper per megabyte than DRAM",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Is non-volatile like ROM",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Why does DRAM require continuous memory refresh cycles?",
    "explanation": "Each DRAM memory cell consists of a single transistor and capacitor; the capacitor leaks electrical charge and must be rewritten thousands of times per second.",
    "difficulty": "hard",
    "topic_title": "Memory Hierarchy: Registers, Cache, RAM (SRAM/DRAM), ROM (PROM/EPROM/EEPROM)",
    "options": [
      {
        "text": "Because its transistors overheat rapidly",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Because its memory cells store charge on microscopic capacitors that leak voltage over time",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "To clean up invalid memory addresses",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "To synchronize with hard disk spin rates",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Which type of Read-Only Memory can be erased electrically in-circuit without removing the chip or using ultraviolet light?",
    "explanation": "EEPROM (Electrically Erasable Programmable ROM) and Flash memory can be wiped and reprogrammed byte-by-byte using electrical voltage signals directly in circuit.",
    "difficulty": "medium",
    "topic_title": "Memory Hierarchy: Registers, Cache, RAM (SRAM/DRAM), ROM (PROM/EPROM/EEPROM)",
    "options": [
      {
        "text": "Mask ROM",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "PROM",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "EPROM",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "EEPROM",
        "is_correct": true,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "What type of ROM requires exposure to intense Ultraviolet (UV) light through a quartz window for erasure?",
    "explanation": "EPROM (Erasable PROM) chips feature a distinctive transparent quartz window on top through which UV light is beamed for 15-20 minutes to erase bit patterns.",
    "difficulty": "easy",
    "topic_title": "Memory Hierarchy: Registers, Cache, RAM (SRAM/DRAM), ROM (PROM/EPROM/EEPROM)",
    "options": [
      {
        "text": "PROM",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "EPROM",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "EEPROM",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Flash ROM",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Cache memory is introduced in computer systems primarily to:",
    "explanation": "Cache memory stores recently and frequently accessed instructions and data to minimize CPU wait states caused by the relatively slow access times of DRAM.",
    "difficulty": "medium",
    "topic_title": "Memory Hierarchy: Registers, Cache, RAM (SRAM/DRAM), ROM (PROM/EPROM/EEPROM)",
    "options": [
      {
        "text": "Expand the physical storage capacity of secondary hard drives",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Bridge the significant operating speed disparity between the fast CPU and slower DRAM main memory",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Store permanent boot firmware (BIOS)",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Protect the operating system from virus infection",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "The principle underlying effective cache memory operation, where recently accessed data items are likely to be accessed again soon, is known as:",
    "explanation": "Temporal locality states that an instruction or memory location referenced at time t will very likely be re-referenced in the near future (e.g. inside loop bodies).",
    "difficulty": "hard",
    "topic_title": "Memory Hierarchy: Registers, Cache, RAM (SRAM/DRAM), ROM (PROM/EPROM/EEPROM)",
    "options": [
      {
        "text": "Spatial Locality",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Temporal Locality",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Direct Mapping",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Virtual Addressing",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Spatial locality of reference describes the phenomenon where:",
    "explanation": "Spatial locality exploits the contiguous storage of program code and array elements: loading an entire cache line brings neighboring bytes that the CPU will execute next.",
    "difficulty": "hard",
    "topic_title": "Memory Hierarchy: Registers, Cache, RAM (SRAM/DRAM), ROM (PROM/EPROM/EEPROM)",
    "options": [
      {
        "text": "Data stored at distant server nodes is accessed fastest",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Accessing a memory address increases the probability that adjacent memory addresses will be accessed soon",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Only read operations are performed in memory",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Code is kept in optical media for longevity",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Non-volatile storage media refers to storage that:",
    "explanation": "Non-volatile memory (such as ROM, HDD, SSD, USB flash drives) retains stored binary data indefinitely without requiring continuous power supply.",
    "difficulty": "easy",
    "topic_title": "Secondary Storage: Magnetic Disks, Optical Disks, Flash Storage & SSDs",
    "options": [
      {
        "text": "Loses its data immediately when electrical power is switched off",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Retains its stored information even when the computer system is completely powered down",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Cannot be written to more than once",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Operates exclusively in magnetic tape formats",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Solid State Drives (SSDs) outperform traditional Hard Disk Drives (HDDs) because SSDs:",
    "explanation": "SSDs contain zero spinning disks or mechanical actuator arms, eliminating seek latency and rotational delay through parallel non-volatile NAND flash channels.",
    "difficulty": "medium",
    "topic_title": "Secondary Storage: Magnetic Disks, Optical Disks, Flash Storage & SSDs",
    "options": [
      {
        "text": "Use spinning magnetic platters with faster read/write heads",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Have no moving mechanical parts and utilize high-speed NAND flash memory",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Store data in analog signals rather than digital bits",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Rely entirely on static RAM chips with battery backup",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Software etched permanently into hardware ROM/flash chips during manufacture to control low-level device initialization is:",
    "explanation": "Firmware (such as the motherboard UEFI/BIOS) provides essential machine-level control programs burned into non-volatile memory.",
    "difficulty": "easy",
    "topic_title": "Computer Languages: Machine Language, Assembly Language, High-Level Languages",
    "options": [
      {
        "text": "Firmware",
        "is_correct": true,
        "letter": "A"
      },
      {
        "text": "Shareware",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "Freeware",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Adware",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Software distributed freely on a trial basis for evaluation, requiring payment or license purchase after a grace period, is called:",
    "explanation": "Shareware is commercial software distributed at no cost for a trial period (e.g., 30 days) to allow evaluation before purchasing a full license.",
    "difficulty": "easy",
    "topic_title": "Software Licensing Models: Demoware, Shareware, Freeware, Firmware, Free & Open Source",
    "options": [
      {
        "text": "Freeware",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Public Domain Software",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "Shareware",
        "is_correct": true,
        "letter": "C"
      },
      {
        "text": "Open Source Software",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Demoware is best described as:",
    "explanation": "Demoware is a restricted software build where vital features (like file saving, export, or advanced filters) are locked until the full commercial product is bought.",
    "difficulty": "medium",
    "topic_title": "Software Licensing Models: Demoware, Shareware, Freeware, Firmware, Free & Open Source",
    "options": [
      {
        "text": "Software that works only when connected to a demonstration server",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Commercial software distributed with disabled key features (e.g., cannot save or export) to showcase capabilities",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Software made specifically for classroom teaching",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Free software with unlimited commercial distribution rights",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Which category of software is responsible for controlling computer hardware resources and providing a platform for application software to run?",
    "explanation": "System software comprises the Operating System, device drivers, and core utilities that manage CPU scheduling, memory, file systems, and hardware peripherals.",
    "difficulty": "easy",
    "topic_title": "Types of Software: System Software, Application Software & Utility Software",
    "options": [
      {
        "text": "Application Software",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "System Software",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Embedded Application",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Spreadsheet Software",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Disk Cleanup, Disk Defragmenter, and Antivirus scanners are classified as:",
    "explanation": "Utility software consists of system maintenance and optimization programs that analyze, configure, optimize, or protect computer hardware and files.",
    "difficulty": "easy",
    "topic_title": "Definition & Characteristics of Computers",
    "options": [
      {
        "text": "System Development Software",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Application Software",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "Utility Software",
        "is_correct": true,
        "letter": "C"
      },
      {
        "text": "Firmware",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Free Software, as championed by Richard Stallman and the Free Software Foundation (FSF), emphasizes:",
    "explanation": "Free software ('free as in speech, not free beer') guarantees the four essential freedoms: to run, study source code, redistribute copies, and distribute modified versions.",
    "difficulty": "hard",
    "topic_title": "Software Licensing Models: Demoware, Shareware, Freeware, Firmware, Free & Open Source",
    "options": [
      {
        "text": "Zero cost of purchase above all else",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "The user's liberty to run, study, modify, and redistribute the program source code",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Mandatory inclusion of third-party advertisements",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Distribution exclusively through government repositories",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Open-source software licenses typically mandate that:",
    "explanation": "Open-source software (OSS) licenses ensure that human-readable source code is distributed openly, permitting collective inspection, peer review, and community enhancement.",
    "difficulty": "medium",
    "topic_title": "Software Licensing Models: Demoware, Shareware, Freeware, Firmware, Free & Open Source",
    "options": [
      {
        "text": "The source code must be made accessible to users alongside the binary executable",
        "is_correct": true,
        "letter": "A"
      },
      {
        "text": "Users cannot modify the program under any circumstance",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "The software can never be run on commercial operating systems",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Only university researchers are allowed to download the program",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Which of the following is considered System Software?",
    "explanation": "Microsoft Windows 11 is an Operating System, which is the foundational system software managing all computing hardware and user applications.",
    "difficulty": "easy",
    "topic_title": "Types of Software: System Software, Application Software & Utility Software",
    "options": [
      {
        "text": "Adobe Photoshop",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Microsoft Windows 11",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Google Chrome",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Tally Prime",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Proprietary software is software that:",
    "explanation": "Proprietary (closed-source) software remains the intellectual property of its creator; users obtain only an executable license without source code access.",
    "difficulty": "medium",
    "topic_title": "Software Licensing Models: Demoware, Shareware, Freeware, Firmware, Free & Open Source",
    "options": [
      {
        "text": "Is placed into the public domain with no copyright restrictions",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Has its source code kept secret and legally protected by copyright and end-user license agreements (EULA)",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Can be freely decompiled and resold by any purchaser",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Is funded exclusively by educational grants",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Software distributed at zero financial cost but where the author retains all copyright and does NOT provide access to source code is:",
    "explanation": "Freeware is available free of charge for use, but its proprietary source code is closed and users may not alter, decompile, or sell it.",
    "difficulty": "easy",
    "topic_title": "Software Licensing Models: Demoware, Shareware, Freeware, Firmware, Free & Open Source",
    "options": [
      {
        "text": "Shareware",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Freeware",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Public Domain Software",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Open Source Software",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Machine language is composed exclusively of:",
    "explanation": "Machine code is the native first-generation programming language comprised directly of binary bits that electronic CPU logic gates decode and execute.",
    "difficulty": "easy",
    "topic_title": "Computer Languages: Machine Language, Assembly Language, High-Level Languages",
    "options": [
      {
        "text": "English-like keywords and operators",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Mnemonic operation codes like ADD and MOV",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "Binary patterns of 0s and 1s understood directly by the CPU",
        "is_correct": true,
        "letter": "C"
      },
      {
        "text": "Mathematical equations and Greek symbols",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Assembly language introduced human-readable abbreviations for machine instructions known as:",
    "explanation": "Assembly language replaces cryptic binary opcodes with symbolic mnemonics (such as MOV, ADD, SUB, JMP) to make low-level programming manageable.",
    "difficulty": "medium",
    "topic_title": "Computer Languages: Machine Language, Assembly Language, High-Level Languages",
    "options": [
      {
        "text": "Pseudocodes",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Mnemonics",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Tokens",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Literals",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "A language translator that converts entire high-level language source code into machine/object code in a single comprehensive pass is a(n):",
    "explanation": "A compiler analyzes and translates the entire source code file as a whole into an executable object module, producing error lists for the complete file.",
    "difficulty": "easy",
    "topic_title": "Translators: Assemblers, Compilers, Interpreters, Linkers & Loaders",
    "options": [
      {
        "text": "Interpreter",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Assembler",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "Compiler",
        "is_correct": true,
        "letter": "C"
      },
      {
        "text": "Loader",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "An interpreter differs from a compiler because an interpreter:",
    "explanation": "An interpreter executes high-level statements sequentially in real time without creating an intermediate standalone binary file.",
    "difficulty": "medium",
    "topic_title": "Translators: Assemblers, Compilers, Interpreters, Linkers & Loaders",
    "options": [
      {
        "text": "Produces an independent .exe file that runs without the translator",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Translates and executes source code line-by-line, halting immediately when an error is encountered",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Only works with assembly language programs",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Translates machine code back into high-level source code",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "The translator tool specifically designed to convert Assembly Language programs into machine language is called a(n):",
    "explanation": "An assembler translates assembly language symbolic mnemonics and memory labels into equivalent binary machine opcodes and addresses.",
    "difficulty": "easy",
    "topic_title": "Translators: Assemblers, Compilers, Interpreters, Linkers & Loaders",
    "options": [
      {
        "text": "Interpreter",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Compiler",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "Assembler",
        "is_correct": true,
        "letter": "C"
      },
      {
        "text": "Linker",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "What system utility takes one or more compiled object modules and resolves external library references into a single executable file?",
    "explanation": "The Linker connects compiled object files with required standard library routines (e.g. C standard library) and resolves cross-module memory references.",
    "difficulty": "hard",
    "topic_title": "Translators: Assemblers, Compilers, Interpreters, Linkers & Loaders",
    "options": [
      {
        "text": "Compiler",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Linker",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Loader",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Debugger",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "The software component that places an executable program from secondary storage into main memory (RAM) ready for CPU execution is the:",
    "explanation": "The Loader allocates memory space, reads executable machine code from disk into RAM, adjusts base addresses if necessary, and branches CPU control to main().",
    "difficulty": "hard",
    "topic_title": "Translators: Assemblers, Compilers, Interpreters, Linkers & Loaders",
    "options": [
      {
        "text": "Linker",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Loader",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Compiler",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Interpreter",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Which of the following is considered a Low-Level Language?",
    "explanation": "Assembly Language is a low-level language because it possesses a 1-to-1 correspondence with CPU hardware architecture and memory addressing.",
    "difficulty": "easy",
    "topic_title": "Computer Languages: Machine Language, Assembly Language, High-Level Languages",
    "options": [
      {
        "text": "Python",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Assembly Language",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Java",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "C++",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "High-level programming languages (like C, Java, Python) are advantageous primarily because they:",
    "explanation": "High-level languages provide abstraction over CPU instruction sets, enabling software developers to write readable, portable code across varied CPU types.",
    "difficulty": "medium",
    "topic_title": "Computer Languages: Machine Language, Assembly Language, High-Level Languages",
    "options": [
      {
        "text": "Execute faster than raw machine code without translation",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Are machine-independent, portable across different hardware platforms, and human-readable",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Directly manipulate microprocessor registers without abstraction",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Do not require memory allocation",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Characteristics of a good programming language include all of the following EXCEPT:",
    "explanation": "A good language prioritizes machine independence and portability so that algorithms run across diverse hardware without complete codebase rewrites.",
    "difficulty": "medium",
    "topic_title": "Definition & Characteristics of Computers",
    "options": [
      {
        "text": "Clarity, simplicity, and readability",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "High portability and robust error-handling mechanisms",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "Complete hardware-dependence requiring total rewrite for each new computer model",
        "is_correct": true,
        "letter": "C"
      },
      {
        "text": "Rich library support and expressive data structures",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "An algorithm is formally defined as:",
    "explanation": "An algorithm is an unambiguous, finite procedure that takes inputs, processes them through well-defined steps, and terminates with correct outputs.",
    "difficulty": "easy",
    "topic_title": "Problem-Solving Tools: Algorithms, Flowcharts, Pseudo-code & Characteristics of Good Languages",
    "options": [
      {
        "text": "A syntax error in computer code",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "A finite, unambiguous, step-by-step sequence of instructions designed to solve a specific computational problem",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "A hardware circuit for performing floating-point division",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "A graphical diagram representing data cables",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Which algorithmic property mandates that an algorithm must always terminate after a countable, finite number of operational steps?",
    "explanation": "Finiteness requires that for all valid input cases, the algorithm's execution terminates and does not run into an infinite loop.",
    "difficulty": "medium",
    "topic_title": "Problem-Solving Tools: Algorithms, Flowcharts, Pseudo-code & Characteristics of Good Languages",
    "options": [
      {
        "text": "Definiteness",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Finiteness",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Input/Output Completeness",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Effectiveness",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "The algorithmic property 'Definiteness' means that:",
    "explanation": "Definiteness requires that every instruction must be stated so clearly that human or machine can carry it out without ambiguity.",
    "difficulty": "hard",
    "topic_title": "Problem-Solving Tools: Algorithms, Flowcharts, Pseudo-code & Characteristics of Good Languages",
    "options": [
      {
        "text": "Every operation must be clear, precise, and completely unambiguous with exactly one interpretation",
        "is_correct": true,
        "letter": "A"
      },
      {
        "text": "The algorithm must use floating-point numbers",
        "is_correct": false,
        "letter": "B"
      },
      {
        "text": "The code must run in under one second",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "The algorithm must produce multiple diverse answers",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "In standard flowchart design, an Oval / Rounded Rectangle symbol represents:",
    "explanation": "The oval/pill symbol is the terminal symbol marking the starting entry point and termination end points of a flowchart.",
    "difficulty": "easy",
    "topic_title": "Problem-Solving Tools: Algorithms, Flowcharts, Pseudo-code & Characteristics of Good Languages",
    "options": [
      {
        "text": "Processing or computational step",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Start or End (Terminal)",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Decision or conditional branching",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Input or Output operation",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Which geometric shape is utilized in flowcharts to denote an Input or Output operation (e.g. Read X, Print Sum)?",
    "explanation": "A parallelogram represents input and output operations, such as receiving user data from keyboard or displaying results on a monitor.",
    "difficulty": "easy",
    "topic_title": "Problem-Solving Tools: Algorithms, Flowcharts, Pseudo-code & Characteristics of Good Languages",
    "options": [
      {
        "text": "Rectangle",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Parallelogram",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Diamond / Rhombus",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Circle",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "In a flowchart, a Diamond (Rhombus) symbol denotes a:",
    "explanation": "A diamond shape evaluates a logical or relational condition (e.g., Is X > Y?) with exiting True/False or Yes/No branching paths.",
    "difficulty": "easy",
    "topic_title": "Problem-Solving Tools: Algorithms, Flowcharts, Pseudo-code & Characteristics of Good Languages",
    "options": [
      {
        "text": "Sequential assignment statement",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Decision / Conditional Branching point with two or more outgoing paths",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Data storage file",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Page connector",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "A small Circle symbol in a flowchart is used as a:",
    "explanation": "A small circle connector merges flow lines or continues a complex diagram to another section of the same page without crisscrossing lines.",
    "difficulty": "medium",
    "topic_title": "Problem-Solving Tools: Algorithms, Flowcharts, Pseudo-code & Characteristics of Good Languages",
    "options": [
      {
        "text": "Terminal start symbol",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "On-page connector linking interrupted flow lines",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Magnetic tape unit",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Looping accumulator",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Pseudocode is best defined as:",
    "explanation": "Pseudocode outlines algorithmic logic using human language and programming keywords (IF, WHILE, REPEAT) without strict syntax constraints.",
    "difficulty": "medium",
    "topic_title": "Problem-Solving Tools: Algorithms, Flowcharts, Pseudo-code & Characteristics of Good Languages",
    "options": [
      {
        "text": "Compiled binary code ready for CPU execution",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "An informal, human-readable high-level description of an algorithm that blends English with structured programming syntax",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "A computer virus disguised as a valid program",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "A special encrypted file format",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Which flowchart symbol represents processing or data calculation (such as Sum = A + B)?",
    "explanation": "A standard rectangle represents internal computational processing, variable manipulation, or assignment operations.",
    "difficulty": "easy",
    "topic_title": "Problem-Solving Tools: Algorithms, Flowcharts, Pseudo-code & Characteristics of Good Languages",
    "options": [
      {
        "text": "Parallelogram",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Rectangle",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Diamond",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Ellipse",
        "is_correct": false,
        "letter": "D"
      }
    ]
  },
  {
    "prompt": "Top-down structured programming strategy involves:",
    "explanation": "Top-down design starts with the high-level objective and hierarchically breaks it down into manageable functional subroutines and modules.",
    "difficulty": "hard",
    "topic_title": "Problem-Solving Tools: Algorithms, Flowcharts, Pseudo-code & Characteristics of Good Languages",
    "options": [
      {
        "text": "Writing machine code first and high-level code later",
        "is_correct": false,
        "letter": "A"
      },
      {
        "text": "Decomposing a complex system into progressively smaller, self-contained modular sub-problems and functions",
        "is_correct": true,
        "letter": "B"
      },
      {
        "text": "Running software without testing individual modules",
        "is_correct": false,
        "letter": "C"
      },
      {
        "text": "Storing all program variables in a single global file",
        "is_correct": false,
        "letter": "D"
      }
    ]
  }
];

import { BCA_101N_UNIT_2_ARTICLES } from "./curriculum-unit2-articles";

/**
 * Returns curated educational articles for a given subject code and unit number
 */
export function getCuratedUnitArticles(subjectCode: string, unitNumber: number): CuratedArticle[] {
  const normalizedCode = subjectCode.toUpperCase().trim();
  if (normalizedCode === "BCA-101N" || normalizedCode.includes("101")) {
    if (unitNumber === 1) {
      return BCA_101N_UNIT_1_ARTICLES;
    }
    if (unitNumber === 2) {
      return BCA_101N_UNIT_2_ARTICLES;
    }
  }
  return [];
}

/**
 * Returns calibrated MCQs for a given subject code and unit number
 */
export function getCuratedUnitMcqs(subjectCode: string, unitNumber: number): CuratedMcq[] {
  const normalizedCode = subjectCode.toUpperCase().trim();
  if ((normalizedCode === "BCA-101N" || normalizedCode.includes("101")) && unitNumber === 1) {
    return BCA_101N_UNIT_1_MCQS;
  }
  return [];
}

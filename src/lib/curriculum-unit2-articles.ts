import type { CuratedArticle } from "@/lib/curriculum-content";

export const BCA_101N_UNIT_2_ARTICLES: CuratedArticle[] = [
  {
    id: "bca-101n-u2-art-01",
    topicTitle: "Operating System Overview: Definition, Objectives & Functions",
    title: "Operating System Overview: Definition, Objectives & Functions",
    sortOrder: 1,
    body: `# Operating System Overview: Definition, Objectives & Functions

## 1. Simple Explanation
Think of a computer without an operating system like an orchestra without a conductor. The musicians (CPU, RAM, Hard Disk, Keyboard, Monitor) are all present and capable, but without someone coordinating them, there is only silence or chaos.

An **Operating System (OS)** is the master software that wakes up when you turn on your computer. It coordinates all hardware components, loads and runs your applications (like web browsers, code editors, and media players), and provides a clean, user-friendly interface so you can interact with the machine without needing to write binary machine code.

---

## 2. Exam-Ready Definition

> [!IMPORTANT]
> **Definition:** An **Operating System (OS)** is specialized system software that acts as an intermediary interface between computer hardware, application software, and the end user. It manages system resources (processor time, memory space, file storage, and I/O peripherals) and provides a secure, consistent execution environment for application programs.

---

## 3. Detailed Explanation

### Core Objectives of an Operating System
1. **Convenience & Usability**: Making computer hardware easy, intuitive, and accessible for human users through Graphical User Interfaces (GUI) or Command-Line Interfaces (CLI).
2. **Resource Efficiency**: Allocating hardware resources (CPU clock cycles, memory pages, disk blocks) optimally to maximize throughput and minimize idle time.
3. **Hardware Abstraction**: Hiding complex, low-level hardware details from application programmers. For example, a program simply calls \`saveFile()\` without needing to calculate magnetic disk sectors or track coordinates.
4. **Security & Protection**: Ensuring that unauthorized users or errant programs cannot tamper with the memory or files of other processes or crash the system.

### Six Fundamental Functions of an Operating System

\`\`\`
+-----------------------------------------------------------------------+
|                    THE SIX CORE FUNCTIONS OF AN OS                    |
+-------------------+-------------------+-------------------------------+
| 1. PROCESSOR      | 2. MEMORY         | 3. FILE SYSTEM                |
|    MANAGEMENT     |    MANAGEMENT     |    MANAGEMENT                 |
| CPU Scheduling,   | RAM Allocation,   | Directory Hierarchy, Access   |
| Process Lifecycle | Paging & Virtual  | Permissions, Storage Blocks   |
+-------------------+-------------------+-------------------------------+
| 4. DEVICE / I/O   | 5. SECURITY &     | 6. USER INTERFACE             |
|    MANAGEMENT     |    PROTECTION     |    PROVISION                  |
| Device Drivers,   | Authentication,   | Command-Line Shell (CLI) or   |
| Buffers & Spooling| Access Control    | Graphical Desktop (GUI)       |
+-------------------+-------------------+-------------------------------+
\`\`\`

#### 1. Processor (CPU) Management
The OS decides which process gets CPU time, for how long, and when. This mechanism is called **CPU Scheduling**.
- Creates, suspends, and terminates processes.
- Switches execution context between processes via interrupts.
- Uses scheduling algorithms: First-Come First-Served (FCFS), Round Robin (RR), and Shortest Job First (SJF).

#### 2. Main Memory Management
Every program must reside in RAM before the CPU can execute its instructions.
- Tracks every byte of physical memory (allocated vs. free).
- Allocates memory dynamically when a program launches (\`malloc\` / \`new\`).
- Deallocates memory when a program terminates to prevent memory leaks.
- Implements **Virtual Memory** using paging so programs larger than physical RAM can execute seamlessly.

#### 3. File System Management
Computers store data persistently on secondary storage devices using logical files and directories.
- Organizes storage into hierarchical directory structures (folders and subfolders).
- Maps logical file names to physical disk blocks (e.g., via FAT or NTFS tables).
- Controls read, write, and execute permissions to maintain data integrity.

#### 4. Device (I/O) Management
A computer connects to dozens of peripheral devices with differing speeds and protocols.
- Communicates with hardware controllers using specialized software called **Device Drivers**.
- Implements **Buffering** (temporary RAM storage during transfer rate mismatches).
- Implements **Spooling** (Simultaneous Peripheral Operations On-Line), such as queuing print jobs so the CPU is not stalled waiting for a slow physical printer.

#### 5. Security & Protection
- Authenticates users via passwords, PINs, or biometrics.
- Enforces access control lists (ACLs) so standard users cannot alter critical system files.
- Isolates memory spaces so one crashing application cannot overwrite the data of another application.

#### 6. User Interface
- **Command-Line Interface (CLI)**: Fast, text-based shell for keyboard commands (e.g., DOS prompt \`C:\\>\`, Linux bash).
- **Graphical User Interface (GUI)**: Visual desktop with windows, icons, menus, and pointer devices (e.g., Windows 11, macOS).

---

## 4. Architectural Diagram: The OS Intermediary Layer

\`\`\`
       +------------------------------------------------+
       |                   END USERS                    |
       |     [Students]     [Developers]   [Operators]  |
       +-----------------------|------------------------+
                               v
       +------------------------------------------------+
       |             APPLICATION SOFTWARE               |
       |  [Web Browser]   [C Compiler]   [Media Player] |
       +-----------------------|------------------------+
                               v
       +------------------------------------------------+
       |               OPERATING SYSTEM                 |
       |  +------------------------------------------+  |
       |  |  USER INTERFACE: Shell / GUI Desktop     |  |
       |  +------------------------------------------+  |
       |  |  KERNEL: Core Services & Subsystems      |  |
       |  |  - Process Scheduler   - Memory Manager  |  |
       |  |  - File System         - Device Drivers  |  |
       |  +------------------------------------------+  |
       +-----------------------|------------------------+
                               v
       +------------------------------------------------+
       |               COMPUTER HARDWARE                |
       |  [Central Processing Unit]  [Main Memory RAM]  |
       |  [Hard Disk Drive / SSD]    [Monitor, Keyboard]|
       +------------------------------------------------+
\`\`\`

---

## 5. Comparison: CLI vs. GUI Environments

| Feature | Command-Line Interface (CLI) | Graphical User Interface (GUI) |
| :--- | :--- | :--- |
| **Interaction Mode** | Typed text commands on a keyboard | Mouse, touch pointer, windows, icons, and menus |
| **System Resource Usage** | Negligible RAM and CPU overhead | Substantial RAM, GPU, and processor overhead |
| **Ease of Learning** | Steep learning curve; commands must be memorized | Intuitive and beginner-friendly |
| **Automation & Scripting** | Exceptionally powerful via shell scripts and batch files | Harder to automate complex batch tasks |
| **Hardware Requirements** | Runs on minimal hardware and headless servers | Requires graphics display adapter and monitor |
| **Representative Examples** | MS-DOS, Linux Bash, PowerShell | Windows 11, macOS Sequoia, Ubuntu GNOME |

---

## 6. Important Exam Points

> [!TIP]
> In university exams, when asked to **"Define an OS and explain its major functions"** (10–15 Marks):
> 1. Start with the formal definition highlighting the **intermediary role**.
> 2. Draw the 4-tier layer diagram: **User $\\rightarrow$ Application $\\rightarrow$ OS (Kernel/Shell) $\\rightarrow$ Hardware**.
> 3. List all 6 functions with clear subheadings: **Processor, Memory, File, Device, Security, and UI Management**.

---

## 7. Quick Revision
- **OS Role**: Software conductor bridging physical hardware and user applications.
- **Kernel**: The core engine of the OS resident in RAM continuously from boot to shutdown.
- **Shell**: The outer command interface enabling users to issue instructions to the kernel.
- **Spooling**: Queuing I/O requests (like printer jobs) to prevent CPU stall.`,
  },
  {
    id: "bca-101n-u2-art-02",
    topicTitle: "OS Classification: Batch, Multiprogramming, Time-Sharing & Real-Time Systems",
    title: "OS Classification: Batch, Multiprogramming, Time-Sharing & Real-Time Systems",
    sortOrder: 2,
    body: `# OS Classification: Batch, Multiprogramming, Time-Sharing & Real-Time Systems

## 1. Simple Explanation
Over the past 70 years, operating systems evolved alongside processor technology. In early days, computers processed one stack of punched cards at a time without any user interaction. As hardware speeds increased, systems learned to run multiple programs concurrently, share CPU time among hundreds of users simultaneously, and guarantee millisecond response times in critical life-support hardware.

Understanding how operating systems are classified tells you how they schedule the CPU and allocate resources.

---

## 2. Exam-Ready Definitions & Classification Matrix

| OS Category | Primary Goal | CPU Scheduling Mechanism | Typical Turnaround Time | Representative System |
| :--- | :--- | :--- | :--- | :--- |
| **Batch OS** | Maximize machine throughput | Groups similar jobs; no interaction | Hours to Days | IBM OS/360 |
| **Multiprogramming OS** | Maximize CPU utilization | Switches to another job on I/O block | Minutes | Early Mainframes |
| **Time-Sharing (Multitasking)** | Minimize user response time | Rapid fixed time quantum (Round Robin) | Milliseconds | Unix, Linux, Windows |
| **Multiprocessing OS** | Maximize computational throughput | Multiple physical CPUs executing in parallel | Real-time / Instant | Modern multi-core PCs, Servers |
| **Real-Time OS (RTOS)** | Guarantee deterministic deadlines | Priority preemptive scheduling | Microseconds | QNX, VxWorks, FreeRTOS |
| **Distributed OS** | Unified resource sharing across networks| Loosely coupled autonomous nodes | Variable | Apache Hadoop clusters |

---

## 3. Detailed Explanation of Major OS Types

### 1. Batch Operating Systems
- **How It Works**: Users prepare their jobs off-line on punched cards or magnetic tape and submit them to a computer operator. The operator sorts jobs with similar language requirements into **batches** and feeds them to the computer.
- **CPU Idle Problem**: When a job needs to perform I/O (like reading a card), the CPU sits completely idle waiting for mechanical tape readers.
- **Pros**: High hardware utilization for repetitive overnight workloads (payroll calculations).
- **Cons**: Zero interactive feedback; a single syntax error requires restarting the entire batch submission.

### 2. Multiprogramming Operating Systems
- **How It Works**: Multiple programs reside simultaneously in main memory (RAM). The OS allocates CPU to Program A. When Program A pauses to wait for an I/O operation (e.g. reading from disk), the OS immediately context-switches the CPU to Program B.
- **Key Breakthrough**: Eliminates CPU idle time caused by slow I/O peripherals.

\`\`\`
MULTIPROGRAMMING CPU UTILIZATION TIMELINE
Without Multiprogramming (Single Job):
CPU: [Job A: Compute] [Job A: Waiting I/O (IDLE!)] [Job A: Compute]
With Multiprogramming (Multiple Jobs in RAM):
CPU: [Job A: Compute] [Job B: Compute] [Job C: Compute] [Job A: Compute]
                      (Job A does I/O) (Job B does I/O)
\`\`\`

### 3. Time-Sharing (Multitasking) Operating Systems
- **How It Works**: A logical extension of multiprogramming designed for interactive multi-user environments. The CPU allocates a small fixed slice of time (called a **time quantum**, typically 10–50 milliseconds) to each active process using Round-Robin scheduling.
- **User Perception**: The CPU switches between processes so rapidly that every user feels they have exclusive access to the computer.

### 4. Multiprocessing Operating Systems
- **How It Works**: The computer contains **two or more physical Central Processing Units (or processor cores)** that execute separate instructions simultaneously in true parallel hardware fashion.
  - **Symmetric Multiprocessing (SMP)**: All CPUs share a common memory bus and run a single copy of the OS.
  - **Asymmetric Multiprocessing (AMP)**: A master processor coordinates tasks and delegates workloads to slave processors.

### 5. Real-Time Operating Systems (RTOS)
- **Definition**: An OS engineered for environments where computational correctness depends not only on the logical output, but strictly on the **exact physical time** at which the result is delivered.
- **Classification**:
  - **Hard Real-Time System**: Missing a deadline causes complete, catastrophic failure (e.g., Missile Guidance, Anti-lock Braking Systems ABS, Cardiac Pacemakers, Aircraft Flight Control).
  - **Soft Real-Time System**: Missing a deadline degrades quality of service but does not cause fatal damage (e.g., Live Cricket Video Streaming, VoIP calls, Online Gaming).

---

## 4. Architectural Comparison: Multitasking vs. Multiprocessing

\`\`\`
MULTITASKING (Single CPU, Concurrent)      MULTIPROCESSING (Multi-Core, True Parallel)
          +------------+                                 +------------+   +------------+
          | Single CPU |                                 |   CPU 1    |   |   CPU 2    |
          +------------+                                 +------------+   +------------+
                | Time-sliced                                  |                |
    +-----------+-----------+                      +-----------+----------------+-----------+
    |           |           |                      |                                        |
[Proc A]    [Proc B]    [Proc C]                [Proc A runs on CPU 1]  [Proc B runs on CPU 2]
(Rapid sequential switching)                    (Simultaneous true parallel execution)
\`\`\`

| Comparison Attribute | Multitasking | Multiprocessing |
| :--- | :--- | :--- |
| **Number of Processors** | Exactly one physical CPU core | Two or more physical CPU cores |
| **Execution Mode** | Concurrent (Rapid sequential time-slicing) | True Parallel (Simultaneous instruction execution) |
| **Hardware Cost** | Low; runs on single-core processors | Higher; requires multi-core or multi-socket motherboards |
| **Throughput** | Limited by single CPU clock frequency | Substantially higher; divided among processors |
| **Reliability** | If CPU fails, entire system halts | High fault tolerance; if one core fails, others continue |

---

## 5. Important Exam Points

> [!IMPORTANT]
> A university exam favorite (5 or 10 Marks):
> **"Distinguish between Hard Real-Time and Soft Real-Time Systems"**:
> - Hard RTOS: Absolute zero tolerance for deadline jitter. Secondary storage is minimal; ROM-based firmware preferred.
> - Soft RTOS: Occasional deadline misses handled gracefully via buffering.

---

## 6. Quick Revision
- **Batch OS**: Jobs grouped into batches, executed without human interaction.
- **Multiprogramming**: Keeps CPU busy by switching to another job when current job waits for I/O.
- **Multitasking / Time-Sharing**: Slices CPU time into milliseconds so multiple users or programs run interactively.
- **Multiprocessing**: Two or more physical CPU cores executing instructions simultaneously.
- **Hard RTOS**: Missing a deadline results in catastrophe (e.g. airbag deployment).`,
  },
  {
    id: "bca-101n-u2-art-03",
    topicTitle: "Disk Operating System (DOS) Basics & Physical Structure of Magnetic Disks",
    title: "Disk Operating System (DOS) Basics & Physical Structure of Magnetic Disks",
    sortOrder: 3,
    body: `# Disk Operating System (DOS) Basics & Physical Structure of Magnetic Disks

## 1. Simple Explanation
Before point-and-click graphical desktops existed, every personal computer was controlled via typed text commands. The most famous early operating system for IBM-compatible PCs was **MS-DOS (Microsoft Disk Operating System)**.

To understand how DOS manages files, you must first understand the physical layout of a hard disk: magnetic platters rotating at high speed, divided into circular tracks and sectors, managed by an indexing system called the **File Allocation Table (FAT)**.

---

## 2. Exam-Ready Definition

> [!IMPORTANT]
> **Definition:** **MS-DOS (Microsoft Disk Operating System)** is a single-user, single-tasking, command-line operating system developed by Microsoft for 16-bit x86 IBM personal computers. It manages hardware peripherals, executes programs sequentially, and organizes persistent storage using the File Allocation Table (FAT) file system architecture.

---

## 3. Physical Geometry of Magnetic Disks

A hard disk drive (HDD) stores binary information magnetically on rigid circular platters:

\`\`\`
       +------------------------------------------------------+
       |             MAGNETIC PLATTER GEOMETRY                |
       |                                                      |
       |               Track (Concentric Circular Ring)       |
       |             /                                        |
       |          .-----.    Sector (Smallest physical unit,  |
       |         /       \\   typically 512 bytes)             |
       |        |    O    |                                   |
       |         \\       /   <=== Read/Write Head Assembly    |
       |          '-----'                                     |
       |             |                                        |
       |         Spindle Motor (5400 / 7200 RPM)              |
       +------------------------------------------------------+
\`\`\`

### Core Physical Components
1. **Platters**: Rigid aluminum or ceramic discs coated on both sides with a microscopic magnetic substrate.
2. **Read/Write Heads**: Electromagnetic transducers that fly nanometers above the spinning platter on a cushion of air to read and write magnetic polarities (0s and 1s).
3. **Tracks**: Hundreds to thousands of concentric circular rings on each platter surface.
4. **Sectors**: Radial pie-slice subdivisions of a track. A sector is the smallest physically addressable unit on a disk (conventionally **512 bytes**, or **4 KB** on modern Advanced Format drives).
5. **Cylinder**: The set of all tracks located at the exact same radial position across all platter surfaces.
6. **Cluster (Allocation Unit)**: The smallest logical unit of disk space that an operating system allocates to a file. A cluster consists of **2, 4, 8, 16, or more contiguous sectors**.

---

## 4. Disk Access Latency Calculations

When the CPU requests a block of data from a magnetic disk, the total delay is:

$$\\text{Total Access Time} = \\text{Seek Time} + \\text{Rotational Latency} + \\text{Transfer Time}$$

- **Seek Time**: Mechanical delay while the actuator arm moves the read/write head radially to the target track (typically 3–9 ms).
- **Rotational Latency**: Time waiting for the platter to rotate the requested sector beneath the head. Average latency is half a revolution:
  $$\\text{Average Latency} = \\frac{1}{2 \\times (\\text{RPM} / 60)}$$
  *(For a 7200 RPM disk: $\\approx 4.17\\text{ ms}$)*.
- **Transfer Time**: The time required to read and transmit data bits across the SATA/PCIe bus.

---

## 5. Logical Structure of a DOS Disk

When DOS formats a disk, it partitions the space into four distinct functional regions:

\`\`\`
+-------------+-------------+-------------+-------------+--------------------+
| BOOT SECTOR |   FAT 1     | FAT 2 (Copy)| ROOT DIRECT.| DATA AREA (FILES)  |
|  (Sector 0) | (Primary)   |  (Backup)   | (Directory) | (Clusters 2 to N)  |
+-------------+-------------+-------------+-------------+--------------------+
\`\`\`

1. **Boot Sector (Sector 0)**: Contains the Master Boot Record (MBR) partition code and the **BIOS Parameter Block (BPB)** describing disk geometry (bytes per sector, sectors per cluster, total sectors).
2. **File Allocation Table 1 (FAT 1)**: A linked list table where each entry maps to a cluster in the data area.
3. **File Allocation Table 2 (FAT 2)**: An exact mirror duplicate of FAT 1 kept for redundancy and fault tolerance.
4. **Root Directory**: A fixed-size table storing 32-byte records for files in the top-level \`C:\\\` directory.
5. **Data Area**: The remaining disk space divided into numbered clusters where actual file content resides.

---

## 6. DOS 32-Byte Directory Entry Structure

Every file listed in DOS has an exact 32-byte directory metadata entry:

| Byte Offset | Field Length | Description | Example Value |
| :--- | :--- | :--- | :--- |
| **0x00 – 0x07** | 8 Bytes | Filename (Padded with spaces) | \`\"NOTES   \"\` |
| **0x08 – 0x0A** | 3 Bytes | File Extension (Padded with spaces) | \`\"TXT\"\` (The famous 8.3 convention) |
| **0x0B** | 1 Byte | File Attribute Byte (R, H, S, V, D, A) | \`0x20\` (Archive set) |
| **0x0C – 0x15** | 10 Bytes | Reserved for system use | Zeroes |
| **0x16 – 0x17** | 2 Bytes | File Creation / Modification Time | Encoded binary time |
| **0x18 – 0x19** | 2 Bytes | File Creation / Modification Date | Encoded binary date |
| **0x1A – 0x1B** | 2 Bytes | Starting Cluster Number in FAT | Points to first file block |
| **0x1C – 0x1F** | 4 Bytes | File Size in Bytes (Up to 4 GB) | \`4096\` bytes |

---

## 7. Important Exam Points

> [!TIP]
> In university exams:
> - **8.3 File Naming Convention**: DOS file names allow a maximum of 8 characters for the name and 3 characters for the extension (e.g. \`PROGRAM1.CPP\`, \`REPORT.DOC\`). Spaces and special characters (\`* ? / \\ : < > |\`) are strictly prohibited.
> - **FAT Cluster Linked-List**: If a file spans clusters 3, 7, and 12, entry 3 in the FAT contains \`7\`, entry 7 contains \`12\`, and entry 12 contains an End-Of-File marker (\`0xFFFF\`).

---

## 8. Quick Revision
- **DOS**: Single-user, single-tasking command-line operating system.
- **Track**: Circular ring on a platter.
- **Sector**: 512-byte physical subdivision of a track.
- **Cluster**: Smallest logical allocation unit made of multiple sectors.
- **Four Disk Regions**: Boot Sector $\\rightarrow$ FAT 1 $\\rightarrow$ FAT 2 $\\rightarrow$ Root Directory $\\rightarrow$ Data Area.`,
  },
  {
    id: "bca-101n-u2-art-04",
    topicTitle: "DOS Booting Process (Cold vs Warm Boot) & Core System Files",
    title: "DOS Booting Process (Cold vs Warm Boot) & Core System Files",
    sortOrder: 4,
    body: `# DOS Booting Process (Cold vs Warm Boot) & Core System Files

## 1. Simple Explanation
When you push the power button on a computer, the CPU starts with empty RAM and no operating system loaded. The computer must bootstrap itself into life—pulling itself up by its own bootstraps—by loading system files from permanent storage into memory.

This sequential startup sequence is known as the **Booting Process**.

---

## 2. Cold Boot vs. Warm Boot

\`\`\`
+------------------------------------+------------------------------------+
|       COLD BOOT (HARD BOOT)        |       WARM BOOT (SOFT BOOT)        |
+------------------------------------+------------------------------------+
| Initiated by pushing the physical  | Initiated by pressing              |
| Power Button from an OFF state     | [Ctrl] + [Alt] + [Delete]          |
|                                    |                                    |
| Full electrical power initialization| Electrical power remains connected|
|                                    |                                    |
| Executes exhaustive Power-On       | Skips time-consuming hardware      |
| Self-Test (POST) of RAM & circuits | POST diagnostics                   |
|                                    |                                    |
| Used when starting fresh or after  | Used to recover from a software    |
| hardware changes                   | freeze or driver lockup            |
+------------------------------------+------------------------------------+
\`\`\`

---

## 3. The Three Core DOS System Files

To successfully boot MS-DOS, three essential system files must be present on the boot drive in exact low-level physical sectors:

\`\`\`
+-------------------+-------------------+-------------------+
|     IO.SYS        |    MSDOS.SYS      |   COMMAND.COM     |
| (Hardware I/O)    |   (DOS Kernel)    | (Shell / Command) |
| Interface routines| File management,  | User prompt C:\\>, |
| for BIOS hardware | memory & syscalls | internal commands |
+-------------------+-------------------+-------------------+
\`\`\`

1. **\`IO.SYS\`**:
   - Hidden, system, read-only file located at physical sector 1 of the boot disk.
   - Contains low-level hardware interface device drivers that link DOS with the motherboard ROM-BIOS routines for keyboard, screen, floppy, and serial ports.

2. **\`MSDOS.SYS\`**:
   - The heart (kernel) of MS-DOS.
   - Implements system call dispatchers (Software Interrupt \`INT 21h\`), file directory services, process termination, and memory allocation.

3. **\`COMMAND.COM\`**:
   - The default Command Interpreter and shell.
   - Displays the command prompt (\`C:\\>\`).
   - Parses typed text commands and executes all built-in **Internal Commands** (like \`DIR\`, \`COPY\`, \`DEL\`, \`CLS\`).

---

## 4. Step-by-Step 8-Stage Booting Sequence

\`\`\`
  [1] Power On & CPU Reset
           |
           v
  [2] ROM-BIOS executes POST (Tests CPU, RAM, Video, Keyboard)
           |
           v
  [3] BIOS loads Master Boot Record (MBR) from Sector 0 of Boot Drive
           |
           v
  [4] MBR locates Active Partition & loads its Partition Boot Sector
           |
           v
  [5] Boot Sector loads IO.SYS into low RAM
           |
           v
  [6] IO.SYS loads MSDOS.SYS (DOS Kernel initialized)
           |
           v
  [7] Kernel reads CONFIG.SYS (Loads optional device drivers & buffers)
           |
           v
  [8] COMMAND.COM executes AUTOEXEC.BAT & displays prompt: C:\\>
\`\`\`

### Detailed Breakdown of the 8 Stages

1. **Power-On & CPU Reset**: Turning on power stabilizes the power supply (SMPS). A "Power Good" signal releases the CPU from reset, forcing the Program Counter to address \`0xFFFF0\` (the entry point of motherboard ROM-BIOS).
2. **Power-On Self-Test (POST)**: BIOS tests critical hardware: CPU registers, DMA controllers, system timer, memory integrity (counting RAM), and keyboard presence.
3. **Master Boot Record (MBR) Read**: BIOS searches configured boot devices (Floppy A:, Hard Disk C:, CD-ROM) and reads Sector 0 into RAM address \`0x7C00\`.
4. **Boot Sector Execution**: The MBR partition table locates the designated active primary partition and transfers control to its Boot Sector code.
5. **Loading \`IO.SYS\`**: The partition bootstrap program reads \`IO.SYS\` from disk into low memory and transfers control to its initialization routines.
6. **Loading \`MSDOS.SYS\`**: \`IO.SYS\` locates and loads \`MSDOS.SYS\`. The DOS kernel establishes interrupt vectors (\`INT 20h\` through \`INT 27h\`).
7. **Processing \`CONFIG.SYS\`**: If present, DOS parses \`CONFIG.SYS\` to set system parameters (e.g. \`FILES=40\`, \`BUFFERS=20\`) and load hardware device drivers (e.g. \`DEVICE=HIMEM.SYS\`, \`DEVICE=MOUSE.SYS\`).
8. **Executing \`COMMAND.COM\` & \`AUTOEXEC.BAT\`**: The command processor \`COMMAND.COM\` is loaded into memory. It automatically executes startup batch commands in \`AUTOEXEC.BAT\` (e.g. setting \`PATH\`, \`PROMPT\`, running antivirus checks) and finally displays the interactive prompt:
   \`\`\`
   C:\\>
   \`\`\`

---

## 5. Important Exam Points

> [!IMPORTANT]
> When writing a 10-mark university answer on the **"Booting Process in DOS"**:
> - Always mention **POST** and what it checks.
> - List the **3 mandatory system files**: \`IO.SYS\`, \`MSDOS.SYS\`, and \`COMMAND.COM\`.
> - Explain the role of **\`CONFIG.SYS\`** (hardware configuration) versus **\`AUTOEXEC.BAT\`** (startup batch commands).
> - Highlight the difference between **Cold Boot** (Power switch, runs POST) and **Warm Boot** (Ctrl+Alt+Del, skips POST).

---

## 6. Quick Revision
- **Booting**: Process of bringing OS system files from disk into RAM.
- **Cold Boot**: From complete power off; runs POST.
- **Warm Boot**: [Ctrl]+[Alt]+[Del]; skips POST.
- **IO.SYS**: Hardware-BIOS interface routines.
- **MSDOS.SYS**: DOS kernel and file management services.
- **COMMAND.COM**: Command interpreter and shell (\`C:\\>\`).`,
  },
  {
    id: "bca-101n-u2-art-05",
    topicTitle: "DOS Commands Reference: Essential Internal & External Commands",
    title: "DOS Commands Reference: Essential Internal & External Commands",
    sortOrder: 5,
    body: `# DOS Commands Reference: Essential Internal & External Commands

## 1. Simple Explanation
In MS-DOS, you accomplish all file management, directory navigation, disk maintenance, and system configuration by typing text commands into the command prompt (\`C:\\>\`).

DOS divides commands into two fundamental categories based on where their executable machine code lives: **Internal Commands** (built into RAM inside \`COMMAND.COM\`) and **External Commands** (stored as separate \`.COM\` or \`.EXE\` files on the disk).

---

## 2. Key Differences: Internal vs. External Commands

| Comparison Metric | Internal DOS Commands | External DOS Commands |
| :--- | :--- | :--- |
| **Location** | Built directly inside \`COMMAND.COM\` | Stored as separate files (\`.COM\`, \`.EXE\`) on disk |
| **Memory Presence** | Permanently resident in RAM during entire session | Loaded into RAM only when invoked; released after completion |
| **Execution Speed** | Instantaneous (No disk read delay) | Slower (Requires disk seek and file load) |
| **Disk Dependency** | Can execute even if boot disk is removed | Fails if the executable file is not found on disk or PATH |
| **Examples** | \`DIR\`, \`CLS\`, \`MD\`, \`CD\`, \`COPY\`, \`DEL\`, \`DATE\`, \`TIME\` | \`FORMAT\`, \`CHKDSK\`, \`XCOPY\`, \`ATTRIB\`, \`TREE\`, \`DISKCOPY\` |

---

## 3. Essential Internal DOS Commands

### 1. \`DIR\` (Directory Listing)
Lists files and subdirectories in the specified path.
- **Syntax**: \`DIR [drive:][path] [/P] [/W]\`
- \`/P\`: Pauses after each screenful of text.
- \`/W\`: Displays listing in wide format across 5 columns.
\`\`\`text
C:\\> DIR /P
 Volume in drive C has no label.
 Directory of C:\\BCA
NOTES    TXT         4,096  10-19-24  10:30a
PROGRAMS <DIR>              10-19-24  11:15a
\`\`\`

### 2. Directory Navigation: \`MD\`, \`CD\`, \`RD\`
- **\`MD [path]\` (Make Directory)**: Creates a new folder.
  \`\`\`text
  C:\\> MD BCA_SEM1
  \`\`\`
- **\`CD [path]\` (Change Directory)**: Navigates to a target folder.
  \`\`\`text
  C:\\> CD BCA_SEM1
  C:\\BCA_SEM1> CD ..     (Moves one level up to parent directory)
  C:\\BCA_SEM1> CD \\      (Jumps straight to root C:\\)
  \`\`\`
- **\`RD [path]\` (Remove Directory)**: Deletes an empty directory.
  \`\`\`text
  C:\\> RD OLD_DATA
  \`\`\`

### 3. File Manipulation: \`COPY\`, \`DEL\`, \`REN\`, \`TYPE\`
- **\`COPY [source] [destination]\`**: Copies one or more files.
  \`\`\`text
  C:\\> COPY NOTES.TXT D:\\BACKUP\\
  \`\`\`
- **\`DEL [filename]\`**: Deletes a file permanently (does not go to Recycle Bin).
  \`\`\`text
  C:\\> DEL TEST.BAK
  \`\`\`
- **\`REN [old_name] [new_name]\`**: Renames a file.
  \`\`\`text
  C:\\> REN DRAFT.TXT FINAL.TXT
  \`\`\`
- **\`TYPE [filename]\`**: Displays the text content of a file on the screen.
  \`\`\`text
  C:\\> TYPE README.TXT
  \`\`\`

### 4. System Utility Commands: \`CLS\`, \`DATE\`, \`TIME\`, \`VER\`
- **\`CLS\`**: Clears the monitor screen and positions prompt at top-left.
- **\`DATE\`**: Displays and allows modifying the current system date.
- **\`TIME\`**: Displays and allows modifying the current system time.
- **\`VER\`**: Displays the active MS-DOS version number (e.g. \`MS-DOS Version 6.22\`).

---

## 4. Essential External DOS Commands

### 1. \`CHKDSK\` (Check Disk)
Examines the physical integrity of a disk drive and reports memory statistics.
- **Syntax**: \`CHKDSK [drive:] [/F]\`
- \`/F\`: Automatically fixes file allocation errors and converts lost chains into \`FILE0001.CHK\`.
\`\`\`text
C:\\> CHKDSK C: /F
   1,474,560 bytes total disk space
      45,056 bytes in 3 hidden files
   1,220,608 bytes available on disk
     655,360 total bytes memory
     620,128 bytes free
\`\`\`

### 2. \`FORMAT\` (Format Disk)
Prepares a disk for use by rewriting its boot sector, FAT tables, and root directory.
- **Syntax**: \`FORMAT [drive:] [/Q] [/S]\`
- \`/Q\`: Quick format (erases directory tables without scanning bad sectors).
- \`/S\`: Creates a bootable system disk by copying \`IO.SYS\`, \`MSDOS.SYS\`, and \`COMMAND.COM\`.

### 3. \`ATTRIB\` (File Attributes)
Displays or modifies the four standard DOS file attributes:
- \`+R\` / \`-R\`: Set / Remove **Read-Only** attribute.
- \`+H\` / \`-H\`: Set / Remove **Hidden** attribute.
- \`+S\` / \`-S\`: Set / Remove **System** attribute.
- \`+A\` / \`-A\`: Set / Remove **Archive** attribute.
\`\`\`text
C:\\> ATTRIB +R +H SECRET.DAT
C:\\> ATTRIB SECRET.DAT
A  R H       C:\\SECRET.DAT
\`\`\`

### 4. \`XCOPY\` (Extended Copy)
Copies complete directory trees, including all subdirectories and files.
- **Syntax**: \`XCOPY C:\\SOURCE D:\\BACKUP /S /E\`
- \`/S\`: Copies directories and subdirectories (excluding empty ones).
- \`/E\`: Copies all subdirectories, even if empty.

### 5. \`TREE\` (Directory Hierarchy)
Graphically displays the folder tree structure of a drive.
- **Syntax**: \`TREE [drive:] [/F]\`
- \`/F\`: Lists files in each directory alongside the folder branches.

---

## 5. Important Exam Points

> [!TIP]
> In university exams (Section B 5 Marks or Section C 10 Marks):
> Always provide **exact command syntax** and an **example with switches** for 5 internal and 5 external commands.
> - Mention why \`DIR /P\` is used (paginated display for long lists).
> - Explain the difference between \`COPY\` (single files) and \`XCOPY\` (recursive directory trees).

---

## 6. Quick Revision
- **Internal**: Built into \`COMMAND.COM\` (\`DIR\`, \`CD\`, \`MD\`, \`COPY\`, \`DEL\`, \`CLS\`).
- **External**: Independent disk binaries (\`CHKDSK.EXE\`, \`FORMAT.COM\`, \`XCOPY.EXE\`, \`ATTRIB.EXE\`).
- **ATTRIB Flags**: Read-only (\`R\`), Hidden (\`H\`), System (\`S\`), Archive (\`A\`).
- **XCOPY**: Powerful recursive folder copy with \`/S\` and \`/E\` flags.`,
  },
  {
    id: "bca-101n-u2-art-06",
    topicTitle: "Windows GUI Management: Desktop Features, Taskbar, Explorer & System Controls",
    title: "Windows GUI Management: Desktop Features, Taskbar, Explorer & System Controls",
    sortOrder: 6,
    body: `# Windows GUI Management: Desktop Features, Taskbar, Explorer & System Controls

## 1. Simple Explanation
While MS-DOS required memorizing exact command syntax, Microsoft Windows introduced the **Graphical User Interface (GUI)** based on the **WIMP paradigm** (Windows, Icons, Menus, Pointer). Instead of typing \`DEL FILE.TXT\`, users simply drag a document icon into the Recycle Bin.

Windows provides a standardized environment where every window shares common controls (minimize, maximize, close buttons), files are managed visually through File Explorer, and system hardware is configured through the Control Panel and Task Manager.

---

## 2. Core Components of the Windows Desktop Environment

\`\`\`
+-------------------------------------------------------------------------+
| [My Computer]  [Recycle Bin]    [Network]                               |
|                                                                         |
|                                                                         |
|                          THE DESKTOP WORKSPACE                          |
|                                                                         |
|                                                                         |
| +---------------------------------------------------------------------+ |
| | [Start] | [Pinned Apps] | [Running Window Tabs] | [Tray: Audio, WiFi, Clock] |
| +---------------------------------------------------------------------+ |
+-------------------------------------------------------------------------+
\`\`\`

1. **The Desktop**: The root working canvas displaying wallpapers, desktop shortcuts, files, and system icons (This PC, Recycle Bin, Network).
2. **The Taskbar**: The persistent horizontal strip anchored at the bottom of the screen containing:
   - **Start Button**: Gateway to all installed applications, settings, and power options (Shut Down, Restart, Sleep).
   - **Task Switcher / Active App Tabs**: Shows buttons for currently running programs; clicking toggles window focus.
   - **System Tray (Notification Area)**: Displays background utility icons (volume, Wi-Fi connection, battery, antivirus status) and the real-time clock.
3. **Icons**: Visual graphical representations of programs, files, folders, or hardware devices. Clicking an icon opens the associated object.

---

## 3. Window Structure & Manipulation Controls

Every application window in Windows follows a standardized layout:
- **Title Bar**: Displays document/app name and window controls:
  - **Minimize ($\\_$)**: Hides the window into the taskbar while keeping the process running.
  - **Maximize / Restore ($\\square$)**: Expands window to fill the entire monitor or restores previous window dimensions.
  - **Close ($\\times$)**: Terminates the application and frees its memory.
- **Menu Bar / Ribbon**: Categorized commands (\`File\`, \`Edit\`, \`View\`, \`Help\`).
- **Scroll Bars**: Vertical and horizontal sliders to navigate documents larger than the screen.

---

## 4. File, Folder & Drive Management (File Explorer)

**File Explorer** (formerly Windows Explorer) is the central file management utility.

\`\`\`
+-------------------------------------------------------------------------+
| FILE EXPLORER HIERARCHICAL TREE                                         |
+------------------------------+------------------------------------------+
| NAVIGATION PANE (Tree View)  | CONTENT PANE (Files & Folders)           |
| > Quick Access               | [Folder] Documents                       |
| v This PC                    | [Folder] Downloads                       |
|   v Local Disk (C:)          | [Folder] Pictures                        |
|     > Program Files          | [File]   BCA_Notes.docx (42 KB)          |
|     > Users                  | [File]   Syllabus.pdf   (1.2 MB)         |
|     > Windows                |                                          |
|   > Data Disk (D:)           |                                          |
+------------------------------+------------------------------------------+
\`\`\`

### Fundamental File Operations
- **Creating**: Right-click $\\rightarrow$ New $\\rightarrow$ Folder or File.
- **Moving / Copying**: Drag-and-drop or keyboard shortcuts (\`Ctrl+C\` to copy, \`Ctrl+X\` to cut, \`Ctrl+V\` to paste).
- **Renaming**: Select item and press \`F2\`, or slow double-click on title.
- **Deleting & Recycle Bin**:
  - \`Delete\` key: Moves files to the **Recycle Bin** on local drives, allowing accidental deletions to be restored.
  - \`Shift + Delete\`: Bypasses the Recycle Bin and deletes files **permanently**.

---

## 5. System Administration: Control Panel & Task Manager

### 1. Control Panel / Windows Settings
The centralized administrative interface for configuring hardware and system software:
- **Programs & Features**: Installing and cleanly uninstalling application software.
- **Device Manager**: Inspecting hardware driver status, resolving IRQ conflicts, updating display/audio drivers.
- **User Accounts**: Creating administrator vs. standard user accounts with passwords and access privileges.
- **Network & Sharing Center**: Setting up IP addresses, DNS servers, and Wi-Fi adapters.

### 2. Windows Task Manager
Accessed via \`Ctrl + Shift + Esc\` or right-clicking the Taskbar:
- **Processes Tab**: Real-time telemetry on CPU, RAM, Disk, Network, and GPU usage per running application.
- **Performance Tab**: Live graphical graphs of processor frequency and memory utilization.
- **Process Termination (\`End Task\`)**: Forcibly closes frozen or unresponsive programs that have stopped responding to the OS.

---

## 6. Comparison: Windows GUI vs. DOS CLI

| Feature | Windows GUI | MS-DOS CLI |
| :--- | :--- | :--- |
| **Interface** | Visual graphics (Windows, Icons, Mouse pointer) | Text characters only on a black screen |
| **Multitasking** | True preemptive multitasking (multiple apps run concurrently) | Single-tasking (only one program at a time) |
| **Memory Limit** | Multi-gigabyte virtual memory (64-bit addresses) | 640 KB conventional memory limit |
| **Hardware Plug-and-Play** | Automatic hardware detection and driver configuration | Manual hardware jumpers and \`CONFIG.SYS\` drivers |

---

## 7. Important Exam Points

> [!TIP]
> In university examinations:
> - **Recycle Bin Concept**: Explain that files deleted from USB drives or network shares do **not** go to the Recycle Bin.
> - **Task Manager**: Describe its two main uses: monitoring live resource usage and terminating hung applications using **End Task**.

---

## 8. Quick Revision
- **WIMP**: Windows, Icons, Menus, Pointer.
- **Taskbar**: Contains Start button, active app tabs, and System Tray notification area.
- **File Explorer**: Hierarchical tree navigation of disks and folders.
- **Recycle Bin**: Temporary holding area; \`Shift+Delete\` permanently deletes.
- **Task Manager**: Real-time process monitor and \`End Task\` recovery tool.`,
  },
  {
    id: "bca-101n-u2-art-07",
    topicTitle: "Computer Malware, Viruses & Antivirus Defense Strategies",
    title: "Computer Malware, Viruses & Antivirus Defense Strategies",
    sortOrder: 7,
    body: `# Computer Malware, Viruses & Antivirus Defense Strategies

## 1. Simple Explanation
Just as biological viruses invade living cells and make copies of themselves, a **computer virus** is a malicious piece of code that attaches itself to legitimate software and replicates across disks and computer networks.

The umbrella term for all intrusive, hostile software is **Malware** (Malicious Software), which includes viruses, worms, Trojan horses, ransomware, and spyware.

---

## 2. Exam-Ready Definition

> [!IMPORTANT]
> **Definition:** A **Computer Virus** is a malicious, self-replicating program designed to alter the normal operation of a computer, attach its payload to host executable files or boot sectors, corrupt or delete data, and spread across systems without the user\'s informed consent.

---

## 3. Comprehensive Classification of Computer Malware

\`\`\`
                                  MALWARE TAXONOMY
                                         |
     +---------------+-------------------+-------------------+---------------+
     |               |                   |                   |               |
VIRUSES            WORMS               TROJAN HORSES       RANSOMWARE      SPYWARE
- Boot Sector      - Standalone code   - Masquerades as    - Encrypts user - Covertly logs
- File Infector    - Self-spreads via    legitimate app      files; demands  keystrokes &
- Macro Virus        network sockets   - Installs hidden     cryptocurrency  passwords
- Polymorphic        (e.g., Conficker)   backdoors           ransom
\`\`\`

### 1. Boot Sector Viruses
- **Target**: Infects the Master Boot Record (MBR) or partition boot sector of floppy disks and hard drives.
- **Mechanism**: The virus code executes during the initial boot sequence before the operating system and antivirus software load into RAM.
- **Famous Examples**: *Brain* (1986, the first IBM PC virus), *Michelangelo*, *Stoned*.

### 2. File Infector Viruses
- **Target**: Executable binary files (\`.EXE\`, \`.COM\`, \`.SYS\`, \`.DLL\`).
- **Mechanism**: Appends or prepends virus machine code to the host program. When the user runs the host application, the virus executes first, infects other disk files, and then returns control to the original program.
- **Famous Examples**: *Jerusalem*, *CIH (Chernobyl)*.

### 3. Macro Viruses
- **Target**: Documents containing embedded macro scripts (Microsoft Word \`.doc\`, Excel \`.xls\`).
- **Mechanism**: Written in high-level macro languages (Visual Basic for Applications - VBA). When a user opens an infected document, the macro runs automatically and infects global document templates (\`Normal.dot\`).
- **Famous Examples**: *Melissa*, *Concept*.

### 4. Polymorphic & Metamorphic Viruses
- **Mechanism**: Every time the virus infects a new file, it encrypts its payload with a completely different cryptographic key and mutates its decryption engine.
- **Defense Challenge**: Simple signature-based string scanning cannot detect it because the binary byte pattern changes with every infection.

### 5. Worms vs. Trojan Horses
- **Worm**: A standalone program that does **not need a host file**. It scans local networks and replicates autonomously across open ports and vulnerabilities (e.g. *Morris Worm*, *ILOVEYOU*, *WannaCry*).
- **Trojan Horse**: Named after the ancient Greek myth, a Trojan masquerades as a useful utility (like a free game or cracked software) while secretly opening unauthorized backdoor ports for remote hackers.

---

## 4. The Four Phases of a Virus Life Cycle

\`\`\`
+----------------+      +--------------------+      +------------------+      +---------------+
| 1. DORMANT     | ---> | 2. PROPAGATION     | ---> | 3. TRIGGERING    | ---> | 4. EXECUTION  |
| Virus sits idle|      | Makes copies into  |      | Pre-set condition|      | Delivers its  |
| waiting for key|      | files, boot sectors|      | satisfied (e.g., |      | payload: file |
| trigger event  |      | & shared disks     |      | Friday the 13th) |      | damage/wiping |
+----------------+      +--------------------+      +------------------+      +---------------+
\`\`\`

1. **Dormant Phase**: The virus remains inactive, avoiding detection by users and antivirus scanners.
2. **Propagation Phase**: The virus duplicates itself, attaching copies to other programs, boot sectors, or network shares.
3. **Triggering Phase**: A predefined logical condition activates the virus (e.g., a specific calendar date, elapsed run count, or system reboot).
4. **Execution Phase**: The virus executes its **payload**, which may range from displaying harmless screen pranks to wiping hard drive partitions or encrypting files for ransom.

---

## 5. Antivirus Detection Technologies

Modern **Antivirus Software** employs multiple defense layers to neutralize threats:

1. **Signature-Based Scanning**:
   - The scanner extracts a sequence of binary bytes (the "signature" or hash) from files and compares them against a database of known malware patterns.
   - Requires continuous daily updates of virus definition files.
2. **Heuristic Analysis**:
   - Analyzes file code for suspicious instructional patterns, such as attempting to write to the Master Boot Record, modify system registry run keys, or hook keyboard interrupts.
   - Detects brand new ("Zero-Day") viruses before signature updates exist.
3. **Behavioral Monitoring & Sandboxing**:
   - Suspicious files are executed in an isolated, secure virtual environment (sandbox) to observe their real-time behavior (file tampering, network outbound sockets) before allowing them onto the physical machine.

---

## 6. Comparison: Virus vs. Worm vs. Trojan Horse

| Feature | Computer Virus | Computer Worm | Trojan Horse |
| :--- | :--- | :--- | :--- |
| **Host File Dependency** | **Yes** (Must attach to host .EXE or document) | **No** (Standalone independent program) | **No** (Disguised as a complete standalone app) |
| **Self-Replication** | Replicates by infecting files when executed | Replicates autonomously across networks | Does not replicate on its own |
| **Human Intervention** | Requires human to launch infected host program | Spreads automatically without human action | Requires human to download and install |
| **Primary Danger** | Corrupts files, deletes data | Consumes network bandwidth, installs backdoors | Steals passwords, provides remote access |

---

## 7. Important Exam Points

> [!TIP]
> High-scoring points for university exams:
> - **Infection Vectors**: Unverified email attachments, pirated software cracks, infected USB flash drives, and unpatched operating system network vulnerabilities.
> - **Antivirus Prevention Rules**: Keep real-time antivirus definitions updated, avoid running executables from untrusted email sources, enable firewall protection, and maintain regular offline backups.

---

## 8. Quick Revision
- **Malware**: All hostile software (viruses, worms, trojans, ransomware).
- **Boot Sector Virus**: Infects disk MBR and executes before the OS loads (e.g. *Brain*).
- **Macro Virus**: Infects Office documents using VBA scripts (e.g. *Melissa*).
- **Worm**: Standalone program that replicates across networks without a host.
- **Trojan Horse**: Masquerades as legitimate software with hidden malicious backdoor.
- **Antivirus Layers**: Signature database $\\rightarrow$ Heuristic analysis $\\rightarrow$ Sandboxing.`,
  },
];

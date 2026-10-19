# BCA-205N: Operating System
## Unit 2 Master Exam Revision Notes: Process Management, CPU Scheduling & Threads
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `0208c6e1-bb32-524b-a374-2ad1b17373fe` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Process Concept: Process Definition, Program vs Process, Memory Layout (Text, Data, Stack, Heap Segments)**
- [x] **Process States & 5-State Transition Model: New, Ready, Running, Waiting (Blocked), Terminated**
- [x] **Process Control Block (PCB): Structure, Task Attributes (PID, Program Counter, CPU Registers, Memory Limits, Open Files)**
- [x] **Process Context Switching: Hardware State Saving, Cache Invalidation Overhead, Performance Impact**
- [x] **Process Scheduling Queues: Job Queue, Ready Queue, Device/I/O Queues, Queue Transition Flow**
- [x] **Schedulers in Operating Systems: Long-Term (Admission), Short-Term (CPU), Medium-Term (Swapping) Schedulers**
- [x] **Process Creation & Termination: Process Trees, parent-child Relationships, fork() and exec() System Calls, Zombie/Orphan Processes**
- [x] **Threads Fundamentals: Definition, Light-Weight Processes (LWP), Resource Sharing Benefits, Thread vs Process**
- [x] **Multithreading Models: Many-to-One, One-to-One (Standard in Linux/Windows), Many-to-Many Kernel Models**
- [x] **CPU Scheduling Concepts: Preemptive vs Non-Preemptive Scheduling Policies, Dispatcher Latency**
- [x] **Scheduling Criteria: CPU Utilization, Throughput, Turnaround Time, Waiting Time, Response Time**
- [x] **First-Come, First-Served (FCFS) Scheduling: Algorithm, Convoy Effect, Average Waiting Time Evaluation**
- [x] **Shortest Job First (SJF) Scheduling: Non-Preemptive SJF, Preemptive SJF (Shortest Remaining Time First - SRTF), Starvation**
- [x] **Priority Scheduling: Static vs Dynamic Priorities, Internal vs External Priorities, Starvation & Aging Solution**
- [x] **Round Robin (RR) Scheduling: Time Quantum Selection Trade-offs, Response Time Optimization, Context Switch Overhead**
- [x] **Multilevel Queue & Multilevel Feedback Queue Scheduling: Separation of Foreground/Background Processes, Feedback Upgrading**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define a Process and compare it with a Program.
**Model Answer:**
A **Program** is a passive entity stored on secondary storage (such as an executable file `a.out` or `.exe`).
A **Process** is an active entity—a program in execution—with its own Program Counter, CPU registers, stack, heap, and address space assigned by the OS.

### Q2. [2 Marks] What are the 5 states of a process in the standard state transition model?
**Model Answer:**
1. **New:** The process is being created and its PCB is being allocated.
2. **Ready:** The process is loaded in main memory and waiting for the CPU scheduler to allocate processor time.
3. **Running:** Instructions are actively executing on the CPU core.
4. **Waiting (Blocked):** The process cannot execute until an external event (I/O completion or signal) occurs.
5. **Terminated:** The process has finished execution and OS is reclaiming its resources.

### Q3. [2 Marks] What is a Process Control Block (PCB)? List four essential fields in it.
**Model Answer:**
The **PCB** (also called Task Descriptor) is the kernel data structure maintaining complete execution context for a process. Key fields include:
1. **PID:** Unique Process Identifier.
2. **Process State:** New, Ready, Running, Waiting, or Terminated.
3. **Program Counter (PC):** Memory address of the next instruction to execute.
4. **CPU Registers:** Accumulators, index registers, stack pointer.
5. **Memory Management Information:** Page tables or base/limit registers.
6. **I/O Status Information:** List of open file descriptors and allocated devices.

### Q4. [2 Marks] Define Context Switching and explain why it is considered pure overhead.
**Model Answer:**
A **Context Switch** is the procedure where the OS saves the complete execution context (registers, PC, stack pointer) of the currently running process into its PCB and restores the saved state of another ready process to CPU registers.
It is **pure overhead** because the CPU performs zero useful computational user work during the context switch.

### Q5. [2 Marks] Differentiate between Preemptive and Non-Preemptive CPU Scheduling.
**Model Answer:**
In **Non-Preemptive Scheduling**, once the CPU is allocated to a process, it holds the CPU until it voluntarily terminates or yields to wait for I/O.
In **Preemptive Scheduling**, the OS can forcibly interrupt and suspend a running process (via hardware timer interrupts or priority events) to allocate the CPU to a higher-priority or newly arrived process.

### Q6. [2 Marks] What is the Convoy Effect in First-Come-First-Served (FCFS) scheduling?
**Model Answer:**
The **Convoy Effect** occurs in FCFS when a single heavy, CPU-bound process occupies the CPU for a long burst, causing all subsequent short, I/O-bound processes to sit idle in the Ready Queue, resulting in terrible average waiting times and poor device utilization.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare Processes and Threads with respect to memory sharing, creation overhead, and context switching.
**Model Answer:**
### Process vs Thread Comparison

```
              Single-Threaded Process                     Multi-Threaded Process
       +------------------------------------+      +------------------------------------+
       | Code Segment    | Data Segment     |      | Code Segment    | Data Segment     |
       | Heap Segment    | Open Files       |      | Heap Segment    | Open Files       |
       +------------------------------------+      +------------------------------------+
       | Thread 1 Stack  | Thread 1 Regs    |      | Th1 Stack | Th2 Stack | Th3 Stack  |
       +------------------------------------+      | Th1 Regs  | Th2 Regs  | Th3 Regs   |
                                                   +------------------------------------+
```

| Dimension | Process (Heavyweight) | Thread (Lightweight Process - LWP) |
| :--- | :--- | :--- |
| **Address Space** | Isolated, private address space. Process A cannot write to Process B's memory. | Threads within the same process share code, data, heap, and open file descriptors. |
| **Stack & Registers** | Private stack and register state. | Each thread possesses its own private stack and register set (PC, SP). |
| **Creation Cost** | High; requires cloning page tables, file descriptor tables, and address space. | Low; only requires allocating a small execution stack and thread control block (TCB). |
| **Context Switch Overhead** | Heavy; requires invalidating TLB (Translation Lookaside Buffer) and switching page tables. | Minimal; page table remains identical; only registers and stack pointers are swapped. |
| **Communication** | Requires explicit IPC (pipes, sockets, shared memory). | Direct communication via shared global variables and heap objects. |

### Q2. [5 Marks] Explain the three types of Schedulers in an Operating System: Long-Term, Short-Term, and Medium-Term.
**Model Answer:**
### Operating System Schedulers

```
   [Job Pool on Disk]
           |
      Long-Term Scheduler (Admission)
           v
    [Ready Queue in RAM] <====== Medium-Term Scheduler (Swapping) =====> [Suspended Queue on Disk]
           |
      Short-Term Scheduler (CPU Dispatcher)
           v
         [CPU]
```

1. **Long-Term Scheduler (Job Scheduler):**
   - Determines which jobs are admitted from the secondary storage disk pool into main memory (Ready Queue).
   - Controls the **Degree of Multiprogramming** (number of processes concurrently in memory).
   - Must select a balanced mix of CPU-bound and I/O-bound processes. Executes relatively infrequently (seconds or minutes).
2. **Short-Term Scheduler (CPU Scheduler):**
   - Selects which process from the Ready Queue in RAM is granted the CPU core.
   - Executes extremely frequently (every 10–100 ms). Must be blisteringly fast to avoid scheduling bottleneck.
3. **Medium-Term Scheduler (Swapper):**
   - Temporarily removes (swaps out) partially executed processes from RAM to backing store (swap space on disk) during memory pressure or thrashing, and swaps them back when memory frees up.

### Q3. [5 Marks] Explain Round Robin (RR) CPU scheduling and discuss the critical trade-off in selecting the Time Quantum.
**Model Answer:**
### Round Robin (RR) Scheduling & Time Quantum Trade-offs

Round Robin is a preemptive scheduling algorithm designed specifically for time-sharing systems. The Ready Queue is treated as a circular FIFO queue. The CPU scheduler allocates a small unit of time called the **Time Quantum ($q$)** (typically 10–100 ms) to each process.

```
Ready Queue: [ P1 ] -> [ P2 ] -> [ P3 ] -> [ P4 ]
               |
             Takes CPU for at most 'q' time units.
             If CPU Burst > q: Timer Interrupt -> Context Switch -> P1 appended to tail.
             If CPU Burst <= q: P1 voluntarily terminates/yields -> Scheduler picks P2.
```

#### Time Quantum Selection Trade-off:
1. **If Time Quantum $q$ is extremely large ($q \to \infty$):**
   - Round Robin degenerates into **FCFS (First-Come, First-Served)**.
   - Response time degrades drastically for interactive short jobs.
2. **If Time Quantum $q$ is extremely small ($q \approx 0$):**
   - Termed *Processor Sharing*. The CPU appears to run all $n$ processes simultaneously at $1/n$th speed.
   - However, **context switch overhead explodes**. If context switch takes 1 ms and quantum is 1 ms, the CPU wastes 50% of its total capacity switching tasks!
3. **Rule of Thumb:** Time quantum should be chosen such that **70%–80% of CPU bursts are shorter than $q$**.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Given the following set of 5 processes arriving at time 0, compute the Average Waiting Time (AWT) and Average Turnaround Time (ATAT) using: (a) FCFS, (b) Non-Preemptive SJF, and (c) Round Robin (Time Quantum = 4 ms). Draw Gantt Charts for each.
**Comprehensive University Solution:**
### Numerical Problem on CPU Scheduling Algorithms

#### Given Process Table:
| Process | Arrival Time ($AT$) | Burst Time ($BT$) |
| :---: | :---: | :---: |
| $P_1$ | 0 | 10 |
| $P_2$ | 0 | 4 |
| $P_3$ | 0 | 5 |
| $P_4$ | 0 | 2 |
| $P_5$ | 0 | 8 |

---

### (a) First-Come, First-Served (FCFS)

#### Gantt Chart:
```
|    P1 (10)    |  P2 (4)  |  P3 (5)  | P4 (2) |    P5 (8)    |
0              10         14         19       21             29
```

#### Calculation Table:
- $TAT = CT - AT = CT$
- $WT = TAT - BT$

| Process | $AT$ | $BT$ | Completion Time ($CT$) | $TAT$ | $WT$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $P_1$ | 0 | 10 | 10 | 10 | 0 |
| $P_2$ | 0 | 4 | 14 | 14 | 10 |
| $P_3$ | 0 | 5 | 19 | 19 | 14 |
| $P_4$ | 0 | 2 | 21 | 21 | 19 |
| $P_5$ | 0 | 8 | 29 | 29 | 21 |

- **Total Turnaround Time** = $10 + 14 + 19 + 21 + 29 = 93$ ms
- **Average Turnaround Time (ATAT)** = $\frac{93}{5} = \mathbf{18.6\text{ ms}}$
- **Total Waiting Time** = $0 + 10 + 14 + 19 + 21 = 64$ ms
- **Average Waiting Time (AWT)** = $\frac{64}{5} = \mathbf{12.8\text{ ms}}$

---

### (b) Non-Preemptive Shortest Job First (SJF)
Ordering by ascending Burst Time: $P_4 (2) \to P_2 (4) \to P_3 (5) \to P_5 (8) \to P_1 (10)$.

#### Gantt Chart:
```
| P4 (2) |  P2 (4)  |  P3 (5)  |    P5 (8)    |    P1 (10)    |
0        2          6         11             19             29
```

#### Calculation Table:
| Process | $BT$ | $CT$ | $TAT = CT$ | $WT = TAT - BT$ |
| :---: | :---: | :---: | :---: | :---: |
| $P_4$ | 2 | 2 | 2 | 0 |
| $P_2$ | 4 | 6 | 6 | 2 |
| $P_3$ | 5 | 11 | 11 | 6 |
| $P_5$ | 8 | 19 | 19 | 11 |
| $P_1$ | 10 | 29 | 29 | 19 |

- **Average Turnaround Time (ATAT)** = $\frac{2 + 6 + 11 + 19 + 29}{5} = \frac{67}{5} = \mathbf{13.4\text{ ms}}$
- **Average Waiting Time (AWT)** = $\frac{0 + 2 + 6 + 11 + 19}{5} = \frac{38}{5} = \mathbf{7.6\text{ ms}}$
*(Notice SJF yields mathematically optimal minimum average waiting time).*

---

### (c) Round Robin (Quantum $q = 4$ ms)

Queue progression:
1. $P_1$ runs 4 ms (rem 6) $\to$ queue: $P_2, P_3, P_4, P_5, P_1$
2. $P_2$ runs 4 ms (rem 0, finishes at 8) $\to$ queue: $P_3, P_4, P_5, P_1$
3. $P_3$ runs 4 ms (rem 1) $\to$ queue: $P_4, P_5, P_1, P_3$
4. $P_4$ runs 2 ms (rem 0, finishes at 14) $\to$ queue: $P_5, P_1, P_3$
5. $P_5$ runs 4 ms (rem 4) $\to$ queue: $P_1, P_3, P_5$
6. $P_1$ runs 4 ms (rem 2) $\to$ queue: $P_3, P_5, P_1$
7. $P_3$ runs 1 ms (rem 0, finishes at 23) $\to$ queue: $P_5, P_1$
8. $P_5$ runs 4 ms (rem 0, finishes at 27) $\to$ queue: $P_1$
9. $P_1$ runs 2 ms (rem 0, finishes at 29).

#### Gantt Chart:
```
| P1 | P2 | P3 | P4 | P5 | P1 | P3 | P5 | P1 |
0    4    8   12   14   18   22   23   27   29
```

#### Calculation Table:
| Process | $BT$ | $CT$ | $TAT$ | $WT$ |
| :---: | :---: | :---: | :---: | :---: |
| $P_1$ | 10 | 29 | 29 | 19 |
| $P_2$ | 4 | 8 | 8 | 4 |
| $P_3$ | 5 | 23 | 23 | 18 |
| $P_4$ | 2 | 14 | 14 | 12 |
| $P_5$ | 8 | 27 | 27 | 19 |

- **ATAT** = $\frac{29 + 8 + 23 + 14 + 27}{5} = \frac{101}{5} = \mathbf{20.2\text{ ms}}$
- **AWT** = $\frac{19 + 4 + 18 + 12 + 19}{5} = \frac{72}{5} = \mathbf{14.4\text{ ms}}$

### Q2. [10/15 Marks] Explain Multilevel Queue (MLQ) and Multilevel Feedback Queue (MLFQ) Scheduling. What problems in MLQ does MLFQ solve, and how?
**Comprehensive University Solution:**
### Multilevel Queue (MLQ) vs Multilevel Feedback Queue (MLFQ)

#### 1. Multilevel Queue (MLQ) Scheduling:
In an MLQ architecture, the Ready Queue is partitioned into multiple permanently separated priority queues based on process characteristics:

```
Priority Level 1 (Highest): [ System Processes Queue ]      --> Scheduled by RR (q=4ms)
                                     |
Priority Level 2:          [ Interactive / UI Queue ]      --> Scheduled by RR (q=8ms)
                                     |
Priority Level 3:          [ Interactive Editing Queue ]   --> Scheduled by RR (q=16ms)
                                     |
Priority Level 4 (Lowest):  [ Batch Background Queue ]      --> Scheduled by FCFS
```

- **Inflexibility & Major Flaw of MLQ:** Processes are permanently assigned to one queue upon arrival and cannot migrate. If high-priority queues are continuously populated, the batch queues suffer **infinite starvation**.

---

#### 2. Multilevel Feedback Queue (MLFQ) Scheduling:
MLFQ permits processes to dynamically move between queues based on their past CPU behavior, preventing starvation and self-optimizing response times.

```
                      +-------------------+
                      |   Newly Arrived   |
                      |     Processes     |
                      +-------------------+
                                |
                                v
               +---------------------------------+
Queue 0:       |  Quantum = 8 ms (Highest Pri)   |
               +---------------------------------+
                         | (Uses full 8 ms)
                         v
               +---------------------------------+
Queue 1:       |  Quantum = 16 ms (Medium Pri)   |
               +---------------------------------+
                         | (Uses full 16 ms)
                         v
               +---------------------------------+
Queue 2:       |      FCFS (Lowest Priority)     |
               +---------------------------------+
```

#### Operating Rules of MLFQ:
1. **Rule 1:** A newly created process enters Queue 0.
2. **Rule 2:** If the process completes within 8 ms, it exits quickly (rewarding interactive I/O-bound jobs with fast response times).
3. **Rule 3:** If the process exhausts its entire 8 ms quantum without yielding CPU, it is demoted to Queue 1.
4. **Rule 4:** If it exhausts 16 ms in Queue 1, it is further demoted to the lowest priority FCFS queue (Queue 2).
5. **Mitigating Starvation via Aging (Priority Boost):** To prevent starvation of long batch jobs in Queue 2, the OS periodically boosts all pending processes back to Queue 0 after a time threshold $S$.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
### Examiner Insights & University Exam Strategy:
1. **Guaranteed Numerical Question:** Expect a 10–15 mark numerical scheduling problem on FCFS, SJF (Preemptive/Non-preemptive), and Round Robin. Always draw clear Gantt charts with exact timestamps and show step-by-step calculations for Completion Time ($CT$), Turnaround Time ($TAT = CT - AT$), and Waiting Time ($WT = TAT - BT$).
2. **5-Mark Conceptuals:** Process vs Thread, PCB structure, or MLFQ rules are recurrent favorites.
3. **State Transition Diagram:** When asked about process states, always draw the standard 5-state transition diagram with labels for scheduler dispatch, timer interrupt, I/O wait, and I/O completion.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
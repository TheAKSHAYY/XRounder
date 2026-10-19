# BCA-205N: Operating System
## Unit 4 Master Exam Revision Notes: Process Synchronization, Concurrency & Deadlocks
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `a4e35aa8-a89b-5fbf-aa72-ac386118b06c` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Concurrent Processes: Cooperating vs Independent Processes, Shared Memory & Message Passing Communication**
- [x] **The Critical Section Problem: Race Conditions, Producer-Consumer Buffer Counter Problem**
- [x] **Requirements for Solutions to Critical Section: Mutual Exclusion, Progress, Bounded Waiting**
- [x] **Software Solutions: Peterson's Algorithm for Two Processes, Correctness Proof (Mutual Exclusion, Progress, Bounded Waiting)**
- [x] **Hardware-Assisted Synchronization: Atomic Instructions (Test-and-Set, Compare-and-Swap)**
- [x] **Semaphores: Dijkstra's Primitive, Counting Semaphores vs Binary Semaphores (Mutexes)**
- [x] **Semaphore Operations: wait() / P() and signal() / V() Atomic Implementations, Spinlock vs Blocking Semaphores**
- [x] **Classical Synchronization Problems: Bounded-Buffer (Producer-Consumer) Problem using Semaphores**
- [x] **The Readers-Writers Problem: Reader Priority vs Writer Priority, Starvation Mitigation**
- [x] **The Dining Philosophers Problem: Resource Allocation Deadlock, Deadlock-Free Symmetric Solutions**
- [x] **Monitors: High-Level Language Synchronization Construct, Condition Variables (wait, signal)**
- [x] **Deadlock Definition: Necessary Coffman Conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait)**
- [x] **Resource Allocation Graphs (RAG): Request Edges, Assignment Edges, Cycle Detection in Single vs Multi-Instance Systems**
- [x] **Deadlock Prevention: Negating Coffman Conditions (Eliminating Hold & Wait, Preempting Resources, Linear Ordering of Resources)**
- [x] **Deadlock Avoidance & Safe State: Concept of Safe Sequences, System Transition State Trajectory**
- [x] **Banker's Algorithm (Edsger Dijkstra): Data Structures (Available, Max, Allocation, Need), Safety and Resource-Request Algorithms**
- [x] **Deadlock Detection & Recovery: Wait-For Graphs for Single Instances, Matrix Detection Algorithm, Process Termination & Rollback**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define the Critical Section Problem in concurrent programming.
**Model Answer:**
A **Critical Section** is a code segment in a multi-process or multi-threaded program that accesses shared resources (such as shared variables, tables, or files). The critical section problem is to design an execution protocol ensuring that when one process is executing inside its critical section, no other process is allowed to execute inside its critical section.

### Q2. [2 Marks] State the three mandatory criteria for any valid Critical Section solution.
**Model Answer:**
1. **Mutual Exclusion:** If process $P_i$ is executing in its critical section, no other process can be executing in its critical section.
2. **Progress:** If no process is executing in its critical section and some processes wish to enter, only those processes not executing in their remainder sections can participate in deciding who enters next, and this selection cannot be postponed indefinitely.
3. **Bounded Waiting:** A bound must exist on the number of times other processes are allowed to enter their critical sections after a process has made a request to enter and before that request is granted.

### Q3. [2 Marks] Differentiate between Counting Semaphores and Binary Semaphores (Mutexes).
**Model Answer:**
A **Binary Semaphore (Mutex)** has an integer value restricted strictly to `0` or `1`, primarily used to enforce mutual exclusion across shared resources.
A **Counting Semaphore** can take any non-negative integer value over an unrestricted domain, primarily used to manage finite pools of multiple identical resource instances (e.g., a buffer pool with $N$ slots).

### Q4. [2 Marks] Define Deadlock and state the four Coffman Conditions.
**Model Answer:**
A **Deadlock** is a state where a set of processes are permanently blocked because each process holds resources and waits for other resources held by other processes in the same set.
**Four Necessary Coffman Conditions:**
1. **Mutual Exclusion:** At least one non-sharable resource held.
2. **Hold and Wait:** A process holds resources while requesting additional resources.
3. **No Preemption:** Resources cannot be forcibly seized; only voluntarily released.
4. **Circular Wait:** A closed cycle of processes exists: $P_0 \to P_1 \to \dots \to P_n \to P_0$.

### Q5. [2 Marks] What is the difference between Deadlock Prevention and Deadlock Avoidance?
**Model Answer:**
**Deadlock Prevention** statically imposes system-wide constraints on resource requests to invalidate at least one of the four Coffman conditions, often degrading resource utilization.
**Deadlock Avoidance** dynamically examines every resource request at runtime using advance knowledge of maximum resource demands (e.g., Banker's Algorithm) to ensure the system never transitions into an unsafe state.

### Q6. [2 Marks] What is a Safe State in deadlock management?
**Model Answer:**
A system state is **Safe** if there exists at least one **Safe Sequence** $\langle P_1, P_2, \dots, P_n \rangle$ such that for every process $P_i$, the maximum resources it may still request can be satisfied by the currently available resources plus the resources already held by all preceding processes $P_j$ (where $j < i$).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Present Peterson's Algorithm for two-process mutual exclusion and prove its correctness.
**Model Answer:**
### Peterson's Algorithm (Software Solution for Two Processes)

Peterson's Algorithm guarantees mutual exclusion, progress, and bounded waiting for two processes ($P_0$ and $P_1$) using shared variables:
```c
int turn;              // Indicates whose turn it is to enter CS
boolean flag[2];       // flag[i] = true indicates Pi is ready to enter CS
```

#### Process Structure for $P_i$ (where $j = 1 - i$):
```c
do {
    flag[i] = true;          // Declare intent to enter
    turn = j;                // Generously yield initial turn to competitor
    
    // Entry Section: Busy-wait while competitor wants in AND has turn
    while (flag[j] && turn == j);

    // CRITICAL SECTION
    /* Shared resource access occurs here */

    // Exit Section
    flag[i] = false;         // Relinquish access

    // REMAINDER SECTION
} while (true);
```

#### Correctness Proof:
1. **Mutual Exclusion:** For both $P_0$ and $P_1$ to be in their Critical Sections simultaneously, both `flag[0] == true` and `flag[1] == true`. But the variable `turn` can hold only one scalar value (`0` or `1`) at any single point in time. If `turn == 0`, $P_1$ loops in its `while`; if `turn == 1`, $P_0$ loops. Hence, mutual exclusion is strictly preserved.
2. **Progress:** If $P_1$ does not wish to enter, `flag[1] == false`, so $P_0$'s `while` condition immediately evaluates to false, allowing $P_0$ to enter without delay.
3. **Bounded Waiting:** Once $P_0$ sets `turn = 1`, it cannot overwrite `turn` again until it finishes its critical section. Thus, $P_1$ is guaranteed entry after at most one wait cycle.

### Q2. [5 Marks] Explain the Producer-Consumer Bounded-Buffer Problem and its solution using Semaphores.
**Model Answer:**
### Producer-Consumer (Bounded Buffer) Synchronization

#### System Setup:
- A shared circular buffer of fixed size $N$.
- A Producer process creates data items and places them in the buffer.
- A Consumer process removes items from the buffer and consumes them.

#### Semaphores Employed:
1. `mutex = 1` (Binary Semaphore ensuring mutually exclusive buffer access).
2. `empty = N` (Counting Semaphore tracking empty slots available).
3. `full = 0` (Counting Semaphore tracking filled slots available).

```c
// PRODUCER PROCESS                     // CONSUMER PROCESS
do {                                   do {
    // Produce item 'x'                     wait(full);   // Wait if buffer empty
    wait(empty);  // Wait if buffer full    wait(mutex);  // Lock buffer
    wait(mutex);  // Lock buffer
    
    // Add item 'x' to buffer               // Remove item 'y' from buffer
    buffer[in] = x;                         y = buffer[out];
    in = (in + 1) % N;                      out = (out + 1) % N;
    
    signal(mutex); // Unlock buffer         signal(mutex); // Unlock buffer
    signal(full);  // Increment filled      signal(empty); // Increment empty
    
} while (true);                        } while (true);
```

- **Race Condition Prevention:** The `mutex` ensures only one process writes to or reads from the buffer at any instant.
- **Buffer Overflow & Underflow Prevention:** `wait(empty)` blocks the producer when buffer is full ($empty = 0$), and `wait(full)` blocks the consumer when buffer is empty ($full = 0$).

### Q3. [5 Marks] Explain Resource Allocation Graphs (RAG) and how cycles correlate with deadlocks.
**Model Answer:**
### Resource Allocation Graph (RAG) Analysis

A Resource Allocation Graph is a directed bipartite graph $G = (V, E)$ where:
- Vertices $V$ are partitioned into **Processes** $P = \{P_1, P_2, \dots, P_n\}$ (circles) and **Resource Types** $R = \{R_1, R_2, \dots, R_m\}$ (rectangles containing dots for multiple instances).
- Edges $E$:
  - **Request Edge ($P_i \to R_j$):** Directed from process to resource type.
  - **Assignment Edge ($R_j \to P_i$):** Directed from a resource instance dot to process.

```
       ( P1 ) -----------------------> [ R1 (•) ]
         ^                                 |
         |                                 v
      [ R2 (•) ] <----------------------- ( P2 )
```

#### Cycle vs Deadlock Decision Rules:
1. **Single Instance per Resource Type:** A cycle in the graph is a **necessary AND sufficient** condition for deadlock. If a cycle exists, the system is deadlocked.
2. **Multiple Instances per Resource Type:** A cycle is a **necessary but NOT sufficient** condition. If a cycle exists, a deadlock *may* exist, but if external processes holding instances outside the cycle can terminate and release resources, the cycle can break naturally without deadlock.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Solve the Banker's Algorithm problem: Consider 5 processes (P0 to P4) and 3 resource types (A, B, C) with total system instances A=10, B=5, C=7. Given the Allocation and Max matrices below, determine: (1) Is the system in a safe state? Find the safe sequence. (2) If a request from P1 arrives for (1, 0, 2), can the request be granted immediately?
**Comprehensive University Solution:**
### Comprehensive Numerical: Dijkstra's Banker's Algorithm

#### System Configuration:
- Total Resource Instances: $A = 10, B = 5, C = 7$

#### Current State Tables:
| Process | Allocation (A B C) | Max (A B C) |
| :---: | :---: | :---: |
| $P_0$ | 0 1 0 | 7 5 3 |
| $P_1$ | 2 0 0 | 3 2 2 |
| $P_2$ | 3 0 2 | 9 0 2 |
| $P_3$ | 2 1 1 | 2 2 2 |
| $P_4$ | 0 0 2 | 4 3 3 |

---

### Step 1: Calculate Need Matrix and Initial Available Vector

$$\text{Need}[i] = \text{Max}[i] - \text{Allocation}[i]$$

| Process | Allocation | Max | Need = Max - Allocation |
| :---: | :---: | :---: | :---: |
| $P_0$ | 0 1 0 | 7 5 3 | **7 4 3** |
| $P_1$ | 2 0 0 | 3 2 2 | **1 2 2** |
| $P_2$ | 3 0 2 | 9 0 2 | **6 0 0** |
| $P_3$ | 2 1 1 | 2 2 2 | **0 1 1** |
| $P_4$ | 0 0 2 | 4 3 3 | **4 3 1** |

$$\text{Total Allocated} = (0+2+3+2+0, 1+0+0+1+0, 0+0+2+1+2) = (7, 2, 5)$$
$$\text{Available} = \text{Total} - \text{Allocated} = (10-7, 5-2, 7-5) = \mathbf{(3, 3, 2)}$$

---

### Step 2: Safety Algorithm Execution
Initialize: $\text{Work} = (3, 3, 2)$, $\text{Finish}[i] = \text{False}$ for all $i$.

1. **Check $P_0$:** Need $(7, 4, 3) \le \text{Work} (3, 3, 2)$? **No.** ($P_0$ must wait).
2. **Check $P_1$:** Need $(1, 2, 2) \le \text{Work} (3, 3, 2)$? **Yes.**
   - $P_1$ executes and finishes.
   - $\text{Work} = \text{Work} + \text{Alloc}(P_1) = (3, 3, 2) + (2, 0, 0) = \mathbf{(5, 3, 2)}$.
   - $\text{Finish}[P_1] = \text{True}$.
3. **Check $P_3$:** Need $(0, 1, 1) \le \text{Work} (5, 3, 2)$? **Yes.**
   - $P_3$ executes and finishes.
   - $\text{Work} = (5, 3, 2) + (2, 1, 1) = \mathbf{(7, 4, 3)}$.
   - $\text{Finish}[P_3] = \text{True}$.
4. **Check $P_4$:** Need $(4, 3, 1) \le \text{Work} (7, 4, 3)$? **Yes.**
   - $P_4$ executes and finishes.
   - $\text{Work} = (7, 4, 3) + (0, 0, 2) = \mathbf{(7, 4, 5)}$.
   - $\text{Finish}[P_4] = \text{True}$.
5. **Check $P_0$:** Need $(7, 4, 3) \le \text{Work} (7, 4, 5)$? **Yes.**
   - $P_0$ executes and finishes.
   - $\text{Work} = (7, 4, 5) + (0, 1, 0) = \mathbf{(7, 5, 5)}$.
   - $\text{Finish}[P_0] = \text{True}$.
6. **Check $P_2$:** Need $(6, 0, 0) \le \text{Work} (7, 5, 5)$? **Yes.**
   - $P_2$ executes and finishes.
   - $\text{Work} = (7, 5, 5) + (3, 0, 2) = \mathbf{(10, 5, 7)}$.
   - $\text{Finish}[P_2] = \text{True}$.

**Conclusion for Part (1):** All processes finish. **The system is in a SAFE STATE.**  
**Safe Sequence:** $\mathbf{\langle P_1, P_3, P_4, P_0, P_2 \rangle}$ (or $\langle P_1, P_3, P_0, P_2, P_4 \rangle$).

---

### Step 3: Handling Resource Request: $P_1$ requests $(1, 0, 2)$
1. Check: $\text{Request}_1 (1, 0, 2) \le \text{Need}_1 (1, 2, 2)$? **Yes.**
2. Check: $\text{Request}_1 (1, 0, 2) \le \text{Available} (3, 3, 2)$? **Yes.**
3. Temporarily allocate resources to $P_1$:
   - $\text{Available}' = (3, 3, 2) - (1, 0, 2) = \mathbf{(2, 3, 0)}$
   - $\text{Allocation}_1' = (2, 0, 0) + (1, 0, 2) = \mathbf{(3, 0, 2)}$
   - $\text{Need}_1' = (1, 2, 2) - (1, 0, 2) = \mathbf{(0, 2, 0)}$

4. Run Safety Algorithm on modified state with $\text{Work} = (2, 3, 0)$:
   - $P_1$: Need $(0, 2, 0) \le (2, 3, 0)$? **Yes!**
     - $\text{Work} = (2, 3, 0) + (3, 0, 2) = \mathbf{(5, 3, 2)}$.
   - Now with $\text{Work} = (5, 3, 2)$, $P_3$ can finish $\to \text{Work} = (7, 4, 3)$, then $P_4, P_0, P_2$ can finish exactly as before.

**Conclusion for Part (2):** A safe sequence $\langle P_1, P_3, P_4, P_0, P_2 \rangle$ exists.  
**Therefore, the request from $P_1$ can be GRANTED IMMEDIATELY.**

### Q2. [10/15 Marks] Analyze Classical Concurrency Problems: Describe the Dining Philosophers Problem and the Readers-Writers Problem. Discuss starvation issues and present deadlock-free solutions for each.
**Comprehensive University Solution:**
### Classical Synchronization Problems

---

### 1. The Dining Philosophers Problem
Five philosophers sit around a circular table with 5 chopsticks (chopsticks $0$ to $4$). Each philosopher alternates between thinking and eating. To eat, a philosopher requires both their left and right chopsticks.

```
                  Philosopher 0
                     ( P0 )
            chopstick 4 /  \ chopstick 0
                      /      \
               ( P4 )          ( P1 )
                   |            |
         chopstick 3            chopstick 1
                      \      /
            chopstick 2 \  /
                     ( P3 ) -- ( P2 )
```

#### Deadlock Risk:
If all 5 philosophers get hungry simultaneously and pick up their left chopstick at the exact same instant, every chopstick is held and each philosopher waits indefinitely for their right chopstick. A circular wait deadlock occurs.

#### Deadlock-Free Solutions:
1. **Asymmetric Philosopher Protocol:** Odd-numbered philosophers pick up their Left chopstick first, then Right. Even-numbered philosophers pick up their Right chopstick first, then Left. This breaks circular wait symmetry.
2. **Limit Room Capacity:** Allow at most 4 philosophers to sit at the table simultaneously using a counting semaphore initialized to 4.
3. **Monitor / State Solution:** Allow a philosopher to pick up chopsticks only if both neighbors are not eating (`state[LEFT] != EATING && state[RIGHT] != EATING`).

---

### 2. The Readers-Writers Problem
A shared database or file is accessed concurrently by multiple reader processes (which only read) and writer processes (which update data).
- Multiple readers can read simultaneously.
- Only one writer can write at a time (exclusive lock).
- No reader can read while a writer is writing.

#### Reader-Preference Solution & The Starvation Dilemma:
```c
// READER PROCESS
wait(mutex);
read_count++;
if (read_count == 1)
    wait(rw_mutex); // First reader locks out writers
signal(mutex);

// READING OCCURS HERE

wait(mutex);
read_count--;
if (read_count == 0)
    signal(rw_mutex); // Last reader unlocks writers
signal(mutex);
```

- **Starvation Problem:** In the Reader-Preference model, as long as at least one reader is active, subsequent readers can enter. A steady stream of incoming readers causes **writer starvation** indefinitely.
- **Fair / Writer-Preference Solution:** Introduce a queueing semaphore `queue` that preserves FIFO order. When a writer arrives, it holds `queue`, preventing newly arriving readers from jumping ahead until the writer has finished.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
### Examiner Insights & University Exam Strategy:
1. **Definite Banker's Algorithm Question:** A 10–15 mark numerical on Banker's Algorithm is guaranteed in the exam. Always show Need matrix calculation, state Work vector progression clearly, write the complete Safe Sequence, and verify the resource-request condition.
2. **Peterson's Algorithm:** Frequently asked as a 5-mark question; write the complete C structure and prove all three criteria (Mutual Exclusion, Progress, Bounded Waiting).
3. **Dining Philosophers / Readers-Writers:** Illustrate with clear diagrams and show how asymmetric access or counting semaphores eliminate deadlocks.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
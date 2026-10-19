# BCA-205N: Operating System
## Unit 5 Master Exam Revision Notes: File Systems, Secondary Storage Management & Disk Scheduling
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `140212af-3260-552c-9308-e371e626b20e` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **File Concept: Logical Storage Abstraction, File Attributes (Name, Identifier, Type, Location, Size, Protection)**
- [x] **File Operations: Create, Open, Read, Write, Seek/Reposition, Delete, Truncate, Close**
- [x] **File Access Methods: Sequential Access (Tape/Card Model), Direct / Random Access (Fixed-Length Records), Indexed Access**
- [x] **Directory Structures: Single-Level Directory, Two-Level Directory, Tree-Structured Hierarchical Directory**
- [x] **Acyclic-Graph & General Graph Directories: Hard Links vs Symbolic (Soft) Links, Shared Subdirectories, Reference Cycles**
- [x] **File System Mounting & File Protection: Access Control Lists (ACL), Unix Permission Bits (Read, Write, Execute for Owner, Group, Others)**
- [x] **File Allocation Methods: Contiguous Allocation (External Fragmentation, Compaction, File Growth Issues)**
- [x] **Linked Allocation: Pointer-Chained Disk Blocks, No External Fragmentation, Elimination of Random Access**
- [x] **Indexed Allocation: Direct Index Blocks, Multi-Level Indexing, Combined Schemes (UNIX Inode Architecture)**
- [x] **Free Space Management: Bit Vector (Bitmap), Linked Free List, Grouping, Counting Methods**
- [x] **Physical Disk Geometry: Platters, Surfaces, Tracks, Sectors, Cylinders, Read/Write Heads, Rotational Latency, Seek Time**
- [x] **Disk Head Scheduling Concept: Minimizing Seek Time and Head Travel Distance Across Cylinders**
- [x] **First-Come, First-Served (FCFS) Disk Scheduling: Algorithm, Head Traversal Calculation, Fair but Suboptimal Performance**
- [x] **Shortest Seek Time First (SSTF) Disk Scheduling: Algorithm, Head Traversal Calculation, Starvation Risks for Outlying Requests**
- [x] **SCAN (Elevator) Scheduling: Unidirectional Cylinder Traversal to Boundary, Boundary Reversal**
- [x] **C-SCAN (Circular SCAN) Scheduling: Unidirectional Sweep with Immediate Return to Start, Uniform Waiting Time Distribution**
- [x] **LOOK and C-LOOK Disk Scheduling: Optimizing SCAN and C-SCAN by Limiting Sweep to Final Active Request**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define a File and list four standard file attributes.
**Model Answer:**
A **File** is a named, logical collection of contiguous or structured data recorded on non-volatile secondary storage. Key attributes include:
1. **Name:** Human-readable string identifier.
2. **Identifier:** Unique internal system number (e.g., inode number).
3. **Type:** Extension indicating file format (.txt, .c, .exe).
4. **Size:** Current file length in bytes or blocks.
5. **Protection / Permissions:** Read/Write/Execute access bits.
6. **Timestamps:** Creation, last modification, and last access dates.

### Q2. [2 Marks] Compare Sequential File Access with Direct (Random) File Access.
**Model Answer:**
In **Sequential Access**, information in the file is processed in sequential order, one record after another from the beginning (mimicking magnetic tape). Reads and writes automatically advance an internal pointer.
In **Direct Access**, programs can read or write records rapidly in arbitrary order by specifying the exact block number (e.g., `lseek(fd, offset, SEEK_SET)`), essential for database transaction systems.

### Q3. [2 Marks] Explain the difference between Hard Links and Symbolic (Soft) Links.
**Model Answer:**
A **Hard Link** creates another directory entry that points directly to the same underlying inode on the disk filesystem. Deleting the original file does not delete data until all hard links are removed. Cannot cross filesystem boundaries.
A **Symbolic (Soft) Link** is a special file whose content is merely a pathname string pointing to target file. If the original target file is deleted, the symlink becomes a broken / dangling pointer. Can cross filesystems.

### Q4. [2 Marks] Define Seek Time and Rotational Latency in physical hard disk drives.
**Model Answer:**
**Seek Time** is the time required for the mechanical disk read/write actuator arm to position itself over the target cylinder / track (dominant factor, typically 4–10 ms).
**Rotational Latency** is the time required for the desired disk sector on the spinning platter to rotate underneath the read/write head (typically 2–4 ms at 7200 RPM).

### Q5. [2 Marks] What is the main drawback of Contiguous File Allocation?
**Model Answer:**
Contiguous allocation suffers from severe **external fragmentation** as files are created and deleted over time, requiring periodic offline disk compaction. Furthermore, **pre-allocating maximum file size** is difficult because files dynamically grow during execution.

### Q6. [2 Marks] What is the advantage of Indexed File Allocation over Linked File Allocation?
**Model Answer:**
Linked allocation suffers from slow direct random access because accessing block $K$ requires traversing $K-1$ disk pointers sequentially. Indexed allocation resolves this by collecting all block pointers into a single **Index Block**, supporting instantaneous direct random access without external fragmentation.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Unix Inode architecture and how it supports massive file sizes.
**Model Answer:**
### UNIX Inode Architecture

An **Inode** (*Index Node*) is a fixed-size (typically 128 or 256 bytes) metadata data structure representing a file in Unix/Linux file systems.

```
+-------------------------------------------------------+
|                    UNIX INODE                         |
| File Mode, Permissions, Owner UID, GID, Timestamps    |
+-------------------------------------------------------+
| Direct Block Pointers (0 to 11)   --> [Data Blocks 0..11]
+-------------------------------------------------------+
| Single Indirect Pointer           --> [Pointer Block] --> [Data Blocks]
+-------------------------------------------------------+
| Double Indirect Pointer           --> [Pointer Block] --> [Pointer Blocks] --> [Data Blocks]
+-------------------------------------------------------+
| Triple Indirect Pointer           --> [Pointer Block] --> [Pointer Blocks] --> ...
+-------------------------------------------------------+
```

#### Multi-Tier Addressing Scheme:
1. **12 Direct Pointers:** Point directly to the first 12 data blocks (satisfies small files immediately with zero lookup overhead).
2. **1 Single Indirect Pointer:** Points to an index block containing (say) 1024 pointers to data blocks.
3. **1 Double Indirect Pointer:** Points to an index block of 1024 pointer blocks, each pointing to 1024 data blocks ($1024 \times 1024$ blocks).
4. **1 Triple Indirect Pointer:** Provides $1024^3$ addressable blocks.
This hierarchical hybrid architecture ensures ultra-fast access for small files while allowing files to scale up to Terabytes.

### Q2. [5 Marks] Compare SCAN (Elevator) and C-SCAN Disk Head Scheduling algorithms.
**Model Answer:**
### SCAN vs C-SCAN Disk Scheduling

#### 1. SCAN (Elevator Algorithm):
The disk arm starts at one end of the disk and moves toward the other end, servicing requests along the way until it reaches the edge of the disk. At the boundary, the direction is reversed, servicing requests on the return sweep.

```
Track 0 <=======================================================> Track 199
                 Current Head: 53  ==> Sweep Right to 199 ==>
                [ 65 ] [ 98 ] [ 122 ] [ 183 ] ---> (Reaches 199)
                <== Sweep Left to 0 <==
                [ 37 ] [ 14 ]
```

#### 2. C-SCAN (Circular SCAN):
C-SCAN restricts servicing exclusively to **one direction**. When the head reaches the far edge, it immediately returns to the beginning track without servicing any requests on the return trip.

```
Track 0 <=======================================================> Track 199
                 Current Head: 53  ==> Sweep Right to 199 ==>
                [ 65 ] [ 98 ] [ 122 ] [ 183 ] ---> (Reaches 199)
  (Track 0) <========================================= Fast Return (No Service)
      |
      ==> Sweep Right to 53 ==>
     [ 14 ] [ 37 ]
```

#### Key Advantage of C-SCAN over SCAN:
In SCAN, requests arriving just behind the head sweep must wait for the head to reach the opposite end and return. C-SCAN provides a much more **uniform waiting time distribution** across all cylinders.

### Q3. [5 Marks] Explain Free Space Management techniques on secondary storage: Bit Vector vs Linked Free List.
**Model Answer:**
### Free Space Management Techniques

1. **Bit Vector (Bitmap):**
   - Free space is represented as a bit array where each disk block is mapped to 1 bit:
     - `1` = Free Block
     - `0` = Allocated Block
   - *Example:* `110001110101`
   - **Advantages:** Simple to implement; CPU hardware instructions (like `find-first-one`) make finding the first contiguous free blocks exceptionally fast.
   - **Disadvantages:** Bitmap must reside in RAM for performance; for a 1 TB disk with 4 KB blocks, the bitmap requires 32 MB of RAM.

2. **Linked Free List:**
   - Free disk blocks are chained together using pointers stored inside the free blocks themselves. The OS stores a pointer to the head of the free list in memory.
   - **Advantages:** Zero RAM overhead for storing lists; only the head pointer is kept in memory.
   - **Disadvantages:** Traversing the list to find contiguous blocks requires slow mechanical disk reads.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Given a disk queue with requests for I/O to cylinders: 98, 183, 37, 122, 14, 124, 65, 67 with total 200 cylinders (0 to 199) and current head position at cylinder 53. Calculate the total head movement (in cylinders) for: (a) FCFS, (b) SSTF, (c) SCAN (moving toward higher cylinders), and (d) C-LOOK. Draw the head movement diagrams.
**Comprehensive University Solution:**
### Comprehensive Numerical: Disk Head Scheduling Algorithms

**Disk Geometry:** Cylinders $0$ to $199$  
**Current Head Position:** $53$  
**Pending Request Queue:** $98, 183, 37, 122, 14, 124, 65, 67$

---

### (a) First-Come, First-Served (FCFS)
Service order: $53 \to 98 \to 183 \to 37 \to 122 \to 14 \to 124 \to 65 \to 67$

#### Head Movement Calculations:
- $|98 - 53| = 45$
- $|183 - 98| = 85$
- $|37 - 183| = 146$
- $|122 - 37| = 85$
- $|14 - 122| = 108$
- $|124 - 14| = 110$
- $|65 - 124| = 59$
- $|67 - 65| = 2$
- **Total Head Movement (FCFS)** = $45 + 85 + 146 + 85 + 108 + 110 + 59 + 2 = \mathbf{640\text{ cylinders}}$

---

### (b) Shortest Seek Time First (SSTF)
Always picks the request closest to current head position.
- Current 53: closest is 65 ($|65-53| = 12$)
- Current 65: closest is 67 ($|67-65| = 2$)
- Current 67: closest is 37 ($|37-67| = 30$, vs $|98-67|=31$)
- Current 37: closest is 14 ($|14-37| = 23$)
- Current 14: closest is 98 ($|98-14| = 84$)
- Current 98: closest is 122 ($|122-98| = 24$)
- Current 122: closest is 124 ($|124-122| = 2$)
- Current 124: closest is 183 ($|183-124| = 59$)

Service order: $53 \to 65 \to 67 \to 37 \to 14 \to 98 \to 122 \to 124 \to 183$
- Head movements: $(67 - 53) + (67 - 14) + (183 - 14) = 14 + 53 + 169 = \mathbf{236\text{ cylinders}}$

---

### (c) SCAN Scheduling (Moving toward higher cylinders)
Sweeps right to the boundary (199), then reverses left.
Service order: $53 \to 65 \to 67 \to 98 \to 122 \to 124 \to 183 \to 199 \to 37 \to 14$

#### Head Movement:
- Right sweep: from $53$ to $199 = 199 - 53 = 146$ cylinders.
- Left sweep: from $199$ down to $14 = 199 - 14 = 185$ cylinders.
- **Total Head Movement (SCAN)** = $146 + 185 = \mathbf{331\text{ cylinders}}$

---

### (d) C-LOOK Scheduling (Moving toward higher cylinders)
LOOK only sweeps to the highest active request ($183$), jumps back to lowest active request ($14$) without servicing, and continues upward to $37$.
Service order: $53 \to 65 \to 67 \to 98 \to 122 \to 124 \to 183 \to 14 \to 37$

#### Head Movement:
- Forward sweep: from $53$ to $183 = 183 - 53 = 130$ cylinders.
- Return jump: from $183$ to $14 = 183 - 14 = 169$ cylinders.
- Final sweep: from $14$ to $37 = 37 - 14 = 23$ cylinders.
- **Total Head Movement (C-LOOK)** = $130 + 169 + 23 = \mathbf{322\text{ cylinders}}$  
*(If return jump is considered fast seeking and excluded: $130 + 23 = 153$ cylinders).*

---

### Comparative Evaluation Matrix:
| Algorithm | Total Cylinders Traveled | Performance Characteristics |
| :--- | :---: | :--- |
| **SSTF** | **236** | Best seek optimization; potential starvation for outlying tracks. |
| **C-LOOK** | **322** | Prevents starvation; uniform waiting time across cylinders. |
| **SCAN** | **331** | Elevator fairness; sweeps to outer boundary (199). |
| **FCFS** | **640** | Poorest performance; excessive wild head swings. |

### Q2. [10/15 Marks] Critically evaluate File Allocation Methods: Contiguous, Linked, and Indexed Allocation. Discuss their architectural strengths, weaknesses, and suitability for different access patterns.
**Comprehensive University Solution:**
### Comparative Evaluation of File Allocation Methods

The file allocation method determines how secondary storage blocks are assigned to files on physical disks.

---

### 1. Contiguous Allocation
- **Architecture:** Each file occupies a contiguous set of physical disk blocks (e.g., blocks 100 to 105).
- **Directory Entry:** Simply stores `Starting Block` and `Length`.
- **Advantages:**
  - Best sequential and direct access performance (head stays on same or adjacent tracks).
  - Can read $K$ blocks in a single disk rotation.
- **Disadvantages:**
  - **Severe External Fragmentation:** As files are deleted, unallocated holes become scattered.
  - **File Size Uncertainty:** Files cannot grow easily unless large contiguous space is pre-allocated.

---

### 2. Linked (Chained) Allocation
- **Architecture:** Each file is a linked list of disk blocks. Each disk block contains a data payload and a pointer to the next block.
- **Directory Entry:** Stores `Starting Block` pointer and `Ending Block` pointer.
- **Advantages:**
  - Zero external fragmentation; any free block can be allocated immediately.
  - Files can grow indefinitely without pre-allocation.
- **Disadvantages:**
  - **Terrible Random/Direct Access:** Finding block $K$ requires following $K-1$ disk pointers sequentially.
  - Pointer overhead consumes 4–8 bytes in every block (e.g., 508 bytes data instead of 512).
  - High vulnerability to corruption: if a single pointer is damaged, the entire remainder of the file is lost.

---

### 3. Indexed Allocation
- **Architecture:** Gathers all pointers for a file into an **Index Block**.
- **Directory Entry:** Stores a single pointer to the `Index Block`.
- **Advantages:**
  - Supports rapid direct access to any block without traversing intermediate blocks.
  - Zero external fragmentation.
- **Disadvantages:**
  - **Index Block Overhead:** Small files (1 block) waste an entire 4 KB index block just to hold 1 pointer.
  - For massive files, a single index block cannot hold all pointers, necessitating **Multi-Level Indexing** or **Combined Schemes** (like UNIX Inode architecture).


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
### Examiner Insights & University Exam Strategy:
1. **Guaranteed 10/15-Mark Problem:** Numerical disk head scheduling (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK) appears in virtually every exam. Always list the exact traversal sequence, write out each distance $|b - a|$, sum them up, and show clear calculations.
2. **UNIX Inode Architecture:** Essential 5/10-mark question. Draw the complete multi-tier diagram (Direct, Single Indirect, Double Indirect, Triple Indirect) and explain how it accommodates both small script files and gigabyte database files.
3. **File Allocation Methods:** When comparing Contiguous, Linked, and Indexed methods, use a structured comparison table covering external fragmentation, direct access speed, and file growth flexibility.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
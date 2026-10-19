# BCA-204N: Unix and Shell Programming
## Unit 1 Master Exam Revision Notes: Unix Architecture, Commands & Process Management
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `bf814b8a-b559-5daf-a826-8d2a70f13154` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **History and Evolution of UNIX: Ken Thompson, Dennis Ritchie, Bell Labs, BSD, POSIX, Linux Foundation**
- [x] **Salient Features of UNIX: Multi-user, Multitasking, Portability, Hierarchical File System, Tool-Building Philosophy**
- [x] **UNIX System Architecture: Hardware Layer, Kernel Layer, System Call Interface, Shell Layer, Application Utilities**
- [x] **UNIX Command Syntax & Format: Command Name, Options (Flags -a, --long), Command Arguments, Standard Output**
- [x] **Internal (Built-in) vs External (Disk-Based) Commands: type Command, which Command, Command Path Hash Table**
- [x] **General Utilities & Help Facilities: man Pages (Sections 1-8), whatis, apropos, date, cal, echo, clear, banner**
- [x] **Directory Management Commands: pwd, mkdir (-p flag), rmdir, cd (Path Traversal . and ..)**
- [x] **File Manipulation Commands: ls (Options -l, -a, -R, -t, -h), touch, cp (-r, -i), mv, rm (-r, -f), cat, more, less, head, tail (-f)**
- [x] **Disk & System Status Commands: df (-h), du (-sh), free, uname (-a), who, w, whoami, id, uptime**
- [x] **UNIX Process Management: Process Concept, PID, PPID, Process States (Running, Sleeping, Stopped, Zombie), ps Command (aux, -ef)**
- [x] **Process Scheduling & Background Execution: Ampersand (&), nohup, jobs, fg, bg, nice, renice Priorities (-20 to 19)**
- [x] **Process Termination & Signals: kill Command, killall, Standard Signals (SIGTERM 15, SIGKILL 9, SIGINT 2, SIGHUP 1), top Command**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What are the four primary layers of the Unix Operating System architecture?
**Model Answer:**
The four layers from inner to outer are:
1. **Hardware**: Physical CPU, memory, disks.
2. **Kernel**: Core managing hardware, memory, files, and scheduling.
3. **Shell**: Command-line interpreter mediating between user and kernel.
4. **Utilities & Applications**: Standard tools (`ls`, `grep`, compilers).

### Q2. [2 Marks] What is the primary role of the Unix Kernel?
**Model Answer:**
The Kernel is the master control program that executes in privileged supervisor mode. It manages CPU process scheduling, physical/virtual memory allocation, file systems, device I/O drivers, and handles system calls.

### Q3. [2 Marks] Differentiate between `cat` and `more`/`less` commands.
**Model Answer:**
`cat` concatenates and dumps entire file contents onto terminal without pausing. `more` and `less` are pagers that display file contents screen-by-screen, with `less` allowing backward scrolling.

### Q4. [2 Marks] What is the difference between an internal command and an external command in Unix?
**Model Answer:**
- **Internal (Built-in)**: Built directly into the shell binary (e.g., `cd`, `pwd`, `echo`, `exit`); executes immediately without spawning child processes.
- **External**: Standalone executable binaries residing on disk (e.g., `/bin/ls`, `/usr/bin/grep`); shell forks a child process to execute them.

### Q5. [2 Marks] What is a Process ID (PID) and Parent Process ID (PPID)?
**Model Answer:**
- **PID**: Unique positive integer assigned by the kernel to identify an active process.
- **PPID**: The PID of the parent process that spawned this process using the `fork()` system call.

### Q6. [2 Marks] What is a Zombie Process in Unix?
**Model Answer:**
A zombie (defunct) process is one that has terminated its execution via `exit()`, but whose entry remains in the process table because its parent has not yet read its exit status code via `wait()`.

### Q7. [2 Marks] What is an Orphan Process, and how does Unix handle it?
**Model Answer:**
An orphan process is an active process whose parent process terminated or crashed before it. The Unix **`init` process (PID 1)** automatically adopts all orphan processes and reaps their exit status upon termination.

### Q8. [2 Marks] What does the `nohup` command do?
**Model Answer:**
`nohup` (no hangup) runs a command immune to SIGHUP (signal 1) disconnections, allowing background jobs to continue running even after the user logs out.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Unix Process Life Cycle and State Transitions with a State Diagram.
**Model Answer:**
### Unix Process State Transitions

```
                    [ Created via fork() ]
                              |
                              v
            +-----------------------------------+
            |           Ready-to-Run            |
            |        (in memory or swapped)     |
            +-----------------------------------+
                   ^                     |
        Preempted  |                     | Scheduled (CPU Dispatch)
                   |                     v
            +-----------------------------------+
            |           Kernel / User           |
            |           Running Mode            |
            +-----------------------------------+
                   ^                     |
        Event      |                     | Sleep / Wait (I/O, Semaphore)
        Occurs     |                     v
            +-----------------------------------+
            |              Asleep               |
            |          (Blocked on I/O)         |
            +-----------------------------------+
                              |
                        Process Terminates (exit)
                              v
            +-----------------------------------+
            |          Zombie / Defunct         |
            |      (Waiting for parent wait)    |
            +-----------------------------------+
```
- **Running**: Process is executing on CPU (User or Kernel mode).
- **Ready**: Process has all resources and is waiting in run queue for CPU slice.
- **Blocked/Asleep**: Waiting for I/O completion or signal.
- **Zombie**: Process terminated, awaiting parent `wait()` cleanup.

### Q2. [5 Marks] Explain the Process Creation Mechanism using `fork()`, `exec()`, and `wait()` System Calls.
**Model Answer:**
### Process Creation Pipeline
1. **`fork()`**: Clones the calling process, creating an exact child replica with duplicate address space. Returns `0` to child and child's PID to parent.
2. **`exec()` family**: Replaces the child's memory image, stack, and text segment with a new program binary from disk.
3. **`wait()` / `waitpid()`**: Parent process suspends execution until the child finishes, obtaining termination status and clearing zombie entries.

### Q3. [5 Marks] Explain Process Scheduling Priority and the `nice` / `renice` Commands.
**Model Answer:**
Unix processes have a priority value calculated from CPU utilization and a **nice value** (range **-20 to +19**):
- Default nice value is `0`.
- Higher positive nice value (+19) makes the process 'nicer' (lower CPU priority).
- Negative nice values (-20) grant highest priority (requires root).
- `nice -n 10 ./compute_heavy.sh`: Launches job with lower priority.
- `renice +5 -p 1420`: Dynamically alters priority of running PID 1420.

### Q4. [5 Marks] Compare `ps` Options and Common Signals used with the `kill` Command.
**Model Answer:**
| Command / Signal | Code | Action |
| :--- | :--- | :--- |
| `ps -ef` / `ps aux` | - | Displays full listing of all active processes across all users |
| **SIGHUP** | 1 | Hangup signal sent when terminal closes |
| **SIGINT** | 2 | Interrupt signal sent by user pressing `Ctrl+C` |
| **SIGKILL** | 9 | Uncatchable, unignorable immediate termination by kernel |
| **SIGTERM** | 15 | Polite, graceful termination signal (default for `kill`) |
| **SIGSTOP** | 19 | Uncatchable signal that pauses process (`Ctrl+Z` sends SIGTSTP) |


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Write a Complete C Program in Unix Demonstrating `fork()`, `getpid()`, `getppid()`, and Parent-Child Synchronization.
**Comprehensive University Solution:**
```c
/**
 * University Model Solution: BCA-204N Unit 1
 * Process Management using Unix System Calls
 */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    pid_t pid;
    int status;

    printf("[Parent] Master Process Started. PID: %d, PPID: %d\n", getpid(), getppid());

    // Fork child process
    pid = fork();

    if (pid < 0) {
        perror("fork failed");
        exit(EXIT_FAILURE);
    } else if (pid == 0) {
        // Child Process
        printf("  [Child] Running! Child PID: %d, Parent PPID: %d\n", getpid(), getppid());
        printf("  [Child] Performing computation work for 2 seconds...\n");
        sleep(2);
        printf("  [Child] Task complete. Exiting with status code 42.\n");
        exit(42);
    } else {
        // Parent Process
        printf("[Parent] Spawned Child with PID: %d. Waiting for child to terminate...\n", pid);
        
        // Wait for child
        pid_t terminated_child = wait(&status);
        
        if (WIFEXITED(status)) {
            int exit_code = WEXITSTATUS(status);
            printf("[Parent] Child PID %d successfully reaped. Exit Code: %d\n", 
                   terminated_child, exit_code);
        }
        printf("[Parent] All tasks finished. Exiting.\n");
    }
    return 0;
}
```

### Q2. [10/15 Marks] Explain Standard Unix Command-Line Navigation, File Manipulation, and Piping with Examples.
**Comprehensive University Solution:**
### Fundamental Unix Command-Line Mastery

```bash
# 1. Directory Navigation and Inspection
pwd                   # Print Current Working Directory
ls -lahr /var/log     # Long list, all hidden files, human sizes, reverse time sort
cd ~                  # Change to user home directory

# 2. File and Directory Operations
mkdir -p project/{src,bin,docs}  # Nested directory hierarchy creation
cp -rv ./src/ /backup/src/       # Recursive verbose copy
mv old_name.txt new_name.txt     # Rename or move file
rm -rf /tmp/scratch_dir/         # Force recursive removal

# 3. Viewing and Searching Content
cat -n file.txt                  # Display file with line numbers
head -n 20 access.log            # View first 20 lines
tail -n 50 -f /var/log/syslog    # Follow live appended log stream in real time

# 4. Process Inspection and Control
ps -ef | grep "python"           # Find all running python processes
kill -15 2401                    # Request graceful termination of PID 2401
kill -9 2401                     # Force kill PID 2401 if hung

# 5. Background Jobs
sleep 100 &                      # Run command in background
jobs                             # List active terminal background jobs
fg %1                            # Bring job 1 to foreground
```

### Q3. [10/15 Marks] Explain the Architecture and Design Philosophy of the Unix Operating System in Depth.
**Comprehensive University Solution:**
### The Unix Philosophy and Architecture
Formulated by Ken Thompson, Dennis Ritchie, and Doug McIlroy at Bell Labs:
1. **Everything is a File**: Hardware devices (`/dev/sda`), network sockets, terminals (`/dev/pts/0`), and directories are exposed through unified standard file descriptor APIs (`open`, `read`, `write`, `close`).
2. **Small is Beautiful**: Write small, modular programs that do exactly one task and do it exceptionally well.
3. **Composability via Pipes**: Connect output of one program directly into input of another using standard textual byte streams (`stdin`, `stdout`).
4. **Portability**: Written in high-level C language rather than assembly, allowing Unix to be ported across diverse CPU architectures.
5. **Kernel-Shell Separation**: User interface logic is strictly separated from kernel privilege mode, preventing user crashes from bringing down the OS kernel.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Master the difference between fork() and exec(), zombie vs orphan process creation, and signal codes (SIGKILL vs SIGTERM).

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
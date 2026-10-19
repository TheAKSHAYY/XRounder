# BCA-204N: Unix and Shell Programming
## Unit 5 Master Exam Revision Notes: Control Structures, Functions & System Administration
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `9761708d-16f7-576c-a6d1-1fb45bac7533` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Conditional Control Structures: Simple if-then-fi, if-then-else-fi, if-then-elif-else-fi Multi-Way Branching**
- [x] **Pattern Matching with case Statement: case $var in pattern1) ... ;; pattern2) ... ;; *) ... ;; esac Architecture**
- [x] **Looping Structures - while Loop: Condition-Based Entry-Controlled Iteration, Infinite while Loops**
- [x] **Looping Structures - until Loop: Iterating Until Condition Evaluates to True**
- [x] **Looping Structures - for Loop: Word List Iteration (for var in list; do ... done), C-Style For Loop (for ((i=0; i<n; i++)))**
- [x] **Jumping Control Structures: break (Exit Loop), break n (Break Nested Loops), continue (Skip to Next Iteration), exit status**
- [x] **Shell Functions: Defining Functions (fname() { ... }), Passing Arguments to Functions ($1, $2 inside functions), return vs echo Output**
- [x] **File Descriptors and Advanced I/O Redirection: Custom File Descriptors (exec 3<file), Here Documents (<<EOF), Here Strings (<<<)**
- [x] **Signal Trapping in Scripts: trap Command, Handling SIGINT (Ctrl-C), Cleaning Up Temporary Files on Script Abort**
- [x] **UNIX File Permissions & Security: User, Group, Others (rwx), Octal Notation (chmod 755, 644), chown, chgrp, umask Mechanics**
- [x] **System Administration & Automation: Cron Daemon, crontab File Format (* * * * * command), at Command for Single Execution**
- [x] **Backup & Archival Scripting: Automated Log Rotation, Compression Scripts, Remote Copying with scp and rsync**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the syntax of the `if-then-elif-else-fi` structure in bash?
**Model Answer:**
```bash
if [ condition ]; then
    # commands
elif [ condition2 ]; then
    # commands
else
    # commands
fi
```

### Q2. [2 Marks] List the primary integer comparison operators used inside bash `[ ]` test brackets.
**Model Answer:**
- `-eq`: Equal to (`if [ $a -eq $b ]`)
- `-ne`: Not equal to
- `-gt`: Greater than
- `-lt`: Less than
- `-ge`: Greater than or equal to
- `-le`: Less than or equal to

### Q3. [2 Marks] What do `-f`, `-d`, and `-s` test operators do for files?
**Model Answer:**
- `-f file`: True if file exists and is a regular file.
- `-d file`: True if file exists and is a directory.
- `-s file`: True if file exists and has size greater than zero (not empty).

### Q4. [2 Marks] What is the difference between `while` and `until` loops in shell scripts?
**Model Answer:**
- `while [ condition ]`: Executes loop body as long as the condition evaluates to **TRUE**.
- `until [ condition ]`: Executes loop body as long as the condition evaluates to **FALSE** (stops when true).

### Q5. [2 Marks] How are functions declared and called in bash?
**Model Answer:**
```bash
function_name() {
    echo "Param 1: $1, Param 2: $2"
    return 0
}
# Calling the function:
function_name "arg1" "arg2"
```

### Q6. [2 Marks] What file stores user account credentials and password hashes in Unix?
**Model Answer:**
`/etc/passwd` stores basic account info (username, UID, GID, home dir, shell). Encrypted password hashes are protected inside `/etc/shadow` (readable only by root).

### Q7. [2 Marks] Explain the five time/date fields in a `crontab` schedule entry.
**Model Answer:**
Syntax: `* * * * * command_to_execute`
1. **Minute** (0–59)
2. **Hour** (0–23)
3. **Day of Month** (1–31)
4. **Month** (1–12)
5. **Day of Week** (0–7, where 0 and 7 = Sunday)

### Q8. [2 Marks] What command creates a compressed backup archive (`.tar.gz`) of a directory?
**Model Answer:**
`tar -czvf backup.tar.gz /home/project`
- `-c`: Create new archive
- `-z`: Compress with gzip
- `-v`: Verbose output
- `-f`: Output file name


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the `case-esac` Statement in Bash with a Menu-Driven Script Example.
**Model Answer:**
### `case ... esac` Multiway Branching
Matches a variable against multiple pattern alternatives:

```bash
read -p "Enter service action [start|stop|restart|status]: " action

case $action in
    start)
        echo "Starting Apache HTTP service..."
        sudo systemctl start apache2
        ;;
    stop)
        echo "Stopping Apache HTTP service..."
        sudo systemctl stop apache2
        ;;
    restart)
        echo "Restarting Apache HTTP service..."
        sudo systemctl restart apache2
        ;;
    status)
        sudo systemctl status apache2
        ;;
    *)
        echo "Invalid action! Usage: {start|stop|restart|status}"
        exit 1
        ;;
esac
```

### Q2. [5 Marks] Explain User Administration in Unix: `useradd`, `passwd`, `usermod`, and `userdel`.
**Model Answer:**
| Command | Action |
| :--- | :--- |
| `sudo useradd -m -s /bin/bash rohan` | Creates user `rohan`, creates home dir (`-m`), sets default shell (`-s`) |
| `sudo passwd rohan` | Sets or changes user password |
| `sudo usermod -aG sudo,developers rohan` | Appends user to secondary groups (`-aG`) |
| `sudo userdel -r rohan` | Deletes user account and removes home directory (`-r`) |
| `/etc/passwd` | Colon-separated user account registry |
| `/etc/shadow` | Shadow password file holding salt and SHA-512 hashes |

### Q3. [5 Marks] Explain Cron Scheduling with 4 Practical Crontab Examples.
**Model Answer:**
### Cron Job Examples (`crontab -e`)

```cron
# Format: Minute  Hour  Day_of_Month  Month  Day_of_Week  Command

# 1. Run database backup every night at 2:30 AM
30 2 * * * /backup/scripts/backup_db.sh

# 2. Run log cleaner every Sunday at 4:00 AM
0 4 * * 0 /usr/local/bin/clean_logs.sh

# 3. Check server health every 15 minutes during work hours (9 AM - 5 PM, Mon-Fri)
*/15 9-17 * * 1-5 /opt/monitor/health_check.sh

# 4. Run monthly billing script on 1st of every month at midnight
0 0 1 * * /billing/generate_invoices.sh
```

### Q4. [5 Marks] Explain Unix Backup and Archive Utilities (`tar`, `gzip`, `bzip2`).
**Model Answer:**
- **`tar` (Tape Archive)**: Packages multiple files into a single tape archive without compression.
- **`gzip` / `gunzip`**: Fast compression algorithm generating `.gz` files.
- **Combined Tarball Operations**:
  - Create compressed archive: `tar -czvf project.tar.gz ./project/`
  - Extract archive: `tar -xzvf project.tar.gz -C /target/dir/`
  - List archive contents without extracting: `tar -tzvf project.tar.gz`


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Complete Enterprise Backup Shell Script with Logging, Compression, Rotation, and Crontab Integration.
**Comprehensive University Solution:**
```bash
#!/bin/bash
"""
MJPRU Examination Model Solution: Unit 5
Automated Enterprise Backup and Directory Rotation System
"""

# Configuration
SOURCE_DIR="/var/www/html"
BACKUP_DIR="/backup/web_archives"
LOG_FILE="/var/log/sys_backup.log"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ARCHIVE_NAME="web_backup_${TIMESTAMP}.tar.gz"
RETENTION_DAYS=7

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log_message "=== Backup Job Initiated ==="
log_message "Source: $SOURCE_DIR | Target: $BACKUP_DIR/$ARCHIVE_NAME"

# Verify source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    log_message "FATAL ERROR: Source directory $SOURCE_DIR does not exist!"
    exit 1
fi

# Create compressed archive
tar -czf "$BACKUP_DIR/$ARCHIVE_NAME" -C "$(dirname "$SOURCE_DIR")" "$(basename "$SOURCE_DIR")" 2>> "$LOG_FILE"

if [ $? -eq 0 ]; then
    FILE_SIZE=$(du -h "$BACKUP_DIR/$ARCHIVE_NAME" | cut -f1)
    log_message "SUCCESS: Backup created ($FILE_SIZE)."
else
    log_message "ERROR: Tar backup failed!"
    exit 2
fi

# Rotation: Delete archives older than retention period
log_message "Cleaning backups older than $RETENTION_DAYS days..."
find "$BACKUP_DIR" -type f -name "web_backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete

log_message "=== Backup Job Finished Successfully ===\n"
exit 0
```

### Q2. [10/15 Marks] Write a Shell Script Demonstrating Function Recursion to Calculate Factorial and Fibonacci Numbers.
**Comprehensive University Solution:**
```bash
#!/bin/bash
# Recursive Functions in Shell Scripting

# 1. Recursive Factorial Function
factorial() {
    local n=$1
    if [ $n -le 1 ]; then
        echo 1
    else
        local prev=$(factorial $(( n - 1 )))
        echo $(( n * prev ))
    fi
}

# 2. Recursive Fibonacci Function
fibonacci() {
    local n=$1
    if [ $n -le 0 ]; then
        echo 0
    elif [ $n -eq 1 ]; then
        echo 1
    else
        local f1=$(fibonacci $(( n - 1 )))
        local f2=$(fibonacci $(( n - 2 )))
        echo $(( f1 + f2 ))
    fi
}

read -p "Enter a number (n): " num

fact_res=$(factorial $num)
echo "Factorial of $num ($num!) = $fact_res"

echo -n "Fibonacci sequence up to $num terms: "
for (( i=0; i<num; i++ )); do
    val=$(fibonacci $i)
    echo -n "$val "
done
echo ""
```

### Q3. [10/15 Marks] Explain the Complete Unix System Boot Process from BIOS/UEFI to Login Prompt.
**Comprehensive University Solution:**
### The 6 Stages of the Unix/Linux Boot Process

```
+-------------+     +-------------+     +-------------+     +-------------+     +-------------+     +-------------+
|   1. BIOS   | --> |   2. MBR    | --> |   3. GRUB   | --> |  4. Kernel  | --> | 5. Systemd/ | --> |  6. Login   |
|    POST     |     |  Bootloader |     | Boot Loader |     | Initial RAM |     |    Init     |     |   Prompt    |
+-------------+     +-------------+     +-------------+     +-------------+     +-------------+     +-------------+
```
1. **BIOS / UEFI**: Executes Power-On Self-Test (POST), checks hardware integrity, searches bootable storage drive.
2. **MBR (Master Boot Record)**: Loads primary boot code from sector 0 of boot drive (512 bytes).
3. **GRUB Bootloader**: Presents operating system selection menu and loads chosen kernel binary (`vmlinuz`) and `initramfs` into RAM.
4. **Kernel Initialization**: Mounts root file system read-only, probes hardware devices, initializes virtual memory and page tables.
5. **Init / Systemd (PID 1)**: The ancestor of all processes. Mounts `/etc/fstab`, launches system services, brings system to target runlevel.
6. **Login Display**: Spawns `getty` / display manager, prompts for credentials, and spawns login shell upon successful authentication.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Be ready to write full crontab entries, explain the 6 boot stages, and implement backup shell scripts with error checking.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
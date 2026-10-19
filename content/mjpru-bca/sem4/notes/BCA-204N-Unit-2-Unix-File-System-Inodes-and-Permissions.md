# BCA-204N: Unix and Shell Programming
## Unit 2 Master Exam Revision Notes: Unix File System, Inodes & Storage Administration
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `e8f94cc9-23a5-5aa7-aba2-c305e1b5b511` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Hierarchical File System Architecture: Root (/), /bin, /sbin, /etc, /dev, /home, /lib, /tmp, /usr, /var**
- [x] **UNIX File Types: Regular (Ordinary) Files (-), Directories (d), Character Devices (c), Block Devices (b), FIFO Pipes (p), Sockets (s), Links (l)**
- [x] **Physical Disk Architecture in UNIX: Boot Block, Super Block, Inode Table (ILIST), Data Blocks**
- [x] **The Super Block: File System Metadata, Total Free Inodes, Free Data Block Pointer Lists, File System State Flags**
- [x] **The UNIX Inode: Inode Number (ls -i), Inode Structure, File Attributes, Direct Pointers (0-11), Indirect Pointers (Single, Double, Triple)**
- [x] **In-Core Inode vs Disk Inode: Active File Tracking, Reference Counts, Mount Point Crossing**
- [x] **Directory Implementation: Directory Entries as (Filename, Inode Number) Pairs, Conversion of Pathname to Inode**
- [x] **Hard Links vs Symbolic (Soft) Links: ln vs ln -s, Inode Sharing, Cross-Filesystem Constraints, Dangling Links**
- [x] **Secondary Storage Management: Disk Partitioning (fdisk, parted), Creating Filesystems (mkfs, mke2fs)**
- [x] **Mounting & Unmounting Filesystems: mount Command, umount Command, /etc/fstab Configuration Table**
- [x] **Checking & Repairing Filesystems: fsck Utility, Bad Block Detection, Disk Compression Utilities (gzip, gunzip, bzip2, tar -cvf, tar -xvf)**
- [x] **UNIX System Calls: open, creat, read, write, lseek, close, fork, exec, wait, exit, pipe System Calls**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is an Inode (Index Node) in the Unix file system?
**Model Answer:**
An Inode is a fixed-size (typically 128 or 256 bytes) internal kernel data structure that stores all metadata about a file (permissions, owner, size, timestamps, block pointers) except its file name and file data.

### Q2. [2 Marks] Where is the file name stored if it is not inside the Inode?
**Model Answer:**
The file name is stored in a **Directory file**. A directory in Unix is simply a table mapping human-readable file names to their corresponding **Inode numbers**.

### Q3. [2 Marks] What are the three standard file timestamps tracked in an Inode?
**Model Answer:**
- **atime (Access Time)**: Last time file contents were read.
- **mtime (Modification Time)**: Last time file data contents were changed.
- **ctime (Change Time)**: Last time file metadata or Inode was updated.

### Q4. [2 Marks] Differentiate between Hard Links and Soft (Symbolic) Links in Unix.
**Model Answer:**
| Feature | Hard Link (`ln`) | Symbolic Link (`ln -s`) |
| :--- | :--- | :--- |
| **Inode Number** | Shares the EXACT SAME Inode | Creates a NEW independent Inode |
| **Across File Systems** | Cannot cross file system boundaries | Can cross separate disks / file systems |
| **Directories** | Cannot link to directories (prevents loops) | Can link to directories |
| **If Original Deleted** | File data persists via remaining link | Becomes a broken (dangling) link |

### Q5. [2 Marks] Explain Unix file permissions `rwxr-xr--` in octal notation.
**Model Answer:**
Permissions: `rwx` (Owner = 4+2+1 = 7), `r-x` (Group = 4+0+1 = 5), `r--` (Others = 4+0+0 = 4). Octal notation is **754**.

### Q6. [2 Marks] What is the purpose of `umask` in Unix?
**Model Answer:**
`umask` (user mask) sets default permission restrictions on newly created files and directories. Default base is 666 (files) and 777 (dirs); actual permission = `Base - umask` (e.g., umask 022 gives 644 files and 755 dirs).

### Q7. [2 Marks] What do the SetUID (SUID) and SetGID (SGID) special permission bits do?
**Model Answer:**
- **SUID (Octal 4000)**: Causes a program to execute with the permissions of the file owner (e.g., `/bin/passwd` runs as root to update `/etc/shadow`).
- **SGID (Octal 2000)**: Executes with permissions of the file group, or ensures new files in a directory inherit parent group ownership.

### Q8. [2 Marks] What is the Sticky Bit (Octal 1000) on directories like `/tmp`?
**Model Answer:**
When the sticky bit (`t`) is set on a shared directory (e.g., `chmod 1777 /tmp`), users can write files, but only the file owner or root can delete or rename their own files.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Unix File System Tree Hierarchy and Core Standard Directories.
**Model Answer:**
### Standard Unix Directory Tree (FHS Standard)

- **`/` (Root)**: The supreme top-level directory of the single hierarchical tree.
- **`/bin`**: Essential essential user command binaries needed in single-user mode (`ls`, `cp`, `sh`).
- **`/sbin`**: System administration binaries reserved for superuser root (`fdisk`, `reboot`, `init`).
- **`/etc`**: Host-specific static system configuration files (`passwd`, `fstab`, `network`).
- **`/dev`**: Special device files representing physical/virtual hardware (block and character devices).
- **`/home`**: User home directories storing personal documents and dotfile configs.
- **`/var`**: Variable dynamic runtime data that grows continuously (logs `/var/log`, mail spools, print queues).
- **`/tmp`**: Temporary scratch files accessible to all users, cleared on reboot.
- **`/usr`**: Secondary hierarchy containing user utilities, libraries (`/usr/lib`), and headers (`/usr/include`).

### Q2. [5 Marks] Explain the Inode Block Pointer Architecture (Direct, Single, Double, and Triple Indirect Pointers).
**Model Answer:**
### Inode Disk Block Addressing Mechanism
A standard Unix Inode contains **15 block pointers**:

```
Inode Structure
+-----------------------+
| File Metadata         |
+-----------------------+
| Direct Pointers (0-11)| ----> Direct Data Blocks (0 to 11)
+-----------------------+
| Single Indirect (12)  | ----> Index Block of Direct Pointers ----> Data Blocks
+-----------------------+
| Double Indirect (13)  | ----> Index Block ----> Index Blocks ----> Data Blocks
+-----------------------+
| Triple Indirect (14)  | ----> Index Block ----> Index Blocks ----> Index Blocks ----> Data Blocks
+-----------------------+
```
1. **12 Direct Pointers**: Point directly to the first 12 data blocks on disk ($12 \times 4\text{ KB} = 48\text{ KB}$ for small files instantly).
2. **1 Single Indirect Pointer**: Points to an index block containing block addresses (up to 1,024 pointers).
3. **1 Double Indirect Pointer**: Points to a block containing pointers to single indirect blocks ($1,024 \times 1,024 = 1,048,576$ blocks).
4. **1 Triple Indirect Pointer**: Allows scaling to multi-terabyte file capacities.

### Q3. [5 Marks] Explain File Types in Unix and How to Identify Them using `ls -l`.
**Model Answer:**
| Symbol | File Type | Description |
| :--- | :--- | :--- |
| `-` | Regular / Ordinary file | Text documents, binary executables, media |
| `d` | Directory file | Special file containing list of filenames and inode numbers |
| `l` | Symbolic Link | Soft pointer file containing path string to target |
| `c` | Character Special device | Character stream device without buffering (e.g., terminal `/dev/tty`, mouse) |
| `b` | Block Special device | Block storage device with system caching (e.g., hard disk `/dev/sda`) |
| `p` | Named Pipe (FIFO) | Inter-process communication pipe |
| `s` | Socket | Network communication endpoint |

### Q4. [5 Marks] Explain Storage Administration Commands: `df`, `du`, `mount`, and `fdisk`.
**Model Answer:**
- `df -h`: Displays file system disk space usage (total, used, available, mount points) in human-readable gigabytes.
- `du -sh /var`: Computes recursive disk space used by a specific directory tree.
- `mount /dev/sdb1 /mnt/usb`: Attaches external storage partition to mount point `/mnt/usb`.
- `umount /mnt/usb`: Unmounts safely before physical removal.
- `fdisk -l`: Inspects physical disk partition tables (MBR/GPT).


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Demonstrate File Permission Administration using Octal and Symbolic Modes with Complete Terminal Examples.
**Comprehensive University Solution:**
```bash
# 1. Understanding Permission Representation
# -rwxr-xr-- 1 rohan students 1024 Oct 18 10:00 project.sh
# User (Owner) = rwx = 4+2+1 = 7
# Group        = r-x = 4+0+1 = 5
# Others       = r-- = 4+0+0 = 4
# Octal: 754

# 2. Applying Permissions using chmod (Numeric / Octal Mode)
chmod 755 project.sh      # rwxr-xr-x (Owner all, others read+exec)
chmod 600 private_key.pem # rw------- (Owner read+write only)
chmod 644 document.txt    # rw-r--r-- (Owner read+write, others read)

# 3. Applying Permissions using Symbolic Mode
chmod u+x script.sh       # Add execute for User
chmod g-w script.sh       # Remove write for Group
chmod o=r script.sh       # Set Others to read-only
chmod a+rx binary_app     # Add read+exec for All (User, Group, Others)

# 4. Modifying Ownership with chown and chgrp
sudo chown rohan:developers script.sh # Sets owner to rohan, group to developers
sudo chown -R rohan /var/www/html     # Recursive ownership transfer

# 5. Advanced Special Permissions (SUID, SGID, Sticky)
chmod 4755 /usr/local/bin/custom_admin # Set SUID (runs as owner)
chmod 2775 /shared/team_folder         # Set SGID (new files inherit group)
chmod 1777 /tmp/shared_scratch         # Set Sticky bit (users delete only their files)
```

### Q2. [10/15 Marks] Write a C Program to Read and Display File Metadata using the `stat()` System Call.
**Comprehensive University Solution:**
```c
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <time.h>

void print_file_stats(const char *filepath) {
    struct stat file_info;

    if (stat(filepath, &file_info) < 0) {
        perror("stat error");
        return;
    }

    printf("=========================================\n");
    printf("  FILE METADATA INSPECTOR: %s\n", filepath);
    printf("=========================================\n");
    printf("Inode Number:     %lu\n", file_info.st_ino);
    printf("Total Size:       %ld bytes\n", file_info.st_size);
    printf("Block Size:       %ld bytes\n", file_info.st_blksize);
    printf("Blocks Allocated: %ld\n", file_info.st_blocks);
    printf("Hard Link Count:  %lu\n", file_info.st_nlink);
    printf("Owner UID:        %u\n", file_info.st_uid);
    printf("Group GID:        %u\n", file_info.st_gid);
    printf("Permissions Mode: %o (Octal)\n", file_info.st_mode & 0777);
    printf("Last Modified:    %s", ctime(&file_info.st_mtime));
    printf("Last Accessed:    %s", ctime(&file_info.st_atime));
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <filename>\n", argv[0]);
        return 1;
    }
    print_file_stats(argv[1]);
    return 0;
}
```

### Q3. [10/15 Marks] Explain Inode Exhaustion vs Disk Space Exhaustion and How to Diagnose and Resolve Both.
**Comprehensive University Solution:**
### Inode Exhaustion vs Disk Space Exhaustion

| Condition | Cause | Diagnostic Command | Symptom |
| :--- | :--- | :--- | :--- |
| **Disk Space Full** | Large data files (video, core dumps, huge DBs) consume all bytes | `df -h` shows 100% used on partition | 'No space left on device' |
| **Inode Table Full** | Millions of tiny 0-byte or small files consume all Inode entries | `df -i` shows 100% Inodes used, but `df -h` shows free space | 'No space left on device' even with free gigabytes! |

### Diagnosis and Recovery Commands
```bash
# 1. Check disk capacity vs Inode capacity
df -h # Check physical bytes
df -i # Check inode exhaustion

# 2. Find directories with millions of small files (e.g., session files)
find / -xdev -printf '%h\n' | sort | uniq -c | sort -k 1 -n | tail -n 10

# 3. Clean millions of stale files safely via xargs
find /var/spool/clientmqueue -type f -mtime +30 -print0 | xargs -0 rm -f
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Draw the Inode pointer tree (direct, single, double, triple) and clearly differentiate hard links vs soft links for high exam scores.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
# BCA-204N: Unix and Shell Programming
## Unit 3 Master Exam Revision Notes: Special Tools, Filters & Stream Editors (grep, sed, awk)
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `b9aba0b1-8f25-5981-a5bb-9857aede1d19` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Standard I/O Streams in UNIX: Standard Input (stdin, 0), Standard Output (stdout, 1), Standard Error (stderr, 2)**
- [x] **Redirection Operators: Output Redirection (> and >>), Input Redirection (<), Error Redirection (2>, 2>&1)**
- [x] **UNIX Pipelines: Pipeline (|) Operator, Chaining Multiple Programs, The tee Utility (Splitting Output Stream)**
- [x] **Basic Filter Commands: sort (-n, -r, -k), uniq (-c, -d), cut (-d, -f, -c), paste, tr (Character Translation and Deletion)**
- [x] **Information Filters: wc (Word, Line, Byte Count), comm, diff, cmp, find Utility (Searching by Name, Type, Size, Exec Action)**
- [x] **Regular Expressions in UNIX: Basic Regular Expressions (BRE) vs Extended Regular Expressions (ERE)**
- [x] **Regex Metacharacters: Anchors (^, $), Wildcard (.), Character Classes ([abc], [^0-9]), Quantifiers (*, +, ?, {m,n}), Grouping ()**
- [x] **Pattern Searching with grep: grep, egrep (grep -E), fgrep (grep -F), Options (-i, -v, -n, -c, -l, -w)**
- [x] **Stream Editor (sed) Architecture: Non-Interactive Stream Processing, Pattern Space and Hold Buffer**
- [x] **sed Commands: Substitution (s/pattern/replacement/flags - g, p), Deletion (d), Printing (p), Appending (a), Inserting (i)**
- [x] **The AWK Programming Language: Pattern-Action Structure (pattern { action }), Built-in Variables (FS, OFS, RS, ORS, NR, NF, FILENAME)**
- [x] **AWK Scripting Constructs: BEGIN and END Blocks, Field Referencing ($0, $1..$NF), Formatted Printing (printf), Conditionals and Loops**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What are the three Standard I/O streams in Unix and their numeric file descriptors?
**Model Answer:**
- **`stdin` (Standard Input)**: File descriptor **0** (default: keyboard).
- **`stdout` (Standard Output)**: File descriptor **1** (default: terminal screen).
- **`stderr` (Standard Error)**: File descriptor **2** (default: terminal screen).

### Q2. [2 Marks] Explain the difference between `>` and `>>` output redirection operators.
**Model Answer:**
- `>`: Overwrites the destination file (truncates existing contents to 0 before writing).
- `>>`: Appends new output data to the end of the file without deleting existing contents.

### Q3. [2 Marks] What does a Pipe (`|`) do in Unix?
**Model Answer:**
A Pipe connects the Standard Output (`stdout`) of the command on its left directly into the Standard Input (`stdin`) of the command on its right via kernel memory buffer.

### Q4. [2 Marks] What is the purpose of the `tee` command?
**Model Answer:**
`tee` reads standard input and writes it simultaneously to both standard output (screen) and to one or more files, splitting the stream like a plumbing T-junction.

### Q5. [2 Marks] Differentiate between `grep`, `egrep`, and `fgrep`.
**Model Answer:**
- `grep`: Global Regular Expression Print using Basic Regular Expressions (BRE).
- `egrep`: Extended grep (`grep -E`), supporting extended operators (`+`, `?`, `|`, `()`).
- `fgrep`: Fixed/Fast grep (`grep -F`), searches literal strings without regex interpretation.

### Q6. [2 Marks] What do the regex anchors `^` and `$` represent?
**Model Answer:**
- `^`: Matches the beginning of a line (e.g., `^Error` matches lines starting with 'Error').
- `$`: Matches the end of a line (e.g., `done$` matches lines ending with 'done').

### Q7. [2 Marks] What is `sed` in Unix?
**Model Answer:**
`sed` (Stream Editor) is a non-interactive text editor that transforms streams of text line-by-line using scripted commands (substitution, deletion, insertion).

### Q8. [2 Marks] What are `$0`, `$1`, `NR`, and `NF` in `awk`?
**Model Answer:**
- `$0`: The entire current line/record.
- `$1`, `$2`: The first and second field/column on the current line.
- `NR`: Number of Records (current line number processed so far).
- `NF`: Number of Fields (count of columns on the current line).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain Standard Unix Text Filters: `cut`, `paste`, `sort`, `uniq`, and `tr` with Examples.
**Model Answer:**
### Core Unix Text Processing Filters

```bash
# 1. cut: Extracts specific byte/field columns
cut -d":" -f1,7 /etc/passwd    # Extracts username and login shell from /etc/passwd

# 2. paste: Merges lines of files side-by-side
paste names.txt marks.txt     # Column 1 = names, Column 2 = marks

# 3. sort: Sorts text lines alphabetically or numerically
sort -t":" -k3 -n /etc/passwd # Sorts by 3rd column (UID) numerically (-n)

# 4. uniq: Filters out adjacent duplicate lines (input must be sorted first!)
sort raw_ips.txt | uniq -c    # Counts unique IP occurrences

# 5. tr: Translates or deletes characters
cat file.txt | tr 'a-z' 'A-Z' # Converts lowercase to uppercase
cat text.txt | tr -d '\r'     # Deletes Windows carriage return characters
```

### Q2. [5 Marks] Explain `grep` Flags and Common Regular Expression Patterns.
**Model Answer:**
| `grep` Option | Functionality |
| :--- | :--- |
| `-i` | Case-insensitive matching |
| `-v` | Invert match (prints lines that do NOT match pattern) |
| `-n` | Prints line numbers along with matching lines |
| `-c` | Prints count of matching lines only |
| `-l` | Prints only names of files containing matches |
| `-r` / `-R` | Recursively searches all files in subdirectories |
| `-E` | Uses Extended Regular Expressions (ERE) |
| `-w` | Matches whole words only |

### Q3. [5 Marks] Explain `sed` Architecture and Common Transformation Commands.
**Model Answer:**
### `sed` Execution Architecture
`sed` operates on a **Pattern Space** buffer:
1. Reads one line from input into Pattern Space.
2. Executes all matched editing commands in order.
3. Flushes Pattern Space to stdout (unless `-n` is set) and repeats for next line.

```bash
# Substitution: s/find/replace/flags
sed 's/BCA/MCA/g' report.txt        # Replaces all BCA with MCA globally
sed -i 's/2023/2024/g' config.txt   # In-place file modification

# Deletion: d
sed '1d' data.csv                   # Deletes line 1 (header row)
sed '/^$/d' document.txt            # Deletes all blank lines

# Printing specific line ranges: -n and p
sed -n '10,25p' server.log          # Prints lines 10 through 25 only
```

### Q4. [5 Marks] Explain the Structure of an `awk` Program with Built-in Variables.
**Model Answer:**
### Structure of an `awk` Script
An `awk` program consists of three optional sections:
```awk
BEGIN { # Executed ONCE before any input lines are read
    FS = ":"; OFS = "\t"; print "USER", "SHELL"
}
{ # Executed FOR EVERY LINE in input stream
    if ($3 >= 1000) print $1, $7
}
END { # Executed ONCE after all lines have been processed
    print "Total users processed:", NR
}
```
- `FS`: Field Separator (default space/tab).
- `OFS`: Output Field Separator.
- `RS` / `ORS`: Record Separators.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Complete Data Extraction Script in `awk` to Process `/etc/passwd` and Generate Formatted User Reports.
**Comprehensive University Solution:**
```awk
#!/usr/bin/awk -f
# University Examination Model Solution: Unit 3
# Advanced Awk Report Generator for Unix User Accounts

BEGIN {
    FS = ":"
    print "================================================================="
    print "            MJPRU UNIX SYSTEM USER ACCOUNTS REPORT"
    print "================================================================="
    printf "%-15s | %-6s | %-6s | %-25s\n", "USERNAME", "UID", "GID", "LOGIN SHELL"
    print "-----------------------------------------------------------------"
    system_users = 0
    regular_users = 0
}

# Pattern Matching: Skip comments
!/^#/ && NF >= 7 {
    username = $1
    uid = $3
    gid = $4
    shell = $7

    # Classify regular user vs system service user
    if (uid >= 1000 && uid < 65534) {
        regular_users++
        printf "%-15s | %-6d | %-6d | %-25s [USER]\n", username, uid, gid, shell
    } else {
        system_users++
        printf "%-15s | %-6d | %-6d | %-25s [SYSTEM]\n", username, uid, gid, shell
    }
}

END {
    print "================================================================="
    print "SUMMARY STATISTICS:"
    printf "Total System Service Accounts: %d\n", system_users
    printf "Total Regular Human Accounts:  %d\n", regular_users
    printf "Grand Total Lines Processed:   %d\n", NR
    print "================================================================="
}
```

### Q2. [10/15 Marks] Demonstrate Advanced Log Analysis using a Pipeline of Unix Filters (`cat`, `grep`, `awk`, `sort`, `uniq`).
**Comprehensive University Solution:**
```bash
# Practical Scenario: Apache/Nginx Web Server Access Log Analysis
# Goal: Find Top 10 IP addresses making requests, along with request count

cat /var/log/nginx/access.log \
  | awk '{print $1}' \
  | sort \
  | uniq -c \
  | sort -nr \
  | head -n 10

# Explanation of the Pipeline:
# 1. cat access.log    : Streams raw web server log
# 2. awk '{print $1}'  : Extracts the first column (Client IP address)
# 3. sort              : Sorts IPs so duplicate IPs become adjacent for uniq
# 4. uniq -c           : Counts occurrences of each unique IP address
# 5. sort -nr          : Sorts numerically (-n) in reverse (-r) order (highest count first)
# 6. head -n 10        : Displays top 10 most frequent visitor IPs

# Bonus: Find all HTTP 404 Not Found errors
grep " 404 " /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -nr
```

### Q3. [10/15 Marks] Explain `sed` Multi-line Pattern Space Editing, Hold Space, and Scripting with Practical Examples.
**Comprehensive University Solution:**
### Advanced `sed`: Pattern Space vs Hold Space
`sed` maintains two memory buffers:
1. **Pattern Space**: Working buffer where current line is modified.
2. **Hold Space**: Auxiliary persistent scratchpad buffer where text can be saved and retrieved across lines.

```bash
# Key Hold Space Commands:
# h : Copy Pattern Space to Hold Space (overwrites hold)
# H : Append Pattern Space to Hold Space
# g : Copy Hold Space to Pattern Space (overwrites pattern)
# G : Append Hold Space to Pattern Space
# x : Exchange contents of Pattern Space and Hold Space

# Example 1: Reversing order of lines in a file (emulating 'tac')
sed -n '1!G;h;$p' sample.txt
# Explanation:
# 1!G : For all lines except line 1, append Hold Space to Pattern Space
# h   : Copy new combination to Hold Space
# $p  : On the last line ($), print the Pattern Space

# Example 2: Double-spacing a single-spaced file
sed 'G' file.txt

# Example 3: Print only lines that match pattern and the line immediately following it
sed -n '/CRITICAL/{n;p}' server.log
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Practice writing `awk` scripts with BEGIN/END and building complex command pipelines (`grep | awk | sort | uniq -c`).

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
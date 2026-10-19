# BCA-204N: Unix and Shell Programming
## Unit 4 Master Exam Revision Notes: vi Editor, Shell Environment & Scripting Fundamentals
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `aaf6ba32-75e1-5b3e-abb6-d42df7743c66` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Text Editing in UNIX: The vi / vim Editor, Operational Modes (Command Mode, Insert Mode, Last-Line / Ex Mode)**
- [x] **vi Cursor Navigation & Editing Commands: h, j, k, l, w, b, 0, $, gg, G, i, a, o, x, dd, yy, p, u, Ctrl-R**
- [x] **vi Search, Replace & Save Commands: /pattern, ?pattern, :s/old/new/g, :%s/old/new/gc, :w, :q, :wq, :q!**
- [x] **Shell Architecture & Types: Bourne Shell (sh), C Shell (csh), Korn Shell (ksh), Bourne-Again Shell (bash), Z Shell (zsh)**
- [x] **Shell Command-Line Processing: Tokenization, History Expansion, Alias Substitution, Parameter Expansion, Filename Globbing (*, ?, [a-z])**
- [x] **Writing and Executing a Shell Script: Shebang line (#!/bin/bash), Execution Permissions (chmod +x), ./script.sh vs sh script.sh**
- [x] **Shell Variables: User-Defined Variables, Assignment Syntax (var=val, No Spaces), Variable Dereferencing ($var, ${var})**
- [x] **System & Environment Variables: HOME, PATH, USER, SHELL, PWD, PS1, export Command, Environment Persistence (~/.bashrc, ~/.bash_profile)**
- [x] **Console Input and Output in Scripts: echo (-e, -n), read Statement (Options -p, -s, -t), Command Substitution ($(cmd) and `cmd`)**
- [x] **Arithmetic Evaluation in Shell: expr Command, Double Parentheses (( expression )), let Command, bc (Arbitrary Precision Calculator)**
- [x] **Positional Parameters & Special Script Arguments: $0 (Script Name), $1..$9, ${10}, $# (Arg Count), $* vs $@, $? (Exit Status), $$ (PID)**
- [x] **Conditional Testing with test Command: Bracket Syntax [ condition ] vs [[ extended condition ]], File Tests (-f, -d, -r, -w, -x, -s)**
- [x] **String & Numeric Comparison Tests: String Tests (=, !=, -z, -n), Integer Tests (-eq, -ne, -lt, -le, -gt, -ge)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What are the three operational modes of the `vi` editor?
**Model Answer:**
1. **Command Mode**: Default mode where keystrokes execute commands (delete, copy, navigate).
2. **Insert Mode**: Mode for entering and typing text (entered via `i`, `a`, `o`).
3. **Ex / Last-Line Mode**: Command-line interface at bottom of screen (entered via `:`).

### Q2. [2 Marks] How do you transition between modes in `vi`?
**Model Answer:**
- Command to Insert mode: Press `i` (insert before cursor) or `a` (append after).
- Insert back to Command mode: Press `Esc`.
- Command to Ex mode: Type `:`.
- Ex back to Command mode: Press `Enter` or `Esc`.

### Q3. [2 Marks] In `vi`, what do `yy`, `dd`, and `p` do?
**Model Answer:**
- `yy`: Yanks (copies) the current line into the paste buffer.
- `dd`: Deletes (cuts) the current line into the paste buffer.
- `p`: Puts (pastes) the buffer contents below the current cursor line.

### Q4. [2 Marks] How do you save changes and quit the `vi` editor?
**Model Answer:**
- Save and exit: `:wq` or `:x` or `ZZ` (in command mode).
- Exit without saving (force quit): `:q!`.

### Q5. [2 Marks] What is the Shebang (`#!/bin/bash`) line at the start of a shell script?
**Model Answer:**
The shebang tells the kernel process loader which command interpreter binary to invoke to parse and execute the script file.

### Q6. [2 Marks] What do `$?` and `$$` represent in a shell script?
**Model Answer:**
- `$?`: Stores the **Exit Status** of the most recently executed command (0 = success, non-zero = failure).
- `$$`: Stores the **Process ID (PID)** of the currently executing shell script.

### Q7. [2 Marks] What is Command Substitution in bash?
**Model Answer:**
Command substitution executes a command and replaces it with its standard output string. Syntax: `$(command)` or backticks `` `command` ``.

### Q8. [2 Marks] How do you perform integer arithmetic in bash?
**Model Answer:**
Using `$(( expression ))`: e.g., `sum=$(( a + b ))` or `let sum=a+b` or `expr $a + $b`.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain Essential `vi` Editor Navigation and Editing Commands in a Structured Table.
**Model Answer:**
| Command | Action in `vi` |
| :--- | :--- |
| `h`, `j`, `k`, `l` | Left, Down, Up, Right cursor navigation |
| `0` / `$` | Move cursor to start of line / end of line |
| `G` / `1G` | Move to end of file / first line of file |
| `i` / `a` | Enter insert mode before cursor / after cursor |
| `o` / `O` | Open new blank line below current / above current |
| `x` | Delete single character under cursor |
| `dw` / `cw` | Delete word / change word |
| `u` / `Ctrl+r` | Undo last action / Redo last undo |
| `/pattern` | Search forward for pattern (`n` next, `N` previous) |
| `:%s/old/new/g` | Global search and replace throughout entire file |

### Q2. [5 Marks] Explain Standard Unix Environment Variables and the `$PATH` Variable.
**Model Answer:**
### Key Environment Variables
- **`$PATH`**: Colon-separated list of directories searched by the shell to find executable binaries.
- **`$HOME`**: Path to the current user's home directory (`/home/rohan`).
- **`$USER`**: Username of the logged-in account.
- **`$SHELL`**: Default login shell path (`/bin/bash`).
- **`$PS1`**: Primary shell prompt string.

```bash
# Adding custom bin directory to $PATH persistently in ~/.bashrc
export PATH="$HOME/bin:$PATH"
```

### Q3. [5 Marks] Explain Positional Parameters and Command-Line Arguments in Shell Scripting.
**Model Answer:**
| Variable | Description |
| :--- | :--- |
| `$0` | Name of the executing script file |
| `$1`, `$2`..`$9` | First, second through ninth positional arguments passed |
| `${10}` | Tenth argument (requires curly braces for two digits) |
| `$#` | Total count of positional arguments passed |
| `$*` | All arguments combined into a single continuous string | 
| `$@` | All arguments preserved as individually quoted words `"$1" "$2"` |
| `shift` | Shifts all arguments left by one position (`$2` becomes `$1`) |

### Q4. [5 Marks] Compare Floating-Point Arithmetic using `bc` versus Shell Integer Arithmetic.
**Model Answer:**
Bash natively supports ONLY integer arithmetic. For floating-point precision, piped calculations to **`bc` (Basic Calculator)** are required:

```bash
# 1. Native Integer Arithmetic
a=10; b=3
int_div=$(( a / b ))
echo "Integer Division: $int_div" # Output: 3

# 2. Float Arithmetic with bc
float_div=$(echo "scale=4; $a / $b" | bc)
echo "Floating Point: $float_div"   # Output: 3.3333
```


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Write a Complete Shell Script to Implement a Interactive Calculator Supporting Float Arithmetic using `bc`.
**Comprehensive University Solution:**
```bash
#!/bin/bash
# University Examination Model Solution: Unit 4
# Interactive Multi-function Calculator with bc Float Support

clear
echo "=================================================="
echo "          BCA INTERACTIVE CALCULATOR (BC)"
echo "=================================================="

read -p "Enter first number (X): " num1
read -p "Enter second number (Y): " num2

echo "Select Operation:"
echo "  1. Addition (+)"
echo "  2. Subtraction (-)"
echo "  3. Multiplication (*)"
echo "  4. Division (/ with 4 decimal places)"
echo "  5. Exponentiation (^)"
read -p "Enter Choice [1-5]: " choice

case $choice in
    1)
        res=$(echo "$num1 + $num2" | bc)
        op="+"
        ;;
    2)
        res=$(echo "$num1 - $num2" | bc)
        op="-"
        ;;
    3)
        res=$(echo "$num1 * $num2" | bc)
        op="*"
        ;;
    4)
        if [ $(echo "$num2 == 0" | bc) -eq 1 ]; then
            echo "Error: Division by zero is mathematically undefined!"
            exit 1
        fi
        res=$(echo "scale=4; $num1 / $num2" | bc)
        op="/"
        ;;
    5)
        res=$(echo "$num1 ^ $num2" | bc)
        op="^"
        ;;
    *)
        echo "Invalid operation choice!"
        exit 1
        ;;
esac

echo "--------------------------------------------------"
echo "Result: $num1 $op $num2 = $res"
echo "=================================================="
```

### Q2. [10/15 Marks] Write a Shell Script to Validate User Input and Display Comprehensive System Diagnostic Information.
**Comprehensive University Solution:**
```bash
#!/bin/bash
# System Diagnostics and Health Report Script

REPORT_FILE="sys_health_$(date +%Y%m%d_%H%M%S).txt"

{
echo "===================================================="
echo "        UNIX SYSTEM HEALTH DIAGNOSTIC REPORT"
echo "        Generated On: $(date)"
echo "===================================================="

echo -e "\n1. HOSTNAME & KERNEL INFORMATION:"
echo "Hostname: $(hostname)"
echo "Kernel:   $(uname -srm)"
echo "Uptime:   $(uptime -p)"

echo -e "\n2. CPU & SYSTEM LOAD:"
uptime

echo -e "\n3. MEMORY CONSUMPTION (RAM):"
free -h

echo -e "\n4. DISK STORAGE UTILIZATION:"
df -h -x tmpfs -x devtmpfs

echo -e "\n5. CURRENT LOGGED IN USERS:"
who

echo -e "\n6. TOP 5 CPU CONSUMING PROCESSES:"
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head -n 6

echo "===================================================="
} | tee "$REPORT_FILE"

echo -e "\nDiagnostic report successfully written to $REPORT_FILE"
```

### Q3. [10/15 Marks] Explain the Complete Script Execution Cycle: Subshell Spawning vs Sourcing (`source` / `.`).
**Comprehensive University Solution:**
### Subshell Execution vs Sourcing

| Execution Method | Command | Mechanism | Variable Retention |
| :--- | :--- | :--- | :--- |
| **Direct Execution** | `./script.sh` or `bash script.sh` | Spawns a **Child Subshell** via `fork()` | Child variables DIE upon script termination; cannot modify parent shell environment |
| **Sourcing (Dot operator)** | `source script.sh` or `. script.sh` | Executes commands inside the **CURRENT Parent Shell** | Variables and aliases PERSIST in current active terminal session |

```bash
# Demonstration:
# Inside env_set.sh:
# export TARGET_DB="production_oracle"

./env_set.sh
echo $TARGET_DB # Blank! Child subshell variable disappeared!

source ./env_set.sh
echo $TARGET_DB # Prints 'production_oracle'! Persists in parent shell!
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Be ready to explain vi modes with a transition diagram, `$*` vs `$@`, and how `bc` enables float math in bash.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
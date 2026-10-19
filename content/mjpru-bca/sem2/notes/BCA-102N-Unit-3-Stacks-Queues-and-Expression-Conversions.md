# BCA-102N: Data Structures using C
## Unit 3 Master Exam Revision Notes: Stacks, Queues & Expression Conversions
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `53bd5982-c943-4f1c-b590-538d2da61a1a` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Stack ADT: Definition, LIFO Principle, Array Representation & Primitive Operations (Push, Pop, Peek, IsEmpty, IsFull)**
- [x] **Stack Applications: Function Call Mechanism, Recursion Handling & Reversal**
- [x] **Polish Notations: Infix, Prefix, and Postfix Notations**
- [x] **Conversion from Infix to Postfix Expression using Stack Algorithm**
- [x] **Evaluation of Postfix Expression using Stack Algorithm with Step-by-Step Trace**
- [x] **Queue ADT: Definition, FIFO Principle, Array Representation & Primitive Operations (Enqueue, Dequeue)**
- [x] **Circular Queues: Concept, Need, Full & Empty Condition Calculations**
- [x] **Double-Ended Queues (D-queues): Input-Restricted and Output-Restricted Deques**
- [x] **Priority Queues: Concept, Array/Heap Implementation & Applications**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define a Stack and state its governing operational principle.
**Model Answer:**
A **Stack** is a linear data structure following the **LIFO (Last In, First Out)** principle, where additions (Push) and deletions (Pop) take place exclusively at a single designated end termed the **Top** of stack.

### Q2. [2 Marks] What are Stack Overflow and Stack Underflow conditions in an array implementation?
**Model Answer:**
- **Stack Overflow:** Attempting to push a new element onto a full stack (`top == MAX - 1`).
- **Stack Underflow:** Attempting to pop an element from an empty stack (`top == -1`).

### Q3. [2 Marks] Define Polish Notation and Reverse Polish Notation (RPN).
**Model Answer:**
- **Polish Notation (Prefix):** Operators precede their operands: `+ A B`.
- **Reverse Polish Notation (Postfix):** Operators succeed their operands: `A B +`. It requires zero parentheses for unambiguous evaluation.

### Q4. [2 Marks] What is the role of the System Call Stack in recursion?
**Model Answer:**
Every function call pushes an **Activation Record (Stack Frame)** containing return address, parameters, and local variables onto the call stack. Returning pops the frame, restoring caller state.

### Q5. [2 Marks] Define a Queue and state its governing operational principle.
**Model Answer:**
A **Queue** is a linear data structure following the **FIFO (First In, First Out)** principle, where additions (Enqueue) take place at the **Rear** end and deletions (Dequeue) take place at the **Front** end.

### Q6. [2 Marks] What is the major limitation of a Linear Array Queue and how does a Circular Queue solve it?
**Model Answer:**
In a linear queue, once `rear == MAX - 1`, no new elements can be enqueued even if vacant slots exist at the front due to prior dequeues (false overflow). A **Circular Queue** wraps `rear` around to index 0 using modulo arithmetic: `rear = (rear + 1) % MAX`.

### Q7. [2 Marks] State the Empty and Full conditions for a Circular Queue.
**Model Answer:**
- **Empty Condition:** `front == -1` (or `front == rear` depending on convention).
- **Full Condition:** `(rear + 1) % MAX == front`.

### Q8. [2 Marks] What is a Deque (Double-Ended Queue)? Differentiate Input-Restricted and Output-Restricted Deques.
**Model Answer:**
A Deque allows insertion and deletion at both ends (Front and Rear).
- **Input-Restricted Deque:** Deletions permitted at both ends, but insertions restricted to only one end.
- **Output-Restricted Deque:** Insertions permitted at both ends, but deletions restricted to only one end.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Trace the Infix to Postfix conversion of `A + (B * C - (D / E ^ F) * G) * H` using a stack.
**Model Answer:**
Using standard operator precedence (`^` > `*, /` > `+, -`):
| Symbol Scanned | Stack State (Bottom to Top) | Postfix Output Buffer |
| :--- | :--- | :--- |
| A | Empty | A |
| + | + | A |
| ( | + ( | A |
| B | + ( | A B |
| * | + ( * | A B |
| C | + ( * | A B C |
| - | + ( - (pops *) | A B C * |
| ( | + ( - ( | A B C * |
| D | + ( - ( | A B C * D |
| / | + ( - ( / | A B C * D |
| E | + ( - ( / | A B C * D E |
| ^ | + ( - ( / ^ | A B C * D E |
| F | + ( - ( / ^ | A B C * D E F |
| ) | + ( - (pops ^, /) | A B C * D E F ^ / |
| * | + ( - * | A B C * D E F ^ / |
| G | + ( - * | A B C * D E F ^ / G |
| ) | + (pops *, -) | A B C * D E F ^ / G * - |
| * | + * | A B C * D E F ^ / G * - |
| H | + * | A B C * D E F ^ / G * - H |
| End | Empty (pops *, +) | **A B C * D E F ^ / G * - H * +** |

### Q2. [5 Marks] Trace step-by-step the Evaluation of Postfix Expression: `6 2 3 + - 3 8 2 / + * 2 ^ 3 +`.
**Model Answer:**
Postfix evaluation uses an operand stack. Scanning left to right:
1. Push 6, Push 2, Push 3. Stack: `[6, 2, 3]`.
2. Operator `+`: Pop 3, Pop 2. Compute `2 + 3 = 5`. Push 5. Stack: `[6, 5]`.
3. Operator `-`: Pop 5, Pop 6. Compute `6 - 5 = 1`. Push 1. Stack: `[1]`.
4. Push 3, Push 8, Push 2. Stack: `[1, 3, 8, 2]`.
5. Operator `/`: Pop 2, Pop 8. Compute `8 / 2 = 4`. Push 4. Stack: `[1, 3, 4]`.
6. Operator `+`: Pop 4, Pop 3. Compute `3 + 4 = 7`. Push 7. Stack: `[1, 7]`.
7. Operator `*`: Pop 7, Pop 1. Compute `1 * 7 = 7`. Push 7. Stack: `[7]`.
8. Push 2. Operator `^`: Pop 2, Pop 7. Compute `7^2 = 49`. Push 49. Stack: `[49]`.
9. Push 3. Operator `+`: Pop 3, Pop 49. Compute `49 + 3 = 52`. Push 52. Stack: `[52]`.
**Final Result:** **52**.

### Q3. [5 Marks] Explain the implementation of a Priority Queue using an array and explain its real-world applications.
**Model Answer:**
A **Priority Queue** is a queue where each element has an assigned priority. Elements are dequeued in order of priority rather than arrival time. In an ascending priority queue, the element with the lowest numerical value has the highest priority.
- **Applications:** CPU Process Scheduling (Shortest Job First), Dijkstra's Shortest Path Algorithm, Prim's Minimum Spanning Tree, Bandwidth management in network routers.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Write a complete C program implementing a Circular Queue using an array with Enqueue, Dequeue, and Display operations.
**Comprehensive University Solution:**
```c
#include <stdio.h>
#include <stdlib.h>

#define MAX 5

int cqueue[MAX];
int front = -1, rear = -1;

int isFull() {
    return ((rear + 1) % MAX == front);
}

int isEmpty() {
    return (front == -1);
}

void enqueue(int val) {
    if (isFull()) {
        printf("Circular Queue Overflow! Cannot insert %d\n", val);
        return;
    }
    if (isEmpty()) {
        front = rear = 0;
    } else {
        rear = (rear + 1) % MAX;
    }
    cqueue[rear] = val;
    printf("Enqueued: %d (Front: %d, Rear: %d)\n", val, front, rear);
}

int dequeue() {
    if (isEmpty()) {
        printf("Circular Queue Underflow!\n");
        return -1;
    }
    int val = cqueue[front];
    if (front == rear) {
        front = rear = -1; // Reset when queue becomes empty
    } else {
        front = (front + 1) % MAX;
    }
    printf("Dequeued: %d (New Front: %d, Rear: %d)\n", val, front, rear);
    return val;
}

void display() {
    if (isEmpty()) {
        printf("Queue is Empty!\n");
        return;
    }
    printf("Queue Elements: ");
    int i = front;
    while (1) {
        printf("%d ", cqueue[i]);
        if (i == rear) break;
        i = (i + 1) % MAX;
    }
    printf("\n");
}

int main() {
    enqueue(10);
    enqueue(20);
    enqueue(30);
    enqueue(40);
    display();
    dequeue();
    dequeue();
    display();
    enqueue(50);
    enqueue(60); // Demonstrates circular wrap-around to index 0
    display();
    return 0;
}
```

### Q2. [10/15 Marks] Explain the Infix to Postfix conversion algorithm using Stack. Write complete C code and explain how parenthesized expressions are handled.
**Comprehensive University Solution:**
### 1. Algorithm Overview
1. Initialize an empty operator stack.
2. Scan the infix expression string from left to right:
   - If the scanned character is an operand, directly append it to the postfix output.
   - If `(`, push it onto the stack.
   - If `)`, pop and append from the stack until a `(` is popped. Discard both parentheses.
   - If an operator `op`: while the stack is not empty and precedence of top operator >= precedence of `op` (with right-associativity consideration for `^`), pop and append to output. Then push `op`.
3. After scanning all tokens, pop and append all remaining operators from the stack.

### 2. C Implementation
```c
#include <stdio.h>
#include <ctype.h>
#include <string.h>

char stack[100];
int top = -1;

void push(char c) { stack[++top] = c; }
char pop() { return stack[top--]; }
char peek() { return stack[top]; }

int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

void infixToPostfix(char infix[], char postfix[]) {
    int k = 0;
    for (int i = 0; infix[i] != '\0'; i++) {
        char ch = infix[i];
        if (isalnum(ch)) {
            postfix[k++] = ch;
        } else if (ch == '(') {
            push(ch);
        } else if (ch == ')') {
            while (top != -1 && peek() != '(') postfix[k++] = pop();
            pop(); // Discard '('
        } else {
            while (top != -1 && precedence(peek()) >= precedence(ch) && ch != '^') {
                postfix[k++] = pop();
            }
            push(ch);
        }
    }
    while (top != -1) postfix[k++] = pop();
    postfix[k] = '\0';
}

int main() {
    char infix[] = "(A+B)*(C-D)/E";
    char postfix[100];
    infixToPostfix(infix, postfix);
    printf("Infix:   %s\nPostfix: %s\n", infix, postfix);
    return 0;
}
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-102N Unit 3, a tabular trace of Infix-to-Postfix conversion or Postfix evaluation is a guaranteed 5-mark or 10-mark question. In addition, the circular queue C program with modulo arithmetic (`(rear + 1) % MAX`) appears in almost every alternate university question paper.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
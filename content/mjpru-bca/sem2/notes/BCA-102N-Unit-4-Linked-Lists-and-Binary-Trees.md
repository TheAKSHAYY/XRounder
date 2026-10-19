# BCA-102N: Data Structures using C
## Unit 4 Master Exam Revision Notes: Linked Lists & Binary Trees
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `661c3be6-4072-4dad-b5c5-006a796149b1` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Introduction to Linked Lists: Dynamic Memory Allocation vs Static Arrays**
- [x] **Singly Linked List: Node Structure, Traversal, Searching, Insertion (Start, End, Middle) & Deletion**
- [x] **Doubly Linked Lists (Two-Way Lists): Structure, Forward/Backward Traversal, Insertion & Deletion**
- [x] **Circular Linked Lists: Singly Circular and Doubly Circular Lists**
- [x] **Header Linked Lists: Grounded Header and Circular Header Lists**
- [x] **Trees: Introduction, Basic Terminology (Root, Node, Degree, Level, Height, Subtree)**
- [x] **Binary Trees: Definition, Full, Complete, Extended (Strict) Binary Tree Properties**
- [x] **Binary Tree Traversals: Inorder (LNR), Preorder (NLR), Postorder (LRN)**
- [x] **Recursive Algorithms for Tree Operations: Traversal, Node Insertion, and Deletion**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Compare Arrays and Linked Lists across Memory Allocation, Access Time, and Insertion/Deletion.
**Model Answer:**
| Feature | Array | Linked List |
| :--- | :--- | :--- |
| **Allocation** | Static contiguous memory | Dynamic non-contiguous heap nodes |
| **Access Time** | Direct O(1) by index | Sequential O(n) traversal |
| **Insertion/Deletion** | Costly O(n) due to shifting | Fast O(1) if pointer is known (no shifting) |
| **Memory Overhead** | Zero pointer overhead | Overhead of 4–8 bytes per pointer per node |

### Q2. [2 Marks] Define a Doubly Linked List (Two-Way List) and write its node structure in C.
**Model Answer:**
A Doubly Linked List node has two pointers: one pointing to the preceding node (`prev`) and one to the succeeding node (`next`), allowing bi-directional traversal.
```c
struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
};
```

### Q3. [2 Marks] What is a Circular Linked List? State its distinguishing advantage.
**Model Answer:**
A linked list where the `next` pointer of the last node points back to the `head` node rather than NULL. Advantage: Any node can be designated as the starting point to traverse the entire list.

### Q4. [2 Marks] What is a Header Linked List? Differentiate Grounded and Circular Header lists.
**Model Answer:**
A list containing a special dummy header node at the beginning holding metadata (e.g., node count).
- **Grounded Header List:** The last node's `next` pointer is NULL.
- **Circular Header List:** The last node's `next` pointer points back to the header node.

### Q5. [2 Marks] Define Root, Leaf, Degree of a Node, and Height of a Tree.
**Model Answer:**
- **Root:** The topmost unique node with no incoming parent edge.
- **Leaf (Terminal):** A node with degree 0 (no children).
- **Degree of Node:** The total number of subtrees (children) attached to it.
- **Height:** The length of the longest path from root to any leaf node.

### Q6. [2 Marks] Differentiate Full Binary Tree, Complete Binary Tree, and Strictly Binary Tree.
**Model Answer:**
- **Strictly (Extended) Binary Tree:** Every node has either exactly 0 or 2 children.
- **Full Binary Tree:** All interior nodes have 2 children and all leaf nodes are at the identical maximum depth.
- **Complete Binary Tree:** All levels are completely filled except possibly the last, which is filled from strictly left to right.

### Q7. [2 Marks] State the order of node visits in Inorder, Preorder, and Postorder traversals.
**Model Answer:**
- **Preorder (NLR):** Node (Visit) -> Left Subtree -> Right Subtree.
- **Inorder (LNR):** Left Subtree -> Node (Visit) -> Right Subtree.
- **Postorder (LRN):** Left Subtree -> Right Subtree -> Node (Visit).

### Q8. [2 Marks] If a binary tree has `N` leaf nodes in a strict binary tree, how many non-leaf (internal) nodes does it have?
**Model Answer:**
A strictly binary tree with `N` leaf nodes always contains exactly `N - 1` internal nodes, yielding total nodes `2N - 1`.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Given the Inorder and Preorder traversals, construct the unique Binary Tree:
Inorder: `D B E A F C`
Preorder: `A B D E C F`.
**Model Answer:**
### Step-by-Step Construction
1. From Preorder, the first element is the **Root: `A`**.
2. In Inorder, elements to the left of `A` are in the Left Subtree: `{D, B, E}`. Elements to the right are in the Right Subtree: `{F, C}`.
3. **Left Subtree `{D, B, E}`:** In Preorder, `B` appears first, so `B` is the root of the left subtree. In Inorder, `D` is left of `B` (left child) and `E` is right of `B` (right child).
4. **Right Subtree `{F, C}`:** In Preorder, `C` appears before `F`, so `C` is the root of the right subtree. In Inorder, `F` is to the left of `C` (left child).

```
       A
      / \
     B   C
    / \  /
   D   E F
```
Verification: Inorder traversal is `D, B, E, A, F, C` (matches).

### Q2. [5 Marks] Write recursive C functions to implement Preorder, Inorder, and Postorder tree traversals.
**Model Answer:**
```c
#include <stdio.h>

struct Node {
    int data;
    struct Node *left;
    struct Node *right;
};

void preorder(struct Node* root) {
    if (root != NULL) {
        printf("%d ", root->data); // N
        preorder(root->left);       // L
        preorder(root->right);      // R
    }
}

void inorder(struct Node* root) {
    if (root != NULL) {
        inorder(root->left);        // L
        printf("%d ", root->data); // N
        inorder(root->right);       // R
    }
}

void postorder(struct Node* root) {
    if (root != NULL) {
        postorder(root->left);      // L
        postorder(root->right);     // R
        printf("%d ", root->data); // N
    }
}
```


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Write a complete C program to create a Singly Linked List and implement: (1) Insertion at Beginning, (2) Insertion at End, (3) Deletion of a specific key, (4) Traversal.
**Comprehensive University Solution:**
```c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* head = NULL;

void insertBeginning(int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = head;
    head = newNode;
    printf("Inserted %d at beginning\n", val);
}

void insertEnd(int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;
    if (head == NULL) {
        head = newNode;
        return;
    }
    struct Node* temp = head;
    while (temp->next != NULL) temp = temp->next;
    temp->next = newNode;
    printf("Inserted %d at end\n", val);
}

void deleteKey(int key) {
    struct Node *temp = head, *prev = NULL;
    if (temp != NULL && temp->data == key) {
        head = temp->next;
        free(temp);
        printf("Deleted key %d from head\n", key);
        return;
    }
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }
    if (temp == NULL) {
        printf("Key %d not found in list!\n", key);
        return;
    }
    prev->next = temp->next;
    free(temp);
    printf("Deleted key %d\n", key);
}

void display() {
    struct Node* temp = head;
    printf("List: ");
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

int main() {
    insertBeginning(20);
    insertBeginning(10);
    insertEnd(30);
    insertEnd(40);
    display(); // 10 -> 20 -> 30 -> 40 -> NULL
    deleteKey(20);
    display(); // 10 -> 30 -> 40 -> NULL
    return 0;
}
```

### Q2. [10/15 Marks] Explain Doubly Linked Lists in detail. Write algorithms and draw pointer diagrams for inserting a node before a given node and deleting a specified node.
**Comprehensive University Solution:**
### 1. Pointer Mechanics of Doubly Linked List
In a Doubly Linked List, each node maintains two pointer links (`prev` and `next`), enabling bidirectional movement.

### 2. Insertion Before a Given Node `curr`
Let new node be `newNode`.
```
       [ prevNode ] <===> [ curr ]
                   \     /
                    [ newNode ]
```
Algorithm:
1. `newNode->data = val;`
2. `newNode->next = curr;`
3. `newNode->prev = curr->prev;`
4. `if (curr->prev != NULL) curr->prev->next = newNode; else head = newNode;`
5. `curr->prev = newNode;`

### 3. Deletion of a Node `delNode`
1. If `delNode == head`: `head = delNode->next;`
2. If `delNode->next != NULL`: `delNode->next->prev = delNode->prev;`
3. If `delNode->prev != NULL`: `delNode->prev->next = delNode->next;`
4. `free(delNode);`
Both operations execute in strictly `O(1)` time without requiring traversal to locate the previous node.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-102N Unit 4, tree traversal construction (reconstructing a binary tree from Inorder + Preorder sequences) is an examiner favorite. Always show the step-by-step subtree partitioning and draw the final verified tree diagram.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
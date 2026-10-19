# BCA-102N: Data Structures using C
## Unit 5 Master Exam Revision Notes: AVL Trees, M-way Search Trees & B-Trees
**Target Examination:** MJPRU Bareilly BCA Semester 2 (CBCS Pattern 2024–25)
**Unit Identifier:** `ddf16cc1-c0b4-47c2-94ef-c4c53a1ae803` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Binary Search Trees (BST): Properties, Insertion, Searching, and Deletion Cases**
- [x] **AVL Trees: Definition, Balance Factor (-1, 0, +1) & Height-Balanced Tree Concept**
- [x] **AVL Tree Rotations: LL, RR, LR, and RL Rotations with Rebalancing Examples**
- [x] **M-Way Search Trees: Concept, Multi-way Branching, Properties and Search Operations**
- [x] **Multilevel Indexing & Tree-Based Indexes: Concept, Advantages over Sequential Indexes**
- [x] **B-Trees: Formal Definition, Properties (Order m, Key Limits, Node Splitting & Merging)**
- [x] **B-Tree Construction & Key Insertion Algorithm with Step-by-Step Examples**
- [x] **B+ Trees: Concept, Linked Leaf Nodes & Comparison with B-Trees**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] State the defining property of a Binary Search Tree (BST).
**Model Answer:**
For every node `X` in a BST: all keys in its left subtree are strictly less than `X.key`, and all keys in its right subtree are strictly greater than `X.key` (`Left < Root < Right`).

### Q2. [2 Marks] What traversal of a Binary Search Tree produces keys in strictly ascending sorted order?
**Model Answer:**
**Inorder Traversal (Left-Root-Right)** of a BST always yields keys in strictly ascending numerical order.

### Q3. [2 Marks] Define an AVL Tree and write the formula for Balance Factor (BF).
**Model Answer:**
An AVL Tree is a self-balancing binary search tree where the heights of the two child subtrees of any node differ by at most 1.
`Balance Factor (BF) = Height(Left_Subtree) - Height(Right_Subtree) ∈ {-1, 0, +1}`.

### Q4. [2 Marks] Name the four basic rebalancing rotations used in AVL Trees.
**Model Answer:**
1. **LL (Left-Left) Rotation:** Single Right rotation.
2. **RR (Right-Right) Rotation:** Single Left rotation.
3. **LR (Left-Right) Rotation:** Double rotation (Left rotate left child, then Right rotate node).
4. **RL (Right-Left) Rotation:** Double rotation (Right rotate right child, then Left rotate node).

### Q5. [2 Marks] What is the worst-case search complexity in an AVL Tree versus an unbalanced BST?
**Model Answer:**
- **Unbalanced BST:** O(n) (degrades to a skewed linked list when keys arrive sorted).
- **AVL Tree:** Strictly O(log2 n) guaranteed due to height balance `h <= 1.44 log2 n`.

### Q6. [2 Marks] Define an M-Way Search Tree.
**Model Answer:**
An M-Way search tree is a multi-way tree where each node can have at most `M` children and contains at most `M - 1` sorted keys acting as partition boundaries.

### Q7. [2 Marks] What is a B-Tree of order m?
**Model Answer:**
A B-Tree of order `m` is a self-balancing balanced m-way search tree where:
- The root has at least 2 children (unless it is a leaf).
- Every internal node has at least `ceil(m/2)` children and at most `m` children.
- All leaf nodes reside at the exact same depth level.

### Q8. [2 Marks] How does a B+ Tree differ from a standard B-Tree?
**Model Answer:**
In a B+ Tree, **all user data records/pointers are stored exclusively in leaf nodes**, while internal nodes store only search keys. Furthermore, **all leaf nodes are linked sequentially as a linked list**, enabling rapid range queries.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the four AVL Tree rotations (LL, RR, LR, RL) with clear node transformation diagrams.
**Model Answer:**
### 1. LL Rotation (Single Right Rotation)
Triggered when an insertion occurs into the left subtree of the left child (node BF becomes +2 and left child BF is +1).
```
      Z (+2)                 Y (0)
     /                      / \
    Y (+1)   =====>        X   Z
   /
  X
```

### 2. RR Rotation (Single Left Rotation)
Triggered when insertion occurs into the right subtree of right child (node BF becomes -2, right child BF is -1).
```
  Z (-2)                     Y (0)
   \                        / \
    Y (-1)   =====>        Z   X
     \
      X
```

### 3. LR Rotation (Left-Rotate Y, then Right-Rotate Z)
Triggered when insertion occurs into right subtree of left child.
```
    Z (+2)             Z              X
   /                  /              / \
  Y (-1)   =====>    X      =====>  Y   Z
   \
    X               Y
```

### 4. RL Rotation (Right-Rotate Y, then Left-Rotate Z)
Triggered when insertion occurs into left subtree of right child.

### Q2. [5 Marks] Construct an AVL Tree by inserting the following sequence of keys step-by-step: `10, 20, 30, 40, 50, 25`.
**Model Answer:**
1. **Insert 10, 20, 30:**
   - Insert 10 (BF 0).
   - Insert 20: 10 has BF -1.
   - Insert 30: 10 has BF -2, right child 20 has BF -1 -> **RR Imbalance at 10**. Apply **Single Left Rotation** on 10:
   ```
        20
       /  \
      10   30
   ```
2. **Insert 40:** 30 has BF -1, 20 has BF -1. Tree is balanced.
3. **Insert 50:** 30 has BF -2, 40 has BF -1 -> **RR Imbalance at 30**. Apply **Single Left Rotation** on 30:
   ```
        20
       /  \
      10   40
          /  \
         30   50
   ```
4. **Insert 25:** Subtree at 20 has Left Height 1, Right Height 3 => BF = 1 - 3 = -2. Right child 40 has left height 2, right height 1 => BF = +1. **RL Imbalance at 20**.
   - Rotate right on 40 (child):
   - Rotate left on 20 (root):
   Final Balanced AVL Tree:
   ```
            30
          /    \
        20      40
       /  \       \
      10   25      50
   ```


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Discuss B-Trees in detail. State all structural properties of a B-Tree of order m and construct a B-Tree of order 3 (2-3 Tree) by inserting: `10, 20, 30, 40, 50, 60, 70, 80`.
**Comprehensive University Solution:**
### 1. Structural Properties of B-Tree of Order m
1. **Root:** Has at least 2 children (if not a leaf).
2. **Internal Nodes:** Have at least $\lceil m/2 \rceil$ children and at most $m$ children.
3. **Keys per Node:** Minimum keys = $\lceil m/2 \rceil - 1$, Maximum keys = $m - 1$.
4. **Sorted Keys:** Keys within any node are stored in ascending order: $k_1 < k_2 < \dots < k_n$.
5. **Leaf Level:** All leaf nodes are at the exact same depth level (perfect balance).

### 2. Construction of B-Tree of Order 3 (Max Keys = 2, Min Keys = 1)
- **Insert 10, 20:** Node `[10, 20]`.
- **Insert 30:** Node overflows `[10, 20, 30]`. Middle key `20` splits and pushes up to new root:
  ```
        [ 20 ]
       /      \
    [ 10 ]   [ 30 ]
  ```
- **Insert 40:** Node `[30]` becomes `[30, 40]`.
- **Insert 50:** Node `[30, 40, 50]` overflows. Middle key `40` pushes up to root `[20, 40]`:
  ```
         [ 20, 40 ]
        /    |     \
    [ 10 ] [ 30 ]  [ 50 ]
  ```
- **Insert 60:** Node `[50]` becomes `[50, 60]`.
- **Insert 70:** Node `[50, 60, 70]` overflows. Middle key `60` pushes up. Root `[20, 40, 60]` overflows! Middle key `40` pushes up to form new root level:
  ```
              [ 40 ]
             /      \
         [ 20 ]    [ 60 ]
        /     \    /    \
      [10]   [30] [50]  [70]
  ```
- **Insert 80:** Node `[70]` becomes `[70, 80]`.
All leaves are at depth 2.

### Q2. [10/15 Marks] Write comprehensive algorithms for Insertion, Searching, and Deletion in a Binary Search Tree (BST) with C code implementation.
**Comprehensive University Solution:**
```c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int key;
    struct Node *left, *right;
};

struct Node* newNode(int item) {
    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
    temp->key = item;
    temp->left = temp->right = NULL;
    return temp;
}

struct Node* insert(struct Node* node, int key) {
    if (node == NULL) return newNode(key);
    if (key < node->key) node->left = insert(node->left, key);
    else if (key > node->key) node->right = insert(node->right, key);
    return node;
}

struct Node* search(struct Node* root, int key) {
    if (root == NULL || root->key == key) return root;
    if (key < root->key) return search(root->left, key);
    return search(root->right, key);
}

struct Node* minValueNode(struct Node* node) {
    struct Node* current = node;
    while (current && current->left != NULL) current = current->left;
    return current;
}

struct Node* deleteNode(struct Node* root, int key) {
    if (root == NULL) return root;
    if (key < root->key) root->left = deleteNode(root->left, key);
    else if (key > root->key) root->right = deleteNode(root->right, key);
    else {
        // Case 1 & 2: 0 or 1 child
        if (root->left == NULL) {
            struct Node* temp = root->right; free(root); return temp;
        } else if (root->right == NULL) {
            struct Node* temp = root->left; free(root); return temp;
        }
        // Case 3: 2 children. Find Inorder Successor
        struct Node* temp = minValueNode(root->right);
        root->key = temp->key;
        root->right = deleteNode(root->right, temp->key);
    }
    return root;
}
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-102N Unit 5, drawing step-by-step AVL tree rotations (LL, RR, LR, RL) or B-Tree key insertion with node splits is virtually guaranteed in the university question paper for 10–15 marks. Draw each state clearly indicating the overflow key and the split point.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
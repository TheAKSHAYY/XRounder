# BCA-411E: Discrete Mathematics
## Unit 5 Master Exam Revision Notes: Graph Theory, Trees & Network Algorithms
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `4612b805-4412-5c85-8a70-f2066b6e18dd` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Graph Fundamentals: Definition G = (V, E), Vertices, Edges, Directed Graphs (Digraphs) vs Undirected Graphs**
- [x] **Graph Terminology: Adjacent Vertices, Incident Edges, Degree of a Vertex (deg(v)), In-degree and Out-degree**
- [x] **Handshaking Theorem (Euler): Sum of Degrees of all Vertices = 2 * |E|, Proof and Corollaries (Number of Odd Vertices is Even)**
- [x] **Types of Graphs: Simple Graphs, Multigraphs, Pseudographs (Self-Loops and Parallel Edges)**
- [x] **Special Families of Simple Graphs: Complete Graphs (K_n), Cycle Graphs (C_n), Wheel Graphs (W_n), Regular Graphs (k-regular)**
- [x] **Bipartite Graphs: Definition, Characterization (Graph is Bipartite iff it has No Odd Cycles), Complete Bipartite Graphs (K_{m,n})**
- [x] **Subgraphs, Isomorphic Graphs, and Homeomorphic Graphs: Invariants of Graph Isomorphism**
- [x] **Walks, Trails, Paths, and Cycles: Connected Graphs, Connected Components, Cut-Points (Articulation Points) and Bridges**
- [x] **Eulerian Graphs: Eulerian Trail, Eulerian Circuit, Euler's Theorem (Connected Graph is Eulerian iff Every Vertex has Even Degree)**
- [x] **Hamiltonian Graphs: Hamiltonian Path, Hamiltonian Cycle, Dirac's Theorem and Ore's Theorem Criteria**
- [x] **Planar Graphs: Euler's Planar Formula V - E + F = 2, Non-Planar Graphs, Kuratowski's Theorem (K_5 and K_{3,3})**
- [x] **Graph Coloring: Vertex Coloring, Chromatic Number chi(G), The Famous Four Color Theorem**
- [x] **Tree Fundamentals: Definition as Connected Acyclic Graph, Equivalent Characterizations of Trees (n vertices, n-1 edges)**
- [x] **Spanning Trees: Definition, Existence in Connected Graphs, Fundamental Cycles and Fundamental Cutsets**
- [x] **Minimum Spanning Tree (MST) Algorithms: Kruskal's Greedy Algorithm (Disjoint Set Union) and Prim's Algorithm**
- [x] **Matrix Representations of Graphs: Adjacency Matrix (A), Properties of Adjacency Matrix Powers, Incidence Matrix (M)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define a Graph and state the Handshaking Theorem.
**Model Answer:**
A **Graph** $G = (V, E)$ consists of a non-empty set of vertices $V$ and a set of edges $E$.
**Euler's Handshaking Theorem:** In any undirected graph, the sum of the degrees of all vertices equals twice the total number of edges:
$$\sum_{v \in V} \deg(v) = 2 |E|$$
*(Corollary: In any graph, the number of vertices with odd degree is always even)*.

### Q2. [2 Marks] What is a Complete Graph ($K_n$) and how many edges does it contain?
**Model Answer:**
A **Complete Graph** $K_n$ is a simple graph in which every pair of distinct vertices is connected by a unique edge.
Total number of edges in $K_n$ is:
$$|E| = \binom{n}{2} = \frac{n(n - 1)}{2}$$

### Q3. [2 Marks] Define a Bipartite Graph and state its cycle characterization.
**Model Answer:**
A simple graph $G$ is **Bipartite** if its vertex set $V$ can be partitioned into two disjoint sets $V_1$ and $V_2$ such that every edge in $G$ connects a vertex in $V_1$ to a vertex in $V_2$.
**Theorem:** A graph is Bipartite **if and only if it contains NO odd cycles**.

### Q4. [2 Marks] Differentiate between Eulerian and Hamiltonian Graphs.
**Model Answer:**
An **Eulerian Graph** contains an Euler circuit—a closed walk that visits **every edge** of the graph exactly once (Condition: Connected and every vertex has even degree).
A **Hamiltonian Graph** contains a Hamiltonian cycle—a closed cycle that visits **every vertex** of the graph exactly once (except start/end).

### Q5. [2 Marks] State Euler's Planar Formula for connected planar graphs.
**Model Answer:**
For any connected planar graph with $V$ vertices, $E$ edges, and $F$ faces (regions):
$$\mathbf{V - E + F = 2}$$

### Q6. [2 Marks] Define a Tree and state three equivalent characterizations.
**Model Answer:**
A **Tree** is a connected acyclic undirected graph.
**Equivalent Characterizations:**
1. $G$ is connected and has $n - 1$ edges.
2. $G$ is acyclic and has $n - 1$ edges.
3. There is a unique simple path between every pair of vertices.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] State and prove Euler's Handshaking Theorem, and prove that the number of vertices of odd degree in any graph is even.
**Model Answer:**
### Proof of Euler's Handshaking Theorem

#### Theorem:
In any undirected graph $G = (V, E)$:
$$\sum_{v \in V} \deg(v) = 2 |E|$$

---

#### Proof:
Each edge $e = (u, v)$ has two endpoints. When calculating the degree of each vertex, each edge contributes:
- $+1$ to $\deg(u)$
- $+1$ to $\deg(v)$
Thus, every edge is counted exactly twice in the sum $\sum_{v \in V} \deg(v)$.  
Therefore, the sum of all vertex degrees must equal $2 |E|$. $\mathbf{Q.E.D.}$

---

#### Corollary: The number of vertices of odd degree is even
Partition vertex set $V$ into $V_{\text{even}}$ (vertices with even degree) and $V_{\text{odd}}$ (vertices with odd degree):
$$\sum_{v \in V_{\text{even}}} \deg(v) + \sum_{v \in V_{\text{odd}}} \deg(v) = 2 |E|$$

Notice:
- $2 |E|$ is clearly even.
- $\sum_{v \in V_{\text{even}}} \deg(v)$ is a sum of even integers, which is always even.
Subtracting the even sum from both sides:
$$\sum_{v \in V_{\text{odd}}} \deg(v) = 2 |E| - \sum_{v \in V_{\text{even}}} \deg(v) = \text{Even}$$
The sum of odd numbers can be even **if and only if** the total number of terms is an **EVEN INTEGER**.  
Therefore, the number of vertices with odd degree must be even.

### Q2. [5 Marks] Explain Kuratowski's Theorem for Planar Graphs with diagrams of K_5 and K_{3,3}.
**Model Answer:**
### Kuratowski's Planarity Theorem

#### Theorem Statement:
A graph is planar **if and only if** it does not contain a subgraph that is homeomorphic to (or can be contracted to) either:
1. **$K_5$** (Complete graph on 5 vertices).
2. **$K_{3,3}$** (Complete bipartite utility graph on 3 and 3 vertices).

```
          K_5 (5 Vertices, 10 Edges)                    K_3,3 (6 Vertices, 9 Edges)
                   (1)                                   (A)       (B)       (C)
                 /  |  \                                   | \   /   |   \   / |
               /    |    \                                  |   X     |     X   |
             /      |      \                                | /   \   |   /   \ |
           (5)------+------(2)                           (1)       (2)       (3)
             \     |     /                             (Every top vertex connects
              \    |    /                               to all 3 bottom vertices)
               (4)---(3)
```

#### Planarity Inequality:
For any simple connected planar graph with $V \ge 3$:
$$E \le 3V - 6$$
- For $K_5$: $V = 5, E = 10$. Checking inequality: $10 \le 3(5) - 6 = 9$ is **FALSE ($10 \not\le 9$)**. Hence $K_5$ is non-planar.
- For $K_{3,3}$: Bipartite graphs have no triangles, so $E \le 2V - 4$. For $K_{3,3}$, $V=6, E=9$: $9 \le 2(6) - 4 = 8$ is **FALSE ($9 \not\le 8$)**. Hence $K_{3,3}$ is non-planar.

### Q3. [5 Marks] Compare Kruskal's Algorithm and Prim's Algorithm for finding Minimum Spanning Trees (MST).
**Model Answer:**
### Kruskal's vs Prim's MST Algorithms

```
Kruskal's Algorithm:                       Prim's Algorithm:
Grows a forest by adding globally          Grows a single tree outward from an
lightest edges, checking for cycles.       arbitrary starting root vertex.

Edges sorted by weight:                    Tree Vertices: { A }
(A,B): 1 -> added                          Lightest cut-edge: (A,B) -> add B
(C,D): 2 -> added                          Next lightest cut-edge: (B,C) -> add C
(A,C): 3 -> added
(B,D): 4 -> REJECTED (creates cycle!)
```

| Feature | Kruskal's Algorithm | Prim's Algorithm |
| :--- | :--- | :--- |
| **Strategy** | Edge-based greedy strategy. | Vertex-based greedy strategy. |
| **Data Structure** | Disjoint Set Union (DSU / Union-Find) to detect cycles. | Priority Queue (Min-Heap) storing shortest distances to cut. |
| **Intermediate State** | A collection of disconnected trees (forest) merging gradually. | Always a single connected growing tree. |
| **Time Complexity** | $O(E \log E)$ or $O(E \log V)$. | $O(E \log V)$ with binary heap; $O(E + V \log V)$ with Fibonacci heap. |
| **Best Suited For** | **Sparse graphs** ($E \ll V^2$). | **Dense graphs** ($E \approx V^2$). |


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Given the weighted connected undirected graph with vertices {A, B, C, D, E, F} and edges: (A,B)=2, (A,C)=4, (B,C)=1, (B,D)=7, (C,E)=3, (D,E)=2, (D,F)=1, (E,F)=5. Find the Minimum Spanning Tree (MST) and its total minimum weight using: (a) Kruskal's Algorithm, and (b) Prim's Algorithm starting at vertex A. Show step-by-step progress.
**Comprehensive University Solution:**
### Minimum Spanning Tree (MST) Numerical Problem

#### Given Graph Specs:
- Vertices: $V = \{A, B, C, D, E, F\}$ ($|V| = 6$).
- A Spanning Tree must contain exactly $|V| - 1 = \mathbf{5\text{ edges}}$ connecting all 6 vertices without cycles.

---

### (a) Kruskal's Algorithm

#### Step 1: Sort All Edges in Ascending Order of Weights
1. $(B, C) = 1$
2. $(D, F) = 1$
3. $(A, B) = 2$
4. $(D, E) = 2$
5. $(C, E) = 3$
6. $(A, C) = 4$
7. $(E, F) = 5$
8. $(B, D) = 7$

#### Step 2: Edge Selection with Cycle Detection (DSU):
- **Pick $(B, C) = 1$:** Vertices $B, C$ in different sets. **ACCEPTED.** (Edges: 1)
- **Pick $(D, F) = 1$:** Vertices $D, F$ in different sets. **ACCEPTED.** (Edges: 2)
- **Pick $(A, B) = 2$:** Vertices $A, B$ in different sets. **ACCEPTED.** (Edges: 3)
- **Pick $(D, E) = 2$:** Vertices $D, E$ in different sets. **ACCEPTED.** (Edges: 4)
- **Pick $(C, E) = 3$:** Connects component $\{A, B, C\}$ with component $\{D, E, F\}$. **ACCEPTED.** (Edges: 5)

*Target of 5 edges reached! Stop algorithm.*

#### MST Edges Selected by Kruskal:
$$\{(B, C), (D, F), (A, B), (D, E), (C, E)\}$$
$$\text{Total Minimum Weight} = 1 + 1 + 2 + 2 + 3 = \mathbf{9}$$

---

### (b) Prim's Algorithm (Starting from Vertex A)

Initialize tree vertex set $T = \{A\}$.

- **Step 1 ($T = \{A\}$):**  
  Available cut edges from $A$: $(A, B)=2, (A, C)=4$.  
  Lightest edge: **$(A, B) = 2$**. Add $B$.  
  $T = \{A, B\}$, Edges = $\{(A, B)\}$, Weight = $2$.

- **Step 2 ($T = \{A, B\}$):**  
  Available cut edges from $\{A, B\}$: $(A, C)=4, (B, C)=1, (B, D)=7$.  
  Lightest edge: **$(B, C) = 1$**. Add $C$.  
  $T = \{A, B, C\}$, Edges = $\{(A, B), (B, C)\}$, Weight = $2 + 1 = 3$.

- **Step 3 ($T = \{A, B, C\}$):**  
  Available cut edges: $(C, E)=3, (B, D)=7$.  
  Lightest edge: **$(C, E) = 3$**. Add $E$.  
  $T = \{A, B, C, E\}$, Edges = $\{(A, B), (B, C), (C, E)\}$, Weight = $3 + 3 = 6$.

- **Step 4 ($T = \{A, B, C, E\}$):**  
  Available cut edges: $(E, D)=2, (E, F)=5, (B, D)=7$.  
  Lightest edge: **$(E, D) = 2$**. Add $D$.  
  $T = \{A, B, C, D, E\}$, Edges = $\{(A, B), (B, C), (C, E), (E, D)\}$, Weight = $6 + 2 = 8$.

- **Step 5 ($T = \{A, B, C, D, E\}$):**  
  Available cut edges to unvisited vertex $F$: $(D, F)=1, (E, F)=5$.  
  Lightest edge: **$(D, F) = 1$**. Add $F$.  
  $T = \{A, B, C, D, E, F\}$. All vertices visited!

#### Final MST Weight:
$$\text{Total Weight} = 2 + 1 + 3 + 2 + 1 = \mathbf{9}$$
*(Both algorithms produce the identical optimal MST of weight 9).*

### Q2. [10/15 Marks] Critically analyze Graph Representations: Adjacency Matrix vs Adjacency List. Discuss Euler and Hamilton Paths and Cycles, presenting Euler's Theorem with complete proof.
**Comprehensive University Solution:**
### Graph Representations & Eulerian/Hamiltonian Analysis

---

### 1. Matrix Representation of Graphs
Let $G = (V, E)$ with vertices $v_1, v_2, \dots, v_n$.
- **Adjacency Matrix ($A = [a_{ij}]_{n \times n}$):**
  $$a_{ij} = \begin{cases} 1 & \text{if } (v_i, v_j) \in E \\ 0 & \text{otherwise} \end{cases}$$
- **Remarkable Property of $A^k$:** The entry $(i, j)$ of matrix power $A^k$ gives the exact number of distinct walks of length $k$ from vertex $v_i$ to vertex $v_j$.
- **Adjacency List:** An array of $V$ linked lists. Highly space efficient for sparse graphs ($O(V + E)$ vs $O(V^2)$ for matrix).

---

### 2. Eulerian Graphs and Euler's Theorem

#### Theorem:
A connected undirected graph $G$ has an **Euler Circuit** (Eulerian Graph) **if and only if every vertex in $G$ has even degree**.

#### Proof:
1. **Necessary Condition ($\implies$):**  
   Suppose $G$ has an Euler circuit $C$.  
   Let $v$ be any vertex in $G$. Every time the circuit $C$ passes through $v$, it arrives along one edge and leaves along another distinct edge, contributing $+2$ to the degree of $v$.  
   Since every edge in $G$ appears in $C$ exactly once, $\deg(v)$ must be an even integer for all $v \in V$.

2. **Sufficient Condition ($\impliedby$):**  
   Assume $G$ is connected and every vertex has even degree.
   - Start at any vertex $v$ and traverse edges without repeating any edge.
   - Since every vertex has even degree, whenever we enter a vertex $w \ne v$, there is always an unused exit edge. Hence, the traversal can terminate *only* by returning to the starting vertex $v$, forming a simple cycle $C_1$.
   - If $C_1$ contains all edges of $G$, we are done.
   - If not, remove edges of $C_1$ from $G$. The remaining disconnected components still have all even-degree vertices. By connectivity, at least one component intersects $C_1$ at vertex $u$.
   - Construct subcycle $C_2$ starting from $u$ and splice it into $C_1$.
   - Repeating this process exhausts all edges, assembling a complete Euler circuit. $\mathbf{Q.E.D.}$


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
### Examiner Insights & University Exam Strategy:
1. **Guaranteed 10/15-Mark Problem:** Numerical finding of MST using Kruskal's or Prim's algorithm on a 5–7 vertex weighted graph. Always show sorted edge table for Kruskal and growing tree vertex set for Prim.
2. **Handshaking Theorem:** State $\sum \deg(v) = 2|E|$ and prove that odd degree vertex count is even.
3. **Eulerian vs Hamiltonian:** Clearly contrast edge traversal (Euler) vs vertex traversal (Hamilton). Quote Euler's criterion (all even degrees) and Dirac's theorem ($deg(v) \ge n/2$).

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
# BCA-301N: Artificial Intelligence
## Unit 2 Master Exam Revision Notes: AI Problem Solving & State Space Search Techniques
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `f67a4b00-a5ff-5356-8a99-6ff53d3363a6` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Problem Solving as State Space Search: Initial State, State Space Graph, Transition Model, Goal State & Path Cost**
- [x] **Production Systems Architecture: Working Memory, Production Rules (Condition-Action), Inference Engine & Conflict Resolution**
- [x] **Control Strategies & Problem Characteristics: Modularity, Recoverability, Predictability & Knowledge Necessity**
- [x] **Uninformed Search Strategies: Breadth-First Search (BFS) Algorithm, Completeness, Time & Space Complexity (O(b^d))**
- [x] **Depth-First Search (DFS) & Depth-Limited Search (DLS): Algorithm, Backtracking Mechanism & Memory Efficiency (O(bm))**
- [x] **Iterative Deepening Search (IDS) & Uniform Cost Search (Dijkstra-Variant): Optimality and Trade-offs**
- [x] **Informed (Heuristic) Search: Heuristic Functions h(n), Admissibility Condition (h(n) <= h*(n)) & Consistency/Monotonicity**
- [x] **Greedy Best-First Search: Evaluation Function f(n) = h(n), Greedy Traversal & Susceptibility to Local Extrema**
- [x] **A* Search Algorithm: f(n) = g(n) + h(n), Mathematical Proof of Optimality on Tree and Graph Searches**
- [x] **Local Search & Optimization: Pure Hill Climbing, Steepest-Ascent, Stochastic Hill Climbing, Foothills, Plateaus & Ridges**
- [x] **Problem Reduction & AND/OR Graphs: AO* Search Algorithm, Branching, Futility & Hyper-Arcs**
- [x] **Constraint Satisfaction Problems (CSP): Backtracking Search, Constraint Propagation & Forward Checking**
- [x] **Adversarial Search & Game Playing: Two-Player Zero-Sum Games, Minimax Decision Rule, Backup Values**
- [x] **Alpha-Beta Pruning: Alpha Cutoffs, Beta Cutoffs, Optimal Move Ordering & Effective Branching Factor Reduction**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What constitutes a well-defined State Space Problem formulation?
**Model Answer:**
A formal problem consists of five elements: 1. **Initial State** ($s_0$), 2. **Actions** available in state $s$, 3. **Transition Model** ($Result(s, a)$), 4. **Goal Test** ($IsGoal(s)$), and 5. **Path Cost** ($c(s, a, s')$).

### Q2. [2 Marks] State the Time and Space Complexity of Breadth-First Search (BFS).
**Model Answer:**
For branching factor $b$ and shallowest goal depth $d$:
- **Time Complexity:** $O(b^d)$
- **Space Complexity:** $O(b^d)$ (Stores all generated frontier nodes in memory; high space consumption is BFS's primary drawback).

### Q3. [2 Marks] Why is Depth-First Search (DFS) not optimal?
**Model Answer:**
DFS explores the deepest unexpanded node first. In infinite state spaces or graphs with loops, it can get trapped in infinite paths, failing to be complete unless cycle detection is implemented. Even when complete, it may return a very deep path when a shallow one exists.

### Q4. [2 Marks] Explain the advantage of Iterative Deepening Search (IDS).
**Model Answer:**
IDS combines the **optimality and completeness of BFS** with the **linear space complexity of DFS** ($O(bd)$). It runs depth-limited searches with progressively increasing depth limits ($0, 1, 2, \dots, d$).

### Q5. [2 Marks] Define an Admissible Heuristic.
**Model Answer:**
A heuristic function $h(n)$ is **admissible** if it never overestimates the actual cost to reach the goal from node $n$, i.e., $0 \le h(n) \le h^*(n)$ for all $n$, where $h^*(n)$ is the true shortest path cost to the goal.

### Q6. [2 Marks] What is the evaluation function of the A* search algorithm?
**Model Answer:**
The evaluation function is $f(n) = g(n) + h(n)$, where $g(n)$ is the exact cost incurred from the start node to node $n$, and $h(n)$ is the estimated heuristic cost from $n$ to the goal.

### Q7. [2 Marks] What are the three main failure modes of Hill Climbing Search?
**Model Answer:**
1. **Local Maxima:** A peak higher than all immediate neighbors but lower than the global maximum.
2. **Ridges:** Slopes that are steep in one direction and slow in another, where all simple step moves fail.
3. **Plateaus:** Flat areas where all neighboring states have the identical heuristic value (foothill/shoulder).

### Q8. [2 Marks] What is an AND/OR Graph and where is it used?
**Model Answer:**
An AND/OR graph represents problem reduction where a problem node is solved either if ANY of its OR-branches are solved or if ALL of its AND-branches are solved. It is solved using the **AO* algorithm** in expert systems and symbolic integration.

### Q9. [2 Marks] State the Minimax decision rule in two-player zero-sum games.
**Model Answer:**
For terminal states, the utility is returned. For non-terminal states:
$$\text{Minimax}(s) = \begin{cases} \max_{a} \text{Minimax}(Result(s, a)) & \text{if } s \text{ is MAX's turn} \\ \min_{a} \text{Minimax}(Result(s, a)) & \text{if } s \text{ is MIN's turn} \end{cases}$$

### Q10. [2 Marks] What do $\alpha$ and $\beta$ represent in Alpha-Beta Pruning?
**Model Answer:**
- $\alpha$: The highest (best) value found so far by MAX along the search path.
- $\beta$: The lowest (best) value found so far by MIN along the search path.
Pruning occurs when $\alpha \ge \beta$.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare BFS, DFS, and IDS across Completeness, Optimality, Time, and Space.
**Model Answer:**
| Algorithm | Complete? | Optimal? | Time Complexity | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **BFS** | Yes (if $b$ is finite) | Yes (for unit step costs) | $O(b^d)$ | $O(b^d)$ (Exponential - High memory) |
| **DFS** | No (infinite spaces) / Yes (finite graph) | No | $O(b^m)$ | $O(bm)$ (Linear - Very efficient) |
| **DLS** | No (if $limit < d$) | No | $O(b^l)$ | $O(bl)$ |
| **IDS** | Yes (if $b$ is finite) | Yes (for unit step costs) | $O(b^d)$ | $O(bd)$ (Linear - Best uninformed) |
*Where $b$ = branching factor, $d$ = goal depth, $m$ = max tree depth, $l$ = depth limit.*

### Q2. [5 Marks] Explain Heuristic Admissibility and Monotonicity (Consistency) with Mathematical Proof.
**Model Answer:**
### 1. Admissibility:
A heuristic $h(n)$ is admissible if $h(n) \le h^*(n)$ and $h(Goal) = 0$.

### 2. Consistency (Monotonicity):
A heuristic is consistent if for every node $n$ and every successor $n'$ generated by action $a$ with step cost $c(n, a, n')$:
$$h(n) \le c(n, a, n') + h(n')$$
*Triangle Inequality:* The heuristic cost cannot decrease faster than the actual step cost incurred.

### Theorem:
Every consistent heuristic is admissible. When $h(n)$ is consistent, the values of $f(n)$ along any path are monotonically non-decreasing ($f(n') \ge f(n)$), guaranteeing that A* Graph Search will find optimal paths without reopening closed nodes.

### Q3. [5 Marks] Describe the AO* Algorithm for AND/OR Graphs.
**Model Answer:**
Unlike standard state space graphs where paths branch alternative choices, **AND/OR graphs** model decomposition:
- **OR node:** Solved by picking one optimal alternative.
- **AND node:** Requires solving all child sub-problems.

```
                  [ Goal A ] (OR node)
                  /        \
      [ Sub-problem B ]    [ Sub-problem C ] (AND node)
                            /           \
                    [ Task D ]         [ Task E ]
```
**AO* Algorithm Steps:**
1. Generate partial search graph initialized with root node.
2. Traverse best partial tree using heuristic estimates $f(n) = c + \sum f(children)$.
3. Expand non-terminal leaf node.
4. Propagate cost changes bottom-up from children to parents, updating marked optimal connectors until root is labeled SOLVED.

### Q4. [5 Marks] Explain the Minimax Algorithm with Game Trees.
**Model Answer:**
In adversarial two-player zero-sum games (e.g., Tic-Tac-Toe, Chess):
- **Player MAX:** Tries to maximize terminal game utility.
- **Player MIN:** Tries to minimize MAX's utility.

```
        MAX       ( 3 )   <--- Root decides max(3, 2) = 3
                 /     \
        MIN    ( 3 )   ( 2 )
               /   \   /   \
              3     5 2     9  <--- Terminal Utility Leaves
```
- At leaf level, utility values are evaluated.
- MIN nodes choose minimum of children: $\min(3, 5) = 3$; $\min(2, 9) = 2$.
- MAX root chooses maximum of children: $\max(3, 2) = 3$.

### Q5. [5 Marks] Detail the Constraint Satisfaction Problem (CSP) Formulation and Forward Checking.
**Model Answer:**
A **CSP** is defined by:
- Variables $X = \{X_1, X_2, \dots, X_n\}$.
- Domains $D = \{D_1, D_2, \dots, D_n\}$ of allowable values.
- Constraints $C = \{C_1, C_2, \dots, C_m\}$ specifying valid value combinations.

**Forward Checking:**
Whenever variable $X$ is assigned a value $v$, inspect each unassigned neighbor $Y$ connected by a constraint and delete any value in $D_Y$ that conflicts with $v$. If any domain becomes empty, backtrack immediately without wasting search effort.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Prove that A* Tree Search is Guaranteed to Find the Optimal Goal Node when $h(n)$ is Admissible.
**Comprehensive University Solution:**
### Mathematical Proof of A* Optimality

#### Theorem:
A* tree search is optimal if $h(n)$ is an admissible heuristic.

#### Proof by Contradiction:
1. Let $G$ be an optimal goal node with true optimal cost $C^* = f(G) = g(G)$ (since $h(G) = 0$).
2. Suppose A* terminates by selecting a suboptimal goal node $G_2$ from the priority queue (OPEN list), where $g(G_2) > C^*$.
3. Since $G_2$ is a goal node, $h(G_2) = 0$, so $f(G_2) = g(G_2) > C^*$.
4. Consider any node $n$ on the optimal path to $G$ currently sitting on the OPEN list (at least one such node must exist because the start node is on the path and the tree is not fully expanded):
   $$f(n) = g(n) + h(n)$$
5. By admissibility, $h(n) \le h^*(n)$ (it never overestimates the true remaining cost to $G$):
   $$f(n) = g(n) + h(n) \le g(n) + h^*(n) = C^*$$
6. Combining equations (3) and (5):
   $$f(n) \le C^* < f(G_2) \implies f(n) < f(G_2)$$
7. Since A* always selects the node with the minimum $f$-value from the priority queue, node $n$ must be chosen for expansion before $G_2$.
8. This applies to all nodes leading to $G$, meaning the optimal goal $G$ will always be reached and expanded before $G_2$.
9. **Contradiction:** $G_2$ cannot be selected before $G$. Hence, A* is provably optimal. $\blacksquare$

### Q2. [10/15 Marks] Trace the Alpha-Beta Pruning Algorithm with a Complete 3-Level Game Tree, Showing Cutoffs.
**Comprehensive University Solution:**
### Alpha-Beta Pruning Tree Trace

```
                     [ MAX : A ]
                   /             \
          [ MIN : B ]           [ MIN : C ]
          /         \           /         \
     [ MAX: D ] [ MAX: E ] [ MAX: F ] [ MAX: G ]
      /     \    /     \    /     \    /     \
     3       5  6       9  1       2  0       ?  <-- PRUNED
```

#### Step-by-Step Execution Trace:
1. **Initialization:** At root $A$, $[\alpha = -\infty, \beta = +\infty]$.
2. Traverse down to node $B$, then $D$. Leaf values: $3$ and $5$. Max at $D = \max(3, 5) = 3$.
3. At node $B$, $\beta$ updates to $\min(+\infty, 3) = 3$. Next explore node $E$.
4. At $E$, first child is $6$. Since this is a MAX node, value $\ge 6$. But $B$ is a MIN node with current $\beta = 3$. Since child value $6 \ge \beta (3)$, an **Alpha Cutoff** occurs! The second child of $E$ ($9$) is **pruned**.
5. Node $B$ returns $3$ to root $A$. Root $A$ updates $\alpha = \max(-\infty, 3) = 3$.
6. Explore right subtree at $C$ with $[\alpha = 3, \beta = +\infty]$.
7. Node $F$ explores leaves $1$ and $2 \implies \text{value} = 2$.
8. At MIN node $C$, $\beta = \min(+\infty, 2) = 2$.
9. Now at node $C$, check condition: $\alpha (3) \ge \beta (2)$. **Beta Cutoff!** The entire branch $G$ is immediately **pruned** without visiting its children.
10. Node $C$ returns $\le 2$ to root $A$. Root $A$ chooses $\max(3, 2) = 3$.

**Pruning Efficiency:** Reduced search tree evaluations from 8 leaves to only 5 leaves, achieving ideal complexity of $O(b^{d/2})$ under optimal move ordering.

### Q3. [10/15 Marks] Implement the A* Search Algorithm in Python with Priority Queue for Pathfinding on a 2D Grid.
**Comprehensive University Solution:**
```python
import heapq

class Node:
    def __init__(self, x, y, g_cost, h_cost, parent=None):
        self.x = x
        self.y = y
        self.g = g_cost
        self.h = h_cost
        self.f = g_cost + h_cost
        self.parent = parent

    def __lt__(self, other):
        return self.f < other.f

def manhattan_distance(x1, y1, x2, y2):
    return abs(x1 - x2) + abs(y1 - y2) # Admissible heuristic for 4-way grid

def a_star_search(grid, start, goal):
    rows, cols = len(grid), len(grid[0])
    open_list = []
    closed_set = set()

    start_node = Node(start[0], start[1], 0, manhattan_distance(start[0], start[1], goal[0], goal[1]))
    heapq.heappush(open_list, start_node)
    best_g = {(start[0], start[1]): 0}

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)] # Up, Down, Left, Right

    while open_list:
        current = heapq.heappop(open_list)

        if (current.x, current.y) == goal:
            path = []
            curr = current
            while curr:
                path.append((curr.x, curr.y))
                curr = curr.parent
            return path[::-1] # Return reversed path from start to goal

        closed_set.add((current.x, current.y))

        for dx, dy in directions:
            nx, ny = current.x + dx, current.y + dy
            if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny] == 0: # 0 = walkable, 1 = obstacle
                if (nx, ny) in closed_set:
                    continue
                tentative_g = current.g + 1
                if (nx, ny) not in best_g or tentative_g < best_g[(nx, ny)]:
                    best_g[(nx, ny)] = tentative_g
                    h = manhattan_distance(nx, ny, goal[0], goal[1])
                    neighbor = Node(nx, ny, tentative_g, h, current)
                    heapq.heappush(open_list, neighbor)

    return None # No path found

# Verification
grid_map = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0]
]
print("Optimal Path:", a_star_search(grid_map, (0, 0), (3, 3)))
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
High-scoring questions: A* optimality proof (Section C mandatory favorite), Alpha-Beta trace diagram, and Hill-climbing shortcomings.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
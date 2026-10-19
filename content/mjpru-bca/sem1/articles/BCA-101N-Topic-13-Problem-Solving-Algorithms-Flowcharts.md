# Problem-Solving Tools: Algorithms, Flowcharts & Pseudo-code

Before writing code in a programming language, software engineers formalize the computational logic using three standard problem-solving tools: **Algorithms**, **Flowcharts**, and **Pseudo-code**.

---

## 1. What is an Algorithm?

An **Algorithm** is an unambiguous, finite sequence of step-by-step instructions designed to solve a specific computational problem or accomplish a defined task.

### Five Mandatory Properties of a Valid Algorithm
1. **Finiteness**: An algorithm must terminate after a finite number of steps for all valid inputs; it must never run indefinitely.
2. **Definiteness**: Each instruction must be clear, precise, and completely unambiguous (no vague terms like "add some numbers").
3. **Input**: Must accept zero or more well-defined inputs from an external source.
4. **Output**: Must produce one or more distinct outputs corresponding to the input.
5. **Effectiveness**: Every instruction must be sufficiently basic to be executed mechanically with pencil and paper in finite time.

---

## 2. Standard Flowchart Geometric Symbols

A **Flowchart** is a standardized graphical diagram illustrating the sequential control flow and decision logic of an algorithm:

```
+--------------------+-----------------------------------------------------+
|      SYMBOL        |                 FUNCTION & USAGE                    |
+--------------------+-----------------------------------------------------+
|      (      )      |  TERMINAL (Oval / Rounded Rectangle):               |
|      ( START )     |  Marks the entry or exit boundary of the program    |
|      (  STOP )     |  (e.g., START, STOP, RETURN).                       |
+--------------------+-----------------------------------------------------+
|   /              / |  INPUT / OUTPUT (Parallelogram):                    |
|  /  READ A, B   /  |  Denotes data read from input or written to output  |
| /              /   |  (e.g., INPUT X, PRINT "Result").                   |
+--------------------+-----------------------------------------------------+
| +----------------+ |  PROCESS (Rectangle):                               |
| | Sum = A + B    | |  Denotes data calculation, assignment, or internal  |
| +----------------+ |  memory manipulation.                               |
+--------------------+-----------------------------------------------------+
|        /\         |  DECISION (Diamond / Rhombus):                      |
|       /  \        |  Evaluates a boolean condition and branches into    |
|      < A>B >       |  two alternate paths based on True / False          |
|       \  /        |  (or Yes / No).                                     |
|        \/         |                                                     |
+--------------------+-----------------------------------------------------+
|        (O)         |  CONNECTOR (Small Circle):                          |
|                    |  Connects intersecting control flow lines on the   |
|                    |  same page without crossing lines.                  |
+--------------------+-----------------------------------------------------+
|    --------->      |  FLOWLINE (Arrowed Line):                           |
|                    |  Indicates the exact direction of control flow.    |
+--------------------+-----------------------------------------------------+
```

---

## 3. Concrete Example: Finding the Maximum of Three Numbers

### Step 1: Formal Algorithm Formulation
```text
Step 1: Start
Step 2: Read three numerical values into variables A, B, and C
Step 3: If A >= B and A >= C, then
            Set Max = A
        Else If B >= A and B >= C, then
            Set Max = B
        Else
            Set Max = C
Step 4: Display Max as the largest number
Step 5: Stop
```

### Step 2: Structured Pseudo-code
```text
BEGIN FindLargest
    DECLARE Integer A, B, C, Max
    PROMPT "Enter three integers: "
    INPUT A, B, C

    IF (A >= B AND A >= C) THEN
        Max = A
    ELSE IF (B >= C) THEN
        Max = B
    ELSE
        Max = C
    END IF

    PRINT "The largest value is: ", Max
END
```

### Step 3: Textual Representation of Flowchart Logic
```
          [ START ]
              |
              v
       [/ READ A, B, C /]
              |
              v
          < A >= B? >
         /           \
    YES /             \ NO
       v               v
  < A >= C? >      < B >= C? >
   /       \        /       \
YES/      NO\   YES/       NO\
  v         v     v          v
[Max=A]  [Max=C] [Max=B]  [Max=C]
  |         |     |          |
  +---------+--+--+----------+
               |
               v
       [/ PRINT Max /]
               |
               v
           [ STOP ]
```

---

## Benefits of Pseudo-code vs. Flowcharts

| Aspect | Flowcharts | Pseudo-code |
| :--- | :--- | :--- |
| **Format** | Visual, geometric diagram | Structured, semi-formal text |
| **Ease of Creation**| Time-consuming to draw and re-draw | Fast to type, edit, and maintain |
| **Complexity Limit**| Cluttered and unwieldy for large systems | Scales cleanly to complex industrial logic |
| **Code Proximity** | Far from actual language syntax | Very close to structured programming syntax |
| **Best Used For** | High-level system overview & teaching | Detailed algorithm design before coding |

# BCA-432E: GUI Programming
## Unit 2 Master Exam Revision Notes: Windows Forms, Controls, Menus & Exception Handling
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `94da78bd-fa1b-5c07-bb40-47999b1454dc` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Windows Forms Architecture: System.Windows.Forms Namespace, Form Lifecycle (Load, Activated, Shown, Closing, Closed)**
- [x] **Basic Form Controls: Label, TextBox, Button, CheckBox, RadioButton, GroupBox, Panel - Properties, Methods and Events**
- [x] **List and Selection Controls: ListBox, ComboBox, CheckedListBox (Items Collection, SelectedIndex, SelectedItem)**
- [x] **Advanced Visual Controls: PictureBox, Timer Control (Tick Event, Interval), ProgressBar, TrackBar, ScrollBars (HScrollBar, VScrollBar)**
- [x] **Hierarchical & Tabular Data Controls: ListView (LargeIcon, SmallIcon, Details, Columns), TreeView (TreeNode, AfterSelect Event)**
- [x] **Navigation & Layout Controls: ToolStrip, StatusStrip, MenuStrip, ContextMenuStrip, FlowLayoutPanel, TableLayoutPanel**
- [x] **Standard Common Dialog Boxes: OpenFileDialog, SaveFileDialog, FontDialog, ColorDialog, PrintDialog (ShowDialog, Filter Property)**
- [x] **Designing Professional Menus: Menu Strip, Access Keys (& prefix), Shortcut Keys, Checked Items, Context Menus**
- [x] **Major Error Categories: Compile-Time (Syntax) Errors, Runtime (Execution) Errors, Logical (Semantic) Errors**
- [x] **Structured Exception Handling in .NET: Try...Catch...Finally Blocks, Filtering Exceptions (Catch ex As FormatException)**
- [x] **User-Defined Custom Exceptions: Inheriting from System.Exception Class, Throwing Custom Exceptions with Meaningful Messages**
- [x] **Visual Studio Debugging Techniques: Setting Breakpoints, Step Into (F11), Step Over (F10), Watch Window, Immediate Window, Call Stack**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is a Layout Manager in GUI programming?
**Model Answer:**
A Layout Manager is an object implementing the `LayoutManager` interface responsible for automatically determining the size, position, and arrangement of child components inside a container based on available space, fonts, and platform resolution.

### Q2. [2 Marks] Name the 5 standard Layout Managers in Java AWT/Swing.
**Model Answer:**
1. **`FlowLayout`** (arranges components in a left-to-right row, wrapping as needed)
2. **`BorderLayout`** (divides container into 5 zones: North, South, East, West, Center)
3. **`GridLayout`** (arranges components into a rectangular grid of equal-sized cells)
4. **`GridBagLayout`** (sophisticated grid allowing components to span multiple cells with variable sizes)
5. **`CardLayout`** (stacks components like a deck of cards, showing one card at a time).

### Q3. [2 Marks] What is the default layout manager for `JFrame` and `JPanel`?
**Model Answer:**
- Default for `JFrame` (content pane): **`BorderLayout`**
- Default for `JPanel`: **`FlowLayout`**

### Q4. [2 Marks] Explain the Delegation Event Model.
**Model Answer:**
The standard event handling architecture comprising three participants:
1. **Event Source:** Component where user action occurs (e.g., `JButton`).
2. **Event Object:** Encapsulates information about the event (e.g., `ActionEvent`).
3. **Event Listener:** Interface implemented by handler object registered with the source (`addActionListener()`).

### Q5. [2 Marks] What is the difference between an Event Listener and an Event Adapter?
**Model Answer:**
- **Listener:** An interface containing one or more abstract callback methods; implementing classes must override *every* method (e.g., `MouseListener` has 5 methods).
- **Adapter:** An abstract class providing default empty implementations for all listener methods, allowing developers to override *only* the specific methods they need (e.g., `MouseAdapter`).

### Q6. [2 Marks] List the 5 callback methods of the `MouseListener` interface.
**Model Answer:**
1. `mouseClicked(MouseEvent e)`
2. `mousePressed(MouseEvent e)`
3. `mouseReleased(MouseEvent e)`
4. `mouseEntered(MouseEvent e)`
5. `mouseExited(MouseEvent e)`

### Q7. [2 Marks] What is the difference between `MouseListener` and `MouseMotionListener`?
**Model Answer:**
- `MouseListener`: Handles discrete mouse button clicks, presses, releases, and entering/exiting component boundaries.
- `MouseMotionListener`: Handles continuous mouse movement (`mouseMoved`) and mouse dragging with a button pressed (`mouseDragged`).

### Q8. [2 Marks] Explain Key Events and the `KeyListener` interface.
**Model Answer:**
`KeyListener` handles keyboard input via 3 methods:
1. `keyPressed(KeyEvent e)`: Key pressed down.
2. `keyReleased(KeyEvent e)`: Key released.
3. `keyTyped(KeyEvent e)`: Unicode character typed (excludes modifier keys like Shift/Ctrl).

### Q9. [2 Marks] How do Anonymous Inner Classes simplify event handling in Java?
**Model Answer:**
They allow instantiating and implementing an event listener interface directly at the point of registration without declaring a separate named class (e.g., `btn.addActionListener(new ActionListener() { ... });` or Java 8 lambda `btn.addActionListener(e -> ...);`).

### Q10. [2 Marks] What happens if a component is added to `BorderLayout` without specifying a region?
**Model Answer:**
It defaults to the **`BorderLayout.CENTER`** region. Any previously existing component in that region is replaced.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare the 5 Core Layout Managers with Visual Schematics and Properties.
**Model Answer:**
```
[ BORDERLAYOUT ]                      [ GRIDLAYOUT (2x2) ]
+---------------------------+        +-------------+-------------+
|        NORTH              |        |   Cell 1    |   Cell 2    |
+-------+-----------+-------+        +-------------+-------------+
| WEST  |  CENTER   | EAST  |        |   Cell 3    |   Cell 4    |
+-------+-----------+-------+        +-------------+-------------+
|        SOUTH              |        (All cells identical dimensions)
+---------------------------+
```

| Layout Manager | Cell Dimensions | Spanning Multiple Cells? | Wrapping Behavior |
| :--- | :--- | :--- | :--- |
| **`FlowLayout`** | Preferred component size | No | Wraps to next row when line fills |
| **`BorderLayout`**| Varies by region (Center expands) | Regions fixed | No wrapping |
| **`GridLayout`** | Strict equal dimensions | No | Rigid grid rows and columns |
| **`GridBagLayout`**| Dynamic per component | Yes (`gridwidth`, `gridheight`) | Most flexible, highly configurable |
| **`CardLayout`** | Fills container entirely | No | Shows one component layer at a time |

### Q2. [5 Marks] Explain the Delegation Event Model Architecture with an Interaction Sequence Diagram.
**Model Answer:**
```
[ USER ] ---> [ EVENT SOURCE (JButton) ]
                     |
                     | 1. Generates ActionEvent object
                     v
              [ ActionEvent Object ]
                     |
                     | 2. Iterates over registered listeners
                     v
              [ EVENT LISTENER (ActionListener) ]
                     |
                     | 3. Invokes actionPerformed(ActionEvent e)
                     v
              [ Business Logic Execution ]
```
- Decouples event generation from event handling; allows multiple independent listeners to register with a single event source.

### Q3. [5 Marks] Explain `GridBagConstraints` Key Parameters in `GridBagLayout`.
**Model Answer:**
1. `gridx`, `gridy`: Column and row coordinate where component starts.
2. `gridwidth`, `gridheight`: Number of columns/rows the component spans.
3. `weightx`, `weighty`: Proportional expansion factor when window is resized.
4. `fill`: How component expands if cell is larger (`NONE`, `HORIZONTAL`, `VERTICAL`, `BOTH`).
5. `insets`: External padding around component (`Insets(top, left, bottom, right)`).

### Q4. [5 Marks] Explain Java AWT Event Hierarchy and Semantic vs Low-Level Events.
**Model Answer:**
- **Low-Level Events:** Represent direct raw hardware inputs or window states: `MouseEvent`, `KeyEvent`, `FocusEvent`, `WindowEvent`, `ComponentEvent`.
- **Semantic Events:** Represent high-level user interface actions abstracted from hardware: `ActionEvent` (button clicked/enter pressed), `ItemEvent` (checkbox toggled), `AdjustmentEvent` (scrollbar scrolled).

### Q5. [5 Marks] Explain Mouse Adapter Classes and Code Minimization.
**Model Answer:**
Implementing `MouseListener` requires writing 5 methods, even if you only care about `mouseClicked`. `MouseAdapter` provides default empty bodies:
```java
component.addMouseListener(new MouseAdapter() {
    @Override
    public void mouseClicked(MouseEvent e) {
        System.out.println("Clicked at: " + e.getX() + ", " + e.getY());
    }
});
```


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Complete Calculator GUI Demonstrating `BorderLayout`, `GridLayout`, and Event Action Delegation.
**Comprehensive University Solution:**
```java
package com.mjpru.bca.gui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class CalculatorGUI extends JFrame implements ActionListener {
    private JTextField displayField;
    private double num1 = 0, num2 = 0, result = 0;
    private char operator = ' ';
    private boolean startNewNumber = true;

    public CalculatorGUI() {
        setTitle("Standard Calculator");
        setSize(320, 420);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout(8, 8));

        // Top Display Field
        displayField = new JTextField("0");
        displayField.setEditable(false);
        displayField.setFont(new Font("Segoe UI", Font.BOLD, 28));
        displayField.setHorizontalAlignment(JTextField.RIGHT);
        displayField.setBackground(new Color(245, 245, 245));
        displayField.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        add(displayField, BorderLayout.NORTH);

        // Keypad Panel (4x4 GridLayout)
        JPanel keypadPanel = new JPanel(new GridLayout(4, 4, 6, 6));
        String[] buttons = {
            "7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "C", "0", "=", "+"
        };

        for (String text : buttons) {
            JButton btn = new JButton(text);
            btn.setFont(new Font("Segoe UI", Font.BOLD, 18));
            btn.setFocusPainted(false);
            btn.addActionListener(this);
            keypadPanel.add(btn);
        }

        keypadPanel.setBorder(BorderFactory.createEmptyBorder(6, 6, 6, 6));
        add(keypadPanel, BorderLayout.CENTER);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String cmd = e.getActionCommand();

        if (cmd.charAt(0) >= '0' && cmd.charAt(0) <= '9') {
            if (startNewNumber || displayField.getText().equals("0")) {
                displayField.setText(cmd);
                startNewNumber = false;
            } else {
                displayField.setText(displayField.getText() + cmd);
            }
        } else if (cmd.equals("C")) {
            num1 = num2 = result = 0;
            operator = ' ';
            displayField.setText("0");
            startNewNumber = true;
        } else if (cmd.equals("=")) {
            if (operator != ' ') {
                num2 = Double.parseDouble(displayField.getText());
                switch (operator) {
                    case '+': result = num1 + num2; break;
                    case '-': result = num1 - num2; break;
                    case '*': result = num1 * num2; break;
                    case '/': 
                        if (num2 != 0) result = num1 / num2;
                        else {
                            displayField.setText("Error: Div/0");
                            startNewNumber = true;
                            return;
                        }
                        break;
                }
                displayField.setText(String.valueOf(result));
                operator = ' ';
                startNewNumber = true;
            }
        } else { // Operator (+, -, *, /)
            num1 = Double.parseDouble(displayField.getText());
            operator = cmd.charAt(0);
            startNewNumber = true;
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new CalculatorGUI().setVisible(true));
    }
}
```

### Q2. [10/15 Marks] Explain Mouse and MouseMotion Event Handling with an Interactive Freehand Drawing Canvas Component.
**Comprehensive University Solution:**
```java
package com.mjpru.bca.gui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;

public class DrawingCanvas extends JPanel {
    private BufferedImage canvasImage;
    private Graphics2D g2d;
    private int prevX, prevY;

    public DrawingCanvas(int width, int height) {
        setPreferredSize(new Dimension(width, height));
        setBackground(Color.WHITE);

        // Buffer for persistent painting
        canvasImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        g2d = canvasImage.createGraphics();
        g2d.setColor(Color.WHITE);
        g2d.fillRect(0, 0, width, height);
        g2d.setColor(Color.BLACK);
        g2d.setStroke(new BasicStroke(2.0f, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));

        // Adapter handles both press and drag smoothly
        MouseAdapter mouseHandler = new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                prevX = e.getX();
                prevY = e.getY();
            }

            @Override
            public void mouseDragged(MouseEvent e) {
                int curX = e.getX();
                int curY = e.getY();
                g2d.drawLine(prevX, prevY, curX, curY);
                repaint(); // Schedules paintComponent()
                prevX = curX;
                prevY = curY;
            }
        };

        addMouseListener(mouseHandler);
        addMouseMotionListener(mouseHandler);
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.drawImage(canvasImage, 0, 0, null);
    }
}
```

### Q3. [10/15 Marks] Detail the `GridBagLayout` Mechanism with a Complete Complex Form Layout Implementation.
**Comprehensive University Solution:**
### Deep Dive: `GridBagLayout` and `GridBagConstraints`

```
+-------------------------------------------------------------+
| GridBagLayout: Coordinates Grid (x, y) with Multi-span Cells|
| (0, 0) Label  | (1, 0) TextField (gridwidth=2)             |
| (0, 1) Label  | (1, 1) ComboBox  | (2, 1) CheckBox          |
| (0, 2) Button | (1, 2) Button    | (2, 2) Button (Exit)     |
+-------------------------------------------------------------+
```
`GridBagLayout` dynamically maintains internal row and column coordinate matrices based on component minimum, preferred, and maximum dimensions, ensuring layouts stay balanced across operating systems.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently ask: Layout Managers comparison table (BorderLayout vs GridLayout vs GridBagLayout), Delegation Event Model architecture, and MouseAdapter vs MouseListener.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
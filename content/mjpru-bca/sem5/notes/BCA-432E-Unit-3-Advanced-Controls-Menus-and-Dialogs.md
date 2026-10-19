# BCA-432E: GUI Programming
## Unit 3 Master Exam Revision Notes: Object-Oriented Programming & Class Libraries in .NET
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `5f2bfd88-2103-5fb2-9abd-622fef5cc070` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Object-Oriented Programming Principles in .NET: Abstraction, Encapsulation, Inheritance, Polymorphism**
- [x] **Class and Object Definition: Class Declaration, Object Instantiation (New Keyword), Class Members (Fields, Properties, Methods, Events)**
- [x] **Constructors and Destructors: Sub New Constructor, Parameterized Constructors, Constructor Overloading, Finalize and Dispose Pattern**
- [x] **Property Procedures in VB: Private Backing Fields, Property...Get...Set...End Property, Auto-Implemented Properties**
- [x] **Inheritance Mechanisms: Single Inheritance, Inherits Keyword, MustInherit (Abstract Classes), NotInheritable (Sealed Classes)**
- [x] **Method Overloading vs Method Overriding: Overloads Keyword (Compile-Time Polymorphism), Overrides and Overridable Keywords (Runtime Polymorphism)**
- [x] **MyBase and MyClass Keywords: Invoking Base Class Constructors and Methods, Resolving Member Shadowing**
- [x] **Interfaces in .NET: Interface Declaration, Implements Keyword, Multiple Interface Implementation, Standard Interfaces (IComparable, IDisposable)**
- [x] **Access Modifiers in .NET: Public, Private, Protected, Friend (Internal), Protected Friend Scope Semantics**
- [x] **Namespaces in .NET: Organizing Types, Namespace...End Namespace, Imports Statement, Preventing Class Naming Collisions**
- [x] **Delegates and Events: Declaring Delegates, Delegate Sub/Function, Event Keyword, RaiseEvent, AddHandler and RemoveHandler**
- [x] **Creating and Consuming Class Libraries: Class Library Project (.dll), Compiling Reusable Assemblies, Adding Project References**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the role of `JTree` and what model governs it?
**Model Answer:**
`JTree` displays hierarchical data in an expandable tree view with parent and leaf nodes. It is governed by the `TreeModel` interface (typically implemented using `DefaultTreeModel` and `DefaultMutableTreeNode`).

### Q2. [2 Marks] Explain `JTable` and its data architecture.
**Model Answer:**
`JTable` renders multi-column tabular data in rows and columns. It follows MVC: data is maintained by `TableModel` (typically `DefaultTableModel`), columns by `TableColumnModel`, and selections by `ListSelectionModel`.

### Q3. [2 Marks] What is `JTabbedPane`?
**Model Answer:**
A container component that allows users to switch between multiple panels/views by clicking on tab headers, maximizing visual screen space.

### Q4. [2 Marks] Explain `JSplitPane` and its orientation modes.
**Model Answer:**
A container that divides two components with a movable divider separator bar. Can be oriented horizontally (`JSplitPane.HORIZONTAL_SPLIT` - left/right) or vertically (`JSplitPane.VERTICAL_SPLIT` - top/bottom).

### Q5. [2 Marks] What are the core classes comprising a standard Menu System in Java Swing?
**Model Answer:**
1. `JMenuBar`: The horizontal bar attached to the top of a frame.
2. `JMenu`: Drop-down menu item placed in the menu bar (e.g., 'File', 'Edit').
3. `JMenuItem`: Individual selectable command inside a menu.
4. `JCheckBoxMenuItem` and `JRadioButtonMenuItem`: Toggleable menu items.

### Q6. [2 Marks] What is a `JPopupMenu` and how is it triggered?
**Model Answer:**
A floating context menu that appears at the mouse cursor position, typically triggered by right-clicking on a component (`e.isPopupTrigger()` in `mousePressed` or `mouseReleased`).

### Q7. [2 Marks] What is `JToolBar`?
**Model Answer:**
A draggable, dockable container of buttons and icons providing quick one-click shortcuts to frequently used application commands.

### Q8. [2 Marks] What is `JFileChooser`?
**Model Answer:**
A standardized system dialog enabling users to navigate directory structures and select files for opening (`showOpenDialog()`) or saving (`showSaveDialog()`).

### Q9. [2 Marks] What is `JColorChooser`?
**Model Answer:**
A pre-built modal dialog that allows users to pick a color from palette swatches, HSL sliders, or RGB values via `JColorChooser.showDialog()`.

### Q10. [2 Marks] What are Keyboard Accelerators vs Mnemonics in Menus?
**Model Answer:**
- **Mnemonic:** An underlined letter in a menu title activated by pressing `Alt + Key` when menu is visible (e.g., `Alt + F` for File).
- **Accelerator:** A global keyboard shortcut that triggers the menu command directly even when the menu is closed (e.g., `Ctrl + S` for Save via `KeyStroke`).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Architecture of `JTable` and `DefaultTableModel`.
**Model Answer:**
```
[ VIEW: JTable Component ]
        |
        +---> Displays: Headers & Rows in ScrollPane
        |
        +---> Queries Data From: TableModel (DefaultTableModel)
                                    |-- getValueAt(row, col)
                                    |-- setValueAt(val, row, col)
                                    |-- getRowCount(), getColumnCount()
                                    |-- isCellEditable(row, col)
```
- Modifying data in `DefaultTableModel` automatically fires `TableModelEvent`, triggering `JTable` to repaint only the modified cells.

### Q2. [5 Marks] Compare `JTree` Node Hierarchy: `DefaultMutableTreeNode` vs `TreeModel`.
**Model Answer:**
A `JTree` is structured using tree nodes:
- `DefaultMutableTreeNode root = new DefaultMutableTreeNode("University");`
- Child nodes added via `root.add(childNode);`.
- Path selection events are captured via `TreeSelectionListener` (`getSelectionPath()`).

### Q3. [5 Marks] Explain Menu Bar Hierarchy with Accelerators and Mnemonics.
**Model Answer:**
```java
JMenuBar menuBar = new JMenuBar();
JMenu fileMenu = new JMenu("File");
fileMenu.setMnemonic(KeyEvent.VK_F); // Alt + F

JMenuItem openItem = new JMenuItem("Open...");
openItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_O, ActionEvent.CTRL_MASK)); // Ctrl + O
fileMenu.add(openItem);

menuBar.add(fileMenu);
frame.setJMenuBar(menuBar);
```

### Q4. [5 Marks] Describe Standard Dialog Types in `JOptionPane`.
**Model Answer:**
1. **Message Dialog:** `JOptionPane.showMessageDialog(parent, "Operation successful!", "Info", JOptionPane.INFORMATION_MESSAGE);`
2. **Confirm Dialog:** `int choice = JOptionPane.showConfirmDialog(parent, "Delete file?", "Confirm", JOptionPane.YES_NO_OPTION);`
3. **Input Dialog:** `String val = JOptionPane.showInputDialog(parent, "Enter your name:");`
4. **Option Dialog:** Custom array of buttons/options.

### Q5. [5 Marks] Explain `JSplitPane` Divider Management and Nesting.
**Model Answer:**
```java
JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, leftTreePanel, rightTablePanel);
splitPane.setDividerLocation(200); // 200px width for left pane
splitPane.setOneTouchExpandable(true); // Adds collapse/expand arrows
```


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Complete Enterprise MDI-Style Application with MenuBar, JToolBar, JTree, JTable, and FileChooser.
**Comprehensive University Solution:**
```java
package com.mjpru.bca.gui;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.tree.DefaultMutableTreeNode;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.io.File;

public class EnterpriseWorkbench extends JFrame {
    private JTable dataTable;
    private DefaultTableModel tableModel;
    private JTree navTree;

    public EnterpriseWorkbench() {
        setTitle("MJPRU Enterprise Student Workbench");
        setSize(900, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        // 1. Menu Bar Construction
        JMenuBar menuBar = new JMenuBar();
        JMenu fileMenu = new JMenu("File");
        fileMenu.setMnemonic(KeyEvent.VK_F);

        JMenuItem openItem = new JMenuItem("Open Database...");
        openItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_O, ActionEvent.CTRL_MASK));
        openItem.addActionListener(e -> handleOpenFile());
        fileMenu.add(openItem);

        fileMenu.addSeparator();
        JMenuItem exitItem = new JMenuItem("Exit");
        exitItem.addActionListener(e -> System.exit(0));
        fileMenu.add(exitItem);
        menuBar.add(fileMenu);
        setJMenuBar(menuBar);

        // 2. Toolbar Construction
        JToolBar toolBar = new JToolBar();
        JButton addRowBtn = new JButton("Add Student");
        JButton delRowBtn = new JButton("Delete Selected");
        toolBar.add(addRowBtn);
        toolBar.add(delRowBtn);
        add(toolBar, BorderLayout.NORTH);

        // 3. Navigation Tree (Left Pane)
        DefaultMutableTreeNode root = new DefaultMutableTreeNode("MJPRU Campus");
        DefaultMutableTreeNode bcaNode = new DefaultMutableTreeNode("BCA Department");
        bcaNode.add(new DefaultMutableTreeNode("Semester 1"));
        bcaNode.add(new DefaultMutableTreeNode("Semester 3"));
        bcaNode.add(new DefaultMutableTreeNode("Semester 5"));
        root.add(bcaNode);
        navTree = new JTree(root);
        JScrollPane treeScroll = new JScrollPane(navTree);

        // 4. Data Table (Right Pane)
        String[] columns = {"Roll No", "Name", "Subject", "Marks", "Grade"};
        tableModel = new DefaultTableModel(columns, 0);
        tableModel.addRow(new Object[]{"101", "Rohit Sharma", "Web Tech", 85, "A+"});
        tableModel.addRow(new Object[]{"102", "Ananya Verma", "Cyber Sec", 92, "O"});
        tableModel.addRow(new Object[]{"103", "Saurabh Dixit", "Comp Graphics", 78, "A"});
        dataTable = new JTable(tableModel);
        JScrollPane tableScroll = new JScrollPane(dataTable);

        // 5. Split Pane Divider
        JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, treeScroll, tableScroll);
        splitPane.setDividerLocation(220);
        splitPane.setOneTouchExpandable(true);
        add(splitPane, BorderLayout.CENTER);

        // Actions
        addRowBtn.addActionListener(e -> {
            tableModel.addRow(new Object[]{"104", "New Student", "GUI Prog", 80, "A"});
        });

        delRowBtn.addActionListener(e -> {
            int row = dataTable.getSelectedRow();
            if (row != -1) tableModel.removeRow(row);
            else JOptionPane.showMessageDialog(this, "Please select a row to delete.");
        });
    }

    private void handleOpenFile() {
        JFileChooser chooser = new JFileChooser();
        int res = chooser.showOpenDialog(this);
        if (res == JFileChooser.APPROVE_OPTION) {
            File f = chooser.getSelectedFile();
            JOptionPane.showMessageDialog(this, "Selected: " + f.getAbsolutePath());
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new EnterpriseWorkbench().setVisible(true));
    }
}
```

### Q2. [10/15 Marks] Explain `JPopupMenu` Implementation for Contextual Actions on GUI Components.
**Comprehensive University Solution:**
```java
// Context Popup Menu on JTable
JPopupMenu popupMenu = new JPopupMenu();
JMenuItem detailsItem = new JMenuItem("View Full Profile");
JMenuItem exportItem = new JMenuItem("Export to PDF");
popupMenu.add(detailsItem);
popupMenu.add(exportItem);

table.addMouseListener(new MouseAdapter() {
    private void checkPopup(MouseEvent e) {
        if (e.isPopupTrigger()) {
            int row = table.rowAtPoint(e.getPoint());
            if (row >= 0 && !table.isRowSelected(row)) {
                table.setRowSelectionInterval(row, row);
            }
            popupMenu.show(e.getComponent(), e.getX(), e.getY());
        }
    }
    @Override public void mousePressed(MouseEvent e) { checkPopup(e); }
    @Override public void mouseReleased(MouseEvent e) { checkPopup(e); }
});
```

### Q3. [10/15 Marks] Detail Modal vs Modeless Dialog Windows with a Custom `JDialog` Implementation.
**Comprehensive University Solution:**
```java
public class PasswordResetDialog extends JDialog {
    public PasswordResetDialog(Frame parent) {
        // true enables MODAL mode (blocks parent frame until dismissed)
        super(parent, "Reset Security Credentials", true);
        setSize(300, 180);
        setLocationRelativeTo(parent);
        setLayout(new GridLayout(3, 1, 10, 10));

        add(new JLabel("Enter New Password:"));
        JPasswordField pass = new JPasswordField();
        add(pass);

        JButton saveBtn = new JButton("Update");
        saveBtn.addActionListener(e -> dispose()); // Closes dialog
        add(saveBtn);
    }
}
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently ask: Menu system architecture (JMenuBar, JMenu, JMenuItem, accelerators), JTable with DefaultTableModel, and Modal vs Modeless dialogs.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
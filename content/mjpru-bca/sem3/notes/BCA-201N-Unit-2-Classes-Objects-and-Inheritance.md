# BCA-201N: Object Oriented Programming using JAVA
## Unit 2 Master Exam Revision Notes: Classes, Objects, Methods, Constructors & Inheritance
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `931ea332-3d62-5a88-845d-12d24fc111fe` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Object-Oriented Programming Principles: Encapsulation, Data Abstraction, Inheritance, Polymorphism**
- [x] **Class Definition in Java: Member Variables, Member Methods, Access Specifiers within Class**
- [x] **Object Creation & Memory Layout: new Operator, Heap Allocation, Reference Variables in Stack**
- [x] **Methods in Java: Declaration, Syntax, Return Types, Parameter Passing Semantics (Strict Pass-by-Value)**
- [x] **Nesting of Methods & Method Overloading: Compile-Time Polymorphism via Argument Lists and Data Types**
- [x] **Constructors in Java: Purpose, Default Constructor, Parameterized Constructors, Constructor Overloading**
- [x] **The this Reference: Resolving Instance Variable Shadowing, Invoking Overloaded Constructors (this())**
- [x] **Static Members: static Fields (Class-Level Storage), static Methods, Static Initialization Blocks**
- [x] **Inheritance Fundamentals: Subclass and Superclass Concepts, extends Keyword, IS-A Relationship**
- [x] **Forms of Inheritance: Single, Multilevel, Hierarchical (Why Multiple Inheritance of Classes is Disallowed)**
- [x] **The super Keyword: Invoking Superclass Constructors (super()), Calling Overridden Superclass Methods**
- [x] **Method Overriding: Runtime Polymorphism, Dynamic Method Dispatch, Rules and Method Signature Constraints**
- [x] **The final Keyword: final Variables (Constants), final Methods (Preventing Override), final Classes**
- [x] **Abstract Classes & Abstract Methods: Concept, abstract Keyword, Rules, Enforcing Contractual Implementations**
- [x] **Garbage Collection & Object Lifecycle: Heap Management, Object Dereferencing, System.gc(), finalize() Method**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the difference between a Class and an Object in Java?
**Model Answer:**
- **Class:** A blueprint, template, or prototype defining the state (fields) and behavior (methods) common to all objects of that kind. It consumes no physical memory for instance fields.
- **Object:** An active runtime instance of a class created via the `new` operator, occupying dedicated space in heap memory.

### Q2. [2 Marks] What is the role of the `new` operator and constructor in object instantiation?
**Model Answer:**
The `new` operator dynamically allocates memory on the heap for the new object and returns a memory reference. Immediately following allocation, the corresponding **constructor** executes to initialize the object's instance variables.

### Q3. [2 Marks] What is Constructor Overloading?
**Model Answer:**
Defining multiple constructors within the same class having the exact same name but differing parameter lists (different number, types, or order of arguments), allowing objects to be initialized in different ways.

### Q4. [2 Marks] What is the `this` keyword in Java?
**Model Answer:**
`this` is a reference variable referring to the current calling object. It is used to:
1. Resolve name shadowing between instance variables and local parameters (`this.x = x`).
2. Invoke another constructor in the same class (`this(args)` constructor chaining).
3. Pass the current object as an argument.

### Q5. [2 Marks] What are the 4 Access Specifiers in Java?
**Model Answer:**
1. `private`: Accessible only within the declaring class.
2. `default` (package-private): Accessible by any class within the same package.
3. `protected`: Accessible within the same package, and by subclasses in other packages.
4. `public`: Accessible from any class in any package across the application.

### Q6. [2 Marks] What is the `super` keyword in Java?
**Model Answer:**
`super` is a reference variable used by a subclass to refer to its immediate superclass. It is used to:
1. Invoke the superclass constructor (`super(args)` - must be the first statement).
2. Access superclass instance variables hidden by subclass variables (`super.speed`).
3. Call overridden superclass methods (`super.display()`).

### Q7. [2 Marks] Why does Java NOT support Multiple Inheritance of classes?
**Model Answer:**
To avoid the **Diamond Problem** ambiguity: if class C extends both A and B, and both A and B override the same method `display()`, the compiler cannot determine which version C inherits. Java resolves this by supporting multiple inheritance through interfaces only.

### Q8. [2 Marks] What is Dynamic Method Dispatch (Runtime Polymorphism)?
**Model Answer:**
The mechanism by which a call to an overridden method is resolved at runtime rather than compile time. When an overridden method is invoked via a superclass reference variable (`Parent p = new Child()`), Java determines which implementation to execute based on the actual type of the object being referred to.

### Q9. [2 Marks] What is the purpose of the `final` keyword in Java?
**Model Answer:**
- `final variable`: Constant value that cannot be reassigned.
- `final method`: Method that cannot be overridden by any subclass.
- `final class`: Class that cannot be extended (subclassed), such as `java.lang.String`.

### Q10. [2 Marks] What is the `static` keyword in Java?
**Model Answer:**
`static` designates members (variables, methods, blocks, nested classes) that belong to the class itself rather than individual instances. Static variables share a single memory copy across all instances; static methods can be called directly without instantiating objects.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Differentiate between Method Overloading and Method Overriding with Syntax Examples.
**Model Answer:**
| Feature | Method Overloading | Method Overriding |
| :--- | :--- | :--- |
| **Context** | Within the same class | Between Superclass and Subclass |
| **Method Signature** | Must differ in parameters (type, count) | Must be identical (name, parameters, return type) |
| **Resolution** | Compile-time (Static binding) | Run-time (Dynamic method dispatch) |
| **Private / Static** | Can overload private/static methods | Cannot override private or static methods |
| **Return Type** | Can have different return types | Must be identical or covariant return type |
| **Annotation** | None required | `@Override` recommended |

### Q2. [5 Marks] Explain the Various Types of Inheritance Supported in Java with Diagrams.
**Model Answer:**
Java supports 3 forms of class inheritance directly:
1. **Single Inheritance:** Class B extends Class A.
2. **Multilevel Inheritance:** Class C extends Class B, and Class B extends Class A.
3. **Hierarchical Inheritance:** Multiple subclasses (B, C, D) extend a single parent class A.

*Note on Multiple & Hybrid Inheritance:* Class-level multiple inheritance is prohibited to avoid method collision; it is implemented seamlessly using `interface` declarations.

### Q3. [5 Marks] Explain Constructor Chaining using `this()` and `super()`.
**Model Answer:**
Constructor chaining is the process of calling one constructor from another constructor with respect to current object or superclass:
- `this()` invokes an overloaded constructor in the same class.
- `super()` invokes the constructor of the parent class.
- **Crucial Rule:** Either `this()` or `super()` must be the very first statement inside a constructor body. If omitted, the Java compiler automatically inserts a default `super()` call as the first line.

### Q4. [5 Marks] What is an Abstract Class and how does it differ from a Concrete Class?
**Model Answer:**
An **Abstract Class** (declared with `abstract`) cannot be instantiated directly with `new`. It serves as a base class containing a mix of concrete (implemented) methods and abstract methods (method signatures without a body ending in semicolon). Subclasses must provide concrete implementations for all inherited abstract methods, unless the subclass is also declared abstract.

### Q5. [5 Marks] Explain the Object Class (`java.lang.Object`) and its Core Methods.
**Model Answer:**
In Java, `java.lang.Object` is the root ancestor of all classes. Every class implicitly inherits from Object. Core methods include:
- `public String toString()`: Returns text representation (`ClassName@HexHashCode`).
- `public boolean equals(Object obj)`: Compares object references (can be overridden for content equality).
- `public int hashCode()`: Returns integer hash value for hashing collections.
- `protected Object clone()`: Creates a field-by-field copy (requires `Cloneable`).
- `public final Class<?> getClass()`: Returns runtime `Class` metadata object.
- `wait()`, `notify()`, `notifyAll()`: Thread synchronization primitives.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop an Enterprise Employee Payroll Management System in Java Demonstrating Classes, Inheritance, Constructor Chaining, Method Overriding, and Dynamic Polymorphism.
**Comprehensive University Solution:**
Here is a complete model implementation:

```java
/**
 * University Examination Model Solution: BCA-201N Unit 2
 * Comprehensive Payroll System Demonstrating Multilevel Inheritance & Polymorphism
 */
abstract class Employee {
    protected int empId;
    protected String name;
    protected double basicSalary;

    // Parameterized constructor
    public Employee(int empId, String name, double basicSalary) {
        this.empId = empId;
        this.name = name;
        this.basicSalary = basicSalary;
    }

    // Abstract method to be overridden by subclasses
    public abstract double calculateNetSalary();

    public void displayProfile() {
        System.out.printf("ID: %d | Name: %-15s | Basic: Rs. %,10.2f", empId, name, basicSalary);
    }
}

// Full-Time Salaried Employee
class PermanentEmployee extends Employee {
    protected double hraPercentage;
    protected double daPercentage;

    public PermanentEmployee(int empId, String name, double basicSalary, double hra, double da) {
        super(empId, name, basicSalary); // Constructor chaining to superclass
        this.hraPercentage = hra;
        this.daPercentage = da;
    }

    @Override
    public double calculateNetSalary() {
        double hra = basicSalary * (hraPercentage / 100.0);
        double da = basicSalary * (daPercentage / 100.0);
        double pfDeduction = basicSalary * 0.12;
        return (basicSalary + hra + da) - pfDeduction;
    }

    @Override
    public void displayProfile() {
        super.displayProfile();
        System.out.printf(" | Net: Rs. %,10.2f [Permanent]%n", calculateNetSalary());
    }
}

// Executive Manager with performance incentives
class Manager extends PermanentEmployee {
    private double managementBonus;

    public Manager(int empId, String name, double basicSalary, double hra, double da, double bonus) {
        super(empId, name, basicSalary, hra, da); // Chaining to PermanentEmployee
        this.managementBonus = bonus;
    }

    @Override
    public double calculateNetSalary() {
        return super.calculateNetSalary() + managementBonus;
    }

    @Override
    public void displayProfile() {
        super.displayProfile();
        System.out.printf("   -> Includes Executive Bonus of Rs. %,.2f%n", managementBonus);
    }
}

public class PayrollApplication {
    public static void main(String[] args) {
        System.out.println("===============================================================");
        System.out.println("        XROUNDER ACADEMIC PAYROLL SYSTEM - BCA-201N            ");
        System.out.println("===============================================================");

        // Dynamic Polymorphism: Base class references pointing to subclass instances
        Employee[] staff = new Employee[] {
            new PermanentEmployee(101, "Aarav Sharma", 45000.0, 20.0, 15.0),
            new PermanentEmployee(102, "Neha Verma", 52000.0, 20.0, 15.0),
            new Manager(103, "Vikram Malhotra", 85000.0, 25.0, 20.0, 20000.0)
        };

        double totalPayroll = 0;
        for (Employee emp : staff) {
            emp.displayProfile(); // Dynamically dispatched at runtime
            totalPayroll += emp.calculateNetSalary();
        }

        System.out.println("---------------------------------------------------------------");
        System.out.printf("Total Monthly Enterprise Payroll Outflow: Rs. %,.2f%n", totalPayroll);
        System.out.println("===============================================================");
    }
}
```

### Q2. [10/15 Marks] Explain Dynamic Method Dispatch in Depth with Virtual Method Tables (vtable) and Bytecode Mechanics.
**Comprehensive University Solution:**
### 1. Architectural Concept
Dynamic Method Dispatch is the runtime mechanism underlying Java's runtime polymorphism. When a method is called on a reference variable `Parent ref = new Child()`, the compiler generates an `invokevirtual` bytecode instruction. The decision of which code address to jump to is deferred until execution.

### 2. Virtual Method Tables (vtable)
During class loading, the JVM builds an internal array of method function pointers for each loaded class called a **vtable**:
- When a class overrides a parent method, the subclass vtable slot points to the subclass's compiled native code address.
- When a class does not override a parent method, its vtable slot points directly to the parent's compiled method code.

### 3. Execution Step
1. When `ref.method()` executes, the JVM reads the object's header to identify its exact concrete Class metadata.
2. It indexes into that concrete class's vtable at the fixed method offset determined during linking.
3. It fetches the function pointer and immediately jumps to the target code with negligible overhead (an indexed array lookup).

### Q3. [10/15 Marks] Write a Comprehensive Analysis of Access Modifiers, Package Visibility, and Information Hiding in Java.
**Comprehensive University Solution:**
Information hiding restricts direct external access to internal data structures, preventing invalid state mutations. Java provides a 4-tier visibility model:

```
+----------------------+---------+---------+-----------+-------+
| Access Specifier     | Class   | Package | Subclass  | World |
+----------------------+---------+---------+-----------+-------+
| private              |   YES   |   NO    |    NO     |  NO   |
| default (package)    |   YES   |   YES   |    NO     |  NO   |
| protected            |   YES   |   YES   |    YES    |  NO   |
| public               |   YES   |   YES   |    YES    |  YES  |
+----------------------+---------+---------+-----------+-------+
```
**Best Practices for University & Enterprise Design:**
1. Always declare instance fields as `private`.
2. Expose controlled access via accessor (getter) and mutator (setter) methods with strict input validation.
3. Use `protected` selectively for hook methods designed to be overridden by subclasses.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Master the payroll code structure. University examiners frequently ask for code demonstrating abstract classes, dynamic method dispatch, and constructor chaining with super() and this().

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
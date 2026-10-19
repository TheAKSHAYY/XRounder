# BCA-202N: Programming in Python
## Unit 4 Master Exam Revision Notes: Classes, Objects, Inheritance & Advanced OOP
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Object-Oriented Philosophy in Python: Classes as Types, Everything is an Object**
- [x] **Class Definition: class Keyword, Instance Attributes vs Class Attributes, Self Parameter Mechanics**
- [x] **Constructor & Destructor Methods: __init__() Initializer, __new__() Allocator, __del__() Finalizer**
- [x] **Encapsulation and Information Hiding: Public Members, Protected (_var Convention), Private (__var Name Mangling)**
- [x] **Property Decorators: @property, @setter, @deleter for Controlled Attribute Access**
- [x] **Inheritance Architecture: Single Inheritance, Multilevel Inheritance, Hierarchical Inheritance, Multiple Inheritance**
- [x] **Method Resolution Order (MRO): C3 Superclass Linearization Algorithm, ClassName.__mro__, super() Function**
- [x] **Polymorphism & Duck Typing: 'If it walks like a duck and quacks like a duck, it is a duck'**
- [x] **Method Overriding vs Method Overloading: Why Python Does Not Support Native Overloading (Dispatch by Default/args)**
- [x] **Operator Overloading & Dunder (Magic) Methods: __str__, __repr__, __add__, __sub__, __mul__, __eq__, __len__, __getitem__**
- [x] **Class Composition and Aggregation: HAS-A Relationships vs IS-A Inheritance**
- [x] **Abstract Base Classes (abc Module): @abstractmethod Decorator, Enforcing Contractual Subclass Implementations**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the purpose of the `__init__()` method in Python?
**Model Answer:**
`__init__()` is the class constructor in Python. It is automatically called when a new instance of a class is instantiated to initialize instance attributes.

### Q2. [2 Marks] What does the `self` parameter represent in Python methods?
**Model Answer:**
`self` represents the instance of the class itself. It explicitly passes the object's reference so methods can access and modify the object's attributes and other methods.

### Q3. [2 Marks] Differentiate between class variables and instance variables.
**Model Answer:**
- **Class Variables**: Shared across all instances of a class, defined inside the class body but outside methods.
- **Instance Variables**: Unique to each individual object instance, typically initialized inside `__init__()` using `self.var`.

### Q4. [2 Marks] How does Python implement data encapsulation and private members?
**Model Answer:**
Python uses naming conventions rather than language keywords:
- Single underscore `_var`: Protected (convention only).
- Double underscore `__var`: Private (enforces **Name Mangling** to `_ClassName__var`).

### Q5. [2 Marks] What is Method Overriding in Python?
**Model Answer:**
Method overriding occurs when a child subclass provides a specific implementation of a method that is already defined in its parent superclass, replacing parent behavior.

### Q6. [2 Marks] What does `super()` do in Python OOP?
**Model Answer:**
`super()` returns a proxy object delegating method calls to a parent or sibling class in the inheritance chain, following the Method Resolution Order (MRO).

### Q7. [2 Marks] Explain Method Resolution Order (MRO) and C3 Linearization.
**Model Answer:**
MRO is the deterministic order in which Python searches base classes for attributes and methods in multiple inheritance, computed using the **C3 Linearization Algorithm** (viewed via `Class.__mro__`).

### Q8. [2 Marks] What are magic (dunder) methods in Python? Give two examples.
**Model Answer:**
Magic methods have double leading and trailing underscores: e.g., `__str__()` (user-friendly string representation) and `__len__()` (returns length for `len(obj)`).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain Operator Overloading in Python with Common Dunder Methods.
**Model Answer:**
### Operator Overloading via Magic Methods
Python permits operators (`+`, `-`, `*`, `==`) to be customized for user-defined classes by implementing special methods:

| Operator | Magic Method | Description |
| :--- | :--- | :--- |
| `+` | `__add__(self, other)` | Addition |
| `-` | `__sub__(self, other)` | Subtraction |
| `*` | `__mul__(self, other)` | Multiplication |
| `==` | `__eq__(self, other)` | Equality comparison |
| `<` | `__lt__(self, other)` | Less than |
| `str(obj)` | `__str__(self)` | Readable string representation |
| `repr(obj)` | `__repr__(self)` | Unambiguous developer representation |

### Q2. [5 Marks] Differentiate between `@staticmethod`, `@classmethod`, and Regular Instance Methods.
**Model Answer:**
| Method Type | Decorator | First Parameter | Can Access |
| :--- | :--- | :--- | :--- |
| **Instance Method** | None | `self` | Instance attributes & class attributes |
| **Class Method** | `@classmethod` | `cls` | Class attributes, cannot access instance data directly (factory pattern) |
| **Static Method** | `@staticmethod` | None | Isolated utility logic, access neither `self` nor `cls` |

### Q3. [5 Marks] Explain Python Exception Handling Architecture (`try-except-else-finally`).
**Model Answer:**
### Full Exception Handling Flow
1. `try`: Encloses code that might trigger an exception.
2. `except ExceptionType as e`: Catches and handles specific exceptions.
3. `else`: Executes **only if NO exception occurred** in `try`.
4. `finally`: **Always executes** (for cleanup like closing files or DB connections), regardless of errors.
5. `raise`: Manually throws an exception.

### Q4. [5 Marks] Explain Abstract Base Classes (ABCs) in Python.
**Model Answer:**
Python supports abstract classes via the built-in `abc` module (`ABC` and `@abstractmethod`):
- An abstract class cannot be directly instantiated.
- Subclasses MUST implement all `@abstractmethod` definitions, enforcing consistent API contracts across polymorphic classes.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Complete Banking System Class Hierarchy Demonstrating Inheritance, Encapsulation, Polymorphism, and Custom Exceptions.
**Comprehensive University Solution:**
```python
"""
MJPRU Examination Model Solution: Unit 4
Object-Oriented Banking System with Custom Exceptions
"""
from abc import ABC, abstractmethod

# Custom Exception
class InsufficientFundsError(Exception):
    """Raised when account balance is less than withdrawal amount."""
    pass

# Abstract Base Class
class Account(ABC):
    def __init__(self, acc_no, holder_name, initial_balance=0.0):
        self._acc_no = acc_no               # Protected
        self.holder_name = holder_name      # Public
        self.__balance = initial_balance    # Private (Name Mangled)
    
    def get_balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive!")
        self.__balance += amount
        print(f"Deposited Rs. {amount:.2f}. New Balance: Rs. {self.__balance:.2f}")
    
    def withdraw(self, amount):
        if amount > self.__balance:
            raise InsufficientFundsError(f"Cannot withdraw Rs. {amount}. Available: Rs. {self.__balance}")
        self.__balance -= amount
        print(f"Withdrew Rs. {amount:.2f}. Remaining Balance: Rs. {self.__balance:.2f}")
    
    @abstractmethod
    def calculate_interest(self):
        pass

# Derived Class 1: Savings Account
class SavingsAccount(Account):
    INTEREST_RATE = 0.04 # 4% Annual interest
    
    def calculate_interest(self):
        interest = self.get_balance() * self.INTEREST_RATE
        print(f"Annual Interest Calculated: Rs. {interest:.2f}")
        return interest

# Execution & Polymorphism
savings = SavingsAccount("SB-10024", "Pooja Verma", 25000.0)
savings.deposit(5000.0)
savings.calculate_interest()
try:
    savings.withdraw(35000.0) # Triggers custom exception
except InsufficientFundsError as err:
    print("Transaction Error Caught:", err)
```

### Q2. [10/15 Marks] Demonstrate Operator Overloading by Implementing a 2D Vector Class with Addition, Subtraction, Dot Product, and String Representation.
**Comprehensive University Solution:**
```python
import math

class Vector2D:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        """Overloads + operator: v1 + v2"""
        return Vector2D(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        """Overloads - operator: v1 - v2"""
        return Vector2D(self.x - other.x, self.y - other.y)
    
    def __mul__(self, other):
        """Overloads * operator for Dot Product: v1 * v2"""
        return self.x * other.x + self.y * other.y
    
    def magnitude(self):
        return math.sqrt(self.x**2 + self.y**2)
    
    def __str__(self):
        return f"Vector2D({self.x}, {self.y})"
    
    def __repr__(self):
        return f"Vector2D(x={self.x}, y={self.y})"

v1 = Vector2D(3, 4)
v2 = Vector2D(1, 2)
print("v1:", v1)
print("v2:", v2)
print("v1 + v2:", v1 + v2) # Vector2D(4, 6)
print("v1 - v2:", v1 - v2) # Vector2D(2, 2)
print("Dot Product:", v1 * v2) # 3*1 + 4*2 = 11
print("Magnitude of v1:", v1.magnitude()) # 5.0
```

### Q3. [10/15 Marks] Explain Multiple Inheritance and the Diamond Problem in Python with C3 MRO Linearization.
**Comprehensive University Solution:**
### The Diamond Problem and C3 MRO in Python
When class `D` inherits from `B` and `C`, and both inherit from `A`, a diamond hierarchy is formed.

```python
class A:
    def execute(self):
        print("A.execute()")

class B(A):
    def execute(self):
        print("B.execute()")
        super().execute()

class C(A):
    def execute(self):
        print("C.execute()")
        super().execute()

class D(B, C):
    def execute(self):
        print("D.execute()")
        super().execute()

d = D()
d.execute()
print("\nMRO of D:", [cls.__name__ for cls in D.__mro__])
# MRO: ['D', 'B', 'C', 'A', 'object']
```
**Why Python solves this cleanly:** C3 Linearization ensures:
1. Children precede parents.
2. Order of base classes in declaration is preserved (`B` before `C`).
3. Every class is evaluated exactly once.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Be ready to write full class hierarchies with `super()`, explain Name Mangling, and solve the Diamond Problem with MRO.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
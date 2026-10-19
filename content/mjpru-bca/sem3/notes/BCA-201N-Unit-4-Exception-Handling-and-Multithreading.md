# BCA-201N: Object Oriented Programming using JAVA
## Unit 4 Master Exam Revision Notes: Exception Handling & Multithreaded Programming
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `d26825c0-b0c3-5c75-9cfd-f9936187b430` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Errors vs Exceptions in Java: Syntactic/Logical Errors, System Errors vs Recoverable Exceptional Conditions**
- [x] **Exception Class Hierarchy: java.lang.Throwable, Error Subclasses, Exception Subclasses, RuntimeException**
- [x] **Checked Exceptions (Compile-Time Enforced) vs Unchecked Exceptions (Runtime unchecked)**
- [x] **Exception Handling Mechanism: try Block, catch Block, Execution Flow upon Exception Generation**
- [x] **Multiple Catch Statements: Specific-to-General Ordering Rules, Multi-Catch Syntax (Java 7+)**
- [x] **Nested Try-Catch Blocks: Scope of Inner and Outer Exception Handlers**
- [x] **The finally Block: Execution Guarantee, Resource Deallocation Semantics, Execution with return Statements**
- [x] **Explicit Exception Generation: throw Statement, Re-throwing Exceptions**
- [x] **The throws Clause: Exception Propagation, Method Header Declarations, Caller Responsibility**
- [x] **Custom / User-Defined Exceptions: Subclassing java.lang.Exception, Custom Error Messages and State**
- [x] **Multithreading Fundamentals: Process-Based vs Thread-Based Multitasking, Context Switching Advantages**
- [x] **Creating Threads: Extending java.lang.Thread Class vs Implementing java.lang.Runnable Interface**
- [x] **Thread Life Cycle & State Machine: New, Runnable, Blocked, Waiting, Timed Waiting, Terminated States**
- [x] **Thread Control Methods: start(), run(), sleep(), join(), yield(), interrupt(), isAlive()**
- [x] **Thread Priorities: MIN_PRIORITY (1), NORM_PRIORITY (5), MAX_PRIORITY (10), Preemptive Scheduling**
- [x] **Synchronization in Multithreading: Race Conditions, Critical Section, synchronized Methods & Blocks**
- [x] **Inter-Thread Communication: Object Monitor Locking, wait(), notify(), notifyAll(), Producer-Consumer Problem**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is an 'Exception' in Java?
**Model Answer:**
An abnormal runtime event or condition that disrupts the normal sequential flow of program instructions. In Java, all exceptions are represented as objects subclassed from `java.lang.Throwable`.

### Q2. [2 Marks] Explain the Throwable Class Hierarchy in Java.
**Model Answer:**
`Throwable` is the root class, splitting into:
- `Error`: Serious environmental problems that applications should not try to catch (e.g., `OutOfMemoryError`, `StackOverflowError`).
- `Exception`: Conditions that applications can reasonably handle, divided into Checked and Unchecked Exceptions.

### Q3. [2 Marks] What is the difference between Checked and Unchecked Exceptions?
**Model Answer:**
- **Checked Exceptions:** Inherit from `Exception` (excluding `RuntimeException`). Checked at compile-time by `javac`; the programmer MUST handle them using `try-catch` or declare them using `throws` (e.g., `IOException`, `SQLException`).
- **Unchecked Exceptions:** Inherit from `RuntimeException`. Checked at runtime; usually indicate logic bugs (e.g., `NullPointerException`, `ArrayIndexOutOfBoundsException`).

### Q4. [2 Marks] Explain the role of `try`, `catch`, and `finally` blocks.
**Model Answer:**
- `try`: Encloses code that might throw an exception.
- `catch`: Catches and handles specific exception types.
- `finally`: Encloses cleanup code (closing files, releasing database connections) that is GUARANTEED to execute whether an exception is thrown or caught.

### Q5. [2 Marks] Does the `finally` block ALWAYS execute?
**Model Answer:**
Yes, `finally` executes almost unconditionally, even if `try` contains a `return` statement. The only exceptions are when `System.exit(0)` is invoked, or if the JVM crashes due to fatal hardware or OS failure.

### Q6. [2 Marks] Differentiate between `throw` and `throws` in Java.
**Model Answer:**
- `throw`: Keyword used inside a method body to explicitly throw an exception object instance (`throw new IllegalArgumentException();`).
- `throws`: Keyword used in the method signature to declare which checked exceptions the method might propagate (`void readFile() throws IOException`).

### Q7. [2 Marks] What are the two ways to create a Thread in Java?
**Model Answer:**
1. **Extending `java.lang.Thread`:** Subclass `Thread` and override its `run()` method.
2. **Implementing `java.lang.Runnable` (Preferred):** Implement the functional interface `Runnable`, override `run()`, and pass its instance to `new Thread(runnable)`.

### Q8. [2 Marks] Why is implementing `Runnable` preferred over extending `Thread`?
**Model Answer:**
Java supports single class inheritance. Extending `Thread` prevents the class from extending any other class. Implementing `Runnable` leaves the class free to extend other classes and promotes clean separation of task logic from thread execution.

### Q9. [2 Marks] Explain the difference between `start()` and `run()` methods of Thread.
**Model Answer:**
- `start()`: Allocates a new OS native execution thread, creates a private call stack, and invokes the `run()` method asynchronously.
- `run()`: Contains the thread task code. Calling `run()` directly merely executes it synchronously on the *current* thread without spawning a new thread.

### Q10. [2 Marks] What is Thread Synchronization in Java?
**Model Answer:**
A mechanism that prevents race conditions by controlling concurrent access of multiple threads to shared critical resources. Implemented using the `synchronized` keyword (synchronized methods or synchronized blocks), which acquires an intrinsic monitor lock on the target object.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Life Cycle of a Thread in Java with State Transitions.
**Model Answer:**
A Java thread traverses 6 states (`Thread.State` enum):

```
   +-----+       start()       +-------+
   | NEW | ------------------> | READY |
   +-----+                     +-------+
                                   |  CPU Dispatch
                                   v
                             +---------+
                             | RUNNING |
                             +---------+
                              /    |    \
            sleep()/wait()   /     |     \   yield() / quantum expire
                            v      |      v
             +------------------+  |   +-------+
             | BLOCKED/WAITING/ |  |   | READY |
             | TIMED_WAITING    |  |   +-------+
             +------------------+  |
                     | notify()    |
                     v             v run() ends
                +-------+     +------------+
                | READY |     | TERMINATED |
                +-------+     +------------+
```

### Q2. [5 Marks] Explain the Try-With-Resources Statement (Java 7+ Automatic Resource Management).
**Model Answer:**
Try-with-resources automatically closes any resource that implements `java.lang.AutoCloseable` at the end of the statement block, eliminating tedious nested `finally` blocks:
```java
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
    String line = br.readLine();
    System.out.println(line);
} catch (IOException e) {
    System.err.println("Read error: " + e.getMessage());
}
// br.close() is called automatically here!
```

### Q3. [5 Marks] Explain Inter-Thread Communication using `wait()`, `notify()`, and `notifyAll()`.
**Model Answer:**
Declared in `java.lang.Object`, these methods must be called from inside a `synchronized` context:
- `wait()`: Releases the object monitor lock and puts the calling thread into a sleeping state until signaled.
- `notify()`: Wakes up a single thread waiting on the object monitor.
- `notifyAll()`: Wakes up all threads waiting on the monitor lock.

### Q4. [5 Marks] What is a Custom (User-Defined) Exception and How Do You Create One?
**Model Answer:**
Custom exceptions represent domain-specific error conditions in business logic. Created by extending `Exception` (for checked) or `RuntimeException` (for unchecked):
```java
class InsufficientFundsException extends Exception {
    private double shortfall;
    public InsufficientFundsException(double shortfall) {
        super("Withdrawal failed! Shortfall amount: Rs. " + shortfall);
        this.shortfall = shortfall;
    }
    public double getShortfall() { return shortfall; }
}
```

### Q5. [5 Marks] Explain Deadlock in Multithreading and Techniques to Avoid It.
**Model Answer:**
Deadlock occurs when Thread 1 holds Lock A and waits for Lock B, while Thread 2 holds Lock B and waits for Lock A. Neither thread can proceed.
**Prevention Strategies:**
1. **Lock Ordering:** Always acquire shared locks in a strict global sequential order.
2. **Lock Timeout:** Use `ReentrantLock.tryLock(timeout)` instead of intrinsic `synchronized` blocks.
3. **Deadlock Detection:** Monitor thread states via JConsole or thread dumps.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Complete Thread-Safe Producer-Consumer Application in Java using Semaphores, `wait()`, and `notify()`.
**Comprehensive University Solution:**
```java
/**
 * University Examination Model Solution: BCA-201N Unit 4
 * Classic Bounded-Buffer Producer-Consumer Implementation
 */
import java.util.LinkedList;
import java.util.Queue;

class SharedBuffer {
    private final Queue<Integer> queue = new LinkedList<>();
    private final int capacity;

    public SharedBuffer(int capacity) {
        this.capacity = capacity;
    }

    public synchronized void produce(int value) throws InterruptedException {
        while (queue.size() == capacity) {
            System.out.println("[Buffer Full] Producer waiting...");
            wait(); // Releases lock, sleeps until consumer consumes
        }
        queue.add(value);
        System.out.printf("Produced item: %-4d | Buffer size: %d/%d%n", value, queue.size(), capacity);
        notify(); // Wakes up consumer
    }

    public synchronized int consume() throws InterruptedException {
        while (queue.isEmpty()) {
            System.out.println("[Buffer Empty] Consumer waiting...");
            wait(); // Releases lock, sleeps until producer produces
        }
        int value = queue.remove();
        System.out.printf("Consumed item: %-4d | Buffer size: %d/%d%n", value, queue.size(), capacity);
        notify(); // Wakes up producer
        return value;
    }
}

public class ProducerConsumerDemo {
    public static void main(String[] args) {
        SharedBuffer buffer = new SharedBuffer(3);

        Thread producer = new Thread(() -> {
            int item = 1;
            try {
                while (item <= 6) {
                    buffer.produce(item++);
                    Thread.sleep(200);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "Producer-Thread");

        Thread consumer = new Thread(() -> {
            try {
                for (int i = 1; i <= 6; i++) {
                    buffer.consume();
                    Thread.sleep(400);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "Consumer-Thread");

        producer.start();
        consumer.start();
    }
}
```

### Q2. [10/15 Marks] Explain Exception Propagation in Java with Code and Call Stack Mechanics.
**Comprehensive University Solution:**
### 1. Call Stack Mechanics
When an exception is thrown, the runtime searches the current method frame for a matching `catch` block. If none exists, the method frame is popped off the call stack and control transfers to the caller method. This unwinding continues down the stack until a matching catch is encountered or `main()` terminates, causing the JVM to print a stack trace.

```java
class ExceptionPropagationDemo {
    void method3() {
        int result = 50 / 0; // ArithmeticException thrown here
    }
    void method2() {
        method3(); // Propagated
    }
    void method1() {
        try {
            method2();
        } catch (ArithmeticException e) {
            System.out.println("Handled in method1: " + e.getMessage());
        }
    }
    public static void main(String[] args) {
        new ExceptionPropagationDemo().method1();
    }
}
```

### Q3. [10/15 Marks] Explain Thread Priority, Daemon Threads, and `join()` Synchronization in Java.
**Comprehensive University Solution:**
### 1. Thread Priorities
Thread priorities range from `Thread.MIN_PRIORITY` (1) to `Thread.MAX_PRIORITY` (10), with default `NORM_PRIORITY` (5). They serve as hints to the OS thread scheduler, but do NOT guarantee exact execution order across platforms.

### 2. Daemon Threads
A background service provider thread (e.g., Garbage Collector). When all user (non-daemon) threads complete, the JVM halts immediately, killing any active daemon threads.

### 3. The `join()` Method
Calling `t.join()` causes the current calling thread to pause execution until thread `t` completes execution, ensuring sequential ordering among concurrent tasks.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Producer-Consumer with wait() and notify() is a staple 10/15 mark exam question. Know the difference between checked and unchecked exceptions and the exact Throwable hierarchy.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
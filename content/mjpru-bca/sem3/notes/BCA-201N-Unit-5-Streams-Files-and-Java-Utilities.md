# BCA-201N: Object Oriented Programming using JAVA
## Unit 5 Master Exam Revision Notes: Managing Input/Output Files, Streams & Java Utilities
**Target Examination:** MJPRU Bareilly BCA Semester 3 (CBCS Pattern 2024–25)
**Unit Identifier:** `b0a32c41-9236-5075-9a0d-cf0cc936d248` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Java I/O Stream Model: Concept of Streaming Data, Sources and Sinks, Byte Streams vs Character Streams**
- [x] **Byte Stream Class Hierarchy: java.io.InputStream and java.io.OutputStream Root Abstract Classes**
- [x] **File Byte Streaming: FileInputStream and FileOutputStream for Reading and Writing Raw Binary/Text Data**
- [x] **Buffered Byte Streaming: BufferedInputStream and BufferedOutputStream for Optimized Disk I/O**
- [x] **Character Stream Class Hierarchy: java.io.Reader and java.io.Writer Root Abstract Classes, 16-bit Unicode Handling**
- [x] **File Character Streaming: FileReader and FileWriter, Character Encoding Conventions**
- [x] **Buffered Character Streaming: BufferedReader, BufferedWriter, readLine() and newLine() Methods**
- [x] **Standard Console Input: InputStreamReader with BufferedReader, System.in Wrapping, System.console()**
- [x] **Data Streams: DataInputStream and DataOutputStream for Primitive Binary Typed I/O (writeInt, readDouble)**
- [x] **Object Serialization & Deserialization: ObjectOutputStream, ObjectInputStream, Serializable Marker Interface**
- [x] **The transient Keyword: Excluding Sensitive Member Variables from Object Serialization**
- [x] **File Class (java.io.File): Pathnames, File Metadata, exists(), isFile(), isDirectory(), length(), delete()**
- [x] **Directory Management: mkdir(), mkdirs(), list(), listFiles() Operations on Filesystem Directories**
- [x] **I/O Exception Handling: IOException, FileNotFoundException, EOFException, try-with-resources AutoCloseable**
- [x] **Modern Java NIO Preview: java.nio Package, Path, Paths, Files Utility Methods, High-Performance Buffers**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is a 'Stream' in Java I/O?
**Model Answer:**
A logical sequence of data connected to an I/O channel. In Java, streams are unidirectional: an InputStream/Reader reads data from a source; an OutputStream/Writer sends data to a destination.

### Q2. [2 Marks] Differentiate between Byte Streams and Character Streams.
**Model Answer:**
- **Byte Streams:** Process raw 8-bit bytes (binary data like images, audio, compiled `.class` files); rooted in `InputStream` and `OutputStream`.
- **Character Streams:** Process 16-bit Unicode characters (text files); rooted in `Reader` and `Writer`, handling character encoding automatically.

### Q3. [2 Marks] What is the role of `FileInputStream` and `FileOutputStream`?
**Model Answer:**
- `FileInputStream`: Reads raw bytes from a physical file on disk.
- `FileOutputStream`: Writes raw bytes to a physical file on disk, supporting append or overwrite modes.

### Q4. [2 Marks] Why is `BufferedReader` used for reading text files instead of `FileReader` alone?
**Model Answer:**
`FileReader` issues a disk read for every character requested. `BufferedReader` reads a large chunk (default 8 KB) into a memory buffer and provides `readLine()` to read entire text lines efficiently, minimizing expensive disk head operations.

### Q5. [2 Marks] What is 'Serialization' in Java?
**Model Answer:**
The process of converting the in-memory state of an object into a sequence of bytes that can be saved to disk or transmitted across a network. A class must implement `java.io.Serializable` to be serializable.

### Q6. [2 Marks] What is 'Deserialization'?
**Model Answer:**
The reverse process of Serialization: reading a serialized byte stream from storage or network and reconstructing the original live Java object in memory using `ObjectInputStream`.

### Q7. [2 Marks] What is the `transient` keyword in Java Serialization?
**Model Answer:**
A modifier applied to instance variables indicating that they should NOT be serialized. During serialization, transient fields are skipped, and upon deserialization they are reset to default values (0, null) to protect sensitive data (passwords, encryption keys).

### Q8. [2 Marks] What is `serialVersionUID` and why is it important?
**Model Answer:**
A unique version identifier associated with each serializable class. During deserialization, the JVM compares the sender's `serialVersionUID` with the receiver's class version; if they mismatch, an `InvalidClassException` is thrown, preventing incompatible class schema corruption.

### Q9. [2 Marks] What is the Java Collections Framework (JCF)?
**Model Answer:**
A unified architecture in `java.util` for representing and manipulating collections of objects, providing core interfaces (`List`, `Set`, `Queue`, `Map`) and high-performance algorithms (sorting, searching).

### Q10. [2 Marks] Differentiate between `ArrayList` and `LinkedList`.
**Model Answer:**
- `ArrayList`: Backed by a dynamic array. Fast random access $O(1)$, slow insertions/deletions in the middle $O(n)$ due to element shifting.
- `LinkedList`: Backed by a doubly-linked list. Fast insertions/deletions $O(1)$, slow sequential access $O(n)$.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Java Collection Interface Hierarchy with a Structured Diagram.
**Model Answer:**
```
                          +-------------------+
                          |    Iterable<E>    |
                          +-------------------+
                                    ^
                                    |
                          +-------------------+
                          |   Collection<E>   |           +-------------+
                          +-------------------+
                                    ^                     |   Map<K, V> |
         +--------------------------+----------+          +-------------+
         |                          |          |                 ^
+-----------------+        +-----------------+ |                 |
|     List<E>     |        |     Set<E>      | |                 |
+-----------------+        +-----------------+ |          +--------------+
   |             |            |            |   |          |   HashMap    |
+-----------+ +--------+ +---------+ +-------+ |          |  TreeMap     |
| ArrayList | | Linked | | HashSet | | Tree  | |          +--------------+
| Vector    | | List   | | Linked  | | Set   | |
+-----------+ +--------+ | HashSet | +-------+ |
                         +---------+           |
                                      +-----------------+
                                      |    Queue<E>     |
                                      +-----------------+
                                         |            |
                                      +--------+ +-------------+
                                      | Priority| | Deque /     |
                                      | Queue   | | ArrayDeque  |
                                      +--------+ +-------------+
```

### Q2. [5 Marks] Differentiate between `HashMap` and `TreeMap`.
**Model Answer:**
| Feature | `HashMap` | `TreeMap` |
| :--- | :--- | :--- |
| **Underlying Data Structure** | Hash Table (Bucket array + Linked List/Red-Black Tree) | Red-Black Tree (Self-balancing BST) |
| **Ordering** | No guaranteed order | Sorted by natural key order or `Comparator` |
| **Performance** | $O(1)$ average for `get()` / `put()` | $O(\log n)$ guaranteed for all operations |
| **Null Keys** | Allows 1 null key | Does NOT allow null keys (throws `NullPointerException`) |
| **Interfaces** | Implements `Map` | Implements `NavigableMap`, `SortedMap` |

### Q3. [5 Marks] Explain the `File` class in `java.io` and its Common Methods.
**Model Answer:**
The `File` class represents abstract file and directory pathnames:
- `createNewFile()`: Creates empty file on disk.
- `exists()`: Tests existence.
- `isDirectory()` / `isFile()`: Tests type.
- `length()`: Returns file size in bytes.
- `delete()`: Deletes file/empty directory.
- `mkdir()` / `mkdirs()`: Creates directory path.
- `list()` / `listFiles()`: Returns directory contents.

### Q4. [5 Marks] Explain the Difference between `Comparable` and `Comparator` Interfaces.
**Model Answer:**
- `Comparable<T>` (`java.lang`): Defines natural ordering of a class. The class implements `compareTo(T o)`. Modifies the original class; single sorting sequence.
- `Comparator<T>` (`java.util`): Defines custom, external sorting logic. Implements `compare(T o1, T o2)`. Separate class without modifying the target class; multiple sorting sequences.

### Q5. [5 Marks] Explain Scanner vs BufferedReader for Console and File Input.
**Model Answer:**
- `BufferedReader`: Synchronized, fast, reads character streams with an 8 KB buffer, reads line-by-line (`readLine()`), requires manual parsing (`Integer.parseInt()`).
- `Scanner`: Non-synchronized, slower, tokenizes input using regular expressions, provides utility methods (`nextInt()`, `nextDouble()`), convenient for interactive input.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Complete Student Record Management Program in Java Demonstrating File I/O, Serialization, and Deserialization.
**Comprehensive University Solution:**
```java
/**
 * University Examination Model Solution: BCA-201N Unit 5
 * Object Serialization and Persistent File Storage
 */
import java.io.*;

class StudentRecord implements Serializable {
    private static final long serialVersionUID = 1002345L;
    private int rollNo;
    private String name;
    private double marks;
    private transient String confidentialPin; // Skipped during serialization

    public StudentRecord(int rollNo, String name, double marks, String pin) {
        this.rollNo = rollNo;
        this.name = name;
        this.marks = marks;
        this.confidentialPin = pin;
    }

    public void display() {
        System.out.printf("Roll: %d | Name: %-15s | Marks: %.2f | PIN: %s%n", 
                          rollNo, name, marks, confidentialPin);
    }
}

public class SerializationApplication {
    private static final String DATA_FILE = "student_data.ser";

    public static void main(String[] args) {
        StudentRecord s1 = new StudentRecord(2401, "Rohan Gupta", 91.5, "9876");

        // 1. Serialization
        System.out.println("Serializing student object to disk...");
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(DATA_FILE))) {
            oos.writeObject(s1);
            System.out.println("Object serialized successfully!");
        } catch (IOException e) {
            System.err.println("Serialization error: " + e.getMessage());
        }

        // 2. Deserialization
        System.out.println("\nDeserializing student object from disk...");
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(DATA_FILE))) {
            StudentRecord restored = (StudentRecord) ois.readObject();
            System.out.println("Object restored successfully! Record details:");
            restored.display(); // Notice PIN will be null due to transient!
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Deserialization error: " + e.getMessage());
        }
    }
}
```

### Q2. [10/15 Marks] Explain How `HashMap` Works Internally in Java (Hashing, Buckets, Collision Resolution, and Java 8 Treeification).
**Comprehensive University Solution:**
### 1. Internal Storage Structure
A `HashMap` is an array of `Node<K, V>` instances (buckets). Default initial capacity is 16, with a load factor of 0.75.

### 2. The `put(K, V)` Operation
1. Computes the hash: `int hash = (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16)`.
2. Computes the bucket index: `index = (n - 1) & hash`.
3. If bucket is empty, a new `Node` is placed.
4. If occupied, collision resolution executes:
   - It iterates through the linked list comparing `key.equals()`.
   - If matching key found, old value is replaced.
   - Otherwise, new node is appended to the tail.

### 3. Java 8 Treeification Optimization
When a single bucket's linked list length reaches **8 (TREEIFY_THRESHOLD)** and the total table capacity is at least 64, the linked list is dynamically transformed into a **Red-Black Balanced Binary Search Tree**. This upgrades the worst-case collision lookup time from $O(n)$ to $O(\log n)$.

### Q3. [10/15 Marks] Write a Program to Copy a Binary Image File from Source to Destination using Buffered Streams.
**Comprehensive University Solution:**
```java
import java.io.*;

public class BinaryFileCopy {
    public static void main(String[] args) {
        File src = new File("source_image.png");
        File dest = new File("copy_image.png");

        // Using Buffered Byte Streams for high-speed block copying
        try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(src));
             BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(dest))) {
            
            byte[] buffer = new byte[4096]; // 4 KB transfer block
            int bytesRead;
            while ((bytesRead = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, bytesRead);
            }
            bos.flush();
            System.out.println("Binary file copied successfully with zero data loss!");
        } catch (IOException e) {
            System.err.println("File I/O Error: " + e.getMessage());
        }
    }
}
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Serialization with transient keyword, HashMap internal working, and Collection interface hierarchy are guaranteed high-scoring questions.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
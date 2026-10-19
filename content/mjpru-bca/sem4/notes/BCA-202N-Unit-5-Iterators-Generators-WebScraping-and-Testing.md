# BCA-202N: Programming in Python
## Unit 5 Master Exam Revision Notes: Iterators, Generators, Web Scraping & Testing
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `82debd1e-19e8-581f-8185-375fbdc445d5` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Iteration Protocol: Iterable vs Iterator, __iter__() and __next__() Methods, StopIteration Exception**
- [x] **Custom Iterator Implementation: Building State-Tracking Iterable Classes**
- [x] **Generators in Python: yield Statement, Generator Functions, Execution Pausing and Resumption State**
- [x] **Generator Expressions: Memory-Efficient Lazy Stream Evaluation (expr for item in iterable)**
- [x] **Python Exception Handling: try, except, else, finally Blocks, Exception Hierarchy (BaseException, Exception)**
- [x] **Raising and Creating Custom Exceptions: raise Statement, Subclassing Exception Class**
- [x] **Assertions in Python: assert Statement, AssertionError, Debugging Flag (-O Flag Optimization)**
- [x] **Python Testing and Debugging: pdb (Python Debugger - n, s, c, p commands), unittest Framework (TestCase, assertEqual)**
- [x] **Web Scraping Fundamentals: HTTP Requests Protocol, RESTful APIs, urllib vs requests Library (GET, POST, Headers)**
- [x] **HTML Parsing with Beautiful Soup (bs4): Soup Objects, NavigableStrings, Tag Finding (find, find_all, select CSS Selectors)**
- [x] **Data Extraction & Sanitization: Scraping Tables, Attributes, Text Content, Handling Pagination**
- [x] **Ethical Web Scraping Practices: robots.txt Compliance, Request Throttling, User-Agent Headers, Rate Limiting**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the difference between an Iterable and an Iterator in Python?
**Model Answer:**
- **Iterable**: Any object that implements `__iter__()` and can return an iterator (e.g., `list`, `str`, `dict`).
- **Iterator**: A stateful object that implements `__next__()` and raises `StopIteration` when elements are exhausted.

### Q2. [2 Marks] What does the `yield` keyword do in Python?
**Model Answer:**
`yield` transforms a regular function into a **generator**. It suspends function execution, returns an intermediate value to the caller, and retains its local execution state to resume on next invocation.

### Q3. [2 Marks] What is the memory advantage of Generators over Lists?
**Model Answer:**
Lists store all elements in memory simultaneously ($O(n)$ space). Generators produce values lazily on-demand one item at a time ($O(1)$ space), enabling processing of infinite streams or gigabyte-sized log files.

### Q4. [2 Marks] What is `itertools` in Python?
**Model Answer:**
`itertools` is a standard library module providing fast, memory-efficient building blocks for iterator manipulation: e.g., `count()`, `cycle()`, `permutations()`, `combinations()`, `chain()`.

### Q5. [2 Marks] What is Web Scraping, and which Python libraries are commonly used?
**Model Answer:**
Web scraping is the automated extraction of data from websites. Common Python libraries include `requests` (HTTP requests), `BeautifulSoup` (`bs4` for parsing HTML DOM), and `Selenium` (browser automation).

### Q6. [2 Marks] What is the `Robots.txt` file in web scraping?
**Model Answer:**
A text file hosted at a website's root (e.g., `example.com/robots.txt`) specifying rules and directives (Allow/Disallow) for automated web crawlers and scraping bots.

### Q7. [2 Marks] What is the built-in testing framework in Python?
**Model Answer:**
`unittest` is Python's standard unit testing framework, patterned after Java's JUnit, providing test runners, test fixtures (`setUp`, `tearDown`), and assertions (`assertEqual`, `assertTrue`).

### Q8. [2 Marks] What is the difference between `unittest` and `pytest`?
**Model Answer:**
- `unittest`: Built-in, requires boilerplate classes inheriting `unittest.TestCase`, camelCase assertions.
- `pytest`: Third-party, supports plain standalone functions, native Python `assert` statements, and powerful fixture injection.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain How to Implement a Custom Iterator Class in Python with Code.
**Model Answer:**
### Implementing the Iterator Protocol
An iterator class must implement:
1. `__iter__()`: Returns `self`.
2. `__next__()`: Returns next element or raises `StopIteration`.

```python
class FibonacciIterator:
    """Generates Fibonacci numbers up to a maximum limit."""
    def __init__(self, limit):
        self.limit = limit
        self.a = 0
        self.b = 1
        self.count = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.count >= self.limit:
            raise StopIteration
        val = self.a
        self.a, self.b = self.b, self.a + self.b
        self.count += 1
        return val

fib = FibonacciIterator(8)
print("Fibonacci Sequence:", list(fib)) # [0, 1, 1, 2, 3, 5, 8, 13]
```

### Q2. [5 Marks] Explain Generator Expressions vs List Comprehensions with Memory Comparisons.
**Model Answer:**
| Feature | List Comprehension | Generator Expression |
| :--- | :--- | :--- |
| **Syntax** | `[x**2 for x in range(n)]` | `(x**2 for x in range(n))` |
| **Type** | `<class 'list'>` | `<class 'generator'>` |
| **Evaluation** | Eager (allocates entire list at once) | Lazy (computed only when consumed) |
| **Memory Consumption** | $O(n)$ proportional to size | $O(1)$ constant minimal overhead |
| **Reusability** | Can be traversed repeatedly | One-pass stream; exhausted after iteration |

### Q3. [5 Marks] Explain Web Scraping Workflow using `requests` and `BeautifulSoup`.
**Model Answer:**
### Web Scraping 4-Stage Workflow
1. **Fetch**: Send HTTP GET request via `requests.get(url, headers={'User-Agent': '...'})`.
2. **Parse**: Parse HTML string into a searchable DOM tree: `soup = BeautifulSoup(response.content, 'html.parser')`.
3. **Extract**: Locate tags using CSS selectors or methods: `soup.find()`, `soup.find_all('div', class_='...')`.
4. **Persist**: Clean text (`.strip()`) and store in CSV or JSON.

### Q4. [5 Marks] Explain Test Fixtures (`setUp` and `tearDown`) in Python's `unittest` Framework.
**Model Answer:**
Test fixtures ensure reliable test environments:
- `setUp()`: Executes **before each test method** to initialize resources (e.g., creating test data, connecting to mock database).
- `tearDown()`: Executes **after each test method** to release resources (e.g., closing file descriptors, clearing temporary tables).
- Class-level fixtures: `setUpClass()` and `tearDownClass()` run once for the entire test class.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Develop a Complete HTML Web Scraper in Python using `requests` and `BeautifulSoup` with Error Handling.
**Comprehensive University Solution:**
```python
"""
MJPRU Examination Model Solution: Unit 5
Ethical Web Scraper with Requests and BeautifulSoup
"""
import requests
from bs4 import BeautifulSoup

def scrape_quotes(page_limit=1):
    base_url = "http://quotes.toscrape.com"
    headers = {"User-Agent": "AcademicResearcher/1.0 (MJPRU BCA Student Project)"}
    scraped_data = []
    
    for page in range(1, page_limit + 1):
        url = f"{base_url}/page/{page}/"
        print(f"Fetching URL: {url}...")
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            resp.raise_for_status() # Raises HTTPError for 4xx/5xx
        except requests.RequestException as e:
            print(f"Network error on page {page}: {e}")
            break
            
        soup = BeautifulSoup(resp.text, "html.parser")
        quote_boxes = soup.find_all("div", class_="quote")
        
        for box in quote_boxes:
            text = box.find("span", class_="text").get_text(strip=True)
            author = box.find("small", class_="author").get_text(strip=True)
            tags = [t.get_text() for t in box.find_all("a", class_="tag")]
            
            scraped_data.append({
                "quote": text,
                "author": author,
                "tags": tags
            })
            
    return scraped_data

# Execution
quotes = scrape_quotes(page_limit=1)
print(f"\nExtracted {len(quotes)} quotes successfully:")
for q in quotes[:3]:
    print(f"- \"{q['quote'][:40]}...\" by {q['author']} (Tags: {', '.join(q['tags'])})")
```

### Q2. [10/15 Marks] Write a Complete Unit Test Suite using Python's `unittest` Library Testing a Calculator Class.
**Comprehensive University Solution:**
```python
import unittest

# Class to be tested
class Calculator:
    def add(self, a, b):
        return a + b
    
    def divide(self, a, b):
        if b == 0:
            raise ZeroDivisionError("Division by zero is undefined!")
        return a / b

# Test Suite
class TestCalculator(unittest.TestCase):
    def setUp(self):
        """Runs before every test method."""
        self.calc = Calculator()
    
    def tearDown(self):
        """Runs after every test method."""
        self.calc = None
    
    def test_addition(self):
        self.assertEqual(self.calc.add(10, 5), 15)
        self.assertEqual(self.calc.add(-1, 1), 0)
    
    def test_division(self):
        self.assertAlmostEqual(self.calc.divide(10, 3), 3.3333333, places=5)
    
    def test_division_by_zero_exception(self):
        """Verify that ZeroDivisionError is raised."""
        with self.assertRaises(ZeroDivisionError):
            self.calc.divide(10, 0)

if __name__ == "__main__":
    unittest.main()
```

### Q3. [10/15 Marks] Demonstrate Advanced Infinite Stream Processing using Python Generators and `itertools`.
**Comprehensive University Solution:**
```python
import itertools

# Infinite prime number generator
def prime_generator():
    yield 2
    primes = [2]
    candidate = 3
    while True:
        is_prime = True
        limit = int(candidate ** 0.5) + 1
        for p in primes:
            if p > limit:
                break
            if candidate % p == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(candidate)
            yield candidate
        candidate += 2

# Consuming infinite generator using itertools.islice (O(1) memory)
first_10_primes = list(itertools.islice(prime_generator(), 10))
print("First 10 Prime Numbers:", first_10_primes)
# Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

# Demonstrating itertools.chain
seq = list(itertools.chain([1, 2], ['a', 'b'], [10.5, 20.5]))
print("Chained Iterables:", seq)
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Be prepared to write custom iterators with `__iter__` and `__next__`, explain generator memory efficiency, and show `unittest.TestCase` structure.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
# BCA-103N: Programming with C
## Unit 3 Master Exam Revision Notes: Arrays, 2D Arrays, Strings & String Handling Functions
**Target Examination:** MJPRU Bareilly BCA Semester 1 (CBCS Pattern 2024–25)
**Unit Identifier:** `ae86ea89-22a4-4f1d-8b26-e5cfd4c752d1` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Array Fundamentals: Definition, Homogeneous Collection, Contiguous Memory Allocation, Subscripting**
- [x] **One-Dimensional Arrays: Declaration, Size Specification, Compile-time & Run-time Initialization**
- [x] **Array Element Access: Zero-based Indexing, Base Address & Address Calculation Formula (Base + i * sizeof(type))**
- [x] **Array Bound Checking & Overflow: Undefined Behavior in C, Buffer Overruns & Safety**
- [x] **Multi-Dimensional Arrays: 2D Arrays, Matrix Representation, Row-Major vs Column-Major Storage**
- [x] **2D Array Operations: Matrix Addition, Subtraction, Multiplication, Transpose & Diagonal Sums**
- [x] **Character Arrays vs Numeric Arrays: Character Storage, Trailing Null Character ('\0')**
- [x] **Strings in C: String Literals, Declaration, Initialization & Memory Layout**
- [x] **String Input/Output: scanf("%s") Limitations, gets() Security Risks, fgets() Safe Usage, puts()**
- [x] **String Handling Functions (string.h): strlen(), strcpy(), strncpy(), strcat(), strncat()**
- [x] **String Comparison & Manipulation: strcmp(), strncmp(), strrev(), strlwr(), strupr(), strchr(), strstr()**
- [x] **Building Custom String Operations without Library Functions**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] Define an Array in C.
**Model Answer:**
An array is a homogeneous collection of elements of the same data type stored in contiguous physical memory locations, referenced by a common name and a zero-based integer index/subscript.

### Q2. [2 Marks] What is the Base Address of an array?
**Model Answer:**
The memory address of the very first element (`&arr[0]`) of the array. In C, the array name itself decays into a pointer to its base address.

### Q3. [2 Marks] State the memory address calculation formula for an element `arr[i]` in a 1D array.
**Model Answer:**
`Address(arr[i]) = Base_Address + (i * sizeof(element_type))`

### Q4. [2 Marks] What happens if you access an array out of its bounds in C (e.g., `arr[10]` in an array of size 5)?
**Model Answer:**
C does not perform run-time array bounds checking. Accessing out-of-bounds memory triggers **Undefined Behavior**, resulting in data corruption, segmentation faults, or silent security bugs.

### Q5. [2 Marks] How are 2D arrays organized in memory: Row-Major vs Column-Major?
**Model Answer:**
C strictly employs **Row-Major Order**: all elements of row 0 are stored contiguously in memory, followed immediately by row 1, row 2, and so on.

### Q6. [2 Marks] State the address calculation formula for element `arr[i][j]` in a 2D array in Row-Major order.
**Model Answer:**
`Address(arr[i][j]) = Base_Address + [(i * Total_Columns) + j] * sizeof(element_type)`

### Q7. [2 Marks] How is a String represented internally in C?
**Model Answer:**
A string in C is a sequence of characters stored in a contiguous 1D `char` array terminated by an invisible null character (`'\0'`, ASCII value 0).

### Q8. [2 Marks] What is the purpose of the null character (`'\0'`) in strings?
**Model Answer:**
It marks the logical end of the string in memory. Standard string library functions (`strlen`, `printf`, `strcpy`) rely on `'\0'` to know when to stop reading bytes.

### Q9. [2 Marks] What is the limitation of `scanf("%s", str)` when reading strings?
**Model Answer:**
`scanf("%s")` stops reading at the first whitespace character (space, tab, newline). To read full strings containing spaces, `fgets(str, sizeof(str), stdin)` must be used.

### Q10. [2 Marks] What does `strcmp(str1, str2)` return?
**Model Answer:**
Returns `0` if strings are identical; a negative integer if `str1` is lexicographically less than `str2`; a positive integer if `str1` is lexicographically greater than `str2`.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain 1D Array Declaration, Initialization, and Memory Layout.
**Model Answer:**
```c
int marks[5] = {85, 92, 78, 64, 90}; // Compile-time initialization
```
**Memory Layout:**
If base address is `2000` and `sizeof(int) = 4`:
- `marks[0]` -> Address 2000 (Value: 85)
- `marks[1]` -> Address 2004 (Value: 92)
- `marks[2]` -> Address 2008 (Value: 78)
- `marks[3]` -> Address 2012 (Value: 64)
- `marks[4]` -> Address 2016 (Value: 90)
Total bytes allocated = `5 * 4 = 20 bytes`.

### Q2. [5 Marks] Write a C program to perform Matrix Addition and Transpose on 2D arrays.
**Model Answer:**
```c
#include <stdio.h>

#define MAX 10

int main(void) {
    int A[MAX][MAX], B[MAX][MAX], Sum[MAX][MAX], Trans[MAX][MAX];
    int r, c, i, j;

    printf("Enter rows and columns (e.g. 3 3): ");
    scanf("%d %d", &r, &c);

    printf("Enter Matrix A elements:\n");
    for (i = 0; i < r; i++)
        for (j = 0; j < c; j++)
            scanf("%d", &A[i][j]);

    printf("Enter Matrix B elements:\n");
    for (i = 0; i < r; i++)
        for (j = 0; j < c; j++)
            scanf("%d", &B[i][j]);

    // Addition and Transpose
    for (i = 0; i < r; i++) {
        for (j = 0; j < c; j++) {
            Sum[i][j] = A[i][j] + B[i][j];
            Trans[j][i] = A[i][j]; // Swap row and column indices
        }
    }

    printf("\n--- Matrix A + B ---\n");
    for (i = 0; i < r; i++) {
        for (j = 0; j < c; j++) printf("%4d", Sum[i][j]);
        printf("\n");
    }

    printf("\n--- Transpose of Matrix A ---\n");
    for (i = 0; i < c; i++) {
        for (j = 0; j < r; j++) printf("%4d", Trans[i][j]);
        printf("\n");
    }
    return 0;
}
```

### Q3. [5 Marks] Explain five important string manipulation functions in `<string.h>` with syntax and examples.
**Model Answer:**
1. `size_t strlen(const char *s)`: Returns character count excluding null terminator. Example: `strlen("BCA")` returns 3.
2. `char *strcpy(char *dest, const char *src)`: Copies source string into destination buffer (including `'\0'`).
3. `char *strcat(char *dest, const char *src)`: Appends source string onto the end of destination string.
4. `int strcmp(const char *s1, const char *s2)`: Compares two strings lexicographically by character ASCII values.
5. `char *strstr(const char *haystack, const char *needle)`: Finds first occurrence of substring in string.

### Q4. [5 Marks] Write a C program to implement Linear Search and Bubble Sort on a 1D array.
**Model Answer:**
```c
#include <stdio.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int linear_search(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) return i; // Found at index i
    }
    return -1; // Not found
}
```

### Q5. [5 Marks] Explain how Character Arrays differ from Numeric Arrays in C.
**Model Answer:**
1. **Termination:** Character strings MUST be terminated with null character `'\0'`; numeric arrays have no termination marker and require explicit size tracking.
2. **I/O Support:** Character arrays can be printed directly as a single entity with `%s` or `puts()`; numeric arrays must be printed element-by-element using loops.
3. **String Literals:** Character arrays can be initialized with string literals: `char name[] = "MJPRU";` which automatically appends `'\0'`.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Write a complete C program to perform Matrix Multiplication of two 2D matrices after validating conformability conditions.
**Comprehensive University Solution:**
```c
/**
 * Program: 2D Matrix Multiplication with Conformability Check
 * Condition: Matrix A (r1 x c1) * Matrix B (r2 x c2) requires c1 == r2
 * Resulting Matrix: C (r1 x c2)
 */
#include <stdio.h>

#define MAX 10

int main(void) {
    int A[MAX][MAX], B[MAX][MAX], C[MAX][MAX];
    int r1, c1, r2, c2;
    int i, j, k;

    printf("Enter dimensions of Matrix A (rows cols): ");
    scanf("%d %d", &r1, &c1);
    printf("Enter dimensions of Matrix B (rows cols): ");
    scanf("%d %d", &r2, &c2);

    // Conformability validation
    if (c1 != r2) {
        printf("Error: Multiplication not conformable! Columns of A (%d) != Rows of B (%d).\n", c1, r2);
        return 1;
    }

    printf("Enter elements of Matrix A:\n");
    for (i = 0; i < r1; i++)
        for (j = 0; j < c1; j++)
            scanf("%d", &A[i][j]);

    printf("Enter elements of Matrix B:\n");
    for (i = 0; i < r2; i++)
        for (j = 0; j < c2; j++)
            scanf("%d", &B[i][j]);

    // Initialize product matrix C with zeros
    for (i = 0; i < r1; i++)
        for (j = 0; j < c2; j++)
            C[i][j] = 0;

    // Matrix multiplication: C[i][j] = sum(A[i][k] * B[k][j])
    for (i = 0; i < r1; i++) {
        for (j = 0; j < c2; j++) {
            for (k = 0; k < c1; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    printf("\n--- Resultant Matrix C (%d x %d) ---\n", r1, c2);
    for (i = 0; i < r1; i++) {
        for (j = 0; j < c2; j++) {
            printf("%6d", C[i][j]);
        }
        printf("\n");
    }
    return 0;
}
```

### Q2. [10/15 Marks] Write custom C implementations of `strlen()`, `strcpy()`, `strcat()`, `strcmp()`, and `strrev()` without using `<string.h>`.
**Comprehensive University Solution:**
```c
#include <stdio.h>

// 1. Custom string length
int my_strlen(const char str[]) {
    int len = 0;
    while (str[len] != '\0') len++;
    return len;
}

// 2. Custom string copy
void my_strcpy(char dest[], const char src[]) {
    int i = 0;
    while (src[i] != '\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\0'; // Crucial null termination
}

// 3. Custom string concatenation
void my_strcat(char dest[], const char src[]) {
    int i = 0, j = 0;
    while (dest[i] != '\0') i++; // Find end of dest
    while (src[j] != '\0') {
        dest[i++] = src[j++];
    }
    dest[i] = '\0';
}

// 4. Custom string compare
int my_strcmp(const char s1[], const char s2[]) {
    int i = 0;
    while (s1[i] != '\0' && s1[i] == s2[i]) i++;
    return (unsigned char)s1[i] - (unsigned char)s2[i];
}

// 5. Custom string reverse in-place
void my_strrev(char str[]) {
    int i = 0, j = my_strlen(str) - 1;
    while (i < j) {
        char temp = str[i];
        str[i] = str[j];
        str[j] = temp;
        i++; j--;
    }
}
```

### Q3. [10/15 Marks] Write a C program to check whether a given string is a Palindrome ignoring case and whitespace.
**Comprehensive University Solution:**
```c
#include <stdio.h>
#include <stdbool.h>
#include <ctype.h>
#include <string.h>

int main(void) {
    char str[100];
    char cleaned[100];
    int i, k = 0;

    printf("Enter a string: ");
    fgets(str, sizeof(str), stdin);

    // Remove trailing newline if present
    str[strcspn(str, "\n")] = '\0';

    // Clean: keep only alphanumeric characters converted to lowercase
    for (i = 0; str[i] != '\0'; i++) {
        if (isalnum((unsigned char)str[i])) {
            cleaned[k++] = tolower((unsigned char)str[i]);
        }
    }
    cleaned[k] = '\0';

    // Check palindrome using two-pointer technique
    int left = 0, right = k - 1;
    bool is_palindrome = true;
    while (left < right) {
        if (cleaned[left] != cleaned[right]) {
            is_palindrome = false;
            break;
        }
        left++;
        right--;
    }

    if (is_palindrome)
        printf("\"%s\" IS a valid Palindrome!\n", str);
    else
        printf("\"%s\" is NOT a palindrome.\n", str);

    return 0;
}
```


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
In BCA-103N Unit 3, Matrix Multiplication and writing string manipulation functions without using `<string.h>` are frequent 15-mark questions. Always include null termination `'\0'` in string code.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
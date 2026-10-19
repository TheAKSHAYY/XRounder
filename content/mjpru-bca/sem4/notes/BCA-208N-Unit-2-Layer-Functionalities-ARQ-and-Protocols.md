# BCA-208N: Computer Networks
## Unit 2 Master Exam Revision Notes: Network Models, Layer Functionalities & Protocols
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `37faa7a4-65df-5cef-9c27-88f370bcf244` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Network Architecture Paradigms: Client-Server Architecture (Dedicated Servers) vs Peer-to-Peer (P2P) Architecture**
- [x] **Physical Layer Functionalities: Bit Representation, Line Coding (NRZ, Manchester, Differential Manchester), Data Rate Bounds (Nyquist & Shannon Theorems)**
- [x] **Data Link Layer Functionalities: Framing, Bit Stuffing, Byte Stuffing, Error Control (Parity, Checksum, Cyclic Redundancy Check - CRC)**
- [x] **Flow Control Mechanisms: Stop-and-Wait ARQ, Sliding Window Protocols (Go-Back-N ARQ, Selective Repeat ARQ)**
- [x] **Medium Access Control (MAC) Sublayer: Channel Allocation, Pure ALOHA vs Slotted ALOHA (Efficiency Derivation)**
- [x] **Carrier Sense Multiple Access (CSMA): 1-Persistent, Non-Persistent, p-Persistent CSMA Protocols**
- [x] **CSMA/CD (Collision Detection) in Ethernet (IEEE 802.3): Minimum Frame Size Formula, Exponential Backoff Algorithm**
- [x] **CSMA/CA (Collision Avoidance) in Wireless LANs (IEEE 802.11): RTS/CTS Handshake, Interframe Spacing (DIFS, SIFS)**
- [x] **Network Layer Functionalities: Packet Switching vs Circuit Switching vs Message Switching, Routing Strategies (Static vs Dynamic)**
- [x] **Transport Layer Functionalities: End-to-End Delivery, Port Addressing, Multiplexing and Demultiplexing**
- [x] **Transmission Control Protocol (TCP): Connection-Oriented, 3-Way Handshake (SYN, SYN-ACK, ACK), Flow Control (Sliding Window), Congestion Control**
- [x] **User Datagram Protocol (UDP): Connectionless, Lightweight, Header Format (8 Bytes), Real-Time Streaming and Voice Applications**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the primary role of Framing at the Data Link layer?
**Model Answer:**
Framing encapsulates packets from the network layer into discrete units (frames) with distinct start/end delimiters, source/destination MAC addresses, and error detection checksum trailers.

### Q2. [2 Marks] Explain Bit Stuffing in Data Link framing.
**Model Answer:**
To prevent data from mimicking the special frame flag byte `01111110`, the transmitter automatically injects a `0` bit after every five consecutive `1`s. The receiver strips this stuffed zero.

### Q3. [2 Marks] Differentiate between Stop-and-Wait ARQ and Sliding Window ARQ.
**Model Answer:**
- **Stop-and-Wait**: Sender transmits one single frame and stops, waiting for an ACK before sending the next.
- **Sliding Window**: Sender can transmit multiple frames (up to window size $W$) consecutively before waiting for an ACK, filling channel bandwidth efficiently.

### Q4. [2 Marks] What is the maximum sender window size in Go-Back-N ARQ using $m$-bit sequence numbers?
**Model Answer:**
$$W_s = 2^m - 1$$
If $m=3$ bits, maximum window size is $2^3 - 1 = 7$. Receiver window is always **1**.

### Q5. [2 Marks] What is the maximum sender and receiver window size in Selective Repeat ARQ?
**Model Answer:**
$$W_s = W_r = 2^{m - 1}$$
If $m=3$ bits, maximum sender and receiver window size is $2^{3-1} = 4$.

### Q6. [2 Marks] Explain how Cyclic Redundancy Check (CRC) detects errors.
**Model Answer:**
CRC treats binary messages as algebraic polynomials, appends $r$ zero bits, and divides by a predetermined generator polynomial $G(x)$ of degree $r$ using modulo-2 binary division. The remainder is appended as the Frame Check Sequence (FCS).

### Q7. [2 Marks] Explain the difference between TCP and UDP.
**Model Answer:**
- **TCP**: Connection-oriented, reliable byte stream, ordered delivery, flow control, congestion control, 20-byte header.
- **UDP**: Connectionless, unreliable datagram, best-effort delivery, no retransmissions, low latency, 8-byte header.

### Q8. [2 Marks] What are the three steps in the TCP Three-Way Handshake?
**Model Answer:**
1. **Client $\to$ Server**: `SYN` (Synchronize sequence number $X$)
2. **Server $\to$ Client**: `SYN-ACK` (Acknowledge $X+1$, own sequence number $Y$)
3. **Client $\to$ Server**: `ACK` (Acknowledge $Y+1$)


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare Go-Back-N ARQ vs Selective Repeat ARQ in a Structured Table.
**Model Answer:**
| Dimension | Go-Back-N ARQ | Selective Repeat ARQ |
| :--- | :--- | :--- |
| **Sender Window Size** | $2^m - 1$ | $2^{m-1}$ |
| **Receiver Window Size** | **1** (Fixed) | $2^{m-1}$ (Equal to sender window) |
| **Out-of-Order Frames** | **Discarded** immediately | **Buffered** in receiver window |
| **Retransmission Scope** | Retransmits the lost frame AND all subsequent frames in window | Retransmits **ONLY** the specific lost/damaged frame |
| **Acknowledgments** | Cumulative ACK ($ACK_N$ confirms all up to $N-1$) | Individual ACK or Negative ACK (NAK) |
| **Complexity & Memory** | Simple; minimal receiver buffer | Complex; requires reordering buffers and timers per frame |

### Q2. [5 Marks] Explain the CRC Modulo-2 Division Process with a Complete Solved Example.
**Model Answer:**
### CRC Modulo-2 Mathematical Derivation

**Given:** Data message $M = 110101$, Generator Polynomial $G(x) = x^3 + x + 1$ (Binary: `1011`, degree $r=3$).

1. Append $r=3$ zeros to data: $M' = 110101000$.
2. Perform Modulo-2 Binary Division (XOR operations):

```text
        111001   (Quotient)
1011 | 110101000
       1011
       -----
        1100
        1011
        -----
         1111
         1011
         -----
          1000
          1011
          -----
           0110
           0000
           -----
            1100
            1011
            -----
             111  (Remainder = CRC FCS)
```
3. **Transmitted Codeword:** $110101$ + $111$ = $\mathbf{110101111}$.
4. At receiver, dividing $110101111$ by $1011$ yields remainder $000$ (No Error detected!).

### Q3. [5 Marks] Explain CSMA/CD vs CSMA/CA Protocols.
**Model Answer:**
| Feature | CSMA/CD (802.3 Ethernet) | CSMA/CA (802.11 Wi-Fi) |
| :--- | :--- | :--- |
| **Full Form** | Collision Detection | Collision Avoidance |
| **Collision Action** | Detects collision while transmitting, aborts, and sends Jam signal | Transmits RTS/CTS and backs off to prevent collisions |
| **Medium** | Wired copper shared cables | Wireless unguided radio space |
| **Why Used** | Electrical signal collision is easily detectable on wire | Radio transmitters drown out incoming weak collision signals |

### Q4. [5 Marks] Explain TCP Congestion Control Mechanisms (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery).
**Model Answer:**
### TCP Congestion Control Architecture
1. **Slow Start**: Initial $cwnd = 1 \text{ MSS}$. For every ACK received, $cwnd$ increases by 1 MSS, effectively doubling $cwnd$ every RTT (exponential growth).
2. **Congestion Avoidance**: When $cwnd \ge ssthresh$, growth becomes linear: $cwnd = cwnd + 1 \text{ MSS}$ per RTT (Additive Increase).
3. **Triple Duplicate ACKs**: Signals single lost packet. Sets $ssthresh = cwnd / 2$. Executes **Fast Retransmit** (retransmits missing segment immediately without waiting for timer) and enters **Fast Recovery**.
4. **Timeout Event**: Severe congestion. Drops $ssthresh = cwnd / 2$, resets $cwnd = 1 \text{ MSS}$, and restarts Slow Start.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Explain the Complete TCP Header Structure and TCP Connection Life Cycle with State Transitions.
**Comprehensive University Solution:**
### 1. TCP Header Structure (20–60 Bytes)

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data |           |U|A|P|R|S|F|                               |
| Offset| Reserved  |R|C|S|S|Y|I|            Window Size        |
| (4b)  |   (6b)    |G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |        Urgent Pointer         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (0 to 40 Bytes)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```
- **Control Flags**: `URG` (Urgent), `ACK` (Acknowledgment valid), `PSH` (Push buffered data), `RST` (Reset connection), `SYN` (Synchronize sequence numbers), `FIN` (Graceful connection teardown).

### 2. Connection Establishment & Teardown Handshakes
- **Three-Way Handshake**: Client `SYN` $\to$ Server `SYN-ACK` $\to$ Client `ACK` (Establishes connection).
- **Four-Way Termination Handshake**:
  1. Client sends `FIN` (enters `FIN_WAIT_1`).
  2. Server replies `ACK` (enters `CLOSE_WAIT`; Client enters `FIN_WAIT_2`).
  3. Server finishes remaining data and sends `FIN` (enters `LAST_ACK`).
  4. Client replies `ACK` and enters `TIME_WAIT` (waits $2 \times \text{MSL}$ to ensure ACK received).

### Q2. [10/15 Marks] Explain Hamming Error-Correcting Code Construction and Single-Bit Error Correction with a Solved Problem.
**Comprehensive University Solution:**
### Hamming Code Single-Bit Error Correction (7, 4 Code)

**Given:** 4-bit data word $D = 1011$ ($d_7 d_6 d_5 d_3$). We insert 3 parity check bits ($p_1, p_2, p_4$) at bit positions that are powers of 2.

### 1. Bit Arrangement Table:

| Position | 7 | 6 | 5 | 4 | 3 | 2 | 1 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Bit Name** | $d_7$ | $d_6$ | $d_5$ | $p_4$ | $d_3$ | $p_2$ | $p_1$ |
| **Data Bits** | 1 | 0 | 1 | ? | 1 | ? | ? |

### 2. Calculating Even Parity Check Bits:
- $p_1$ covers positions with bit 0 set in binary (1, 3, 5, 7): $p_1 \oplus d_3 \oplus d_5 \oplus d_7 = 0 \implies p_1 \oplus 1 \oplus 1 \oplus 1 = 0 \implies \mathbf{p_1 = 1}$.
- $p_2$ covers positions with bit 1 set in binary (2, 3, 6, 7): $p_2 \oplus d_3 \oplus d_6 \oplus d_7 = 0 \implies p_2 \oplus 1 \oplus 0 \oplus 1 = 0 \implies \mathbf{p_2 = 0}$.
- $p_4$ covers positions with bit 2 set in binary (4, 5, 6, 7): $p_4 \oplus d_5 \oplus d_6 \oplus d_7 = 0 \implies p_4 \oplus 1 \oplus 0 \oplus 1 = 0 \implies \mathbf{p_4 = 0}$.

**Transmitted 7-bit Codeword:** `1010101`.

### 3. Error Detection & Correction:
Suppose transmission noise flips bit 5 ($1 \to 0$), receiving `1000101`.
- $c_1 = b_1 \oplus b_3 \oplus b_5 \oplus b_7 = 1 \oplus 1 \oplus 0 \oplus 1 = \mathbf{1}$
- $c_2 = b_2 \oplus b_3 \oplus b_6 \oplus b_7 = 0 \oplus 1 \oplus 0 \oplus 1 = \mathbf{0}$
- $c_4 = b_4 \oplus b_5 \oplus b_6 \oplus b_7 = 0 \oplus 0 \oplus 0 \oplus 1 = \mathbf{1}$

**Syndrome Word:** $c_4 c_2 c_1 = 101_2 = \mathbf{5}$.
**Conclusion:** Bit position 5 is corrupted! Inverting bit 5 from 0 back to 1 perfectly restores the original data.

### Q3. [10/15 Marks] Explain the Minimum Frame Size Calculation in CSMA/CD Ethernet Networks.
**Comprehensive University Solution:**
### Minimum Frame Size Derivation in CSMA/CD
To ensure that a transmitting station detects a collision before it finishes transmitting the frame, the **Transmission Time ($T_{\text{tx}}$)** must be at least **twice the Propagation Delay ($T_{\text{prop}}$)**:

$$T_{\text{tx}} \ge 2 \times T_{\text{prop}}$$

$$\frac{L_{\text{min}}}{\text{Bandwidth (B)}} \ge 2 \times \left( \frac{\text{Distance (D)}}{\text{Propagation Speed (v)}} \right)$$

$$L_{\text{min}} \ge 2 \times \text{RTT} \times B$$

### Practical Example (Standard 10 Mbps Ethernet):
- Cable distance = 2,500 meters, signal speed = $2 \times 10^8$ m/s, bandwidth = 10 Mbps.
- $T_{\text{prop}} = 2500 / (2 \times 10^8) = 12.5 \; \mu\text{s}$.
- Round Trip Time ($2 \times T_{\text{prop}}$) = $25 \; \mu\text{s}$.
- Accounting for repeater delays, slot time = $51.2 \; \mu\text{s}$.
- $L_{\text{min}} = 51.2 \; \mu\text{s} \times 10 \text{ Mbps} = 512 \text{ bits} = \mathbf{64 \text{ Bytes}}$.
- **Conclusion:** Standard Ethernet frames have a mandatory minimum payload/frame size of **64 bytes** (padded with dummy bytes if data is smaller).


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Practice CRC binary modulo-2 division, Hamming code parity calculations, and the TCP 3-way handshake diagram.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
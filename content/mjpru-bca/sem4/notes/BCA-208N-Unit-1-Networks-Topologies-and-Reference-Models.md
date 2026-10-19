# BCA-208N: Computer Networks
## Unit 1 Master Exam Revision Notes: Computer Networks, Topologies & Reference Models
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `bd736f61-09d0-5821-b1a0-24271a2d0833` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Computer Networks Overview: Definition, Goals, Resource Sharing, High Reliability, Scalability, Communication Medium**
- [x] **Data Communication Fundamentals: Components (Sender, Receiver, Transmission Medium, Message, Protocols)**
- [x] **Data Transmission Modes: Simplex (Unidirectional), Half-Duplex (Both Directions, One at a Time), Full-Duplex (Simultaneous)**
- [x] **Network Topologies: Bus, Star, Ring, Mesh, Tree, and Hybrid Topologies (Advantages, Disadvantages, Fault Tolerance)**
- [x] **Network Classifications by Geographic Scope: Local Area Network (LAN), Metropolitan Area Network (MAN), Wide Area Network (WAN), PAN**
- [x] **Transmission Media: Guided Media (Twisted Pair Cable - UTP/STP, Coaxial Cable - Thinnet/Thicknet, Fiber Optic Cable - Single/Multi-mode)**
- [x] **Unguided (Wireless) Media: Radio Waves, Microwaves (Line-of-Sight), Infrared Transmission, Satellite Communication**
- [x] **Network Hardware Interconnection Devices: Repeaters, Hubs (Active vs Passive), Bridges, LAN Switches (Layer 2 Switching)**
- [x] **Internetworking Devices: Routers (Routing Tables, Packet Forwarding), Gateways (Protocol Translation)**
- [x] **Protocols and Layering Concepts: Protocol Hierarchy, Services vs Protocols, Interfaces, Encapsulation and Decapsulation (PDU)**
- [x] **OSI Reference Model: Seven Layers Overview (Physical, Data Link, Network, Transport, Session, Presentation, Application)**
- [x] **TCP/IP Reference Model: Four Layers Overview (Network Access, Internet, Transport, Application) and Comparison with OSI Model**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What are the five core components of a data communication system?
**Model Answer:**
1. **Message**: The data or information to be communicated.
2. **Sender**: The device that creates and transmits the message.
3. **Receiver**: The destination device that receives the message.
4. **Transmission Medium**: The physical communication pathway carrying the signal.
5. **Protocol**: The set of governing rules that coordinate data transmission.

### Q2. [2 Marks] How many physical duplex links are needed for a mesh topology with $N$ computers?
**Model Answer:**
A fully connected mesh topology requires:
$$\text{Total Duplex Links} = \frac{N(N - 1)}{2}$$
For $N=10$ nodes, $10 \times 9 / 2 = 45$ cables are required.

### Q3. [2 Marks] Differentiate between Star Topology and Bus Topology.
**Model Answer:**
- **Star Topology**: All nodes connect to a central hub/switch via point-to-point cables. Failure of one cable isolates only that single node; failure of central hub breaks whole network.
- **Bus Topology**: All nodes share a single common backbone cable terminated at both ends. Simple and cheap, but cable break stops entire network.

### Q4. [2 Marks] What is the difference between Guided and Unguided transmission media?
**Model Answer:**
- **Guided (Bounded)**: Signals travel through physical solid conductors (e.g., Twisted Pair UTP/STP, Coaxial cable, Fiber Optic).
- **Unguided (Wireless)**: Electromagnetic waves propagate through free space/air without physical guides (e.g., Radio waves, Microwaves, Infrared).

### Q5. [2 Marks] Why is Optical Fiber immune to Electromagnetic Interference (EMI)?
**Model Answer:**
Optical fibers transmit data as light pulses through a glass core via Total Internal Reflection, rather than electrical currents through copper, making them completely immune to electromagnetic noise and radio frequency interference.

### Q6. [2 Marks] Name the seven layers of the OSI Reference Model from bottom to top.
**Model Answer:**
1. **Physical Layer**
2. **Data Link Layer**
3. **Network Layer**
4. **Transport Layer**
5. **Session Layer**
6. **Presentation Layer**
7. **Application Layer**

### Q7. [2 Marks] Differentiate between a Hub and a Switch.
**Model Answer:**
- **Hub (Layer 1)**: Multiport repeater that blindly broadcasts incoming signals out to all ports, creating a single shared collision domain.
- **Switch (Layer 2)**: Intelligent bridge that inspects destination MAC addresses and forwards frames only to the target port, dedicating a collision domain per port.

### Q8. [2 Marks] What does a Router do at the Network Layer?
**Model Answer:**
A Router inspects destination logical IP addresses in incoming packets and consults its routing table to forward packets across different subnets, breaking broadcast domains.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare the OSI 7-Layer Reference Model with the TCP/IP Protocol Suite.
**Model Answer:**
### OSI Model vs TCP/IP Model

```
OSI Model (7 Layers)                    TCP/IP Model (4/5 Layers)
+-----------------------+               +-----------------------+
| 7. Application Layer  |               |                       |
+-----------------------+               |                       |
| 6. Presentation Layer | ------------> | Application Layer     |
|    (Encryption, Format|               | (HTTP, FTP, DNS, SMTP)|
+-----------------------+               |                       |
| 5. Session Layer      |               |                       |
+-----------------------+               +-----------------------+
| 4. Transport Layer    | ------------> | Transport Layer       |
|    (TCP, UDP)         |               | (TCP, UDP)            |
+-----------------------+               +-----------------------+
| 3. Network Layer      | ------------> | Internet Layer        |
|    (IP, ICMP, Routing)|               | (IP, ICMP, ARP, BGP)  |
+-----------------------+               +-----------------------+
| 2. Data Link Layer    | ------------> | Network Access /      |
+-----------------------+               | Host-to-Network Layer |
| 1. Physical Layer     | ------------> | (Ethernet, Wi-Fi, PHY)|
+-----------------------+               +-----------------------+
```
- OSI is an open conceptual academic framework; TCP/IP is the practical architectural standard powering the global Internet.

### Q2. [5 Marks] Explain Network Topologies with Comparative Architectural Trade-Offs.
**Model Answer:**
| Topology | Cable Complexity | Fault Tolerance | Installation Cost | Typical Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Mesh** | Extremely High ($N(N-1)/2$) | **Maximum** (Dedicated redundant paths) | Very Expensive | WAN backbones, nuclear control |
| **Star** | Moderate ($N$ links) | High (Central device is single point of failure) | Economical | Modern office & home Ethernet |
| **Bus** | Minimum (Single backbone) | Low (Backbone break halts all communication) | Very Cheap | Legacy 10BASE2 networks |
| **Ring** | Low ($N$ links in ring) | Low (Single break halts ring without dual ring) | Moderate | FDDI, Token Ring |
| **Tree** | Hierarchical | Medium (Root switch failure isolates branches) | Scalable | Enterprise campus LANs |

### Q3. [5 Marks] Explain Transmission Media: UTP vs STP vs Coaxial vs Fiber Optic.
**Model Answer:**
| Media Type | Bandwidth | Max Segment Length | Noise Immunity | Relative Cost |
| :--- | :--- | :--- | :--- | :--- |
| **UTP (Cat 6)** | Up to 1 Gbps / 10 Gbps | 100 meters | Moderate (Twisted cancellation) | Very Low (Standard) |
| **STP** | Up to 10 Gbps | 100 meters | High (Metal foil shielding) | Moderate |
| **Coaxial** | 10–100 Mbps | 185m (Thin) / 500m (Thick) | High | Low (Cable TV) |
| **Fiber Optic** | 100 Gbps+ | 2 km (Multimode) / 40+ km (Single mode) | **Immune (Light pulses)** | High (Transceivers) |

### Q4. [5 Marks] Explain the Functions of Interconnecting Devices (Repeaters, Hubs, Bridges, Switches, Routers, Gateways).
**Model Answer:**
### Device Operating Layer Summary
1. **Repeater / Hub (Layer 1 - Physical)**: Amplifies/regenerates electrical signal; extends physical distance; single collision and broadcast domain.
2. **Bridge / Switch (Layer 2 - Data Link)**: Filters and forwards frames using MAC address table; separates collision domains; single broadcast domain.
3. **Router (Layer 3 - Network)**: Routes packets between separate IP subnets; separates collision domains AND broadcast domains.
4. **Gateway (Layers 4–7 - Upper Layers)**: Protocol converter translating between completely disparate network architectures (e.g., SNA to TCP/IP).


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Explain the Complete Step-by-Step Functionality of Each Layer in the OSI Reference Model.
**Comprehensive University Solution:**
### Detailed Architectural Breakdown of the 7 OSI Layers

### 1. Physical Layer (Layer 1)
- **PDU:** Raw Bits.
- **Functions:** Signal encoding, line coding (NRZ, Manchester), transmission rate (bps), bit synchronization, physical topologies, physical media pinouts (RJ-45).

### 2. Data Link Layer (Layer 2)
- **PDU:** Frame.
- **Sublayers:** Logical Link Control (LLC) and Media Access Control (MAC).
- **Functions:** Framing (bit/byte stuffing), Physical addressing (48-bit MAC addresses), Flow control (sliding window), Error detection (CRC-32), Channel access arbitration (CSMA/CD).

### 3. Network Layer (Layer 3)
- **PDU:** Packet / Datagram.
- **Functions:** Logical addressing (32-bit IPv4, 128-bit IPv6), Routing (shortest path discovery via OSPF/RIP), Packet fragmentation and reassembly, Congestion control.

### 4. Transport Layer (Layer 4)
- **PDU:** Segment (TCP) / Datagram (UDP).
- **Functions:** True end-to-end process-to-process delivery using Port Numbers (0–65535), Connection management (TCP 3-way handshake), Flow control (advertised window), Error recovery (retransmission).

### 5. Session Layer (Layer 5)
- **PDU:** Data / Session Message.
- **Functions:** Dialog control (simplex, half-duplex, full-duplex), Session establishment and termination, Synchronization checkpoints for recovery during large file transfers.

### 6. Presentation Layer (Layer 6)
- **PDU:** Formatted Data.
- **Functions:** Syntax and semantics translation (EBCDIC to ASCII), Data compression (lossy/lossless), Cryptographic encryption and decryption.

### 7. Application Layer (Layer 7)
- **PDU:** Application Message.
- **Functions:** User interface window into network services: Web (HTTP/HTTPS), File transfer (FTP), Email (SMTP, POP3, IMAP), Domain resolution (DNS).

### Q2. [10/15 Marks] Explain Socket Programming API Architecture and Write a Simple Client-Server Program in C/Python.
**Comprehensive University Solution:**
```python
"""
MJPRU Examination Model Solution: Unit 1
TCP Client-Server Socket Communication Architecture
"""

# --- SERVER PROGRAM (server.py) ---
import socket

def run_server():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('127.0.0.1', 8080)) # Bind to IP and Port
    server_socket.listen(5)                  # Passive listening mode (backlog=5)
    print("[Server] Listening on 127.0.0.1:8080...")
    
    while True:
        client_conn, client_addr = server_socket.accept() # Blocks until client connects
        print(f"[Server] Connection accepted from: {client_addr}")
        
        msg = client_conn.recv(1024).decode('utf-8')
        print(f"[Server] Received from client: {msg}")
        
        response = f"ACK: Server processed message '{msg.upper()}'"
        client_conn.send(response.encode('utf-8'))
        client_conn.close()
        break

# --- CLIENT PROGRAM (client.py) ---
def run_client():
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(('127.0.0.1', 8080)) # Connect to server
    
    payload = "Hello MJPRU Computer Networks!"
    print(f"[Client] Sending: {payload}")
    client_socket.send(payload.encode('utf-8'))
    
    reply = client_socket.recv(1024).decode('utf-8')
    print(f"[Client] Server Reply: {reply}")
    client_socket.close()

# Socket API System Call Sequence:
# Server: socket() -> bind() -> listen() -> accept() -> recv() -> send() -> close()
# Client: socket() -> connect() -> send() -> recv() -> close()
```

### Q3. [10/15 Marks] Explain Packet Switching vs Circuit Switching with Architectural Diagrams and Mathematical Delay Comparisons.
**Comprehensive University Solution:**
### Circuit Switching vs Packet Switching

```
Circuit Switching (e.g., Traditional Telephone):
+--------+   Dedicated Physical Circuit Reserved (Setup Phase)   +--------+
| Host A | ===================================================== | Host B |
+--------+      Constant bit rate, zero jitter, wasted bandwidth |--------+

Packet Switching (e.g., Modern Internet IP):
+--------+    Packet 1 [R1] -> [R2] \                            +--------+
| Host A |                             [R4] Reassembled -------->| Host B |
+--------+    Packet 2 [R1] -> [R3] / (Store & Forward)
```

### Mathematical Delay Formulations:
- **Circuit Switching Delay**:
  $$\text{Delay} = T_{\text{setup}} + \frac{L}{B} + \text{Propagation Delay}$$
- **Packet Switching Delay ($M$ hops, $N$ packets)**:
  $$\text{Delay} = (N + M - 1) \times \left( \frac{L}{B} \right) + M \times T_{\text{prop}}$$

### Key Differences:
1. **Resource Reservation**: Circuit switching reserves dedicated end-to-end bandwidth; packet switching uses dynamic statistical multiplexing (on-demand).
2. **Efficiency**: Packet switching utilizes transmission links at near 100% capacity; circuit switching leaves idle lines completely wasted during silence.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Draw the full OSI vs TCP/IP layer comparison diagram and describe every layer's PDU and hardware devices.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
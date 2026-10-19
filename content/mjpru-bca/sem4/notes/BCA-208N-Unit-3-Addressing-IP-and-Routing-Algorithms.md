# BCA-208N: Computer Networks
## Unit 3 Master Exam Revision Notes: Addressing, Internet Protocol & Routing Algorithms
**Target Examination:** MJPRU Bareilly BCA Semester 4 (CBCS Pattern 2024–25)
**Unit Identifier:** `2835f2ed-948e-5377-bb43-f572e7e47ede` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Logical Addressing in TCP/IP: IPv4 32-Bit Address Space, Dotted-Decimal Notation, Binary Representation**
- [x] **Classful Addressing: Class A, Class B, Class C, Class D (Multicast), Class E (Experimental), Default Subnet Masks**
- [x] **Subnetting & Supernetting: Subnet Masking, Calculating Network ID, Broadcast ID, Number of Usable Host IP Addresses**
- [x] **Classless Inter-Domain Routing (CIDR): Slash (/) Notation, Prefix Length, Hierarchical Route Aggregation**
- [x] **IPv4 Datagram Header Format: Version, IHL, Type of Service (ToS), Total Length, Identification, Flags (DF, MF), Fragment Offset, TTL, Protocol, Header Checksum**
- [x] **IP Packet Fragmentation and Reassembly: MTU Constraints, Fragmentation Calculations**
- [x] **IPv6 Addressing Architecture: 128-Bit Address Space, Colon-Hexadecimal Notation, Zero Compression Rules (::)**
- [x] **IPv6 Header Format: Fixed 40-Byte Header, Extension Headers, Advantages over IPv4 (Massive Space, Built-in IPSec, Simplified Header)**
- [x] **IPv4 to IPv6 Transition Mechanisms: Dual Stack, Tunneling (6to4), Network Address Translation - Protocol Translation (NAT-PT)**
- [x] **Address Resolution Protocol (ARP): Mapping IP Address to Physical MAC Address, ARP Request (Broadcast) & ARP Reply (Unicast), ARP Cache**
- [x] **Reverse Address Resolution Protocol (RARP), BOOTP, and Dynamic Host Configuration Protocol (DHCP) DORA Process (Discover, Offer, Request, Acknowledge)**
- [x] **Internet Control Message Protocol (ICMP): Error Reporting (Destination Unreachable, Time Exceeded), Query Messages (Echo Request/Reply for ping)**
- [x] **Internet Group Management Protocol (IGMP): Multicast Group Joining and Membership Maintenance, Multicast Routing Overview**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] How many total addresses exist in IPv4 versus IPv6?
**Model Answer:**
- **IPv4**: $2^{32} \approx 4.29 \times 10^9$ (4.29 billion addresses).
- **IPv6**: $2^{128} \approx 3.4 \times 10^{38}$ (340 undecillion addresses).

### Q2. [2 Marks] Explain IPv4 Classful addressing ranges for Classes A, B, and C.
**Model Answer:**
- **Class A**: `1.0.0.0` to `126.255.255.255` (Default mask: `255.0.0.0` or `/8`).
- **Class B**: `128.0.0.0` to `191.255.255.255` (Default mask: `255.255.0.0` or `/16`).
- **Class C**: `192.0.0.0` to `223.255.255.255` (Default mask: `255.255.255.0` or `/24`).

### Q3. [2 Marks] What is the purpose of CIDR (Classless Inter-Domain Routing)?
**Model Answer:**
CIDR eliminates rigid class boundaries, replacing them with arbitrary prefix lengths (`/n`). It halted IPv4 address exhaustion through efficient variable-length subnetting and supernetting.

### Q4. [2 Marks] What does the TTL (Time to Live) field in an IPv4 header do?
**Model Answer:**
TTL limits packet lifespan. Every router decrements TTL by 1. When TTL drops to 0, the packet is discarded and an ICMP Time Exceeded message is sent back, preventing infinite loops.

### Q5. [2 Marks] What are the DORA messages exchanged in DHCP?
**Model Answer:**
1. **Discover** (Client broadcast)
2. **Offer** (Server unicast/broadcast)
3. **Request** (Client requests offered IP)
4. **Acknowledge** (Server commits lease)

### Q6. [2 Marks] What does ARP (Address Resolution Protocol) do?
**Model Answer:**
ARP resolves a known logical IP address into a physical hardware (MAC) address on a local area network link via local broadcast.

### Q7. [2 Marks] Explain the Count-to-Infinity problem in Distance Vector routing.
**Model Answer:**
When a network link fails, distance vector routers slowly propagate incrementing hop counts in a loop until the metric reaches infinity (16 in RIP), stalling network convergence.

### Q8. [2 Marks] What is the Split Horizon rule in Distance Vector routing?
**Model Answer:**
A router is prohibited from advertising a routing update back out of the same interface from which it originally learned that route.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare IPv4 and IPv6 Protocols in a Detailed Comparative Table.
**Model Answer:**
| Dimension | IPv4 | IPv6 |
| :--- | :--- | :--- |
| **Address Length** | 32 bits (4 bytes) | 128 bits (16 bytes) |
| **Notation** | Dotted-decimal (`192.168.1.1`) | Hexadecimal colon (`2001:0db8::1`) |
| **Total Address Space** | $\approx 4.3 \times 10^9$ | $\approx 3.4 \times 10^{38}$ |
| **Header Size** | Variable (20 to 60 bytes) | Fixed **40 bytes** base header |
| **Broadcast** | Supported natively | **Eliminated**; replaced by Multicast/Anycast |
| **Configuration** | Manual or DHCP | Stateless Address Autoconfiguration (SLAAC) or DHCPv6 |
| **IPSec Support** | Optional add-on | **Mandatory** built-in architectural support |
| **Checksum** | Header checksum verified at every hop | Checksum removed from IP layer (handled by L2 & L4) |

### Q2. [5 Marks] Explain Subnetting and Calculate Subnet Mask, Network ID, and Usable Hosts for `192.168.10.0/27`.
**Model Answer:**
### Step-by-Step Subnetting Calculation
- Given: Network `192.168.10.0/27`
1. **Subnet Mask**: Prefix `/27` means 27 ones followed by 5 zeros:
   `11111111.11111111.11111111.11100000` = $\mathbf{255.255.255.224}$
2. **Host Bits ($h$)**: $32 - 27 = 5$ bits.
3. **Total IP Addresses per Subnet**: $2^5 = \mathbf{32}$.
4. **Usable Host Addresses**: $2^5 - 2 = \mathbf{30}$ hosts.
5. **Block Size (Magic Number)**: $256 - 224 = 32$.
6. **First Subnet Range**:
   - **Network Address**: `192.168.10.0`
   - **First Usable Host**: `192.168.10.1`
   - **Last Usable Host**: `192.168.10.30`
   - **Directed Broadcast Address**: `192.168.10.31`

### Q3. [5 Marks] Explain IPv4 to IPv6 Transition Strategies (Dual Stack, Tunneling, NAT-PT).
**Model Answer:**
1. **Dual Stack**: Nodes run both IPv4 and IPv6 protocol stacks simultaneously on the same operating system interface, routing IPv4 over IPv4 and IPv6 over IPv6.
2. **Tunneling (e.g., 6to4, Teredo)**: Encapsulates native IPv6 packets inside standard IPv4 headers so they can traverse legacy IPv4 routing backbones.
3. **Header Translation (NAT-PT)**: A gateway translates IPv6 packet headers directly into IPv4 packet headers and vice versa, allowing direct communication between incompatible nodes.

### Q4. [5 Marks] Compare Distance Vector Routing (RIP) vs Link State Routing (OSPF).
**Model Answer:**
| Dimension | Distance Vector (RIP) | Link State (OSPF) |
| :--- | :--- | :--- |
| **Algorithm** | Bellman-Ford algorithm | Dijkstra's Shortest Path First (SPF) |
| **Routing View** | Routing by rumor (knows only neighbors) | Full topological map of entire network area |
| **Metric** | Hop count (Max 15 hops; 16 = $\infty$) | Cost inversely proportional to bandwidth |
| **Updates** | Full table broadcast every 30 seconds | Triggered Link-State Advertisements (LSAs) on changes |
| **Convergence** | Slow; prone to routing loops | Fast; loop-free convergence |


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Explain the Complete IPv4 Datagram Header Format and All Field Functions.
**Comprehensive University Solution:**
### IPv4 Datagram Header Structure (20–60 Bytes)

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|      Fragment Offset    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |        Header Checksum        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source IP Address                       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination IP Address                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (0 to 40 Bytes)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```
- **Version (4b)**: Always `4` (or `6` for IPv6).
- **IHL (4b)**: Internet Header Length in 32-bit words (minimum = 5, meaning $5 \times 4 = 20$ bytes).
- **Total Length (16b)**: Total datagram size including header and payload (max 65,535 bytes).
- **Identification (16b), Flags (3b - DF, MF), Fragment Offset (13b)**: Coordinate IP packet fragmentation across smaller MTU links.
- **TTL (8b)**: Decremented at each hop to eliminate packet loops.
- **Protocol (8b)**: Multiplexing identifier: `1` = ICMP, `6` = TCP, `17` = UDP.
- **Header Checksum (16b)**: Recomputed at every router hop to detect transmission noise.

### Q2. [10/15 Marks] Solve Dijkstra's Shortest Path Algorithm for an OSPF Routing Topology Step-by-Step.
**Comprehensive University Solution:**
### Dijkstra's Shortest Path Algorithm Solution

**Given Network Graph:** Nodes A, B, C, D, E. Source Node = **A**.
- Edge Weights: A-B: 4, A-C: 2, B-C: 1, B-D: 5, C-D: 8, C-E: 10, D-E: 2.

### Step-by-Step Iteration Table:

| Step | Visited Set ($S$) | Shortest Distance to A | Dist to B | Dist to C | Dist to D | Dist to E |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **0** | {A} | **0** | 4 (via A) | 2 (via A) | $\infty$ | $\infty$ |
| **1** | {A, C} (Min is C=2) | 0 | **3 (via C)** | **2 (via A)** | 10 (via C) | 12 (via C) |
| **2** | {A, C, B} (Min is B=3) | 0 | **3 (via C)** | 2 | **8 (via B)** | 12 (via C) |
| **3** | {A, C, B, D} (Min is D=8) | 0 | 3 | 2 | **8 (via B)** | **10 (via D)** |
| **4** | {A, C, B, D, E} (Min is E=10)| 0 | 3 | 2 | 8 | **10 (via D)** |

### Final Shortest Paths from Source A:
- **Path to B**: $A \to C \to B$ (Cost = 3)
- **Path to C**: $A \to C$ (Cost = 2)
- **Path to D**: $A \to C \to B \to D$ (Cost = 8)
- **Path to E**: $A \to C \to B \to D \to E$ (Cost = 10)

### Q3. [10/15 Marks] Explain NAT (Network Address Translation) and PAT (Port Address Translation) Architecture with Visual Flow.
**Comprehensive University Solution:**
### Network Address Translation Architecture

```text
Private LAN (RFC 1918)                     Public Internet
192.168.1.10:5000 ---\     NAT Router        /---> 142.250.190.46:80 (Google)
                      [NAT Table] Public IP:203.0.113.1
192.168.1.20:6000 ---/                      \---> 157.240.22.35:443 (FB)
```

### NAT / PAT Translation Table:

| Private Socket (Internal) | Public Mapped Socket (External) | Remote Destination Socket |
| :--- | :--- | :--- |
| `192.168.1.10:5000` | `203.0.113.1:40001` | `142.250.190.46:80` |
| `192.168.1.20:6000` | `203.0.113.1:40002` | `157.240.22.35:443` |

### Key Benefits:
1. **IPv4 Address Conservation**: Hundreds of private hosts share a single public routable IP.
2. **Security & Obfuscation**: Internal workstation IP addresses are hidden from external Internet scanners.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Be ready to perform subnetting calculations, draw the IPv4 header, and solve Dijkstra's algorithm step-by-step.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
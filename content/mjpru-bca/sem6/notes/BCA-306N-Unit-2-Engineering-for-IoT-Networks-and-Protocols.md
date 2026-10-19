# Unit 2: IoT Communication Protocols, Wireless Networking and Constrained Application Architecture

## 1. Executive Summary & Syllabus Blueprint
IoT systems operate under severe resource constraints: battery limitations, low clock speeds, small memory buffers, and lossy wireless links (LLNs). Traditional Internet protocols (IPv4, TCP, HTTP) are too verbose and computationally expensive. This unit covers the optimized IoT communication stack: the IEEE 802.15.4 physical and MAC foundation, 6LoWPAN header compression, Low-Power Wide Area Networks (LoRaWAN, Sigfox), short-range wireless meshes (Zigbee, BLE), and application-layer protocols designed specifically for constrained devices (MQTT, CoAP).

---

## 2. Comprehensive Core Theoretical Architecture & In-Depth Concept Decomposition

### 2.1 The IoT Protocol Stack vs Traditional OSI / TCP-IP
```
  OSI Layer           Traditional Internet             IoT Protocol Stack
+---------------+   +-----------------------+       +-----------------------+
|  Application  |   | HTTP, FTP, SMTP       |  -->  | MQTT, CoAP, DDS       |
+---------------+   +-----------------------+       +-----------------------+
|  Transport    |   | TCP (Heavy Handshake) |  -->  | UDP (Lightweight), TCP|
+---------------+   +-----------------------+       +-----------------------+
|  Network      |   | IPv4 / Standard IPv6  |  -->  | 6LoWPAN / RPL / IPv6  |
+---------------+   +-----------------------+       +-----------------------+
|  Data Link    |   | 802.3 Ethernet, 802.11|  -->  | 802.15.4 MAC, BLE MAC |
+---------------+   +-----------------------+       +-----------------------+
|  Physical     |   | Copper, Fiber, 802.11 |  -->  | 802.15.4 RF, LoRa, BLE|
+---------------+   +-----------------------+       +-----------------------+
```

### 2.2 IEEE 802.15.4 Standard (Physical and MAC Layers)
- **Scope:** Specifies Physical (PHY) and Media Access Control (MAC) layers for Low-Rate Wireless Personal Area Networks (LR-WPANs).
- **Frequency Bands & Data Rates:**
  - $2.4\,	ext{GHz}$ ISM Band: 16 channels, 250 kbps data rate, O-QPSK modulation (worldwide).
  - $868\,	ext{MHz}$ Band: 1 channel, 20 kbps data rate, BPSK modulation (Europe).
  - $915\,	ext{MHz}$ Band: 10 channels, 40 kbps data rate, BPSK modulation (North America).
- **Device Classes:**
  - **Full-Function Device (FFD):** Can act as a PAN Coordinator, coordinator, or simple end-device. Implements complete MAC services and maintains routing tables.
  - **Reduced-Function Device (RFD):** Extremely simple node; communicates only with an FFD; never routes traffic; can sleep 99% of the time.
- **Topologies:** Star topology (all devices talk to PAN Coordinator) and Peer-to-Peer / Mesh topology.
- **Frame Structure:** Maximum Transmission Unit (MTU) of physical layer is strictly **127 bytes** (yielding a maximum MAC payload of 102–118 bytes).

### 2.3 6LoWPAN (IPv6 over Low-Power Wireless Personal Area Networks)
- **Problem Statement:** Standard IPv6 requires a minimum MTU of **1280 bytes** (RFC 2460). IEEE 802.15.4 frames only carry a maximum payload of **127 bytes**.
- **Solution (RFC 4944 & RFC 6282):** An intermediate **Adaptation Layer** situated between the 802.15.4 MAC layer and the IPv6 Network layer.
```
+--------------------------------------------------------+
|                IPv6 Network Layer                      |
+--------------------------------------------------------+
|   6LoWPAN ADAPTATION LAYER                             |
|   - Stateless & Stateful Header Compression (IPHC)    |
|   - Packet Fragmentation and Reassembly                |
|   - Mesh Routing (Mesh Under vs Route Over)           |
+--------------------------------------------------------+
|                IEEE 802.15.4 MAC Layer                 |
+--------------------------------------------------------+
```
- **Key Functions of 6LoWPAN:**
  1. **Header Compression:** Standard IPv6 (40 bytes) + UDP (8 bytes) = 48 bytes of header. 6LoWPAN compresses this down to **6 bytes** (or even 3 bytes when link-layer addresses are derived from MAC IEEE 64-bit addresses).
  2. **Fragmentation & Reassembly:** If an IPv6 datagram exceeds the 127-byte frame, 6LoWPAN divides it into fragments. A 4-byte First Fragment (FRAG1) header or 5-byte Subsequent Fragment (FRAGN) header tracks datagram size and offset.
  3. **Mesh Under vs Route Over:** 
     - *Mesh-Under:* 6LoWPAN layer routes packets using link-layer addresses before presenting a reassembled packet to the IP layer.
     - *Route-Over:* Routing occurs at the IP network layer (using RPL protocol); each intermediate hop reassembles and re-fragments the packet.

### 2.4 Low-Power Wide Area Networks (LPWAN): LoRa and LoRaWAN
- **LoRa (Physical Layer):**
  - Proprietary Chirp Spread Spectrum (CSS) modulation technology owned by Semtech.
  - Transmits data on continuously varying chirp frequencies, achieving outstanding resistance to multipath fading and Doppler shifts.
  - Operates on Sub-GHz license-free ISM bands: $868\,	ext{MHz}$ (Europe), $915\,	ext{MHz}$ (USA), $433\,	ext{MHz}$ / $865	ext{--}867\,	ext{MHz}$ (India).
  - **Spreading Factor (SF):** Ratio between chip rate and symbol rate (SF7 to SF12). Higher SF increases transmission range and receiver sensitivity (up to $-148\,	ext{dBm}$) at the expense of lower data rates ($0.3	ext{--}50\,	ext{kbps}$) and higher airtime.
- **LoRaWAN (MAC & Network Architecture):**
  - Open MAC protocol standardized by the LoRa Alliance.
  - Star-of-Stars topology: End Nodes $ightarrow$ Gateways (Packet Forwarders) $ightarrow$ Network Server $ightarrow$ Application Server.
  - **Device Classes:**
    - *Class A (All Devices):* Bi-directional communication. Downlink transmission possible only immediately following an uplink transmission (2 short receive windows, RX1 and RX2). Lowest power consumption.
    - *Class B (Beacon):* Opens scheduled downlink receive windows synchronized by periodic gateway beacons. Moderate power.
    - *Class C (Continuous):* Receiver is continuously listening except when transmitting. Lowest downlink latency, but requires continuous mains power.

### 2.5 Constrained Application Protocols: MQTT vs CoAP
```
+------------------------------------------------------------------------+
| CRITERIA           | MQTT (ISO/IEC 20922)       | CoAP (RFC 7252)      |
+------------------------------------------------------------------------+
| Architecture       | Publish / Subscribe        | Request / Response   |
| Central Entity     | Centralized Broker         | Direct Client-Server |
| Transport Layer    | TCP (Port 1883 / 8883 TLS) | UDP (Port 5683 / 5684|
| Header Overhead    | 2-byte fixed header        | 4-byte fixed header  |
| Payload Format     | Binary agnostic (JSON, raw)| Binary agnostic/CBOR |
| QoS Levels         | QoS 0, QoS 1, QoS 2        | Confirmable (CON) /  |
|                    |                            | Non-Confirmable(NON) |
| Communication Mode | Asynchronous Many-to-Many  | Synchronous / Async  |
| Caching Support    | Retained messages only     | Full HTTP-like cache |
| REST Integration   | Requires custom translation| Native URI mapping   |
+------------------------------------------------------------------------+
```

---

## 3. Section A: Short Answer Question Bank (10 Questions x 2 Marks)

### Q1. What is the maximum physical frame size in IEEE 802.15.4?
**Ans.** The maximum physical frame size (Physical Layer Service Data Unit - PSDU) in IEEE 802.15.4 is strictly **127 bytes**. After subtracting the MAC header and security overhead, the maximum available payload for upper layers is between 102 and 118 bytes.

### Q2. Why is traditional IPv6 unable to run directly over IEEE 802.15.4 without 6LoWPAN?
**Ans.** Standard IPv6 specification (RFC 2460) mandates a minimum link Maximum Transmission Unit (MTU) of **1280 bytes**, whereas IEEE 802.15.4 frames can carry at most **127 bytes**. 6LoWPAN bridges this incompatibility via an adaptation layer providing header compression and packet fragmentation/reassembly.

### Q3. Explain the three Quality of Service (QoS) levels in MQTT.
**Ans.**
1. **QoS 0 (At most once):** Best-effort delivery; message sent without acknowledgment (fire and forget).
2. **QoS 1 (At least once):** Guarantees delivery via PUBACK; message may be duplicated if ack is delayed.
3. **QoS 2 (Exactly once):** Four-step handshake (PUBLISH $ightarrow$ PUBREC $ightarrow$ PUBREL $ightarrow$ PUBCOMP) ensuring no duplicates.

### Q4. Differentiate between Confirmable (CON) and Non-Confirmable (NON) messages in CoAP.
**Ans.** A **Confirmable (CON)** message requires an explicit Acknowledgment (ACK) from the receiver; if no ACK is received within a timeout, the message is retransmitted using exponential backoff. A **Non-Confirmable (NON)** message is sent without requiring an acknowledgment (used for frequent, non-critical sensor broadcasts).

### Q5. What is a Spreading Factor (SF) in LoRa modulation?
**Ans.** The Spreading Factor (ranging from SF7 to SF12) represents the number of chirps used to encode each symbol ($2^{	ext{SF}}$ chips per symbol). A higher SF increases receiver sensitivity and transmission distance, but decreases the bit rate and increases channel airtime and battery usage.

### Q6. Define Zigbee Coordinator (ZC), Zigbee Router (ZR), and Zigbee End Device (ZED).
**Ans.**
- **ZC (Coordinator):** Exactly one per network; initiates network formation, stores security keys, and manages routing.
- **ZR (Router):** Mains-powered node that forwards data packets across the mesh.
- **ZED (End Device):** Battery-powered sensor node; communicates only with its parent router/coordinator and sleeps to conserve energy.

### Q7. Explain the role of the 6LoWPAN Header Compression (IPHC).
**Ans.** 6LoWPAN IPHC (RFC 6282) compresses the standard 40-byte IPv6 header down to as few as 2 bytes by eliding redundant fields, omitting version/traffic class, and inferring IPv6 source and destination addresses directly from the underlying IEEE 802.15.4 64-bit MAC addresses.

### Q8. What is the function of the MQTT Keep-Alive and PINGREQ mechanism?
**Ans.** The Keep-Alive timer (defined during connection) is the maximum time interval allowed between client transmissions. If no application messages are published, the client sends a 2-byte `PINGREQ` frame to the broker, which replies with `PINGRESP`. If the broker receives nothing within $1.5 	imes 	ext{Keep-Alive}$, it closes the TCP socket and triggers the client's Last Will and Testament (LWT).

### Q9. Describe the difference between LoRa and LoRaWAN.
**Ans.** **LoRa** is the proprietary physical-layer radio frequency modulation (Chirp Spread Spectrum) developed by Semtech. **LoRaWAN** is the open, upper-layer Media Access Control (MAC) and network protocol standard developed by the LoRa Alliance that governs device addressing, encryption, frequency hopping, and cloud architecture.

### Q10. What is BLE Advertising and Connection Interval?
**Ans.** In Bluetooth Low Energy, a peripheral broadcasts short discovery packets across 3 dedicated advertising channels (Channels 37, 38, and 39) at set **Advertising Intervals**. Once connected, data is transferred at set **Connection Intervals** (7.5 ms to 4.0 s); between these events, both radios enter deep sleep.

---

## 4. Section B: Analytical, Derivational & Procedural Question Bank (5 Questions x 5 Marks)

### Q11. Analyze the header compression mechanism of 6LoWPAN from standard IPv6/UDP down to constrained frame formats.
**Ans.**
- **Baseline Overhead:**
  - Standard IPv6 Base Header = 40 bytes.
  - Standard User Datagram Protocol (UDP) Header = 8 bytes.
  - Total Uncompressed Network + Transport Header = 48 bytes.
  - When placed inside an 802.15.4 frame (127 bytes total - 25 bytes MAC overhead = 102 bytes payload), uncompressed headers consume nearly **50% of the payload capacity**.
- **6LoWPAN IPHC Header Compression Breakdown (RFC 6282):**
```
+-----------------------------------------------------------------------+
| Field in Standard IPv6  | Compression Technique in 6LoWPAN IPHC       |
+-----------------------------------------------------------------------+
| Version (4 bits)        | Completely elided (Always IPv6, binary 0110)|
| Traffic Class & Flow Lbl| Elided if zero (common in sensor traffic)   |
| Payload Length (16 bits)| Elided (Computed directly from MAC frame)   |
| Next Header (8 bits)    | Replaced with 1-bit dispatch flag           |
| Hop Limit (8 bits)      | Compressed to 2 bits (1, 64, 255, or inline)|
| Source Address (128 b)  | Derived from 802.15.4 64-bit link MAC address|
| Dest Address (128 b)    | Derived from 802.15.4 64-bit link MAC address|
+-----------------------------------------------------------------------+
```
- **Compressed Result:** The 40-byte IPv6 header compresses to **2 bytes**. The 8-byte UDP header compresses to **4 bytes** (ports compressed to 4 bits each). Thus, total header overhead drops from **48 bytes to 6 bytes**, restoring payload efficiency to >94%.

---

### Q12. Compare MQTT and CoAP across architectural paradigms, transport requirements, reliability models, and power budgets.
**Ans.**
| Feature | MQTT (Message Queuing Telemetry Transport) | CoAP (Constrained Application Protocol) |
| :--- | :--- | :--- |
| **Architectural Model**| Client-Broker-Client (Publish-Subscribe) | Client-Server (RESTful Request-Response) |
| **Transport Layer** | TCP (Requires 3-way handshake SYN/ACK) | UDP (Connectionless, low latency) |
| **Default Port** | 1883 (Insecure), 8883 (TLS/SSL) | 5683 (Insecure), 5684 (DTLS) |
| **Header Size** | 2-byte fixed header | 4-byte fixed header |
| **Reliability** | Handled at transport (TCP) + App QoS (0, 1, 2) | Application layer CON/ACK retransmissions |
| **Statefulness** | Broker maintains persistent connection & state| Stateless transactions with optional Observe |
| **Web Integration** | Requires WebSocket bridge or translation proxy | Directly translatable to HTTP via 1-to-1 mapping|
| **Power Budget** | Higher (constant TCP keep-alive pings) | Ultra-low (devices sleep between UDP bursts) |

---

### Q13. Detail the complete network topology, node classes, and packet traversal flow in a LoRaWAN ecosystem.
**Ans.**
```
[ End Devices ]      [ LoRaWAN Gateways ]      [ Network Server ]     [ Application Servers ]
  Class A/B/C          (Packet Forwarders)         (Deduplication)          (End-User Apps)

+-------------+          +-------------+
| Smart Meter | --RF---> | Gateway 1   | --IP--> +------------------+
+-------------+          +-------------+         |                  |         +-------------------+
                               |                 |  Network Server  | ------> | Industrial SCADA  |
+-------------+                v                 |  - De-duplication|         +-------------------+
| Soil Sensor | --RF---> +-------------+ --IP--> |  - MIC Security  |
+-------------+          | Gateway 2   |         |  - Adaptive Rate |         +-------------------+
                         +-------------+         +------------------+ ------> | Smart City Portal |
                                                          |                   +-------------------+
                                                          v
                                                 +------------------+
                                                 |   Join Server    |
                                                 | (Root Keys AppKey|
                                                 +------------------+
```
1. **End Devices:** Broadcast uplinks across 8 channels using LoRa CSS modulation.
2. **Gateways:** Act as transparent packet forwarders; all gateways within range receive the RF packet, wrap it in a UDP/IP or WebSocket packet, and forward it to the Network Server.
3. **Network Server:** Central authority that terminates the LoRaWAN MAC layer. It filters duplicate packets received from multiple gateways, verifies the 4-byte Message Integrity Code (MIC), adapts data rates dynamically (ADR), and routes the payload to the appropriate Application Server.
4. **Application Server:** Decrypts application payloads using the 128-bit `AppSKey` and delivers business data to end-user portals.

---

### Q14. Explain the Bluetooth Low Energy (BLE) Generic Access Profile (GAP) and Generic Attribute Profile (GATT) architecture.
**Ans.**
- **GAP (Generic Access Profile):** Governs device discovery, connection establishment, and broadcast roles:
  - *Broadcaster:* Non-connectable advertiser (e.g., Apple iBeacon broadcasting UUID/RSSI).
  - *Observer:* Scans for advertising packets without establishing a connection.
  - *Peripheral:* Advertises connection availability and accepts incoming links (e.g., Smartwatch).
  - *Central:* Scans, initiates, and manages connections with multiple peripherals (e.g., Smartphone).
- **GATT (Generic Attribute Profile):** Governs hierarchical data exchange over an active connection using the Attribute Protocol (ATT):
```
+-----------------------------------------------------------+
|                   GATT PROFILE (e.g., Heart Rate)         |
|  +-----------------------------------------------------+  |
|  | SERVICE (UUID: 0x180D - Heart Rate Service)         |  |
|  |  +-----------------------------------------------+  |  |
|  |  | CHARACTERISTIC (UUID: 0x2A37 - Measurement)   |  |  |
|  |  |  - Value: 72 bpm                              |  |  |
|  |  |  - Properties: READ, NOTIFY                   |  |  |
|  |  |  - DESCRIPTOR: Client Config (CCCD: 0x2902)    |  |  |
|  |  +-----------------------------------------------+  |  |
|  +-----------------------------------------------------+  |
+-----------------------------------------------------------+
```
- **Data Hierarchy:** Profiles contain Services (identified by 16-bit or 128-bit UUIDs). Services encapsulate Characteristics. Characteristics contain a Value, Properties (Read, Write, Notify, Indicate), and Descriptors (metadata/permissions).

---

### Q15. Detail the MQTT connection lifecycle, Clean Session flags, and Last Will and Testament (LWT) mechanism.
**Ans.**
- **Connection Handshake:**
  - Client sends a `CONNECT` packet containing: ClientID, KeepAlive interval, CleanSession flag, optional Username/Password, and LWT payload.
  - Broker verifies credentials and replies with `CONNACK` (Return code 0 indicates success).
- **Clean Session Flag:**
  - *CleanSession = 1 (True):* Broker discards any previous session data for this ClientID; does not queue unacknowledged messages while disconnected; deletes subscriptions on disconnect.
  - *CleanSession = 0 (False):* Broker creates a persistent session; retains subscriptions and queues incoming QoS 1/2 messages while the client is offline.
- **Last Will and Testament (LWT):**
  - When connecting, client instructs the broker: *"If I disconnect unexpectedly without sending a graceful `DISCONNECT` frame, publish this message on this topic."*
  - **Failure Handling:** If the TCP connection breaks (missed PINGREQ timeout, physical power cutoff), the broker publishes the LWT message (e.g., topic `nodes/node42/status`, payload `{"online": false}`) to alert subscribers.

---

## 5. Section C: Comprehensive Long Answer Question Bank (3 Questions x 10-15 Marks)

### Q16. Provide an exhaustive architectural exposition of the 6LoWPAN protocol suite. Detail header compression (RFC 4944 vs RFC 6282), packet fragmentation algorithms, and routing strategies (Mesh-Under vs Route-Over).
**Ans.**
#### 1. The Challenge of IP on Constrained Links
Internet Protocol version 6 (IPv6) provides a $2^{128}$ address space, ensuring every sensor in the world can possess a globally routable IP. However, running IPv6 over IEEE 802.15.4 introduces critical challenges:
- 802.15.4 frame capacity is 127 bytes.
- Standard 802.15.4 MAC header + AES-CCM security consumes 25 to 33 bytes, leaving ~94 bytes.
- Uncompressed IPv6 header (40 bytes) + UDP header (8 bytes) consumes 48 bytes, leaving only 46 bytes for actual sensor data.
- RFC 2460 mandates that every IPv6 link must support an MTU of at least 1280 bytes.

#### 2. The 6LoWPAN Adaptation Layer Architecture
6LoWPAN sits between the Data Link and Network layers:
```
           +-----------------------------------------------+
           |               Application Layer               |
           +-----------------------------------------------+
           |         Transport Layer (UDP / TCP)           |
           +-----------------------------------------------+
           |           Network Layer (IPv6 / RPL)          |
           +-----------------------------------------------+
================== 6LoWPAN ADAPTATION LAYER =================
|  [ RFC 6282 Header Compression ]                         |
|  [ RFC 4944 Fragmentation & Reassembly ]                  |
|  [ Mesh Addressing & Link-Layer Forwarding ]             |
=============================================================
           |             IEEE 802.15.4 MAC Layer           |
           +-----------------------------------------------+
           |             IEEE 802.15.4 PHY Layer           |
           +-----------------------------------------------+
```

#### 3. Header Compression Evolution: RFC 4944 (LOWPAN_HC1) vs RFC 6282 (LOWPAN_IPHC)
- **RFC 4944 (HC1):** Compressed IPv6 headers to 2 or 3 bytes, but only worked if IPv6 addresses matched link-local prefixes (`FE80::/64`). It could not compress global unicast addresses.
- **RFC 6282 (IPHC - State-of-the-Art):** Introduces context-based address compression for both link-local and global unicast addresses.
  - Uses a 13-bit Base Format:
    - `TF` (Traffic Class, Flow Label): 2 bits (compressed or elided).
    - `NH` (Next Header): 1 bit (if UDP, Next Header is compressed inline).
    - `HLIM` (Hop Limit): 2 bits (1, 64, 255 encoded directly).
    - `CID` (Context Identifier): 1 bit.
    - `SAC` (Source Address Compression): 1 bit (Stateless vs Stateful).
    - `SAM` (Source Address Mode): 2 bits (128-bit inline, 64-bit derived, 16-bit, or completely elided).
    - `DAC` / `DAM` (Destination Address Compression/Mode): Same as source.
  - When source and destination use global prefixes registered in a shared 6LoWPAN context table, and addresses are derived from 802.15.4 MAC addresses, the entire 40-byte IPv6 header shrinks to **2 bytes**.

#### 4. Fragmentation and Reassembly Algorithm
When an IPv6 packet exceeds 127 bytes, the 6LoWPAN layer breaks it into fragments:
```
First Fragment:
+-------------------+---------------------+------------------+
| FRAG1 Header (4B) | Compressed IPv6 Hdr | Upper Layer Data |
+-------------------+---------------------+------------------+
[ 11100 (5b) | datagram_size (11b) | datagram_tag (16b) ]

Subsequent Fragments:
+-------------------+---------------------+------------------+
| FRAGN Header (5B) | datagram_offset (8B)| Upper Layer Data |
+-------------------+---------------------+------------------+
[ 11100 (5b) | datagram_size (11b) | datagram_tag (16b) | datagram_offset (8b) ]
```
- `datagram_size`: Specifies total unfragmented IPv6 payload size.
- `datagram_tag`: Unique 16-bit incrementing identifier shared across all fragments of a single datagram.
- `datagram_offset`: Position of this fragment's data in the uncompressed datagram (in 8-byte increments).
- *Reassembly Buffer:* The receiving node maintains a reassembly buffer indexed by `(source_mac, datagram_tag)`. If all fragments arrive within a reassembly timeout (typically 2–4 seconds), the IP datagram is rebuilt; otherwise, the buffer is dropped to prevent memory exhaustion.

#### 5. Routing Paradigms: Mesh-Under vs Route-Over
```
+-------------------------------------------------------------------------+
| CRITERIA           | MESH-UNDER ROUTING        | ROUTE-OVER ROUTING     |
+-------------------------------------------------------------------------+
| Routing Layer      | 6LoWPAN Adaptation Layer  | IPv6 Network Layer     |
| Addressing Scheme  | IEEE 802.15.4 64-bit MAC  | 128-bit IPv6 Addresses |
| Routing Protocols  | IEEE 802.15.5, LOADng     | RPL (RFC 6550)         |
| Fragmentation Flow | Reassembled only at final | Reassembled & re-frag- |
|                    | destination edge node     | mented at EACH hop     |
| Router Complexity  | Lower memory footprint    | Requires IP router stack|
| Topology Scale     | Best for small WPANs      | Scales to 10,000+ nodes|
+-------------------------------------------------------------------------+
```

---

### Q17. Provide an architectural breakdown of the MQTT protocol specification (ISO/IEC 20922). Explain the binary packet structure, QoS handshakes, session state maintenance, and write a complete Python publisher/subscriber script using Paho-MQTT.
**Ans.**
#### 1. Binary Packet Architecture
An MQTT control packet consists of three parts:
```
+-------------------------------------------------------+
| Fixed Header (2 bytes, present in ALL packets)        |
+-------------------------------------------------------+
| Variable Header (Present in select control packets)   |
+-------------------------------------------------------+
| Payload (Present in CONNECT, PUBLISH, SUBSCRIBE, etc.)|
+-------------------------------------------------------+
```
- **Byte 1 of Fixed Header:**
  - Bits 7–4: `Packet Type` (1 = CONNECT, 3 = PUBLISH, 8 = SUBSCRIBE, 12 = PINGREQ, 14 = DISCONNECT).
  - Bit 3: `DUP` flag (duplicate delivery).
  - Bits 2–1: `QoS Level` (00 = QoS 0, 01 = QoS 1, 10 = QoS 2).
  - Bit 0: `RETAIN` flag.
- **Byte 2 (Remaining Length):** Encoded using a variable-length encoding scheme (1 to 4 bytes), allowing payloads up to 256 MB.

#### 2. Detailed QoS Handshake Mechanisms
```
   QoS 1 Handshake (At Least Once)         QoS 2 Handshake (Exactly Once)
   -------------------------------         ------------------------------
   Publisher               Broker          Publisher               Broker
       |                     |                 |                     |
       |--- PUBLISH (PktID)->|                 |--- PUBLISH (PktID)->|
       |    (Stores message) |                 |                     |
       |<-- PUBACK (PktID)---|                 |<-- PUBREC (PktID)---|
       |    (Deletes message)|                 |--- PUBREL (PktID)->|
                                               |<-- PUBCOMP (PktID)--|
```
- **QoS 1:** Publisher sends `PUBLISH` with a Packet Identifier. Broker replies with `PUBACK`. If the network drops the ack, the publisher retransmits with `DUP = 1`, resulting in potential duplicate deliveries.
- **QoS 2:** Two-phase commit. `PUBLISH` $ightarrow$ Broker logs message and responds with `PUBREC` $ightarrow$ Publisher releases its lock with `PUBREL` $ightarrow$ Broker completes processing and confirms with `PUBCOMP`. Guaranteed zero duplicates.

#### 3. Production-Grade Python Implementation (Eclipse Paho-MQTT v2)
```python
import time
import json
import paho.mqtt.client as mqtt

BROKER_HOST = "broker.hivemq.com"
BROKER_PORT = 1883
TOPIC_TELEMETRY = "mjpru/bca/lab/sensor42/telemetry"
TOPIC_STATUS    = "mjpru/bca/lab/sensor42/status"

# ==================== SUBSCRIBER CALLBACKS ====================
def on_connect(client, userdata, flags, rc, properties=None):
    if rc == 0:
        print("[MQTT] Successfully connected to broker.")
        # Subscribe to telemetry topic with QoS 1
        client.subscribe(TOPIC_TELEMETRY, qos=1)
        print(f"[MQTT] Subscribed to topic: {TOPIC_TELEMETRY}")
    else:
        print(f"[MQTT] Connection failed with error code: {rc}")

def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode("utf-8"))
        print(f"[RECV] Topic: {msg.topic} | QoS: {msg.qos}")
        print(f"       Data: Temp = {payload.get('temp')}°C, Humidity = {payload.get('humidity')}%")
    except Exception as e:
        print(f"[ERROR] Failed to parse message: {e}")

# ==================== MAIN EXECUTION & PUBLISHER ====================
def run_mqtt_node():
    # Instantiate client with explicit client_id
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id="BCA_Edge_Node_42", clean_session=True)

    # Configure Last Will and Testament (LWT)
    lwt_payload = json.dumps({"node": "BCA_Edge_Node_42", "status": "OFFLINE_UNEXPECTED"})
    client.will_set(TOPIC_STATUS, payload=lwt_payload, qos=1, retain=True)

    client.on_connect = on_connect
    client.on_message = on_message

    print("[MQTT] Connecting to broker...")
    client.connect(BROKER_HOST, BROKER_PORT, keepalive=60)

    # Start non-blocking network thread
    client.loop_start()

    # Publish active status
    online_payload = json.dumps({"node": "BCA_Edge_Node_42", "status": "ONLINE_ACTIVE"})
    client.publish(TOPIC_STATUS, payload=online_payload, qos=1, retain=True)

    # Simulation Telemetry Loop
    try:
        temp_sim = 24.5
        humidity_sim = 55.0
        for i in range(5):
            telemetry = {
                "node_id": "BCA_Edge_Node_42",
                "timestamp": int(time.time()),
                "temp": round(temp_sim, 2),
                "humidity": round(humidity_sim, 2),
                "rssi_dbm": -68
            }
            client.publish(TOPIC_TELEMETRY, payload=json.dumps(telemetry), qos=1)
            print(f"[PUB] Telemetry frame #{i+1} published.")
            temp_sim += 0.5
            humidity_sim -= 0.3
            time.sleep(2)
    except KeyboardInterrupt:
        print("
[MQTT] Shutting down gracefully...")
    finally:
        # Graceful disconnect clears LWT on broker
        graceful_payload = json.dumps({"node": "BCA_Edge_Node_42", "status": "OFFLINE_GRACEFUL"})
        client.publish(TOPIC_STATUS, payload=graceful_payload, qos=1, retain=True)
        time.sleep(1)
        client.loop_stop()
        client.disconnect()
        print("[MQTT] Disconnected cleanly.")

if __name__ == "__main__":
    run_mqtt_node()
```

---

### Q18. Provide a comprehensive architectural evaluation of LoRa and LoRaWAN. Differentiate between Class A, Class B, and Class C device profiles, derive the Time-on-Air (ToA) equation, and explain Adaptive Data Rate (ADR).
**Ans.**
#### 1. LoRa Physical Layer Modulation
LoRa uses Chirp Spread Spectrum (CSS) modulation. Rather than modulating phase or frequency on a static carrier, LoRa shifts carrier frequency linearly across bandwidth $BW$ over a duration $T_s$, creating frequency sweeps called **chirps**:
- An up-chirp sweeps from $f_{	ext{min}}$ to $f_{	ext{max}}$.
- A down-chirp sweeps from $f_{	ext{max}}$ to $f_{	ext{min}}$.
- A symbol is encoded by cyclically shifting the starting frequency of an up-chirp.

#### 2. Spreading Factor & Symbol Duration Derivation
The Spreading Factor ($SF \in \{7, 8, 9, 10, 11, 12\}$) determines the number of raw chips per information symbol:
$$N_{	ext{chips}} = 2^{SF}$$
The symbol duration $T_s$ is given by:
$$T_s = rac{2^{SF}}{BW}$$
*Example:* At $BW = 125\,	ext{kHz}$ and $SF = 12$:
$$T_s = rac{2^{12}}{125000} = rac{4096}{125000} = 32.768\,	ext{milliseconds per symbol}$$
At $SF = 7$:
$$T_s = rac{2^7}{125000} = rac{128}{125000} = 1.024\,	ext{milliseconds per symbol}$$
Higher SF provides extraordinary processing gain ($+20\,	ext{dB}$ gain over noise floor), enabling signals to be decoded even at $-20\,	ext{dB}$ Signal-to-Noise Ratio (SNR), but increases channel occupancy (Time-on-Air) by a factor of 32.

#### 3. Time-on-Air (ToA) Mathematical Model
The total time a LoRa packet occupies the wireless medium is:
$$ToA = T_{	ext{preamble}} + T_{	ext{payload}}$$
Where:
$$T_{	ext{preamble}} = (N_{	ext{preamble}} + 4.25) 	imes T_s$$
$$T_{	ext{payload}} = N_{	ext{payload\_symbols}} 	imes T_s$$
Where the number of payload symbols $N_{	ext{payload\_symbols}}$ is computed via the Semtech formula:
$$N_{	ext{payload}} = 8 + \max\left(\left\lceil rac{8PL - 4SF + 28 + 16CRC - 20IH}{4(SF - 2DE)} ightceil 	imes (CR + 4),\, 0ight)$$
- $PL$ = Payload length in bytes
- $SF$ = Spreading Factor ($7\dots12$)
- $IH$ = Implicit Header flag (0 = disabled, 1 = enabled)
- $CRC$ = Cyclic Redundancy Check (1 = enabled, 0 = disabled)
- $CR$ = Coding Rate ($1 \equiv 4/5, 2 \equiv 4/6, 3 \equiv 4/7, 4 \equiv 4/8$)
- $DE$ = Low Data Rate Optimization flag (1 if $SF \ge 11$ on 125 kHz, else 0).

#### 4. LoRaWAN Device Classes Comparison
```
Class A (Lowest Power):
End Node: [ Tx Uplink ] --- (Sleep 1s) ---> [ RX1 ] --- (Sleep 1s) ---> [ RX2 ] ---> [ Deep Sleep... ]

Class B (Beacon Synchronized):
End Node: [ Tx Uplink ] ... [ Scheduled Periodic Ping Slot ] ... [ Scheduled Periodic Ping Slot ]

Class C (Continuous Mains Power):
End Node: [ Continuous RX Listening........................... ] --- [ Tx ] --- [ Continuous RX... ]
```
- **Class A:** Battery life up to 10 years. Downlink only occurs following an uplink.
- **Class B:** Gateway transmits periodic GPS-synchronized beacons; nodes wake up for scheduled microsecond receive slots (Ping Slots). Ideal for utility metering with remote cutoff valves.
- **Class C:** Node receiver is continuously active. Zero downlink latency; draws continuous 10–20 mA current; requires mains power.

#### 5. Adaptive Data Rate (ADR)
Adaptive Data Rate is a closed-loop mechanism where the LoRaWAN Network Server dynamically optimizes each node's transmission parameters:
- The Network Server analyzes the SNR and RSSI of the last 20 frames received from a static node across all gateways.
- If the node has strong SNR margins (e.g., node is close to a gateway), the server sends a MAC command (`LinkADRReq`) ordering the node to **lower its SF** (e.g., from SF12 to SF7) and **reduce transmit power**.
- **Impact:** Decreases channel airtime, prevents packet collisions in dense deployments, and extends battery life by up to 400%.

---

## 6. High-Yield Exam Revision Matrix & Architectural Cheat Sheet

| Standard / Protocol | Layer | Key Attribute / Formula | High-Yield Exam Takeaway |
| :--- | :--- | :--- | :--- |
| **IEEE 802.15.4** | PHY / MAC | 2.4 GHz, 250 kbps, Max 127B frame | Baseline standard for low-rate wireless personal area networks (Zigbee/6LoWPAN). |
| **6LoWPAN** | Adaptation | IPHC Header Compression (RFC 6282) | Compresses 48B IPv6/UDP header down to 6B; provides MTU fragmentation. |
| **MQTT** | Application | TCP Port 1883/8883, 2B header | Pub-Sub model with Broker; QoS 0, 1, 2; LWT ensures offline detection. |
| **CoAP** | Application | UDP Port 5683/5684, 4B header | RESTful Request-Response over UDP; native URI mapping to HTTP; CON/NON reliability. |
| **LoRa Modulation** | Physical | Chirp Spread Spectrum (CSS) | Long range (up to 15 km), deep penetration, trade-off between SF and Time-on-Air. |
| **LoRaWAN Class A** | MAC | 2 Downlink RX windows post-uplink | Lowest power consumption profile; 10+ year battery operation on coin cells. |
| **LoRaWAN Class C** | MAC | Continuous RX listening | Lowest latency downlink; requires continuous external mains power. |
| **BLE GATT** | Application | Profile $ightarrow$ Service $ightarrow$ Characteristic | Hierarchical attribute structure using 16/128-bit UUIDs over short-range links. |
| **Adaptive Data Rate** | MAC (LoRaWAN) | Dynamic SF and Tx power scaling | Network Server commands nodes with strong link budgets to switch to lower SFs. |

# Unit 3: Cloud Computing, Edge Processing, and Sensor Interfacing in IoT

## 1. Executive Summary & Syllabus Blueprint
IoT systems derive their ultimate intelligence by bridging physical hardware with distributed computing tiers. This unit covers the end-to-end data processing hierarchy: low-level synchronous/asynchronous hardware serial bus interfaces (I2C, SPI, UART, 1-Wire), local edge processing and fog computing architectures, cloud IoT device management and ingestion pipelines (AWS IoT Core, Azure IoT Hub, Google Cloud IoT), and big data storage engines optimized for time-series sensor telemetry.

---

## 2. Comprehensive Core Theoretical Architecture & In-Depth Concept Decomposition

### 2.1 The Computing Continuum: Cloud vs Fog vs Edge Computing
```
                                 [ CLOUD TIER ]
                 +---------------------------------------------+
                 | Massive Data Warehouses, Global Analytics,  |
                 | Model Training, Long-term Cold Storage      |
                 | Latency: 100 - 500 ms | Bandwidth: Variable |
                 +---------------------------------------------+
                                       ^
                                       | WAN / Fiber / 5G Backhaul
                                       v
                                  [ FOG TIER ]
                 +---------------------------------------------+
                 | Local Micro-Data Centers, On-premise Servers|
                 | Regional Aggregation, Protocol Translation  |
                 | Latency: 10 - 50 ms | Bandwidth: High       |
                 +---------------------------------------------+
                                       ^
                                       | LAN / Wi-Fi / Ethernet
                                       v
                                  [ EDGE TIER ]
                 +---------------------------------------------+
                 | Smart Gateways, Single-Board Computers,     |
                 | Microcontrollers, Real-Time Actuation       |
                 | Latency: < 1 - 10 ms | Bandwidth: Local     |
                 +---------------------------------------------+
```
- **Edge Computing:** Computation and data storage performed on or directly adjacent to the physical devices collecting the data (e.g., running TinyML vibration anomaly detection on an ESP32 or Raspberry Pi). Eliminates latency, operates during WAN outages, and preserves local privacy.
- **Fog Computing:** Extends cloud computing to the local network perimeter (Cisco architectural concept). Local multi-access edge computing (MEC) servers or factory-floor industrial PCs that aggregate streams from 500+ edge nodes, perform filtering, run local databases, and forward summarized metrics to the cloud.
- **Cloud Computing:** Centralized hyper-scale infrastructure providing virtually unlimited horizontal elasticity, serverless stream processing, long-term archival, and global model training.

### 2.2 Serial Hardware Interfacing Buses (I2C, SPI, UART, 1-Wire)
```
+----------------------------------------------------------------------------------------------------+
| PARAMETER           | I2C (Inter-Integrated Circuit)| SPI (Serial Peripheral) | UART (Universal Asynch)   |
+----------------------------------------------------------------------------------------------------+
| Wire Count          | 2 Wires (SDA, SCL)            | 4 Wires (MOSI, MISO,    | 2 Wires (TX, RX)          |
|                     |                               | SCLK, SS/CS)            | (Plus GND reference)      |
| Duplex Mode         | Half-Duplex                   | Full-Duplex             | Full-Duplex               |
| Clock Synchronization| Synchronous (Shared SCL)     | Synchronous (Shared SCLK| Asynchronous (No clock)   |
| Topologies Supported| Multi-Master, Multi-Slave     | Single-Master, Multi-   | Point-to-Point            |
|                     | (7-bit / 10-bit addressing)   | Slave (Dedicated CS pin)| (Direct connection)       |
| Standard Speeds     | Standard: 100 kbps            | High Speed: 10 Mbps to  | Standard Baud Rates:      |
|                     | Fast Mode: 400 kbps, 3.4 Mbps | 50+ Mbps                | 9600, 115200, 921600 bps  |
| Pull-up Resistors   | Mandatory (Open-Drain lines)  | Not Required (Push-Pull)| Not Required              |
| Complexity          | Medium (Addressing protocol)  | Simple hardware registers| Simple FIFO buffers       |
+----------------------------------------------------------------------------------------------------+
```
- **1-Wire Bus (Dallas Semiconductor):** Single data line (DQ) plus ground; communicates bidirectionally using open-drain signaling with a $4.7\,	ext{k}\Omega$ pull-up resistor. Every 1-Wire slave (e.g., DS18B20 temperature sensor) possesses a factory-lasered unique 64-bit ROM identification code, allowing dozens of sensors to be daisy-chained along a single copper pair over distances up to 100 meters.

### 2.3 Cloud IoT Ingestion Architecture (AWS, Azure, GCP)
Major hyper-scale cloud IoT architectures implement five core functional subsystems:
1. **Device Registry:** Central database maintaining unique identities, hardware credentials, and authorization policies for every registered physical node.
2. **Device Gateway / Message Ingestion:** Elastic endpoint terminating incoming TLS/TCP connections from millions of concurrent nodes running MQTT, WebSockets, or HTTP.
3. **Device Shadow / Digital Twin:** A JSON document stored in the cloud that persists the current state and desired state of an IoT device:
   - Allows cloud applications to write state changes (e.g., `desired: { fan: "ON" }`) even if the physical device is currently offline.
   - When the node reconnects, it syncs with the shadow, applies changes, and reports back (`reported: { fan: "ON" }`).
4. **Rules Engine:** Serverless SQL-like routing layer that filters, enriches, and transforms streaming MQTT payloads without spinning up virtual machines:
   ```sql
   SELECT temperature, humidity, deviceId FROM 'iot/telemetry/#' WHERE temperature > 40.0
   ```
5. **Cold & Hot Storage Engines:**
   - *Hot Path:* Low-latency streaming pipelines (AWS Kinesis, Azure Event Hubs, GCP Pub/Sub) feeding real-time anomaly detection and operational dashboards.
   - *Cold Path:* Batched parquet files stored in object storage (AWS S3, Azure Blob, Google Cloud Storage) indexed by time-series engines (InfluxDB, AWS Timestream).

---

## 3. Section A: Short Answer Question Bank (10 Questions x 2 Marks)

### Q1. Define Fog Computing and state how it differs from Edge Computing.
**Ans.** Fog computing is a decentralized computing architecture situated between edge devices and the central cloud, deploying compute, storage, and networking resources on local area networks (e.g., industrial gateways). Edge computing occurs directly on the sensor/actuator device itself, whereas Fog computing operates at the local network tier aggregating multiple edge nodes.

### Q2. Why are pull-up resistors mandatory on I2C bus lines (SDA and SCL)?
**Ans.** Both Serial Data (SDA) and Serial Clock (SCL) lines use **open-drain** (or open-collector) transistor drivers. Devices can only pull the bus line to ground (LOW); they cannot drive it HIGH. External pull-up resistors (typically $2.2\,	ext{k}\Omega	ext{--}4.7\,	ext{k}\Omega$ connected to $V_{cc}$) are required to pull the lines HIGH when all devices release the bus, preventing short-circuit bus contention.

### Q3. Explain the function of the Chip Select (CS / SS) line in SPI communication.
**Ans.** Serial Peripheral Interface (SPI) uses dedicated active-low Chip Select (or Slave Select) lines for each peripheral slave. The master brings the specific slave's CS line LOW to initiate communication with that device; all other slaves ignore clock and data lines while their CS pins remain HIGH.

### Q4. What is a Device Shadow (or Digital Twin) in AWS IoT Core?
**Ans.** A Device Shadow is a persistent JSON document maintained in the cloud that mirrors the real-time operational state of a connected device. It contains a `desired` section (set by cloud apps) and a `reported` section (set by the edge device), enabling asynchronous state control even when the physical device is offline.

### Q5. Explain the importance of Baud Rate matching in UART serial communication.
**Ans.** Because Universal Asynchronous Receiver-Transmitter (UART) does not transmit a shared hardware clock line, the transmitter and receiver must agree on an identical baud rate (symbol transmission speed, e.g., 115200 bps). Both sides use internal clock dividers to sample incoming bits at the exact midpoint of each bit period; mismatched baud rates cause framing errors and garbled data.

### Q6. How does the 1-Wire protocol address multiple devices on a single data line?
**Ans.** Every 1-Wire device possesses a factory-lasered, globally unique **64-bit ROM code** comprising an 8-bit family code, a 48-bit unique serial number, and an 8-bit CRC. The master uses a binary tree search algorithm (ROM Search) to identify and address individual devices connected to the shared single bus line.

### Q7. What is TinyML and why is it significant for IoT Edge nodes?
**Ans.** TinyML is the field of machine learning focused on optimizing and running deep learning models (quantized 8-bit neural networks) on low-power microcontrollers (drawing $< 1\,	ext{mW}$) with tens of kilobytes of SRAM (e.g., TensorFlow Lite for Microcontrollers). It enables real-time on-device audio keyword spotting, gesture recognition, and anomaly detection without cloud latency.

### Q8. Distinguish between Hot Storage and Cold Storage paths in IoT cloud pipelines.
**Ans.** 
- **Hot Storage Path:** High-speed, in-memory or real-time streaming databases (e.g., Redis, AWS Timestream) providing millisecond query latency for real-time dashboards and automated threshold alerting.
- **Cold Storage Path:** Cost-effective object storage (e.g., Amazon S3, Google Cloud Storage) archiving raw historical telemetry in compressed formats (Parquet) for batch analytics and training machine learning models.

### Q9. What role does an IoT Rules Engine play in cloud architectures?
**Ans.** An IoT Rules Engine provides a declarative, serverless SQL syntax to inspect incoming MQTT topic payloads in real time, filter events based on logic conditions, transform data structures, and route payloads directly into cloud storage, serverless functions (AWS Lambda), or notification queues without requiring dedicated server infrastructure.

### Q10. What is an Open-Drain driver configuration?
**Ans.** An open-drain driver consists of an internal N-channel MOSFET whose drain pin is connected directly to the output pin, with no internal connection to $V_{cc}$. When activated, the MOSFET conducts, pulling the line to ground; when deactivated, the pin floats high-impedance, requiring an external pull-up resistor to establish a logic HIGH.

---

## 4. Section B: Analytical, Derivational & Procedural Question Bank (5 Questions x 5 Marks)

### Q11. Compare and contrast I2C and SPI serial hardware bus protocols across signal lines, throughput, distance, bus contention, and pin scalability.
**Ans.**
| Feature | I2C (Inter-Integrated Circuit) | SPI (Serial Peripheral Interface) |
| :--- | :--- | :--- |
| **Physical Lines** | Exactly 2 lines (SDA, SCL) regardless of slave count | $3 + N$ lines (MOSI, MISO, SCLK, and 1 CS per slave) |
| **Transmission Speed** | 100 kbps (Standard), 400 kbps (Fast), 3.4 Mbps (High) | 10 Mbps to 80+ Mbps |
| **Duplex Capability**| Half-Duplex (Data flows in one direction at a time)| Full-Duplex (Simultaneous bidirectional transfer) |
| **Bus Arbitration** | Multi-master arbitration with clock synchronization | Single-master architecture; multi-master is complex |
| **Addressing Method** | In-band 7-bit or 10-bit address byte sent on SDA | Hardware addressing via dedicated physical CS pins |
| **Acknowledgment** | Explicit ACK/NACK bit following every 8-bit byte | No built-in protocol acknowledgment |
| **Pin Scalability** | Outstanding (connect up to 127 devices on 2 pins) | Poor (adding 10 slaves requires 10 dedicated GPIOs) |
| **Ideal Use Case** | Reading low-speed environmental sensors (BME280) | Driving high-speed displays (TFT LCD), SD cards |

---

### Q12. Explain the architectural anatomy of an IoT Edge Gateway. Detail its hardware, operating system, and software pipeline responsibilities.
**Ans.**
```
+-------------------------------------------------------------------------+
|                       EDGE GATEWAY ARCHITECTURE                         |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  | Southbound Interfaces (Field Level)                               |  |
|  | - Modbus RTU (RS-485) | BLE 5.0 | Zigbee 3.0 | 6LoWPAN | LoRa     |  |
|  +-------------------------------------------------------------------+  |
|                                    |                                    |
|  +-------------------------------------------------------------------+  |
|  | Local Gateway Core Software (Edge OS: Yocto / Ubuntu Core Linux)  |  |
|  | - Edge Container Runtime (Docker / K3s / EdgeX Foundry)           |  |
|  | - Protocol Normalization Engine (Converts Modbus/BLE to JSON)     |  |
|  | - Local Embedded Broker & Queue (Mosquitto / SQLite Buffer)       |  |
|  | - Edge AI Inference Engine (TensorFlow Lite / ONNX Runtime)       |  |
|  | - Local Web Administration Dashboard & Device Discovery           |  |
|  +-------------------------------------------------------------------+  |
|                                    |                                    |
|  +-------------------------------------------------------------------+  |
|  | Northbound Interfaces (Cloud Backhaul)                            |  |
|  | - MQTT over TLS 1.3 | HTTPS REST | AMQP over 4G/5G LTE & Fiber    |  |
|  +-------------------------------------------------------------------+  |
+-------------------------------------------------------------------------+
```
1. **Southbound Field Protocol Translation:** Bridges legacy industrial fieldbuses (RS-485 Modbus, CAN bus) and wireless sensor networks (Zigbee, BLE) into standardized IP frames.
2. **Local Data Deduplication & Filtering:** Suppresses redundant stationary sensor readings (deadband filtering) to reduce cloud bandwidth and cellular backhaul costs.
3. **Store-and-Forward Buffering:** If cloud WAN backhaul fails, the gateway stores telemetry in a persistent local queue (SQLite or RocksDB) and replays it upon reconnection without data loss.
4. **Local Autonomous Safety Interlocks:** Executes sub-10ms shutdown sequences during industrial hazard states without waiting for round-trip cloud confirmation.

---

### Q13. Detail the operational mechanics of the I2C protocol handshake: START condition, Addressing, Read/Write bit, ACK/NACK, and STOP condition.
**Ans.**
- **Idle State:** Both SDA and SCL are held HIGH by pull-up resistors.
- **START Condition (S):** Master pulls SDA LOW while SCL remains HIGH. This signals all connected slaves to wake up and listen.
- **Address & Direction Frame:**
  - The master pulses SCL 8 times to transmit an 8-bit frame:
    - Bits 7–1: 7-bit unique slave address (e.g., `0x68` for MPU-6050).
    - Bit 0 ($R/\overline{W}$): Read/Write flag ($0 = 	ext{Write}$ operation, $1 = 	ext{Read}$ operation).
- **Acknowledge Bit (ACK / NACK):**
  - On the 9th clock pulse, the master releases SDA. The targeted slave pulls SDA LOW to signal an **ACK**. If SDA remains HIGH, it is a **NACK** (device absent or busy).
- **Data Transfer:**
  - 8-bit data bytes are transferred sequentially, each followed by an ACK/NACK bit. Data on SDA must remain stable during the HIGH period of SCL; SDA may only change state while SCL is LOW.
- **STOP Condition (P):** Master releases SCL to HIGH, and then transitions SDA from LOW to HIGH while SCL is HIGH. The bus returns to the IDLE state.
```
SDA: ----\       [ MSB ] [ Bit 6 ] ... [ Bit 0 ] [ R/W ]   /--- [ ACK: LOW ] ---\       /---
          \                                               /                      \     /
SCL: --------\      /1\     /2\   ...   /7\     /8\      /9\                        --/
              \____/   \___/   \__...__/   \___/   \____/   \__________________________/
     START        Address Transmission Frame            Slave ACK               STOP
```

---

### Q14. Explain the Device Shadow / Digital Twin synchronization lifecycle across Desired, Reported, and Delta states.
**Ans.**
A Device Shadow JSON maintains three key operational blocks:
```json
{
  "state": {
    "desired":  { "pump_speed_rpm": 1800, "status": "ACTIVE" },
    "reported": { "pump_speed_rpm": 1200, "status": "ACTIVE" },
    "delta":    { "pump_speed_rpm": 1800 }
  },
  "version": 42,
  "timestamp": 1718005432
}
```
1. **Application Intent:** A user updates a web dashboard to change pump speed to 1800 RPM. The cloud updates the shadow's `desired` section.
2. **Delta Generation:** The cloud broker compares `desired` with `reported`. Because there is a mismatch (`pump_speed_rpm: 1800` vs `1200`), the cloud generates a **Delta document** and publishes it to the reserved topic `$aws/things/WaterPump42/shadow/update/delta`.
3. **Device Ingestion:** The edge node receives the delta message, adjusts its local PWM motor driver to 1800 RPM, and publishes an update confirming execution:
   ```json
   { "state": { "reported": { "pump_speed_rpm": 1800 } } }
   ```
4. **State Reconciliation:** The cloud broker receives the reported payload, updates `reported`, and clears the `delta` document since `desired == reported`.

---

### Q15. Detail the physical wiring, protocol timing, and CRC calculation of the Dallas 1-Wire protocol used in the DS18B20 temperature sensor.
**Ans.**
- **Physical Wiring:** A single bidirectional data line (`DQ`), Ground, and optional $V_{DD}$ (supports Parasite Power mode where energy is drawn from the DQ pull-up line via an internal capacitor). A $4.7\,	ext{k}\Omega$ external pull-up resistor pulls DQ to 3.3V/5V.
- **Protocol Time Slots:**
  - *Reset Pulse:* Master pulls DQ LOW for $\ge 480\,\mu	ext{s}$, then releases it.
  - *Presence Pulse:* Within $15	ext{--}60\,\mu	ext{s}$, the DS18B20 pulls DQ LOW for $60	ext{--}240\,\mu	ext{s}$ to signal presence.
  - *Write-1 Slot:* Master pulls DQ LOW for $1	ext{--}15\,\mu	ext{s}$, then releases line HIGH for the remainder of the $60\,\mu	ext{s}$ slot.
  - *Write-0 Slot:* Master pulls DQ LOW for the entire duration ($60	ext{--}120\,\mu	ext{s}$).
  - *Read Slot:* Master pulls DQ LOW for $1	ext{--}2\,\mu	ext{s}$, releases it, and samples the bus at $15\,\mu	ext{s}$ to read the bit.
- **64-bit Lasered ROM & Cyclic Redundancy Check (CRC):**
  - Byte 0: 8-bit Family Code (`0x28` for DS18B20).
  - Bytes 1–6: 48-bit unique serial number.
  - Byte 7: 8-bit CRC computed using the polynomial:
    $$G(X) = X^8 + X^5 + X^4 + 1$$
  - Ensures reliable multi-sensor bus identification over industrial cable runs.

---

## 5. Section C: Comprehensive Long Answer Question Bank (3 Questions x 10-15 Marks)

### Q16. Provide a comprehensive architectural breakdown of Cloud IoT Ingestion Pipelines. Contrast AWS IoT Core, Microsoft Azure IoT Hub, and Google Cloud IoT across Device Provisioning, Digital Twins, Stream Routing, and Security Frameworks.
**Ans.**
#### 1. End-to-End Cloud Ingestion Pipeline Architecture
```
[ Edge Nodes ]    [ Ingestion Tier ]      [ Stream Processing Tier ]       [ Storage & Analytics Tier ]
+------------+    +----------------+      +-------------------------+      +--------------------------+
| Edge Node  | -> | IoT Gateway    | ---> | Real-time Stream Router | ---> | Time-Series Hot DB       |
| (MQTT/TLS) |    | (TLS 1.3 Term) |      | (AWS Kinesis / Kafka)   |      | (InfluxDB / Timestream)  |
+------------+    +----------------+      +-------------------------+      +--------------------------+
                         |                             |                                |
                         v                             v                                v
                  +----------------+      +-------------------------+      +--------------------------+
                  | Device Registry|      | Serverless Compute      |      | Cold Data Lake           |
                  | & Security Auth|      | (Lambda / Cloud Funcs)  |      | (AWS S3 / Azure Blob)    |
                  +----------------+      +-------------------------+      +--------------------------+
```

#### 2. Detailed Comparative Matrix: AWS vs Azure vs GCP
```
+------------------------------------------------------------------------------------------------------+
| FEATURE / CAPABILITY     | AWS IoT CORE                  | AZURE IoT HUB             | GOOGLE CLOUD IoT     |
+------------------------------------------------------------------------------------------------------+
| Ingestion Protocols      | MQTT, MQTT over WSS, HTTPS    | MQTT, AMQP, HTTPS, WebSock| MQTT, HTTPS (via     |
|                          | (Port 8883, 443)              | (Port 8883, 5671, 443)    | Cloud Pub/Sub)       |
| Device Provisioning      | AWS IoT Fleet Provisioning    | Device Provisioning Serv- | Cloud Device Manager |
|                          | (X.509 Just-in-Time JITP)     | ice (DPS) with TPM/X.509  | with JWT Auth        |
| Digital Twin Concept     | Device Shadow (Classic &      | Azure IoT Device Twin &   | Cloud Device State   |
|                          | Named Shadows)                | Module Twin               | (Config vs State)    |
| Edge Compute Runtime     | AWS IoT Greengrass v2         | Azure IoT Edge            | Google Distributed   |
|                          | (Component-based runtime)     | (Docker container runtime)| Cloud Edge           |
| Stream Processing Routing| IoT Rules Engine (SQL syntax) | Message Routing & Event   | Direct stream to     |
|                          | routing to Kinesis/S3/Lambda  | Grid to Event Hubs        | Dataflow / BigQuery  |
| Time-Series Storage      | Amazon Timestream / DynamoDB  | Azure Data Explorer / ADX | Google BigQuery /    |
|                          |                               | Time Series Insights      | Cloud Bigtable       |
+------------------------------------------------------------------------------------------------------+
```

#### 3. Deep Dive into Security & Identity Governance
1. **Mutual TLS (mTLS 1.3) Authentication:**
   - Both AWS IoT Core and Azure IoT Hub mandate bidirectional cryptographic verification. The device verifies the cloud gateway's server certificate against a public root CA (e.g., Starfield or DigiCert), and the gateway verifies the unique **device certificate** presented by the client against the registered Certificate Authority.
2. **Access Control Policies:**
   - Fine-grained IAM JSON policies bind cryptographic client certificates to permissible MQTT actions:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [{
         "Effect": "Allow",
         "Action": ["iot:Publish", "iot:Receive"],
         "Resource": ["arn:aws:iot:us-east-1:123456789012:topic/sensors/${iot:Connection.CustomAuthorizer.DeviceID}/*"]
       }]
     }
     ```
   - Prevents compromised nodes from snooping or spoofing other devices' telemetry.

---

### Q17. Design and implement a multi-sensor industrial monitoring edge system on an ESP32 interfacing an I2C MPU-6050 Accelerometer/Gyroscope and an SPI MicroSD card logger. Provide complete wiring blueprints, register-level initialization, and complete production C++ code.
**Ans.**
#### 1. Hardware Pin Interfacing Blueprint
- **MCU:** ESP32 DevKit V1
- **I2C Bus Configuration (MPU-6050 6-Axis IMU):**
  - VCC $ightarrow$ 3.3V
  - GND $ightarrow$ Common GND
  - SCL $ightarrow$ GPIO 22 (Default I2C Clock)
  - SDA $ightarrow$ GPIO 21 (Default I2C Data)
  - AD0 $ightarrow$ GND (Selects 7-bit I2C device address `0x68`)
- **SPI Bus Configuration (MicroSD Card Module):**
  - VCC $ightarrow$ 5V (or 3.3V depending on module regulator)
  - GND $ightarrow$ Common GND
  - SCLK / SCK $ightarrow$ GPIO 18 (VSPI Clock)
  - MISO $ightarrow$ GPIO 19 (VSPI Master-In Slave-Out)
  - MOSI $ightarrow$ GPIO 23 (VSPI Master-Out Slave-In)
  - CS / SS $ightarrow$ GPIO 5 (VSPI Chip Select)

#### 2. Production-Grade C++ Firmware (Arduino Core)
```cpp
#include <Wire.h>
#include <SPI.h>
#include <SD.h>

// Pin Definitions
#define I2C_SDA_PIN 21
#define I2C_SCL_PIN 22
#define SD_CS_PIN    5

// MPU-6050 I2C Register Addresses
#define MPU6050_ADDR         0x68
#define MPU6050_PWR_MGMT_1   0x6B
#define MPU6050_ACCEL_XOUT_H 0x3B

const char* LOG_FILE_PATH = "/telemetry.csv";

// Initialize MPU-6050 over I2C
bool initMPU6050() {
  Wire.begin(I2C_SDA_PIN, I2C_SCL_PIN, 400000); // 400 kHz Fast Mode
  Wire.beginTransmission(MPU6050_ADDR);
  Wire.write(MPU6050_PWR_MGMT_1);
  Wire.write(0x00); // Clear sleep bit (wake up device)
  byte error = Wire.endTransmission();
  return (error == 0);
}

// Read raw 16-bit Accelerometer values
void readAccel(int16_t &ax, int16_t &ay, int16_t &az) {
  Wire.beginTransmission(MPU6050_ADDR);
  Wire.write(MPU6050_ACCEL_XOUT_H);
  Wire.endTransmission(false); // Send restart to keep connection alive
  Wire.requestFrom(MPU6050_ADDR, 6, true);

  if (Wire.available() >= 6) {
    ax = (Wire.read() << 8) | Wire.read();
    ay = (Wire.read() << 8) | Wire.read();
    az = (Wire.read() << 8) | Wire.read();
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("
[INIT] Starting Industrial Sensor Logger...");

  // 1. Initialize I2C Sensor
  if (!initMPU6050()) {
    Serial.println("[FATAL] MPU-6050 not detected at 0x68! Halting.");
    while (1) delay(100);
  }
  Serial.println("[SUCCESS] MPU-6050 initialized.");

  // 2. Initialize SPI SD Card
  if (!SD.begin(SD_CS_PIN)) {
    Serial.println("[FATAL] SD Card Mount Failed! Check CS pin & wiring.");
    while (1) delay(100);
  }
  Serial.println("[SUCCESS] SD Card initialized.");

  // Create CSV Header if file does not exist
  if (!SD.exists(LOG_FILE_PATH)) {
    File logFile = SD.open(LOG_FILE_PATH, FILE_WRITE);
    if (logFile) {
      logFile.println("timestamp_ms,accel_x_g,accel_y_g,accel_z_g");
      logFile.close();
      Serial.println("[INFO] CSV Header written.");
    }
  }
}

void loop() {
  int16_t rawX, rawY, rawZ;
  readAccel(rawX, rawY, rawZ);

  // Convert raw 16-bit signed values to Gs (Sensitivity = 16384 LSB/g at +/- 2g range)
  float ax_g = (float)rawX / 16384.0;
  float ay_g = (float)rawY / 16384.0;
  float az_g = (float)rawZ / 16384.0;
  unsigned long now = millis();

  // Print to Serial Console
  Serial.printf("[LOG] Time: %lu ms | X: %.3fg, Y: %.3fg, Z: %.3fg
", now, ax_g, ay_g, az_g);

  // Append to SD Card File
  File logFile = SD.open(LOG_FILE_PATH, FILE_APPEND);
  if (logFile) {
    logFile.printf("%lu,%.3f,%.3f,%.3f
", now, ax_g, ay_g, az_g);
    logFile.close();
  } else {
    Serial.println("[ERROR] Failed to open SD file for writing!");
  }

  delay(200); // 5 Hz sampling rate
}
```

---

### Q18. Provide an analytical investigation of Time-Series Databases (TSDB) for IoT telemetry ingestion. Contrast Relational Databases (RDBMS) with specialized TSDBs (InfluxDB, TimescaleDB), detail downsampling and retention policies, and explain compression algorithms (Gorilla XOR).
**Ans.**
#### 1. Why RDBMS Fails for IoT Telemetry
- **Write-Heavy Ingestion Pattern:** An enterprise IoT deployment with 10,000 nodes reporting every second produces 864,000,000 insert events per day.
- **B-Tree Indexing Bottleneck:** Relational databases (MySQL, PostgreSQL) maintain B-Trees for primary and foreign keys. As tables grow to billions of rows, updating B-Tree indexes requires frequent disk page splits and random I/O operations, causing write throughput to crash.
- **Storage Bloat:** Standard row storage formats store repeated column names, schemas, and uncompressed metadata for every record.

#### 2. Specialized Time-Series Architecture: InfluxDB vs TimescaleDB
```
+-------------------------------------------------------------------------+
| CRITERIA           | RELATIONAL (RDBMS)  | INFLUXDB (TSM/IOx)  | TIMESCALEDB            |
+-------------------------------------------------------------------------+
| Primary Storage    | B-Tree Row Store    | Time-Structured     | Hypertables partitioned|
| Engine             |                     | Merge-Tree (LSM)    | over Postgres tables   |
| Query Language     | Standard SQL        | Flux / InfluxQL     | Full Standard SQL      |
| Write Throughput   | 10k - 20k rows/sec  | 500k+ points/sec    | 300k+ points/sec       |
| Data Compression   | 10% - 20%           | 90%+ (Gorilla XOR)  | 90%+ (Hybrid columnar) |
| Relational Joins   | Native support      | Very limited        | Full PostgreSQL joins  |
+-------------------------------------------------------------------------+
```

#### 3. Gorilla Floating-Point XOR Compression Algorithm
Invented by Facebook (2015) and adopted by InfluxDB/Prometheus, the Gorilla compression algorithm compresses sequential 64-bit floating point sensor measurements by calculating the XOR difference between consecutive values:
$$\Delta = V_n \oplus V_{n-1}$$
1. If $\Delta = 0$ (sensor value is unchanged, e.g., temperature remains $24.50^\circ	ext{C}$):
   - Store a single `0` bit! (Compression ratio approaches 98%).
2. If $\Delta 
e 0$:
   - Store a `1` bit followed by metadata indicating the number of leading and trailing zeros in the XOR bit pattern.
   - Store only the meaningful variable bits in between.
   - Result: 64-bit floats compress to an average of **1.37 bytes per point**.

#### 4. Automated Retention Policies and Continuous Downsampling
Sensors generate high-frequency raw telemetry that is critical for real-time alerting but unnecessary for multi-year trend analysis:
```
Raw Data Ingestion (1 sec) ----> [ Retention Policy: Keep for 7 Days ]
            |
            v Continuous Aggregate Job (every hour)
Hourly Averages (Mean/Min/Max) -> [ Retention Policy: Keep for 1 Year ]
            |
            v Daily Rollup Job (every midnight)
Daily Trends -------------------> [ Retention Policy: Keep Indefinitely (Infinite) ]
```
- InfluxDB executes background **Retention Policies (RP)** and continuous queries that automatically drop high-resolution shards after 7 days while preserving downsampled aggregates in cold partitions.

---

## 6. High-Yield Exam Revision Matrix & Architectural Cheat Sheet

| Bus / Technology | Interface Type | Pin Requirements | Speed / Key Attribute |
| :--- | :--- | :--- | :--- |
| **I2C Bus** | Synchronous Half-Duplex | 2 Wires (SDA, SCL) | Requires pull-ups; 100/400 kbps; 7-bit addressing for up to 127 devices. |
| **SPI Bus** | Synchronous Full-Duplex | 4 Wires (MOSI, MISO, SCK, CS) | High speed (10–80 Mbps); push-pull drivers; dedicated CS pin per slave. |
| **UART** | Asynchronous Full-Duplex | 2 Wires (TX, RX) | No shared clock; identical baud rate matching mandatory; point-to-point. |
| **1-Wire** | Asynchronous Half-Duplex | 1 Wire (DQ) + GND | $4.7\,	ext{k}\Omega$ pull-up; 64-bit unique factory ROM address; up to 100m range. |
| **Edge Computing** | Local Execution | Microcontrollers / Gateways | Sub-10ms latency; privacy preserving; operates during WAN disconnects. |
| **Device Shadow** | Cloud Abstraction | JSON Document | Manages `desired`, `reported`, and `delta` state sync asynchronously. |
| **IoT Rules Engine** | Serverless Ingestion | SQL Filter Expressions | Routes incoming MQTT telemetry directly to S3/DynamoDB/Lambda. |
| **Gorilla XOR** | TSDB Compression | $\Delta = V_n \oplus V_{n-1}$ | Compresses 64-bit floating point sensor telemetry down to ~1.37 bytes. |

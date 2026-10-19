# BCA-304N: Cloud Computing
## Unit 3 Master Exam Revision Notes: Cloud Computing Architecture and Infrastructure (IaaS)
**Target Examination:** MJPRU Bareilly BCA Semester 6 (CBCS Pattern 2024–25)
**Unit Identifier:** `21e7349c-a1d3-5efc-8961-c0ffa8227c4d` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Cloud Computing Architecture: Logical Layers, Management Core & Client Interfaces**
- [x] **Service Models Overview: The SPI Tier Model (SaaS, PaaS, IaaS)**
- [x] **Shared Responsibility Model: Customer vs Cloud Service Provider (CSP) Roles**
- [x] **Cloud Deployment Models: Public Cloud Architecture, Multitenancy & Scalability**
- [x] **Private Cloud: On-Premise, Hosted Private Clouds & Security Governance**
- [x] **Hybrid Cloud Architecture: Cloud Bursting, Workload Portability & Hybrid Integration**
- [x] **Community Cloud: Shared Infrastructure for Specific Industry Verticals**
- [x] **Infrastructure as a Service (IaaS): Architecture, Provisioning & Billing**
- [x] **Server Virtualization in IaaS: Dynamic Resource Allocation, VCPU & Live VM Migration**
- [x] **Storage Virtualization: Storage Area Networks (SAN), NAS, Block vs Object Storage**
- [x] **Network Virtualization: Software-Defined Networking (SDN), Virtual Switches & OpenFlow**
- [x] **Virtual Private Clouds (VPC), Subnets, Route Tables & Network Security Groups (NSGs)**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is Infrastructure as a Service (IaaS)?
**Model Answer:**
A cloud delivery model where a service provider provisions foundational computing, networking, block storage, and physical facility hardware to customers on an on-demand, pay-as-you-go basis, allowing consumers full control over guest operating systems and application stacks.

### Q2. [2 Marks] What are the 4 primary Cloud Deployment Models defined by NIST?
**Model Answer:**
1. **Public Cloud:** Open for public use over the internet; multi-tenant infrastructure owned by a CSP (AWS, Azure).
2. **Private Cloud:** Exclusively operated for a single organization; hosted on-premise or by a third party.
3. **Hybrid Cloud:** Composition of two or more distinct cloud infrastructures (public and private) bound by standardized technology enabling data and application portability.
4. **Community Cloud:** Shared by several organizations with shared concerns (compliance, security objectives, mission).

### Q3. [2 Marks] Define Cloud Bursting in a Hybrid Cloud deployment.
**Model Answer:**
An application deployment configuration where workloads run in a private cloud or local data center until demand spikes exceed local capacity, at which point the application seamlessly 'bursts' excess traffic into a public cloud to prevent downtime.

### Q4. [2 Marks] What is Server Virtualization in IaaS environments?
**Model Answer:**
The partitioning of physical bare-metal servers into multiple isolated virtual machine instances, managed by orchestration software (OpenStack, VMware vCenter) that dynamically assigns CPU cores, RAM, and PCIe devices.

### Q5. [2 Marks] Differentiate between Block Storage, File Storage, and Object Storage.
**Model Answer:**
- **Block Storage:** Raw, unformatted volumes attached to VMs (e.g., AWS EBS). Low latency, supports random read/write, ideal for databases and OS boots.
- **File Storage:** Hierarchical directory tree sharing files across multiple servers over network protocols (NFS, SMB/CIFS).
- **Object Storage:** Flat, unstructured key-value storage bucket (e.g., AWS S3). Files stored as immutable objects with rich custom metadata, accessed via REST HTTP APIs.

### Q6. [2 Marks] What is Software-Defined Networking (SDN)?
**Model Answer:**
An architectural paradigm that decouples the network control plane (which makes routing decisions) from the underlying data/forwarding plane (which physically forwards data packets), centralizing network control via software controllers.

### Q7. [2 Marks] What is a Virtual Private Cloud (VPC)?
**Model Answer:**
A logically isolated, private virtual network provisioned within a public cloud infrastructure, giving the customer complete control over IP address ranges, subnets, route tables, and network gateways.

### Q8. [2 Marks] What is an Availability Zone (AZ) versus a Cloud Region?
**Model Answer:**
A **Cloud Region** is a distinct geographical area (e.g., Mumbai, Frankfurt). An **Availability Zone (AZ)** is one or more discrete, fault-isolated data centers within a region, equipped with independent power, cooling, and networking, interconnected via ultra-low-latency fiber.

### Q9. [2 Marks] What is Cloud Storage Replication: Synchronous vs Asynchronous?
**Model Answer:**
- **Synchronous Replication:** Writes data simultaneously to multiple disks/locations; write transaction confirms only when all replicas acknowledge. Zero RPO, higher write latency.
- **Asynchronous Replication:** Writes data to primary storage, immediately acknowledges, and replicates in the background. Lower latency, risks slight data loss during catastrophic crashes.

### Q10. [2 Marks] Define Elastic Load Balancing (ELB) in cloud architectures.
**Model Answer:**
A managed cloud service that automatically distributes incoming application traffic across multiple healthy target instances (VMs, containers) in multiple AZs, monitoring health checks to bypass failed nodes.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Compare Cloud Deployment Models: Public, Private, Hybrid, and Community.
**Model Answer:**
| Dimension | Public Cloud | Private Cloud | Hybrid Cloud | Community Cloud |
| :--- | :--- | :--- | :--- | :--- |
| **Owner/Host** | Third-party CSP (AWS, Google) | Single Enterprise | Mixed (Enterprise + CSP) | Shared consortium or third party |
| **Security/Compliance** | Multi-tenant logical isolation | Dedicated physical isolation | Sensitive on-prem; public burst | Shared security governance |
| **Cost Model** | OpEx (Zero upfront CapEx) | Heavy CapEx + High OpEx | Balanced OpEx/CapEx | Shared CapEx across members |
| **Scalability** | Virtually unlimited elasticity | Finite (Bound to hardware) | Elastic public burst capacity | Moderate |
| **Primary Use Cases** | Web apps, startups, big data | Banking, defense, healthcare | Legacy enterprise modernization | Government departments, universities |

### Q2. [5 Marks] Explain Cloud Storage Architecture: Object Storage Mechanics (S3) vs Block Storage (EBS).
**Model Answer:**
### Storage Paradigm Architecture

```
+-------------------------------------------------------------------------+
|                        CLOUD STORAGE PARADIGMS                          |
|                                                                         |
|   Block Storage (SAN / EBS)                   Object Storage (S3)       |
|   - Attached to single VM                     - Globally accessible via HTTP REST|
|   - Divided into fixed blocks (512B - 4KB)   - Flat bucket; Key-Value addressing|
|   - Sector-level direct r/w access            - Immutable write-once, read-many |
|   - High IOPS, ultra-low latency (<1ms)       - High throughput, higher latency |
|   - Ideal for: PostgreSQL, OS Filesystems     - Ideal for: Video, backups, logs |
+-------------------------------------------------------------------------+
```
- **Block Storage:** Operates at the lowest level of storage. Block volumes look like raw SCSI/NVMe disks to the operating system. Enables partial in-place updates of files.
- **Object Storage:** Stores data as atomic blobs composed of: Unique Key, Payload Data, Extensible Metadata, and Access Control Lists (ACLs). Offers practically infinite horizontal scalability via distributed hashing and erasure coding.

### Q3. [5 Marks] Explain Software-Defined Networking (SDN) and OpenFlow in Cloud Infrastructures.
**Model Answer:**
### SDN Architectural Decoupling
Traditional routers tightly bundle control decisions and packet switching on the same physical ASIC chassis. SDN separates them into two distinct planes:
1. **Application Plane:** Network orchestration, security firewalls, and load balancers.
2. **Control Plane (The Brain):** Centralized software controller (OpenDaylight, ONOS) possessing a global view of network topology. Computes routing tables and installs flow rules.
3. **Data Plane (Forwarding):** Commodity white-box switches forwarding packets at wire speed based on flow tables received via the **OpenFlow protocol**.
- **Cloud Impact:** Enables dynamic creation of tenant VPCs, software-defined firewalls, and micro-segmentation without touching physical patch cables.

### Q4. [5 Marks] Detail Virtual Private Cloud (VPC) Components: Subnets, Route Tables, NAT Gateways, and Security Groups.
**Model Answer:**
### Enterprise VPC Blueprint
- **CIDR Block:** Defines IP address allocation space (e.g., `10.0.0.0/16` offering 65,536 private IPs).
- **Public vs. Private Subnets:**
  - *Public Subnet:* Associated with a Route Table directing `0.0.0.0/0` traffic to an **Internet Gateway (IGW)**.
  - *Private Subnet:* Isolated from inbound internet traffic; routes outbound requests through a managed **NAT Gateway** in the public subnet.
- **Security Groups (Stateful) vs Network ACLs (Stateless):**
  - *Security Group:* Acts as a virtual firewall at the VM instance level. **Stateful**: If inbound request is allowed, return outbound traffic is automatically permitted.
  - *NACL:* Operates at the subnet boundary. **Stateless**: Inbound and outbound rules must be explicitly configured separately using rule numbers.

### Q5. [5 Marks] Explain Data Protection Strategies in IaaS: Snapshots, RAID Arrays, and Disaster Recovery (DR).
**Model Answer:**
### Enterprise IaaS Resiliency Architecture
1. **Point-in-Time Snapshots:** Incremental block-level backups stored durability in object storage. Only modified blocks are copied after the initial snapshot baseline.
2. **Software RAID in Cloud:** Striping (RAID 0) across multiple EBS volumes to multiply IOPS throughput; Mirroring (RAID 1) or RAID 10 for extreme fault tolerance.
3. **Disaster Recovery Architectures:**
   - *Backup & Restore:* Lowest cost, highest RTO/RPO.
   - *Pilot Light:* Core data is replicated continuously to a remote region; compute instances remain off until disaster occurs.
   - *Warm Standby:* Scaled-down version of full environment always running in remote region.
   - *Multi-Region Active-Active:* Full traffic served concurrently from multiple geographical regions.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Design and Architect an Enterprise-Grade Multi-Tier Web Application on IaaS with High Availability, Multi-AZ Redundancy, and Auto-Scaling.
**Comprehensive University Solution:**
### Enterprise Multi-Tier IaaS Architecture Blueprint

```
                                  [ Global DNS (Route 53) ]
                                              |
                                              v
                            [ Application Load Balancer (ALB) ]
                                 /                        \
            (Public Subnet AZ-1)/                          \(Public Subnet AZ-2)
        +----------------------v-------+            +-------v----------------------+
        | NAT Gateway 1                |            | NAT Gateway 2                |
        +------------------------------+            +------------------------------+
                       |                                           |
            (Private App Subnet AZ-1)                   (Private App Subnet AZ-2)
        +------------------------------+            +------------------------------+
        | [ Web/App VM 1 ]             |            | [ Web/App VM 2 ]             |
        | Auto-Scaling Group (Min 2)   | <========> | Auto-Scaling Group (Max 10)  |
        +------------------------------+            +------------------------------+
                       |                                           |
            (Private DB Subnet AZ-1)                    (Private DB Subnet AZ-2)
        +------------------------------+            +------------------------------+
        | [ Primary RDS Database ]     | --Sync---> | [ Standby RDS Replica ]      |
        | (Active Read/Write)          |            | (Hot Standby Failover)       |
        +------------------------------+            +------------------------------+
```

#### 1. Ingestion Tier
- Multi-AZ **Application Load Balancer (ALB)** terminates incoming SSL/TLS certificates and distributes traffic across EC2 instances in private subnets based on path routing (`/api` vs `/static`).

#### 2. Compute Tier (Auto-Scaling Group)
- Compute instances reside strictly in private subnets, completely inaccessible from public IP ranges.
- **Auto-Scaling Policy:** Target tracking metric maintaining aggregate CPU utilization at 65%. Automatically adds VMs across AZ-1 and AZ-2 when traffic surges.

#### 3. Database Tier (Multi-AZ Relational Storage)
- Primary relational database instance in AZ-1 writes synchronously to a Hot Standby instance in AZ-2.
- **Automated Failover:** If AZ-1 suffers a catastrophic power outage, database DNS flips to Standby in AZ-2 within 60 seconds with zero data loss (RPO = 0).

### Q2. [10/15 Marks] Explain OpenStack: The Open-Source IaaS Architecture, Dissecting Its Core Microservices and Inter-Service Communication.
**Comprehensive University Solution:**
### OpenStack Open-Source IaaS Architecture

```
+-----------------------------------------------------------------------------------------+
|                                 OPENSTACK ARCHITECTURE                                  |
|                                                                                         |
|               Horizon (Web Dashboard)       OpenStack CLI / SDK                         |
|                                  |                   |                                  |
|                                  +--------+----------+                                  |
|                                           v                                             |
|                           Keystone (Identity & Token Auth)                              |
|                                           |                                             |
|         +-----------------+---------------+-----------------+                           |
|         |                 |               |                 |                           |
|         v                 v               v                 v                           |
|    Nova (Compute)   Neutron (Network) Glance (Images)  Cinder (Block Storage)           |
|         |                 |               |                 |                           |
|         +-----------------+---------------+-----------------+                           |
|                                           v                                             |
|                           RabbitMQ (Message Broker AMQP)                                |
|                           MariaDB (Shared Database State)                               |
+-----------------------------------------------------------------------------------------+
```

#### Core Modular Microservices:
1. **Nova:** Orchestrates the lifecycle of compute instances (VM provisioning, scheduling, CPU/RAM allocation via libvirt/KVM).
2. **Neutron:** Manages software-defined networking, IP allocation (DHCP), routing, and Open vSwitch / VXLAN overlay networks.
3. **Glance:** Image registry storing, discovering, and delivering VM disk templates (`.qcow2`, `.raw`, `.vmdk`).
4. **Cinder:** Provisions persistent block storage volumes attached to compute VMs via iSCSI or Ceph.
5. **Swift:** Scalable distributed object storage storing unstructured blobs across clusters.
6. **Keystone:** The central authentication and service catalog authority, issuing scoping tokens (Fernet tokens) to validate every API call.

#### Inter-Service Orchestration:
- All microservices communicate asynchronously using **RabbitMQ message queues (AMQP)** for long-running tasks and persist transactional state in a shared **MariaDB** relational cluster.

### Q3. [10/15 Marks] Analyze Disaster Recovery Metrics: Recovery Point Objective (RPO) vs Recovery Time Objective (RTO) with Mathematical Loss Formulations.
**Comprehensive University Solution:**
### Disaster Recovery Engineering

```
Past                                                                         Future
<--------------------------------------------------------------------------------->
             Last Successful                              Service Fully
             Data Backup                                  Restored
                  |                                            |
                  |<----- RPO ----->|<------- RTO ------->|
                  |                 |                     |
                  |            Disaster Hits              |
```

#### 1. Fundamental Metrics Defined
- **Recovery Point Objective (RPO):** The maximum acceptable age of files or data that must be recovered from backup storage for normal operations to resume if a disaster occurs. Determines allowable **data loss** measured in time units.
- **Recovery Time Objective (RTO):** The maximum acceptable duration of clock time that can elapse before a system must be restored to full operation after a crash. Determines allowable **downtime**.

#### 2. Mathematical Cost Optimization Curve
Let $C_{\text{loss}}(\text{RPO}, \text{RTO})$ represent business loss cost due to downtime and lost transactions, and $C_{\text{prep}}(\text{RPO}, \text{RTO})$ represent the technical infrastructure cost to achieve low RPO/RTO:
$$\text{Total Cost} = C_{\text{loss}}(\text{RPO}, \text{RTO}) + C_{\text{prep}}(\text{RPO}, \text{RTO})$$
- As RPO and RTO approach zero (instantaneous active-active replication), infrastructure cost exponentially accelerates.
- Business systems categorize applications: Tier 1 (Financial ledger: RPO = 0, RTO $< 1$ min); Tier 3 (Archival reporting: RPO = 24 hrs, RTO = 72 hrs).


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners heavily evaluate: Public vs Private vs Hybrid cloud comparison (5 marks), Block vs Object vs File storage (5/10 marks), and Multi-tier HA architecture with Load Balancer and Auto-scaling (10/15 marks).

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
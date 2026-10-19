# BCA-101N: Computer Fundamentals and PC Software
## Unit 3 Master Exam Revision Notes: PC Maintenance, Hardware, Motherboard & Internet Fundamentals
**Target Examination:** MJPRU Bareilly BCA Semester 1 (CBCS Pattern 2024–25)
**Unit Identifier:** `6ac663af-bbc9-4f09-8a83-16faa1b03efb` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **PC Maintenance & Troubleshooting: Opening Cabinet, Block Identification, Assembling & Disassembling**
- [x] **Device Configuration & Driver Installation: Printers, Microphone, Monitor, Sound Card, Video/Display Cards**
- [x] **Motherboard Architecture: Form Factors (AT, ATX, Micro-ATX), Sockets, Chipsets (Northbridge/Southbridge)**
- [x] **Buses & Expansion Slots: PCI, PCIe, AGP, Memory Slots (DIMM, SO-DIMM), Add-on Cards**
- [x] **Ports & Connectors: USB, HDMI, DisplayPort, VGA, Ethernet (RJ-45), Audio Jacks, SATA & Power Connectors**
- [x] **Power Supply Units: SMPS (Switched-Mode Power Supply), Wattage Calculation, Voltages & Connectors**
- [x] **Hardware Storage Media: Primary vs Secondary Storage, Magnetic Hard Disks vs Solid State Drives (NVMe/SATA)**
- [x] **Internet Fundamentals: History, Architecture, World Wide Web (WWW) vs Internet, URLs & HTTP/HTTPS**
- [x] **Web Browsers, IP Addressing (IPv4/IPv6 Basics) & Domain Name System (DNS Resolution)**
- [x] **Internet Infrastructure: ISPs, Search Engines, Net Etiquette, Intranet vs Extranet vs Internet**
- [x] **Electronic Mail (E-mail): Working Architecture, Protocols (SMTP, POP3, IMAP), Mail Formatting, Spam & Filters**
- [x] **Societal Impact of Internet: Education, Research, E-Governance & E-Commerce**
- [x] **Cyber Security Basics: Cybercrimes, Hackers vs Crackers, Phishing, Firewalls & Basic Digital Safety**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is a Computer Motherboard?
**Model Answer:**
The main printed circuit board (PCB) inside a computer that connects and facilitates electrical communication between the CPU, RAM, storage drives, expansion slots, and peripheral interfaces.

### Q2. [2 Marks] Distinguish between AT and ATX Motherboard Form Factors.
**Model Answer:**
**AT (Advanced Technology):** Older form factor, large dimensions, power switch directly routed to high-voltage mains, separate keyboard connector.
**ATX (Advanced Technology Extended):** Modern standard (Intel), integrated I/O backplate, soft power management (standby mode, sleep), improved airflow, 24-pin power connector.

### Q3. [2 Marks] What is the function of the Northbridge and Southbridge Chipset?
**Model Answer:**
**Northbridge:** High-speed controller connecting CPU to high-bandwidth components (RAM, PCIe graphics slot).
**Southbridge:** Slower controller managing I/O peripherals (SATA, USB, audio, BIOS, legacy PCI). Modern CPUs integrate Northbridge functions directly onto the CPU die.

### Q4. [2 Marks] What is BIOS and what is its role during PC startup?
**Model Answer:**
BIOS (Basic Input/Output System) is firmware stored on motherboard ROM/Flash that executes the Power-On Self-Test (POST), initializes hardware controllers, and loads the OS bootloader from storage.

### Q5. [2 Marks] What is the difference between BIOS and UEFI?
**Model Answer:**
**BIOS:** Legacy 16-bit real mode, limited to MBR partition scheme (max 2TB disks), text interface.
**UEFI (Unified Extensible Firmware Interface):** Modern 32/64-bit firmware, supports GPT disks (>2TB, up to 9 ZB), graphical mouse GUI, Secure Boot security.

### Q6. [2 Marks] What is a Device Driver?
**Model Answer:**
A specialized software module that allows the operating system to interact, communicate, and control a specific hardware device (e.g. graphics card, printer).

### Q7. [2 Marks] What is the purpose of the CMOS Battery on the motherboard?
**Model Answer:**
A small CR2032 lithium coin cell that powers the CMOS RAM chip to preserve hardware configuration settings, system real-time clock (date/time), and BIOS passwords when the PC is unplugged.

### Q8. [2 Marks] Name four common motherboard expansion bus slots.
**Model Answer:**
1. PCIe x16 (Graphics Cards)
2. PCIe x1 (Sound/Network cards)
3. Legacy PCI (Older expansion boards)
4. M.2 NVMe Slot (High-speed solid-state drives).

### Q9. [2 Marks] What is ESD (Electrostatic Discharge) and how is it prevented during PC assembly?
**Model Answer:**
ESD is the sudden flow of static electricity between two objects caused by contact. Prevention: wearing an anti-static wrist strap, working on an anti-static mat, and grounding oneself by touching an unpainted metal chassis.

### Q10. [2 Marks] What do BIOS Beep Codes signify during startup?
**Model Answer:**
Audible acoustic diagnostic signals produced by the motherboard buzzer when video display is not yet initialized, reporting specific POST hardware failure codes (e.g. 1 long 2 short beeps = GPU failure; continuous beeping = RAM failure).


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the step-by-step procedure for Assembling a Desktop PC.
**Model Answer:**
1. **Workspace Preparation:** Work on clean, static-free surface with anti-static wrist strap.
2. **CPU Installation:** Open motherboard CPU socket lever, align triangular notch on processor with socket, place gently without forcing, clamp lever.
3. **CPU Cooler & Thermal Paste:** Apply pea-sized thermal paste, mount heatsink, connect 4-pin CPU_FAN header.
4. **RAM Installation:** Open RAM slot clips, align notch on DDR stick with slot key, press firmly until clips click into place.
5. **Mount Motherboard:** Install I/O shield into chassis, secure motherboard onto standoffs with screws.
6. **Power Supply (PSU):** Install PSU, connect 24-pin ATX main power and 8-pin CPU 12V EPS power connectors.
7. **Storage Drives:** Mount SSD/HDD into drive bays, connect SATA data cable to motherboard and SATA power from PSU (or install M.2 NVMe drive directly).
8. **Graphics Card:** Insert GPU into primary PCIe x16 slot, secure bracket, connect 6/8-pin PCIe power cables.
9. **Front Panel Headers:** Connect Power Switch, Reset Switch, Power LED, HDD LED, Front USB, and Audio headers.
10. **Cable Management & Initial POST Test:** Tidy cables with zip ties, connect monitor, keyboard, power cable, and power on for initial BIOS verification.

### Q2. [5 Marks] Describe Motherboard Architecture and its key onboard components.
**Model Answer:**
Key onboard motherboard components:
- **CPU Socket:** Houses the processor (e.g. LGA 1700, AM5).
- **Chipset:** Manages data communication between CPU and system components.
- **DIMM Memory Slots:** 2 to 4 slots for dual-channel DDR4/DDR5 RAM.
- **PCIe Expansion Slots:** High-speed serial expansion slots (x16 for graphics, x1/x4 for cards).
- **Storage Interfaces:** SATA III 6 Gbps ports and M.2 PCIe NVMe slots.
- **Power Connectors:** 24-pin ATX main power and 4/8-pin 12V CPU power connector.
- **VRM (Voltage Regulator Module):** Regulates clean, stable DC voltage to the CPU.
- **I/O Backplate:** External ports (USB, HDMI, Ethernet RJ-45, Audio jacks).
- **Front Panel Header:** Pins connecting power button, reset, and chassis LEDs.

### Q3. [5 Marks] Explain the function and installation of Hardware Device Drivers.
**Model Answer:**
Device drivers act as translators between OS generic API calls and device-specific hardware commands.
**Driver Installation Methods:**
1. **Plug and Play (PnP) / Windows Update:** OS automatically detects hardware ID and installs certified WHQL drivers.
2. **Manufacturer Setup Installer:** Downloading manufacturer package (.exe) containing driver and control panel.
3. **Manual Device Manager Installation:** Right-click hardware entry in Device Manager -> Update Driver -> Browse my computer -> Select `.INF` driver setup file.
**Troubleshooting:** Driver Rollback, Uninstalling corrupted drivers, Safe Mode driver cleanup.

### Q4. [5 Marks] Explain Troubleshooting steps for common PC hardware failure symptoms.
**Model Answer:**
1. **No Power (Dead System):** Check mains outlet, power cable, PSU rocker switch, 24-pin motherboard connector, test PSU with paperclip test.
2. **System Powers On but No Display (Black Screen):** Reseat RAM sticks, test RAM one stick at a time, reseat GPU, verify monitor cable and input source, listen to BIOS beep codes.
3. **Continuous Random Freezing or Blue Screen (BSOD):** Overheating CPU (check thermal paste and fan), failing RAM (run MemTest86), corrupted drivers, or failing storage drive.
4. **Overheating:** Clean accumulated dust from heatsinks with compressed air, reapply thermal paste, verify chassis airflow.
5. **Date/Time resets on every reboot:** Replace dying CR2032 CMOS battery on motherboard.

### Q5. [5 Marks] Explain Video Display Cards and Sound Cards architecture.
**Model Answer:**
- **Video Display Card (GPU):** Contains dedicated graphics processing cores (NVIDIA CUDA / AMD Stream), specialized video memory (VRAM: GDDR6), Digital-to-Analog converter (RAMDAC), and video output ports (HDMI, DisplayPort). Offloads floating-point 3D rendering and video decoding from the CPU.
- **Sound Card:** Contains Digital-to-Analog Converter (DAC) to convert digital audio bits to analog sound waves, Analog-to-Digital Converter (ADC) for microphone inputs, and amplifier circuits for speakers/headphones.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full C code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Provide a detailed technical exposition of Motherboard Chipset Architecture: Northbridge vs Southbridge vs Modern SoC Integration.
**Comprehensive University Solution:**
### 1. Traditional Dual-Bridge Chipset Architecture
For decades, PC motherboards employed a two-chip architecture:
```
                    +-------------------+
                    |    CPU / Core     |
                    +-------------------+
                              ^
                              | Front Side Bus (FSB)
                              v
                    +-------------------+
                    |   NORTHBRIDGE     | <----> System RAM (DDR)
                    | (Memory Controller| <----> PCIe x16 (GPU)
                    |  Hub - MCH)       |
                    +-------------------+
                              ^
                              | Internal Bus (DMI / HyperTransport)
                              v
                    +-------------------+
                    |   SOUTHBRIDGE     | <----> SATA Drives (SSD/HDD)
                    | (I/O Controller   | <----> USB Ports / Keyboard
                    |  Hub - ICH)       | <----> PCI Slots / Audio / LAN
                    +-------------------+
                              |
                              v
                         BIOS / UEFI ROM
```
- **Northbridge (Memory Controller Hub - MCH):** Connected directly to CPU via high-speed Front Side Bus (FSB). Handled memory-intensive operations (RAM access, AGP/PCIe graphics).
- **Southbridge (I/O Controller Hub - ICH):** Connected to Northbridge over a slower link (Intel DMI). Controlled legacy buses, mass storage (SATA), USB ports, real-time clock, audio, and BIOS communication.

### 2. Modern Architectural Transition (SoC / Single-Chip PCH)
- **Integration into CPU Die:** Modern CPUs (Intel Core, AMD Ryzen) integrate the memory controller and primary PCIe lanes directly onto the CPU die, eliminating the Northbridge and eliminating FSB bottlenecks.
- **Platform Controller Hub (PCH):** Modern motherboards retain only a single secondary chipset (PCH) handling SATA, secondary M.2 slots, network controllers, and USB expansion.

### Q2. [10/15 Marks] Explain the Complete PC Assembly and Disassembly Protocol with Safety Standards, ESD Precautions, and Component Identification.
**Comprehensive University Solution:**
### 1. Safety Protocols and ESD Mitigation
- **Electrostatic Discharge (ESD):** Static charges up to 10,000V carried on human clothing can destroy silicon gate oxides invisibly. Prevention requires ESD wrist strap grounded to earth, anti-static work mats, and handling components by their edges.
- **Mains Safety:** Always disconnect AC power cord and hold power button for 5 seconds to discharge motherboard capacitors.

### 2. Disassembly Protocol (Reverse Assembly)
1. Power Disconnection and Peripheral Unplugging.
2. Chassis Removal: Unscrew side panels.
3. Expansion Cards: Unscrew PCIe bracket, release retention tab, pull GPU straight out.
4. Power Cables: Unplug 24-pin ATX, 8-pin CPU, SATA power.
5. Storage Drives & Data Cables: Unplug SATA/M.2 drives.
6. RAM Modules: Depress clips, pull sticks vertically.
7. CPU Cooler & Heatsink: Twist-release retention clips, clean thermal paste with 99% isopropyl alcohol.
8. Processor: Release socket retention lever, lift CPU vertically.
9. Motherboard: Unscrew standoffs, lift board carefully out of chassis.

### Q3. [10/15 Marks] Detail the Diagnostic Troubleshooting Matrix for PC Hardware Failures: Power, Display, Memory, Thermal, and Storage.
**Comprehensive University Solution:**
### Comprehensive Hardware Troubleshooting Matrix

| Problem Symptom | Probable Root Causes | Systematic Diagnostic & Remediation Steps |
|---|---|---|
| **System Completely Dead (No lights, no fan spin)** | 1. Failed PSU
2. Loose 24-pin ATX cable
3. Front panel power switch faulty
4. Motherboard short | 1. Verify wall outlet and power cord.
2. Perform PSU Paperclip Test (jump green pin 16 to black ground pin).
3. Short POWER_SW pins on motherboard directly with screwdriver.
4. Check for burnt capacitors or shorting standoffs. |
| **Fans spin, LEDs on, but No Display (No POST)** | 1. Unseated or faulty RAM
2. GPU unseated or no PCIe power
3. Corrupt BIOS
4. Dead CPU | 1. Listen to BIOS beep codes.
2. Remove all RAM sticks; clean contacts with eraser; test one stick in slot 2.
3. Clear CMOS (short CLR_CMOS jumper or remove battery for 5 mins).
4. Reseat graphics card and verify monitor cable input channel. |
| **System Boots then Shuts Down after 1–2 mins** | 1. Severe CPU overheating
2. Thermal throttling
3. Loose CPU cooler | 1. Enter BIOS hardware monitor to check CPU temp (>90°C indicates thermal shutdown).
2. Verify CPU cooler fan is spinning.
3. Reapply thermal paste and ensure heatsink is clamped firmly. |
| **Blue Screen (BSOD: MEMORY_MANAGEMENT)** | 1. Defective RAM cell
2. Corrupted system drivers | 1. Run Windows Memory Diagnostic or MemTest86 overnight.
2. Replace damaged RAM stick.
3. Boot Safe Mode to inspect dump files via BlueScreenView. |
| **Disk Read Error / Boot Device Not Found** | 1. SATA cable loose
2. Boot order wrong in BIOS
3. Failing drive sectors | 1. Enter BIOS: check if HDD/SSD is recognized.
2. Check SATA data and power cables.
3. Run CHKDSK /F /R or CrystalDiskInfo to inspect S.M.A.R.T. health attributes. |


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
For BCA-101N Unit 3, questions on Northbridge vs Southbridge, BIOS vs UEFI, and the PC assembly steps are top exam favorites. Focus on drawing the Northbridge/Southbridge bus diagram.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
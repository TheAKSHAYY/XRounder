# Secondary Storage Technologies

Primary memory (RAM) is volatile and loses all stored data when electricity is disconnected. **Secondary Storage** provides high-capacity, permanent, non-volatile data persistence.

---

## Comparison of Secondary Storage Technologies

| Feature | Magnetic HDD | Optical Disc (DVD / BD) | Solid-State Drive (SATA) | NVMe SSD (PCIe Gen 4/5) |
| :--- | :--- | :--- | :--- | :--- |
| **Storage Medium** | Magnetized Ferromagnetic Platters | Polycarbonate dye with Laser Pits/Lands | NAND Flash Semiconductor Cells | 3D TLC/QLC NAND Flash |
| **Sequential Read** | 120 – 250 MB/s | 15 – 35 MB/s | 500 – 550 MB/s | 5,000 – 12,000 MB/s |
| **Random Latency** | 5 – 15 milliseconds (ms) | 100 – 150 ms | 50 – 100 microseconds ($\mu$s)| 10 – 20 microseconds ($\mu$s) |
| **Moving Parts** | Spindle motor, voice-coil actuator arm | High-speed optical spindle motor | Zero mechanical parts | Zero mechanical parts |
| **Shock Resistance** | Vulnerable to physical drops/vibration | Fragile (scratches on surface) | High durability & shock resistance | Extremely high durability |
| **Typical Capacity** | 2 TB – 22 TB | 4.7 GB (DVD) – 50 GB (Blu-Ray)| 500 GB – 4 TB | 1 TB – 8 TB |

---

## 1. Magnetic Storage (Hard Disk Drives - HDDs)

```
       +---------------------------------------------+
       |           MAGNETIC PLATTER SURFACE          |
       |                                             |
       |         Track (Concentric Circle)           |
       |       /                                     |
       |     .---.   Sector (512B / 4KB Block)       |
       |    /     \  /                              |
       |   |   O   | ===> Read/Write Head Assembly   |
       |    \     /                                  |
       |     '---'                                   |
       |       |                                     |
       |    Spindle (5400 / 7200 RPM)                |
       +---------------------------------------------+
```

### Components and Working
1. **Platters**: Rigid aluminum or ceramic discs coated with a microscopic magnetic iron-oxide substrate, rotating at 5,400 to 15,000 RPM.
2. **Read/Write Heads**: Aerodynamic sliders flying on a cushion of air nanometers above the spinning platter, detecting magnetic polarity orientations representing binary 0s and 1s.
3. **Geometry**:
   - **Track**: One of hundreds of concentric circular data paths on a platter surface.
   - **Sector**: The smallest addressable physical segment of a track (standardized at 512 bytes or 4,096 bytes under Advanced Format).
   - **Cylinder**: The set of matching tracks across all stacked platter surfaces.

### Latency Calculations in HDDs
The total access time to read data from a magnetic HDD is:
$$	ext{Total Access Time} = 	ext{Seek Time} + 	ext{Rotational Latency} + 	ext{Transfer Time}$$
- **Seek Time**: Mechanical delay while the actuator arm moves the head to the target track (typically 3–9 ms).
- **Rotational Latency**: Time spent waiting for the platter to rotate the target sector beneath the head. Average latency is the time for half a revolution:
  $$	ext{Average Rotational Latency} = rac{1}{2 	imes (	ext{RPM} / 60)}$$
  *(For a 7,200 RPM drive: $pprox 4.16	ext{ ms}$)*.

---

## 2. Solid-State Storage (SSDs & Flash)

Solid-state drives eliminate all mechanical latency by using semiconductor **Floating-Gate Transistors** or **Charge-Trap Flash (CTF)** organized into 3D vertical stacks:

```
+-------------------------------------------------------+
|                    NVMe SOLID STATE DRIVE             |
|                                                       |
|  +---------------------+     +---------------------+  |
|  |   FLASH CONTROLLER  |     |   DRAM CACHE BUFFER |  |
|  | - Wear-leveling     |     | - Fast translation  |  |
|  | - Garbage collection|     |   table (FTL lookup)|  |
|  | - ECC correction    |     +---------------------+  |
|  +----------|----------+                              |
|             | Multi-channel flash bus                 |
|  +----------v--------------------------------------+  |
|  |   3D NAND FLASH DIES (Non-volatile cells)       |  |
|  |   [Page: 4-16 KB]  -->  [Block: 128-512 Pages]  |  |
|  +-------------------------------------------------+  |
+-------------------------------------------------------+
```

### Fundamental Operational Rule of Flash Memory
- **Reads and Writes** occur at the **Page Level** (typically 4 KB to 16 KB).
- **Erasures** can ONLY occur at the **Block Level** (typically 128 to 512 Pages, $pprox 2	ext{ to }8	ext{ MB}$).
- To overwrite existing data, an SSD controller must read the entire block, modify the target page in DRAM, erase the old flash block, and write the new block back. This overhead is managed by the **Flash Translation Layer (FTL)** via **Trim commands** and **Wear Leveling**.

---

## Summary for University Exams

- **Magnetic Disks**: Mechanical latency dominated by Seek Time and Rotational Delay; cost-effective for large cold storage.
- **SSDs**: Solid-state flash memory with no moving parts; 20x to 100x faster random I/O performance.
- **Optical Media**: Uses focused laser reflection differences between surface **Pits** and **Lands** (Infrared for CD, Red laser for DVD, Blue-Violet 405nm laser for Blu-Ray).

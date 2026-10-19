# Memory Hierarchy: Registers, Cache, RAM & ROM

Computer memory design balances three competing engineering trade-offs: **Speed (Access Latency)**, **Cost per Bit**, and **Storage Capacity**. 

To reconcile these constraints, computer architects construct a multi-tiered **Memory Hierarchy**.

---

## The Classical Memory Pyramid

```
                /\
               /  \           Level 0: CPU REGISTERS
              / L0 \          (< 1 ns, Bytes to KB, Extremely Expensive)
             /------\
            /   L1   \        Level 1: L1 CACHE (On-die, ~1 ns, 32-64 KB)
           /----------\
          /     L2     \      Level 2: L2 CACHE (On-die, 3-5 ns, 512KB - 1MB)
         /--------------\
        /       L3       \    Level 3: L3 SHARED CACHE (10-20 ns, 16-64 MB)
       /------------------\
      /      MAIN RAM      \  Level 4: MAIN MEMORY (DRAM, 50-80 ns, 8-64 GB)
     /----------------------\
    /   SECONDARY STORAGE    \ Level 5: SSDs / NVMe / HDDs (Micro- to Milliseconds)
   /--------------------------\
  /     TERTIARY / BACKUP      \ Level 6: Magnetic Tape / Cloud Archive (Seconds)
 /------------------------------\
```

---

## Memory Tier Specifications

| Hierarchy Level | Technology | Typical Capacity | Access Time | Relative Cost | Volatility |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Internal Registers** | Flip-flops (CMOS) | 32 to 64 words | 0.2 – 0.5 ns | Astronomical | Volatile |
| **Level 1 Cache** | Static RAM (6T SRAM) | 32 KB – 128 KB | 0.8 – 1.5 ns | Extremely High | Volatile |
| **Level 2 Cache** | Static RAM (SRAM) | 512 KB – 2 MB | 3 – 5 ns | Very High | Volatile |
| **Level 3 Cache** | Shared SRAM | 16 MB – 96 MB | 10 – 20 ns | High | Volatile |
| **Main Memory (RAM)** | Dynamic RAM (DRAM) | 8 GB – 128 GB | 50 – 80 ns | Moderate | Volatile |
| **Solid-State Drive** | NAND Flash Memory | 512 GB – 4 TB | 15 – 50 $\mu$s | Low | Non-Volatile |
| **Hard Disk Drive** | Magnetic Platters | 1 TB – 20 TB | 5 – 15 ms | Very Low | Non-Volatile |

---

## Random Access Memory (RAM): SRAM vs. DRAM

RAM allows random, immediate access to any memory address with uniform latency regardless of its physical coordinate.

```
       STATIC RAM CELL (6-Transistor)          DYNAMIC RAM CELL (1T + 1C)
             Vdd                                           Bit Line
              |                                               |
         [P1]   [P2]                                          |
           \     /                                      [Transfer Gate]
            X---X  <-- Cross-coupled                       ---|--- Word Line
           /     \      Inverters                             |
         [N1]   [N2]                                     +-----+
          |       |                                      | === | Capacitor (Stores Charge)
         GND     GND                                     +-----+
                                                            |
   (Holds state indefinitely while powered)                GND (Leads charge; requires refresh)
```

### In-Depth Comparison: SRAM vs. DRAM

| Comparison Metric | Static RAM (SRAM) | Dynamic RAM (DRAM) |
| :--- | :--- | :--- |
| **Basic Storage Element** | 4 to 6 transistor bistable flip-flop latch | 1 transistor + 1 tiny capacitor cell |
| **Need for Refreshing** | **No** (Retains charge as long as Vdd supplied) | **Yes** (Capacitor leaks charge; refreshed every 64 ms) |
| **Access Latency** | Extremely fast (0.5 – 5 ns) | Slower (50 – 80 ns) |
| **Physical Density** | Low (Large 6-transistor footprint per bit) | Very High (1 transistor allows billions of cells per die) |
| **Power Consumption** | Low dynamic, higher static leakage | High during periodic capacitive refresh cycles |
| **Manufacturing Cost** | Expensive per gigabyte | Economical per gigabyte |
| **Primary Placement** | CPU L1, L2, L3 Cache memory | Main System RAM (DDR4, DDR5 modules) |

---

## Read-Only Memory (ROM) Variants

ROM is non-volatile memory that retains stored bootstrap instructions even when the system is completely powered down.

1. **Mask ROM (MROM)**: Hardwired physically at the silicon fabrication plant during photolithography. Permanent and impossible to alter.
2. **PROM (Programmable ROM)**: Shipped unprogrammed with internal microscopic fuses. A technician uses a specialized PROM Programmer to burn fuses permanently ("one-time programmable").
3. **EPROM (Erasable Programmable ROM)**: Contains a transparent quartz crystal window above the silicon die. Exposing the chip to intense **Ultraviolet (UV) light** for 20–30 minutes discharges all floating gates, resetting the chip for reprogramming.
4. **EEPROM (Electrically Erasable Programmable ROM)**: Can be erased and rewritten byte-by-byte using electrical voltage pulses in-circuit without removing the chip.
5. **Flash Memory**: High-density variant of EEPROM that erases and writes data in multi-kilobyte blocks rather than single bytes. Forms the basis of modern BIOS/UEFI firmware chips, USB drives, and SSDs.

---

## The Principle of Locality of Reference

Cache memory functions effectively due to a predictable behavioral property of computer programs called **Locality of Reference**:
- **Temporal Locality**: If a memory location was accessed once, it is highly likely to be accessed again in the near future (e.g., loop counters, accumulator variables).
- **Spatial Locality**: If a memory location is accessed, nearby contiguous addresses are likely to be accessed soon (e.g., sequential array iterations, linear instruction fetch).

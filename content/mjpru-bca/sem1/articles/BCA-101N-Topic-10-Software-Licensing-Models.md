# Software Licensing Models

Software is intellectual property protected by international copyright laws. When an individual or corporation purchases software, they purchase a **license granting defined usage rights**, rather than outright ownership of the underlying source code.

---

## The Software Legal Spectrum

```
[  OPEN SOURCE & FREE SOFTWARE  ] <=======================> [ PROPRIETARY CLOSED SOURCE ]
- Complete Source Code Access                                 - Binary Machine Code Only
- Modification & Redistribution                              - Restricted Usage Rights
- Public Collaborative Auditing                               - Trade Secrets Protected
(GPL, MIT, Apache, BSD)                                      (Commercial EULAs)
```

---

## In-Depth Comparison Matrix of Licensing Models

| License Model | Monetary Cost | Source Code Access | Modification Permitted | Redistribution Permitted | Functional Limitations | Representative Examples |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FOSS / Free Software** | Zero (Gratis) or Paid | **Full Source Code** | **Yes** (Unrestricted) | **Yes** (Under license terms) | None | Linux Kernel, GNU Utilities, Apache HTTP Server |
| **Freeware** | Zero ($0.00) | **No** (Closed binary) | **No** | **Yes** (Without charging) | Full software functionality | Adobe Acrobat Reader, VLC Player, Google Chrome |
| **Shareware** | Free evaluation; paid afterward | **No** (Closed binary) | **No** | Permitted during trial | Time-limited (e.g., 30-day trial) | WinRAR, early IDM, Total Commander |
| **Demoware / Crippleware**| Zero for demo | **No** (Closed binary) | **No** | Permitted for demo | Core features locked (e.g., "Save" disabled, watermark) | Video editors exporting with watermarks, game demos |
| **Proprietary / Commercial**| Paid per seat / license | **No** (Strict Trade Secret) | **No** (Violation of EULA) | **No** (Illegal piracy) | Enforced via license activation keys / DRM | Microsoft Windows, MS Office, Oracle Database |
| **Firmware** | Bundled with hardware | Usually closed (Unless open core)| **No** | Not applicable | Hard-coded to specific hardware revision | Motherboard UEFI/BIOS, Router microcode |

---

## The Philosophy of Free Software (FOSS)

Championed by **Richard Stallman** in 1983 via the GNU Project and Free Software Foundation (FSF), Free Software centers on **liberty, not price** (*"Free as in free speech, not as in free beer"*).

### The Four Essential Freedoms
- **Freedom 0**: The freedom to run the program for any purpose without restriction.
- **Freedom 1**: The freedom to study how the program works and adapt it to your computing needs (requires source code access).
- **Freedom 2**: The freedom to redistribute exact copies to help your neighbor.
- **Freedom 3**: The freedom to improve the program and release your improvements to the public.

### Copyleft vs. Permissive Licenses
- **Copyleft (e.g., GNU GPL v3)**: Requires that any modified or derivative software must also be distributed under the exact same open terms ("hereditary freedom").
- **Permissive (e.g., MIT, BSD, Apache 2.0)**: Allows developers to take the source code, modify it, and even incorporate it into closed-source commercial software without releasing changes.

---

## Firmware: The Hardware-Software Nexus

> [!NOTE]
> **Firmware** is a specialized category of software permanently written into non-volatile memory (ROM, EEPROM, or Flash) on a hardware device. It executes initial hardware power-on diagnostics (POST) and acts as the basic operational interface for higher-level operating systems.

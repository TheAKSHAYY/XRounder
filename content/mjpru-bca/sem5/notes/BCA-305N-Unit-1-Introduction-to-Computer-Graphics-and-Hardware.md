# BCA-305N: Computer Graphics and Animation
## Unit 1 Master Exam Revision Notes: Introduction to Computer Graphics, Hardware & Display Devices
**Target Examination:** MJPRU Bareilly BCA Semester 5 (CBCS Pattern 2024–25)
**Unit Identifier:** `1c65979d-2be0-55e5-80f5-ce91af8c4225` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **History and Evolution of Computer Graphics: Whirlwind Computer, Sketchpad (Ivan Sutherland), Evolution to GPU-Driven Real-Time Rendering**
- [x] **Definition and Broad Classifications: Interactive vs Passive Graphics, Vector Graphics vs Bitmap/Raster Graphics**
- [x] **Major Applications of Computer Graphics: CAD/CAM, Scientific Visualization, Entertainment & Animation, Medical Imaging, Graphic User Interfaces**
- [x] **Cathode Ray Tube (CRT) Physics: Electron Gun, Accelerating Anode, Deflection Yoke, Phosphor Screen, Persistence, Aspect Ratio**
- [x] **Refresh CRT Display Systems: Frame Buffer, Refresh Rate (Hz), Interlacing vs Non-Interlaced Scanning**
- [x] **Raster Scan Display Architecture: Electron Beam Traversal, Horizontal Retrace, Vertical Retrace, Raster Scan Controller**
- [x] **Random Scan (Vector / Calligraphic) Display Systems: Electron Beam Directed Deflection, High-Resolution Line Rendering, Comparison with Raster Displays**
- [x] **Color CRT Systems: Beam Penetration Method (Two Layers) vs Shadow Mask CRT Method (Delta/In-Line Triads, Color Purity)**
- [x] **Flat Panel Display Technologies: Plasma Display Panels (Gas Discharge, UV Light, Phosphors), Liquid Crystal Display (LCD - Twisted Nematic, TFT-LCD)**
- [x] **Light Emitting Diode (LED) & Organic LED (OLED) Displays: Working Principles, Advantages over Traditional Backlit Panels**
- [x] **Interactive Input Devices: Digitizing Graphics Tablets, Light Pens, Optical Mice, Joysticks, Trackballs, Data Gloves**
- [x] **Graphics Software Architectures & Standards: GKS (Graphical Kernel System), PHIGS, OpenGL & DirectX Hardware Abstraction**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is Computer Graphics and what are its two broad classifications?
**Model Answer:**
Computer Graphics involves the creation, manipulation, storage, and rendering of pictorial images using digital computers. The two classifications are **Interactive Graphics** (user interacts in real-time, e.g., video games, GUI) and **Non-Interactive / Passive Graphics** (static rendering, e.g., print posters, pre-rendered video).

### Q2. [2 Marks] Explain the working principle of a Cathode Ray Tube (CRT).
**Model Answer:**
An electron gun emits a focused beam of high-velocity electrons accelerated by an anode. Deflection coils (electrostatic or electromagnetic) steer the beam across a phosphor-coated screen. When electrons strike the phosphor, energy is emitted as visible light (phosphorescence/fluorescence).

### Q3. [2 Marks] Differentiate between Refresh Rate and Frame Buffer.
**Model Answer:**
- **Refresh Rate:** The frequency at which the display screen is redrawn per second to prevent visible flicker, measured in Hertz (typically 60Hz to 144Hz).
- **Frame Buffer:** A dedicated region of memory that stores the color/intensity values for each pixel displayed on the screen.

### Q4. [2 Marks] Compare Raster Scan Displays and Random Scan (Vector) Displays.
**Model Answer:**
| Dimension | Raster Scan Display | Random Scan (Vector / Calligraphic) |
| :--- | :--- | :--- |
| **Beam Movement**| Scans entire screen row by row (raster lines) | Deflected directly to draw line segments |
| **Memory** | Frame buffer stores every pixel bitmap | Display buffer stores line drawing commands |
| **Resolution** | Limited by pixel grid (aliasing / jaggies) | Higher resolution, smooth vector lines |
| **Cost / Realism**| Economical, realistic scenes & photographs | Expensive, limited to line-drawing / wireframe |

### Q5. [2 Marks] What are the two color CRT display techniques?
**Model Answer:**
1. **Beam Penetration Method:** Used in random scan; uses layers of red and green phosphors; color depends on electron acceleration voltage.
2. **Shadow Mask Method:** Used in raster scan; uses triads of red, green, and blue phosphor dots aligned with a perforated shadow mask.

### Q6. [2 Marks] Explain Aspect Ratio in computer displays.
**Model Answer:**
Aspect Ratio is the proportional ratio of a display screen's width to its height: $\text{Aspect Ratio} = \frac{\text{Width}}{\text{Height}}$ (e.g., standard $4:3$, widescreen $16:9$, ultra-wide $21:9$).

### Q7. [2 Marks] What is the role of the Video Controller in a display system?
**Model Answer:**
The Video Controller reads pixel values from the frame buffer at the refresh rate, converts digital color coordinates into analog signals via DAC (Digital-to-Analog Converter), and synchronizes horizontal and vertical retrace signals.

### Q8. [2 Marks] What is Aliasing and Anti-Aliasing?
**Model Answer:**
- **Aliasing:** Distortion or jagged 'staircase' effects appearing on diagonal lines and curves due to discrete pixel sampling.
- **Anti-Aliasing:** Smoothing techniques that assign intermediate shades/intensities to neighboring boundary pixels (e.g., supersampling, subpixel rendering).

### Q9. [2 Marks] Compare Flat Panel Displays: LCD vs LED vs OLED.
**Model Answer:**
- **LCD:** Liquid Crystal Display modulated by an external cold-cathode fluorescent lamp (CCFL) backlight.
- **LED:** LCD display using light-emitting diodes for backlight (thinner, higher contrast).
- **OLED:** Organic LEDs where each pixel emits its own light (true deep blacks, infinite contrast, no backlight).

### Q10. [2 Marks] What is Persistence in CRT phosphors?
**Model Answer:**
Persistence is the time duration required for the emitted phosphorescent light to decay to 10% of its initial peak luminance after the electron beam is removed.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain the Architecture of a Raster Scan Display System with a Block Diagram.
**Model Answer:**
```
+---------------------+          +------------------------+
|   CPU / Processor   | -------> | System Memory (RAM)    |
+---------------------+          +------------------------+
          |                                  |
          v                                  v
+---------------------+          +------------------------+
| Display Processor   | <------> | Frame Buffer (VRAM)    |
+---------------------+          +------------------------+
                                             |
                                             v
                                 +------------------------+
                                 | Video Controller (DAC) |
                                 +------------------------+
                                             |
                                             v
                                 +------------------------+
                                 | Raster Display (CRT/LED|
                                 +------------------------+
```
- The **Display Processor** scan-converts geometric primitives into pixel coordinate values in the **Frame Buffer**.
- The **Video Controller** reads coordinates via raster scan lines, generating Horizontal and Vertical sync pulses.

### Q2. [5 Marks] Compare Shadow Mask CRT and Beam Penetration CRT.
**Model Answer:**
| Feature | Beam Penetration Method | Shadow Mask Method |
| :--- | :--- | :--- |
| **Display Type** | Random Scan (Vector) | Raster Scan |
| **Phosphor Structure**| Two concentric layers (Red outer, Green inner) | Delta or Inline triads of R, G, B dots |
| **Color Range** | Only 4 colors (Red, Green, Orange, Yellow) | Millions of full RGB true colors |
| **Cost** | Low cost | Higher cost |
| **Resolution** | Sharp lines, no shadow mask occlusion | Excellent photo-realism, limited by shadow mask pitch |

### Q3. [5 Marks] Explain Horizontal Retrace and Vertical Retrace in Raster Displays.
**Model Answer:**
1. **Horizontal Retrace:** After completing a single horizontal scan line from left to right, the electron beam is blanked and rapidly returned to the left edge of the next line below.
2. **Vertical Retrace:** When the beam reaches the bottom-right corner of the screen, it is blanked and returned diagonally to the top-left corner to begin the next refresh cycle.

```
Left -------------------------> Right (Active Scan Line)
  < - - - - - - - - - - - - - - - (Horizontal Retrace - Blanked)
Left -------------------------> Right
  \ 
   \ - - - - - - - - - - - - - - (Vertical Retrace - Blanked to top)
```

### Q4. [5 Marks] Explain the Memory Calculation for a True-Color Frame Buffer.
**Model Answer:**
### Frame Buffer Storage Formula:
$$\text{Total Memory (Bytes)} = \frac{\text{Horizontal Resolution} \times \text{Vertical Resolution} \times \text{Color Depth (bits)}}{8}$$
- **Example:** For a Full HD Display ($1920 \times 1080$) at 24-bit True Color (8 bits each for R, G, B):
  $$\text{Pixels} = 1920 \times 1080 = 2,073,600 \text{ pixels}$$
  $$\text{Total Bits} = 2,073,600 \times 24 = 49,766,400 \text{ bits}$$
  $$\text{Total Bytes} = \frac{49,766,400}{8} = 6,220,800 \text{ Bytes} \approx \mathbf{5.93 \text{ MB}}$$

### Q5. [5 Marks] Describe Graphics Standards: GKS, PHIGS, and OpenGL.
**Model Answer:**
- **GKS (Graphical Kernel System):** First ISO graphics standard (1984), offering 2D primitive drawing across diverse hardware.
- **PHIGS (Programmer's Hierarchical Interactive Graphics System):** Extended GKS into 3D hierarchical modeling and nested scene graphs.
- **OpenGL:** Industry-standard cross-language, cross-platform graphics API for hardware-accelerated 2D and 3D rendering.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Provide an In-Depth Architectural Comparison of Raster Scan and Vector Scan Systems with Complete Schematics and Engineering Trade-offs.
**Comprehensive University Solution:**
### Comprehensive Comparative Engineering Analysis

```
[ RASTER SCAN ARCHITECTURE ]                     [ VECTOR SCAN ARCHITECTURE ]

  +---+---+---+---+---+                            A +--------------+ B
  | * | * | * | * | * | (Row 1)                       \            /
  +---+---+---+---+---+                                \          /
  |   |   | * |   |   | (Row 2)                         \        /
  +---+---+---+---+---+                                  \      /
  |   |   | * |   |   | (Row 3)                         C +----+ D
  +---+---+---+---+---+                                 
  (Pixel Grid Array Representation)               (Direct Electron Deflection Vectors)
```

#### 1. Electron Beam Deflection Mechanics:
- **Raster Scan:** The electron beam sweeps continuously across the entire screen surface row-by-row, from top to bottom, modulating intensity at each discrete pixel coordinate. Deflection circuitry operates on constant sawtooth frequencies.
- **Vector Scan:** The electron beam is steered strictly along the mathematical line segments comprising the graphic object. The beam is turned on only when drawing lines between specified endpoint coordinates and turned off during repositioning.

#### 2. Frame Buffer and Refresh Pipeline:
- **Raster Scan:** Frame buffer stores an exact binary or RGB bitmap representing every addressable pixel on screen. Refresh rate is fixed (60–144 Hz) irrespective of scene complexity.
- **Vector Scan:** Stores a sequential display list of vector drawing commands (e.g., `LINE(X1, Y1, X2, Y2)`). Refresh rate is inversely proportional to the number of lines; highly complex scenes result in visible flicker.

#### 3. Detailed Comparative Matrix:
| Feature | Raster Scan Display | Vector (Random Scan) Display |
| :--- | :--- | :--- |
| **Rendering Basis** | Discrete 2D pixel array | Mathematical line vectors |
| **Scan Conversion** | Required (converts math curves to pixels) | Not required (direct analog deflection) |
| **Image Realism** | Photorealistic, solid shaded polygons | Wireframe drawings only |
| **Aliasing (Jaggies)**| Inherent without anti-aliasing filters | Perfectly smooth lines with zero aliasing |
| **Cost of Hardware** | Low to moderate (Standard consumer tech) | High (Specialized high-speed deflection coils) |
| **Modern Relevance** | Universal (Monitors, TVs, Smartphones) | Obsolete (Restricted to niche radar/oscilloscopes) |

### Q2. [10/15 Marks] Explain the Shadow Mask CRT Color Display Mechanism with Gun Geometry and Convergence Alignment.
**Comprehensive University Solution:**
### Shadow Mask Color CRT Geometry

```
   ELECTRON GUNS                SHADOW MASK                 PHOSPHOR SCREEN
   +-------------+
   | Red Gun     |---\
   +-------------+    \
   +-------------+     ===>  [ perforated ]  =====>  [ R ] [ G ] [ B ]
   | Green Gun   |========>  [ metal grid ]  =====>  [ Triad Dots    ]
   +-------------+    /
   +-------------+---/
   | Blue Gun    |
   +-------------+
```

#### Operational Mechanics:
1. **Electron Gun Cluster:** Three separate cathode electron guns (Red, Green, Blue) are arranged in either a **Delta (triangular)** or **Inline (horizontal)** configuration.
2. **Shadow Mask:** A thin, high-precision metal sheet with tiny chemical etchings/holes positioned directly in front of the phosphor screen.
3. **Beam Convergence:** The three electron beams are deflected simultaneously by magnetic deflection yokes. As they pass through a specific aperture hole in the shadow mask, their geometric angles converge precisely so that:
   - The Red beam strikes **only** the Red phosphor dot.
   - The Green beam strikes **only** the Green phosphor dot.
   - The Blue beam strikes **only** the Blue phosphor dot.
4. **Color Mixing:** By varying the relative current intensity of each gun across 256 levels (8 bits), the human eye fuses the closely spaced RGB phosphor triad into any of $256^3 = 16.7 \text{ million}$ distinct colors.

### Q3. [10/15 Marks] Explain Flat Panel Display Technologies: Liquid Crystal Display (LCD) and Active Matrix TFT Architecture.
**Comprehensive University Solution:**
### Thin-Film Transistor (TFT) Active Matrix LCD

```
[ Backlight ] ---> [ Polarizer 1 ] ---> [ Glass / TFT Layer ] ---> [ Liquid Crystals ] ---> [ Color Filter ] ---> [ Polarizer 2 ] ---> Output Light
```

#### Physics and Operation:
1. **Polarization:** Unpolarized backlight passes through the first linear polarizing filter, allowing only vertically polarized light through.
2. **Nematic Liquid Crystals:** When no electrical voltage is applied, the twisted nematic (TN) liquid crystal molecules form a 90-degree helical twist, rotating the polarized light by 90 degrees so it passes through the perpendicular second polarizer (Screen appears bright).
3. **Voltage Application:** When a voltage is applied by the per-pixel **TFT switch**, the liquid crystal molecules untwist and align with the electric field. The light is not rotated and is completely blocked by the second polarizer (Screen appears dark).
4. **Active Matrix Addressing:** Each pixel is driven by an independent capacitor and thin-film transistor, eliminating cross-talk and providing fast refresh rates suitable for high-speed video.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners heavily test: Raster vs Random scan comparison table (guaranteed 5-10 marks), Shadow Mask CRT operation, and Frame buffer memory calculations.

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*
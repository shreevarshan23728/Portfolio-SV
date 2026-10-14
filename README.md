# ENTER ANOTHER DIMENSION // 3D WebGL Odyssey

An extraordinary, cinematic, and interactive 3D WebGL website engineered with **React**, **TypeScript**, **Three.js**, **React Three Fiber**, **Drei**, and **Tailwind CSS**. Built to feel like a high-end digital art installation and award-winning Awwwards interactive experience.

---

## 🌌 Visual Direction & Philosophy

- **Atmosphere:** Deep obsidian space (`#030305`) enveloped in exponential atmospheric fog.
- **Surfaces:** Ultra-reflective metallic chrome and polished silver materials featuring Physically Based Rendering (PBR with clearcoat, roughness damping, and metallic envMap reflection).
- **Lighting:** Dynamic orbiting electric blue (`#00f0ff`) and neon violet (`#8a2be2`) point lights paired with sharp directional chrome key lights and volumetric rim lighting.
- **Typography:** Oversized editorial display typography using **Syne** and **Space Grotesk**, accented by restrained **JetBrains Mono** for technical telemetry HUDs and coordinates.
- **Audio Synthesizer:** Real-time Web Audio API ambient spatial synthesizer generating deep sub-bass cosmic drones, resonant harmonic pulses, and chimes with zero external audio assets.

---

## 🧭 Multi-Section Scroll Storytelling (5 Chapters)

### 01 // ORIGIN (Hero Introduction)
- Colossal, intricate abstract mechanical sculpture (**The Chrono-Core**) floating in darkness.
- Concentric metallic gyro-rings rotating around an energetic quantum crystal core.
- Subtle pointer parallax tilting and idle gyroscopic rotations.
- **Interactions:**
  - Click the core directly or click *"PULSE ARTIFACT CORE"* to trigger an expanding radial shockwave, resonance pulse, and synthesizer feedback.
  - Hover over the core to accelerate rotational kinetic energy.

### 02 // RECONFIGURATION (Transformation)
- As the user scrolls, the camera sweeps along a 3D spline trajectory around the sculpture.
- The concentric mechanical rings expand outward in 3D space (`z` and `radius`), exposing the internal quantum energy conduits.
- Technical telemetry panels display live expansion ratios ($1.618\phi$), gimbal synchronicity, and PBR roughness metrics.

### 03 // DEEP SPACE (Immersion)
- Camera dives deeper past the core into a monumental sanctuary of floating obsidian monoliths and obelisks.
- Thousands of procedural particles stream forward through deep space coordinates with scroll-velocity acceleration.
- Atmospheric horizon ribbons and volumetric zero-gravity kinematics.

### 04 // THE TRIAD OF RELICS (Interactive Showcase)
- Camera transitions before three distinct floating 3D artifacts:
  1. **THE CHRONO RELIC (Temporal Flux Core):** Polished chrome dodecahedron with rotating time-dilation rings.
  2. **NEURAL MONOLITH (Synaptic Cortex):** Deep obsidian geodesic sphere with glowing purple wireframe synaptic dendrites.
  3. **QUANTUM PRISM (Refractive Singularity):** Iridescent silver and emerald octahedron that refracts light into multi-dimensional spectra.
- **Selection Interaction:**
  - Click any 3D artifact directly in the canvas or click its HUD card below.
  - The 3D camera smoothly glides and zooms into that specific artifact.
  - Opens a detailed holographic inspection HUD with live frequency, coherence ratio, flux density, and interactive quantum tuning sliders.

### 05 // THE HORIZON (Cinematic Conclusion)
- Monumental closing statement: *"THE LIMIT IS YOUR IMAGINATION. The future is not something you enter. It is something you build."*
- **Action Triggers:**
  - **ENTER 3D FREE-FLY MODE:** Unlocks 360° `OrbitControls` so visitors can freely navigate, pan, and zoom around all 3D geometries in the scene.
  - **RESTART SEQUENCE:** Smoothly rolls back to the beginning.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS + Custom CSS Scanlines, Film Grain, and Glassmorphic HUD Panels
- **3D Engine:** Three.js + `@react-three/fiber` + `@react-three/drei`
- **Audio:** Native Web Audio API Synthesizer (Zero asset dependencies)
- **Icons:** Lucide React

---

## 🚀 How to Run Locally

The development server is currently live:
```bash
# Start development server
npm run dev

# Or specify host and port
npm run dev -- --host --port 5173
```
Visit: **[http://localhost:5173](http://localhost:5173)**

To create an optimized production bundle:
```bash
npm run build
npm run preview
```

---

## 🎮 Interactive Controls Summary

| Action | Control | Result |
| :--- | :--- | :--- |
| **Parallax Tilt** | Move mouse / pointer | Subtly rotates camera and sculpture |
| **Scroll Travel** | Scroll mouse wheel | Drives camera through all 5 chapters |
| **Resonate Core** | Click central sculpture | Fires radial shockwave & audio pulse |
| **Select Relic** | Click any of the 3 relics | Glides camera to relic & opens HUD |
| **Free-Fly 3D** | Click "3D FREE-FLY" button | Unlocks full 360° orbital camera |
| **Audio Toggle** | Click "AUDIO: ON/OFF" | Toggles spatial drone & synth sound |

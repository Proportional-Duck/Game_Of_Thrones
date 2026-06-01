# 🐉 Westeros Chronicle — Game of Thrones 3D Companion Guide

An immersive, premium 3D web experience built to help newcomers understand the lore, lands, houses, timelines, and characters of *Game of Thrones* without needing to watch a single minute of the show.

🔗 **Live Production Demo:** **[https://game-of-thrones-flame.vercel.app/](https://game-of-thrones-flame.vercel.app/)**

---

## 🌟 Breathtaking Core Features

### 1. 🎬 Cinematic Dragon Fire Intro
- Starts in pitch-black darkness. Red-hot glowing dragon eyes and heavy horn silhouettes emerge while the screen shakes dramatically in response to a simulated dragon roar.
- A glowing white-hot fire core charges up in the throat, unleashing a massive torrent of fire particles directly at the screen.
- The flames expand dynamically until the screen is fully blanketed in a hot orange-white gradient, smoothly fading out to reveal the main website.

### 2. 🏠 Throne Room & Staggered Sword Assembly
- Features a **highly detailed, realistic 3D Iron Throne** built in WebGL using pure Three.js.
- Each sword is fully modeled with a double-edged steel blade, hilt, grip, and pommel.
- Over **130 swords fly in dynamically** from a spherical dome off-screen upon load, using a staggered delay sequence and a custom cubic-ease-out curve to snap firmly into place.
- Interactive glassmorphic HUD tracks the assembly progress from 0% to 100%, offering a "Re-Forge Throne" trigger.

### 3. 🗺️ Westeros 3D Interactive Map
- Displays a rotating stylized **3D gold-wireframe globe** representing Westeros.
- Features glowing coordinate rings and colored interaction pins mapped to Winterfell, King's Landing, Casterly Rock, Highgarden, Sunspear, and Pyke.
- Clicking any pin smoothly rotates the globe to focus on that region, opening a detailed parchment scroll showing seats, words, geography, and deep lore.

### 4. 🛡️ Great Houses (3D Flip Shields)
- Leverages realistic 3D perspective card-flips (`transform-style: preserve-3d`) to show the crests of House Stark, Lannister, Targaryen, Baratheon, Tyrell, and Greyjoy.
- Details unique values, military strengths, alliances, political difficulty metrics, and historical backgrounds.

### 5. 👥 Character Encyclopedia (Spoiler Shields)
- Profiles the show's 6 main drivers (Jon Snow, Daenerys Targaryen, Tyrion Lannister, Arya Stark, Ned Stark, Cersei Lannister).
- Identifies status (Alive, Dead, or Undead) and includes **collapsible spoiler gates** so users can read their exact final endings without spoiling it for their future viewing by default.

### 6. 📜 The Chronicle (Chronological Gates)
- Traces the narrative storyline across **6 clear chronological stages** (from Robert's Rebellion through the Battle of Winterfell and the final melting of the Iron Throne), outlining plot points, tragedies, and critical consequences.

### 7. 🔮 Lore Vault & Dragon Flame Simulator
- Explores critical myths (Dragons & Magic, The White Walkers, The Ice Wall, and The Iron Throne).
- Includes a **live interactive canvas simulator** where users can choose to breathe Fire (Drogon) or sub-zero Ice flames (Viserion) using custom-computed heat particle equations.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Core** | **React + Vite** | Lightweight framework & high-speed compilation |
| **3D Rendering** | **Three.js (Pure WebGL)** | Interactive Iron Throne, 3D Westeros Globe, and particle fields |
| **Styling** | **Vanilla CSS (Premium Design)** | Custom gold/amber variables, glassmorphic panels, responsive grid alignment |
| **Typography** | **Google Fonts** | *Cinzel Decorative* (Medieval titles) & *Crimson Pro* (Parchment body lore) |

---

## 📁 Project Architecture

```
GOT/
├── public/
│   └── favicon.svg           # High-fidelity custom dragon favicon logo
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── IronThrone.jsx     # WebGL realistic throne & staggered assembly sequence
│   │   │   ├── WesterosGlobe.jsx  # WebGL interactive globe, pins, and raycaster
│   │   │   └── ParticleField.jsx  # Canvas-based falling snow & rising fire embers
│   │   └── ui/
│   │       ├── Navbar.jsx         # Sticky glassmorphic nav & 360° rotating dragon logo
│   │       └── IntroSequence.jsx  # Full-screen screen-shaking dragon fire intro
│   ├── pages/
│   │   ├── Hero.jsx               # Landing page viewport
│   │   ├── Map.jsx                # Map sidebar information & parchment lore card
│   │   ├── Houses.jsx             # 3D perspective flip shields
│   │   ├── Characters.jsx         # Encyclopedia profiles & spoiler toggles
│   │   ├── Timeline.jsx           # Chronology narrative gates
│   │   └── Lore.jsx               # Lore vaults & live dragon breath simulator
│   ├── App.jsx               # Main viewport, state page coordinator, background particles
│   ├── index.css             # Cinematic styling guidelines & gold/amber variable sets
│   └── main.jsx              # React mounting coordinator
├── index.html                # Main template with cinematic SEO tags
└── package.json              # Direct Three.js & Lucide-react dependency lists
```

---

## ⚡ Development Commands

To run or build the application locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Dev Server
```bash
npm run dev
```
*Accessible at [http://localhost:5173/](http://localhost:5173/)*

### 3. Compile Production Assets
```bash
npm run build
```
*Outputs static production bundles to `/dist` in under 500ms.*


# 🎮 Game Hub – Explore, Play & Learn with 3D in the Browser

**Game Hub** is an interactive web application showcasing multiple creative 3D experiences using **Three.js**, **React Three Fiber**, and external APIs like **Google Maps** and **Open-Meteo**.

This project was created as a personal learning journey to explore modern browser graphics, game logic, and real-world API integration — all using the power of **React**.

---

## ✨ Features

- 🗺️ **3D Map Explorer**  
  Walk across real-world locations with Google Maps, collect stars, and get live weather updates.

- 👻 **Ghost Adventure Game**  
  Choose a 3D character and navigate a fun interactive environment with scoring and jumping mechanics.

- 🧘 **Meditation Scene**  
  A peaceful space with ambient visuals designed for relaxation and reflection.

- 🎮 **Player Selection UI**  
  Choose characters and starting locations with a simple interface.

- ☔ **Rain Visual Effect**  
  Realistic animated rain using `BufferGeometry` and custom movement logic.

- 📦 Built with:
  - React + Vite
  - @react-three/fiber, drei, rapier
  - Google Maps JavaScript API
  - Open-Meteo API
  - Tailwind CSS

---
## 📸 Screenshots

### 👻 Ghost Adventure
<img src="/public/screenshots/Screenshot 2025-03-28 at 15.44.00.png" alt="Ghost Adventure" width="100%" />

### 🧘 Meditation Scene
<img src="/public/screenshots/Screenshot 2025-03-28 at 15.42.27.png" alt="Meditation Scene" width="100%" />

### 🗺️ 3D Map Explorer
<img src="/public/screenshots/Screenshot 2025-03-28 at 15.43.38.png" alt="Map Explorer" width="100%" />

---

## 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/your-username/game-hub.git
cd game-hub

# Install dependencies
npm install

# Add environment variables
cp .env.example .env
```

Edit `.env`:
```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

---

## 🚀 Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## 🌐 Deploying

### 🔗 Vercel (Recommended)
- Import your GitHub repo at [vercel.com](https://vercel.com)
- Add your environment variable: `VITE_GOOGLE_MAPS_API_KEY`
- Click **Deploy**

### 📦 GitHub Pages
```bash
npm install gh-pages --save-dev
npm run build
npm run deploy
```

Update `package.json`:
```json
"homepage": "https://your-username.github.io/game-hub",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

---

## 📁 Project Structure

```
src/
├── assets/                # 3D models, images
├── components/            # Navbar, reusable UI
├── pages/                 # Home, About, Contact
├── scenes/                # Meditation, Ghost Game, Map Explorer
├── styles/                # Tailwind and custom CSS
└── App.jsx
```

---

## 📄 Environment Variables

```env
# .env.example
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

---

## 🙋 About the Project

This is a student-built, educational project exploring how to:
- Render and animate 3D models in the browser
- Connect Three.js to external APIs
- Build engaging experiences with WebGL and React

---

## 📬 Contact

💌 gamehub@example.com  
🌐 [GitHub](https://github.com/your-username/game-hub)

---

## 📄 License

MIT — free to use, remix, and learn from.

---

### 🧠 Tip

> Want to extend the project? Add:
> - Sound effects & background music  
> - Game save / high score system  
> - Multiplayer or leaderboard support  
> - VR compatibility!

---

Thanks for visiting Game Hub! 🚀

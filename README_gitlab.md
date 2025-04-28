

# 🎮 Game Hub – Explore, Play & Learn with 3D in the Browser

**Game Hub** is an interactive web application showcasing multiple creative 3D experiences using **Three.js**, **React Three Fiber**, and external APIs like **Google Maps** and **Open-Meteo**.

This project was created as a personal learning journey to explore modern browser graphics, game logic, and real-world API integration — all using the power of **React**.


[Demo Website](https://game-hub-3d.vercel.app/ )

---

## ⚠️ Note about This Repository

This is a **lightweight version** of the Game Hub project for **GitLab**.  
👉 **The full version (with all large assets, screenshots, and 3D models) is available on GitHub:**  
[🔗 GitHub Repository](https://github.com/your-username/game-hub)

**Why?**  
Due to GitLab's file size limitations, large assets are excluded from this repository.

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

## 🛠️ Installation

```bash
# Clone the lightweight repo
git clone https://gitlab.com/your-username/game-hub.git
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

## 📁 Project Structure

```
src/
├── assets/                # (Small assets only; large assets excluded)
├── components/            # Navbar, reusable UI
├── pages/                 # Home, About, Contact
├── scenes/                # Meditation, Ghost Game, Map Explorer
├── styles/                # Tailwind and custom CSS
└── App.jsx
```

> Note: Some large models or textures are **not included** in this GitLab repository.  
> To get the complete experience, refer to the [GitHub repository](https://github.com/your-username/game-hub).

---

## 📄 Environment Variables

```env
# .env.example
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

---

## 🙋 About the Project

This is a student-built educational project exploring how to:
- Render and animate 3D models in the browser
- Connect Three.js to external APIs
- Build engaging experiences with WebGL and React

---

## 📬 Contact

🌐 [GitHub – Full Version](https://github.com/maguitaria/game-hub)

---

## 📄 License

MIT — free to use, remix, and learn from.

---

Thanks for visiting **Game Hub**! 🚀

---

# 🚀 TL;DR
> **This is the lightweight GitLab version.**  
> **For the full project with all large assets and features, visit:**  
> ➡️ [GitHub Repository](https://github.com/maguitaria/game-hub)


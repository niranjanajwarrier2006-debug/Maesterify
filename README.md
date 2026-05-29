# Maesterify: A Digital Book Sanctuary 📚

A high-fidelity digital book sanctuary designed for the Dark Academia aesthetic. Maesterify bridges the gap between traditional retail and immersive community reading.

Demo video: https://drive.google.com/file/d/1xV3syTA-V2v-MDO-_uZd-qeGW3aqb2ss/view?usp=sharing

## ✨ Features
* **Whispering Shelves:** A curated catalog interface for historical literature.
* **Arcade:** Integrated mini-games for user retention.
* **Companion Bot:** Autonomous client-side agent for site navigation.
* **Atmospheric Design:** Custom Dark Academia CSS system.

## 🛠 Tech Stack
* **Frontend:** Next.js, React, Custom CSS.
* **Backend:** Node.js, Express, PostgreSQL.
* **Development Philosophy:** AI-Assisted Engineering (leveraged for architecture planning, component boilerplate, and complex debugging).

## 💡 Engineering Highlights
This project involved solving a **Data-Binding Runtime Exception** where inconsistent database payloads were crashing the frontend rendering engine. 
* **The Solution:** I implemented a **Defensive Data-Sanitization Layer** (a global polyfill) that standardizes API objects before they reach the UI. This ensured 100% uptime regardless of database schema inconsistencies.

## 🚀 Getting Started
1. Clone the repo: `git clone [https://github.com/niranjanajwarrier2006-debug/Maesterify.git]`
2. Install dependencies: `npm install`
3. Run the project: `npm run dev`

## 🛡️ License & Credits
Developed as an independent project. All original UI/UX design is my own.

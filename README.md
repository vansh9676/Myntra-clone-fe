# Myntra Clone — React Native Expo

This project is a Myntra-inspired e-commerce mobile application built using **React Native (Expo)** as part of my internship training.

The application includes a **Hybrid Recently Viewed System** that stores product views locally while supporting cross-device synchronization logic.

---

## 🚀 Live Demo

👉 https://YOUR-NETLIFY-LINK.netlify.app

---

## 📱 Features

* Product Listing & Categories
* Product Details Page
* Authentication Screens
* Wishlist & Cart UI
* Responsive Design (Mobile + Web)
* Hybrid Recently Viewed System

---

## 🧠 Hybrid Recently Viewed Feature

The Recently Viewed system follows a hybrid storage approach:

### Local Storage

* Uses AsyncStorage for fast access
* Stores maximum 20 products per user
* Prevents duplicate entries
* Maintains most recent order

### Sync Logic

* Designed to merge anonymous browsing with logged-in history
* Preserves timestamp order
* Supports multi-device consistency

---

## 🛠️ Tech Stack

* React Native (Expo)
* Expo Router
* AsyncStorage
* Axios
* Netlify (Deployment)

---

## ⚙️ Installation

```bash
npm install
npx expo start
```

---

## 🌐 Web Build

```bash
npx expo export
```

Output folder:

```
dist/
```

---

## 👨‍💻 Author

**Vansh**
Founder — NeuralForge

---

## 📌 Internship Submission

This project was developed as part of the ElevateSkills Internship Program.

---

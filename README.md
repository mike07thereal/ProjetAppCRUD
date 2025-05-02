# 🛍️ Application CRUD de Gestion de Produits

## 📌 Description

Ce projet est une application web complète de gestion de produits avec authentification. Il permet aux utilisateurs de s'inscrire, se connecter, et aux administrateurs de gérer un stock de produits (ajout, modification, suppression).

---

## 🚀 Fonctionnalités

- 🔐 Authentification sécurisée (JWT)
- 👥 Gestion des rôles (`user` / `admin`)
- ✅ CRUD produits : créer, lire, modifier, supprimer
- 📄 Interface responsive avec React
- 🔎 Tri, pagination, formulaire dynamique
- 🎨 Interface claire avec feedback visuel

---

## 🛠️ Technologies

| Frontend     | Backend         | Base de données |
|--------------|------------------|-----------------|
| React        | Node.js / Express| MongoDB / Mongoose |
| Axios        | JWT Auth         |                 |
| React Router | CORS             |                 |

---

## ⚙️ Installation

### Prérequis

- Node.js v18+
- MongoDB local ou MongoDB Atlas

### 1. Cloner le projet

```bash
git clone https://github.com/mike07thereal/ProjetAppCRUD.git
cd ProjetAppCRUD

2. Démarrer le backend
cd backend
npm install
touch .env

Dans le fichier .env :

MONGO_URI=mongodb://127.0.0.1:27017/gestion-produits
JWT_SECRET=votre_clé_secrète

Puis :
npm run dev

3. Démarrer le frontend

cd ../frontend
npm install
npm start

🌐 Accès
Inscription : http://localhost:3000/register

Connexion : http://localhost:3000/login

Liste produits : http://localhost:3000/products

Liste utilisateurs (admin uniquement) : http://localhost:3000/users

👤 Auteur Mamadou FALL 
Projet réalisé dans le cadre d’une évaluation technique.

📷 Exemple de test ThunderClient
Pour accéder aux utilisateurs :

Méthode : GET

URL : http://localhost:5000/api/users/all

Header :

Authorization: Bearer VOTRE_TOKEN

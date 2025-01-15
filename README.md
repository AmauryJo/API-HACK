# 🛠 API HACK

Bienvenue dans le projet **API HACK** ! Voici un guide détaillé pour configurer et lancer le projet sur votre machine locale.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :
- [Node.js](https://nodejs.org/) (avec **npm**)
- [phpMyAdmin](https://www.phpmyadmin.net/) pour la gestion de votre base de données

## 🗂 Installation

### 1️⃣ Mise en place de la base de données

Commencez par mettre en place **phpMyAdmin** sur votre machine et suivez ces étapes :

1. Récupérez le fichier SQL disponible dans la racine du projet : `api_kvin.sql`.
2. Importez-le dans votre interface phpMyAdmin.

### 2️⃣ Configuration de l'accès à la base de données

Maintenant que vous avez importé la base de données dans phpMyAdmin, vous devez configurer l'accès à la base de données dans le fichier `database.js`.

Le fichier de configuration est situé dans :

`config/database.js`.

Modifiez-le selon les informations de votre serveur de base de données.

### 3️⃣ Cloner le projet

Clonez le dépôt du projet depuis GitHub :

```bash
git clone https://github.com/AmauryJo/API-HACK.git
```

### 4️⃣ Installation des dépendances
Rendez-vous dans le répertoire du projet, installez les dépendances nécessaires avec npm :

```bash
cd API-HACK
npm install
```
### 5️⃣ Lancer le projet
Pour démarrer le projet, utilisez la commande suivante :

```bash
npm run dev
```

### 🚀 Lancer l'API

Une fois que tout est configuré, l'API sera disponible à l'adresse `http://localhost:3000` (par défaut).


### 🔑 Identifiant Admin

Utilisateur : `kevin`
Mot de passe : `niel`

### 🖥️ Technologies utilisées

- Node.js et Express
- MySQL (via phpMyAdmin)
- npm pour la gestion des dépendances

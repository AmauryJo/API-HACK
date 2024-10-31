const express = require('express');
const { register, login } = require('../models/User'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, password, bear, role } = req.body; 
    console.log("tentative de création ", req.body);

    if (!bear || !role) {
        return res.status(401).send('Token ou role manquant');
    }
    else if (role !== "admin" && role !== "user") {
        return res.status(401).send('Role invalide');
    }

    try {
        const decodedToken = jwt.verify(bear, process.env.JWT_SECRET);

        if (!decodedToken.userId) {
            return res.status(401).send('Token invalide');
        }
        else if (decodedToken.role !== "admin") {
            return res.status(401).send('Vous n\'avez pas les droits pour créer un utilisateur');
        }

    } catch (error) {
        return res.status(401).send('Token invalide ou expiré');
    }

    try {
        await register(username, password, role); 
        res.status(201).send('Utilisateur créé');
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur', details: error });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await login(username);

    if (user && bcrypt.compareSync(password, user.password)) { 
        const token = jwt.sign(
            { userId: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );
        console.log("utilisateur connecté on lui donne son token");
        res.status(200).json({ message: 'Utilisateur connecté', token });
    } else {
        res.status(401).send('Identifiants invalides');
    }
});

module.exports = router;

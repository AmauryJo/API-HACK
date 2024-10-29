const express = require('express');
const { save, login } = require('../models/User'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, password } = req.body; 
    console.log("tentative de création ", req.body)
;    try {
        await save(username, password); 
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
            { userId: user.id }, 
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

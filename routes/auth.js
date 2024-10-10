const express = require('express');
const { save, login } = require('../models/User'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
        console.log("utilisateur connecté")
    } else {
        res.status(401).send('Identifiants invalides');
    }
});

module.exports = router;

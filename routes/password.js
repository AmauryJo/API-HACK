const express = require('express');
const jwt = require('jsonwebtoken');
const { generateSecurePassword } = require('../utils/passwordGenerator')

const router = express.Router();

router.post('/', async (req, res) => { // Changement ici
    const { bear, length } = req.body; 
    console.log(bear);

    if (!bear) {
        return res.status(401).send('Token manquant');
    }

    try {
        const decodedToken = jwt.verify(bear, process.env.JWT_SECRET);

        if (!decodedToken.userId) {
            return res.status(401).send('Token invalide');
        }
    } catch (error) {
        return res.status(401).send('Token invalide ou expiré');
    }

    try {
        const generatedPassword = await generateSecurePassword(length);
        res.status(201).json({ message: 'Mot de passe créé', password: generatedPassword }); 

    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du mot de passe', details: error });
    }
});

module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const { generateSecurePassword } = require('../utils/passwordGenerator')

const router = express.Router();

router.post('/', async (req, res) => {
    const { bear, length } = req.body; 

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
        if (length < 8 || length > 100) {
            return res.status(400).json({ error: 'La longueur du mot de passe doit être entre 8 et 100 caractères' });
        }
        const generatedPassword = await generateSecurePassword(length);
        res.status(201).json({ message: 'Mot de passe créé', password: generatedPassword }); 

    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du mot de passe', details: error });
    }
});

module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const { getLogs } = require('../utils/getLogs')

const router = express.Router();

router.post('/', async (req, res) => {
    const { bear } = req.body; 

    if (!bear) {
        return res.status(401).json({ error: 'Token manquant' });
    }

    try {
        const decodedToken = jwt.verify(bear, process.env.JWT_SECRET);

        if (!decodedToken.userId || !decodedToken.role) {
            return res.status(401).json({ error: 'Token invalide' });
        }
        else if (decodedToken.role !== "admin") {
            return res.status(401).json({ error: 'Vous n\'avez pas les droits pour voir les logs' });
        }
        
    } catch (error) {
        return res.status(401).json({ error: 'Token invalide ou expiré' });
    }

    try {
        const logs = await getLogs();
        res.status(201).json({ message: 'Logs récupérés', logs: logs }); 

    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du mot de passe', details: error });
    }
});

module.exports = router;

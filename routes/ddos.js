const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

const { ddos } = require('../utils/ddos')

router.post('/', async (req, res) => {
    const { bear, ip, amount } = req.body;
    console.log(req.body);

    if (!bear || !ip || !amount) {
        return res.status(401).send('Token ou adresse ip ou nombre de requêtes manquants');
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
        console.log("on appel la fonction ddos");
        await ddos(ip, amount);
        console.log("ddos terminé");
    } catch (error) {
        return res.status(500).send('Erreur lors de l\'envoi des requêtes');
    }

    res.status(200).send('Requêtes envoyées');
});

module.exports = router;

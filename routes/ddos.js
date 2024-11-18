const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

const { ddos } = require('../utils/ddos')

/**
 * @swagger
 * tags:
 *   name: DDOS
 *   description: Fonctionnalités DDOS
 */

/**
 * @swagger
 * /ddos:
 *   post:
 *     summary: Envoyer des requêtes multiples
 *     tags: [DDOS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bear
 *               - ip
 *               - amount
 *             properties:
 *               bear:
 *                 type: string
 *                 description: Token JWT
 *               ip:
 *                 type: string
 *                 description: Adresse IP cible
 *               amount:
 *                 type: integer
 *                 description: Nombre de requêtes à envoyer
 *     responses:
 *       200:
 *         description: Requêtes envoyées avec succès
 *       401:
 *         description: Token invalide
 *       500:
 *         description: Erreur serveur
 */

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

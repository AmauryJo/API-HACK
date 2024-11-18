const express = require('express');
const jwt = require('jsonwebtoken');
const { getAllLogs, getLogsByUser, getLogsByFunctionnality } = require('../models/Log');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Gestion des logs
 */

/**
 * @swagger
 * /log:
 *   post:
 *     summary: Récupérer tous les logs
 *     tags: [Logs]
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
 *             properties:
 *               bear:
 *                 type: string
 *                 description: Token JWT admin
 *               quantity:
 *                 type: integer
 *                 default: 10
 *                 description: Nombre de logs à récupérer
 *     responses:
 *       201:
 *         description: Logs récupérés avec succès
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /log/user:
 *   post:
 *     summary: Récupérer les logs d'un utilisateur spécifique
 *     tags: [Logs]
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
 *               - id_user
 *             properties:
 *               bear:
 *                 type: string
 *                 description: Token JWT admin
 *               id_user:
 *                 type: integer
 *                 description: ID de l'utilisateur
 *               quantity:
 *                 type: integer
 *                 default: 10
 *                 maximum: 100
 *                 description: Nombre de logs à récupérer
 *     responses:
 *       201:
 *         description: Logs utilisateur récupérés
 *       401:
 *         description: Non autorisé
 */

router.post('/', async (req, res) => {
    const { bear, quantity = 10 } = req.body; 

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
        const logs = await getAllLogs(quantity);
        console.log(logs);
        res.status(201).json({ message: 'Logs récupérés', logs: logs }); 

    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la récupération des logs', details: error });
    }
});

router.post('/user', async (req, res) => {
    const {bear, quantity = 10, id_user } = req.body;

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
        if (quantity > 100) {
            return res.status(401).json({ error: 'La quantité de logs maximum est de 100' });
        }
        const logs = await getLogsByUser(id_user, quantity);
        res.status(201).json({ message: 'Logs récupérés', logs: logs });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la récupération des logs', details: error });
    }

});

router.post('/functionnality', async (req, res) => {
    const {bear, quantity = 10, id_functionnality } = req.body;
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
        if (quantity > 100) {
            return res.status(401).json({ error: 'La quantité de logs maximum est de 100' });
        }

        const logs = await getLogsByFunctionnality(id_functionnality, quantity);
        res.status(201).json({ message: 'Logs récupérés', logs: logs });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la récupération des logs', details: error });
    }

});
    
module.exports = router;

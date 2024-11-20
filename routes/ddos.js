import express from 'express';
import { ddos } from '../utils/ddos.js';

const router = express.Router();

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
 *     summary: Envoyer des requêtes multiples à une adresse IP cible
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
 *                 description: Token JWT pour l'authentification
 *               ip:
 *                 type: string
 *                 description: Adresse IP cible pour les requêtes
 *               amount:
 *                 type: integer
 *                 description: Nombre de requêtes à envoyer
 *     responses:
 *       200:
 *         description: Requêtes envoyées avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: "Requêtes envoyées"
 *               details: []
 *       401:
 *         description: Token invalide ou manquant
 *         content:
 *           application/json:
 *             example:
 *               error: "Token invalide"
 *       500:
 *         description: Erreur serveur lors de l'envoi des requêtes
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de l'envoi des requêtes"
 */

router.post('/', async (req, res) => {
    const { ip, amount } = req.body;
    try {
        console.log("on appel la fonction ddos");
        var ddosList = await ddos(ip, amount);
        return res.status(200).json({ success: true, message: "Requêtes envoyées", ddosList: ddosList });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi des requêtes' });
    }
});

export default router;

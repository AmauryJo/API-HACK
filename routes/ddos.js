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
    const { ip, amount } = req.body;

    try {
        console.log("on appel la fonction ddos");
        await ddos(ip, amount);
        console.log("ddos terminé");
    } catch (error) {
        return res.status(500).send('Erreur lors de l\'envoi des requêtes');
    }

    res.status(200).send('Requêtes envoyées');
});

export default router;

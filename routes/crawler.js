import express from 'express';
import { getJson } from "serpapi";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Crawler
 *   description: Fonctionnalités Crawler
 */

/**
 * @swagger
 * /ddos:
 *   post:
 *     summary: Retrouver les informations à partir d'un NOM Prénom
 *     tags: [Crawler]
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
    const query = req.body;
    try {
        const response = await getJson({
            engine: "google",
            api_key: process.env.SERP_API_KEY,
            q: query.nom,
        });
        const queryStat = response.search_metadata;
        const queryResult = response.organic_results;
        return res.status(200).json({ success: true, stats: queryStat, results : queryResult });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi des requêtes' });
    }
});

export default router;

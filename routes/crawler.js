import express from 'express';
import { getJson } from "serpapi";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Crawler
 *   description: Fonctionnalités liées au crawling des informations
 */

/**
 * @swagger
 * /crawler:
 *   get:
 *     summary: Recherche d'informations basées sur un nom
 *     tags: [Crawler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nom
 *         required: true
 *         schema:
 *           type: string
 *           description: Nom ou requête à rechercher
 *     responses:
 *       200:
 *         description: Recherche réussie
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               stats:
 *                 - search_time: 0.32
 *                 - total_results: 1000000
 *               results:
 *                 - title: "Exemple de résultat"
 *                   link: "https://example.com"
 *       400:
 *         description: Paramètres invalides
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Le paramètre 'nom' est requis"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Erreur lors de la récupération des informations"
 */

// Route de recherche d'informations basée sur le nom
router.get('/', async (req, res) => {
    const { nom } = req.query;  // Lecture du nom dans les paramètres de la requête

    // Vérification que le paramètre 'nom' est fourni
    if (!nom) {
        return res.status(400).json({ success: false, error: "Le paramètre 'nom' est requis" });
    }

    try {
        // Récupération des informations de recherche via l'API de SerpAPI
        const response = await getJson({
            engine: "google",
            api_key: process.env.SERP_API_KEY,
            q: nom,
        });

        const queryStat = response.search_metadata;
        const queryResult = response.organic_results;

        // Réponse avec les statistiques de la recherche et les résultats
        return res.status(200).json({ success: true, stats: queryStat, results: queryResult });
    } catch (error) {
        console.error('Erreur lors de la récupération des informations:', error);
        return res.status(500).json({ success: false, error: 'Erreur lors de la récupération des informations' });
    }
});

export default router;

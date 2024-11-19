import express from 'express';
import { subDomainFinder } from '../utils/subDomainFinder.js';

const router = express.Router();

/**
 * @swagger
 * /subdomainfinder:
 *   post:
 *     summary: Recherche les sous-domaines d'un domaine donné
 *     tags: [Domain]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - domain
 *             properties:
 *               domain:
 *                 type: string
 *                 description: Le domaine à analyser
 *                 example: "example.com"
 *     responses:
 *       201:
 *         description: Sous-domaines trouvés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation
 *                 domainData:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Liste des sous-domaines trouvés
 *       400:
 *         description: Erreur de requête
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 details:
 *                   type: object
 */
router.post('/', async (req, res) => {
    const { domain } = req.body; 

    try {
        if (!domain) {
            return res.status(400).json({ error: 'Le domaine est requis' });
        }

        const domainData = await subDomainFinder(domain);
        res.status(201).json({ message: 'Sous domaines récupérés', domainData: domainData });

    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la vérification du domaine', details: error });
    }
});

export default router;

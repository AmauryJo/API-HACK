import express from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Domain
 *   description: Fonctionnalités de recherche de sous-domaines
 */

/**
 * @swagger
 * /subdomainfinder:
 *   get:
 *     summary: Recherche les sous-domaines d'un domaine donné
 *     tags: [Domain]
 *     parameters:
 *       - in: query
 *         name: domain
 *         required: true
 *         schema:
 *           type: string
 *           example: "example.com"
 *         description: Le domaine à analyser
 *     responses:
 *       200:
 *         description: Sous-domaines trouvés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
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
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                 details:
 *                   type: object
 */
router.get('/', async (req, res) => {
    const { domain } = req.query;

    const formattedDomain = domain ? domain.replace(/^https?:\/\/(www\.)?/, '').toLowerCase() : null;

    // Fonction pour rechercher les sous-domaines
    async function subDomainFinder(formattedDomain) {
        const API_KEY = process.env.SECURITY_API_KEY;
        const API_URL = `https://api.securitytrails.com/v1/domain/${formattedDomain}/subdomains`;

        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'apikey': API_KEY
                }
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data.subdomains || []; // Assurez-vous que la réponse contient un tableau de sous-domaines
        } catch (error) {
            throw new Error(`Erreur lors de la requête API: ${error.message}`);
        }
    }

    try {
        if (!formattedDomain) {
            return res.status(400).json({ success: false, error: 'Le domaine est requis' });
        }

        const domainData = await subDomainFinder(formattedDomain);
        res.status(200).json({ success: true, message: 'Sous-domaines récupérés', domainData: domainData });

    } catch (error) {
        res.status(400).json({ success: false, error: 'Erreur lors de la vérification du domaine', details: error.message });
    }
});

export default router;

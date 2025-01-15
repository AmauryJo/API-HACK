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

    const formattedDomain = domain.replace(/^https?:\/\/(www\.)?/, '').toLowerCase(); 
    
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
        res.status(201).json({ success: true, message: 'Sous-domaines récupérés', domainData: domainData });

    } catch (error) {
        res.status(400).json({ success: false, error: 'Erreur lors de la vérification du domaine', details: error.message });
    }
});

export default router;

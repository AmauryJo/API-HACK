import express from 'express';
import ping from 'ping';

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
 *   get:
 *     summary: Envoyer des requêtes multiples à une adresse IP cible
 *     tags: [DDOS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ip
 *         required: true
 *         schema:
 *           type: string
 *           description: Adresse IP cible pour les requêtes
 *       - in: query
 *         name: amount
 *         required: true
 *         schema:
 *           type: integer
 *           description: Nombre de requêtes à envoyer
 *     responses:
 *       200:
 *         description: Requêtes envoyées avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: "Requêtes envoyées"
 *               ddosList: []
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

// Fonction ddos en dehors de router.get
async function ddos(ip, amount) {
    if (typeof amount !== 'number' || amount <= 1) {
        throw new Error('Le nombre de requêtes doit être un nombre positif.');
    }

    let pingList = [];
    
    try {
        console.log(ip);
        for (let i = 0; i < amount; i++) {
            const result = await ping.promise.probe(ip);
            pingList.push(`Requête ping envoyée à ${ip} - ${result.alive ? 'Succès' : 'Échec'}`);
        }
        return pingList;
    } catch (error) {
        return error;
    }
}

router.get('/', async (req, res) => {
    const { ip, amount } = req.query;

    // Validation des paramètres
    if (!ip || !amount) {
        return res.status(400).json({ success: false, error: 'Les paramètres ip et amount sont requis' });
    }

    try {
        console.log("Appel de la fonction ddos");
        let ddosList = await ddos(ip, parseInt(amount));  // Appel de la fonction ddos en dehors du router.get
        return res.status(200).json({ success: true, message: "Requêtes envoyées", ddosList: ddosList });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi des requêtes', details: error });
    }
});

export default router;

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

/**
 * @swagger
 * /mailchecker:
 *   post:
 *     summary: Vérifie la validité d'une adresse email
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mail
 *             properties:
 *               mail:
 *                 type: string
 *                 description: L'adresse email à vérifier
 *     responses:
 *       201:
 *         description: Email vérifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 isMailValid:
 *                   type: boolean
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

// Fonction pour vérifier la validité de l'email avec Hunter.io
async function checkMail(mail) {
    try {
        const API_KEY = process.env.HUNTER_API_KEY;

        // Appel à l'API Hunter.io pour vérifier l'email
        const response = await fetch(
            `https://api.hunter.io/v2/email-verifier?email=${mail}&api_key=${API_KEY}`
        );
        const data = await response.json();

        // On extrait le statut et le score de l'API
        const mailValid = data?.data?.status;
        const score = data?.data?.score;

        // On considère l'email valide si le statut n'est pas 'invalid'
        if (mailValid !== 'invalid') {
            return { mailValid, score };
        } else {
            return false;  // Email invalide
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'email:', error);
        return false;  // En cas d'erreur avec l'API
    }
}

// Route pour vérifier la validité de l'email
router.post('/', async (req, res) => {
    const { mail } = req.body; 

    // Validation de l'input
    if (!mail) {
        return res.status(400).json({ success: false, error: 'Le mail est requis' });
    }

    try {
        // Appel à la fonction checkMail dans le même fichier
        const mailValid = await checkMail(mail);

        // Si l'API retourne une erreur ou une valeur incorrecte
        if (!mailValid || typeof mailValid !== 'object') {
            return res.status(400).json({ success: false, error: 'Erreur lors de la vérification du mail' });
        }

        res.status(201).json({ success: true, message: `Mail vérifié : ${mail}`, isMailValid: mailValid }); 

    } catch (error) {
        // Gestion d'erreur plus détaillée
        console.error('Erreur lors de la vérification du mail:', error);
        res.status(400).json({ success: false, error: 'Erreur lors de la vérification du mail', details: error.message });
    }
});

export default router;

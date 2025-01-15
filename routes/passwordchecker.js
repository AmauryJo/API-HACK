import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /passwordchecker:
 *   get:
 *     summary: Vérifie si un mot de passe est dans la liste des mots de passe communs
 *     tags: [Password]
 *     parameters:
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *           description: Le mot de passe à vérifier
 *     responses:
 *       200:
 *         description: Vérification effectuée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message indiquant si le mot de passe est commun ou non
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
 *                   type: string
 */

// Route de vérification de mot de passe
router.get('/', async (req, res) => {
    const { password } = req.query;  // Lecture du mot de passe dans les paramètres de la requête

    // Vérification que le mot de passe est fourni
    if (!password) {
        return res.status(400).json({ success: false, error: 'Le mot de passe est requis' });
    }

    try {
        // Récupération de la liste des mots de passe communs depuis un fichier distant
        const response = await fetch('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt');
        const text = await response.text();
        const commonPasswords = text.split('\n');
        
        // Vérification si le mot de passe est dans la liste des mots de passe communs
        if (commonPasswords.includes(password)) {
            res.status(200).json({ success: true, response: "Le mot de passe est dans la liste des mots de passe communs" });
        } else {
            res.status(200).json({ success: true, response: "Le mot de passe n'est pas dans la liste des mots de passe communs" });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du mot de passe:', error);
        res.status(400).json({ success: false, error: 'Erreur lors de la vérification du mot de passe', details: error.message });
    }
});

export default router;

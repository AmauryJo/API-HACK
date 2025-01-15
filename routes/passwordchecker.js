import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /passwordchecker:
 *   post:
 *     summary: Vérifie si un mot de passe est dans la liste des mots de passe communs
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: Le mot de passe à vérifier
 *     responses:
 *       201:
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
 *                   type: object
 */
router.post('/', async (req, res) => {
    const { password } = req.body;

    // Vérification que le mot de passe est fourni
    if (!password) {
        return res.status(400).json({ success: false, error: 'Le mot de passe est requis' });
    }

    try {
        // Vérification du mot de passe dans la liste des mots de passe communs
        const response = await fetch('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt');
        const text = await response.text();
        const commonPasswords = text.split('\n');
        
        // Vérification si le mot de passe fait partie des mots de passe communs
        if (commonPasswords.includes(password)) {
            res.status(201).json({ success: true, response: "Le mot de passe est dans la liste des mots de passe communs" });
        } else {
            res.status(201).json({ success: true, response: "Le mot de passe n'est pas dans la liste des mots de passe communs" });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du mot de passe:', error);
        res.status(400).json({ success: false, error: 'Erreur lors de la vérification du mot de passe', details: error });
    }
});

export default router;

import express from 'express';
import { passwordChecker } from '../utils/passwordChecker.js';

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

    try {
        if (!password) {
            return res.status(400).json({ error: 'Le mot de passe est requis' });
        }

        const passwordValid = await passwordChecker(password);
        if (passwordValid) {
            res.status(201).json({ response: "Le mot de passe est dans la liste des mots de passe communs" });
        } else {
            res.status(201).json({ response: "Le mot de passe n'est pas dans la liste des mots de passe communs" });
        }

    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la vérification du mot de passe', details: error });
    }
});

export default router;

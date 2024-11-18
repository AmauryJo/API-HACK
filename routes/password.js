import express from 'express';
import { generateSecurePassword } from '../utils/passwordGenerator.js';

const router = express.Router();

/**
 * @swagger
 * /password:
 *   post:
 *     summary: Génère un mot de passe sécurisé
 *     tags: [Password]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bear:
 *                 type: string
 *                 description: Token JWT
 *               length:
 *                 type: number
 *                 description: Longueur du mot de passe
 *     responses:
 *       201:
 *         description: Mot de passe généré avec succès
 *       401:
 *         description: Token manquant ou invalide
 *       400:
 *         description: Erreur de validation
 */
router.post('/', async (req, res) => {
    const { length } = req.body; 

    try {
        if (length < 8 || length > 100) {
            return res.status(400).json({ error: 'La longueur du mot de passe doit être entre 8 et 100 caractères' });
        }
        const generatedPassword = await generateSecurePassword(length);
        res.status(201).json({ message: 'Mot de passe créé', password: generatedPassword }); 

    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du mot de passe', details: error });
    }
});

export default router;

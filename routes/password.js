import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /password:
 *   get:
 *     summary: Génère un mot de passe sécurisé
 *     tags: [Password]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: length
 *         required: true
 *         schema:
 *           type: number
 *           example: 16
 *         description: Longueur du mot de passe
 *     responses:
 *       200:
 *         description: Mot de passe généré avec succès
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
 *                 password:
 *                   type: string
 *                   description: Le mot de passe généré
 *       401:
 *         description: Token manquant ou invalide
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
 *       400:
 *         description: Erreur de validation
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
 */
router.get('/', async (req, res) => {
    const { length } = req.query; // Lire la longueur depuis les paramètres de requête

    const lengthNumber = Number(length); // Convertir en nombre

    // Vérification que la longueur est valide
    if (!length || isNaN(lengthNumber) || lengthNumber < 8 || lengthNumber > 100) {
        return res.status(400).json({
            success: false,
            error: 'La longueur du mot de passe doit être un nombre entre 8 et 100 caractères',
        });
    }

    // Fonction de génération de mot de passe sécurisé
    function generateSecurePassword(length) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    try {
        // Générer le mot de passe sécurisé
        const generatedPassword = generateSecurePassword(lengthNumber);
        res.status(200).json({ success: true, message: 'Mot de passe créé', password: generatedPassword });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Erreur lors de la création du mot de passe',
            details: error.message,
        });
    }
});

export default router;

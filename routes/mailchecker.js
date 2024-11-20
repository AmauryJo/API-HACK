import express from 'express';
import { checkMail } from '../utils/mailChecker.js';

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
router.post('/', async (req, res) => {
    const { mail } = req.body; 

    try {
        if (!mail) {
            return res.status(400).json({ success: false, error: 'Le mail est requis' });
        }

        const mailValid = await checkMail(mail);
        res.status(201).json({ success: true, message: 'Mail vérifié : ' + mail, isMailValid: mailValid }); 

    } catch (error) {
        res.status(400).json({ success: false, error: 'Erreur lors de la vérification du mail', details: error });
    }
});

export default router;

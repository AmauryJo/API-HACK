import express from 'express';
import { mailer } from '../utils/mailer.js';
const router = express.Router();

/**
 * @swagger
 * /mailer:
 *   post:
 *     summary: Envoie des emails en masse
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - subject
 *               - quantity
 *               - target
 *             properties:
 *               content:
 *                 type: string
 *                 description: Le contenu du mail
 *                 minLength: 1
 *                 maxLength: 500
 *               subject:
 *                 type: string
 *                 description: Le sujet du mail
 *               quantity:
 *                 type: integer
 *                 description: Le nombre de mails à envoyer
 *                 minimum: 1
 *                 maximum: 100
 *               target:
 *                 type: string
 *                 description: L'adresse email cible
 *     responses:
 *       201:
 *         description: Mails envoyés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 mailing:
 *                   type: object
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
    const { content, subject, quantity, target } = req.body; 
    if (!content){
        return res.status(400).json({ success: false, error: 'Le contenu est requis' });
    }
    if (!quantity){
        return res.status(400).json({ success: false, error: 'La quantité est requise' });
    }
    if (!target){
        return res.status(400).json({ success: false, error: 'Le target est requis' });
    }
    if (!subject){
        return res.status(400).json({ success: false, error: 'Le sujet est requis' });
    }
    try {
        if (quantity < 1 || quantity > 100) {
            return res.status(400).json({ success: false, error: 'La quantité doit être entre 1 et 100' });
        }
        if (content.length < 1 || content.length > 500) {
            return res.status(400).json({ success: false, error: 'Le contenu doit être entre 1 et 500 caractères' });
        }
        const mailing = await mailer(content, subject, quantity, target);

        res.status(201).json({ success: true, message: 'Mail envoyé', mailing: mailing }); 

    } catch (error) {
        res.status(400).json({ success: false, error: 'Erreur lors de l\'envoi du mail', details: error });
    }
});

export default router;
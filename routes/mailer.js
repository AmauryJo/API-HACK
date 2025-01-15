import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

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
 *               subject:
 *                 type: string
 *                 description: Le sujet du mail
 *               quantity:
 *                 type: integer
 *                 description: Le nombre de mails à envoyer
 *               target:
 *                 type: string
 *                 description: L'adresse email cible
 *     responses:
 *       201:
 *         description: Mails envoyés avec succès
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

    // Validation de la requête
    if (!content || !subject || !quantity || !target) {
        return res.status(400).json({ success: false, error: 'Tous les champs sont requis' });
    }

    if (quantity < 1 || quantity > 100) {
        return res.status(400).json({ success: false, error: 'La quantité doit être entre 1 et 100' });
    }

    if (content.length < 1 || content.length > 500) {
        return res.status(400).json({ success: false, error: 'Le contenu doit être entre 1 et 500 caractères' });
    }

    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.mailsender,
            pass: process.env.gmailpwd
        }
    });

    const promises = [];

    // Envoi des mails en parallèle
    for (let i = 0; i < quantity; i++) {
        const mailOptions = {
            from: process.env.mailsender,
            to: target,
            subject: subject,
            text: `${content} numéro ${i + 1}`
        };

        // Ajout de la promesse d'envoi de l'email à la liste des promesses
        promises.push(transporter.sendMail(mailOptions));
    }

    // Attente que tous les mails soient envoyés
    try {
        await Promise.all(promises);
        res.status(201).json({ success: true, message: 'Mails envoyés avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi des emails:', error);
        res.status(400).json({ success: false, error: 'Erreur lors de l\'envoi des mails', details: error });
    }
});

export default router;

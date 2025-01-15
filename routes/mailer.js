import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Email
 *   description: Fonctionnalités liées à l'envoi d'emails
 */

/**
 * @swagger
 * /mailer:
 *   get:
 *     summary: Envoie des emails en masse
 *     tags: [Email]
 *     parameters:
 *       - in: query
 *         name: content
 *         required: true
 *         schema:
 *           type: string
 *           description: Le contenu du mail
 *       - in: query
 *         name: subject
 *         required: true
 *         schema:
 *           type: string
 *           description: Le sujet du mail
 *       - in: query
 *         name: quantity
 *         required: true
 *         schema:
 *           type: integer
 *           description: Le nombre de mails à envoyer
 *       - in: query
 *         name: target
 *         required: true
 *         schema:
 *           type: string
 *           description: L'adresse email cible
 *     responses:
 *       200:
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

router.get('/', async (req, res) => {
    const { content, subject, quantity, target } = req.query;

    // Validation des paramètres de la requête
    if (!content || !subject || !quantity || !target) {
        return res.status(400).json({ success: false, error: 'Tous les champs sont requis' });
    }

    const qty = parseInt(quantity);

    if (qty < 1 || qty > 100) {
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
    for (let i = 0; i < qty; i++) {
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
        res.status(200).json({ success: true, message: 'Mails envoyés avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi des emails:', error);
        res.status(400).json({ success: false, error: 'Erreur lors de l\'envoi des mails', details: error });
    }
});

export default router;

import express from 'express';
import { mailer } from '../utils/mailer.js';
const router = express.Router();


router.post('/', async (req, res) => {
    const { content, subject, quantity, target } = req.body; 
    if (!content){
        return res.status(400).json({ error: 'Le contenu est requis' });
    }
    if (!quantity){
        return res.status(400).json({ error: 'La quantité est requise' });
    }
    if (!target){
        return res.status(400).json({ error: 'Le target est requis' });
    }
    if (!subject){
        return res.status(400).json({ error: 'Le sujet est requis' });
    }
    try {
        if (quantity < 1 || quantity > 100) {
            return res.status(400).json({ error: 'La quantité doit être entre 1 et 100' });
        }
        if (content.length < 1 || content.length > 500) {
            return res.status(400).json({ error: 'Le contenu doit être entre 1 et 500 caractères' });
        }
        const mailing = await mailer(content, subject, quantity, target);

        res.status(201).json({ message: 'Mail envoyé', mailing: mailing }); 

    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de l\'envoi du mail', details: error });
    }
});

export default router;
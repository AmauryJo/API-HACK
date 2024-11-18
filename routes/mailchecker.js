import express from 'express';
import { checkMail } from '../utils/mailChecker.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { mail } = req.body; 

    try {
        if (!mail) {
            return res.status(400).json({ error: 'Le mail est requis' });
        }

        const mailValid = await checkMail(mail);
        res.status(201).json({ message: 'Mail vérifié : ' + mail, isMailValid: mailValid }); 

    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la vérification du mail', details: error });
    }
});

export default router;

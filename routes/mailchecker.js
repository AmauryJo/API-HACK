import express from 'express';
import jwt from 'jsonwebtoken';
import { checkMail } from '../utils/mailChecker.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
    const { bear, mail } = req.body; 

    if (!bear) {
        return res.status(401).send('Token manquant');
    }

    try {
        const decodedToken = jwt.verify(bear, process.env.JWT_SECRET);

        if (!decodedToken.userId) {
            return res.status(401).send('Token invalide');
        }
    } catch (error) {
        return res.status(401).send('Token invalide ou expiré');
    }

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

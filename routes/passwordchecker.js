import express from 'express';
import jwt from 'jsonwebtoken';
import { passwordChecker } from '../utils/passwordChecker.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
    const { bear, password } = req.body; 

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

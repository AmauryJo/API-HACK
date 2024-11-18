import express from 'express';
import { passwordChecker } from '../utils/passwordChecker.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { password } = req.body; 

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

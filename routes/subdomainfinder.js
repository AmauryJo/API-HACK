import express from 'express';
import { subDomainFinder } from '../utils/subDomainFinder.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { domain } = req.body; 

    try {
        if (!domain) {
            return res.status(400).json({ error: 'Le domaine est requis' });
        }

        const domainData = await subDomainFinder(domain);
        res.status(201).json({ message: 'Sous domaines récupérés', domainData: domainData });

    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la vérification du domaine', details: error });
    }
});

export default router;

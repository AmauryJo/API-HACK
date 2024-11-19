import express from 'express';
import { fakerJS } from '../utils/faker.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { sex } = req.body; 

    try {
        const tempFaker = await fakerJS(sex);
        console.log(tempFaker);
        const { firstName, lastName, fakeMail, job, phone, location, birthDate } = tempFaker;
        res.status(201).json({ firstName, lastName, fakeMail, job, phone, location, birthDate }); 

    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la génération de l'identité ", details: error });
    }
});

export default router;

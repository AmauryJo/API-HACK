import express from 'express';
import { fakerJS } from '../utils/faker.js';

const router = express.Router();

/**
 * @swagger
 * /faker:
 *   post:
 *     summary: Génère une identité fictive
 *     description: Crée une nouvelle identité fictive basée sur le sexe spécifié
 *     tags: [Faker]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sex:
 *                 type: string
 *                 enum: ['male', 'female']
 *                 description: Le sexe de la personne fictive
 *     responses:
 *       201:
 *         description: Identité fictive générée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 fakeMail:
 *                   type: string
 *                 job:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 location:
 *                   type: string
 *                 birthDate:
 *                   type: string
 *       400:
 *         description: Erreur lors de la génération
 */
router.post('/', async (req, res) => {
    const { sex } = req.body; 

    try {
        const tempFaker = await fakerJS(sex);
        console.log(tempFaker);
        const { firstName, lastName, fakeMail, job, phone, location, birthDate } = tempFaker;
        res.status(201).json({ success: true, firstName, lastName, fakeMail, job, phone, location, birthDate }); 

    } catch (error) {
        res.status(400).json({ success: false, error: "Erreur lors de la génération de l'identité ", details: error });
    }
});

export default router;

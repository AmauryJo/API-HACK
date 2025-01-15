import express from 'express';
import { fakerFR as faker } from '@faker-js/faker';

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

// Fonction pour générer l'identité fictive
async function fakerJS(sex) {
    const firstName = faker.person.firstName((sex === 'male' ? 'male' : null));
    const lastName = faker.person.lastName((sex === 'male' ? 'male' : null));
    const fakeMail = faker.internet.email();
    const job = faker.person.jobTitle();
    const phone = faker.phone.number();
    const location = faker.location.city();
    const birthDate = faker.date.birthdate();
    
    return { firstName, lastName, fakeMail, job, phone, location, birthDate };
}

router.post('/', async (req, res) => {
    const { sex } = req.body; 

    try {
        const tempFaker = await fakerJS(sex);  // Appel de la fonction fakerJS directement dans le routeur
        res.status(201).json({ success: true, result: tempFaker }); 

    } catch (error) {
        res.status(400).json({ success: false, error: "Erreur lors de la génération de l'identité ", details: error });
    }
});

export default router;

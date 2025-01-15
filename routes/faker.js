import express from 'express';
import { fakerFR as faker } from '@faker-js/faker';

const router = express.Router();

/**
 * @swagger
 * /faker:
 *   get:
 *     summary: Génère une identité fictive
 *     description: Crée une nouvelle identité fictive basée sur le sexe spécifié
 *     tags: [Faker]
 *     parameters:
 *       - in: query
 *         name: sex
 *         required: true
 *         schema:
 *           type: string
 *           enum: ['male', 'female']
 *           description: Le sexe de la personne fictive
 *     responses:
 *       200:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                 details:
 *                   type: string
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

router.get('/', async (req, res) => {
    const { sex } = req.query;  // Lecture du paramètre sex dans la requête

    // Validation de l'input
    if (!sex || (sex !== 'male' && sex !== 'female')) {
        return res.status(400).json({
            success: false,
            error: 'Le paramètre "sex" est requis et doit être "male" ou "female"',
        });
    }

    try {
        // Appel à la fonction fakerJS
        const tempFaker = await fakerJS(sex);
        res.status(200).json({ success: true, result: tempFaker }); 

    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Erreur lors de la génération de l'identité",
            details: error.message,
        });
    }
});

export default router;

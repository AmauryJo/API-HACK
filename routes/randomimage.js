import express from 'express';
import { randomImage } from '../utils/randomImage.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Fonctionnalités de génération d'images aléatoires
 */

/**
 * @swagger
 * /random-image:
 *   post:
 *     summary: Générer une image aléatoire
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Image générée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Image générée avec succès"
 *                 fileName:
 *                   type: string
 *                   description: Nom du fichier généré
 *                   example: "random_123.jpg"
 *                 filePath:
 *                   type: string
 *                   description: Chemin d'accès à l'image
 *                   example: "/images/random_123.jpg"
 *       500:
 *         description: Erreur lors de la génération de l'image
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
 *                   description: Message d'erreur détaillé
 *                   example: "Erreur lors de la génération de l'image"
 */

router.post('/', async (req, res) => {
    try {        
        const fileName = await randomImage();
        const filePath = `/images/${fileName}`;
        return res.status(200).json({
            success: true,
            message: "Image générée avec succès",
            fileName: fileName,
            filePath: filePath
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;

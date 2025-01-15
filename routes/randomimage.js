import express from 'express';
import fs from 'fs/promises';
import path from 'path';

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
        // Fonction pour générer une image aléatoire
        async function randomImage() {
            try {
                const response = await fetch('https://thispersondoesnotexist.com/');
                
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération de l\'image');
                }

                const buffer = await response.arrayBuffer();
                
                const fileName = `person_${Date.now()}.jpg`;
                const filePath = path.join(process.cwd(), 'images', fileName);
                
                // Créer le dossier images si nécessaire
                await fs.mkdir(path.join(process.cwd(), 'images'), { recursive: true });
                
                // Enregistrer l'image dans le fichier
                await fs.writeFile(filePath, Buffer.from(buffer));
                
                return fileName;
            } catch (error) {
                throw error;
            }
        }

        // Appeler la fonction pour générer l'image
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

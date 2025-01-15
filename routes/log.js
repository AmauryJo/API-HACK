import express from 'express';
import { getAllLogs, getLogsByUser, getLogsByFunctionnality } from '../models/Log.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Gestion des logs
 */

/**
 * @swagger
 * /log:
 *   post:
 *     summary: Récupérer tous les logs
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 default: 10
 *                 description: Nombre de logs à récupérer
 *     responses:
 *       201:
 *         description: Logs récupérés avec succès
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /log/user:
 *   post:
 *     summary: Récupérer les logs d'un utilisateur spécifique
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_user
 *             properties:
 *               id_user:
 *                 type: integer
 *                 description: ID de l'utilisateur
 *               quantity:
 *                 type: integer
 *                 default: 10
 *                 maximum: 100
 *                 description: Nombre de logs à récupérer
 *     responses:
 *       201:
 *         description: Logs utilisateur récupérés
 *       401:
 *         description: Non autorisé
 */

router.post('/', async (req, res) => {
    const { quantity = 10 } = req.body; 

    try {
        const logs = await getAllLogs(quantity);
        res.status(201).json({ success : true, message: 'Logs récupérés', logs: logs }); 

    } catch (error) {
        res.status(400).json({ success : false, error: 'Erreur lors de la récupération des logs', details: error });
    }
});

router.post('/user', async (req, res) => {
    const { quantity = 10, id_user } = req.body;

    try {
        if (quantity > 100) {
            return res.status(401).json({ error: 'La quantité de logs maximum est de 100' });
        }
        const logs = await getLogsByUser(id_user, quantity);
        res.status(201).json({ success : true, message: 'Logs récupérés', logs: logs });
    } catch (error) {
        res.status(400).json({ success : false, error: 'Erreur lors de la récupération des logs', details: error });
    }

});

router.post('/functionnality', async (req, res) => {
    const { quantity = 10, id_functionnality } = req.body;

    try {
        if (quantity > 100) {
            return res.status(401).json({ success: false, error: 'La quantité de logs maximum est de 100' });
        }

        const logs = await getLogsByFunctionnality(id_functionnality, quantity);
        res.status(201).json({ success: true, message: 'Logs récupérés', logs: logs });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Erreur lors de la récupération des logs', details: error });
    }

});
    
export default router;

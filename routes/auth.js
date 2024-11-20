import express from 'express';
import { register, login } from '../models/User.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Gestion de l'authentification
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - bear
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *               bear:
 *                 type: string
 *                 description: Token JWT admin
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 description: Rôle de l'utilisateur
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       401:
 *         description: Non autorisé
 *       400:
 *         description: Erreur de création
 */
router.post('/register', async (req, res) => {
    const { username, password, bear, role } = req.body; 
    console.log("tentative de création ", req.body);

    if (!bear || !role) {
        return res.status(401).json({ success: false, message: 'Token ou role manquant' });
    }
    else if (role !== "admin" && role !== "user") {
        return res.status(401).json({ success: false, message: 'Role invalide' });
    }

    try {
        const decodedToken = jwt.verify(bear, process.env.JWT_SECRET);

        if (!decodedToken.userId) {
            return res.status(401).json({ success: false, message: 'Token invalide' });
        }
        else if (decodedToken.role !== "admin") {
            return res.status(401).json({ success: false, message: 'Vous n\'avez pas les droits pour créer un utilisateur' });
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
    }

    try {
        await register(username, password, role); 
        res.status(201).json({ success: true, message: 'Utilisateur créé' });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Erreur lors de la création de l\'utilisateur', details: error });
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecter un utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Utilisateur connecté
 *                 token:
 *                   type: string
 *                   description: Token JWT pour l'authentification
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await login(username);

    if (user && bcrypt.compareSync(password, user.password)) { 
        const token = jwt.sign(
            { userId: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );
        console.log("utilisateur connecté on lui donne son token");
        res.status(200).json({ success: true, message: 'Utilisateur connecté', token });
    } else {
        res.status(401).json({ success: false, message: 'Identifiants invalides' });
    }
});

export default router;

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).send('Token manquant');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Token manquant');
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).send('Token invalide');
    }
}

export default verifyToken;
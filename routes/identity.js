const express = require('express');
const { save, login } = require('../models/User'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();


router.post('/register', async (req, res) => {
    const { bear } = req.body; 
    console.log(req.body);

    if (!bear) {
        return res.status(401).send('Token manquant');
    }

    try {
        const decodedToken = jwt.verify(bear, process.env.JWT_SECRET);

        if (!decodedToken.id) {
            return res.status(401).send('Token invalide');
        }
    } catch (error) {
        return res.status(401).send('Token invalide ou expiré');
    }
});

module.exports = router;

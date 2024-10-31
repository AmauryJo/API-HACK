const { db } = require('../config/database');
const { getUserByUsername } = require('../models/User');
const jwt = require('jsonwebtoken');

const insertLog = async (id_user, routes) => {
    const query = `INSERT INTO logs (id_user, routes) VALUES (?, ?)`;
    await db.query(query, [id_user, routes]);
}

const logMiddleware = async(req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - ${JSON.stringify(req.body)}`);
    const { username, bear } = req.body;
    if (!bear && !username){
        console.log('Erreur log middleware');
    }
    else if (!bear){
        const user = await getUserByUsername(username);
        const id_user = user[0].id;
        const routes = req.url;
        await insertLog(id_user, routes);
    }
    else {
        const decodedToken = jwt.verify(bear, process.env.JWT_SECRET);
        const id_user = decodedToken.userId;
        const routes = req.url;
        await insertLog(id_user, routes);
    }
    next();
};

module.exports = logMiddleware;
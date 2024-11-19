import { db } from '../config/database.js';
import { getUserByUsername } from '../models/User.js';
import jwt from 'jsonwebtoken';

const insertLog = async (id_user, routes, method, id_functionnality) => {
    const query = `INSERT INTO logs (id_user, routes, method, id_functionnality) VALUES (?, ?, ?, ?)`;
    await db.query(query, [id_user, routes, method, id_functionnality]);
}

const logMiddleware = async(req, res, next) => {
    // console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - ${JSON.stringify(req.body)}}`);
    const { username } = req.body;

    let id_functionnality;

    // ici faire un switch case sur toutes les routes pour leur attribuer un id_functionnalit
    switch (req.url) {
        case '/auth/login':
            id_functionnality = 1;
            break;
        case '/auth/register':
            id_functionnality = 2;
            break;
        case '/password':
            id_functionnality = 3;
            break;
        case '/ddos':
            id_functionnality = 4;
            break;
        case '/log':
            id_functionnality = 5;
            break;
        case '/log/user':
            id_functionnality = 6;
            break;
        case '/log/functionnality':
            id_functionnality = 7;
            break;
        case '/mailchecker':
            id_functionnality = 8;
            break;
        case '/passwordchecker':
            id_functionnality = 9;
            break;
        case '/subdomainfinder':
            id_functionnality = 10;
            break;
    }
    if (!username){
        console.log("Tentative d'accès à la route sans identification");
    }
    else {
        const decodedToken = jwt.verify(bear, process.env.JWT_SECRET);
        const id_user = decodedToken.userId;
        const routes = req.url;
        await insertLog(id_user, routes, req.method, id_functionnality);
    }
    next();
};

export default logMiddleware;
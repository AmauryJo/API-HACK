import bcrypt from 'bcryptjs';
import { db } from '../config/database.js';

// HASH PASSWORD
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const register = async (username, password, role) => {
    const hashedPassword = await hashPassword(password);

    if (role !== "admin" && role !== "user") {
        throw new Error('Role invalide');
    }

    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';

    return new Promise((resolve, reject) => {
        db.query(query, [username, hashedPassword, role], (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'insertion :', err);
                return reject(err);
            }
            console.log('Insertion réussie :', results);
            resolve(results);
        });
    });
};

// GET USER DATA FROM USERNAME
const login = async (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [username], (err, results) => {
            if (err) {
                console.error('Erreur lors de la recherche de l\'utilisateur :', err);
                return reject(err);
            }
            resolve(results.length > 0 ? results[0] : null);
        });
    });
}

const getUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [username], (err, results) => {
            if (err) {
                console.error('Erreur lors de la recherche :', err);
                return reject(err);
            }
            resolve(results)
        });
    });
};

export { register, login, hashPassword, getUserByUsername }; 

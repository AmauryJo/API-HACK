import bcrypt from 'bcryptjs';
import { db } from '../config/database.js';

export const getAllLogs = async (quantity) => {
    const query = `SELECT * FROM logs LIMIT ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [quantity], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const getLogsByUser = async (id_user, quantity) => {
    const query = `SELECT * FROM logs WHERE id_user = ? LIMIT ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [id_user, quantity], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const getLogsByFunctionnality = async (id_functionnality, quantity) => {
    const query = `SELECT * FROM logs WHERE id_functionnality = ? LIMIT ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [id_functionnality, quantity], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const insertLog = async (id_user, routes, method) => {
    const query = `INSERT INTO logs (id_user, routes, method) VALUES (?, ?, ?)`;
    return await db.query(query, [id_user, routes, method]);
}

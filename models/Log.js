const bcrypt = require('bcryptjs');
const { db } = require('../config/database');


const getAllLogs = async (count) => {
    const query = `SELECT * FROM logs LIMIT ?`;
    return await db.query(query, [count]);
}

const getLogsByUser = async (id_user, count) => {
    const query = `SELECT * FROM logs WHERE id_user = ? LIMIT ?`;
    return await db.query(query, [id_user, count]);
}

const getLogsByFonctionnality = async (routes, count) => {
    const query = `SELECT * FROM logs WHERE routes = ? LIMIT ?`;
    return await db.query(query, [routes, count]);
}

const insertLog = async (id_user, routes, method) => {
    const query = `INSERT INTO logs (id_user, routes, method) VALUES (?, ?, ?)`;
    return await db.query(query, [id_user, routes, method]);
}

module.exports = { getAllLogs, getLogsByUser, getLogsByFonctionnality, insertLog }; 

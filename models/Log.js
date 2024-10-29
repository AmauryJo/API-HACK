const bcrypt = require('bcryptjs');

const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1', 
    port: 8889,
    user: 'root',      
    password: 'root',  
    database: 'api_kevin'
});

// Connexion à MySQL
db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à MySQL', err);
        return;
    }
    console.log('Connecté à MySQL');
});

const insertLog = async (username, password) => {
    console.log("Paramètres reçus: ", username, password);
    const hashedPassword = await hashPassword(password);

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

    return new Promise((resolve, reject) => {
        db.query(query, [username, hashedPassword], (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'insertion :', err);
                return reject(err);
            }
            console.log('Insertion réussie :', results); // Affichez les résultats
            resolve(results);
        });
    });
};

module.exports = { insertLog }; 

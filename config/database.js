import mysql from 'mysql';

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

export { db };
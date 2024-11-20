import ping from 'ping';

async function ddos(ip, amount) {
    if (typeof amount !== 'number' || amount <= 1) {
        throw new Error('Le nombre de requêtes doit être un nombre positif.');
    }

    let pingList = [];
    
    try {
        console.log(ip);
        for (let i = 0; i < amount; i++) {
            const result = await ping.promise.probe(ip);
            pingList.push(`Requête ping envoyée à ${ip} - ${result.alive ? 'Succès' : 'Échec'}`);

        }
        return pingList;
    } catch (error) {
        return error;
    }
}

export { ddos };

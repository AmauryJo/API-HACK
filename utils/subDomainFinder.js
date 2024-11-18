export async function subDomainFinder(domain) {
    const API_KEY = 'V2giPf5e_CTo7izdX_odccLnKAh8JUPH';
    const API_URL = `https://api.securitytrails.com/v1/domain/${domain}/subdomains`;

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'apikey': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
        
    } catch (error) {
        throw new Error(`Erreur lors de la requête API: ${error.message}`);
    }
}

import dotenv from 'dotenv';

dotenv.config();

async function checkMail(mail) {
    try {
        const API_KEY = process.env.HUNTER_API_KEY;
        const response = await fetch(
            `https://api.hunter.io/v2/email-verifier?email=${mail}&api_key=${API_KEY}`
        );
        const data = await response.json();

        const mailValid = data?.data?.status;
        const score = data?.data?.score;

        if( mailValid !== 'invalid') {
            return { mailValid, score };
        }
        else if (mailValid === 'invalid') {
            return false;
        }
        else {
            return "Erreur de l'api hunter.io";
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'email:', error);
        return false;
    }
}

export { checkMail };


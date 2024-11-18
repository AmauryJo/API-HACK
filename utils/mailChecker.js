async function checkMail(mail) {
    try {
        const API_KEY = 'e9110a6b18d4becc248f0997a86fa47e8e6f07b1';
        const response = await fetch(
            `https://api.hunter.io/v2/email-verifier?email=${mail}&api_key=${API_KEY}`
        );
        const data = await response.json();
        console.log(data);

        const mailValid = data?.data?.status;

        if(mailValid && mailValid !== 'invalid') {
            return true;
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


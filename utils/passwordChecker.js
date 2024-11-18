async function passwordChecker(password) {
  try {

    const response = await fetch('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt');
    const text = await response.text();
    
    const commonPasswords = text.split('\n');
    
    return commonPasswords.includes(password);
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe:', error);
    return false;
  }
}

export { passwordChecker };

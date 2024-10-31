const crypto = require('crypto');

function generateSecurePassword(length) {
    if (typeof length !== 'number' || length <= 8 || length > 15) {
        throw new Error('La longueur doit être un nombre entre 8 et 50 caractères.');
    }
    
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

module.exports = { generateSecurePassword };
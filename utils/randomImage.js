import fs from 'fs/promises';
import path from 'path';

async function randomImage() {
    try {
        const response = await fetch('https://thispersondoesnotexist.com/');
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'image');
        }

        const buffer = await response.arrayBuffer();
        
        const fileName = `person_${Date.now()}.jpg`;
        const filePath = path.join(process.cwd(), 'images', fileName);
        
        await fs.mkdir(path.join(process.cwd(), 'images'), { recursive: true });
        
        await fs.writeFile(filePath, Buffer.from(buffer));
        
        return fileName;
    } catch (error) {
        throw error;
    }
}

export { randomImage };

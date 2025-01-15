import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIG
import { db } from './config/database.js';

// MIDDLEWARES
import logMiddleware from './middlewares/logMiddleware.js';
import verifyToken from './middlewares/verifyToken.js';

// ROUTES
import authRoutes from './routes/auth.js';
import passwordRoutes from './routes/password.js';
import ddosRoutes from './routes/ddos.js';
import mailcheckerRoutes from './routes/mailchecker.js';
import logRoutes from './routes/log.js';
import subdomainfinderRoutes from './routes/subdomainfinder.js';
import mailerRoutes from './routes/mailer.js';
import fakerRoutes from './routes/faker.js';
import randomImageRoutes from './routes/randomimage.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';
import passwordcheckerRoutes from './routes/passwordchecker.js';
import crawlerRoutes from './routes/crawler.js';
import phishingRoutes from './routes/phishing.js';

const app = express();
app.use(cors()); 
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ajout du middleware pour servir les images
app.use('/images', express.static(path.join(__dirname, 'images')));

// MIDDLEWARE
app.use(logMiddleware);

// ROUTES
app.use('/auth', authRoutes);
app.use('/password', verifyToken,passwordRoutes);
app.use('/ddos', verifyToken, ddosRoutes);
app.use('/mailchecker', verifyToken, mailcheckerRoutes);
app.use('/log', verifyToken, logRoutes);
app.use('/passwordchecker', verifyToken, passwordcheckerRoutes);
app.use('/subdomainfinder', verifyToken, subdomainfinderRoutes);
app.use('/mailer', verifyToken, mailerRoutes);
app.use('/faker', verifyToken, fakerRoutes);
app.use('/randomimage', verifyToken, randomImageRoutes);
app.use('/crawler', verifyToken, crawlerRoutes);
app.use('/phishing', phishingRoutes);

// SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpecs);
});

// SERVER
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

export { app };
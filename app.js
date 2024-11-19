import 'dotenv/config';
import express from 'express';
import { db } from './config/database.js';
import logMiddleware from './middlewares/logMiddleware.js';
import verifyToken from './middlewares/verifyToken.js';
import authRoutes from './routes/auth.js';
import passwordRoutes from './routes/password.js';
import ddosRoutes from './routes/ddos.js';
import mailcheckerRoutes from './routes/mailchecker.js';
import logRoutes from './routes/log.js';
import subdomainfinderRoutes from './routes/subdomainfinder.js';
import mailerRoutes from './routes/mailer.js';
import fakerRoutes from './routes/faker.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';
import passwordcheckerRoutes from './routes/passwordchecker.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MIDDLEWARE
app.use(logMiddleware);

app.use('/auth', authRoutes);
app.use('/password', verifyToken,passwordRoutes);
app.use('/ddos', verifyToken, ddosRoutes);
app.use('/mailchecker', verifyToken, mailcheckerRoutes);
app.use('/log', verifyToken, logRoutes);
app.use('/passwordchecker', verifyToken, passwordcheckerRoutes);
app.use('/subdomainfinder', verifyToken, subdomainfinderRoutes);
app.use('/mailer', verifyToken, mailerRoutes);
app.use('/faker', verifyToken, fakerRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpecs);
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

export { app };
import 'dotenv/config';
import express from 'express';
import { db } from './config/database.js';
import logMiddleware from './middlewares/logMiddleware.js';
import authRoutes from './routes/auth.js';
import passwordRoutes from './routes/password.js';
import ddosRoutes from './routes/ddos.js';
import mailcheckerRoutes from './routes/mailchecker.js';
import logRoutes from './routes/log.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// MIDDLEWARE
app.use(logMiddleware);

app.use('/auth', authRoutes);
app.use('/password', passwordRoutes);
app.use('/ddos', ddosRoutes);
app.use('/mailchecker', mailcheckerRoutes);
app.use('/log', logRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpecs);
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

export { app };
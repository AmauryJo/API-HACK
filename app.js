require('dotenv').config();
const express = require('express');
const { db } = require('./config/database');

const logMiddleware = require('./middlewares/logMiddleware');

const authRoutes = require('./routes/auth'); 
const passwordRoutes = require('./routes/password'); 
const ddosRoutes = require('./routes/ddos'); 
const mailcheckerRoutes = require('./routes/mailchecker'); 
const logRoutes = require('./routes/log'); 

const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');


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

module.exports = {app};
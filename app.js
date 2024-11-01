require('dotenv').config();
const express = require('express');
const { db } = require('./config/database');

const logMiddleware = require('./middlewares/logMiddleware');

const authRoutes = require('./routes/auth'); 
const passwordRoutes = require('./routes/password'); 
const ddosRoutes = require('./routes/ddos'); 
const logRoutes = require('./routes/log'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// MIDDLEWARE
app.use(logMiddleware);

app.use('/auth', authRoutes);
app.use('/password', passwordRoutes);
app.use('/ddos', ddosRoutes);
app.use('/log', logRoutes);

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

module.exports = {app};
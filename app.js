require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth'); 
const passwordRoutes = require('./routes/password'); 
const ddosRoutes = require('./routes/ddos'); 
// const logMiddleware = require('./middlewares/logMiddleware')

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(logMiddleware);
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/password', passwordRoutes);
app.use('/ddos', ddosRoutes);

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

module.exports = {app};
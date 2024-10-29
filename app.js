require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth'); 
const passwordRoutes = require('./routes/password'); 
const identityRoutes = require('./routes/identity'); 
// const logMiddleware = require('./middlewares/logMiddleware')

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(logMiddleware);
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/password', passwordRoutes);
app.use('/identity', identityRoutes);

// Route d'exemple'
app.get('/', (req, res) => {
    res.send('API');
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

module.exports = {app};
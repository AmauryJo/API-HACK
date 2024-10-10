const express = require('express');
const authRoutes = require('./routes/auth'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);

// Route d'exemple'
app.get('/', (req, res) => {
    res.send('API');
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

module.exports = { app};
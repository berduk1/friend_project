const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Postavljanje statičkog direktorija
app.use(express.static(path.join(__dirname))); // Poslužuje statičke datoteke iz trenutne mape

// Poslužuje new.html na root putanji
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'new.html')); // Poslužuje new.html
});

// Pokreni server
app.listen(PORT, () => {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
});
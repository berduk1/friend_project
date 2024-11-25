const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Postavljanje statičkih datoteka (HTML, CSS, JS) iz mape 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Unesi tvoj API ključ ovdje
const API_KEY = 'ZN5OM013PS0PMZEX';

// API ruta za dohvaćanje podataka iz Alpha Vantage
app.get('/api/finance/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data['Error Message']) {
            return res.status(400).json({ error: 'Neispravan simbol.' });
        }

        const dnevniPodaci = data['Time Series (Daily)'];
        const datumi = [];
        const cijene = [];

        for (let datum in dnevniPodaci) {
            datumi.push(datum);
            cijene.push(parseFloat(dnevniPodaci[datum]['4. close']));
        }

        res.json({
            datumi: datumi.reverse(),
            cijene: cijene.reverse(),
        });
    } catch (error) {
        res.status(500).json({ error: 'Greška pri dohvaćanju podataka.' });
    }
});

app.listen(port, () => {
    console.log(`Server radi na http://localhost:${port}`);
});
app.get('/api/finance/:symbol', async (req, res) => {
    console.log(`Primljen zahtjev za simbol: ${req.params.symbol}`);
    // Ostatak koda...
});
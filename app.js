// Unesi tvoj API ključ ovdje
const API_KEY = 'ZN5OM013PS0PMZEX';

// Funkcija koja dohvaća podatke
async function dohvatiPodatke() {
    const firma = document.getElementById('firma').value;
    let simbol = '';

    // Postavljanje simbola ovisno o odabiru
    switch (firma) {
        case 'SP500':
            simbol = '^GSPC'; // Simbol za S&P 500
            break;
        case 'AAPL':
            simbol = 'AAPL'; // Apple Inc.
            break;
        case 'GOOGL':
            simbol = 'GOOGL'; // Alphabet Inc.
            break;
    }

    // API URL za dohvaćanje podataka
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${simbol}&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Dohvaćanje serije cijena
        const dnevniPodaci = data['Time Series (Daily)'];
        const datumi = [];
        const cijene = [];

        for (let datum in dnevniPodaci) {
            datumi.push(datum);
            cijene.push(parseFloat(dnevniPodaci[datum]['4. close']));
        }

        // Obrnuti redoslijed da bi najnoviji podaci bili zadnji
        datumi.reverse();
        cijene.reverse();

        // Prikaz na grafu
        prikaziGraf(datumi, cijene);

        // Prikaz zadnje cijene
        const zadnjiDatum = datumi[datumi.length - 1];
        const zadnjaCijena = cijene[cijene.length - 1];
        document.getElementById('detalji').innerHTML = `Datum: ${zadnjiDatum}, Cijena: $${zadnjaCijena}`;

    } catch (error) {
        console.error('Greška pri dohvaćanju podataka:', error);
        alert('Nešto je pošlo po krivu prilikom dohvaćanja podataka!');
    }
}

// Funkcija za prikazivanje grafa pomoću Chart.js
function prikaziGraf(datumi, cijene) {
    const ctx = document.getElementById('graf').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: datumi,
            datasets: [{
                label: 'Cijena',
                data: cijene,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Datum'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cijena u USD'
                    },
                    beginAtZero: false
                }
            }
        }
    });
}
async function dohvatiPodatke() {
    console.log('Funkcija dohvati podatke je pokrenuta');
    const firma = document.getElementById('firma').value;
    let simbol = '';

    switch (firma) {
        case 'SP500':
            simbol = '^GSPC';
            break;
        case 'AAPL':
            simbol = 'AAPL';
            break;
        case 'GOOGL':
            simbol = 'GOOGL';
            break;
    }

    const response = await fetch(`/api/finance/${simbol}`);
    const data = await response.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    const datumi = data.datumi;
    const cijene = data.cijene;

    // Prikaz na grafu
    prikaziGraf(datumi, cijene);

    // Prikaz zadnje cijene
    const zadnjiDatum = datumi[datumi.length - 1];
    const zadnjaCijena = cijene[cijene.length - 1];
    document.getElementById('detalji').innerHTML = `Datum: ${zadnjiDatum}, Cijena: $${zadnjaCijena}`;
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
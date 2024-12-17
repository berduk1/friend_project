const apiKey = 'ZN5OM013PS0PMZEX'; // Zamijeni sa svojim ključem
        let chart;

        // Funkcija za dohvat podataka
        async function fetchData() {
            const selectedSymbol = document.getElementById("indexSelect").value;
            const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selectedSymbol}&apikey=${apiKey}`;
            
            document.getElementById("status").innerText = "Status: Dohvaćanje podataka...";

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (!data["Time Series (Daily)"]) {
                    throw new Error("Podaci nisu dostupni");
                }

                // Priprema podataka za graf
                const timeSeries = data["Time Series (Daily)"];
                const chartData = Object.entries(timeSeries).map(([date, values]) => {
                    return [Date.parse(date), parseFloat(values["4. close"])];
                }).sort((a, b) => a[0] - b[0]);

                renderChart(selectedSymbol, chartData);
                document.getElementById("status").innerText = "Status: Podaci dohvaćeni!";
            } catch (error) {
                document.getElementById("status").innerText = "Greška: Podaci nisu dostupni!";
                console.error(error);
            }
        }

        // Funkcija za prikazivanje grafa
        function renderChart(symbol, data) {
            const indexNames = {
                SPY: "S&P 500",
                DIA: "Dow Jones",
                QQQ: "Nasdaq 100"
            };

            if (!chart) {
                chart = Highcharts.chart('container', {
                    title: { text: `Cijene ${indexNames[symbol]} indeksa` },
                    xAxis: { type: 'datetime', title: { text: 'Datum' } },
                    yAxis: { title: { text: 'Cijena (USD)' } },
                    series: [{ name: indexNames[symbol], data: data, color: '#007bff' }],
                    credits: { enabled: false }
                });
            } else {
                chart.update({
                    title: { text: `Cijene ${indexNames[symbol]} indeksa` },
                    series: [{ name: indexNames[symbol], data: data }]
                });
            }
        }
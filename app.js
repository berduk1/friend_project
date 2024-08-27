var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    console.log('request was made: ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/index.html',  'utf8');
    myReadStream.pipe(res);
});

server.listen(3000, '127.0.0.1');
console.log('listening to port 3000');

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Posluži statičke datoteke (npr. HTML)
app.use(express.static(path.join(__dirname)));

// Postavi rutu za početnu stranicu
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Pokreni server
app.listen(PORT, () => {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
});
const os = require('os');
const express = require('express');
const db = require('./query');

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(request, response) {
    response.status(200).json({ info: 'Node.js, Express, and Postgres API' });
})

app.get('/config', function(request, response) {
    
	var connectionInfo = {
		greeting : process.env.GREETING,
		url : process.env.DATABASE_URI,
		host : process.env.POSTGRES_HOST,
		port : process.env.POSTGRES_PORT,
		user : process.env.POSTGRES_USER,
		password : process.env.POSTGRES_PASSWORD,
		database : process.env.POSTGRES_DB
	}
	console.log(`Creating database connection pool using ${connectionInfo}`);
    response.status(200).json(connectionInfo);
})

app.get("/health", function(request, response) {
    console.log("Received request from " + os.hostname() + ", ipaddr = " + request.connection.remoteAddress);
    response.status(200).json({ status: 'OK' });
});

app.get('/clients', db.getClients);
app.get('/clients/:id', db.getClientById);
app.post('/clients', db.createClient);
app.put('/clients/:id', db.updateClient);
app.delete('/clients/:id', db.deleteClient);

app.listen(8080, function() {
    console.log("Server listening on port 8080...");
});
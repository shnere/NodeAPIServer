var express = require('express'),
			domo = require(__dirname + '/routes/domo');

var app = express();

app.set('view engine', 'jade')

app.configure(function () {
	app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
});


/* API Functions
-------------------------------------------------- */

/* Devices
---------------------- */
app.get('/devices', domo.getDevices);

app.post('/device', domo.addDevice); // Create
app.get('/device', domo.getDevice); // Read
app.put('/device/:id', domo.updateDevice); // Update
app.delete('/device/:id', domo.deleteDevice); // Delete

app.get('/device/data/:id', domo.getDeviceData);
app.get('/device/ask_data/:id', domo.getDeviceCurrentData);
app.post('/device/data/:id', domo.pushData);

/* Rules
---------------------- */
app.post('/rule', domo.addRule); // Create
app.get('/rule/:id', domo.getRule); // Read
app.put('/rule/:id', domo.updateRule); // Update
app.delete('/rule/:id', domo.deleteRule); // Delete

/* Spaces
---------------------- */
app.post('/space', domo.addSpace); // Create
app.get('/space/:id', domo.getSpace); // Read
app.put('/space/:id', domo.updateSpace); // Update
app.delete('/space/:id', domo.deleteSpace); // Delete

/* Protocols
---------------------- */
app.post('/protocol', domo.addProtocol); // Create
app.get('/protocol/:id', domo.getProtocol); // Read
app.put('/protocol/:id', domo.updateProtocol); // Update
app.delete('/protocol/:id', domo.deleteProtocol); // Delete


app.listen(3000);
console.log('Listening on port 3000');
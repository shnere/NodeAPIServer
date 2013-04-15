var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('domodb', server);


// Conexion a la db
db.open(function(err, db){
	if(!err){
		console.log("Connected to 'domodb' database");
		// db.createCollection('spaces', {strict : true}, function(err, collection) {
		// 	if (err) {
		// 		console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
		// 		populateDB();
		// 	}
		// });
	}
});

/* API Functions
-------------------------------------------------- */

/* Devices
---------------------- */
exports.getDevices = function(req, res) {
	db.collection('devices', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	})
}

exports.addDevice = function(req, res) {
	var device = req.body;
	console.log('Adding device: ' + JSON.stringify(device));
	db.collection('devices', function(err, collection) {
		collection.insert(devices, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}

exports.getDevice = function(req, res) {
	var id = req.params.id;
	db.collection('devices', function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
			res.send(item);
		});
	})
}

exports.updateDevice = function(req, res) {
	var id = req.params.id;
	var device = req.body;
	console.log('Updating device: ' + id);
	console.log(JSON.stringify(device));
	db.collection('devices', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, device, {safe:true}, function(err, result) {
			if (err) {
				console.log('Error updating device: ' + err);
				res.send({'error':'An error has occurred'});
			} else {
				console.log('' + result + ' document(s) updated');
				res.send(device);
			}
		});
	});
}


exports.deleteDevice = function(req, res) {
	var id = req.params.id;
	console.log('Deleting device: ' + id);
	db.collection('devices', function(err, collection) {
		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred - ' + err});
			} else {
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);
			}
		});
	});
}

exports.getDeviceData = function(req, res) {}

exports.getDeviceCurrentData = function(req, res) {}

exports.pushData = function(req, res) {}


/* Rules
---------------------- */
exports.addRule = function(req, res) {}
exports.getRule = function(req, res) {}
exports.updateRule = function(req, res) {}
exports.deleteRule = function(req, res) {}

/* Spaces
---------------------- */
exports.addSpace = function(req, res) {}
exports.getSpace = function(req, res) {}
exports.updateSpace = function(req, res) {}
exports.deleteSpace = function(req, res) {}

// params req.params.NOMBREPARAM
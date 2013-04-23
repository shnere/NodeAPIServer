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
	});
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
	});
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
exports.addRule = function(req, res) {
	var rule = req.body;
	console.log('Adding rule: ' + JSON.stringify(rule));
	db.collection('rules', function(err, collection) {
		collection.insert(rule, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}
exports.getRule = function(req, res) {
	var id = req.params.id;
	db.collection('rules', function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
			res.send(item);
		});
	});
}
exports.updateRule = function(req, res) {
	var id = req.params.id;
	var rule = req.body;
	console.log('Updating rule: ' + id);
	console.log(JSON.stringify(rule));
	db.collection('rules', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, rule, {safe:true}, function(err, result) {
			if (err) {
				console.log('Error updating device: ' + err);
				res.send({'error':'An error has occurred'});
			} else {
				console.log('' + result + ' rules(s) updated');
				res.send(device);
			}
		});
	});
}
exports.deleteRule = function(req, res) {
	var id = req.params.id;
	console.log('Deleting rule: ' + id);
	db.collection('rules', function(err, collection) {
		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred - ' + err});
			} else {
				console.log('' + result + ' rule(s) deleted');
				res.send(req.body);
			}
		});
	});
}

/* Spaces
---------------------- */
exports.addSpace = function(req, res) {
	var space = req.body;
	console.log('Adding space: ' + JSON.stringify(space));
	db.collection('spaces', function(err, collection) {
		collection.insert(space, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}
exports.getSpace = function(req, res) {
	var id = req.params.id;
	db.collection('spaces', function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
			res.send(item);
		});
	});
}
exports.updateSpace = function(req, res) {
	var id = req.params.id;
	var space = req.body;
	console.log('Updating space: ' + id);
	console.log(JSON.stringify(space));
	db.collection('spaces', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, space, {safe:true}, function(err, result) {
			if (err) {
				console.log('Error updating space: ' + err);
				res.send({'error':'An error has occurred'});
			} else {
				console.log('' + result + ' space(s) updated');
				res.send(space);
			}
		});
	});
}
exports.deleteSpace = function(req, res) {
	var id = req.params.id;
	console.log('Deleting space: ' + id);
	db.collection('spaces', function(err, collection) {
		collection.remove({'_id': new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred - ' + err});
			} else {
				console.log('' + result + ' space(s) deleted');
				res.send(req.body);
			}
		});
	});
}

/* Protocols
---------------------- */
exports.addProtocol = function(req, res) {
	var protocol = req.body;
	console.log('Adding protocol: ' + JSON.stringify(space));
	db.collection('protocols', function(err, collection) {
		collection.insert(protocol, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}
exports.getProtocol = function(req, res) {
	var id = req.params.id;
	db.collection('protocol', function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
			res.send(item);
		});
	});
}
exports.updateProtocol = function(req, res) {
	var id = req.params.id;
	var protocol = req.body;
	console.log('Updating space: ' + id);
	console.log(JSON.stringify(protocol));
	db.collection('protocols', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, protocol, {safe:true}, function(err, result) {
			if (err) {
				console.log('Error updating space: ' + err);
				res.send({'error':'An error has occurred'});
			} else {
				console.log('' + result + ' space(s) updated');
				res.send(protocol);
			}
		});
	});
}
exports.deleteProtocol = function(req, res) {
	var id = req.params.id;
	console.log('Deleting protocol: ' + id);
	db.collection('protocols', function(err, collection) {
		collection.remove({'_id': new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred - ' + err});
			} else {
				console.log('' + result + ' space(s) deleted');
				res.send(req.body);
			}
		});
	});
}

// params req.params.NOMBREPARAM
var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('widmore.mongohq.com', 10000, {auto_reconnect: true});
db = new Db('Domo', server);

// Conexion a la db
db.open(function(err, p_client) {
  //Notice the USERNAME and PASSWORD!
  db.authenticate('domo', 'arigato', function(err) {
   //Change error handler when going into production 
   if (err) console.log(err);
    
    var collection = new mongo.Collection(db, 'test_collection');
    collection.find({}, {limit:10}).toArray(function(err, docs) {
      //In an array, this will log all your documents you added before we tested this
      console.dir(docs);
    });
  });
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

exports.pushData = function(req, res) {
	// Aqui va la logica de setPin
	
	
	var serialport = require("serialport");

	var serialPort = new serialport.SerialPort("/dev/ttyUSB0", {
		baudRate: 9600,
		dataBits: 8,
		parity: 'none',
		stopBits: 1,
		flowControl: false,
		parser: serialport.parsers.readline("\n") 
	});

	serialPort.on("open", function () {
	  console.log('open');
	  serialPort.on('data', function(data) {
	    console.log('data received: ' + data);
	  });  

	function setPin(xbee_addr, pin, state){
		// Valores predefinidos
		var frame = [0x7E, 0x00, 0x10, 0x17, 0x01];
		var checksum = 0x00;

		// Append la direccion
		frame = frame.concat(xbee_addr);

		// FF FE valores default
		frame.push(0xFF, 0xFE);

		frame.push(0x02); // 0x02 – Apply changes on remote. (If not set, AC command 
	                    // must be sent before changes will take effect.)

		// Pusheo de pin: D#
		frame.push(0x44);  //D
		frame.push(pin);  //0,1,2,3...   1 = 31 en ascii

		frame.push(state); //4 apaga, 5 enciende

		for(i = 3; i < 19; i++){
			checksum += frame[i];
		}
		//console.log("Checksum: " + checksum.toString(16));
		// 54F to string le quitas el 5 y se lo restas a FF
		checksum = parseInt(checksum.toString(16).substring(1),16);
		//console.log("Checksum: " + checksum);
		checksum = 0xFF - checksum;
		//console.log("Resto 0xff y da: " + checksum);
		frame.push(checksum);

		return frame;
	}

	var intArray = setPin([0x00,0x13,0xa2,0x00,0x40,0x91,0x8c,0xad], 0x31, 0x05);

	serialPort.write(intArray, function(err, results) {
	    console.log('err ' + err);
	    console.log('results ' + results);
	  });

	});
	
	
	
}


/* Rules
---------------------- */
exports.getRules = function(req, res) {
	db.collection('rules', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
}

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
exports.getSpaces = function(req, res) {
	db.collection('spaces', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
}

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
exports.getProtocols = function(req, res) {
	db.collection('protocols', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
}


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
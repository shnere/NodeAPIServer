#Node JS + Express API for a domotic framework.

MongoDB + xbee

## API

All _id's use mongodb's ObjectID() default assignation.

### Spaces
	{
		_id: ObjectID(),
		name: ""
	 }

### Devices
	{
		_id: ObjectID(),
		name: "",
		space_id: ObjectID(),
		protocol_id: ObjectID(),
		pan_id: ,
		network_address: ,
		node_identifier: ,
		is_sensor: 0,
		is_actuator: 1,
		subdevice_count: 0,
		subdevices: {
			subdevice_id: ObjectID(),
			status: 0,
		},
		status: 1
	}

### Data
Historical information of a device

	{
		_id: ObjectID(),
		device_id: ObjectID(),
		protocol_id: ObjectID(),
		value: ,
		date_time: 
	}

### Protocols
Each device implements a protocol that contains a data type

	{
		_id: ObjectID(),
		name: "",
		data_type: "",
		units: ""
	}
	
### Rules
Actions of the type "if this then that". Can involve two different devices (origin + destination)

	{
		_id: ObjectID(),
		origin_id: ObjectID(),
		destination_id: ObjectID(),
		condition: "",
		action: "" 
	}
	
## CURL Tests

### Create
	curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Sala"}' http://localhost:3000/space
	
### Read
	curl -i -X GET http://localhost:3000/space/5175d8d1f825f92185000001

### Update
	curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "Comedor"}' http://localhost:3000/space/5175d8d1f825f92185000001

### Delete
	curl -i -X DELETE http://localhost:3000/space/5175d8d1f825f92185000001


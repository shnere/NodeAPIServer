#Node JS + Express API for a domotic framework.

MongoDB + xbee

## API

All _id's use mongodb's ObjectId() default assignation.

### Spaces
	{
		_id: ObjectId(),
		name: ""
	 }

### Devices
	{
		_id: ObjectId(),
		name: "",
		space_id: ObjectId(),
		protocol_id: ObjectId(),
		pan_id: "",
		network_address: "",
		node_identifier: "",
		is_sensor: "0",
		is_actuator: "1",
		subdevice_count: "0",
		subdevices: {
			subdevice_id: ObjectId(),
			status: "0",
		},
		status: "1"
	}

### Data
Historical information of a device

	{
		_id: ObjectId(),
		device_id: ObjectId(),
		protocol_id: ObjectId(),
		value: "",
		date_time: ""
	}

### Protocols
Each device implements a protocol that contains a data type

	{
		_id: ObjectId(),
		name: "",
		data_type: "",
		units: ""
	}
	
### Rules
Actions of the type "if this then that". Can involve two different devices (origin + destination)

	{
		_id: ObjectId(),
		origin_id: ObjectId(),
		destination_id: ObjectId(),
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

## Configuration
1. Create or know Space
2. Create or know Protocol
3. Register Device
4. Add Data

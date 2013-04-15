#Node JS + Express API for a domotic framework.

MongoDB + xbee

## API

### Spaces
	{
		_id: ,
		name: ""
	 }

### Devices
	{
		_id: ,
		name: "",
		space_id: ,
		protocol_id: ,
		pan_id: ,
		network_address: ,
		node_identifier: 
	}

### Data
Historical information of a device

	{
		_id: ,
		device_id: ,
		value: ,
		date_time: ,
	}

### Protocols
Each device implements a protocol that contains a data type

	{
		_id: ,
		name: "",
		data_type: ""
	}
	
### Rules
Actions of the type "if this then that". Can involve two different devices
	{
		_id: ,
		origin_id: ,
		destination_id: ,
		condition: "",
		action: "" 
	}
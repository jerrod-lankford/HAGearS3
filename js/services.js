var HAServices = (function() {
 
	var URL = "https://yoururlhere/api/";
	var PASSWORD = "password";
	
	var DEFAULT_HEADERS =  {
		'Content-Type': 'application/json',
		'x-ha-access': PASSWORD
	};
	
	function getEntities(success, error) {
		$.ajax({
			url: URL + "states",
			headers: {
				'x-ha-access': PASSWORD
			},
			success: success,
			error: error
		});
	}
	
	function switchOn(entity_id) {
		$.ajax({
			type: "POST",
			url: URL + "services/switch/turn_on",
			headers: DEFAULT_HEADERS,
			data: JSON.stringify({"entity_id": entity_id})
		});		
	}
	
	function switchOff(entity_id) {
		$.ajax({
			type: "POST",
			url: URL + "services/switch/turn_off",
			headers: DEFAULT_HEADERS,
			data: JSON.stringify({"entity_id": entity_id})
		});
	}
	
	function lightOn(entity_id) {
		$.ajax({
			type: "POST",
			url: URL + "services/light/turn_on",
			headers: DEFAULT_HEADERS,
			data: JSON.stringify({"entity_id": entity_id})
		});
	}
	
	function lightOff(entity_id) {
		$.ajax({
			type: "POST",
			url: URL + "services/light/turn_off",
			headers: DEFAULT_HEADERS,
			data: JSON.stringify({"entity_id": entity_id})
		});
	}
	
	function scriptOn(entity_id) {
		$.ajax({
			type: "POST",
			url: URL + "services/script/turn_on",
			headers: DEFAULT_HEADERS,
			data: JSON.stringify({"entity_id": entity_id})
		});
	}
	
	function scriptOff(entity_id) {
		$.ajax({
			type: "POST",
			url: URL + "services/script/turn_off",
			headers: DEFAULT_HEADERS,
			data: JSON.stringify({"entity_id": entity_id})
		});
	}
	
	function coverOpen(entity_id) {
		$.ajax({
			type: "POST",
			url: URL + "services/cover/open_cover",
			headers: DEFAULT_HEADERS,
			data: JSON.stringify({"entity_id": entity_id})
		});
	}
	
	function coverClose(entity_id) {
		$.ajax({
			type: "POST",
			url: URL + "services/cover/close_cover",
			headers: DEFAULT_HEADERS,
			data: JSON.stringify({"entity_id": entity_id})
		});
	}
	
	function groupOn(entity_id) {
		$.ajax({
			type: "POST",
			url: URL + "services/homeassistant/turn_on",
			headers: DEFAULT_HEADERS,
			data: JSON.stringify({"entity_id": entity_id})
		});
	}
	
	function groupOff(entity_id) {
		$.ajax({
			type: "POST",
			url: URL + "services/homeassistant/turn_off",
			headers: DEFAULT_HEADERS,
			data: JSON.stringify({"entity_id": entity_id})
		});
	}
	
	// Exports
	return {
		getEntities: getEntities,
		switchOn: switchOn,
		switchOff: switchOff,
		lightOn: lightOn,
		lightOff: lightOff,
		scriptOn: scriptOn,
		scriptOff: scriptOff,
		coverOpen: coverOpen,
		coverClose: coverClose,
		groupOn: groupOn,
		groupOff: groupOff
	};
})();
var HAServices = (function() {
	
	// Private function for building the service post request
	function HAServices() {
	    this.url = localStorage.getItem('ha-url');
		this.password = localStorage.getItem('ha-pass');
	}
	
	HAServices.prototype.updateCredentials = function(url, password){
		if (url.endsWith("/")) {
			url = url.slice(0,url.length-1);
		}
		localStorage.setItem('ha-url', url);
		localStorage.setItem('ha-pass', password);
		
		this.url = url;
		this.password = password;
	};
	
	HAServices.prototype.getCredentials = function() {
		return {
			url: this.url,
			password: this.password
		}
	};
	
	HAServices.prototype.getEntities = function(success, error) {
		$.ajax({
			url: this.url + "/api/states",
			headers: {
				'x-ha-access': this.password
			},
			success: success,
			error: error
		});
	};
	
	// Function should only be used privately
	HAServices.prototype.buildPostRequest = function(path, entity_id) {
		
		return {
			type: "POST",
			url: this.url + "/api/services/" + path,
			data: JSON.stringify({"entity_id": entity_id}),
			headers: {
				'Content-Type': 'application/json',
				'x-ha-access': this.password
			}
		};
	}
	
	
	HAServices.prototype.switchOn = function(entity_id) {
		$.ajax(this.buildPostRequest("switch/turn_on", entity_id));	
	};
	
	HAServices.prototype.switchOff = function (entity_id) {
		$.ajax(this.buildPostRequest("switch/turn_off", entity_id));	
	};
	
	HAServices.prototype.lightOn = function(entity_id) {
		$.ajax(this.buildPostRequest("light/turn_on", entity_id));	
	};
	
	HAServices.prototype.lightOff = function(entity_id) {
		$.ajax(this.buildPostRequest("light/turn_off", entity_id));	
	};
	
	HAServices.prototype.scriptOn = function(entity_id) {
		$.ajax(this.buildPostRequest("script/turn_on", entity_id));	
	};
	
	HAServices.prototype.scriptOff = function (entity_id) {
		$.ajax(this.buildPostRequest("script/turn_off", entity_id));	
	};
	
	HAServices.prototype.coverOpen = function(entity_id) {
		$.ajax(this.buildPostRequest("cover/open_cover", entity_id));	
	};
	
	HAServices.prototype.coverClose = function(entity_id) {
		$.ajax(this.buildPostRequest("cover/close_cover", entity_id));	
	};
	
	HAServices.prototype.groupOn = function(entity_id) {
		$.ajax(this.buildPostRequest("homeassistant/turn_on", entity_id));	
	};
	
	HAServices.prototype.groupOff = function(entity_id) {
		$.ajax(this.buildPostRequest("homeassistant/turn_off", entity_id));	
	};
	
	return new HAServices();
	
})();
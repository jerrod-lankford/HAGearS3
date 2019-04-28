/**
 * Class that controls all of the xhr calls to HomeAssistant
 * @author Jerrod Lankford
 */
var HAServices = (function() {
	
	// Private function for building the service post request
	function HAServices() {
	    this.url = localStorage.getItem('ha-url');
		this.token = localStorage.getItem('ha-token');
	}
	
	/**
	 * Update the url and password and save them to local storage
	 * @param url
	 * @param password
	 */
	HAServices.prototype.updateCredentials = function(url, token, callback){
		this.setTokenFromCl1p(token, function(token) {
			this.token = token;
			if (url.endsWith("/")) {
				url = url.slice(0,url.length-1);
			}
			localStorage.setItem('ha-url', url);
			localStorage.setItem('ha-token', token);
			
			this.url = url;
			callback();
		}.bind(this));
	};
	
	/**
	 * Update the url and password and save them to local storage
	 * @param url
	 * @param password
	 */
	HAServices.prototype.setTokenFromCl1p = function(clipPath, callback){
		$.ajax({
			url: "https://cl1p.net/" + clipPath,
			success:function(data) {
				token = $(data).find("textarea").text();
				if (token.length > 100) {
					callback(token);
				} else {
					// Show error popup
					$('#error-popup-contents').text("No valid token\n found for\n" + clipPath);
					tau.changePage('error-popup');	
				}
			}.bind(this),
			error: function(xhr, status, message) {	
				// TODO more status to message conversions?
				if (!message) {
					if (xhr.status === 0) {
						message = "Check network connection or home assistant url in setup";
					} else {
						message = "An unknown error has occured.";
					}
				}
				
				// Show error popup
				$('#error-popup-contents').text("An error has occured.\n" + "Status code: " + xhr.status + "\n" + "Messsage: " + message);
				tau.changePage('error-popup');
			}.bind(this) 
		});
	};
	
	/**
	 * Fetch saved credentials
	 * @returns creds
	 */
	HAServices.prototype.getCredentials = function() {
		return {
			url: this.url,
			token: this.token
		}
	};
	
	/**
	 * Get a list of entities from HomeAssistant
	 * @param success callback function for success
	 * @param error callback function for error
	 */
	HAServices.prototype.getEntities = function(success, error) {
		$.ajax({
			url: this.url + "/api/states",
			headers: {
				'Authorization': 'Bearer ' + this.token
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
				'Authorization': 'Bearer ' + this.token
			}
		};
	}
	
	// Service calls
	
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
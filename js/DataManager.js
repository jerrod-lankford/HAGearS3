/**
 * This object is responsible for fetching data from the server but also for caching it in
 * local storage as well.
 */
var DataManager = (function(){
	function DataManager() {
		// Load cached entities
		var entitiesCache = localStorage.getItem('ha-entities');
		
		if (entitiesCache) {
			try {
				this.entities = JSON.parse(entitiesCache);
			} catch(err) {
				// Ignore parse exception, we will just refetch
			}
		}
	}
	
	DataManager.prototype.load = function(success, error) {
		// Fetch home assistant entities
		HAServices.getEntities(function(data){
			this.entities = data;
			
			// Cache entities
			localStorage.setItem('ha-entities',  JSON.stringify(this.entities));
			
			// Invoke a success callback if we are provided with one
			success && success(this.entities);
		}.bind(this), function(xhr, status, message) {	
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
			
			// Invoke error callback if we are provided with one
			error && error(this.entities);
		}.bind(this));
	};
	
	DataManager.prototype.getEntities = function() {
		return this.entities;
	};
	
	return DataManager;
})();
/**
 * This object is responsible for fetching data from the server but also for caching it in
 * local storage as well.
 */
var DataManager = (function(){
	function DataManager() {
		// Load cached entities
		this.entities = loadEntities('ha-entities');
		this.hiddenEntities = loadEntities('ha-hidden-entities');
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
					message = "Check network connection or home assistant url in settings";
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

	DataManager.prototype.getHiddenEntities = function(){
		return this.hiddenEntities;
	}

	DataManager.prototype.saveHiddenEntities = function(){
		// Remove duplicates (there should not be any)
		// this.hiddenEntities = Array.from(Set(this.hiddenEntities).values())
		// Save the list
		localStorage.setItem('ha-hidden-entities',  JSON.stringify(this.hiddenEntities));
	}

	DataManager.prototype.addHiddenEntity = function(entityID){
		if (this.hiddenEntities.includes(entityID)){
			return;
		}
		this.hiddenEntities.push(entityID);
		this.saveHiddenEntities();
	}

	DataManager.prototype.removeHiddenEntity = function(entityID){
		if (! this.hiddenEntities.includes(entityID)){
			return;
		}
		this.hiddenEntities = this.hiddenEntities.filter(function(item){return item !== entityID});
		this.saveHiddenEntities();
	}

	loadEntities = function(storageKey){
		var entities;
		var entitiesCache = localStorage.getItem(storageKey);
		if (entitiesCache) {
			try {
				return JSON.parse(entitiesCache);
			} catch(err) {
				// Ignore parse exception, Consider none is hidden
				return [];
			}
		}
		return [];
	}

	return DataManager;
})();
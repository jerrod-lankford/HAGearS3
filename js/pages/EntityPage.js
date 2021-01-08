/**
 * Create an entity page, based on the entity type metadata and the entity content
 * The reason that we do it this way is because so far all of the entites behave the same exact way with slight differences.
 * Icons, Services that they call on toggle, etc...
 */
var EntityPage = (function() {

	/**
	 * Constructor
	 * @param entity The json object with all of the entity information
	 */
	function EntityPage(dataManager) {
		this.currentPage = null;
		this.dataManager = dataManager;

		$('#entity-back-button').click(EntityBack);

		// Blank out the current page on hide
		document.getElementById('entity').addEventListener("pagebeforehide", function() {
			this.currentPage = null;
		}.bind(this));

	}

	function EntityBack() {
		history.back();
	}

	EntityPage.prototype.createEntityPage = function(metadata, entity) {
		createEntityDom(metadata, entity, this.dataManager.getHiddenEntities());
		registerEntityEventHandlers(this.dataManager, entity.entity_id);
		this.currentPage = entity.attributes.friendly_name;
	};

	// Helper method to create the list dom from the entities
	function createEntityDom(metadata, entity, hiddenEntities) {
		var domString = "";
		// Add additional functionalities

		$('#entity-attribute-list').html(domString);
		$('#entity-title').html(entity.attributes.friendly_name);
	}

	// Helper to register click handlers for the list items
	function registerEntityEventHandlers(dataManager, entity_id) {
		$('.entity-attribute-item').click(function(e) {
			var li = e.currentTarget;
			var attribute = li.dataset.attribute;
			switch(attribute){

			}
		});
	}

	return EntityPage;
})();
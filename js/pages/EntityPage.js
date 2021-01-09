/**
 * Create an entity page, based on the entity type metadata and the entity content
 * The reason that we do it this way is because so far all of the entites behave the same exact way with slight differences.
 * Icons, Services that they call on toggle, etc...
 */
var EntityPage = (function() {

	var templateSwitch = [
		'<li class="entity-attribute-item li-has-toggle" data-attribute="%1">',
			'<label>',
				'<div class="name-container ui-marquee ui-marquee-gradient">',
					'%2',
				'</div>',
				'<label class="switch %3">',
					'<span class="slider round"></span>',
				'</label>',
			'</label>',
		'</li>'
	]

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
		registerEntityEventHandlers(this.dataManager, entity, metadata);
		this.currentPage = entity.attributes.friendly_name;
	};

	// Helper method to create the list dom from the entities
	function createEntityDom(metadata, entity, hiddenEntities) {
		var domString = "";

		if (metadata.supports.includes("on-off")){
			var checked = entity.state === metadata.selectedState ? "switch-checked" : "";
			domString = domString + templateSwitch.join('\n').replace(/%1/g, "on-off")
				.replace(/%2/g, "On/Off")
				.replace(/%3/g, checked);
		}
		// Add additional functionalities

		var checked = hiddenEntities.includes(entity.entity_id) ? "switch-checked" : "";
		domString = domString + templateSwitch.join('\n').replace(/%1/g, "hidden")
			.replace(/%2/g, "Hidden")
			.replace(/%3/g, checked);

		$('#entity-attribute-list').html(domString);
		$('#entity-title').html(entity.attributes.friendly_name);
	}

	// Process the "Hidden" switch that controls the entity hiding
	function processHidden(dataManager, entity_id, switchElement){
		if (dataManager.getHiddenEntities().includes(entity_id)){
			dataManager.removeHiddenEntity(entity_id);
			switchElement.classList.remove("switch-checked");
		} else {
			dataManager.addHiddenEntity(entity_id);
			switchElement.classList.add("switch-checked");
		}
	}

	// Process the "On-Off" switch that controls the entity hiding
	function processOnOff(metadata, entity, switchElement){
		if (entity.state === metadata.selectedState) {
			// TODO FIX makes assumptions that deselect is a function that needs to be invoked in the context of the services class
			metadata.deselect.call(HAServices, entity.entity_id);
			if (metadata.title != "Scenes") {
				entity.state = metadata.deselectedState
				switchElement.classList.remove("switch-checked");
			}
		} else {
			// TODO FIX makes assumptions that deselect is a function that needs to be invoked in the context of the services class
			metadata.select.call(HAServices, entity.entity_id);
			if (metadata.title != "Scenes") {
				entity.state = metadata.selectedState
				switchElement.classList.add("switch-checked");
			}
		}
	}

	// Helper to register click handlers for the list items
	function registerEntityEventHandlers(dataManager, entity, metadata) {
		$('.entity-attribute-item').click(function(e) {
			var li = e.currentTarget;
			var attribute = li.dataset.attribute;
			switch(attribute){
				case "hidden":
					processHidden(dataManager, entity.entity_id, li.getElementsByClassName("switch")[0]);
					break;
				case "on-off":
					processOnOff(metadata, entity, li.getElementsByClassName("switch")[0]);
					break;
			}
		});
	}

	return EntityPage;
})();
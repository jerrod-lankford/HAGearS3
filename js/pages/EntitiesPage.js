/**
 * Create an entity list given metadata about this list. See ViewMetadata for all of the entity specific metadata.
 * The reason that we do it this way is because so far all of the entites behave the same exact way with slight differences.
 * Icons, Services that they call on toggle, etc...
 */
var EntitiesPage = (function() {

	// Item template
	var TEMPLATE = [
		'<li class="li-has-toggle" >',
			'<label>',
					'<div class="entity-list-item name-container ui-marquee ui-marquee-gradient" data-entity-id="%1">',
						"%2",
					'</div>',
				'<div class="entity-list-item-icon icon-container %3 %4" data-entity-id="%1">',
					'<div class="mdi mdi-48px %5"></div>',
				'</div>',
			'</label>',
		'</li>'].join('\n');

	/**
	 * Constructor
	 * @param entity The json object with all of the entity information
	 */
	function EntitiesPage(dataManager, entityPage) {
		this.currentPage = null;
		this.dataManager = dataManager;
		this.EntityPage = entityPage;

		// Attach refresh click handler
		$('#refresh-button').click(refresh.bind(this));

		// Do not blank out the current page to allow returning from an entity page
		// // Blank out the current page on hide
		// document.getElementById('entities').addEventListener("pagebeforehide", function() {
		// 	this.currentPage = null;
		// }.bind(this));

	}

	/**
	 * Create an entity list and register the click handlers for each entity in the list
	 * @param currentPage the title of the current page being displayed
	 */
	EntitiesPage.prototype.create = function(view) {
		var entities = this.dataManager.getEntities()
		createDom(entities, view);
		registerEventHandlers(this.EntityPage, view, entities);
		this.currentPage = view;
	};

	/**
	 * Update the current page with new entities
	 * @param entities All of the entities in HomeAssistant
	 */
	EntitiesPage.prototype.update = function() {
		if (this.currentPage) {
			this.create(this.currentPage);

			// This is necessary since we blow the dom away. It makes the snaplist work again
			// The snaplist meaning, it selects an item as you scroll. Also handles marquee scrolling
			var list = document.getElementById('entity-list');
			snapList = tau.widget.SnapListview(list);
			snapList.refresh();
		}
	}

	// Helper method to create the list dom from the entities
	function createDom(entities, view) {
		var filterString = EntityMetadata[view].name + ".";

		var filteredEntities = entities.filter(function(entity){
			if (entity.entity_id.startsWith(filterString)) {
				return true;
			}
		}).sort(function(entity1, entity2){
			if (entity1.attributes.friendly_name.toLowerCase() < entity2.attributes.friendly_name.toLowerCase()) return -1;
			if (entity1.attributes.friendly_name.toLowerCase() > entity2.attributes.friendly_name.toLowerCase()) return 1;
			return 0;
		});

		var domString = "";
		for (var i=0;i<filteredEntities.length;i++) {
			domString = domString + createListItem(filteredEntities[i], view);
		}

		$('#entity-list').html(domString);
		$('#entity-list-title').html(view);
	}

	// Helper to register click handlers for the list items
	registerEventHandlers = function(entitiesPage, view, entities) {
		$('.entity-list-item-icon').click(function(e) {
			var li = e.currentTarget;
			var entity_id = li.dataset.entityId;
			var entity = entities.filter(function(entity){
				if (entity.entity_id === entity_id) {
					return true;
				}
			})[0];

			var metadata = EntityMetadata[view];

			// We have to flip the value since the input has changed when we get the event
			var selected = li.classList.contains("selected");
			if (selected) {
				// TODO FIX makes assumptions that deselect is a function that needs to be invoked in the context of the services class
				metadata.deselect.call(HAServices, entity_id);
				if (metadata.title != "Scenes") {
					entity.state = metadata.deselectedState
					li.classList.remove("selected");
				}
			} else {
				// TODO FIX makes assumptions that deselect is a function that needs to be invoked in the context of the services class
				metadata.select.call(HAServices, entity_id);
				if (metadata.title != "Scenes") {
					entity.state = metadata.selectedState
					li.classList.add("selected");
				}
			}
		});
		$('.entity-list-item').click(function(e) {
			var li = e.currentTarget;
			var entity_id = li.dataset.entityId;
			var entity = entities.filter(function(entity){
				if (entity.entity_id === entity_id) {
					return true;
				}
			})[0];
			var metadata = EntityMetadata[view];

			entitiesPage.createEntityPage(EntityMetadata[metadata.title], entity);
			tau.changePage('entity');
		});
	}

	// Create a dom string representing an entity in the list
	function createListItem (entity, view) {
		var metadata = EntityMetadata[view];
		var selected = entity.state === metadata.selectedState ? "selected" : "";
		var icon = (entity.attributes.icon && entity.attributes.icon.replace(":", "-")) ||
		 	metadata.defaultIcon;
		return TEMPLATE.replace(/%1/g, entity.entity_id)
						.replace(/%2/g, entity.attributes.friendly_name)
						.replace(/%3/g, metadata.name + '-icon-container')
						.replace(/%4/g, selected)
						.replace(/%5/g, icon);
	}

	function refresh() {
		// Show spinner
		$('#entity-spinner').removeClass('hidden');
		this.dataManager.load(function(data){
			// Hide spinner
			$('#entity-spinner').addClass('hidden');
			this.update();
		}.bind(this), function(){
			// Hide spinner on error
			$('#entity-spinner').addClass('hidden');
		});
	}

	return EntitiesPage;
})();
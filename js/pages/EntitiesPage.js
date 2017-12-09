/**
 * Create an entity list given metadata about this list. See ViewMetadata for all of the entity specific metadata.
 * The reason that we do it this way is because so far all of the entites behave the same exact way with slight differences.
 * Icons, Services that they call on toggle, etc...
 */
var EntitiesPage = (function() {
	
	// Item template
	var TEMPLATE = [
		'<li class="entity-list-item li-has-toggle %1" data-entity-id="%2">',
			'<label>',
		 			'<div class="name-container ui-marquee ui-marquee-gradient">',
						"%3",
					'</div>',
				'<div class="icon-container %4-icon-container">',
					'<div class="mdi mdi-48px %5"></div>',
				'</div>',
			'</label>',
		'</li>'].join('\n');
	
	/**
	 * Constructor
	 * @param entity The json object with all of the entity information
	 */
	function EntitiesPage(dataManager) {
		this.currentPage = null;
		this.dataManager = dataManager;
		
		// Attach refresh click handler
		$('#refresh-button').click(refresh.bind(this));
		
		// Blank out the current page on hide
		document.getElementById('entities').addEventListener("pagebeforehide", function() {
			this.currentPage = null;
		}.bind(this));
		
	}
	
	/**
	 * Create an entity list and register the click handlers for each entity in the list
	 * @param metadata View metadata
	 */
	EntitiesPage.prototype.create = function(metadata) {
		createDom(this.dataManager.getEntities(), metadata);
		registerEventHandlers(metadata.select, metadata.deselect);
		this.currentPage = metadata.title;
	};
	
	/**
	 * Update the current page with new entities
	 * @param entities All of the entities in HomeAssistant
	 */
	EntitiesPage.prototype.update = function() {
		if (this.currentPage) {
			this.create(EntityMetadata[this.currentPage]);
			
			// This is necessary since we blow the dom away. It makes the snaplist work again
			// The snaplist meaning, it selects an item as you scroll. Also handles marquee scrolling
			var list = document.getElementById('entity-list');
			snapList = tau.widget.SnapListview(list);
			snapList.refresh();
		}
	}

	// Helper method to create the list dom from the entities
	function createDom(entities, metadata) {
		var filterString = metadata.name + ".";
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
			domString = domString + createListItem(filteredEntities[i], metadata);
		}
		
		$('#entity-list').html(domString);
		$('#entity-list-title').html(metadata.title);
	}
	
	// Helper to register click handlers for the list items
	registerEventHandlers = function(select, deselect) {
		$('.entity-list-item').click(function(e) {
			var li = e.currentTarget;
			var entity_id = li.dataset.entityId;
			// We have to flip the value since the input has changed when we get the event
			var selected = li.classList.contains("selected");
			if (selected) {
				// TODO FIX makes assumptions that deselect is a function that needs to be invoked in the context of the services class
				deselect.call(HAServices, entity_id);
				li.classList.remove("selected");
			} else {
				// TODO FIX makes assumptions that deselect is a function that needs to be invoked in the context of the services class
				select.call(HAServices, entity_id);
				li.classList.add("selected");
			}
		});
	}
		
	// Create a dom string representing an entity in the list
	 function createListItem (entity, metadata) {
		 var selected = entity.state === metadata.selectedState ? "selected" : "";
		 var icon = (entity.attributes.icon && entity.attributes.icon.replace(":", "-")) || 
		 	metadata.defaultIcon;
		 return TEMPLATE.replace(/%1/g, selected)
		 				.replace(/%2/g, entity.entity_id)
		 				.replace(/%3/g, entity.attributes.friendly_name)
		 				.replace(/%4/g, metadata.name)
		 				.replace(/%5/g, icon);
	}
	 
	function refresh() {
		// Show spinner
		$('#entity-spinner').removeClass('hidden');
		this.dataManager.load(function(data){
			// Hide spinner
			$('#entity-spinner').addClass('hidden');
			this.update(data);
		}.bind(this), function(){
			// Hide spinner on error
			$('#entity-spinner').addClass('hidden');
		});
	}
	
	return EntitiesPage;
})();
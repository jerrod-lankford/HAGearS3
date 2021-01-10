/**
 * Create an entity page, based on the entity type metadata and the entity content
 * The reason that we do it this way is because so far all of the entites behave the same exact way with slight differences.
 * Icons, Services that they call on toggle, etc...
 */
var EntityPage = (function() {

	var templateSwitch = [
		'<li id="entity-attribute-%1" class="entity-attribute-item li-has-toggle" data-attribute="%1">',
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

	var templateOption = [
		'<li class="entity-attribute-item li-has-toggle" data-attribute="%1">',
			'<label>',
				'<div class="list-item-container ui-marquee ui-marquee-gradient">',
					'%2',
				'</div>',
			'</label>',
		'</li>'
	];

	/**
	 * Constructor
	 * @param entity The json object with all of the entity information
	 */
	function EntityPage(dataManager) {
		this.currentPage = null;
		this.dataManager = dataManager;

		$('#entity-back-button').click(EntityBack);
		$('#effects-back-button').click(EntityBack);

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

		domString = createOnOffDom(domString, metadata, entity);

		domString = createEffectsDom(domString, metadata, entity);

		// Add additional functionalities

		var checked = hiddenEntities.includes(entity.entity_id) ? "switch-checked" : "";
		domString = domString + templateSwitch.join('\n').replace(/%1/g, "hidden")
			.replace(/%2/g, "Hidden")
			.replace(/%3/g, checked);

		$('#entity-attribute-list').html(domString);
		$('#entity-title').html(entity.attributes.friendly_name);
	}

	function createOnOffDom(domString, metadata, entity){
		// Do nothing if the entity does not support On-Off
		if (!metadata.supports.includes("on-off")){
			return domString;
		}

		var checked = entity.state === metadata.selectedState ? "switch-checked" : "";
		return domString + templateSwitch.join('\n').replace(/%1/g, "on-off")
				.replace(/%2/g, "On/Off")
				.replace(/%3/g, checked);
	};

	function createEffectsDom(domString, metadata, entity){
		// Do nothing if the entity does not support effects or has no effects
		if (!metadata.supports.includes("effects")){
			return domString;
		}
		if (!entity.attributes.hasOwnProperty("effect_list")){
			return domString;
		}

		return domString + templateOption.join('\n').replace(/%1/g, "effects")
				.replace(/%2/g, "Effects");
	};

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

				// Reflect the change on the icon in the entities page
				var icon = document.getElementById("entity-obj-" + entity.entity_id);
				icon.getElementsByClassName("entity-list-item-icon")[0].classList.remove("selected");
			}
		} else {
			// TODO FIX makes assumptions that deselect is a function that needs to be invoked in the context of the services class
			metadata.select.call(HAServices, entity.entity_id);
			if (metadata.title != "Scenes") {
				entity.state = metadata.selectedState
				switchElement.classList.add("switch-checked");

				// Reflect the change on the icon in the entities page
				var icon = document.getElementById("entity-obj-" + entity.entity_id);
				icon.getElementsByClassName("entity-list-item-icon")[0].classList.add("selected");
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
				case "effects":
					createEffectPage(entity, metadata);
					tau.changePage('effects');
					break;
			}
		});
	}

	return EntityPage;
})();

var templateEffect = [
	'<li class="entity-effect-item li-has-toggle" data-effect="%1">',
		'<label>',
			'<div class="list-item-container ui-marquee ui-marquee-gradient">',
				'%1',
			'</div>',
		'</label>',
	'</li>'
]

/**
 * Populate the effects page, based on the entity content
 */
function createEffectPage(entity, metadata) {
	createEffectDom(entity);
	registerEffectEventHandlers(entity, metadata);
};

// Helper method to create the list dom from the entities
function createEffectDom(entity) {
	var domString = "";

	for(var i = 0; i < entity.attributes.effect_list.length; i++){
		var effect = entity.attributes.effect_list[i];
		domString = domString + templateEffect.join('\n').replace(/%1/g, effect);
	}

	$('#effects-list').html(domString);
}

// Helper to register click handlers for the list items
function registerEffectEventHandlers(entity, metadata) {
	$('.entity-effect-item').click(function(e) {
		var li = e.currentTarget;
		var effect = li.dataset.effect;

		// TODO call HA service to set the effect.
		metadata.select.call(HAServices, entity.entity_id, {"effect": effect});
		entity.attributes.effect = effect;

		// The effect is set by turning on the entity, so we need to reflect that change
		if (entity.state !== metadata.selectedState) {
			entity.state = metadata.selectedState

			// Set the entity On-off switch to on
			var onOffLi = document.getElementById("entity-attribute-on-off")
			onOffLi.getElementsByClassName("switch")[0].classList.add("switch-checked");

			// Set the icon to selected
			var icon = document.getElementById("entity-obj-" + entity.entity_id);
			icon.getElementsByClassName("entity-list-item-icon")[0].classList.add("selected");
		}
		history.back();
		return;
	});
}

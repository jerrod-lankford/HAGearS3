var SettingsPage = (function() {

	function hideSpinner() {
		$('#main-spinner').addClass('hidden');
	}
	function settingsSave() {
		var url = $('#settings-url-input').val();
		var token = $('#settings-token-input').val();

		HAServices.updateCredentials(url, token);
		history.back();

		$('#main-spinner').removeClass('hidden');
		this.dataManager.load(hideSpinner, hideSpinner);
	}

	function SettingsPage(dataManager) {
		this.dataManager = dataManager;
		this.hiddenTypesPage = new SettingsHiddenTypesPage(dataManager);
		// Settings save button listener
		$('#settings-save-button').click(settingsSave.bind(this));
		$('#settings-url-button').click(historyBack);
		$('#settings-token-button').click(historyBack);
		$('#settings-list-url').click(function(){
			tau.changePage('settings-url');
		});
		$('#settings-list-token').click(function(){
			tau.changePage('settings-token');
		});
		$('#settings-list-hidden').click(function(){
			this.hiddenTypesPage.createPage();
			tau.changePage('hidden-types');
		}.bind(this));
	}

	return SettingsPage;
})();

var SettingsHiddenTypesPage = (function(){

	var hiddenTypesTemplate = [
		'<li class="hidden-types-item li-has-toggle" data-type="%1">',
			'<label>',
				'<div class="name-container ui-marquee ui-marquee-gradient">',
					'%1',
				'</div>',
				'<label class="switch %2">',
					'<span class="slider round"></span>',
				'</label>',
			'</label>',
		'</li>'
	];
	function SettingsHiddenTypesPage(dataManager) {
		this.dataManager = dataManager;

		$('#hidden-types-back-button').click(historyBack);
	}

	SettingsHiddenTypesPage.prototype.createPage = function() {
		createDom(this.dataManager.getHiddenTypes());
		registerEventHandlers(this.dataManager);
	};

	// Helper method to create the list dom from the entities
	function createDom(hiddenTypes) {
		var domString = "";

		// The switch is checked if the category is visible
		var type;
		for (type in EntityMetadata) {
			var checked = hiddenTypes.includes(type) ? "" : "switch-checked" ;
			domString = domString + hiddenTypesTemplate.join('\n').replace(/%1/g, type)
				.replace(/%2/g, checked);
		};

		var checked = hiddenTypes.includes("Hidden") ? "" : "switch-checked" ;
		domString = domString + hiddenTypesTemplate.join('\n').replace(/%1/g, "Hidden")
			.replace(/%2/g, checked);

		$('#hidden-types-list').html(domString);
	}

	// Helper to register click handlers for the list items
	function registerEventHandlers(dataManager) {
		$('.hidden-types-item').click(function(e) {
			var li = e.currentTarget;
			var type = li.dataset.type;
			var hiddenTypes = dataManager.getHiddenTypes();
			var switchElement = li.getElementsByClassName("switch")[0];

			if (hiddenTypes.includes(type)) {
				dataManager.removeHiddenType(type);
				switchElement.classList.add("switch-checked");
			} else {
				dataManager.addHiddenType(type);
				switchElement.classList.remove("switch-checked");
			}
		});
	}

	return SettingsHiddenTypesPage;
})();

function historyBack() {
	history.back();
}
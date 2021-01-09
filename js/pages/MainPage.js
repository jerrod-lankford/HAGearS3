/**
* Create main page view and attach any necessary event listeners
*/

var MainPage = (function(){

	var ItemTemplate = [
		'<div class="ui-item" data-title="%1">',
			'<div class="mdi %2 mdi-36px"></div>',
		'</div>'
	];
	function MainPage(dataManager, entitiesPage) {
		this.dataManager = dataManager;
		this.entitiesPage = entitiesPage;
		this.createPage();

	}

	MainPage.prototype.createPage = function() {
		createDom(this.dataManager.getHiddenTypes());
		this.setupSelector();
	};

	// Helper method to create the list dom from the entities
	function createDom(hiddenTypes) {
		var domString = "";

		var type;
		for (type in EntityMetadata) {
			if (!hiddenTypes.includes(type)){
				domString = domString + ItemTemplate.join('\n').replace(/%1/g, type)
					.replace(/%2/g, EntityMetadata[type].defaultIcon);
			}
		};

		if (!hiddenTypes.includes("Hidden")){
			domString = domString + ItemTemplate.join('\n').replace(/%1/g, "Hidden")
				.replace(/%2/g, "mdi-eye-off");
		}
		domString = domString + ItemTemplate.join('\n').replace(/%1/g, "Settings")
			.replace(/%2/g, "mdi-settings");

		$('#main-nav').html(domString);
	};

	MainPage.prototype.mainPageNav = function(view) {
		// Settings page has special handling, all other entities go through the EntitiesPage
		if (view === 'Settings') {
			tau.changePage('settings');
			var creds = HAServices.getCredentials();
			var url = creds.url;
			var token = creds.token;

			$('#settings-url-input').val(url);
			$('#settings-token-input').val(token);
		} else {
			this.entitiesPage.create(view);
			tau.changePage('entities');
		}
	}

	MainPage.prototype.setupSelector = function() {
		var main = document.getElementById('main');
		var selector = document.getElementById('main-nav');

		// Set up the selector component initially and also before page show
		this.selectorComponent = tau.widget.Selector(selector);

		main.addEventListener("pagebeforeshow", function() {
			this.selectorComponent = tau.widget.Selector(selector);
		}.bind(this));

		main.addEventListener("pagebeforehide", function() {
			this.selectorComponent && this.selectorComponent.destroy();
		}.bind(this));

		selector.addEventListener("click", function(e) {
			var activeItem = e.currentTarget.querySelector('.ui-item-active');
			var view = activeItem.dataset.title
			this.mainPageNav(view);
		}.bind(this), false);

		$('.ui-selector .ui-item').click(function(e){
			var activeItem = e.currentTarget;
			var view = activeItem.dataset.title
			this.mainPageNav(view);

			// Prevent the selectors main event listener from firing in the event of a direct item click
			e.preventDefault();
			event.stopPropagation();
		}.bind(this));
	}

	return MainPage;
})();
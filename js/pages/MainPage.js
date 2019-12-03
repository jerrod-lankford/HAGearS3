/**
* Create main page view and attach any necessary event listeners
*/

var MainPage = (function(){
	
	function MainPage(dataManager, entitiesPage) {
		this.dataManager = dataManager;
		this.entitiesPage = entitiesPage;
		this.setupSelector();
	}
	
	
	MainPage.prototype.mainPageNav = function(view) {
		// Settings page has special handling, all other entities go through the EntitiesPage
		if (view === 'Settings') {
			tau.changePage('settings');
			var creds = HAServices.getCredentials();
			var url = creds.url;
			var token = creds.token;
			
			$('#settings-url').val(url);
			$('#settings-token').val(token);
		} else {
			this.entitiesPage.create(EntityMetadata[view]);
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
// TODO Use some type of requireJs or custom stuff like settingsUI
// require ViewNetadata from /js/view/ViewMetadata.js 
$(function () {
	var viewManager;
	
	function attachButtonListeners() {
		
		// Settings button listener
		$('#setup-button').click(function(){
			tau.changePage('setup');
			var creds = HAServices.getCredentials();
			var url = creds.url;
			
			$('#setup-url').val(url);
		});
		
		// Settings save button listener
		$('#setup-save-button').click(function() {
			var url = $('#setup-url').val();
			var password = $('#setup-password').val();
			
			HAServices.updateCredentials(url, password);
			history.back();
			initialFetch();
		});
		
		// All navigation links
		$('#main-nav').on('click', '.nav-link', function(e) {
			var a = e.currentTarget;
			var view = a.dataset.id;
			
			if (viewManager && view) {
				viewManager.create(ViewMetadata[view]);
				tau.changePage('entities');
			}
			
		});
		
		// refresh button on entities page
		$('#refresh-button').click(function(){
			// Show loading indicator
			$('#entity-spinner').removeClass('hidden');
			HAServices.getEntities(function(data){
				viewManager.update(data);
				// Hide loading indicator
				$('#entity-spinner').addClass('hidden');
			});
		});
		
		// Back button
		document.addEventListener('tizenhwkey', function onTizenhwkey(e) {
	        if (e.keyName === 'back') {
	            if (document.getElementsByClassName('ui-page-active')[0]
	                    .id === 'main' && !tau.activePage
	                    .querySelector('.ui-popup-active')) {
	            	tizen.application.getCurrentApplication().exit();
	            } else {
	                history.back();
	            }
	        }
	    });
	}
	
	// Initial load
	function initialFetch() {
		// Show spinner initially
		$('#main-spinner').removeClass('hidden');
		HAServices.getEntities(function(data){
			viewManager = new ViewManager(data);
			// Hide the spinner again after loading
			$('#main-spinner').addClass('hidden');
		}, function(xhr, status, message) {	
			// TODO more status to message conversions?
			if (!message) {
				if (xhr.status === 0) {
					message = "Check network connection or home assistant url in setup";
				} else {
					message = "An unknown error has occured.";
				}
			}
			
			// Show error popup
			$('#main-spinner').addClass('hidden');
			$('#error-popup-contents').text("An error has occured.\n" + "Status code: " + xhr.status + "\n" + "Messsage: " + message);
			tau.changePage('error-popup');
		});
	}
	
	function main() {
		attachButtonListeners();
		var runBefore = localStorage.getItem('ha-run-before');

		if (runBefore) {
			initialFetch();
		} else {
			$('#error-popup-contents').text("This appears to be your first time running HomeAssistant! Scroll down to the bottom on the homepage and enter your url and password in the settings menu. You will need to disable autocorrect to enter the url.");
			tau.changePage('error-popup');
			localStorage.setItem('ha-run-before', true);
		}
	}
	
	main();
});
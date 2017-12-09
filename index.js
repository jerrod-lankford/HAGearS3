// TODO Use some type of requireJs or custom stuff like settingsUI
// require ViewNetadata from /js/view/ViewMetadata.js 
$(function () {
	var viewManager;
	
	var dataManager = new DataManager();
	var entitiesPage = new EntitiesPage(dataManager);
	var settingsPage = new SettingsPage(dataManager);
	var mainPage = new MainPage(dataManager, entitiesPage);
	
	var runBefore = localStorage.getItem('ha-run-before');
	if (runBefore) {
		// Fetch initial data
		$('#spinner').removeClass('hidden');
		dataManager.load(function(){
			hideSpinner();
			entitiesPage.update();
		}.bind(this), hideSpinner);
	} else {
		$('#error-popup-contents').text("This appears to be your first time running HomeAssistant! Scroll down to the bottom on the homepage and enter your url and password in the settings menu. You will need to disable autocorrect to enter the url.");
		tau.changePage('error-popup');
		localStorage.setItem('ha-run-before', true);
	}	
	
	// Handle hardware back button
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
	
	function hideSpinner() {
		$('#spinner').addClass('hidden');
	}
});
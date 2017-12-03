// TODO Use some type of requireJs or custom stuff like settingsUI
// require ViewNetadata from /js/view/ViewMetadata.js 
$(function () {
	var viewCreator;
	
	$('#setup-button').click(function(){
		tau.changePage('setup');
		var creds = HAServices.getCredentials();
		var url = creds.url;
		
		$('#setup-url').val(url);
	});
	
	$('#setup-save-button').click(function() {
		debugger;
		var url = $('#setup-url').val();
		var password = $('#setup-password').val();
		
		HAServices.updateCredentials(url, password);
		history.back();
		initialFetch();
	});
	
	$('#main-nav').on('click', '.nav-link', function(e) {
		var a = e.currentTarget;
		var view = a.dataset.id;
		
		if (viewCreator && view) {
			viewCreator.create(ViewMetadata[view]);
			tau.changePage('entities');
		}
		
	});
	
	$('#refresh-button').click(function(){
		// Show loading indicator
		$('#entity-spinner').removeClass('hidden');
		HAServices.getEntities(function(data){
			viewCreator.update(data);
			// Hide loading indicator
			$('#entity-spinner').addClass('hidden');
		});
	});
	
	function initialFetch() {
		// Show spinner initially
		$('#main-spinner').removeClass('hidden');
		HAServices.getEntities(function(data){
			viewCreator = new ViewCreator(data);
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
			$('#main-spinner').addClass('hidden');
			$('#error-popup-contents').text("An error has occured.\n" + "Status code: " + xhr.status + "\n" + "Messsage: " + message);
			tau.changePage('error-popup');
		});
	}

	initialFetch();
	
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
});
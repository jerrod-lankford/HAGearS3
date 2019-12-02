// TODO Use some type of requireJs or custom stuff like settingsUI
// require ViewNetadata from /js/view/ViewMetadata.js 
$(function () {
	var viewManager;
	
	// Setup pages
	var dataManager = new DataManager();
	var entitiesPage = new EntitiesPage(dataManager);
	new SettingsPage(dataManager);
	new MainPage(dataManager, entitiesPage);
	
	var runBefore = localStorage.getItem('ha-run-before');
	if (runBefore) {
		// Fetch initial data
		$('#main-spinner').removeClass('hidden');
		dataManager.load(function(){
			hideSpinner();
			entitiesPage.update();
		}.bind(this), hideSpinner);
	} else {
		var id = generateId(6);
		var url =  Constants.HASS_GALAXY_URL + '/' + id;
		$('#error-popup-contents').text("This appears to be your first time running HomeAssistant! Go to " + url + " to share your credentials.");
		tau.changePage('error-popup');
		localStorage.setItem('ha-run-before', true);
		startWebsocket(id);
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
		$('#main-spinner').addClass('hidden');
	}
	
	// TODO move this stuff into its own page
	function generateId(length) {
		var result           = '';
		var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	
	// TODO Carefully check that websockets are closed in certain cases
	function startWebsocket(id) {
		
		// TODO real url
		var ws = new WebSocket(Constants.HASS_GALAXY_WS);
		
		ws.onerror = function(e, e1, e2) {
			$('#error-popup-contents').text('Error connecting to web socket server. You will have to try again or manually enter credentials.');
		};
		
		ws.onopen = function() {
		    console.log('Connected');
		    ws.send('id: ' + id);
		};

		ws.onmessage = function(event) {
		  var message = JSON.parse(event.data);
		  if (message && message.token) {
			  console.log("Credentials recieved");
		  	  console.log(message);
			  HAServices.updateCredentials(message.server, message.token);
			  if (message.server) {
				  history.back();
				  $('#main-spinner').removeClass('hidden');
				  dataManager.load(hideSpinner, hideSpinner);
			  } else {
				  // TODO Helper method or something...
				  tau.changePage('settings');
				  var creds = HAServices.getCredentials();
				  var url = creds.url;
				  var token = creds.token;
					
				  $('#settings-url').val(url);
				  $('#settings-token').val(token);
			  }
		  }
		};
		
		ws.onclose = function() {
			console.log('websocket closed');
		};

	}
});
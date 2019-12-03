var ShareCredsPage = (function() {
	function ShareCredsPage(dataManager) {
		this.dataManager = dataManager;
		$('#share-creds-ok').click(handleOk.bind(this));
	}
	
	ShareCredsPage.prototype.show = function() {
		tau.changePage('share-creds');
		var id = generateId(6);
		var url = Constants.HASS_GALAXY_URL + '/' + id;
		$('#share-creds-contents').text('It appears you have not setup your credentials. Go to ' + url + ' to share your credentials.');
		this.ws = startWebsocket(id, this.dataManager);
	}
	
	function handleOk() {
		console.log('ready state: ' + this.ws.readyState);
		if (this.ws) {
			this.ws.close();
		}
		history.back();
	}
	
	/**
	 * Generate a random n length a-z0-9 string
	 * @param length Length of the generated string
	 */
	function generateId(length) {
		var result           = '';
		var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	
	/**
	 * Start websocket to listen for credentials from the server
	 */
	function startWebsocket(id, dataManager) {
		var ws = new WebSocket(Constants.HASS_GALAXY_WS);
		
		ws.onerror = function(e, e1, e2) {
			$('#share-creds-contents').text('Error connecting to web socket server. You will have to try again or manually enter credentials.');
		};
		
		ws.onopen = function() {
		    console.log('Connected');
		    ws.send('id: ' + id);
		    setTimeout(function() {
		    	if (this.ws && this.ws.readyState === WebSocket.OPEN) {
		    		this.ws.close();
		    	}
		    }, Constants.SOCKET_TIMEOUT);
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
				  // TODO helper method, or maybe a PageManager 
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
		
		return ws;

	}
	
	function hideSpinner() {
		$('#main-spinner').addClass('hidden');
	}
	
	return ShareCredsPage;
})();
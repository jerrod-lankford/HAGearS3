var Constants = (function() {
	return {
		HASS_GALAXY_URL: 'https://hassgalaxy.app',
	    HASS_GALAXY_WS: 'ws://hassgalaxy.herokuapp.com', // we can't use the real domain for ws because of the 302
	    SOCKET_TIMEOUT: 60000 // 60 seconds
	};
})();

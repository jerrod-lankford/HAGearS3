var SettingsPage = (function() {
	
	function hideSpinner() {
		$('#main-spinner').addClass('hidden');
	}
	function setupSave() {
		var url = $('#setup-url').val();
		var token = $('#setup-token').val();
		
		// TODO Should creds be managed though the data manager?
		HAServices.updateCredentials(url, token, function() {
				history.back();
				
				$('#main-spinner').removeClass('hidden');
				this.dataManager.load(hideSpinner, hideSpinner);
			}.bind(this)
		);
	}
	
	function SettingsPage(dataManager) {
		this.dataManager = dataManager;
		// Settings save button listener
		$('#setup-save-button').click(setupSave.bind(this));
	}
	
	return SettingsPage;
})();
var SettingsPage = (function() {
	
	function hideSpinner() {
		$('#main-spinner').addClass('hidden');
	}
	function settingsSave() {
		var url = $('#settings-url').val();
		var token = $('#settings-token').val();
		
		HAServices.updateCredentials(url, token);
		history.back();
		
		$('#main-spinner').removeClass('hidden');
		this.dataManager.load(hideSpinner, hideSpinner);
	}
	
	function SettingsPage(dataManager) {
		this.dataManager = dataManager;
		// Settings save button listener
		$('#settings-save-button').click(settingsSave.bind(this));
	}
	
	return SettingsPage;
})();
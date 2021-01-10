var EntityMetadata = {
	'Lights': {
		name: 'light',
		title: 'Lights',
		selectedState: 'on',
		deselectedState: 'off',
		select: HAServices.lightOn,
		deselect: HAServices.lightOff,
		defaultIcon: 'mdi-lightbulb',
		supports: [
			"on-off",
			"brightness",
			"colour",
			"effects"
		]
	},
	'Switches': {
		name: 'switch',
		title: 'Switches',
		selectedState: 'on',
		deselectedState: 'off',
		select: HAServices.switchOn,
		deselect: HAServices.switchOff,
		defaultIcon: 'mdi-flash',
		supports: [
			"on-off"
		]
	},
	'Scripts': {
		name: 'script',
		title: 'Scripts',
		selectedState: 'on',
		deselectedState: 'off',
		select: HAServices.scriptOn,
		deselect: HAServices.scriptOff,
		defaultIcon: 'mdi-file-document',
		supports: [
			"on-off"
		]
	},
	'Covers': {
		name: 'cover',
		title: 'Covers',
		selectedState: 'closed',
		deselectedState: 'opened',
		select: HAServices.coverClose,
		deselect: HAServices.coverOpen,
		defaultIcon: 'mdi-blinds',
		supports: [
			"on-off"
		]
	},
	'Groups': {
		name: 'group',
		title: 'Groups',
		selectedState: 'on',
		deselectedState: 'off',
		select: HAServices.groupOn,
		deselect: HAServices.groupOff,
		defaultIcon: 'mdi-account-multiple',
		supports: [
			"on-off"
		]
	},
	'Scenes': {
		name: 'scene',
		title: 'Scenes',
		// We do not want the scene to appear selected
		// since they are always on
		selectedState: '',
		deselectedState: '',
		select: HAServices.sceneOn,
		deselect: HAServices.sceneOn,
		defaultIcon: 'mdi-palette',
		supports: [
			"on-off"
		]
	}
};
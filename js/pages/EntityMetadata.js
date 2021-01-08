var EntityMetadata = {
	'Switches': {
		name: 'switch',
		title: 'Switches',
		selectedState: 'on',
		deselectedState: 'off',
		select: HAServices.switchOn,
		deselect: HAServices.switchOff,
		defaultIcon: 'mdi-flash'
	},
	'Lights': {
		name: 'light',
		title: 'Lights',
		selectedState: 'on',
		deselectedState: 'off',
		select: HAServices.lightOn,
		deselect: HAServices.lightOff,
		defaultIcon: 'mdi-lightbulb'
	},
	'Scripts': {
		name: 'script',
		title: 'Scripts',
		selectedState: 'on',
		deselectedState: 'off',
		select: HAServices.scriptOn,
		deselect: HAServices.scriptOff,
		defaultIcon: 'mdi-file-document'
	},
	'Covers': {
		name: 'cover',
		title: 'Covers',
		selectedState: 'closed',
		deselectedState: 'opened',
		select: HAServices.coverClose,
		deselect: HAServices.coverOpen,
		defaultIcon: 'mdi-blinds'
	},
	'Groups': {
		name: 'group',
		title: 'Groups',
		selectedState: 'on',
		deselectedState: 'off',
		select: HAServices.groupOn,
		deselect: HAServices.groupOff,
		defaultIcon: 'mdi-account-multiple'
	},
	'Scenes': {
		name: 'scene',
		title: 'Scenes',
		// We do not want the scene to appear selected
		// since they are always on
		selectedState: '',
		select: HAServices.sceneOn,
		deselect: HAServices.sceneOn,
		defaultIcon: 'mdi-palette'
	}
};
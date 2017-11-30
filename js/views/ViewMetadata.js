var ViewMetadata = {
	'switch': {
		name: 'switch',
		title: 'Switches',
		selectedState: 'on',
		select: HAServices.switchOn,
		deselect: HAServices.switchOff
	},
	'light': {
		name: 'light',
		title: 'Lights',
		selectedState: 'on',
		select: HAServices.lightOn,
		deselect: HAServices.lightOff
	},
	'script': {
		name: 'script',
		title: 'Scripts',
		selectedState: 'on',
		select: HAServices.scriptOn,
		deselect: HAServices.scriptOff
	},
	'cover': {
		name: 'cover',
		title: 'Covers',
		selectedState: 'closed',
		select: HAServices.coverClose,
		deselect: HAServices.coverOpen
	},
	'group': {
		name: 'group',
		title: 'Groups',
		selectedState: 'on',
		select: HAServices.groupOn,
		deselect: HAServices.groupOff
	}
};
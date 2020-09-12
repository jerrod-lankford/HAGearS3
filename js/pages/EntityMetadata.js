var EntityMetadata = {
	'Switches': {
		name: 'switch',
		title: 'Switches',
		selectedState: 'on',
		select: HAServices.switchOn,
		deselect: HAServices.switchOff,
		defaultIcon: 'mdi-flash'
	},
	'Lights': {
		name: 'light',
		title: 'Lights',
		selectedState: 'on',
		select: HAServices.lightOn,
		deselect: HAServices.lightOff,
		defaultIcon: 'mdi-lightbulb'
	},
	'Scripts': {
		name: 'script',
		title: 'Scripts',
		selectedState: 'on',
		select: HAServices.scriptOn,
		deselect: HAServices.scriptOff,
		defaultIcon: 'mdi-file-document'
	},
	'Covers': {
		name: 'cover',
		title: 'Covers',
		selectedState: 'closed',
		select: HAServices.coverClose,
		deselect: HAServices.coverOpen,
		defaultIcon: 'mdi-blinds'
	},
	'Groups': {
		name: 'group',
		title: 'Groups',
		selectedState: 'on',
		select: HAServices.groupOn,
		deselect: HAServices.groupOff,
		defaultIcon: 'mdi-account-multiple'
	}
	,'Locks': {
		name: 'lock',
		title: 'Locks',
		selectedState: 'locked',
		select: HAServices.lockLock,
		deselect: HAServices.lockUnlock,
		defaultIcon: 'mdi-lock'
	}
};
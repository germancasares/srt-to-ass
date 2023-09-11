export const getScriptInfo = () => ({
	section: 'Script Info',
	body: [
		{ key: 'Title', value: '' },
		{ key: 'ScriptType', value: 'v4.00+' },
		{ key: 'WrapStyle', value: "0" },
		{ key: 'ScaledBorderAndShadow', value: 'yes' },
		{ key: 'Collisions', value: 'Normal' },
		{ key: 'PlayResX', value: '1920' },
		{ key: 'PlayResY', value: '1080' },
	]
});

export const getStyles = () => ({
	section: 'V4+ Styles',
	body: [
		{
			key: 'Format',
			value: [
				'Name',
				'Fontname',
				'Fontsize',
				'PrimaryColour',
				'SecondaryColour',
				'OutlineColour',
				'BackColour',
				'Bold',
				'Italic',
				'Underline',
				'StrikeOut',
				'ScaleX',
				'ScaleY',
				'Spacing',
				'Angle',
				'BorderStyle',
				'Outline',
				'Shadow',
				'Alignment',
				'MarginL',
				'MarginR',
				'MarginV',
				'Encoding'
			]
		},
		{
			key: 'Style',
			value: {
				'Name': 'Default',
				'Fontname': 'Arial',
				'Fontsize': '80',
				'PrimaryColour': '&H00FFFFFF',
				'SecondaryColour': '&H000000FF',
				'OutlineColour': '&H00000000',
				'BackColour': '&H00000000',
				'Bold': '0',
				'Italic': '0',
				'Underline': '0',
				'StrikeOut': '0',
				'ScaleX': '100',
				'ScaleY': '100',
				'Spacing': '0',
				'Angle': '0',
				'BorderStyle': '1',
				'Outline': '2',
				'Shadow': '2',
				'Alignment': '2',
				'MarginL': '10',
				'MarginR': '10',
				'MarginV': '10',
				'Encoding': '1'
			}
		}
	]
});

export const getEvents: any = () => ({
	section: 'Events',
	body: [
		{
			key: 'Format',
			'value': [
				'Layer',
				'Start',
				'End',
				'Style',
				'Name',
				'MarginL',
				'MarginR',
				'MarginV',
				'Effect',
				'Text'
			]
		}
	]
});

export const getDialogue = () => ({
	key: 'Dialogue',
	value: {
		Layer: '0',
		Start: '00:00:00.00',
		End: '00:00:00.00',
		Style: 'Default',
		Name: '',
		MarginL: '0',
		MarginR: '0',
		MarginV: '0',
		Effect: '',
		Text: ''
	}
});

export const scriptFX = 'template pre-line all keeptags';
export const script = '';


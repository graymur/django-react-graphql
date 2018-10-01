export default {
	validations: [
		{
			message: '#list_id-error',
			with: ['mailing_list_id'],
			type: 'required',
		},
	],
	widgets: [
		{
			class: 'workflow_select_mailing',
			options: [
				{
					value: 1,
					text: 'Option 1',
				},
				{
					value: 2,
					text: 'Option 2',
				},
			],
			name: 'listId',
			id: 'mailing_list_id',
			node: 'select',
		},
		{
			id: 'list_id-error',
			node: 'validation-message',
			text: 'Select mailing list',
		},
		{
			node: 'save-block',
		},
	],
	app: 'cn_mailchimp',
	title: 'Create or update contact',
	label: 'Trigger',
	groupIndex: 0,
	workflow: {
		apps: [
			{
				name: 'cn_mailchimp',
				full_name: 'MailChimp',
			},
			{
				name: 'cn_dotloop',
				full_name: 'Dotloop',
			},
		],
	},
	saving: false,
	initialWidgetsValues: {
		'some-widget-from-other-group': 1,
	},
	widgetsValues: {
		'some-widget-from-other-group': 1,
	},
	widgetsErrors: {
		listId: {
			code: 1,
			messageWidgetId: 'list_id-error',
		},
		'visual-mapping': {
			code: 1,
			messageWidgetId: '',
		},
	},
}

export default {
	_id: '5b6c4fb9b6e34d0bb03a3ccb',
	short_description: '',
	full_description: '',
	about: '',
	name: 'mailchimp_subscribers_to_dotloop_people',
	is_enabled: false,
	status: 'unused',
	cron_params: { minutes: 10 },
	connections: ['cn_mailchimp', 'cn_dotloop'],
	configuration: [
		{
			validations: [
				{ message: '#list_id-error', with: ['mailing_list_id'], type: 'required' },
			],
			widgets: [
				{
					class: 'hidden',
					node: 'input',
					type: 'text',
					name: 'trigger',
					'wrapper-class': 'hidden',
					value: 'get_subscribers',
				},
				{ node: 'header', text: 'Mailing list' },
				{
					class: 'workflow_select_mailing',
					'raw-options':
						'<option selected disabled value="CASE_NEED_SELECT" color:"#858585;">Select list</option>',
					'data-method': 'cn_mailchimp.get_mailing_lists',
					method: {
						method: 'cn_mailchimp.get_mailing_lists',
						map: { value: 'id', text: 'name' },
					},
					name: 'listId',
					id: 'mailing_list_id',
					node: 'select-with-refresh',
					depend: 'mapping',
				},
				{
					id: 'list_id-error',
					node: 'validation-message',
					text: 'Select mailing list',
				},
				{ node: 'save-block' },
			],
			app: 'cn_mailchimp',
			title: 'Create or update contact',
			label: 'Trigger',
		},
		{
			validations: [],
			widgets: [],
			app: 'cn_dotloop',
			title: 'Create or update person',
			label: 'Action',
		},
		{
			widgets: [
				{
					config: {
						fields: {
							params: ['listId'],
							method: 'cn_mailchimp.get_subscriber_config_trigger',
						},
						entityName: 'subscriber',
						appName: 'cn_mailchimp',
					},
					node: 'visual-filter',
					name: 'visual-filter',
					id: 'visual-filter',
				},
				{ node: 'save-block' },
			],
			app: 'cn_mailchimp',
			title: 'Filter contacts',
			label: 'Filter',
			groupClassName: 'filter-widget',
		},
		{
			validations: [{ field: 'visual-mapping', type: 'required' }],
			widgets: [
				{
					config: {
						cn_dotloop: {
							fields: [
								{
									_id: 'dotloopFirstName',
									setter: 'firstName',
									title: 'First name',
									sample: 'John',
									autoMapping: { name: 'firstName' },
								},
								{
									_id: 'dotloopRole',
									setter: 'role',
									title: 'Role',
									sample: 'BUYER',
								},
							],
							entityName: 'person',
							appName: 'cn_dotloop',
						},
						cn_mailchimp: {
							fields: {
								params: ['listId'],
								method: 'cn_mailchimp.get_subscriber_config_trigger',
							},
							entityName: 'subscriber',
							appName: 'cn_mailchimp',
						},
					},
					node: 'visual-mapping',
					name: 'visual-mapping',
					id: 'visual-mapping',
				},
				{ node: 'save-block' },
			],
			app: 'cn_mailchimp',
			title: 'MailChimp subscribers to Dotloop people',
			label: 'Mapping',
			groupClassName: 'mapping-widget',
		},
	],
	config: {
		cn_dotloop: {
			full_name_app: 'Dotloop',
			connect_id: '5b69ab94c409d8000439d835',
		},
		cn_mailchimp: {
			connect_id: '5b69a78ec409d8000439d833',
			saved_params: { trigger: 'get_subscribers', listId: '29aaf507bc' },
		},
		global: {
			access_key: null,
			email: 'sergey@apination.com',
			user_id: 422,
			trigger_id: '5b6c4fb9b6e34d0bb03a3cca',
		},
	},
	workflow: [
		{
			cn_mailchimp_get_updated_subscribers: {
				mainLogId: '$config.runtime.saga_id',
				apiKey: '$config.cn_mailchimp.params.apiKey',
				listId: '$config.cn_mailchimp.saved_params.listId',
			},
		},
		{
			cn_dotloop_update_contacts: {
				token: '$config.cn_dotloop.params.token',
				mainLogId: '$config.runtime.saga_id',
			},
		},
	],
	saved_params: { cn_mailchimp: { trigger: 'get_subscribers' } },
	apps: [
		{
			name: 'cn_mailchimp',
			full_name: 'MailChimp',
			__typename: 'App',
		},
		{
			name: 'cn_dotloop',
			full_name: 'Dotloop',
			__typename: 'App',
		},
	],
	connectionObjects: [],
	__typename: 'Workflow',
}

module.exports = [
	{
		_id: 2,
		name: 'convoso_agent_calltime_to_zoho_reports',
		version: 2,
		connections: ['cn_convoso', 'cn_zoho_reports'],
		short_description: 'Transfer call logs to Zoho Reports',
		full_description:
			"This workflow exports call logs in <a href='/apps/convoso'>Convoso</a> to <a href='/apps/zoho_reports'>Zoho Reports</a>.",
		about: 'Export call logs',
		app_proxy: 'cn_convoso',
		default_trigger: 'get_call_logs',
		actions: [
			{
				app_proxy: 'cn_convoso',
				mapping: {},
				action: 'cn_convoso_get_call_logs',
				state: 'full_connect',
			},
		],
		configuration: [
			{
				label: 'Trigger',
				title: 'Get call logs',
				app: 'cn_convoso',
				validations: [],
				widgets: [],
			},
			{
				app: 'cn_zoho_reports',
				title: 'Update table',
				label: 'Action',
				widgets: [],
			},
			{
				label: 'Workflow',
				title: 'Edit workflow',
				app: 'cn_zoho_reports',
				widgets: [
					{
						class: '',
						id: 'container',
						name: 'workflow',
						node: 'monaco-editor',
						style: 'height:300px;',
					},
					{
						node: 'validation-message',
						text: 'Invalid json',
						id: 'workflow-error',
					},
					{
						node: 'save-block',
					},
				],
				validations: [
					{
						type: 'json',
						field: 'workflow',
						message: '#workflow-error',
					},
				],
			},
		],
		settings_state: 'default',
		saved_params: {
			cn_convoso: {
				filter_by: "status = 'LISTLD' OR status = 'LISOPP'",
			},
		},
		workflow: [
			{
				cn_convoso_get_call_logs: {
					connector: 'cn_convoso',
					terminate_if_empty: true,
					log_data: {
						user_id: '$config.global.user_id',
						trigger_id: '$config.global.trigger_id',
						main_log_id: '$config.runtime.saga_id',
					},
					auth_token: '$config.cn_convoso.params.auth_token',
					name: 'call_logs',
					connectorId: '$config.cn_convoso.connect_id',
				},
			},
			{
				cn_zoho_reports_bulk_insert: {
					table: 'Call Logs',
					updateStructure: true,
					username: '$config.cn_zoho_reports.params.email',
					key: '$config.cn_zoho_reports.params.database',
					connector: 'cn_zoho_reports',
					token: '$config.cn_zoho_reports.params.accesstoken',
				},
			},
		],
	},
]

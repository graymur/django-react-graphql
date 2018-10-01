module.exports = [
	{
		_id: 1,
		name: 'bs_agent_billings_to_zoho-reports',
		short_description: 'Export agent billings from Brokersumo to Zoho Reports',
		full_description:
			'This workflow exports agent billings from <a href="/apps/brokersumo">Brokersumo</a> to <a href="/apps/zoho_reports">Zoho Reports</a>',
		default_trigger: 'get_agents_billings',
		default_trigger_type: 'webhook',
		app_proxy: 'cn_bs',
		version: 2,
		about: 'Export agent billings from Brokersumo to Zoho Reports',
		sponsored: true,
		connections: ['cn_bs', 'cn_zoho_reports'],
		webhooks: ['bs-agent-billings-zoho'],
		actions: [
			{
				app_proxy: 'cn_bs',
				mapping: '{}',
				action: 'cn_bs_get_agents_billings',
				state: 'full_connect',
			},
		],
		saved_params: {},
		configuration: [
			{
				label: 'Trigger',
				title: 'Get agent billings',
				app: 'cn_bs',
				widgets: [],
			},
			{
				label: 'Action',
				title: 'Insert agent billings',
				app: 'cn_zoho_reports',
				widgets: [],
				validations: [],
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
		workflow: [
			{
				cn_zoho_reports_copy_brokersumo_database: {
					token: '$config.cn_zoho_reports.params.accesstoken',
					key: '$config.cn_zoho_reports.params.database',
					username: '$config.cn_zoho_reports.params.email',
					connector: 'cn_zoho_reports',
				},
			},
			{
				cn_webhook_data: {
					connector: 'cn_webhook_data',
					terminate_if_empty: true,
				},
			},
			{
				flatten: {
					terminate_if_empty: true,
				},
			},
			{
				map: {
					mapping: {
						map: {
							items: {
								forEach: 'items',
								map: {
									Agent: "$document.agent || ''",
									'Billing date':
										'(new Date(+$document.billing_date || Date.now())).toISOString()',
									Email: "$document.email || ''",
									'Item name': "item_name || ''",
									Amount: 'amount || 0',
									Id: 'id || 0',
									'Is paid': 'is_paid || 0',
									Memo: "typeof memo === 'undefined' ? '' : memo",
								},
							},
						},
					},
				},
			},
			{
				flatten: {
					terminate_if_empty: true,
				},
			},
			{
				cn_zoho_reports_bulk_insert_or_update: {
					token: '$config.cn_zoho_reports.params.accesstoken',
					connector: 'cn_zoho_reports',
					table: 'Agent Billings',
					key: '$config.cn_zoho_reports.params.database',
					username: '$config.cn_zoho_reports.params.email',
					updateStructure: true,
				},
			},
		],
		data_alias: ['agent_billings'],
	},
]

module.exports = {
	_id: '5b7698d7f6113b00206231f7',
	is_dynamic: true,
	is_generic: false,
	is_copy: true,
	name: 'google_sheets_people_to_dotloop_people',
	short_description: 'Google Sheets people to Dotloop people',
	full_description: 'Google Sheets people to Dotloop people',
	app_proxy: 'cn_google_sheets',
	version: 2,
	default_trigger: 'cn_google_sheets_read_data',
	about: '',
	actions: [
		{
			state: 'full_connect',
			action: 'get_data',
			mapping: '{}',
			app_proxy: 'cn_google_sheets',
		},
	],
	is_enabled: true,
	status: 'active',
	config: {
		cn_dotloop: {
			triggers_url:
				'https://lambda-proxy-stg.apination.com/connectors/dotloop/triggers',
			actions_url:
				'https://lambda-proxy-stg.apination.com/connectors/dotloop/actions',
			methods_url:
				'https://lambda-proxy-stg.apination.com/connectors/dotloop/methods',
			proxy_url: 'https://lambda-proxy-stg.apination.com/connectors/dotloop/',
			full_name_app: 'Dotloop',
			connect_id: '5b69ab94c409d8000439d835',
		},
		cn_google_sheets: {
			triggers_url:
				'https://lambda-proxy-stg.apination.com/connectors/google_sheets/triggers',
			actions_url:
				'https://lambda-proxy-stg.apination.com/connectors/google_sheets/actions',
			methods_url:
				'https://lambda-proxy-stg.apination.com/connectors/google_sheets/methods',
			proxy_url: 'https://lambda-proxy-stg.apination.com/connectors/google_sheets/',
			full_name_app: 'Google Sheets',
			connect_id: '5b75524792e0c1000471e673',
			saved_params: {
				trigger: 'read_data',
				spreadSheetUrl:
					'https://docs.google.com/spreadsheets/u/1/d/1fZoKkV386A8PhM3R9UCSHJArBuKJoGcjUz-wCtiQXxg/edit?ouid=105600203489385681226&usp=sheets_home&ths=true',
				'visual-mapping': {
					mapping: [
						{
							from: 'google_sheets_0',
							to: 'dotloopFirstName',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_1',
							to: 'dotloopMiddleName',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_2',
							to: 'dotloopLastName',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_3',
							to: 'dotloopEmail',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_5',
							to: 'dotloopOfficePhone',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_6',
							to: 'dotloopHomePhone',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_7',
							to: 'dotloopMobilePhone',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_8',
							to: 'dotloopFax',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_9',
							to: 'dotloopAddress',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_10',
							to: 'dotloopUnit',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_11',
							to: 'dotloopCity',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_12',
							to: 'dotloopZipCode',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_13',
							to: 'dotloopCountry',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_14',
							to: 'dotloopState',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_15',
							to: 'dotloopCompany',
							constraintsMessages: [],
						},
						{
							from: 'google_sheets_16',
							to: 'dotloopRole',
							constraintsMessages: [],
						},
					],
					wfSteps: [
						{
							map: {
								mapping: {
									extensions: {},
									map: {
										firstName: "_.get($document, 'First name')",
										middleName: "_.get($document, 'Middle name')",
										lastName: "_.get($document, 'Last name')",
										email: "_.get($document, 'Email')",
										office: "_.get($document, 'Office phone')",
										home: "_.get($document, 'Home phone')",
										mobile: "_.get($document, 'Mobile phone')",
										fax: "_.get($document, 'Fax')",
										address: "_.get($document, 'Address')",
										unit: "_.get($document, 'Unit')",
										city: "_.get($document, 'City')",
										zipCode: "_.get($document, 'Zip Code')",
										country: "_.get($document, 'Country')",
										state: "_.get($document, 'State')",
										company: "_.get($document, 'Company')",
										role: "_.get($document, 'Role')",
									},
								},
							},
						},
					],
				},
				'visual-filter': {
					field: 'google_sheets_9',
					expression: 1.5,
					value: 'main street',
					wfSteps: [
						{
							filter: {
								expression:
									"_.get($document, '_.get($document, 'Address')') !== 'main street'",
								terminate_if_empty: true,
							},
						},
					],
				},
			},
		},
		global: {
			access_key: null,
			email: 'sergey@apination.com',
			user_id: 422,
			trigger_id: '5b7698d7f6113b00206231f6',
		},
	},
	cron_params: {
		minutes: 10,
	},
	workflow: [
		{
			cn_google_sheets_read_data: {
				onlyUpdated: true,
				idKey: 'ID',
				spreadSheetUrl: '$config.cn_google_sheets.saved_params.spreadSheetUrl',
				terminate_if_empty: true,
				access_token: '$config.cn_google_sheets.params.access_token',
			},
		},
		{
			filter: {
				expression:
					"_.get($document, '_.get($document, 'Address')') !== 'main street'",
				terminate_if_empty: true,
				id: 'visual-filter',
				name: 'visualFilter',
			},
		},
		{
			map: {
				mapping: {
					extensions: {},
					map: {
						firstName: "_.get($document, 'First name')",
						middleName: "_.get($document, 'Middle name')",
						lastName: "_.get($document, 'Last name')",
						email: "_.get($document, 'Email')",
						office: "_.get($document, 'Office phone')",
						home: "_.get($document, 'Home phone')",
						mobile: "_.get($document, 'Mobile phone')",
						fax: "_.get($document, 'Fax')",
						address: "_.get($document, 'Address')",
						unit: "_.get($document, 'Unit')",
						city: "_.get($document, 'City')",
						zipCode: "_.get($document, 'Zip Code')",
						country: "_.get($document, 'Country')",
						state: "_.get($document, 'State')",
						company: "_.get($document, 'Company')",
						role: "_.get($document, 'Role')",
					},
				},
				id: 'visual-mapping',
				name: 'visualMapping',
			},
		},
		{
			filter: {
				expression: '$document.firstName && $document.lastName',
			},
		},
		{
			cn_dotloop_update_contacts: {
				token: '$config.cn_dotloop.params.token',
				mainLogId: '$config.runtime.saga_id',
			},
		},
	],
	saved_params: {
		cn_google_sheets: {
			trigger: 'read_data',
			spreadSheetUrl:
				'https://docs.google.com/spreadsheets/u/1/d/1fZoKkV386A8PhM3R9UCSHJArBuKJoGcjUz-wCtiQXxg/edit?ouid=105600203489385681226&usp=sheets_home&ths=true',
			'visual-mapping': {
				mapping: [
					{
						from: 'google_sheets_0',
						to: 'dotloopFirstName',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_1',
						to: 'dotloopMiddleName',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_2',
						to: 'dotloopLastName',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_3',
						to: 'dotloopEmail',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_5',
						to: 'dotloopOfficePhone',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_6',
						to: 'dotloopHomePhone',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_7',
						to: 'dotloopMobilePhone',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_8',
						to: 'dotloopFax',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_9',
						to: 'dotloopAddress',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_10',
						to: 'dotloopUnit',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_11',
						to: 'dotloopCity',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_12',
						to: 'dotloopZipCode',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_13',
						to: 'dotloopCountry',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_14',
						to: 'dotloopState',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_15',
						to: 'dotloopCompany',
						constraintsMessages: [],
					},
					{
						from: 'google_sheets_16',
						to: 'dotloopRole',
						constraintsMessages: [],
					},
				],
				wfSteps: [
					{
						map: {
							mapping: {
								extensions: {},
								map: {
									firstName: "_.get($document, 'First name')",
									middleName: "_.get($document, 'Middle name')",
									lastName: "_.get($document, 'Last name')",
									email: "_.get($document, 'Email')",
									office: "_.get($document, 'Office phone')",
									home: "_.get($document, 'Home phone')",
									mobile: "_.get($document, 'Mobile phone')",
									fax: "_.get($document, 'Fax')",
									address: "_.get($document, 'Address')",
									unit: "_.get($document, 'Unit')",
									city: "_.get($document, 'City')",
									zipCode: "_.get($document, 'Zip Code')",
									country: "_.get($document, 'Country')",
									state: "_.get($document, 'State')",
									company: "_.get($document, 'Company')",
									role: "_.get($document, 'Role')",
								},
							},
						},
					},
				],
			},
			'visual-filter': {
				field: 'google_sheets_9',
				expression: 1.5,
				value: 'main street',
				wfSteps: [
					{
						filter: {
							expression:
								"_.get($document, '_.get($document, 'Address')') !== 'main street'",
							terminate_if_empty: true,
						},
					},
				],
			},
		},
	},
	configuration: [
		{
			validations: [
				{
					type: 'required',
					with: ['spreadSheetUrl'],
					message: '#spreadSheetUrl-error',
				},
			],
			widgets: [
				{
					node: 'input',
					class: 'hidden',
					'wrapper-class': 'hidden',
					type: 'text',
					name: 'trigger',
					value: 'read_data',
				},
				{
					text: 'Sreadsheet URL',
					node: 'header',
				},
				{
					node: 'input',
					id: 'spreadSheetUrl',
					name: 'spreadSheetUrl',
					class: 'workflow_select_mailing',
				},
				{
					text: 'Please, give us the spreadsheet URL',
					node: 'validation-message',
					id: 'spreadSheetUrl-error',
				},
				{
					node: 'save-block',
				},
			],
			app: 'cn_google_sheets',
			title: 'Row added or updated',
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
							method: 'cn_google_sheets.person_config_trigger',
							params: ['spreadSheetUrl'],
						},
						idField: 'id',
						entityName: 'person',
						entityType: 'person',
						appName: 'cn_google_sheets',
					},
					node: 'visual-filter',
					name: 'visual-filter',
					id: 'visual-filter',
				},
				{
					node: 'save-block',
				},
			],
			app: 'cn_google_sheets',
			title: 'Filter contacts',
			label: 'Filter',
			groupClassName: 'filter-widget',
		},
		{
			validations: [
				{
					field: 'visual-mapping',
					type: 'required',
				},
			],
			widgets: [
				{
					config: {
						cn_dotloop: {
							fields: [
								{
									sample: 'John',
									title: 'First name',
									setter: 'firstName',
									_id: 'dotloopFirstName',
								},
								{
									sample: 'Richard',
									title: 'Middle name',
									setter: 'middleName',
									_id: 'dotloopMiddleName',
								},
								{
									sample: 'Doe',
									title: 'Last name',
									setter: 'lastName',
									_id: 'dotloopLastName',
								},
								{
									sample: 'test@test.com',
									type: 'email',
									title: 'Email',
									setter: 'email',
									_id: 'dotloopEmail',
								},
								{
									sample: '555-555-555',
									title: 'Office phone',
									setter: 'office',
									_id: 'dotloopOfficePhone',
								},
								{
									sample: '555-555-555',
									title: 'Home phone',
									setter: 'home',
									_id: 'dotloopHomePhone',
								},
								{
									sample: '555-555-555',
									title: 'Mobile phone',
									setter: 'mobile',
									_id: 'dotloopMobilePhone',
								},
								{
									sample: '555-555-555',
									title: 'Fax',
									setter: 'fax',
									_id: 'dotloopFax',
								},
								{
									sample: 'Main street',
									title: 'Address',
									setter: 'address',
									_id: 'dotloopAddress',
								},
								{
									sample: '234',
									title: 'Unit',
									setter: 'unit',
									_id: 'dotloopUnit',
								},
								{
									sample: 'Boston',
									title: 'City',
									setter: 'city',
									_id: 'dotloopCity',
								},
								{
									sample: '01201',
									title: 'Zip Code',
									setter: 'zipCode',
									_id: 'dotloopZipCode',
								},
								{
									sample: 'US',
									title: 'Country',
									setter: 'country',
									_id: 'dotloopCountry',
								},
								{
									sample: 'MA',
									title: 'State',
									setter: 'state',
									_id: 'dotloopState',
								},
								{
									sample: 'Apination',
									title: 'Company',
									setter: 'company',
									_id: 'dotloopCompany',
								},
								{
									sample: 'BUYER',
									title: 'Role',
									setter: 'role',
									_id: 'dotloopRole',
								},
							],
							entityName: 'person',
							entityType: 'person',
							appName: 'cn_dotloop',
						},
						cn_google_sheets: {
							fields: {
								method: 'cn_google_sheets.person_config_trigger',
								params: ['spreadSheetUrl'],
							},
							idField: 'id',
							entityName: 'person',
							entityType: 'person',
							appName: 'cn_google_sheets',
						},
					},
					node: 'visual-mapping',
					name: 'visual-mapping',
					id: 'visual-mapping',
				},
				{
					node: 'save-block',
				},
			],
			app: 'cn_google_sheets',
			title: 'Google Sheets people to Dotloop people',
			label: 'Mapping',
			groupClassName: 'mapping-widget',
		},
	],
	connections: ['cn_google_sheets', 'cn_dotloop'],
	__v: 0,
	url: '/api/connectors/workflows/5b7698d7f6113b00206231f7/',
}

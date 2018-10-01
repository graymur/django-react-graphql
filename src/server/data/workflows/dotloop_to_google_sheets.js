module.exports = [
	{
		_id: '5b6c4fb9b6e34d0bb03a3333',
		is_dynamic: true,
		is_generic: false,
		is_copy: true,
		name: 'dotloop_to_google_sheets',
		short_description: 'Dotloop People to Google Sheets',
		full_description: 'Dotloop People to Google Sheets',
		app_proxy: 'cn_google_sheets',
		version: 2,
		default_trigger: '',
		about: '',
		actions: [
			{
				state: 'full_connect',
				action: 'get_data',
				mapping: '{}',
				app_proxy: 'cn_google_sheets',
			},
		],
		is_enabled: false,
		status: 'unused',
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
				proxy_url:
					'https://lambda-proxy-stg.apination.com/connectors/google_sheets/',
				full_name_app: 'GoogleSheets',
				connect_id: '5b69a78ec409d8000439d833',
				saved_params: {
					trigger: 'get_subscribers',
				},
			},
			global: {
				access_key: null,
				email: 'sergey@apination.com',
				user_id: 422,
				trigger_id: '5b6c4fb9b6e34d0bb03a3cca',
			},
		},
		cron_params: {
			minutes: 10,
		},
		workflow: [
			{
				cn_google_sheets_get_updated_subscribers: {
					mainLogId: '$config.runtime.saga_id',
					apiKey: '$config.cn_google_sheets.params.apiKey',
					listId: '$config.cn_google_sheets.saved_params.listId',
				},
			},
			{
				filter: {
					terminate_if_empty: true,
					expression: 'true',
					name: 'visualFilter',
					id: 'visual-filter',
				},
			},
			{
				map: {
					mapping: {
						extensions: {},
						map: {
							city: "_.get($document, 'merge_fields.CITY')",
							company: "_.get($document, 'merge_fields.COMPANY')",
							country: "_.get($document, 'merge_fields.COUNTRY')",
							zipCode: "_.get($document, 'merge_fields.POSTCODE')",
							state: "_.get($document, 'merge_fields.STATE')",
							firstName: "_.get($document, 'merge_fields.FNAME')",
							lastName: "_.get($document, 'merge_fields.LNAME')",
							mobile: "_.get($document, 'merge_fields.MOBILEPHO')",
							home: "_.get($document, 'merge_fields.HOMEPHONE')",
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
		saved_params: {},
		configuration: [
			// {
			// 	"validations" : [],
			// 	"widgets" : [
			// 		{
			// 			"value" : "get_detailed_loops_by_account_or_profile",
			// 			"name" : "trigger",
			// 			"type" : "text",
			// 			"wrapper-class" : "hidden",
			// 			"class" : "hidden",
			// 			"node" : "input"
			// 		}
			// 	],
			// 	"app" : "cn_dotloop",
			// 	"title" : "Person added or updated",
			// 	"label" : "Trigger"
			// },
			// {
			// 	// "validations" : [
			// 	// 	{
			// 	// 		"message" : "#list_id-error",
			// 	// 		"with" : [
			// 	// 			"mailing_list_id"
			// 	// 		],
			// 	// 		"type" : "required"
			// 	// 	}
			// 	// ],
			// 	"widgets" : [
			// 		{
			// 			"class" : "hidden",
			// 			"node" : "input",
			// 			"type" : "text",
			// 			"name" : "action",
			// 			"wrapper-class" : "hidden",
			// 			"value" : "manage_subscriber"
			// 		},
			// 		// {
			// 		// 	"node" : "header",
			// 		// 	"text" : "Mailing list"
			// 		// },
			// 		// {
			// 		// 	"class" : "workflow_select_mailing",
			// 		// 	"raw-options" : "<option selected disabled value=\"CASE_NEED_SELECT\" color:\"#858585;\">Select list</option>",
			// 		// 	"data-method" : "cn_mailchimp.get_mailing_lists",
			// 		// 	"method" : {
			// 		// 		"method" : "cn_mailchimp.get_mailing_lists",
			// 		// 		"map" : {
			// 		// 			"value" : "id",
			// 		// 			"text" : "name"
			// 		// 		}
			// 		// 	},
			// 		// 	"name" : "listId",
			// 		// 	"id" : "mailing_list_id",
			// 		// 	"node" : "select-with-refresh",
			// 		// 	"depend" : "mapping"
			// 		// },
			// 		// {
			// 		// 	"id" : "list_id-error",
			// 		// 	"node" : "validation-message",
			// 		// 	"text" : "Select mailing list"
			// 		// },
			// 		// {
			// 		// 	"node" : "save-block"
			// 		// }
			// 	],
			// 	"app" : "cn_google_sheets",
			// 	"title" : "Create or update rows",
			// 	"label" : "Action"
			// },
			// {
			// 	"widgets" : [
			// 		{
			// 			"prototype" : {
			// 				"fields" : [
			// 					{
			// 						"sample" : "John",
			// 						"title" : "First name",
			// 						"getter" : "firstName",
			// 						"_id" : "dotloopFirstName"
			// 					},
			// 					{
			// 						"sample" : "Richard",
			// 						"title" : "Middle name",
			// 						"getter" : "middleName",
			// 						"_id" : "dotloopMiddleName"
			// 					},
			// 					{
			// 						"sample" : "Doe",
			// 						"title" : "Last name",
			// 						"getter" : "lastName",
			// 						"_id" : "dotloopLastName"
			// 					},
			// 					{
			// 						"sample" : "test@test.com",
			// 						"type" : "email",
			// 						"title" : "Email",
			// 						"getter" : "email",
			// 						"_id" : "dotloopEmail"
			// 					},
			// 					{
			// 						"sample" : "555-555-555",
			// 						"title" : "Office phone",
			// 						"getter" : "office",
			// 						"_id" : "dotloopOfficePhone"
			// 					},
			// 					{
			// 						"sample" : "555-555-555",
			// 						"title" : "Home phone",
			// 						"getter" : "home",
			// 						"_id" : "dotloopHomePhone"
			// 					},
			// 					{
			// 						"sample" : "555-555-555",
			// 						"title" : "Mobile phone",
			// 						"getter" : "mobile",
			// 						"_id" : "dotloopMobilePhone"
			// 					},
			// 					{
			// 						"sample" : "555-555-555",
			// 						"title" : "Fax",
			// 						"getter" : "fax",
			// 						"_id" : "dotloopFax"
			// 					},
			// 					{
			// 						"sample" : "Main street",
			// 						"title" : "Address",
			// 						"getter" : "address",
			// 						"_id" : "dotloopAddress"
			// 					},
			// 					{
			// 						"sample" : "234",
			// 						"title" : "Unit",
			// 						"getter" : "unit",
			// 						"_id" : "dotloopUnit"
			// 					},
			// 					{
			// 						"sample" : "Boston",
			// 						"title" : "City",
			// 						"getter" : "city",
			// 						"_id" : "dotloopCity"
			// 					},
			// 					{
			// 						"sample" : "01201",
			// 						"title" : "Zip Code",
			// 						"getter" : "zipCode",
			// 						"_id" : "dotloopZipCode"
			// 					},
			// 					{
			// 						"sample" : "US",
			// 						"title" : "Country",
			// 						"getter" : "country",
			// 						"_id" : "dotloopCountry"
			// 					},
			// 					{
			// 						"sample" : "MA",
			// 						"title" : "State",
			// 						"getter" : "state",
			// 						"_id" : "dotloopState"
			// 					},
			// 					{
			// 						"sample" : "Apination",
			// 						"title" : "Company",
			// 						"getter" : "company",
			// 						"_id" : "dotloopCompany"
			// 					},
			// 					{
			// 						"sample" : "BUYER",
			// 						"title" : "Role",
			// 						"getter" : "role",
			// 						"_id" : "dotloopRole"
			// 					}
			// 				],
			// 				"entityName" : "person",
			// 				"appName" : "cn_dotloop"
			// 			},
			// 			"node" : "visual-filter",
			// 			"name" : "visual-filter",
			// 			"id" : "visual-filter"
			// 		},
			// 		{
			// 			"node" : "save-block"
			// 		}
			// 	],
			// 	"app" : "cn_dotloop",
			// 	"title" : "Filter contacts",
			// 	"label" : "Filter",
			// 	"groupClassName" : "filter-widget"
			// },
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
										getter: 'firstName',
										_id: 'dotloopFirstName',
									},
									{
										sample: 'Richard',
										title: 'Middle name',
										getter: 'middleName',
										_id: 'dotloopMiddleName',
									},
									{
										sample: 'Doe',
										title: 'Last name',
										getter: 'lastName',
										_id: 'dotloopLastName',
									},
									{
										sample: 'test@test.com',
										type: 'email',
										title: 'Email',
										getter: 'email',
										_id: 'dotloopEmail',
									},
									{
										sample: '555-555-555',
										title: 'Office phone',
										getter: 'office',
										_id: 'dotloopOfficePhone',
									},
									{
										sample: '555-555-555',
										title: 'Home phone',
										getter: 'home',
										_id: 'dotloopHomePhone',
									},
									{
										sample: '555-555-555',
										title: 'Mobile phone',
										getter: 'mobile',
										_id: 'dotloopMobilePhone',
									},
									{
										sample: '555-555-555',
										title: 'Fax',
										getter: 'fax',
										_id: 'dotloopFax',
									},
									{
										sample: 'Main street',
										title: 'Address',
										getter: 'address',
										_id: 'dotloopAddress',
									},
									{
										sample: '234',
										title: 'Unit',
										getter: 'unit',
										_id: 'dotloopUnit',
									},
									{
										sample: 'Boston',
										title: 'City',
										getter: 'city',
										_id: 'dotloopCity',
									},
									{
										sample: '01201',
										title: 'Zip Code',
										getter: 'zipCode',
										_id: 'dotloopZipCode',
									},
									{
										sample: 'US',
										title: 'Country',
										getter: 'country',
										_id: 'dotloopCountry',
									},
									{
										sample: 'MA',
										title: 'State',
										getter: 'state',
										_id: 'dotloopState',
									},
									{
										sample: 'Apination',
										title: 'Company',
										getter: 'company',
										_id: 'dotloopCompany',
									},
									{
										sample: 'BUYER',
										title: 'Role',
										getter: 'role',
										_id: 'dotloopRole',
									},
								],
								idField: 'id',
								entityName: 'person',
								appName: 'cn_dotloop',
							},
							cn_google_sheets: {
								fields: [],
								entityName: 'person',
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
				app: 'cn_dotloop',
				title: 'Dotloop people to MailChimp subscribers',
				label: 'Mapping',
				groupClassName: 'mapping-widget',
			},
		],
		connections: ['cn_dotloop', 'cn_google_sheets'],
	},
]

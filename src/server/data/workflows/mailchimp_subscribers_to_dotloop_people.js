module.exports = [
	{
		_id: '5b6c4fb9b6e34d0bb03a3ccb',
		is_dynamic: true,
		is_generic: false,
		is_copy: true,
		name: 'mailchimp_subscribers_to_dotloop_people',
		short_description: 'MailChimp subscribers to Dotloop people',
		full_description: 'MailChimp subscribers to Dotloop people',
		app_proxy: 'cn_mailchimp',
		version: 2,
		default_trigger: '',
		about: '',
		actions: [
			{
				state: 'full_connect',
				action: 'get_data',
				mapping: '{}',
				app_proxy: 'cn_mailchimp',
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
			cn_mailchimp: {
				triggers_url:
					'https://lambda-proxy-stg.apination.com/connectors/mailchimp/triggers',
				actions_url:
					'https://lambda-proxy-stg.apination.com/connectors/mailchimp/actions',
				methods_url:
					'https://lambda-proxy-stg.apination.com/connectors/mailchimp/methods',
				proxy_url: 'https://lambda-proxy-stg.apination.com/connectors/mailchimp/',
				full_name_app: 'MailChimp',
				connect_id: '5b69a78ec409d8000439d833',
				saved_params: {
					trigger: 'get_subscribers',
					listId: '29aaf507bc',
					// "visual-mapping" : {
					// 	"mapping" : [
					// 		{
					// 			"from" : "mailChimp_email_address",
					// 			"to" : "dotloopEmail",
					// 			"constraintsMessages" : []
					// 		},
					// 		{
					// 			"from" : "mailChimp_merge_17",
					// 			"to" : "dotloopCity",
					// 			"constraintsMessages" : []
					// 		},
					// 	],
					// 	"wfSteps" : [
					// 		{
					// 			"map" : {
					// 				"mapping" : {
					// 					"extensions" : {},
					// 					"map" : {
					// 						"city" : "_.get($document, 'merge_fields.CITY')",
					// 						"company" : "_.get($document, 'merge_fields.COMPANY')",
					// 						"country" : "_.get($document, 'merge_fields.COUNTRY')",
					// 						"zipCode" : "_.get($document, 'merge_fields.POSTCODE')",
					// 						"state" : "_.get($document, 'merge_fields.STATE')",
					// 						"firstName" : "_.get($document, 'merge_fields.FNAME')",
					// 						"lastName" : "_.get($document, 'merge_fields.LNAME')",
					// 						"mobile" : "_.get($document, 'merge_fields.MOBILEPHO')",
					// 						"home" : "_.get($document, 'merge_fields.HOMEPHONE')"
					// 					}
					// 				}
					// 			}
					// 		}
					// 	]
					// }
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
				cn_mailchimp_get_updated_subscribers: {
					mainLogId: '$config.runtime.saga_id',
					apiKey: '$config.cn_mailchimp.params.apiKey',
					listId: '$config.cn_mailchimp.saved_params.listId',
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
		saved_params: {
			cn_mailchimp: {
				trigger: 'get_subscribers',
				// listId: '29aaf507bc',
				// "visual-mapping" : {
				// 	"mapping" : [
				// 		{
				// 			"from" : "mailChimp_email_address",
				// 			"to" : "dotloopEmail",
				// 			"constraintsMessages" : []
				// 		},
				// 		{
				// 			"from" : "mailChimp_merge_17",
				// 			"to" : "dotloopCity",
				// 			"constraintsMessages" : []
				// 		},
				// 	],
				// 	"wfSteps" : [
				// 		{
				// 			"map" : {
				// 				"mapping" : {
				// 					"extensions" : {},
				// 					"map" : {
				// 						"city" : "_.get($document, 'merge_fields.CITY')",
				// 						"company" : "_.get($document, 'merge_fields.COMPANY')",
				// 						"country" : "_.get($document, 'merge_fields.COUNTRY')",
				// 						"zipCode" : "_.get($document, 'merge_fields.POSTCODE')",
				// 						"state" : "_.get($document, 'merge_fields.STATE')",
				// 						"firstName" : "_.get($document, 'merge_fields.FNAME')",
				// 						"lastName" : "_.get($document, 'merge_fields.LNAME')",
				// 						"mobile" : "_.get($document, 'merge_fields.MOBILEPHO')",
				// 						"home" : "_.get($document, 'merge_fields.HOMEPHONE')"
				// 					}
				// 				}
				// 			}
				// 		}
				// 	]
				// }
			},
		},
		configuration: [
			{
				validations: [
					{
						message: '#list_id-error',
						with: ['mailing_list_id'],
						type: 'required',
					},
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
					{
						node: 'header',
						text: 'Mailing list',
					},
					{
						class: 'workflow_select_mailing',
						'raw-options':
							'<option selected disabled value="CASE_NEED_SELECT" color:"#858585;">Select list</option>',
						'data-method': 'cn_mailchimp.get_mailing_lists',
						method: {
							method: 'cn_mailchimp.get_mailing_lists',
							map: {
								value: 'id',
								text: 'name',
							},
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
					{
						node: 'save-block',
					},
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
					{
						node: 'save-block',
					},
				],
				app: 'cn_mailchimp',
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
										_id: 'dotloopFirstName',
										setter: 'firstName',
										title: 'First name',
										sample: 'John',
										autoMapping: {
											name: 'firstName',
										},
									},
									{
										_id: 'dotloopMiddleName',
										setter: 'middleName',
										title: 'Middle name',
										sample: 'Richard',
										autoMapping: {
											name: 'middleName',
										},
									},
									{
										_id: 'dotloopLastName',
										setter: 'lastName',
										title: 'Last name',
										sample: 'Doe',
										autoMapping: {
											name: 'lastName',
										},
									},
									{
										_id: 'dotloopEmail',
										setter: 'email',
										title: 'Email',
										type: 'email',
										sample: 'test@test.com',
										autoMapping: {
											name: 'email',
										},
									},
									{
										_id: 'dotloopOfficePhone',
										setter: 'office',
										title: 'Office phone',
										sample: '555-555-555',
									},
									{
										_id: 'dotloopHomePhone',
										setter: 'home',
										title: 'Home phone',
										sample: '555-555-555',
									},
									{
										_id: 'dotloopMobilePhone',
										setter: 'mobile',
										title: 'Mobile phone',
										sample: '555-555-555',
									},
									{
										_id: 'dotloopFax',
										setter: 'fax',
										title: 'Fax',
										sample: '555-555-555',
									},
									{
										_id: 'dotloopAddress',
										setter: 'address',
										title: 'Address',
										sample: 'Main street',
										autoMapping: {
											name: 'address1',
										},
									},
									{
										_id: 'dotloopUnit',
										setter: 'unit',
										title: 'Unit',
										sample: '234',
									},
									{
										_id: 'dotloopCity',
										setter: 'city',
										title: 'City',
										sample: 'Boston',
										autoMapping: {
											name: 'city',
										},
									},
									{
										_id: 'dotloopZipCode',
										setter: 'zipCode',
										title: 'Zip Code',
										sample: '01201',
										autoMapping: {
											name: 'zipCode',
										},
									},
									{
										_id: 'dotloopCountry',
										setter: 'country',
										title: 'Country',
										sample: 'US',
										autoMapping: {
											name: 'country',
										},
									},
									{
										_id: 'dotloopState',
										setter: 'state',
										title: 'State',
										sample: 'MA',
										autoMapping: {
											name: 'state',
										},
									},
									{
										_id: 'dotloopCompany',
										setter: 'company',
										title: 'Company',
										sample: 'Apination',
										autoMapping: {
											name: 'company',
										},
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
					{
						node: 'save-block',
					},
				],
				app: 'cn_mailchimp',
				title: 'MailChimp subscribers to Dotloop people',
				label: 'Mapping',
				groupClassName: 'mapping-widget',
			},
		],
		connections: ['cn_mailchimp', 'cn_dotloop'],
		__v: 0,
	},
]

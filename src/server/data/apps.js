module.exports = [
	{
		name: 'cn_mls_actris',
		full_name: 'ACTRIS MLS',
		supportsSimpleWorkflows: true,
		simpleWofklowsConfig: {
			// Separate configs for the "triggers" and "actions": for getting people from Dotloop
			// and creating/updating people in Dotloop.
			// TODO: "triggers" and "actions" are current terms used in webapp's UI, find better one for this config
			triggers: [
				{
					name: 'person',
					titleSingular: 'person',
					titlePlural: 'people',
					// fields list accepted by mapper
					// TODO: think about returning them from lambda for systems with dynamic fields.
					// Maybe use "fields": "lambda_name" for apps with custom fields that require API request
					// and predefined array for apps without them
					fields: [
						{
							_id: 'dotloop_first_name',
							getter: 'first_name',
							title:
								'Very long long long long long long long long long long long long first name',
							sample: 'John',
							constraints: {
								required: true,
								trimOrFail: 'trim',
							},
							autoMapping: {
								// our inner field name to match in other app for auto mapping
								name: 'first_name',
							},
						},
						{
							_id: 'dotloop_last_name',
							getter: 'last_name',
							title: 'Last name',
							sample: 'Dow',
							autoMapping: {
								name: 'last_name',
							},
						},
						{
							_id: 'dotloop_email',
							getter: 'emails[0].value',
							setter: 'x => emails[x] = { email: x }',
							title: 'Email',
							type: 'email',
							sample: 'john@dow.com',
							autoMapping: {
								name: 'email',
							},
						},
						{
							_id: 'dotloop_age',
							getter: 'age',
							title: 'Age',
							type: 'number',
							sample: 99,
						},
						{
							_id: 'dotloop_website',
							getter: 'website',
							title: 'Website',
							type: 'url',
							sample: 'https://apination.com',
							autoMapping: {
								name: 'website',
							},
						},
						{
							_id: 'dotloop_role',
							getter: 'role',
							title: 'Role',
							sample: 'BUYER',
						},
					],
					// title for options block: http://dl4.joxi.net/drive/2018/07/11/0004/2795/285419/19/8ca5145731.jpg
					webappUiTitle: 'Person added or updated',
					// "widgets" path in current format used by wf templates:
					// https://github.com/Apination/hub/blob/master/app/workflows/dotloop_company_documents_to_dropbox.json#L41
					configurationWidgets: [
						{
							node: 'input',
							class: 'hidden',
							'wrapper-class': 'hidden',
							type: 'text',
							name: 'trigger',
							value: 'get_detailed_loops_by_account_or_profile',
						},
						{
							method: {
								method: 'cn_dotloop.get_user_info',
								map: {
									value: 'id',
									text: 'name',
								},
								path: 'profiles',
							},
							id: 'profile',
							class: 'workflow_option_trigger',
							profileTypes: 'COMPANY',
							node: 'dotloop-select-profile',
							name: 'profile',
						},
						{
							node: 'save-block',
						},
					],
					// code of first workflow step.
					// TODO: find better name then "lambdaCall"
					lambdaCall: {
						cn_dotloop_get_contacts: {
							terminate_if_empty: true,
							connector: 'cn_dotloop',
							syncAll: true,
							token: '$config.cn_dotloop.params.token',
						},
					},
				},
			],
		},
	},
	{
		name: 'cn_mls_akmls',
		full_name: 'AKMLS',
	},
	{
		name: 'cn_mls_armls',
		full_name: 'ARMLS',
	},
	{
		name: 'cn_mls_bakersfield',
		full_name: 'Bakersfield MLS',
	},
	{
		name: 'cn_bm',
		full_name: 'BrokermintWfInterface',
	},
	{
		name: 'cn_bs',
		full_name: 'BrokerSumo',
	},
	{
		name: 'cn_mls_crmls',
		full_name: 'California Regional MLS',
	},
	{
		name: 'cn_mls_crmls_ny',
		full_name: 'Capital Region MLS',
	},
	{
		name: 'cn_mls_carolina',
		full_name: 'CarolinaMLS',
	},
	{
		name: 'cn_convoso',
		full_name: 'Convoso',
	},
	{
		name: 'cn_cosential',
		full_name: 'Cosential',
	},
	{
		name: 'cn_sf_cumulus',
		full_name: 'Cumulus',
	},
	{
		name: 'cn_docusign',
		full_name: 'DocuSign',
		description:
			'Whether it’s buying, selling, or refinancing, DocuSign helps you centralize all of your real estate documents',
	},
	{
		name: 'cn_dotloop',
		full_name: 'Dotloop',
	},
	{
		name: 'cn_dropbox',
		full_name: 'Dropbox',
	},
	{
		name: 'cn_example',
		full_name: 'Example Connector',
	},
	{
		name: 'cn_excel',
		full_name: 'Excel',
	},
	{
		name: 'cn_facebook',
		full_name: 'Facebook',
	},
	{
		name: 'cn_mls_fhaar',
		full_name: 'FHAAR MLS',
	},
	{
		name: 'cn_flex_mls',
		full_name: 'Flexmls',
	},
	{
		name: 'cn_mls_fmls',
		full_name: 'FMLS',
	},
	{
		name: 'cn_mls_gardenstate',
		full_name: 'Garden State MLS',
	},
	{
		name: 'cn_mls_genris',
		full_name: 'GENRIS MLS',
	},
	{
		name: 'cn_mls_glvar',
		full_name: 'GLVAR MLS',
	},
	{
		name: 'cn_gcal',
		full_name: 'Google Calendar',
	},
	{
		name: 'cn_google_contacts',
		full_name: 'Google Contacts',
	},
	{
		name: 'cn_google_docs',
		full_name: 'Google Docs',
	},
	{
		name: 'cn_gdrive',
		full_name: 'Google Drive',
	},
	{
		name: 'cn_google_sheets',
		full_name: 'Google Sheets',
	},
	{
		name: 'cn_mls_gsrein',
		full_name: 'GSREIN MLS',
	},
	{
		name: 'cn_mls_gulfcoastal',
		full_name: 'Gulf Coast Alabama MLS',
	},
	{
		name: 'cn_mls_har',
		full_name: 'HAR MLS',
	},
	{
		name: 'cn_mls_hcar',
		full_name: 'HCAR MLS',
	},
	{
		name: 'cn_hotpads',
		full_name: 'HotPads',
	},
	{
		name: 'cn_mls_ires',
		full_name: 'IRES MLS',
	},
	{
		name: 'cn_jobnimbus',
		full_name: 'JobNimbus',
	},
	{
		name: 'cn_mls_kaar',
		full_name: 'KAAR MLS',
	},
	{
		name: 'cn_mls_lar',
		full_name: 'LAR MLS',
	},
	{
		name: 'cn_mls_lcar',
		full_name: 'LCAR MLS',
	},
	{
		name: 'cn_mls_louisville',
		full_name: 'Louisville MLS',
	},
	{
		name: 'cn_mailchimp',
		full_name: 'MailChimp',
	},
	{
		name: 'cn_mls_metrolist',
		full_name: 'MetroList MLS',
	},
	{
		name: 'cn_mls_mfr',
		full_name: 'MFRMLS',
	},
	{
		name: 'cn_mls_miami',
		full_name: 'MIAMI MLS',
	},
	{
		name: 'cn_mls_mob',
		full_name: 'MobMLS',
	},
	{
		name: 'cn_mls_mred',
		full_name: 'MRED MLS',
	},
	{
		name: 'cn_mls_mris',
		full_name: 'MRIS MLS',
	},
	{
		name: 'my_connector',
		full_name: 'My Connector',
	},
	{
		name: 'cn_mls_nky',
		full_name: 'NKY MLS',
	},
	{
		name: 'cn_mls_nores',
		full_name: 'NORES MLS',
	},
	{
		name: 'cn_mls_nsar',
		full_name: 'NSAR MLS',
	},
	{
		name: 'cn_mls_ntreis',
		full_name: 'NTREIS MLS',
	},
	{
		name: 'cn_mls_nwmls',
		full_name: 'NWMLS',
	},
	{
		name: 'cn_mls_ppmls',
		full_name: 'PPMLS',
	},
	{
		name: 'cn_procore',
		full_name: 'Procore',
	},
	{
		name: 'cn_sf_propertybase',
		full_name: 'Propertybase',
	},
	{
		name: 'cn_qualer',
		full_name: 'Qualer',
	},
	{
		name: 'cn_qbd',
		full_name: 'QuickBooks Desktop',
	},
	{
		name: 'cn_qbo',
		full_name: 'QuickBooks Online',
	},
	{
		name: 'cn_mls_rasm',
		full_name: 'RASM MLS',
	},
	{
		name: 'cn_realgeek',
		full_name: 'Real Geeks',
	},
	{
		name: 'cn_mls_realcomp',
		full_name: 'Realcomp MLS',
	},
	{
		name: 'cn_mls_realtracs',
		full_name: 'RealTracs MLS',
	},
	{
		name: 'cn_mls_recolorado',
		full_name: 'REcolorado MLS',
	},
	{
		name: 'cn_mls_rein',
		full_name: 'REIN MLS',
	},
	{
		name: 'cn_rio_genesis',
		full_name: 'RIO Genesis',
	},
	{
		name: 'cn_mls_sabor',
		full_name: 'SABOR MLS',
	},
	{
		name: 'cn_sage50',
		full_name: 'Sage50',
	},
	{
		name: 'cn_sf',
		full_name: 'Salesforce',
	},
	{
		name: 'cn_mls_sandicor',
		full_name: 'Sandicor MLS',
	},
	{
		name: 'cn_mls_sira',
		full_name: 'SIRA MLS',
	},
	{
		name: 'cn_mls_somo',
		full_name: 'SOMO MLS',
	},
	{
		name: 'cn_mls_statewide',
		full_name: 'State-Wide MLS',
	},
	{
		name: 'cn_mls_syaor',
		full_name: 'SYAOR MLS',
	},
	{
		name: 'cn_tpn',
		full_name: 'TPNI Engage',
	},
	{
		name: 'cn_mls_trendrets',
		full_name: 'TREND MLS',
	},
	{
		name: 'cn_mls_triangle',
		full_name: 'Triangle MLS',
	},
	{
		name: 'cn_tribus',
		full_name: 'TRIBUS CRM',
	},
	{
		name: 'cn_mls_waco',
		full_name: 'Waco MLS',
	},
	{
		name: 'cn_mls_wfr',
		full_name: 'WFR MLS',
	},
	{
		name: 'cn_zillow',
		full_name: 'Zillow',
	},
	{
		name: 'cn_zoho_reports',
		full_name: 'Zoho Reports',
	},
]

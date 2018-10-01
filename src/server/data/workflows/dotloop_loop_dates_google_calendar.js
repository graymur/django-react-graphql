module.exports = [
	{
		_id: 4,
		name: 'dotloop_loop_dates_google_calendar',
		short_description: "Sync Loop's dates to Google Calendar",
		full_description:
			'Adding or modifying the Loop milestone dates in <a href="/apps/dotloop">Dotloop</a> updates your <a href="/apps/google_calendar">Google Calendar</a> accordingly. The workflow will not process past events and Loops with statuses "SOLD" or "ARCHIVED". Deleting dates in dotloop will not affect to events on Google Calendar.',
		default_trigger: 'get_detailed_loops_by_account_or_profile',
		app_proxy: 'cn_dotloop',
		version: 2,
		about: "Loop's milestone dates to Google Calendar",
		connections: ['cn_dotloop', 'cn_gcal'],
		cron_params: {
			minutes: 15,
		},
		actions: [
			{
				app_proxy: 'cn_dotloop',
				mapping: '{}',
				action: 'get_detailed_loops_by_account_or_profile',
				state: 'full_connect',
			},
		],
		saved_params: {
			cn_dotloop: {
				profile: '',
			},
		},
		config: {
			cn_dotloop: {
				connect_id: '59e0e1525983c50004882458',
				saved_params: {
					profile: '',
				},
				methods_url: 'https://lambda-proxy.apination.com/connectors/dotloop/methods',
				full_name_app: 'Dotloop',
				actions_url: 'https://lambda-proxy.apination.com/connectors/dotloop/actions',
				triggers_url:
					'https://lambda-proxy.apination.com/connectors/dotloop/triggers',
				proxy_url: 'https://lambda-proxy.apination.com/connectors/dotloop/',
			},
			cn_gcal: {
				connect_id: '59e0e1895983c5000488245f',
				methods_url: 'http://cn-google.apination.com/methods',
				full_name_app: 'Google Calendar',
				actions_url: 'http://cn-google.apination.com/actions',
				triggers_url: 'http://cn-google.apination.com/triggers',
				proxy_url: 'http://cn-google.apination.com/',
			},
			global: {
				user_id: 2484,
				access_key: 'eb3ad8a91f9d66fc6e1e6e7072717e8539aeabcc',
				trigger_id: '59e0e1a55983c50004882474',
				generic_workflow_id: '596f90967e16140b61364404',
			},
		},
		configuration: [
			{
				label: 'Trigger',
				title: 'Loop milestone dates add/update',
				app: 'cn_dotloop',
				widgets: [
					{
						node: 'input',
						class: 'hidden',
						'wrapper-class': 'hidden',
						type: 'text',
						name: 'trigger',
						value: 'get_detailed_loops_by_account_or_profile',
					},
					{
						node: 'header',
						text: 'Profile',
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
						node: 'select',
						name: 'profile',
						'raw-options':
							'<option selected disabled value="CASE_NEED_SELECT" style="display:none; color:#858585;">Select account</option><option disabled value="CASE_NO_DATA" style="display:none; color:#858585;">Nothing matching selection was found</option><option disabled value="CASE_ERROR_WITH_CONNECT" style="display:none; color:#858585;">Could not connect</option><option disabled value="CASE_NO_ACCOUNT_CONNECTED" style="display:none; color:#858585;">No account connected</option><option value="" class="default-option" selected>All profiles</option>',
					},
					{
						node: 'save-block',
					},
				],
			},
			{
				label: 'Action',
				title: 'Event create/update',
				app: 'cn_gcal',
				widgets: [],
				validations: [],
			},
			{
				label: 'Workflow',
				title: 'Edit workflow',
				app: 'cn_dotloop',
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
				cn_dotloop_get_detailed_loops_by_account_or_profile: {
					payload: '$config.cn_dotloop.saved_params.profile',
					terminate_if_empty: true,
					token: '$config.cn_dotloop.params.token',
					fetchOnFirstRun: '2 months',
					connector: 'cn_dotloop',
					profileTypes: ['COMPANY', 'INDIVIDUAL'],
				},
			},
			{
				filter: {
					expression:
						"$document.status !== 'SOLD' && $document.status !== 'ARCHIVED' && (($document['Contract Dates'] && $document['Contract Dates']['Contract Agreement Date']) || ($document['Contract Dates'] && $document['Contract Dates']['Closing Date']) || ($document['Offer Dates'] && $document['Offer Dates']['Inspection Date']) || ($document['Offer Dates'] && $document['Offer Dates']['Offer Date']) || ($document['Offer Dates'] && $document['Offer Dates']['Offer Expiration Date']) || ($document['Offer Dates'] && $document['Offer Dates']['Occupancy Date']) || ($document['Listing Information'] && $document['Listing Information']['Expiration Date']) || ($document['Listing Information'] && $document['Listing Information']['Listing Date']))",
					terminate_if_empty: true,
				},
			},
			{
				map: {
					mapping: {
						extensions: {
							JOIN:
								'function(){ var arr = Array.from(arguments); var separator = arr.splice(0, 1); return arr.filter(s => s).join(separator); } ',
							ADDRESS:
								"function () { var a = $document['Property Address']; if (!a) return false; return JOIN( ', ', JOIN(' ', a['Street Number'], a['Street Name'], a['Unit Number']), JOIN(' ', a['City'], a['State/Prov'], a['Zip/Postal Code']), a['Country'] ) }",
							datesMap: [
								{
									path: "['Contract Dates']['Contract Agreement Date']",
									dateName: 'Contract Agreement Date',
								},
								{
									path: "['Contract Dates']['Closing Date']",
									dateName: 'Contract Closing Date',
								},
								{
									path: "['Offer Dates']['Inspection Date']",
									dateName: 'Offer Inspection Date',
								},
								{
									path: "['Offer Dates']['Offer Date']",
									dateName: 'Offer Date',
								},
								{
									path: "['Offer Dates']['Offer Expiration Date']",
									dateName: 'Offer Expiration Date',
								},
								{
									path: "['Offer Dates']['Occupancy Date']",
									dateName: 'Occupancy Date',
								},
								{
									path: "['Listing Information']['Expiration Date']",
									dateName: 'Listing expiration Date',
								},
								{
									path: "['Listing Information']['Listing Date']",
									dateName: 'Listing Date',
								},
							],
						},
						forEach: 'datesMap',
						map: {
							description: "dateName + ' - ' + name",
							location: "ADDRESS() || ''",
							summary: "dateName + ' - ' + name",
							end: {
								map: {
									date: '_.get($document, path)',
								},
							},
							start: {
								map: {
									date: '_.get($document, path)',
								},
							},
							transaction_code: "id + ' ' + dateName",
							api_method: "'POST'",
							source: {
								map: {
									url: 'loopUrl',
								},
							},
						},
					},
				},
			},
			{
				filter: {
					expression:
						"typeof end.date !== 'undefined' && (new Date(end.date)).setDate((new Date(end.date)).getDate()+1) > Date.now()",
					terminate_if_empty: true,
				},
			},
			{
				get_data_from_s3: {
					name: 'events',
				},
			},
			{
				'http-request': {
					payload: {
						proxy: 'cn_gcal',
						access_token: '$config.cn_gcal.params.access_token',
						log_data: {
							main_log_id: '$config.runtime.saga_id',
							user_id: '$config.global.user_id',
							trigger_id: '$config.global.trigger_id',
						},
						action: 'create_events',
						post_args: '$events.data',
						user_id: '$config.global.user_id',
						connect_id: '$config.cn_gcal.connect_id',
					},
					url: '$config.cn_gcal.actions_url',
					method: 'post',
					connector: 'cn_gcal',
				},
			},
		],
	},
]

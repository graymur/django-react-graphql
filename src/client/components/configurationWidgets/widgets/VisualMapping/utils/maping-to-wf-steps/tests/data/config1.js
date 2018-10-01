const mapping = [
	{
		from: 'fromAppEmail',
		to: 'mailChimp_email_address',
		constraintsMessages: [],
	},
	{
		from: 'fromAppFirstName',
		to: 'to_app_1',
		constraintsMessages: [],
	},
	{
		from: 'fromAppLastName',
		to: 'to_app_2',
		constraintsMessages: [],
	},
	{
		from: 'fromAppZipCode',
		to: 'to_app_16',
		constraintsMessages: [],
	},
	{
		from: 'fromAppHomePhone',
		to: 'to_app_7',
		constraintsMessages: [],
	},
	{
		from: 'fromAppCreated',
		to: 'to_app_12',
		constraintsMessages: [],
	},
]
const config = [
	{
		info: {
			appName: 'cn_from_app',
			entityName: 'person',
			name: 'cn_from_app',
			full_name: 'From app',
		},
		fields: [
			{
				sample: 'John',
				title: 'First name',
				getter: 'firstName',
				_id: 'fromAppFirstName',
			},
			{
				sample: 'Doe',
				title: 'Last name',
				getter: 'lastName',
				_id: 'fromAppLastName',
			},
			{
				sample: 'tests@tests.com',
				type: 'email',
				title: 'Email',
				getter: 'email',
				_id: 'fromAppEmail',
			},
			{
				sample: '555-555-555',
				title: 'Home phone',
				getter: 'home',
				_id: 'fromAppHomePhone',
			},
			{
				sample: '01201',
				title: 'Zip Code',
				getter: 'zipCode',
				_id: 'fromAppZipCode',
			},
			{
				sample: '2017-10-02T13:40:42Z',
				title: 'Created at',
				getter: 'created',
				_id: 'fromAppCreated',
			},
		],
	},
	{
		info: {
			appName: 'cn_to_app',
			entityName: 'subscriber',
			name: 'cn_to_app',
			full_name: 'To App',
		},
		fields: [
			{
				_id: 'mailChimp_email_address',
				setter: 'email_address',
				title: 'Email Address',
				type: 'email',
			},
			{
				_id: 'to_app_13',
				title: 'Company',
				type: 'string',
				setter: 'COMPANY',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'to_app_1',
				title: 'First Name',
				type: 'string',
				setter: 'FNAME',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'to_app_7',
				title: 'Home phone',
				type: 'string',
				setter: 'HOMEPHONE',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'to_app_2',
				title: 'Last Name',
				type: 'string',
				setter: 'LNAME',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'to_app_16',
				title: 'Post code',
				type: 'string',
				setter: 'POSTCODE',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'to_app_12',
				title: 'Status',
				type: 'string',
				setter: 'STATUS',
				constraints: {
					required: false,
				},
			},
		],
	},
]

module.exports = { mapping, config }

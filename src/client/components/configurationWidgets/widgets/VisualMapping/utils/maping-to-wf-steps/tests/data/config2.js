const mapping = [
	{
		from: 'fromAppEmail',
		to: 'mailChimp_email_address',
		constraintsMessages: [],
	},
	{
		from: 'fromAppFirstName',
		to: 'mailChimp_merge_1',
		constraintsMessages: [],
	},
	{
		from: 'fromAppLastName',
		to: 'mailChimp_merge_2',
		constraintsMessages: [],
	},
	{
		from: 'fromAppZipCode',
		to: 'mailChimp_merge_16',
		constraintsMessages: [],
	},
	{
		from: 'fromAppHomePhone',
		to: 'mailChimp_merge_7',
		constraintsMessages: [],
	},
	{
		from: 'fromAppCreated',
		to: 'mailChimp_merge_12',
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
			appName: 'cn_mailchimp',
			entityName: 'subscriber',
			name: 'cn_mailchimp',
			full_name: 'MailChimp',
			__typename: 'App',
		},
		fields: [
			{
				_id: 'mailChimp_email_address',
				setter: 'email_address',
				title: 'Email Address',
				type: 'email',
			},
			{
				_id: 'mailChimp_email_type',
				setter: 'email_type',
				title: 'Email Type',
				type: 'string',
			},
			{
				_id: 'mailChimp_status',
				setter: 'status',
				title: 'Status',
				type: 'string',
			},
			{
				_id: 'mailChimp_merge_14',
				title: 'Address 1',
				type: 'string',
				setter: 'ADDRESS1',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_3',
				title: 'Birthday',
				type: 'string',
				setter: 'BIRTHDAY',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_17',
				title: 'City',
				type: 'string',
				setter: 'CITY',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_13',
				title: 'Company',
				type: 'string',
				setter: 'COMPANY',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_5',
				title: 'Contact Type',
				type: 'string',
				setter: 'CONTACTTY',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_6',
				title: 'Country',
				type: 'string',
				setter: 'COUNTRY',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_1',
				title: 'First Name',
				type: 'string',
				setter: 'FNAME',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_7',
				title: 'Home phone',
				type: 'string',
				setter: 'HOMEPHONE',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_2',
				title: 'Last Name',
				type: 'string',
				setter: 'LNAME',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_10',
				title: 'Mobile phone',
				type: 'string',
				setter: 'MOBILEPHO',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_11',
				title: 'Monthly email to Realtors',
				type: 'string',
				setter: 'MONTHLYRE',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_8',
				title: 'Montly Email to Property managers',
				type: 'string',
				setter: 'MONTLYEMA',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_16',
				title: 'Post code',
				type: 'string',
				setter: 'POSTCODE',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_9',
				title: 'Sales rep',
				type: 'string',
				setter: 'SALESREP',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_15',
				title: 'State',
				type: 'string',
				setter: 'STATE',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_12',
				title: 'Status',
				type: 'string',
				setter: 'STATUS',
				constraints: {
					required: false,
				},
			},
			{
				_id: 'mailChimp_merge_4',
				title: 'Website',
				type: 'string',
				setter: 'WEBSITE',
				constraints: {
					required: false,
				},
			},
		],
	},
]

module.exports = { mapping, config }

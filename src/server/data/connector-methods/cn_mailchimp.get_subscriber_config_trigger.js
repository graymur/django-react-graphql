module.exports = () => [
	{
		_id: 'mailChimp_email_address',
		getter: 'email_address',
		title: 'Email Address',
		type: 'email',
		constraints: {
			required: true,
		},
		autoMapping: {
			name: 'email',
		},
	},
	{
		_id: 'mailChimp_merge_14',
		title: 'Address 1',
		type: 'string',
		getter: 'ADDRESS1',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_3',
		title: 'Birthday',
		type: 'string',
		getter: 'BIRTHDAY',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_17',
		title: 'City',
		type: 'string',
		getter: 'CITY',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_13',
		title: 'Company',
		type: 'string',
		getter: 'COMPANY',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_5',
		title: 'Contact Type',
		type: 'string',
		getter: 'CONTACTTY',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_6',
		title: 'Country',
		type: 'string',
		getter: 'COUNTRY',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_1',
		title: 'First Name',
		type: 'string',
		getter: 'FNAME',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_7',
		title: 'Home phone',
		type: 'string',
		getter: 'HOMEPHONE',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_2',
		title: 'Last Name',
		type: 'string',
		getter: 'LNAME',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_10',
		title: 'Mobile phone',
		type: 'string',
		getter: 'MOBILEPHO',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_11',
		title: 'Monthly email to Realtors',
		type: 'string',
		getter: 'MONTHLYRE',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_8',
		title: 'Montly Email to Property managers',
		type: 'string',
		getter: 'MONTLYEMA',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_16',
		title: 'Post code',
		type: 'string',
		getter: 'POSTCODE',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_9',
		title: 'Sales rep',
		type: 'string',
		getter: 'SALESREP',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_15',
		title: 'State',
		type: 'string',
		getter: 'STATE',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_12',
		title: 'Status',
		type: 'string',
		getter: 'STATUS',
		constraints: {
			required: false,
		},
	},
	{
		_id: 'mailChimp_merge_4',
		title: 'Website',
		type: 'string',
		getter: 'WEBSITE',
		constraints: {
			required: false,
		},
	},
]

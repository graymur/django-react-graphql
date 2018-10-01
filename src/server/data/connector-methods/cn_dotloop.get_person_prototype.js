module.exports = () => [
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
]

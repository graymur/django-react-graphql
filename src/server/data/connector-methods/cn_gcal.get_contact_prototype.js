module.exports = () => [
	{
		_id: 'mailchimp_last_name',
		setter: 'second_last_name',
		title: 'Contact last name',
		sample: 'Waters',
		constraints: {
			required: true,
			maxLength: 50,
			trimOrFail: 'trim',
		},
		autoMapping: {
			name: 'last_name',
		},
	},
	{
		_id: 'mailchimp_first_name',
		setter: 'second_first_name',
		title: 'Contact first name',
		sample: 'Silent',
		constraints: {
			required: true,
			minLength: 3,
			trimOrFail: 'trim',
		},
		autoMapping: {
			name: 'first_name',
		},
	},
	{
		_id: 'mailchimp_website',
		setter: 'second_website',
		title: 'A website',
		type: 'url',
		sample: 'https://www.waters.com',
		autoMapping: {
			name: 'website',
		},
	},
	{
		_id: 'mailchimp_email',
		setter: 'x => emails[x] = { email: x }',
		title: 'Email',
		type: 'email',
		sample: 'silter@waters.com',
		constraints: {
			required: true,
		},
		autoMapping: {
			name: 'email',
		},
	},
	{
		_id: 'mailchimp_age',
		setter: 'second_age',
		title: 'Age',
		type: 'number',
		sample: 99,
	},
]

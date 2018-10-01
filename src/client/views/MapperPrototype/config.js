export default {
	apps: [
		{
			title: 'Dotloop',
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
		},
		{
			title: 'MailChimp',
			fields: [
				{
					_id: 'mailchimp_last_name',
					getter: 'second_last_name',
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
					getter: 'second_first_name',
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
					getter: 'second_website',
					title: 'A website',
					type: 'url',
					sample: 'https://www.waters.com',
					autoMapping: {
						name: 'website',
					},
				},
				{
					_id: 'mailchimp_email',
					getter: 'second_emails[0].value',
					setter: 'x => emails[x] = { email: x }',
					title: 'Email',
					type: 'email',
					sample: 'silter@waters.com',
					autoMapping: {
						name: 'email',
					},
				},
				{
					_id: 'mailchimp_age',
					getter: 'second_age',
					title: 'Age',
					type: 'number',
					sample: 99,
				},
			],
		},
	],
}

module.exports = [
	{
		_id: 'from_firstName',
		title: 'from_firstName',
		autoMapping: {
			name: 'firstName',
		},
	},
	{
		_id: 'from_lastName',
		title: 'from_lastName',
		autoMapping: {
			name: 'lastName',
		},
	},
	{
		_id: 'from_email',
		title: 'from_email',
		autoMapping: {
			name: 'email',
		},
	},
	{
		_id: 'from_other_field',
		title: 'from_other_field',
		autoMapping: {
			name: Math.random().toString(), // shouldn't be mapped
		},
	},
	{
		_id: 'from_another_field', // shouldn't be mapped
		title: 'from_another_field', // shouldn't be mapped
	},
]

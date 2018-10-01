module.exports = [
	{
		_id: 'to_firstName',
		title: 'to_firstName',
		autoMapping: {
			name: 'firstName',
		},
	},
	{
		_id: 'to_lastName',
		title: 'to_lastName',
		autoMapping: {
			name: 'lastName',
		},
	},
	{
		_id: 'to_email',
		title: 'to_email',
		autoMapping: {
			name: 'email',
		},
	},
	{
		_id: 'to_other_field',
		title: 'to_other_field',
		autoMapping: {
			name: Math.random().toString(), // shouldn't be mapped
		},
	},
	{
		_id: 'to_another_field', // shouldn't be mapped
		title: 'to_another_field', // shouldn't be mapped
	},
]

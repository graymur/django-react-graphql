const mergeMappings = require('../merge-mappings').default

test('merges mappings', () => {
	const mappings = [
		[
			{
				from: 'from_firstName',
				to: 'to_firstName',
			},
			{
				from: 'from_lastName',
				to: 'to_lastName',
			},
			{
				from: 'from_email',
				to: 'to_email',
			},
		],
		[
			{
				from: 'from_firstName', // should not be in final mapping
				to: 'to_firstName2',
			},
			{
				from: 'from_middleName',
				to: 'to_middleName',
			},
		],
		[
			{
				from: 'from_firstName', // should not be in final mapping
				to: 'to_firstName3',
			},
			{
				from: 'from_middleName', // should not be in final mapping
				to: 'to_middleName2',
			},
			{
				from: 'from_phone',
				to: 'to_phone',
			},
		],
	]

	const result = mergeMappings(mappings)
	expect(result).toMatchSnapshot()
})

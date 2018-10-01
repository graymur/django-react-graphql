import prepareUserInput from './utils/prepare-user-input'

export default [
	{
		id: 1,
		value: '===',
		title: 'equals',
	},
	{
		id: 1.5,
		value: '!==',
		title: 'is not',
	},
	{
		id: 2,
		value: '>',
		title: 'is more than',
	},
	{
		id: 3,
		value: '<',
		title: 'is less than',
	},
	{
		id: 4,
		value: (field, value) =>
			`${field.getter}.indexOf(${prepareUserInput(value)}.toString()) > -1`,
		title: 'contains',
	},
]

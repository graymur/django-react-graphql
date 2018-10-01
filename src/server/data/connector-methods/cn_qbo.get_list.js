const data = {
	generic: [
		{
			id: 1,
			name: 'Value 1',
		},
		{
			id: 2,
			name: 'Value 2',
		},
	],
	Department: [
		{
			Name: 'Department 1',
			sparse: true,
			Id: '1',
		},
		{
			Name: 'Department 2',
			sparse: true,
			Id: '2',
		},
	],
}

module.exports = ({ model }) => (model in data ? data[model] : data.generic)

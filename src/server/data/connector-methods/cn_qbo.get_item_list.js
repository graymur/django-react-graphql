const items = [
	{
		Id: '3',
		Name: 'Concrete',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '4',
		Name: 'Design',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '6',
		Name: 'Gardening',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '2',
		Name: 'Hours',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '7',
		Name: 'Installation',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '8',
		Name: 'Lighting',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '9',
		Name: 'Maintenance & Repair',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '10',
		Name: 'Pest Control',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '11',
		Name: 'Pump',
		Type: 'Inventory',
		sparse: true,
	},
	{
		Id: '12',
		Name: 'Refunds & Allowances',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '5',
		Name: 'Rock Fountain',
		Type: 'Inventory',
		sparse: true,
	},
	{
		Id: '13',
		Name: 'Rocks',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '1',
		Name: 'Services',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '14',
		Name: 'Sod',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '15',
		Name: 'Soil',
		Type: 'Service',
		sparse: true,
	},
	{
		Id: '16',
		Name: 'Sprinkler Heads',
		Type: 'Inventory',
		sparse: true,
	},
	{
		Id: '17',
		Name: 'Sprinkler Pipes',
		Type: 'Inventory',
		sparse: true,
	},
	{
		Id: '18',
		Name: 'Trimming',
		Type: 'Service',
		sparse: true,
	},
]

module.exports = query => {
	if (query.connection_id === '5a85a1f9176b0300048b7630') {
		return items.slice(0, 1)
	}

	return items
}

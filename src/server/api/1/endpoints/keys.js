import Promise from 'bluebird'

export default async (req, res) => {
	await Promise.delay(1000)

	res.send([
		{
			_id: '592707be5f9a770004162120',
			user_id: 1281,
			params: {
				login: 'sergey@apination.com',
			},
			created_at: '2017-05-25T16:35:10.253306',
			label: 'sergey@apination.com',
			name: 'cn_bs',
			full_name: 'BrokerSumo',
			uid: 'VGQeKeP0tJIbxILaZIm2IXaoc3o=',
		},
		{
			_id: '5a0ada37b2492b0004bb5e25',
			uid: 'pGMAfUveOtRGNVygmzkjETX7XW8=',
			label: 'My Broker Company',
			created_at: '2017-11-14T11:57:43.095260',
			user_id: 1281,
			full_name: 'Brokermint',
			name: 'cn_bm',
			params: {
				api_key: 'NkgL2LR1T2dIt9Ze_DXti_hJs9g',
			},
		},
		{
			_id: '5a85a1f9176b0300048b7639',
			params: {
				access_token: '...',
			},
			full_name: 'Google Drive',
			created_at: '2018-02-15T15:06:33.712756',
			label: 'sergey@apination.com',
			user_id: 1281,
			name: 'cn_qbo',
			uid: 'paFy4JmarYFnh9Y68l/bDmfPsPU=',
		},
		{
			_id: '5a85a1f9176b0300048b7630',
			params: {
				access_token: '...',
			},
			full_name: 'Google Drive',
			created_at: '2018-02-15T15:06:33.712756',
			label: 'graymur@gmail.com',
			user_id: 1281,
			name: 'cn_qbo',
			uid: 'paFy4JmarYFnh9Y68l/bDmfPsPU1',
		},
	])
}

import Promise from 'bluebird'

export default async (req, res) => {
	await Promise.delay(1000)
	// res.send({
	// 	api_key: [
	// 		{
	// 			message:
	// 				"This API key does not belong to any MailChimp account. Please make sure it's typed correctly",
	// 			code: 'wrong_credentials',
	// 		},
	// 	],
	// })

	res.send({
		params: {
			apiKey:
				'xkG44ehljyLb9V2jqNyFtOp55wcH3UJIBoX9wW2ryijeWbYYkraK+LULIKmiFDFCmUFCYPShAK4kU7QQ7A9ecg==',
		},
		full_name: 'MailChimp',
		created_at: '2018-08-07T13:02:55.232330',
		label: '1111',
		user_id: 422,
		name: 'cn_mailchimp',
		uid: 'ylwpTEAcnVaDB3ab9zFaF64Z1G4=',
		id: '59b8deb28d7f8b0004e973f6',
		is_replaced: true,
	})
}

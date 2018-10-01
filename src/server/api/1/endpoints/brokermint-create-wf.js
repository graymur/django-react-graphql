import Promise from 'bluebird'

export default async (req, res) => {
	await Promise.delay(1000)
	console.log('BODY', req.body)
	res.send({
		_id: '5b813789774ee700044fd7e3',
		name: 'bm_qbo_invoice_itemized',
	})
}

import dataSource from 'server/data-source'
import Promise from 'bluebird'

export default async (req, res) => {
	const methodName = `${req.params.appName}.${req.params.methodName}`

	console.log(methodName, req.query)

	if (methodName === 'cn_gcal.get_contact_config' && !req.query.listId) {
		res.status(404).send({ detail: 'Not found.' })
	}

	await Promise.delay(1000)
	res.send(await dataSource.connectorMethod(methodName, req.query))
}

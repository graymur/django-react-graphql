import Promise from 'bluebird'

export default async (req, res) => {
	await Promise.delay(1000)
	res.send({ workflow_ready: true, is_enabled: true })
}

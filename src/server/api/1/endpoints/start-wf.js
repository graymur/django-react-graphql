import Promise from 'bluebird'

export default async (req, res) => {
	await Promise.delay(1000)
	res.send({ is_enable: true, status: 'active', is_run_workflows: true })
}

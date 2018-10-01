import Promise from 'bluebird'

export default async (req, res) => {
	console.log('DELETE WORKFLOW')
	await Promise.delay(3000)
	res.send()
}

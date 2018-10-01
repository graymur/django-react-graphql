import Promise from 'bluebird'

let prevValue = false

export default async (req, res) => {
	await Promise.delay(1000)
	prevValue = !prevValue
	res.send({ is_enabled: prevValue, status: prevValue ? 'active' : 'pause' })
}

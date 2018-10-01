export default (delay = 1000) =>
	new Promise((resolve, reject) => setTimeout(resolve, delay))

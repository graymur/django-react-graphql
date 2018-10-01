const defaultParams = {
	err404Message: 'Not found',
}

/**
 * Add default error handling to endpoint handlers
 * @param fn
 * @param userParams
 * @returns {function(*=, *=)}
 */
export default (fn, userParams = {}) => {
	const params = { ...defaultParams, ...userParams }
	return async (req, res) => {
		try {
			return await fn(req, res)
		} catch (e) {
			if (e.code === 404) {
				res.status(404).send({ error: params.err404Message })
			} else {
				res.status(500).send({ error: e.message })
			}
		}
	}
}

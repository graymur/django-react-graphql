const cache = {}

/**
 *
 * @param url
 * @param config
 * @param invalidateCache
 * @returns {Promise.<T>}
 */
export default async (url, config = {}, invalidateCache = false) => {
	const cacheKey = config.cacheKey || `${url}${JSON.stringify(config)}`

	// add fetch promise to cache to avoid sending HTTP request
	// with same config initiated by different components
	if (!cache[cacheKey] || invalidateCache) {
		// if WEBAPP_API_BASE_URL is not an URL on a same domain, we have not to add
		// credentials: 'include' to fetch config in order for CORS request to work
		const credentialsConfig =
			(process.env.WEBAPP_API_BASE_URL || '').indexOf('localhost') === -1
				? { credentials: 'include' }
				: {}

		cache[cacheKey] = fetch(url, { ...config, ...credentialsConfig })
			.then(response => {
				if (response.status >= 400) {
					cache[cacheKey] = false
					const e = new Error('Connector method request error')
					e.response = response
					throw e
				}

				return response
			})
			.then(response => response.json())
	}

	return cache[cacheKey]
}

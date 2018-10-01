import cachedFetch from './cached-fetch'
import queryString from 'query-string'
import getCookieByName from 'client/utils/get-cookie-by-name'

export default (url, config = {}, invalidateCache = true) => {
	const requestConfig = {
		...config,
		headers: {
			...(config.headers || {}),
			// Django required csrf token to be provided via each POST/PUT request
			// Django sets csrf value into cookie and updates it with every request
			'X-CSRFToken': getCookieByName('csrftoken'),
		},
	}

	url = `${process.env.WEBAPP_API_BASE_URL}${url}`

	if (
		(!requestConfig.method || requestConfig.method === 'GET') &&
		requestConfig.params
	) {
		url += '?' + queryString.stringify(config.params)
	}

	return cachedFetch(url, requestConfig, invalidateCache)
}

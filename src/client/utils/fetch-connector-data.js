import cachedFetch from './cached-fetch'
import reduce from 'lodash/reduce'
import flow from 'lodash/flow'
import get from 'lodash/get'
import queryString from 'query-string'

/**
 * Transform result per rules from workflow's widget's config
 *
 * Example result:
 [
 {
	 "value": 9970030,
	 "text": "Default Profile"
 },
 {
	 "value": 9970035,
	 "text": "Second profile"
 }
 ]

 Example config from workflow's settings:
 "map": {
	"value": "id",
	"text": "name"
 },
 "path": "profiles"

 Example result:

 [
 {
	 "value": 9970030,
	 "text": "Default Profile"
 },
 {
	 "value": 9970035,
	 "text": "Second profile"
 }
 ]
 * @param config
 * @param result
 * @returns {*}
 */
const prepareResult = (config, result) =>
	flow(
		extractPath(config.path),
		applyMap(config.map),
	)(result)

/**
 * "List" path of a result object to top level.
 * Example result:
 * {
 * 		"array": [1,2,3,4]
 * }
 *
 * Example path: "array"
 * Example result: [1,2,3,4]
 * @param path
 */
const extractPath = path => input => (path ? get(input, path) : input)

const applyMap = mapConfig => input =>
	mapConfig
		? input.map(x =>
				reduce(mapConfig, (acc, value, key) => ({ ...acc, [key]: x[value] }), {}),
		  )
		: input

export default (config, invalidateCache = false) => {
	const [appName, methodName] = config.method.split('.')
	const requestConfig = {
		...(config.requestConfig || {}),
		headers: {
			'Content-Type': 'application/json',
		},
	}

	let url = `${
		process.env.WEBAPP_API_BASE_URL
	}/api/connectors/apps/${appName}/run_method/${methodName}`

	if (config.params) {
		url += '?' + queryString.stringify(config.params)
	}

	return cachedFetch(url, requestConfig, invalidateCache)
		.then(result => ({
			...config,
			result: prepareResult(config, result),
		}))
		.catch(error => ({ ...config, error }))
}

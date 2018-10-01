import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import get from 'lodash/get'

const apiUrl = process.env.SPA_API_BASE_URL

const httpLink = new HttpLink({
	uri: `${apiUrl}/graphql`,
	headers: {
		// add Django's sessionid to GraphQL request to check session validity
		// on the backend
		'X-Session-Id': get(window, 'INITIAL_STATE.sessionId'),
	},
})

export default new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache().restore(window.__ASTATE__ || {}),
})

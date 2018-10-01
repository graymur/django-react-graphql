import get from 'lodash/get'

export default error => {
	const networkErrors = get(error, 'error.networkError.result.errors', []).map(
		x => x.message,
	)

	const graphQLErrors = get(error, 'error.graphQLErrors', []).map(x => x.message)
	return [...networkErrors, ...graphQLErrors]
}

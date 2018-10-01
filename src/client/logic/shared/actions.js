import { createAction } from 'redux-actions'

export const setLoading = createAction(
	'Shared.loading',
	(loading = false) => loading,
)
export const setError = createAction('Shared.setError', (error = false) => error)
export const clearError = createAction('Shared.clearError', () => {})
export const setIsLoggedIn = createAction(
	'Shared.setIsLoggedIn',
	(isLoggedIn = true) => isLoggedIn,
)
export const setBackendError = createAction(
	'Shared.setBackendError',
	(error = null) => error,
)

import { createSelector } from 'reselect'
import { SHARED_REDUCER_KEY } from './reducer'

export const selectState = state => state[SHARED_REDUCER_KEY]

export const selectError = createSelector(selectState, main => main.error)
export const isLoggedIn = createSelector(selectState, main => main.isLoggedIn)
export const setBackendError = createSelector(
	selectState,
	main => main.setBackendError,
)

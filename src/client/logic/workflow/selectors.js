import { createSelector } from 'reselect'
import { WORKFLOW_REDUCER_KEY } from './reducer'

export const selectState = state => state[WORKFLOW_REDUCER_KEY]
export const workflow = createSelector(selectState, main => main.workflow)
export const validationErrors = createSelector(
	selectState,
	main => main.validationErrors,
)
export const initialWidgetsValues = createSelector(
	selectState,
	main => main.initialWidgetsValues,
)
export const widgetsValues = createSelector(selectState, main => main.widgetsValues)
export const widgetsErrors = createSelector(selectState, main => main.widgetsErrors)

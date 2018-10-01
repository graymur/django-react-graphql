import { createSelector } from 'reselect'
import { MAPPER_REDUCER_KEY } from './reducer'

export const selectState = state => state[MAPPER_REDUCER_KEY]
const selectField = field => createSelector(selectState, main => main[field])

export const apps = selectField('apps')
export const fromFields = selectField('fromFields')
export const toFields = selectField('toFields')
export const activeField = selectField('activeField')
export const potentialMappings = selectField('potentialMappings')
export const mapping = selectField('mapping')
export const dropzones = selectField('dropzones')
export const reduxWorkflowId = selectField('workflowId')

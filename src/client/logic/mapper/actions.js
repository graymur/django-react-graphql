import { createAction } from 'redux-actions'

export const setConfig = createAction(
	'Mapper.setConfig',
	(config, savedMapping) => ({ config, savedMapping }),
)
export const setApps = createAction('Mapper.setApps', apps => apps)
export const addMapping = createAction(
	'Mapper.addMapping',
	(fromField, toField) => ({ fromField, toField }),
)

// export const resetState = createAction('Mapper.resetState', () => {})
// export const setWorkflowId = createAction(
// 	'Mapper.setWorkflowId',
// 	workflowId => workflowId,
// )
export const addDropZone = createAction('Mapper.addDropZone', dropzone => dropzone)
export const deleteMapping = createAction('Mapper.deleteMapping', field => field)
export const setMapping = createAction('Mapper.setMapping', mapping => mapping)
export const autoMapping = createAction('Mapper.autoMapping', () => {})
export const randomMapping = createAction('Mapper.randomMapping', () => {})
export const clearMapping = createAction('Mapper.clearMapping', () => {})
export const setActiveField = createAction('Mapper.setActiveField', field => field)
export const clearActiveField = createAction('Mapper.clearActiveField', () => {})
export const fieldDraggedAndDropped = createAction(
	'Mapper.fieldDraggedAndDropped',
	(field, eventX, eventY) => ({ field, eventX, eventY }),
)

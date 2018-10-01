import * as actions from './actions'
import { handleActions } from 'redux-actions'
import findPotentialMapping from './utils/find-potential-mapping'
import randomMapping from './utils/random-mapping'
import autoMapping from './utils/auto-mapping'
import createMappingObject from './utils/create-mapping-object'
import { orderFromFields, orderToFields } from './utils/order-fields'
// import isString from 'lodash/isString'

export const MAPPER_REDUCER_KEY = 'Mapper'

// const dv = (title, v) => {
// 	if (!isString(title)) {
// 		console.log(JSON.stringify(title, null, 4))
// 	} else {
// 		console.log(title, JSON.stringify(v, null, 4))
// 	}
// }

export const initialState = {
	config: null,
	apps: [],
	fromFields: [],
	toFields: [],
	activeFields: undefined,
	potentialMappings: [],
	mapping: [],
	dropzones: [],
}

const setMappingInState = (state, mapping) => {
	const fromFields = orderFromFields(state.apps[0].fields, mapping).map(field => ({
		...field,
		mappingObject: mapping.find(x => x.from === field._id),
	}))
	const toFields = orderToFields(state.apps[1].fields, fromFields, mapping)

	return {
		...state,
		mapping,
		fromFields,
		toFields,
	}
}

const setApps = (state, { payload: apps }) => {
	const appsWithType = apps.map((app, index) => ({
		...app,
		// add __type field to each field to distinguish from from to
		fields: app.fields.map(x => ({
			...x,
			__type: index === 0 ? 'from' : 'to',
			appName: app.title,
		})),
	}))

	return {
		...state,
		apps: appsWithType,
		fromFields: appsWithType[0].fields,
		toFields: appsWithType[1].fields,
	}
}

const addMapping = (state, { payload: { fromField, toField } }) => {
	const from = fromField.__type === 'from' ? fromField : toField
	const to = fromField.__type === 'from' ? toField : fromField

	const mapping = [...state.mapping, createMappingObject(from, to)]

	return setMappingInState(state, mapping)
}

const setActiveField = (state, { payload: activeField }) => {
	const targets = activeField.__type === 'from' ? state.toFields : state.fromFields
	const potentialMappings = findPotentialMapping(
		activeField,
		targets.filter(x => !x.isMapped),
	).map(x => x._id)

	return {
		...state,
		potentialMappings,
		activeField,
	}
}

const fieldDraggedAndDropped = (state, { payload: { field, eventX, eventY } }) => {
	const dropzone = state.dropzones.find(
		({ rect }) =>
			eventX >= rect.left &&
			eventX <= rect.left + rect.width &&
			eventY >= rect.top &&
			eventY <= rect.top + rect.height,
	)

	return dropzone
		? addMapping(state, {
				payload: { fromField: field, toField: dropzone.field },
		  })
		: state
}

const setConfig = (state, { payload: { config, savedMapping } }) => {
	let newState = state
	newState = setApps(newState, { payload: config.apps })
	newState = setMappingInState(newState, savedMapping)
	return {
		...newState,
		config,
	}
}

export default handleActions(
	{
		[actions.setConfig]: setConfig,
		[actions.setApps]: setApps,
		// [actions.setWorkflowId]: (state, { payload }) => ({
		// 	...state,
		// 	workflowId: payload,
		// }),
		// [actions.resetState]: () => initialState,
		[actions.addMapping]: addMapping,
		[actions.setMapping]: (state, { payload: mapping }) =>
			setMappingInState(state, mapping),
		[actions.autoMapping]: state =>
			setMappingInState(
				state,
				autoMapping(state.apps[0].fields, state.apps[1].fields, {
					matchByFieldsNames: true,
				}),
			),
		[actions.clearMapping]: state => setMappingInState(state, []),
		[actions.clearActiveField]: state => {
			return {
				...state,
				activeField: undefined,
				dropzones: [],
				potentialMappings: [],
			}
		},
		[actions.addDropZone]: (state, { payload: dropzone }) => ({
			...state,
			dropzones: [...state.dropzones, dropzone],
		}),
		[actions.deleteMapping]: (state, { payload: field }) =>
			setMappingInState(
				state,
				state.mapping.filter(x => x.from !== field._id && x.to !== field._id),
			),
		[actions.setActiveField]: setActiveField,
		[actions.fieldDraggedAndDropped]: fieldDraggedAndDropped,
	},
	initialState,
)

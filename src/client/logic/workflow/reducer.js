import * as actions from './actions'
import { handleActions } from 'redux-actions'
import validateWorkflow from './utils/validate-workflow'
import omit from 'lodash/omit'

import getWidgetsValuesFromWorkflow from './utils/get-widgets-values-from-workflow'
import validateWidgets from './utils/validate-widgets'

export const WORKFLOW_REDUCER_KEY = 'Workflow'

export const initialState = {
	workflow: undefined,
	validationErrors: false,
}

/**
 * GraphQL API will return all objects fetched from Mongo with "_id" field, but webapp's API
 * replaces it with "id" field. We need to changed it to GraphQL variant maintain consistency
 * between data coming from GraphQL and webapp's REST endpoints
 * @param obj
 * @returns {{_id}}
 */
const replaceIdWithUnderscoredId = obj =>
	obj.id
		? {
				...omit(obj, 'id'),
				_id: obj.id,
		  }
		: obj

const addConnection = (state, { payload }) => ({
	...state,
	workflow: {
		...state.workflow,
		connectionObjects: [
			...state.workflow.connectionObjects,
			replaceIdWithUnderscoredId(payload),
		],
	},
	validationErrors: validateWorkflow(state.workflow),
})

export default handleActions(
	{
		[actions.setWorkflow]: (state, { payload: workflow }) => ({
			...state,
			initialWidgetsValues: getWidgetsValuesFromWorkflow(workflow),
			widgetsValues: {
				...getWidgetsValuesFromWorkflow(workflow),
				...state.widgetsValues,
			},
			widgetsErrors: validateWidgets(workflow),
			workflow,
			validationErrors: validateWorkflow(workflow),
		}),
		[actions.setWidgetValue]: (
			state,
			{ payload: { name, value, validationErrors } },
		) => {
			return {
				...state,
				widgetsValues: {
					...state.widgetsValues,
					[name]: value,
				},
				widgetsErrors: {
					...state.widgetsErrors,
					[name]: validationErrors,
				},
			}
		},
		[actions.setWorkflowActiveState]: (state, { payload }) => ({
			...state,
			workflow: { ...state.workflow, ...payload },
			validationErrors: validateWorkflow(state.workflow),
		}),
		[actions.setWorkflowCronParams]: (state, { payload }) => ({
			...state,
			workflow: { ...state.workflow, cron_params: payload },
			validationErrors: validateWorkflow(state.workflow),
		}),
		[actions.addConnection]: addConnection,
		/**
		 * Add new connection object to list of existing connection
		 * objects and set it as active in workflow's config
		 * @param state
		 * @param payload
		 * @returns {{workflow: {config: {}}}}
		 */
		[actions.addConnectionAndSetActive]: (state, { payload }) => {
			const newState = addConnection(state, { payload })

			return {
				...newState,
				workflow: {
					...newState.workflow,
					config: {
						...newState.workflow.config,
						[payload.name]: {
							...newState.workflow.config[payload.name],
							connect_id: payload.id,
						},
					},
				},
			}
		},
	},
	initialState,
)

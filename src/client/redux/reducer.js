import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import shared, { SHARED_REDUCER_KEY } from 'client/logic/shared/reducer'
import mapper, { MAPPER_REDUCER_KEY } from 'client/logic/mapper/reducer'
import workflow, { WORKFLOW_REDUCER_KEY } from 'client/logic/workflow/reducer'

export default combineReducers({
	[SHARED_REDUCER_KEY]: shared,
	[MAPPER_REDUCER_KEY]: mapper,
	[WORKFLOW_REDUCER_KEY]: workflow,
	routing: routerReducer,
})

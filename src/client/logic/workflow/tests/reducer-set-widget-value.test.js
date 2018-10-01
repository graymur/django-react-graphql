import { setWorkflow, setWidgetValue } from '../actions'
import reducer, { initialState } from '../reducer'
import workflow from './data/workflow'

test('Sets valid widget value in state', () => {
	let state = reducer(initialState, setWorkflow(workflow))
	state = reducer(state, setWidgetValue('listId', 1, false))
	expect(state).toMatchSnapshot()
})

test('Sets invalid widget value in state', () => {
	let state = reducer(initialState, setWorkflow(workflow))
	state = reducer(
		state,
		setWidgetValue('listId', false, {
			code: 1,
			messageWidgetId: 'list_id-error',
		}),
	)

	expect(state).toMatchSnapshot()
})

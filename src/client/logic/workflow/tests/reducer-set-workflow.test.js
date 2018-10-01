import { setWorkflow } from '../actions'
import reducer, { initialState } from '../reducer'
import workflow from './data/workflow'

test('Populates state from workflow', () => {
	const state = reducer(initialState, setWorkflow(workflow))
	expect(state).toMatchSnapshot()
})

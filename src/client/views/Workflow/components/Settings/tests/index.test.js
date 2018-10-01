import React from 'react'
import renderer from 'react-test-renderer'
import { WithMutation } from '../index'
import { setWorkflowWidgetsGroup } from 'client/graphql/mutations'
import { MockedProvider } from 'react-apollo/test-utils'
import workflow from 'client/logic/workflow/tests/data/workflow'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mocks = [
	{
		request: {
			query: setWorkflowWidgetsGroup,
			variables: {
				workflow: { _id: workflow._id },
				widgetsValues: {
					appName: 'cn_mailchimp',
					values: {
						listId: 555,
					},
					groupIndex: 0,
				},
			},
		},
		result: {
			data: {
				setWorkflowWidgetsGroup: {
					...workflow,
					_id: 'result wf id',
				},
			},
		},
	},
]

test('should render an <span> tag', async () => {
	const mockStore = configureStore()
	const store = mockStore({
		Workflow: {
			workflow,
			widgetsValues: {
				listId: 555,
			},
		},
	})

	const setWorkflow = jest.fn()

	const component = renderer.create(
		<Provider store={store}>
			<MockedProvider mocks={mocks}>
				<WithMutation workflow={workflow} setWorkflow={setWorkflow} />
			</MockedProvider>
		</Provider>,
	)

	const button = component.root.findAllByType('button')
	// simulate click on first "Save" button
	button[0].props.onClick()

	await new Promise(resolve => setTimeout(resolve, 10))

	// setWorkflow should have been called once with response
	// to GraphQL mutation query
	expect(setWorkflow.mock.calls.length).toBe(1)
	expect(setWorkflow.mock.calls[0][0]._id).toBe('result wf id')
})

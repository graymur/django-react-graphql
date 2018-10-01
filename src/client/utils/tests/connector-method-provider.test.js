import React from 'react'
import connectorMethodProvider from '../connector-method-provider'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const TestComponentMultiple = ({ connectorsFetchedData }) => {
	return (
		<div className="someClass">
			{connectorsFetchedData &&
				connectorsFetchedData.map(x => <div key={x.method}>{x.result.url}</div>)}
		</div>
	)
}

const TestComponentSingle = ({ connectorDataLoading, connectorsFetchedData }) => {
	return connectorDataLoading || !connectorsFetchedData ? (
		<h1>Loading</h1>
	) : (
		<h1>{connectorsFetchedData.url}</h1>
	)
}

beforeAll(() => {
	window.fetch = jest.fn().mockImplementation((url, config) =>
		Promise.resolve({
			json: () => {
				return Promise.resolve({ url: url.replace('undefined', ''), config })
			},
		}),
	)
})

test('Fetches multiple methods and passed results as "connectorsFetchedData" array prop', async () => {
	const Component = connectorMethodProvider(
		TestComponentMultiple,
		({ connectionId }) => [
			{ method: 'cn_qbo.get_account_list' },
			{ method: 'cn_qbo.get_item_list' },
		],
	)

	const component = mount(<Component />)

	expect(component.find('.someClass').text()).toBe('')

	// wait for "fetch" call to be resolved and prop of
	// wrapped component populated
	await new Promise(resolve => setTimeout(resolve, 10))

	// for some reason enzyme won't search in children that changed after
	// some props change, but will return updated text. So text is used
	// to check if data "returned" from the server is actually rendered
	expect(component.find('.someClass').text()).toBe(
		'/api/connectors/apps/cn_qbo/run_method/get_account_list/api/connectors/apps/cn_qbo/run_method/get_item_list',
	)
})

test('Respects "returnDataOnly" options, passes only HTTP call result in "connectorsFetchedData" prop', async () => {
	const Component = connectorMethodProvider(
		TestComponentSingle,
		({ connectionId }) => [
			{ method: 'cn_qbo.get_account_list', params: { connection_id: connectionId } },
		],
		{ returnDataOnly: true },
	)

	const component = mount(<Component />)

	expect(component.find('h1').text()).toBe('Loading')

	// wait for "fetch" call to be resolved and prop of
	// wrapped component populated
	await new Promise(resolve => setTimeout(resolve, 10))

	expect(component.find('h1').text()).toBe(
		'/api/connectors/apps/cn_qbo/run_method/get_account_list?',
	)
})

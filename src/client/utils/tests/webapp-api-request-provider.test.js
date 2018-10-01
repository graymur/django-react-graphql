import React from 'react'
import webappApiRequestProvider from '../webapp-api-request-provider'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

beforeAll(() => {
	window.fetch = jest.fn().mockImplementation((url, config) =>
		Promise.resolve({
			json: () => {
				return Promise.resolve({ url: url.replace('undefined', ''), config })
			},
		}),
	)
})

test('Fetches data from HTTP request and send it to component via "apiCallResult" prop', async () => {
	class TestComponent extends React.Component {
		componentDidMount() {
			this.props.apiMethods.startWf()
		}

		render() {
			const { apiCallResult } = this.props
			return <div className="someClass">URL: {(apiCallResult || '').url}</div>
		}
	}

	const Component = webappApiRequestProvider(TestComponent)

	const component = mount(<Component />)

	expect(component.find('.someClass').text()).toBe('URL: ')

	// wait for "fetch" call to be resolved and prop of
	// wrapped component populated
	await new Promise(resolve => setTimeout(resolve, 10))

	expect(component.find('.someClass').text()).toBe(
		'URL: /api/connectors/workflows/undefined/start_now/',
	)
})

test('Respects "dontSetReactState" option', async () => {
	class TestComponentWOState extends React.Component {
		state = { apiCallFinished: false }

		componentDidMount() {
			this.props.apiMethods
				.request({
					url: '/some/api/endpoint',
					config: {},
					dontSetReactState: true,
				})
				.then(result => {
					this.setState({
						apiCallFinished: result.url,
					})
				})
		}

		render() {
			return (
				<div className="someClass">
					{this.state.apiCallFinished}
					{this.props.apiCallResult /* check that apiCallResult is not populated */}
				</div>
			)
		}
	}

	const Component = webappApiRequestProvider(TestComponentWOState)

	const component = mount(<Component />)

	expect(component.find('.someClass').text()).toBe('')

	// wait for "fetch" call to be resolved and prop of
	// wrapped component populated
	await new Promise(resolve => setTimeout(resolve, 10))

	expect(component.find('.someClass').text()).toBe('/some/api/endpoint')
})

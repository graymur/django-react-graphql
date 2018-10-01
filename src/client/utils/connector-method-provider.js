import React from 'react'
import fetchConnectorData from './fetch-connector-data'
import get from 'lodash/get'

/**
 * Poor man's deepCompare
 * @param newConfigs
 * @param oldConfigs
 * @returns {boolean}
 */
const configsAreSame = (newConfigs, oldConfigs) => {
	return JSON.stringify(newConfigs) === JSON.stringify(oldConfigs)
}

/**
 *
 * @param Component - consumer of connector methods call results
 * @param configGetter - function that accepts consumer's props and returns
 * connector method request options:
 *
 * class Consumer extends React.Component {
 *
 * }
 *
 * export default connectorMethodProvider(VisualMapping, props => ({
 * 			method: 'cn_dropbox.get_folders_list',
 * 			workflowId: props.workflow._id,
 * 			cacheKey: 'key under which results of a request will be cached. Use false to prevent caching'
 * 		})
 * )
 *
 * Object returned by configGetter function has one required field "method",
 * which has to be connector name and lambda name joined by comma:
 * {
 * 		method: "connector_name.lambda_name"
 * }
 * @param options:
 * {
 * 		returnDataOnly - returned only data fetched from the endpoint, not the array shaped like this:
 * 			[{
 * 				"method": "{method name}",
 * 				"result": "{result}"
 * 			}]
 * }
 */
export default (Component, configGetter, options = {}) => {
	let prevConfigs = []

	return class extends React.Component {
		state = { connectorDataLoading: false, connectorsFetchedData: undefined }

		getConfigs = () =>
			configGetter.constructor === Function
				? configGetter(this.props)
				: [configGetter]

		fetch(props = {}) {
			const configs = this.getConfigs()

			const promises = configs.map(config =>
				fetchConnectorData(config, props.invalidateCache),
			)

			this.setState({ connectorDataLoading: true })

			Promise.all(promises).then(result => {
				this.setState({
					connectorDataLoading: false,
					connectorsFetchedData: options.returnDataOnly
						? get(result, '[0].result')
						: result,
				})
			})
		}

		refetch = () => {
			this.fetch({ invalidateCache: true })
		}

		componentDidMount() {
			this.fetch()
		}

		/**
		 * If component receives new configs, we have to refetch data
		 * with new options
		 * TODO: refactor to be more reactive, use memoization
		 */
		componentDidUpdate() {
			const newConfigs = this.getConfigs()

			if (!configsAreSame(newConfigs, prevConfigs)) {
				this.fetch()
			}

			prevConfigs = newConfigs
		}

		render() {
			return (
				<Component
					{...this.props}
					{...this.state}
					refetchConnectorsData={this.refetch}
				/>
			)
		}
	}
}

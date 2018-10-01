import React from 'react'
import webappApiRequest from './webapp-api-request'

const defaultRequestConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
}

/**
 * HOC that provides methods to make HTTP requests to webapp API
 * @param Component
 */
export default Component =>
	class extends React.Component {
		state = { apiCallUnderWay: false, apiCallResult: undefined }

		constructor(props) {
			super(props)

			this.methods = {
				request: this.request,
				toggleWfActiveState: this.toggleWfActiveState,
				startWf: this.startWf,
				deleteWf: this.deleteWf,
				saveCronParams: this.saveCronParams,
				createConnection: this.createConnection,
				getCurrentUserConnections: this.getCurrentUserConnections,
			}
		}

		/**
		 * Make request to webapp's API, low-level method
		 * @param url
		 * @param config
		 * @param invalidateCache
		 * @param dontSetReactState
		 */
		request = ({
			url,
			config,
			invalidateCache = true,
			dontSetReactState = false,
		}) => {
			!dontSetReactState &&
				this.setState({ apiCallUnderWay: true, apiCallResult: undefined })

			return webappApiRequest(url, config, invalidateCache).then(
				result =>
					// return promise that resolves after state is updated
					new Promise((resolve, reject) => {
						dontSetReactState
							? resolve(result)
							: this.setState(
									{
										apiCallUnderWay: false,
										apiCallResult: result,
									},
									() => resolve(result),
							  )
					}),
				err =>
					!dontSetReactState &&
					this.setState({
						apiCallUnderWay: false,
						apiCallError: err,
					}),
			)
		}

		/**
		 * Toggle workflow active/paused.
		 * @param wfId
		 */
		toggleWfActiveState = wfId =>
			this.request({
				url: `/api/connectors/workflows/${wfId}/switch/`,
				config: defaultRequestConfig,
				invalidateCache: true,
			})

		/**
		 * Manually start workflow
		 * @param wfId
		 */
		startWf = wfId =>
			this.request({
				url: `/api/connectors/workflows/${wfId}/start_now/`,
				config: defaultRequestConfig,
				invalidateCache: true,
			})

		/**
		 * Manually delete workflow
		 * @param wfId
		 */
		deleteWf = wfId =>
			this.request({
				url: `/api/connectors/workflows/${wfId}/`,
				config: {
					...defaultRequestConfig,
					method: 'DELETE',
				},
				invalidateCache: true,
			})

		saveCronParams = (wfId, value, period) => {
			const payload = { [period]: Number(value) }
			const formData = new FormData()
			formData.append('type', 'schedule')
			formData.append('cron_params', JSON.stringify(payload))

			return this.request({
				url: `/connectors/workflows/${wfId}/params/`,
				config: {
					method: 'POST',
					body: formData,
				},
				invalidateCache: true,
			})
		}

		createConnection = ({ appName, values, workflowId }) => {
			const formData = new FormData()

			if (workflowId) {
				formData.append('workflow_id', workflowId)
			}

			Object.entries(values).forEach(([key, value]) => formData.append(key, value))

			return this.request({
				url: `/apps/${appName}/connect/`,
				config: {
					method: 'POST',
					body: formData,
				},
			})
		}

		getCurrentUserConnections = () => this.request({ url: '/api/users/auth/keys/' })

		render() {
			return <Component {...this.props} {...this.state} apiMethods={this.methods} />
		}
	}

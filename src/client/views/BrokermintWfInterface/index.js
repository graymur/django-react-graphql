import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/workflow/actions'
import * as selectors from 'client/logic/workflow/selectors'

import Loader from 'client/components/Loader'
import Interface from './components/Interface'
import { compose } from 'recompose'
import webappApiRequestProvider from 'client/utils/webapp-api-request-provider'
import * as urls from 'client/urls'

import './style.scss'
import 'client/views/Workflow/components/Settings/settings.scss'

export class BrokermintWfInterface extends React.Component {
	state = { saving: false }
	saveValues = config => {
		this.setState({ saving: true })
		this.props.apiMethods
			.request({
				url: '/api/connectors/workflows/brokermint',
				config: {
					method: 'POST',
					body: JSON.stringify(config),
					headers: {
						'Content-Type': 'application/json',
					},
				},
				dontSetReactState: true,
			})
			.then(result => {
				if (result._id) {
					window.location = `/workflows/${result.name}/${result._id}`
				} else {
					console.error('ERROR creating the workflow', result)
				}
			})
			.catch(err => {
				console.log('ERROR creating the workflow', err)
			})
			.finally(() => this.setState({ saving: false }))
	}

	componentDidMount() {
		this.props.apiMethods.getCurrentUserConnections()
	}

	render() {
		const loading = this.props.loading || !this.props.apiCallResult
		return loading ? (
			<Loader />
		) : (
			<Interface
				{...this.props}
				saveValues={this.saveValues}
				connections={this.props.apiCallResult}
				saving={this.state.saving}
			/>
		)
	}
}

export default compose(
	webappApiRequestProvider,
	connect(
		createStructuredSelector(selectors),
		actions,
	),
)(BrokermintWfInterface)

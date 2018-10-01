import React from 'react'
import classnames from 'classnames'
import webappApiRequestProvider from 'client/utils/webapp-api-request-provider'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/workflow/actions'
import * as selectors from 'client/logic/workflow/selectors'
import get from 'lodash/get'

export default Component => {
	if (!Component.getRedirectUrl && !Component.appName) {
		throw new Error(
			`Connection popup ${
				Component.name
			} has to have either "getRedirectUrl" or "appName" prop`,
		)
	}

	const wrappedComponent = class extends React.Component {
		state = {
			errors: {},
			inputValues: {},
			establishingConnection: false,
		}

		componentWillReceiveProps(newProps) {
			if (Component.getRedirectUrl && newProps.active !== this.props.active) {
				window.location = Component.getRedirectUrl(this.props)
			}
		}

		onInputChange = e => {
			this.setState({
				...this.state,
				errors: {},
				inputValues: {
					...this.state.inputValues,
					[e.target.name]: e.target.value,
				},
			})
		}

		onConnectClick = () => {
			this.setState({ establishingConnection: true })

			this.props.apiMethods
				.createConnection({
					appName: Component.appName,
					values: this.state.inputValues,
					workflowId: get(this.props, 'workflow._id'),
				})
				.then(result => {
					if (!result.id) {
						this.setState({
							establishingConnection: false,
							errors: result,
						})
					} else {
						this.setState({ establishingConnection: false })
						this.props.addConnectionAndSetActive(result)
						this.props.closePopup()
					}
				})
		}

		render() {
			if (Component.getRedirectUrl) {
				return null
			}

			const { establishingConnection, inputValues, errors } = this.state

			const className = classnames('modal', { _active: this.props.active })

			return (
				<div className={className} tabIndex="-1" role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header modal-border-orange">
								<span className="modal-title">
									{Component.title || `Connect to ${Component.name}`}
								</span>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-hidden="true"
									onClick={this.props.closePopup}
								>
									×
								</button>
							</div>
							<div className="modal-body">
								<Component
									{...this.props}
									errors={errors}
									inputValues={inputValues}
									onInputChange={this.onInputChange}
								/>
							</div>
							<div className="modal-footer">
								<a
									className="main-button _light"
									data-dismiss="modal"
									onClick={this.props.closePopup}
								>
									Cancel
								</a>
								<button
									className="main-button"
									disabled={establishingConnection}
									onClick={this.onConnectClick}
								>
									{establishingConnection ? 'Connecting...' : 'Connect'}
								</button>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}

	return connect(
		createStructuredSelector(selectors),
		actions,
	)(webappApiRequestProvider(wrappedComponent))
}

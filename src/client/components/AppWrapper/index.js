import React from 'react'
import webappApiRequestProvider from 'client/utils/webapp-api-request-provider'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/shared/actions'
import * as selectors from 'client/logic/shared/selectors'
import { compose } from 'recompose'
import webappApiRequest from 'client/utils/webapp-api-request'
import LoggedOut from 'client/components/LoggedOut'
import get from 'lodash/get'

const checkInterval = process.env.SPA_CHECK_SESSION_INTERVAL || 10000

export class AppWrapper extends React.Component {
	checkCurrentUserTimeout = null

	/**
	 * Check if current user has active backend session. Redux state is updated
	 * only if check result is different from previous check, so that we don't
	 * trigger render on every check request
	 */
	checkCurrentUser = () => {
		clearTimeout(this.checkCurrentUserTimeout)
		// send request to a special endpoint that returns object {id: user's id}
		// webappApiRequest('/users/auth/check/')
		webappApiRequest('/api/users/auth/check/')
			.then(user => {
				// if we receive response, but there's no user id on it
				// set "isLoggedIn" in redux state to false
				if (!user || !user.id) {
					this.props.setIsLoggedIn(false)
				}

				// if previous value of "isLoggedIn" in redux state was "false",
				// set it to true and display app normally
				if (!this.props.isLoggedIn && user.id) {
					this.props.setIsLoggedIn(true)
					// TODO: special screen for backend error
					this.props.setBackendError(null)
				}

				this.checkCurrentUserTimeout = setTimeout(
					this.checkCurrentUser,
					checkInterval,
				)
			})
			.catch(err => {
				if (get(err, 'response.status') === 403) {
					this.props.setIsLoggedIn(false)
				} else {
					this.props.setBackendError(err)
				}

				this.checkCurrentUserTimeout = setTimeout(
					this.checkCurrentUser,
					checkInterval,
				)
			})
		// .finally(
		// 	// enqueue next check in 3 seconds
		// 	() =>
		// 		(this.checkCurrentUserTimeout = setTimeout(this.checkCurrentUser, checkInterval)),
		// )
	}

	componentDidMount() {
		this.checkCurrentUser()
	}

	componentWillUnmount() {
		clearTimeout(this.checkCurrentUserTimeout)
	}

	render() {
		if (!this.props.isLoggedIn) {
			return <LoggedOut />
		}

		return this.props.children
	}
}

export default compose(
	withRouter,
	webappApiRequestProvider,
	connect(
		createStructuredSelector(selectors),
		actions,
	),
)(AppWrapper)

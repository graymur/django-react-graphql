import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TopLevelLogs from './component/TopLevelLogs'
import Loader from 'client/components/Loader/index'

import { graphql } from 'react-apollo'
import { logsQuery } from 'client/graphql/queries'
import networkStatuses from 'client/utils/react-apollo-network-statuses'

import './logs.scss'

export class Logs extends React.Component {
	static propTypes = {
		workflow: PropTypes.object,
		data: PropTypes.object,
	}

	renderList() {
		const { logs, refetch } = this.props.data

		if (!logs) {
			return null
		}

		// {() => refetch()} is have to used because refetch expects
		// a parameter and doesn't work if event object is passed
		return (
			<React.Fragment>
				<button onClick={() => refetch()}>Refresh</button>
				<TopLevelLogs logs={logs.items} />
			</React.Fragment>
		)
	}

	render() {
		const { logs, loading, networkStatus } = this.props.data

		// loading means that logs are being loaded for the first time
		const loadingInProgress = loading && networkStatus !== networkStatuses.refetch
		// networkStatus === 4 means refetch is on the way
		const updatingInProgress = networkStatus === networkStatuses.refetch

		const classNames = classnames(
			'logs',
			{ loading: loadingInProgress },
			{ _updating: updatingInProgress },
		)

		return (
			<div className={classNames}>
				{loadingInProgress ? <Loader /> : this.renderList()}
			</div>
		)
	}
}

export default graphql(logsQuery, {
	options: ownProps => ({
		variables: { triggerId: ownProps.workflow.config.global.trigger_id },
		notifyOnNetworkStatusChange: true,
	}),
})(Logs)

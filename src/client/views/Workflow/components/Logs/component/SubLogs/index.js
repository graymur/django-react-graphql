import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import get from 'lodash/get'
import Loader from 'client/components/Loader/index'
import LogsList from '../LogsList'

import { addMessagesIfEmpty, humanizeDate } from 'client/utils/logs'
import flow from 'lodash/flow'

import { graphql } from 'react-apollo'
import { subLogsQuery } from 'client/graphql/queries'

const prepareLogs = flow(
	addMessagesIfEmpty,
	humanizeDate,
)

export class SubLogs extends React.Component {
	static propTypes = {
		log: PropTypes.object,
	}

	renderList() {
		const { sublogs } = this.props.data
		return get(sublogs, 'items.length') ? (
			<LogsList
				logs={prepareLogs([...sublogs.items].reverse())}
				itemClassName="_sub"
			/>
		) : (
			this.renderNoSublogsMessage()
		)
	}

	renderNoSublogsMessage() {
		return <div className="logs__sublogs__empty">No additional info</div>
	}

	render() {
		const { loading, networkStatus } = this.props.data
		const trClassNames = classnames('logs__list__item', '_sublogs')

		// loading means that logs are being loaded for the first time
		const loadingInProgress = loading && networkStatus !== 4
		// networkStatus === 4 means refetch is on the way
		const updatingInProgress = networkStatus === 4

		const classNames = classnames(
			'logs__sublogs',
			{ loading: loadingInProgress },
			{ _updating: updatingInProgress },
		)

		return (
			<tr className={trClassNames}>
				<td colSpan={3}>
					<div className={classNames}>
						{loadingInProgress ? <Loader /> : this.renderList()}
					</div>
				</td>
			</tr>
		)
	}
}

export default graphql(subLogsQuery, {
	options: ownProps => ({
		variables: { triggerId: ownProps.triggerId, uid: ownProps.uid },
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'network-only',
	}),
})(SubLogs)

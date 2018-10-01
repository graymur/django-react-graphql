import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TopLevelLogsItem from '../TopLevelLogsItem'
import LogsList from '../LogsList'
import {
	joinTopLevelLogs,
	addMessagesIfEmpty,
	humanizeDate,
} from 'client/utils/logs'
import flow from 'lodash/flow'

const prepareLogs = flow(
	joinTopLevelLogs,
	addMessagesIfEmpty,
	humanizeDate,
)

export default class TopLevelLogs extends React.Component {
	static propTypes = {
		logs: PropTypes.array,
	}

	renderList() {
		const { logs } = this.props

		return (
			<LogsList
				renderHeader={true}
				component={TopLevelLogsItem}
				logs={prepareLogs(logs)}
				itemClassName="_top"
			/>
		)
	}

	renderEmptyMessage() {
		return <h4 className="logs__empty">There are no logs yet</h4>
	}

	render() {
		const { logs } = this.props
		const classNames = classnames('logs__list')

		return (
			<div className={classNames}>
				{logs.length ? this.renderList() : this.renderEmptyMessage()}
			</div>
		)
	}
}

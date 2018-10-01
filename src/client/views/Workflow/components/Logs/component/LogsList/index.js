import React from 'react'
import PropTypes from 'prop-types'
import LogsItem from '../LogsItem'

export default class LogsList extends React.Component {
	static propTypes = {
		logs: PropTypes.array,
		renderHeader: PropTypes.bool,
		component: PropTypes.func,
		itemClassName: PropTypes.string,
	}

	renderHeader() {
		return (
			<thead>
				<tr>
					<th>Time</th>
					<th>Event</th>
					<th>Status</th>
				</tr>
			</thead>
		)
	}

	render() {
		const { logs, renderHeader, itemClassName } = this.props
		const ItemComponent = this.props.component || LogsItem

		return (
			<table>
				{renderHeader && this.renderHeader()}
				<tbody>
					{logs.map(log => (
						<ItemComponent className={itemClassName} key={log._id} log={log} />
					))}
				</tbody>
			</table>
		)
	}
}

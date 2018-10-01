import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import DeleteButton from './components/DeleteButton'
import * as urls from 'client/urls'

import './nav.scss'

export default class Nav extends React.Component {
	static propTypes = {
		workflow: PropTypes.object.isRequired,
	}

	render() {
		const { name, _id } = this.props.workflow

		return (
			<nav className="workflow__nav">
				<NavLink
					exact={true}
					className="workflow__nav__item"
					to={urls.workflowConnections(name, _id)}
				>
					<span>Connections</span>
				</NavLink>
				<NavLink
					className="workflow__nav__item"
					to={urls.workflowSettings(name, _id)}
				>
					<span>Settings</span>
				</NavLink>
				<NavLink className="workflow__nav__item" to={urls.workflowLogs(name, _id)}>
					<span>Logs</span>
				</NavLink>
				<DeleteButton workflow={this.props.workflow} />
			</nav>
		)
	}
}

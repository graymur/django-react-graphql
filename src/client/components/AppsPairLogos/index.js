import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
// import * as urls from 'client/urls'
import AppLogo from 'client/components/AppLogo/index'

import './apps.scss'

const appNameToUrl = app => app.full_name.replace(' ', '_').toLowerCase()

export default class Apps extends React.PureComponent {
	static propTypes = {
		apps: PropTypes.array,
	}

	isConnected = app => {
		return true
	}

	render() {
		const [app1, app2] = this.props.apps

		// return (
		// 	<div className="apps-pair">
		// 		{/*<Link to={urls.app(app1.name)} className="apps-pair__left">*/}
		// 		<a href={`/apps/${appNameToUrl(app1)}`} className="apps-pair__left">
		// 			<AppLogo app={app1} connected={this.isConnected(app1)} />
		// 		</a>
		// 		<span className="apps-pair__plus">+</span>
		// 		{/*<Link to={urls.app(app2.name)} className="apps-pair__right">*/}
		// 		<a href={`/apps/${appNameToUrl(app2)}`} className="apps-pair__right">
		// 			<AppLogo app={app2} connected={this.isConnected(app2)} />
		// 		</a>
		// 	</div>
		// )

		return (
			<a
				className="apps-pair"
				href={`/apps/${appNameToUrl(app1)}/${appNameToUrl(app2)}`}
			>
				<AppLogo app={app1} connected={this.isConnected(app1)} />
				<span className="apps-pair__plus">+</span>
				<AppLogo app={app2} connected={this.isConnected(app2)} />
			</a>
		)
	}
}

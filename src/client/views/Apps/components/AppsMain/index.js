import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import getPageTitle from 'client/utils/get-page-title'
import classnames from 'classnames'
import Loader from 'client/components/Loader'
import { Link } from 'react-router-dom'
import './apps.scss'

export default class AppsMain extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		apps: PropTypes.array,
	}

	renderApps() {
		return (
			<nav className="apps__list">
				{(this.props.apps || []).map(app => (
					<Link
						key={app.name}
						className="apps__list__item"
						to={`${process.env.SPA_URL_BASE}/apps/${app.name}`}
					>
						{app.full_name}
					</Link>
				))}
			</nav>
		)
	}

	render() {
		const { loading } = this.props
		const classNames = classnames('apps__container', { loading: loading })

		return (
			<div className="apps">
				<Helmet>
					<title>{getPageTitle('Apps')}</title>
				</Helmet>
				<h1 className="apps__title">Apps List</h1>
				<div className={classNames}>{loading ? <Loader /> : this.renderApps()}</div>
			</div>
		)
	}
}

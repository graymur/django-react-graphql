import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import getPageTitle from 'client/utils/get-page-title'
import Loader from 'client/components/Loader'
import classnames from 'classnames'
import './app.scss'

export default class AppMain extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		app: PropTypes.object,
	}

	renderApp() {
		const { app } = this.props

		if (!app) {
			return null
		}

		return (
			<div className="app">
				<Helmet>
					<title>{getPageTitle(app.full_name)}</title>
				</Helmet>
				<h1>
					{app.full_name} ({app.name})
				</h1>
				<p dangerouslySetInnerHTML={createMarkup(app.full_name)} />
			</div>
		)
	}

	render() {
		const { loading } = this.props
		const classNames = classnames('app', { loading })

		return (
			<div className={classNames}>{loading ? <Loader /> : this.renderApp()}</div>
		)
	}
}

function createMarkup(__html) {
	return { __html }
}

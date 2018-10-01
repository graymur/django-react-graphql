import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import Loader from 'client/components/Loader'
import getPageTitle from 'client/utils/get-page-title'
import classnames from 'classnames'
import './workflows.scss'
import * as urls from 'client/urls'

export class WorkflowsMain extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		workflows: PropTypes.array,
	}

	renderWorkflows() {
		return (
			<nav className="workflows__list">
				{(this.props.workflows || []).map(workflow => (
					<Link
						key={workflow._id}
						className="workflows__list__item"
						to={urls.workflow(workflow.name, workflow._id)}
					>
						{workflow.short_description}
					</Link>
				))}
			</nav>
		)
	}

	render() {
		const { loading } = this.props
		const classNames = classnames('workflows__container', { loading: loading })

		return (
			<div className="workflows">
				<Helmet>
					<title>{getPageTitle('Workflows')}</title>
				</Helmet>
				<h1 className="workflows__title">Workflows List</h1>
				<div className={classNames}>
					{loading ? <Loader /> : this.renderWorkflows()}
				</div>
			</div>
		)
	}
}

export default WorkflowsMain

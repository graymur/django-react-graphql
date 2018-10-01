import React from 'react'
import Helmet from 'react-helmet'
import getPageTitle from 'client/utils/get-page-title'
import classnames from 'classnames'

import Loader from 'client/components/Loader/index'
import Apps from 'client/components/AppsPairLogos'
import Nav from '../Nav'
import Info from '../Info'
import Controls from '../Controls'

import Routes from './routes'

import './workflow.scss'

export const Workflow = props => {
	const { workflow } = props

	if (!workflow) {
		return null
	}

	const active = workflow.status === 'active'

	const className = classnames('workflow', {
		_active: active,
		_inactive: !active,
	})

	return (
		<div className={className}>
			<Helmet>
				<title>{getPageTitle(workflow.short_description)}</title>
			</Helmet>
			<Apps apps={workflow.apps} />
			<Info workflow={workflow} />
			<Controls />
			<Nav workflow={workflow} />
			<div className="workflow__content">
				<Routes {...props} />
			</div>
		</div>
	)
}

export default props => {
	const { loading } = props
	const classNames = classnames('workflow', { loading })

	return (
		<div className={classNames}>
			{loading ? <Loader /> : <Workflow {...props} />}
		</div>
	)
}

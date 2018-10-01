import React from 'react'

import WebappApiRequestProvider from 'client/utils/webapp-api-request-provider'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/workflow/actions'
import * as selectors from 'client/logic/workflow/selectors'
import SmallModalMessage from 'client/components/SmallModalMessage'
import Scheduler from './components/Scheduler'

import classnames from 'classnames'

import './controls.scss'

export const Controls = props => {
	const {
		workflow,
		apiMethods,
		apiCallUnderWay,
		apiCallResult,
		setWorkflowActiveState,
		validationErrors,
	} = props

	// make request to webapp's API to toggle workflow active
	// upon receiving result setWorkflowActiveState callback will
	// be called, updating redux state
	const switchWf = () =>
		apiMethods.toggleWfActiveState(workflow._id).then(setWorkflowActiveState)

	const startWf = () => apiMethods.startWf(workflow._id)

	const classNames = classnames('workflow__controls', {
		_loading: apiCallUnderWay,
		_invalid: Boolean(validationErrors),
	})

	return (
		<React.Fragment>
			<div className={classNames}>
				<span className="workflow__toggle _pause" onClick={switchWf}>
					<span className="workflow__toggle__title">Pause</span>
				</span>
				<span className="workflow__toggle _start" onClick={switchWf}>
					<span className="workflow__toggle__title">Start</span>
				</span>
				<span className="workflow__controls__not-valid">
					Please, configure the workflow before starting it
				</span>
				<button className="workflow__run-now" onClick={startWf}>
					Run now
				</button>
				<Scheduler />
				{apiCallResult &&
					apiCallResult.is_enable && (
						<SmallModalMessage text="Workflow was started" />
					)}
			</div>
		</React.Fragment>
	)
}

export default connect(
	createStructuredSelector(selectors),
	actions,
)(WebappApiRequestProvider(Controls))

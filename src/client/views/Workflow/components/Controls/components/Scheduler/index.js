import React from 'react'

import WebappApiRequestProvider from 'client/utils/webapp-api-request-provider'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/workflow/actions'
import * as selectors from 'client/logic/workflow/selectors'
import SmallModalMessage from 'client/components/SmallModalMessage'

import toPairs from 'lodash/toPairs'
import get from 'lodash/get'

import classnames from 'classnames'

import './style.scss'

const defaultCronParams = {
	minutes: 10,
}

class Scheduler extends React.Component {
	constructor(props) {
		super(props)

		// get initial values from workflow's config or default params
		const [initialPeriod, initialValue] = toPairs(
			get(this.props, 'workflow.cron_params', defaultCronParams),
		)[0]

		this.state = {
			value: initialValue,
			period: initialPeriod,
		}
	}

	handleChange = e => {
		const newState = {
			...this.state,
			[e.target.name]: e.target.value,
		}

		// minimum frequency for scheduler should me 5 minutes, check if it's not less
		if (newState.value < 5 && newState.period === 'minutes') {
			newState.value = 5
		}

		this.setState(newState)
	}

	handleSaveClick = e => {
		const { apiMethods, workflow } = this.props
		const { value, period, isDirty } = this.state
		apiMethods.saveCronParams(workflow._id, value, period)
	}

	componentDidUpdate(prevProps) {
		const { apiCallResult, setWorkflowCronParams, workflow } = this.props

		// if params were updated via HTTP request, update redux state with new values
		if (!prevProps.apiCallResult && apiCallResult && apiCallResult.workflow_ready) {
			const { value, period } = this.state
			setWorkflowCronParams({ [period]: value })
		}
	}

	render() {
		const { workflow, apiMethods, apiCallUnderWay, apiCallResult } = this.props
		const { value, period } = this.state

		if (!workflow.cron_params) {
			return null
		}

		const [currentPediod, currentValue] = toPairs(workflow.cron_params)[0]
		const isDirty =
			String(value) !== String(currentValue) || period !== currentPediod

		const classNames = classnames('sheduler', {
			_dirty: isDirty,
			_loading: apiCallUnderWay,
		})

		return (
			<div className={classNames}>
				<div className="sheduler__text-before">Run every:</div>
				<input
					onChange={this.handleChange}
					type="number"
					className="sheduler__value"
					name="value"
					value={value}
					min="1"
					max="99"
					maxLength="2"
				/>
				<select
					onChange={this.handleChange}
					className="sheduler__period"
					name="period"
					value={period}
				>
					<option value="minutes">Minutes</option>
					<option value="hours">Hours</option>
					<option value="days">Days</option>
				</select>
				{isDirty && (
					<button onClick={this.handleSaveClick} className="sheduler__save" href="">
						Change
					</button>
				)}
				{apiCallResult &&
					apiCallResult.workflow_ready && (
						<SmallModalMessage text="Schedule was updated" />
					)}
			</div>
		)
	}
}

export default connect(
	createStructuredSelector(selectors),
	actions,
)(WebappApiRequestProvider(Scheduler))

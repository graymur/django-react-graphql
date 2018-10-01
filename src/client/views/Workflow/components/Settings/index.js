import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Group from './components/Group'

import MutationError from 'client/components/MutationError'
import { Mutation } from 'react-apollo'
import dumpMutationState from 'client/utils/dump-mutation-state'
import { setWorkflowWidgetsGroup } from 'client/graphql/mutations'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/workflow/actions'
import * as selectors from 'client/logic/workflow/selectors'

import './settings.scss'

export class Settings extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		workflow: PropTypes.object,
	}

	onSave = values => {
		this.props.onSave(values)
	}

	renderGroups() {
		const { configuration } = this.props.workflow

		return (
			<div className="workflow-settings__groups">
				{configuration.map((group, index) => (
					<Group
						{...group}
						key={index}
						groupIndex={index}
						workflow={this.props.workflow}
						onSave={this.onSave}
						saving={this.props.saving}
					/>
				))}
			</div>
		)
	}

	render() {
		const { workflow, mutating } = this.props
		const classNames = classnames('workflow-settings')

		return (
			<div className={classNames} style={{ minHeight: '40rem' }}>
				<h4 className="workflow__connections__title">Configuration</h4>
				{this.renderGroups()}
			</div>
		)
	}
}

/**
 * TODO: pass saving indicator to each group individually without adding
 * mutation logic to each Group component
 * Separate GraphQL request logic from presentational Settings component
 * for cleaner code and easier testing
 */
export class WithMutation extends React.Component {
	executeMutation = setWorkflowWidgetsGroup => data => {
		const workflow = { _id: this.props.workflow._id }
		console.log(JSON.stringify(data, null, 4))
		setWorkflowWidgetsGroup({ variables: { workflow, widgetsValues: data } })
	}

	render() {
		return (
			<Mutation
				mutation={setWorkflowWidgetsGroup}
				update={(cache, { data }) =>
					this.props.setWorkflow(data.setWorkflowWidgetsGroup)
				}
			>
				{(setWorkflowWidgetsGroup, props) => (
					<React.Fragment>
						<Settings
							{...this.props}
							saving={props.loading}
							onSave={this.executeMutation(setWorkflowWidgetsGroup)}
						/>
						<MutationError error={props.error} />
						{dumpMutationState(props, 'SETTINGS MUTATION')}
					</React.Fragment>
				)}
			</Mutation>
		)
	}
}

export default connect(
	createStructuredSelector(selectors),
	actions,
)(WithMutation)

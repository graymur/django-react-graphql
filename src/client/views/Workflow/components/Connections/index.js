import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import App from './components/App'
import MutationError from 'client/components/MutationError'
import { Mutation } from 'react-apollo'
import dumpMutationState from 'client/utils/dump-mutation-state'
import { saveWorkflowConnections } from 'client/graphql/mutations'
import get from 'lodash/get'
import map from 'lodash/map'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/workflow/actions'
import * as selectors from 'client/logic/workflow/selectors'

import './connections.scss'

export class Connections extends React.PureComponent {
	state = {}

	static propTypes = {
		loading: PropTypes.bool,
		workflow: PropTypes.object,
	}

	componentDidMount() {
		const { workflow } = this.props
		this.setState(
			workflow.connections.reduce(
				(acc, appName) => ({
					...acc,
					[appName]: get(workflow, `config[${appName}].connect_id`),
				}),
				{},
			),
		)
	}

	setConnection = (app, connectionId) => {
		this.setState({
			...this.state,
			[app.name]: connectionId,
		})
	}

	onSave = e => {
		e.preventDefault()
		this.props.save(this.state)
	}

	render() {
		const { workflow, loading } = this.props

		const classNames = classnames('workflow__connections')

		return (
			<div className={classNames}>
				<h4 className="workflow__connections__title">Connect your apps</h4>
				<div className="workflow__connections__list">
					{workflow.apps.map(app => (
						<App
							workflow={workflow}
							app={app}
							key={app.name}
							setConnection={this.setConnection}
						/>
					))}
				</div>

				<React.Fragment>
					<div className="workflow__connections__controls">
						<button disabled={loading} className="main-button" onClick={this.onSave}>
							Save
						</button>
					</div>
				</React.Fragment>
			</div>
		)
	}
}

class WithMutation extends React.Component {
	executeMutation = saveConnections => connectionsByName => {
		const connections = map(connectionsByName, (_id, name) => ({
			_id,
			name,
		})).filter(x => x._id)

		if (!connections.length) {
			return false
		}

		const workflow = { _id: this.props.workflow._id }
		saveConnections({ variables: { workflow, connections } })
	}

	render() {
		return (
			<Mutation
				mutation={saveWorkflowConnections}
				update={(cache, { data }) =>
					this.props.setWorkflow(data.saveWorkflowConnections)
				}
			>
				{(saveConnections, props) => (
					<React.Fragment>
						<Connections
							workflow={this.props.workflow}
							loading={props.loading}
							save={this.executeMutation(saveConnections)}
						/>
						<MutationError error={props.error} />
						{dumpMutationState(props, 'CONNECTIONS MUTATION')}
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

import React from 'react'

import MutationError from 'client/components/MutationError'
import { Mutation } from 'react-apollo'
import dumpMutationState from 'client/utils/dump-mutation-state'
import { createDynamicWorkflow } from 'client/graphql/mutations'
import SimpleWorkflowsIndexMain from '../SimpleWorkflowsIndexMain'
import pick from 'lodash/pick'
import * as urls from 'client/urls'
import { withRouter } from 'react-router-dom'

const pickFields = app => pick(app, ['name', 'entity'])

class WithMutation extends React.Component {
	creating = 0

	executeMutation = createDynamicWorkflow => ({ id, apps }) => {
		this.creating = id
		createDynamicWorkflow({
			variables: {
				from: pickFields(apps[0]),
				to: pickFields(apps[1]),
			},
		})
	}

	render() {
		return (
			<Mutation
				mutation={createDynamicWorkflow}
				update={(cache, { data: { createDynamicWorkflow: workflow } }) =>
					this.props.history.push(urls.workflow(workflow.name, workflow._id))
				}
			>
				{(createDynamicWorkflow, props) => (
					<React.Fragment>
						<SimpleWorkflowsIndexMain
							{...this.props}
							creating={props.loading ? this.creating : null}
							create={this.executeMutation(createDynamicWorkflow)}
						/>
						<MutationError error={props.error} />
						{dumpMutationState(props, 'SIMPLE WF MUTATION')}
					</React.Fragment>
				)}
			</Mutation>
		)
	}
}

export default withRouter(WithMutation)

import React from 'react'
import WorkflowsMain from './components/WorkflowsMain'
import { graphql } from 'react-apollo'
import { workflowsQuery } from 'client/graphql/queries'

export class Workflows extends React.Component {
	render() {
		return <WorkflowsMain {...this.props.data} />
	}
}

export default graphql(workflowsQuery)(Workflows)

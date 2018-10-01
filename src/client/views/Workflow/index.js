import React from 'react'
import WorkflowMain from './components/WorkflowMain'
import { graphql } from 'react-apollo'
import { workflowQuery } from 'client/graphql/queries'
// import { withRouter } from 'react-router-dom'

import get from 'lodash/get'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/workflow/actions'
import * as selectors from 'client/logic/workflow/selectors'
import { compose } from 'recompose'

export class Workflow extends React.Component {
	componentWillReceiveProps(nextProps) {
		// send incoming workflow to redux state
		if (get(nextProps, 'data.workflow._id') !== get(this.props, 'workflow._id')) {
			nextProps.data.workflow && this.props.setWorkflow(nextProps.data.workflow)
		}
	}

	render() {
		const { loading } = this.props.data

		return <WorkflowMain loading={loading} {...this.props} />
	}
}

export default compose(
	// withRouter,
	graphql(workflowQuery, {
		options: ownProps => ({
			variables: {
				name: ownProps.match.params.workflowName,
				id: ownProps.match.params.workflowId,
			},
		}),
	}),
	connect(
		createStructuredSelector(selectors),
		actions,
		undefined, // placeholder for "mergeProps" arg
		// https://github.com/reduxjs/react-redux/blob/master/docs/api.md#arguments
		// "pure" option for some reason prevents component from receiving new state
		// from graphql query when user opens one workflow and then another in the same
		// browser tab
		{ pure: false },
	),
)(Workflow)

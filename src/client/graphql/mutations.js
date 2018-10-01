import gql from 'graphql-tag'

const workflowFields = `
_id
status
name
short_description
full_description
cron_params
connections
about
configuration
config
workflow
saved_params
apps {
	name
	full_name
}
connectionObjects {
	_id
	full_name
	name
	label
}
`

export const saveWorkflowConnections = gql`
	mutation saveWorkflowConnections(
		$workflow: WorkflowInput!
		$connections: [ConnectionInput]
	) {
		saveWorkflowConnections(workflow: $workflow, connections: $connections) {
            ${workflowFields}
		}
	}
`

export const setWorkflowActiveState = gql`
	mutation setWorkflowActiveState(
		$workflow: WorkflowInput!
		$active: Boolean
	) {
        setWorkflowActiveState(workflow: $workflow, active: $active) {
            ${workflowFields}
		}
	}
`

export const setWorkflowWidgetsGroup = gql`
	mutation setWorkflowWidgetsGroup(
		$workflow: WorkflowInput!
		$widgetsValues: WidgetsValuesInput
	) {
        setWorkflowWidgetsGroup(workflow: $workflow, widgetsValues: $widgetsValues) {
            ${workflowFields}
		}
	}
`

export const createDynamicWorkflow = gql`
	mutation createDynamicWorkflow(
		$from: DynamicWorkflowAppInput!
		$to: DynamicWorkflowAppInput!
	) {
        createDynamicWorkflow(from: $from, to: $to) {
            ${workflowFields}
		}
	}
`

export const saveBIValues = gql`
	mutation saveBIValues($values: BIValuesInput!) {
		saveBIValues(values: $values) {
			_id
			values
		}
	}
`

import { createAction } from 'redux-actions'

export const setWorkflow = createAction(`Workflow.workflow`, workflow => workflow)

export const setWorkflowActiveState = createAction(
	`Workflow.activeState`,
	activeState => activeState,
)

export const setWorkflowCronParams = createAction(
	`Workflow.cronParams`,
	cronParams => cronParams,
)

export const addSettingsGroupWorkflow = createAction(
	`Workflow.group`,
	group => group,
)

export const addConnection = createAction(
	`Workflow.addConnection`,
	connection => connection,
)

export const addConnectionAndSetActive = createAction(
	`Workflow.addConnectionAndSetActive`,
	connection => connection,
)

export const setWidgetValue = createAction(
	`Workflow.setWidgetValue`,
	(name, value, validationErrors) => ({ name, value, validationErrors }),
)

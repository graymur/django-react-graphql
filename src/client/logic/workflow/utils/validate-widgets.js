import getWorkflowWidgets from './get-workflow-widgets'
import getWidgetsValuesFromWorkflow from './get-widgets-values-from-workflow'
import validateWidgetValue from './validate-widget-value'

export default (workflow, widgetsValues) => {
	widgetsValues = widgetsValues || getWidgetsValuesFromWorkflow(workflow)
	return getWorkflowWidgets(workflow).reduce(
		(acc, widget) => ({
			...acc,
			[widget.name]: validateWidgetValue(
				widgetsValues[widget.name],
				widget.validation,
			),
		}),
		{},
	)
}

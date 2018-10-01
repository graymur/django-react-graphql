import memoize from 'lodash/memoize'
import get from 'lodash/get'
import getWorkflowWidgets from './get-workflow-widgets'

export default memoize(workflow => {
	return getWorkflowWidgets(workflow).reduce(
		(acc, widget) => ({
			...acc,
			[widget.name]:
				get(workflow, `saved_params.${widget.app}.${widget.name}`) || widget.value,
		}),
		{},
	)
})

import get from 'lodash/get'
import validateWidgets from './validate-widgets'

export default workflow => {
	const { config, connections, configuration, saved_params } = workflow
	const [fromApp, toApp] = connections

	const errors = {}

	// check if both connections are saved in workflow's config
	if (
		!get(config, `[${fromApp}].connect_id`) ||
		!get(config, `[${toApp}].connect_id`)
	) {
		errors.connections = true
	}

	// get list of all widgets, filter those without "name" field (they don't hold values),
	// get stored values and validate them
	const widgetsErrors = validateWidgets(workflow)

	if (widgetsErrors.length > 0) {
		errors.widgets = widgetsErrors
	}

	if (errors.connections || errors.widgets) {
		console.log('Validation errors', errors)
	}

	return Object.keys(errors).length ? errors : undefined
}

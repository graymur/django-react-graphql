import flatten from 'lodash/flatten'
import findValidationConfigForWidget from './find-validation-config-for-widget'

export default workflow =>
	flatten(
		workflow.configuration.map(group =>
			group.widgets.filter(x => x.name).map(x => ({
				...x,
				app: group.app,
				validation: findValidationConfigForWidget(x, group.validations),
			})),
		),
	)

import get from 'lodash/get'

export default (value, validationConfig = {}, widgetId) => {
	const { type } = validationConfig

	if (!type) {
		return
	}

	return validators[type] && validators[type](value, validationConfig)
}

const ERROR_CODES = {
	validation: {
		required: 1,
	},
}

/**
 * Collection of validator functions by type. Each validator returns object of shape:
 * {
 * 		"code": {error code},
 * 		"messageWidgetId": {id of widget that contains error message for this widget and should be displayed}
 * }
 * @type {object}
 */
const validators = {
	required: (value, validationConfig) =>
		!value && {
			code: ERROR_CODES.validation.required,
			// we need to remove '#' sign from "message" field, because historically
			// it contained fully-qualified CSS selector used by jQuery
			messageWidgetId: get(validationConfig, 'message', '').replace('#', ''),
		},
}

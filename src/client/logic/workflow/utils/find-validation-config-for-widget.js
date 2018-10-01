import get from 'lodash/get'

/**
 * Validation config have weird existing format, which can be one of two:
 *
 *
 {
	"type": "required",
	"with": [
		"payee_account"
	],
	"message": "#payee_account-error"
  }
 *
 * or
 *
 {
	 "type": "json",
	 "field": "workflow",
	 "message": "#workflow-error"
 }
 *
 * Where "field" or "with[0]" equals to widget's ID field
 *
 * @param widget
 * @param validationConfigs Array
 * @returns {T}
 */
export default (widget, validationConfigs) => {
	const { id } = widget
	return (validationConfigs || []).find(
		x => x.field === id || get(x, 'with[0]') === id,
	)
}

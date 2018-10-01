import get from 'lodash/get'

export default (mapping, config) => {
	const requiredFields = getRequiredFields(config.apps[1].fields)
	const errors = {}

	const emptyRequiredFields = requiredFields.filter(
		x => !mapping.find(y => x._id === y.to),
	)

	if (emptyRequiredFields.length) {
		errors.emptyRequiredFields = emptyRequiredFields
	}

	return Object.keys(errors).length ? errors : undefined
}

const getRequiredFields = fields =>
	fields.filter(x => get(x, 'constraints.required'))

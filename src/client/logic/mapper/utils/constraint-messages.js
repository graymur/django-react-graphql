import get from 'lodash/get'
import partialRight from 'lodash/partialRight'

export const getConstraintValue = (field, constraint) =>
	get(field, `constraints.${constraint}`)
export const getMaxLength = partialRight(getConstraintValue, 'maxLength')
export const getMinLength = partialRight(getConstraintValue, 'minLength')

export const messagesTemplates = {
	maxLengthRightOnly: (fromField, toField) =>
		`${toField.appName}'s ${toField.title} has max length of ${getMaxLength(
			toField,
		)}. We will truncate if longer value comes in`,
	maxLengthRightLess: (fromField, toField) =>
		`${toField.appName}'s ${toField.title} has max length of ${getMaxLength(
			toField,
		)}, while ${fromField.appName} has ${getMaxLength(
			fromField,
		)}. We will truncate if longer value comes in`,
	minLengthRight: (fromField, toField) =>
		`${toField.appName}'s ${toField.title} has min length of ${getMinLength(
			toField,
		)}. Integration may fail is shorter value comes in`,
}

export default function getConstraintsMessages(fromField, toField) {
	return [maxLengthMessage, minLengthMessage].reduce(
		(acc, method) => [...acc, method(fromField, toField)],
		[],
	)
}

export function maxLengthMessage(fromField, toField) {
	const fromMaxLength = getMaxLength(fromField)
	const toMaxLength = getMaxLength(toField)

	if (!toMaxLength || toMaxLength >= fromMaxLength) {
		return false
	}

	if (!fromMaxLength && toMaxLength) {
		return messagesTemplates.maxLengthRightOnly(fromField, toField)
	}

	if (fromMaxLength > toMaxLength) {
		return messagesTemplates.maxLengthRightLess(fromField, toField)
	}
}

export function minLengthMessage(fromField, toField) {
	const leftMinLength = getMinLength(fromField)
	const rightMinLength = getMinLength(toField)

	if (!rightMinLength || fromField === toField) {
		return false
	}

	if (rightMinLength) {
		return messagesTemplates.minLengthRight(fromField, toField)
	}
}

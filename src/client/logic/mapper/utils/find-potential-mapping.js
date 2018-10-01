const mapping = {
	string: '*',
	number: ['number', 'float'],
	email: ['email'],
	url: ['url'],
	float: ['float'],
}

export const getFieldType = field => field.type || 'string'

/**
 * @param sourceType Type of a source field
 * @param targetType Type of a target field
 * @param strict Allow sourceType to be matched to '*' type. For example:
 * 		If sourceField is an "email" left field, it to be mapped to
 * 		"email" field on the right, but also to any "string" field on the right.
 * 		If the sourceField is an "email" right field, we want only "email"
 * 		field on the left to be highlighted, otherwise "string" -> "email" mapping
 * 		can be created.
 * @returns {boolean}
 */
export const isPotentialMapping = (sourceType, targetType, strict = false) => {
	if (!mapping[sourceType]) {
		throw new Error(`Unknown source type: ${sourceType}`)
	}

	if (!mapping[targetType]) {
		throw new Error(`Unknown target type: ${targetType}`)
	}

	// if strict = true and both fields have same type, return true
	if (strict && sourceType === targetType) {
		return true
	}

	// if strict = false and targetType is "string", return true - any
	// field can be mapped to a string
	if (!strict && mapping[targetType] === '*') {
		return true
	}

	// othewise use a map table to find if source type can be mapped to target
	return mapping[targetType].includes(sourceType)
}

export default function findPotentialMappings(sourceField, targetFields) {
	const sourceType = getFieldType(sourceField)
	const strict = sourceField.__type === 'right'
	return targetFields.filter(targetField =>
		isPotentialMapping(sourceType, getFieldType(targetField), strict),
	)
}

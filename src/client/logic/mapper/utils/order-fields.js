export const addMappedTo = (fields, sources, targets) => {
	return fields.map(field => {
		const index = sources.indexOf(field._id)
		return index > -1
			? { ...field, mappedTo: targets[index], isMapped: true }
			: { ...field, isMapped: false }
	})
}

/**
 * Put mapped fields to the start of array
 * @param fields
 * @param mapping
 * @returns {[*,*]}
 */
export const orderFromFields = (fields, mapping) => {
	const withMappedData = addMappedTo(
		fields,
		mapping.map(x => x.from),
		mapping.map(x => x.to),
	)

	return [
		...withMappedData.filter(x => x.isMapped),
		...withMappedData.filter(x => !x.isMapped),
	]
}

/**
 * Put mapped fields to the start of array, but according to the order of left field,
 * since mapped fields have to be on the same level
 * @param toFields
 * @param fromFields
 * @param mapping
 * @returns {[*,*]}
 */
export const orderToFields = (toFields, fromFields, mapping) => {
	const withMappedData = addMappedTo(
		toFields,
		mapping.map(x => x.to),
		mapping.map(x => x.from),
	)

	const mappedFromFields = fromFields.filter(x => x.isMapped)

	const mappedToFields = mappedFromFields.map(fromField =>
		withMappedData.find(x => x._id === fromField.mappedTo),
	)

	return [...mappedToFields, ...withMappedData.filter(x => !x.isMapped)]
}

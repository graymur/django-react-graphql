import createMappingObject from '../create-mapping-object'
import get from 'lodash/get'

/**
 * Create auto mapping based on "autoMapping" config of each field.
 * Go over each field in "fromFields" array, find a field in "toFields"
 * array that has matching "autoMapping.name", for example:
 * From field: { "title": "First name", "autoMapping": { "name": "firstName"} }
 * will match
 * To fields: { "title": "Given name", "autoMapping": { "name": "firstName"} }
 *
 * TODO: accept "autoMapping.name" array
 *
 * @param fromFields
 * @param toFields
 */
export default (fromFields, toFields) =>
	fromFields.reduce((acc, fromField) => {
		const value = get(fromField, 'autoMapping.name')

		if (!value) return acc

		const toField = toFields.find(x => get(x, 'autoMapping.name') === value)

		if (toField) {
			acc.push(createMappingObject(fromField, toField))
		}

		return acc
	}, [])

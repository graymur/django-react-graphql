import createMappingObject from '../create-mapping-object'
import map from 'lodash/map'
import keyBy from 'lodash/keyBy'
import flow from 'lodash/flow'

/**
 * Create auto mapping based on fields name.
 * Each field's title is normalized - "-", "_", "." and spaces are removed,
 * resulting string is lowercased.
 *
 * If from field has a matching to field - fields are automatically mapped
 * @param fromFields
 * @param toFields
 */
export default (fromFields, toFields) => {
	// TODO: decide if we want to map by name fields that have automapping config
	const fromFieldsMap = keyByNormalizedTitle(
		fromFields /*.filter(x => !x.autoMapping)*/,
	)
	const toFieldsMap = keyByNormalizedTitle(toFields /*.filter(x => !x.autoMapping)*/)

	return map(fromFieldsMap, (fromField, key) => {
		if (toFieldsMap[key]) {
			return createMappingObject(fromField, toFieldsMap[key])
		}
	}).filter(x => x)
}

const keyByNormalizedTitle = fields =>
	keyBy(
		fields,
		flow(
			getFieldTitle,
			normalizeFieldTitle,
		),
	)
const getFieldTitle = field => field.title
const normalizeFieldTitle = title => title.replace(/(\-|_|\.|\s)/g, '').toLowerCase()

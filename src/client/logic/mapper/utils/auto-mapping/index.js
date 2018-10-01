import mapByConfig from './map-by-config'
import mapByFieldNames from './map-by-field-names'
import mergeMappings from './merge-mappings'

const defaultOptions = {
	matchByFieldsNames: false,
}

/**
 * Create auto mapping based on app's fields and options objects
 * @param fromFields
 * @param toFields
 * @param options
 */
export default (fromFields, toFields, options = {}) => {
	options = { ...defaultOptions, ...options }

	const mappings = []

	// create mapping created based on "autoMapping" config
	// of each field
	mappings.push(mapByConfig(fromFields, toFields, options))

	if (options.matchByFieldsNames) {
		// create mapping based on fields names
		mappings.push(mapByFieldNames(fromFields, toFields))
	}

	// merge mappings arrays to remove duplicates
	return mergeMappings(mappings)
}

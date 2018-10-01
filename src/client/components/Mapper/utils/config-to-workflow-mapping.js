import reduce from 'lodash/reduce'
import keyBy from 'lodash/keyBy'

/**
 * Convert config of Mapper component to the mapping format to be placed
 * into workflow's config.
 *
 * Sample result:
 {
 	"map": {
 		"extenstions": "",
		"mapping": {
			"first_name_field_from_left_app": "FirstNameFromRightApp",
			"last_name_field_from_left_app": "LastNameFromRightApp",
			"email_field_from_left_app": "EmailFromRightApp",
		}
 	}
 }
 * @param apps
 * @param config
 * @returns {{map: {mapping: *}}}
 */
export default (apps, config) => {
	// make a map of all fields from both apps by _id for easy access
	const fieldsByIds = keyBy([...apps[0].fields, ...apps[1].fields], '_id')

	// create object containing "left_field_getter": "right_field_getter" map
	const mapping = reduce(
		config,
		(acc, item) => ({
			...acc,
			[fieldsByIds[item.left].getter]: fieldsByIds[item.right].getter,
		}),
		{},
	)

	// return mapping object
	return {
		map: {
			extensions: '',
			mapping,
		},
	}
}

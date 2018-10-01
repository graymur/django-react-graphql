import reduce from 'lodash/reduce'
import keyBy from 'lodash/keyBy'
import partialRight from 'lodash/partialRight'
import flow from 'lodash/flow'
import customModifiers from './app-dependent-modifiers'

const defaultModifier = x => x

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
 * @param config
 * @param apps
 * @returns {{map: {mapping: *}}}
 */
export default (config, apps) => {
	const fromModifierName = `${apps[0].info.appName}-${
		apps[0].info.entityName
	}-trigger`
	const toModifierName = `${apps[1].info.appName}-${apps[1].info.entityName}-action`

	// create custom modifiers functions, which will be passed mappingCode, config and apps
	// params and will be able to modify mapping code if necessary
	const fromModifier = partialRight(
		customModifiers[fromModifierName] || defaultModifier,
		config,
		apps,
	)
	const toModifier = partialRight(
		customModifiers[toModifierName] || defaultModifier,
		config,
		apps,
	)

	// make a map of all fields from both apps by _id for easy access
	const fieldsByIds = keyBy([...apps[0].fields, ...apps[1].fields], '_id')

	// create object containing "left_field_getter": "right_field_getter" map
	const map = reduce(
		config,
		(acc, item) => ({
			...acc,
			[fieldsByIds[item.to].setter]: fieldsByIds[item.from].getter,
		}),
		{},
	)

	// return mapping object
	return flow(
		fromModifier,
		toModifier,
	)({
		map: {
			mapping: {
				extensions: {},
				map,
			},
		},
	})
}

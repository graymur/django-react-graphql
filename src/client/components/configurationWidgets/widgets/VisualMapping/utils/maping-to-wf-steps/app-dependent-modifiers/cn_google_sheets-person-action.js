/**
 * Add ID field to Google Sheets mapping to be able to update
 * rows by this ID field
 * @param mappingCode
 * @param mapping
 * @param apps
 * @returns {*}
 */
export default (mappingCode, mapping, apps) => {
	const fromApp = apps[0]

	if (!fromApp.entityConfig.idField) {
		throw new Error(
			`Google Sheets requries ${fromApp.info.full_name} to have ID field`,
		)
	}

	if (Object.keys(mappingCode.map.mapping.map).length > 0) {
		mappingCode.map.mapping.map.ID = fromApp.entityConfig.idField
	}

	return mappingCode
}

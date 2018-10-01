import omit from 'lodash/omit'

/**
 * Visual mapping depends on defined list of fields from both apps,
 * but Google Sheets doesn't have predefined fields by definition.
 * To be able to map fields from some app to Google Sheets, we copy
 * that app fields config to Google Sheets field so that Google Sheets
 * fields mirror the second app
 * @param mapperConfig
 * @returns {*}
 */
export default mapperConfig => {
	mapperConfig.apps[1].fields = mapperConfig.apps[0].fields.map(x => {
		return omit(
			{
				...x,
				_id: `googleSheets_${x._id}`, // add string to keep ids unique
				setter: x.title, // use Title as setter - it will become col title in Google Sheets
			},
			'getter',
		) // remove "getter" field, we don't need it on "accepting" app
	})

	return mapperConfig
}

import reduce from 'lodash/reduce'

const isMergeField = (name, fields) =>
	fields.find(x => x.setter === name && x._id.indexOf('mailChimp_merge_') === 0)

/**
 * MailChimp implements custom fields via "merge_fields" field in payload.
 * This function converts standard mapping's output
 "map": {
            "extensions": {},
            "mapping": {
				"email_address": "email",
				"FNAME": "firstName",
				"LNAME": "lastName",
				"POSTCODE": "zipCode",
				"HOMEPHONE": "home",
				"STATUS": "created",
            }
        }
 }

 into this:

 {
	"email_address": "email",
	"merge_fields": {
		"FNAME": "firstName",
		"LNAME": "lastName",
		"POSTCODE": "zipCode",
		"HOMEPHONE": "home",
		"STATUS": "created",
	}
}

 where mapping for custom fields is groups under "merge_fields" field

 * @param mappingCode
 * @param mapping
 * @param apps
 * @returns {{merge_fields: *}}
 */
export default (mappingCode, mapping, apps) => {
	const mChimpApp = apps.find(x => x.info.name === 'cn_mailchimp')

	const mergeFieldsMap = reduce(
		mappingCode.map.mapping.map,
		(acc, value, key) =>
			isMergeField(key, mChimpApp.fields) ? { ...acc, [key]: value } : acc,
		{},
	)

	const mappingCodeWoMergeFields = reduce(
		mappingCode.map.mapping.map,
		(acc, value, key) =>
			isMergeField(key, mChimpApp.fields) ? acc : { ...acc, [key]: value },
		{},
	)

	mappingCode.map.mapping.map = {
		// we also add "status" field, which is required by MailChimp
		status: "'subscribed'",
		...mappingCodeWoMergeFields,
		merge_fields: { map: mergeFieldsMap },
	}

	return mappingCode
}

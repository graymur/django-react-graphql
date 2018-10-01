// taken from https://stackoverflow.com/a/7220510 as temporary display solution
function syntaxHighlight(json) {
	json = json
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
	return json.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
		function(match) {
			let cls = 'number'
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key'
				} else {
					cls = 'string'
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean'
			} else if (/null/.test(match)) {
				cls = 'null'
			}
			return '<span class="' + cls + '">' + match + '</span>'
		},
	)
}

/**
 * Some sublogs enties contain detailed information in stringified JSON
 * format - created invoice, updated customer, etc.
 * This function returns HTML displaying highlighted parsed JSON or,
 * if incoming params doesn't contain valid JSON, value as is
 * @param value
 * @returns {*}
 */
export default value => {
	try {
		return syntaxHighlight(JSON.stringify(JSON.parse(value), null, 4))
	} catch (e) {
		return value
	}
}

/**
 * Take several mapping arrays created by different methods (by config or by titles)
 * and remove duplicates. If duplicate is found, first occurence takes precedence.
 *
 * TODO: check for duplicated not only in "from" fields, but also in "to" fields
 * @param mappings
 */
export default mappings =>
	mappings.reduce((acc, item) => {
		return [...acc, ...item.filter(x => !acc.find(y => x.from === y.from))]
	}, [])

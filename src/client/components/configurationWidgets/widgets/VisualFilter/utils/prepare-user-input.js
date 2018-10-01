/**
 * Prepare user's input for use in filter's expression:
 * 1. Escape single quotes
 * 2. Wrap in single quotes
 * TODO: distinguish between strings and numbers in user's input
 * @param input
 */
export default input => {
	let value = input.replace(/'/g, "\\'")
	value = `'${value}'`
	return value
}

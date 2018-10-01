/* eslint-disable */
import findPotentialMapping from '../find-potential-mapping'

const targets = [
	{ id: 1 },
	{ id: 2, type: 'string' },
	{ id: 3, type: 'email' },
	{ id: 4, type: 'url' },
	{ id: 5, type: 'number' },
	{ id: 6, type: 'float' },
]

test('Matches type "string"', async () => {
	const result = findPotentialMapping({ type: 'string' }, targets)

	expect(result).toEqual([{ id: 1 }, { id: 2, type: 'string' }])
})

test('Matches emapty type as "string"', async () => {
	const result = findPotentialMapping({}, targets)
	expect(result).toEqual([{ id: 1 }, { id: 2, type: 'string' }])
})

test('Matches type "email" to fields with type "string" and "email"', async () => {
	const result = findPotentialMapping({ type: 'email' }, targets)

	expect(result).toEqual([
		{ id: 1 },
		{ id: 2, type: 'string' },
		{ id: 3, type: 'email' },
	])
})

test('Matches type "url" to fields with type "string" and "url"', async () => {
	const result = findPotentialMapping({ type: 'url' }, targets)

	expect(result).toEqual([
		{ id: 1 },
		{ id: 2, type: 'string' },
		{ id: 4, type: 'url' },
	])
})

test('Matches type "number" to fields with type "string", "number" and "float"', async () => {
	const result = findPotentialMapping({ type: 'number' }, targets)

	expect(result).toEqual([
		{ id: 1 },
		{ id: 2, type: 'string' },
		{ id: 5, type: 'number' },
	])
})

test('Matches type "float" to fields with type "string", "number" and "float"', async () => {
	const result = findPotentialMapping({ type: 'float' }, targets)

	expect(result).toEqual([
		{ id: 1 },
		{ id: 2, type: 'string' },
		{ id: 5, type: 'number' },
		{ id: 6, type: 'float' },
	])
})

/* eslint-disable */
import createMappingObject from '../create-mapping-object'

const field1 = { _id: 1, appName: 'App1', name: 'Field1' }
const field2 = {
	_id: 2,
	appName: 'App2',
	name: 'Field2',
	constraints: { minLength: 5, maxLength: 10 },
}

test('createMappingObject', () => {
	const result = createMappingObject(field1, field2)

	expect(result.from).toEqual(1)
	expect(result.to).toEqual(2)
	expect(result.constraintsMessages.length).toEqual(2)
})

test('createMappingObject', () => {
	const result = createMappingObject(field2, field1)

	expect(result.from).toEqual(2)
	expect(result.to).toEqual(1)
	expect(result.constraintsMessages.length).toEqual(0)
})

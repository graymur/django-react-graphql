/* eslint-disable */
import getConstraintsMessages, {
	getConstraintValue,
	maxLengthMessage,
	minLengthMessage,
	messagesTemplates,
} from '../constraint-messages'

test('getConstraintValue gets existing value', () => {
	const result = getConstraintValue({ constraints: { maxLength: 5 } }, 'maxLength')
	expect(result).toEqual(5)
})

test("getConstraints returns undefined if field doesn't have constraints", () => {
	const result = getConstraintValue({}, 'maxLength')
	expect(result).toEqual(undefined)
})

test('maxLengthMessage returns false if right field has no maxLength', () => {
	const result = maxLengthMessage({}, {})
	expect(result).toEqual(false)
})

test('maxLengthMessage returns false if right field has bigger max length then left', () => {
	const field1 = { constraints: { maxLength: 5 } }
	const field2 = { constraints: { maxLength: 7 } }
	const result = maxLengthMessage(field1, field2)
	expect(result).toEqual(false)
})

test('maxLengthMessage returns false if max lengths are equal', () => {
	const field1 = { constraints: { maxLength: 5 } }
	const field2 = { constraints: { maxLength: 5 } }
	const result = maxLengthMessage(field1, field2)
	expect(result).toEqual(false)
})

test('maxLengthMessage returns correct message if left field has no maxLength', () => {
	const field1 = { appName: 'App1', name: 'Field1' }
	const field2 = { appName: 'App2', name: 'Field2', constraints: { maxLength: 5 } }
	const result = maxLengthMessage(field1, field2)
	expect(result).toEqual(messagesTemplates.maxLengthRightOnly(field1, field2))
})

test('maxLengthMessage returns correct message if left field has bigger maxLength then right', () => {
	const field1 = { appName: 'App1', name: 'Field1', constraints: { maxLength: 7 } }
	const field2 = { appName: 'App2', name: 'Field2', constraints: { maxLength: 5 } }
	const result = maxLengthMessage(field1, field2)
	expect(result).toEqual(messagesTemplates.maxLengthRightLess(field1, field2))
})

test('minLengthMessage returns false if right field has no minLength', () => {
	const result = minLengthMessage({}, {})
	expect(result).toEqual(false)
})

test('minLengthMessage returns false if min lengths are equal', () => {
	const field1 = { constraints: { minLength: 5 } }
	const field2 = { constraints: { minLength: 5 } }
	const result = maxLengthMessage(field1, field2)
	expect(result).toEqual(false)
})

test('minLengthMessage returns false if right field has minLength', () => {
	const field1 = { appName: 'App1', name: 'Field1' }
	const field2 = { appName: 'App2', name: 'Field2', constraints: { minLength: 5 } }
	const result = minLengthMessage(field1, field2)
	expect(result).toEqual(messagesTemplates.minLengthRight(field1, field2))
})

test('getConstraintsMessages return correct number of messages', () => {
	const field1 = { appName: 'App1', name: 'Field1' }
	const field2 = {
		appName: 'App2',
		name: 'Field2',
		constraints: { minLength: 5, maxLength: 10 },
	}
	const result = getConstraintsMessages(field1, field2)
	expect(result.length).toBe(2)
})

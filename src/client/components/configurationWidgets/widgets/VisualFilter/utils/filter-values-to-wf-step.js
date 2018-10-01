import prepareUserInput from './prepare-user-input'

export default function({ field, expression, userInput }) {
	// if there's something wrong with user's input, return
	// default filter code that will not filter out anything,
	// acting as if there's no filter at all
	if (!field || !expression || !userInput) {
		return {
			filter: {
				expression: 'true',
				terminate_if_empty: true,
			},
		}
	}

	// if expression.value is a function, use it's result as filter expression,
	// else build it as "sourceField >|<|===|!== '{user's input}'"
	const filterExpression =
		expression.value.constructor === Function
			? expression.value(field, userInput)
			: `${field.getter} ${expression.value} ${prepareUserInput(userInput)}`

	return {
		filter: {
			expression: filterExpression,
			terminate_if_empty: true,
		},
	}
}

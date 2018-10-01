import remove from 'lodash/remove'
import { COMMISSIONS_TO_TRACK_INPUT_NAME } from '../constants'

const getInputValue = input => {
	if (input.nodeName === 'SELECT' && input.multiple) {
		return Array.from(input.options)
			.filter(x => x.selected)
			.map(x => x.value)
	}

	return input.type === 'checkbox' ? input.checked : input.value
}

export default (input, prevState) => {
	const newState = {}

	if (input.name === COMMISSIONS_TO_TRACK_INPUT_NAME) {
		let commissions_to_track = prevState.inputValues.commissions_to_track.slice()

		if (input.checked) {
			commissions_to_track.push(input.value)
		} else {
			commissions_to_track = remove(commissions_to_track, x => x !== input.value)
		}

		if (input.type === 'radio') {
			commissions_to_track = [input.value]
		}

		newState.commissions_to_track = commissions_to_track
	} else {
		newState[input.name] = getInputValue(input)

		if (input.name === 'incomeExpense' || input.name === 'itemized') {
			newState.commissions_to_track = []
		}

		if (input.name === 'incomeExpense') {
			newState.objectType = undefined
		}
	}

	return newState
}

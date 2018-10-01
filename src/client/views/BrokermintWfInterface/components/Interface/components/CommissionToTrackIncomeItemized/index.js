import React from 'react'
import get from 'lodash/get'
import intersection from 'lodash/intersection'
import { COMMISSIONS_TO_TRACK_INPUT_NAME } from '../../../../constants'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'
import errorsWrapper from '../../../../utils/errors-wrapper'

// types to track when this checkbox is selected
const typesToTrack = [
	'startGC',
	'award_distribution',
	'shared_income',
	'unshared_income',
]

// determine if checkbox should be displayed as checked by
// finding length of intersection between commissions types stored
// in state and "typesToTrack" var
const isChecked = inputValues =>
	intersection(get(inputValues, COMMISSIONS_TO_TRACK_INPUT_NAME, []), typesToTrack)
		.length > 0

// change auto-created state when this checkbox is created,
// by adding "typesToTrack" array to "commissions_to_track" field
// instead of a single value
const addTypes = state => ({
	...state,
	[COMMISSIONS_TO_TRACK_INPUT_NAME]: typesToTrack.slice(1),
})

export const CommissionToTrackIncomeItemized = ({ onInputChange, inputValues }) => (
	<div className="form-group">
		<legend className="col-form-label">Commissions to track:</legend>
		<div className="form-check">
			<input
				onChange={e => onInputChange(e, addTypes)}
				checked={isChecked(inputValues)}
				type="checkbox"
				className="form-check-input"
				name={COMMISSIONS_TO_TRACK_INPUT_NAME}
				id="itemizedTrue1"
				value="startGC"
			/>
			<label className="form-check-label" htmlFor="itemizedTrue1">
				Starting point Gross Commission
			</label>
		</div>
	</div>
)

export default errorsWrapper(COMMISSIONS_TO_TRACK_INPUT_NAME)(
	setDefaultOnMount(
		CommissionToTrackIncomeItemized,
		COMMISSIONS_TO_TRACK_INPUT_NAME,
		'startGC',
	),
)

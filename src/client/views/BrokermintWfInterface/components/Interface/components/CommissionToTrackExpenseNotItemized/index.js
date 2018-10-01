import React from 'react'
import get from 'lodash/get'
import remove from 'lodash/remove'
import {
	COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME,
	COMMISSIONS_TO_TRACK_INPUT_NAME,
} from '../../../../constants'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'
import errorsWrapper from '../../../../utils/errors-wrapper'

// if user click on "All items with specific tag" checkbox, we should
// uncheck all other checkboxes. We change auto-generated state by
// setting field "commissions_to_track" to ["tags"]
const tagSelected = newState => ({
	...newState,
	[COMMISSIONS_TO_TRACK_INPUT_NAME]: [COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME],
})

// when user click on any checkbox other that "All items with specific tag",
// we should deactivate "All items with specific tag" checkbox
const tagUnSelected = newState => ({
	...newState,
	[COMMISSIONS_TO_TRACK_INPUT_NAME]: remove(
		newState[COMMISSIONS_TO_TRACK_INPUT_NAME],
		x => x !== COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME,
	),
})

export const CommissionToTrackExpenseNotItemized = ({
	onInputChange,
	inputValues,
}) => (
	<div className="form-group">
		<legend className="col-form-label">Commissions to track:</legend>
		<div className="form-check">
			<input
				onChange={e => onInputChange(e, tagUnSelected)}
				checked={get(inputValues, COMMISSIONS_TO_TRACK_INPUT_NAME, []).includes(
					'OFFICE_NET',
				)}
				type="checkbox"
				className="form-check-input"
				name={COMMISSIONS_TO_TRACK_INPUT_NAME}
				id="itemizedFalse1"
				value="OFFICE_NET"
			/>
			<label className="form-check-label" htmlFor="itemizedFalse1">
				Office net
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={e => onInputChange(e, tagUnSelected)}
				checked={get(inputValues, COMMISSIONS_TO_TRACK_INPUT_NAME, []).includes(
					'GROSS_INCOME',
				)}
				type="checkbox"
				className="form-check-input"
				name={COMMISSIONS_TO_TRACK_INPUT_NAME}
				id="itemizedFalse2"
				value="GROSS_INCOME"
			/>
			<label className="form-check-label" htmlFor="itemizedFalse2">
				Office gross
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={e => onInputChange(e, tagUnSelected)}
				checked={get(inputValues, COMMISSIONS_TO_TRACK_INPUT_NAME, []).includes(
					'NET_COMMISSION',
				)}
				type="checkbox"
				className="form-check-input"
				name={COMMISSIONS_TO_TRACK_INPUT_NAME}
				id="itemizedFalse3"
				value="NET_COMMISSION"
			/>
			<label className="form-check-label" htmlFor="itemizedFalse3">
				Agent net
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={e => onInputChange(e, tagSelected)}
				checked={get(inputValues, COMMISSIONS_TO_TRACK_INPUT_NAME, []).includes(
					COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME,
				)}
				type="checkbox"
				className="form-check-input"
				name={COMMISSIONS_TO_TRACK_INPUT_NAME}
				id="itemizedFalse3"
				value="tags"
			/>
			<label className="form-check-label" htmlFor="itemizedFalse4">
				All items with specific tag
			</label>
		</div>
		{get(inputValues, COMMISSIONS_TO_TRACK_INPUT_NAME, []).includes(
			COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME,
		) && (
			<div className="form-group">
				<input
					type="text"
					onChange={onInputChange}
					defaultValue={get(inputValues, COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME)}
					name={COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME}
					className="form-control"
					id="commissions_to_track-tags"
				/>
			</div>
		)}
	</div>
)

export default errorsWrapper(COMMISSIONS_TO_TRACK_INPUT_NAME)(
	setDefaultOnMount(
		CommissionToTrackExpenseNotItemized,
		COMMISSIONS_TO_TRACK_INPUT_NAME,
		'OFFICE_NET',
	),
)

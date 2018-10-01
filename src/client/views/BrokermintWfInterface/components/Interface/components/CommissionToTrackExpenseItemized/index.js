import React from 'react'
import get from 'lodash/get'
import {
	COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME,
	COMMISSIONS_TO_TRACK_INPUT_NAME,
} from '../../../../constants'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'
import errorsWrapper from '../../../../utils/errors-wrapper'

export const CommissionToTrackExpenseItemized = ({ onInputChange, inputValues }) => (
	<div className="form-group">
		<legend className="col-form-label">Commissions to track:</legend>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, COMMISSIONS_TO_TRACK_INPUT_NAME, []).includes(
					'agent_split',
				)}
				type="radio"
				className="form-check-input"
				name={COMMISSIONS_TO_TRACK_INPUT_NAME}
				id="itemizedTrue1"
				value="agent_split"
			/>
			<label className="form-check-label" htmlFor="itemizedTrue1">
				Starting point Agent Split
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, COMMISSIONS_TO_TRACK_INPUT_NAME, []).includes(
					'commissions_basis',
				)}
				type="radio"
				className="form-check-input"
				name={COMMISSIONS_TO_TRACK_INPUT_NAME}
				id="itemizedTrue2"
				value="commissions_basis"
			/>
			<label className="form-check-label" htmlFor="itemizedTrue2">
				Starting point Commission Basis
			</label>
		</div>
		{/*<div className="form-check">*/}
		{/*<input*/}
		{/*onChange={onInputChange}*/}
		{/*checked={get(inputValues, COMMISSIONS_TO_TRACK_INPUT_NAME, []).includes(*/}
		{/*COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME,*/}
		{/*)}*/}
		{/*type="radio"*/}
		{/*className="form-check-input"*/}
		{/*name={COMMISSIONS_TO_TRACK_INPUT_NAME}*/}
		{/*id="itemizedTrue3"*/}
		{/*value={COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME}*/}
		{/*/>*/}
		{/*<label className="form-check-label" htmlFor="itemizedTrue3">*/}
		{/*All items with specific tag*/}
		{/*/!*Need to add text box here to input tags*!/*/}
		{/*</label>*/}
		{/*</div>*/}
		{/*{get(inputValues, COMMISSIONS_TO_TRACK_INPUT_NAME, []).includes(*/}
		{/*COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME,*/}
		{/*) && (*/}
		{/*<div className="form-group">*/}
		{/*<input*/}
		{/*type="text"*/}
		{/*onChange={onInputChange}*/}
		{/*defaultValue={get(inputValues, COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME)}*/}
		{/*name={COMMISSIONS_TO_TRACK_TAGS_INPUT_NAME}*/}
		{/*className="form-control"*/}
		{/*id="commissions_to_track-tags"*/}
		{/*/>*/}
		{/*</div>*/}
		{/*)}*/}
	</div>
)

export default errorsWrapper(COMMISSIONS_TO_TRACK_INPUT_NAME)(
	setDefaultOnMount(
		CommissionToTrackExpenseItemized,
		COMMISSIONS_TO_TRACK_INPUT_NAME,
		'agent_split',
	),
)

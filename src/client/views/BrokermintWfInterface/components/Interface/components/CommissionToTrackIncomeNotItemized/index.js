import React from 'react'
import get from 'lodash/get'
import { COMMISSIONS_TO_TRACK_INPUT_NAME } from '../../../../constants'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'
import errorsWrapper from '../../../../utils/errors-wrapper'

export const CommissionToTrackIncomeNotItemized = ({
	onInputChange,
	inputValues,
}) => (
	<div className="form-group">
		<legend className="col-form-label">Commissions to track:</legend>
		<div className="form-check">
			<input
				onChange={onInputChange}
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
				onChange={onInputChange}
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
				onChange={onInputChange}
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
	</div>
)

export default errorsWrapper(COMMISSIONS_TO_TRACK_INPUT_NAME)(
	setDefaultOnMount(
		CommissionToTrackIncomeNotItemized,
		COMMISSIONS_TO_TRACK_INPUT_NAME,
		['OFFICE_NET'],
	),
)

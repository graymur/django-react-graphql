import React from 'react'
import get from 'lodash/get'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'

const options = [
	['listing', 'Listing'],
	['buying', 'Buying'],
	['null', 'Either or Both'],
]

export const RepresentingSide = ({ onInputChange, inputValues }) => (
	<div className="form-group">
		<legend className="col-form-label">
			Sync transactions where you represent this side:
		</legend>
		{options.map(x => (
			<div key={x[0]} className="form-check">
				<input
					onChange={onInputChange}
					checked={get(inputValues, 'representing_side') === x[0]}
					type="radio"
					className="form-check-input"
					name="representing_side"
					id={`representinSide-${x[0]}`}
					value={x[0]}
				/>
				<label className="form-check-label" htmlFor={`representinSide-${x[0]}`}>
					{x[1]}
				</label>
			</div>
		))}
	</div>
)

export default setDefaultOnMount(RepresentingSide, 'representing_side', 'null')

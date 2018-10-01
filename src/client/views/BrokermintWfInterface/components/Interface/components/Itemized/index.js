import React from 'react'
import get from 'lodash/get'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'

export default ({ onInputChange, inputValues }) => (
	<div className="form-group">
		<legend className="col-form-label">Itemized:</legend>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'itemized') === 'itemized'}
				type="radio"
				className="form-check-input"
				name="itemized"
				id="itemized1"
				value="itemized"
			/>
			<label className="form-check-label" htmlFor="itemized1">
				YES
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'itemized') === 'not_itemized'}
				type="radio"
				className="form-check-input"
				name="itemized"
				id="itemized2"
				value="not_itemized"
			/>
			<label className="form-check-label" htmlFor="itemized2">
				NO
			</label>
		</div>
	</div>
)

import React from 'react'
import get from 'lodash/get'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'

export const TransactionDueDate = ({ onInputChange, inputValues }) => (
	<div className="form-group">
		<legend className="col-form-label">Due Date:</legend>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'due_date') === 'null'}
				type="radio"
				className="form-check-input"
				name="due_date"
				id="due_date1"
				value="null"
			/>
			<label className="form-check-label" htmlFor="due_date1">
				QuickBooks default
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'due_date') === 'closing_date'}
				type="radio"
				className="form-check-input"
				name="due_date"
				id="due_date2"
				value="closing_date"
			/>
			<label className="form-check-label" htmlFor="due_date2">
				Closing date in Brokermint
			</label>
		</div>
	</div>
)

export default setDefaultOnMount(TransactionDueDate, 'due_date', 'null')

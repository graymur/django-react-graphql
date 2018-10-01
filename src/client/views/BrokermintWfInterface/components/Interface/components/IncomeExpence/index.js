import React from 'react'
import get from 'lodash/get'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'

export default ({ onInputChange, inputValues }) => (
	<div className="form-group">
		<legend className="col-form-label">Income/Expense:</legend>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'incomeExpense') === 'income'}
				type="radio"
				className="form-check-input"
				name="incomeExpense"
				id="incomeExpense1"
				value="income"
			/>
			<label className="form-check-label" htmlFor="incomeExpense1">
				Income
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'incomeExpense') === 'expense'}
				type="radio"
				className="form-check-input"
				name="incomeExpense"
				id="incomeExpense2"
				value="expense"
			/>
			<label className="form-check-label" htmlFor="incomeExpense2">
				Expense
			</label>
		</div>
	</div>
)

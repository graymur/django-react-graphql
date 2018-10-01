import React from 'react'
import get from 'lodash/get'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'

export const ObjectType = ({ onInputChange, inputValues }) => (
	<div className="form-group">
		<legend className="col-form-label">Sync as:</legend>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'objectType') === 'bill'}
				type="radio"
				className="form-check-input"
				name="objectType"
				id="objectType21"
				value="bill"
			/>
			<label className="form-check-label" htmlFor="objectType21">
				Bill
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'objectType') === 'expense'}
				type="radio"
				className="form-check-input"
				name="objectType"
				id="objectType22"
				value="expense"
			/>
			<label className="form-check-label" htmlFor="objectType22">
				Expense
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'objectType') === 'check'}
				type="radio"
				className="form-check-input"
				name="objectType"
				id="objectType23"
				value="check"
			/>
			<label className="form-check-label" htmlFor="objectType23">
				Check
			</label>
		</div>
	</div>
)

export default setDefaultOnMount(ObjectType, 'objectType', 'bill')

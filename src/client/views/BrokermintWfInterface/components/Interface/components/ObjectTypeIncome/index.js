import React from 'react'
import get from 'lodash/get'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'

export const ObjectType = ({ onInputChange, inputValues }) => (
	<div className="form-group">
		<legend className="col-form-label">Sync as:</legend>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'objectType') === 'invoice'}
				type="radio"
				className="form-check-input"
				name="objectType"
				id="objectType11"
				value="invoice"
			/>
			<label className="form-check-label" htmlFor="objectType11">
				Invoice
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'objectType') === 'salesreceipt'}
				type="radio"
				className="form-check-input"
				name="objectType"
				id="objectType12"
				value="salesreceipt"
			/>
			<label className="form-check-label" htmlFor="objectType12">
				Sales Receipt
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'objectType') === 'deposit'}
				type="radio"
				className="form-check-input"
				name="objectType"
				id="objectType13"
				value="deposit"
			/>
			<label className="form-check-label" htmlFor="objectType13">
				Deposit
			</label>
		</div>
	</div>
)

export default setDefaultOnMount(ObjectType, 'objectType', 'invoice')

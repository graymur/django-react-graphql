import React from 'react'
import get from 'lodash/get'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'

export const TransactionDate = ({ onInputChange, inputValues }) => (
	<div className="form-group">
		<legend className="col-form-label">Date</legend>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'object_date') === 'null'}
				type="radio"
				className="form-check-input"
				name="object_date"
				id="object_date1"
				value="null"
			/>
			<label className="form-check-label" htmlFor="object_date1">
				Let QuickBook decide
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'object_date') === 'closing_date'}
				type="radio"
				className="form-check-input"
				name="object_date"
				id="object_date2"
				value="closing_date"
			/>
			<label className="form-check-label" htmlFor="object_date2">
				Closing date in Brokermint
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'object_date') === 'listing_date'}
				type="radio"
				className="form-check-input"
				name="object_date"
				id="object_date3"
				value="listing_date"
			/>
			<label className="form-check-label" htmlFor="object_date3">
				Listing Date
			</label>
		</div>
		<div className="form-check">
			<input
				onChange={onInputChange}
				checked={get(inputValues, 'object_date') === 'closed_at'}
				type="radio"
				className="form-check-input"
				name="object_date"
				id="object_date4"
				value="closed_at"
			/>
			<label className="form-check-label" htmlFor="object_date4">
				Date closed in Brokermint
			</label>
		</div>
	</div>
)

export default setDefaultOnMount(TransactionDate, 'object_date', 'null')

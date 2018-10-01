import React from 'react'
import get from 'lodash/get'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'
import Radio from '../FormElements/Radio'

const statusList = [['New', 'new'], ['Closed', 'closed'], ['Pending', 'pending']]

export default ({ onInputChange, inputValues }) => (
	<div className="form-group">
		<legend className="col-form-label">Sync transactions with this status:</legend>
		{statusList.map(status => (
			<Radio
				key={status[0]}
				name="transaction_status"
				onChange={onInputChange}
				value={status[1]}
				userValue={get(inputValues, 'transaction_status')}
				id={`transaction_status-${status[1]}`}
				title={status[0]}
			/>
		))}
	</div>
)

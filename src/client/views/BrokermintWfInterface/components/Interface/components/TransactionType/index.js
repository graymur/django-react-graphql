import React from 'react'
import get from 'lodash/get'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'
import Radio from '../FormElements/Radio'

const types = [
	'Traditional sale',
	'Short sale',
	'REO',
	'HUD',
	'Auction',
	'Rent/lease',
	'Commercial lease',
	'Commercial sale',
	'Appraisal',
	'Other',
	'Referral',
	['All', 'null'],
]

const getIndex = (v, i) => (Array.isArray(v) ? v[i] : v)
const getLabel = type => getIndex(type, 0)
const getValue = type => getIndex(type, 1)

export const TransactionType = ({ onInputChange, inputValues }) => (
	<div className="form-group">
		<legend className="col-form-label">Sync transactions with this type:</legend>
		{types.map((type, i) => (
			<Radio
				key={type}
				name="transaction_type"
				onChange={onInputChange}
				value={getValue(type)}
				userValue={get(inputValues, 'transaction_type')}
				id={'transaction_type' + i}
				title={getLabel(type)}
			/>
		))}
	</div>
)

export default setDefaultOnMount(TransactionType, 'transaction_type', 'null')

import React from 'react'
import get from 'lodash/get'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'

export const wfExpressions = [
	['address', "JOIN(' ', JOIN(', ', address, city, state), zip)"],
	['payee_name', 'payee_name'],
	[
		'address / payee_name',
		"JOIN(' ', JOIN(', ', address, city, state), zip) + '/' + payee_name",
	],
	[
		'address - payee_name',
		"JOIN(' ', JOIN(', ', address, city, state), zip) + '-' + payee_name",
	],
	[
		'address - tags',
		"JOIN(' ', JOIN(', ', address, city, state), zip) + '-' + payee_name",
	],
]

export const Description = ({ onInputChange, inputValues }) => (
	<div className="row">
		<div className="col col-6">
			<div className="form-group">
				<legend className="col-form-label">Description:</legend>
				<select
					onChange={onInputChange}
					defaultValue={get(inputValues, 'description')}
					name="description"
					className="form-control"
					id="description1"
				>
					{wfExpressions.map(([title, value]) => (
						<option key={title} value={value}>
							{title}
						</option>
					))}
				</select>
			</div>
		</div>
	</div>
)

export default setDefaultOnMount(Description, 'description', wfExpressions[0][1])

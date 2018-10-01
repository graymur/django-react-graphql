import React from 'react'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'
import Loader from 'client/components/Loader'
import connectorMethodProvider from 'client/utils/connector-method-provider'

const values = [['null', 'No location'], ['specificLocation', 'Specific location']]

export const Location = props => {
	const {
		onInputChange,
		inputValues,
		connectorDataLoading,
		connectorsFetchedData,
	} = props

	if (connectorDataLoading || !connectorsFetchedData) {
		return <Loader />
	}

	return (
		<div className="form-group">
			<legend className="col-form-label">Location:</legend>
			{values.map(([value, title]) => (
				<div key={value} className="form-check">
					<input
						onChange={onInputChange}
						checked={get(inputValues, 'location') === value}
						type="radio"
						className="form-check-input"
						name="location"
						id={`location-${value}`}
						value={value}
					/>
					<label className="form-check-label" htmlFor={`location-${value}`}>
						{title}
					</label>
				</div>
			))}
			{get(inputValues, 'location') === 'specificLocation' && (
				<div className="form-group">
					<label htmlFor="specificLocation">Type in location to use</label>
					<select
						onChange={onInputChange}
						defaultValue={get(inputValues, 'specificLocation')}
						name="specificLocation"
						className="form-control"
						id="specificLocation"
					>
						{orderBy(connectorsFetchedData, 'Name').map(item => (
							<option key={item.Id} value={item.Id}>
								{item.Name}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	)
}

export default setDefaultOnMount(
	connectorMethodProvider(
		Location,
		({ connectionId }) => [
			{
				method: 'cn_qbo.get_list',
				params: { connection_id: connectionId, model: 'Department' },
			},
		],
		{ returnDataOnly: true },
	),
	'location',
	'null',
)

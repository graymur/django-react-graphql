import React from 'react'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import connectorMethodProvider from 'client/utils/connector-method-provider'
import Loader from 'client/components/Loader'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'

const value = "JOIN(' ', JOIN(', ', address, city, state), zip)"

export const CustomerName = props => {
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
			<legend className="col-form-label">
				{inputValues.incomeExpense === 'expense'
					? 'Customer (optional):'
					: 'Customer:'}
			</legend>
			{inputValues.incomeExpense === 'expense' && (
				<div className="form-check">
					<input
						onChange={onInputChange}
						checked={get(inputValues, 'customerNameFormat') === 'null'}
						type="radio"
						className="form-check-input"
						name="customerNameFormat"
						id="customerNameFormat0"
						value={'null'}
					/>
					<label className="form-check-label" htmlFor="customerNameFormat0">
						Don't use
					</label>
				</div>
			)}
			<div className="form-check">
				<input
					onChange={onInputChange}
					checked={get(inputValues, 'customerNameFormat') === value}
					type="radio"
					className="form-check-input"
					name="customerNameFormat"
					id="customerNameFormat1"
					value={value}
				/>
				<label className="form-check-label" htmlFor="customerNameFormat1">
					Customer is defined by property address
				</label>
			</div>
			<div className="form-check">
				<input
					onChange={onInputChange}
					checked={get(inputValues, 'customerNameFormat') === 'singleCustomer'}
					type="radio"
					className="form-check-input"
					name="customerNameFormat"
					id="customerNameFormat2"
					value="singleCustomer"
				/>
				<label className="form-check-label" htmlFor="customerNameFormat2">
					Use single customer for all transactions
				</label>
			</div>
			{/*The list below appears when the customerName was selected*/}
			{get(inputValues, 'customerNameFormat') === 'singleCustomer' && (
				<div className="form-group">
					<label htmlFor="customer">Choose the customer</label>
					<select
						onChange={onInputChange}
						defaultValue={get(inputValues, 'customer')}
						name="customer"
						className="form-control"
						id="customer"
					>
						<option value={false}>Select customer</option>
						{orderBy(connectorsFetchedData, 'DisplayName').map(x => (
							<option key={x.DisplayName} value={x.DisplayName}>
								{x.DisplayName}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	)
}

export default connectorMethodProvider(
	setDefaultOnMount(CustomerName, 'customerNameFormat', value),
	({ connectionId }) => [
		{ method: 'cn_qbo.get_customer_list', params: { connection_id: connectionId } },
	],
	{ returnDataOnly: true },
)

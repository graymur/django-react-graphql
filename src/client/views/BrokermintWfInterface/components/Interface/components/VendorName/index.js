import React from 'react'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import connectorMethodProvider from 'client/utils/connector-method-provider'
import Loader from 'client/components/Loader'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'
import Radio from '../FormElements/Radio'

const value = "JOIN(' ', JOIN(', ', address, city, state), zip)"

export const VendorName = props => {
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
				{/*Will be called 'Vendor' for bill and 'Payee' for check and expense*/}
				{inputValues.objectType === 'bill' ? 'Vendor:' : 'Payee:'}
			</legend>
			<Radio
				name="vendorNameFormat"
				onChange={onInputChange}
				value={value}
				userValue={get(inputValues, 'vendorNameFormat')}
				id="vendorNameFormat1"
				title="Vendor is defined by property address"
			/>
			<Radio
				name="vendorNameFormat"
				onChange={onInputChange}
				value="OR(payee_company, JOIN(' ', payee_first_name, payee_last_name))"
				userValue={get(inputValues, 'vendorNameFormat')}
				id="vendorNameFormat3"
				title="Agent/Pay To"
			/>
			<Radio
				name="vendorNameFormat"
				onChange={onInputChange}
				value="singleVendor"
				userValue={get(inputValues, 'vendorNameFormat')}
				id="vendorNameFormat2"
				title="Use single vendor for all transactions"
			/>
			{/*The list below appears when the vendorName was selected*/}
			{get(inputValues, 'vendorNameFormat') === 'singleVendor' && (
				<div className="form-group">
					<label htmlFor="vendor">Choose the vendor</label>
					<select
						onChange={onInputChange}
						defaultValue={get(inputValues, 'vendor')}
						name="vendor"
						className="form-control"
						id="vendor"
					>
						<option value={false}>Select vendor</option>
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
	setDefaultOnMount(VendorName, 'vendorNameFormat', value),
	({ connectionId }) => [
		{ method: 'cn_qbo.get_vendor_list', params: { connection_id: connectionId } },
	],
	{ returnDataOnly: true },
)

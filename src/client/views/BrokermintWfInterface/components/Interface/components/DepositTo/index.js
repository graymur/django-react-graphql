import React from 'react'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import connectorMethodProvider from 'client/utils/connector-method-provider'
import Loader from 'client/components/Loader'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'
import errorsWrapper from '../../../../utils/errors-wrapper'

export const DepositTo = props => {
	const {
		onInputChange,
		inputValues,
		connectorDataLoading,
		connectorsFetchedData,
	} = props

	if (connectorDataLoading || !connectorsFetchedData) {
		return <Loader />
	}

	const accounts = connectorsFetchedData.filter(x =>
		['Bank', 'Other Current Asset'].includes(x.AccountType),
	)

	return (
		<div className="form-group">
			<legend className="col-form-label">Deposit To:</legend>
			<select
				onChange={onInputChange}
				defaultValue={get(inputValues, 'deposit_to')}
				name="deposit_to"
				className="form-control"
				id="depositTo"
			>
				<option value={false}>Select account</option>
				{orderBy(accounts, 'Name').map(item => (
					<option key={item.Id} value={item.Id}>
						{item.Name}
					</option>
				))}
			</select>
		</div>
	)
}

export default errorsWrapper('deposit_to')(
	connectorMethodProvider(
		DepositTo,
		({ connectionId }) => [
			{ method: 'cn_qbo.get_account_list', params: { connection_id: connectionId } },
		],
		{ returnDataOnly: true },
	),
)

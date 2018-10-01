import React from 'react'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import connectorMethodProvider from 'client/utils/connector-method-provider'
import Loader from 'client/components/Loader'
import errorsWrapper from '../../../../utils/errors-wrapper'

export const ProductService = props => {
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
				{/*Product/Service (will be called 'Deposit From' for deposit and 'Expense' for expenses )*/}
				{inputValues.incomeExpense === 'expense'
					? 'Expense:'
					: inputValues.objectType === 'deposit'
						? 'Deposit From:'
						: 'Product/Service:'}
			</legend>
			<select
				onChange={onInputChange}
				defaultValue={get(inputValues, 'productService')}
				name="product_service"
				className="form-control"
				id="productService1"
			>
				<option value={''}>Select product/service</option>
				{orderBy(connectorsFetchedData, 'Name').map(item => (
					<option key={item.Id} value={item.Id}>
						{item.Name}
					</option>
				))}
			</select>
		</div>
	)
}

export default errorsWrapper('product_service')(
	connectorMethodProvider(
		ProductService,
		({ connectionId }) => [
			{ method: 'cn_qbo.get_item_list', params: { connection_id: connectionId } },
		],
		{ returnDataOnly: true },
	),
)

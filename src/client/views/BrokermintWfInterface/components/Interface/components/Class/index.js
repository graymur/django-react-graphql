import React from 'react'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import connectorMethodProvider from 'client/utils/connector-method-provider'
import Loader from 'client/components/Loader'
import setDefaultOnMount from '../../../../utils/set-default-on-mount'
import Radio from '../FormElements/Radio'

export const Class = props => {
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
			<legend className="col-form-label">Class:</legend>
			<Radio
				name="class"
				onChange={onInputChange}
				value="null"
				userValue={get(inputValues, 'class')}
				id="class4"
				title="No class"
			/>
			<Radio
				name="class"
				onChange={onInputChange}
				value="specificClass"
				userValue={get(inputValues, 'class')}
				id="class3"
				title="Specific Class"
			/>
			{/*Only show the option below if specificClass was chosen*/}
			{get(inputValues, 'class') === 'specificClass' && (
				<div className="form-group">
					<label htmlFor="exampleSelect1">Choose class</label>
					<div className="row">
						<div className="col col-lg-6">
							<select
								onChange={onInputChange}
								defaultValue={get(inputValues, 'specificClass')}
								name="specificClass"
								className="form-control"
								id="classOptions1"
							>
								<option value={false}>Select class</option>
								{orderBy(connectorsFetchedData, 'Name').map(item => (
									<option key={item.Id} value={item.Id}>
										{item.Name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default connectorMethodProvider(
	setDefaultOnMount(Class, 'class', 'null'),
	({ connectionId }) => [
		{ method: 'cn_qbo.get_class_list', params: { connection_id: connectionId } },
	],
	{ returnDataOnly: true },
)

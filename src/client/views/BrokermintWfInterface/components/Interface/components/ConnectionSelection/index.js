import React from 'react'

const Select = ({
	existingConnections,
	selectedConnection,
	selectConnection,
	name,
}) => (
	<select
		className="bm-i__connection__value form-control"
		name={name}
		onChange={selectConnection}
		value={selectedConnection}
	>
		{existingConnections.map(x => (
			<option key={x._id} value={x._id}>
				{x.label}
			</option>
		))}
	</select>
)

export default props => {
	const { app, existingConnections } = props

	if (existingConnections.length < 2) {
		return null
	}

	return (
		<div className="bm-i__connection">
			<span className="bm-i__connection__title">{app.full_name} account:</span>
			<Select {...props} />
		</div>
	)
}

import React from 'react'

export default ({ onChange, userValue, value, id, name, title }) => (
	<div className="form-check">
		<input
			onChange={onChange}
			checked={userValue === value}
			type="radio"
			className="form-check-input"
			name={name}
			id={id}
			value={value}
		/>
		<label className="form-check-label" htmlFor={id}>
			{title}
		</label>
	</div>
)

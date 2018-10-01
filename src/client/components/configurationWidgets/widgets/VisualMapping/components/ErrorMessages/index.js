import React from 'react'

export default ({ errors, config }) => {
	return (
		<React.Fragment>
			{errors.emptyRequiredFields && (
				<EmptyRequiredFields
					fields={errors.emptyRequiredFields}
					app={config.apps[1].info}
				/>
			)}
		</React.Fragment>
	)
}

const EmptyRequiredFields = ({ fields, app }) => {
	return (
		<div className="mapping-widget__errors">
			Please, map {app.full_name}
			's following fields:
			<ul>
				{fields.map(field => (
					<li key={field._id}>{field.title}</li>
				))}
			</ul>
		</div>
	)
}

import React from 'react'
import Loader from 'client/components/Loader'
import some from 'lodash/some'
import './save-block.scss'

export default class SaveBlock extends React.Component {
	render() {
		const { saving, validationErrors, onSave } = this.props
		// if any of widgets in group has error, disable "Save" button
		const hasErrors = some(validationErrors, value => value)

		return (
			<React.Fragment>
				<button
					className="main-button"
					disabled={saving || hasErrors}
					onClick={onSave}
				>
					Save
				</button>
				{saving && <Loader size={25} />}
			</React.Fragment>
		)
	}
}

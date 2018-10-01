import React from 'react'
import wrapInPopup from '../wrap-in-popup'

export class DocuSign extends React.PureComponent {
	static title = 'Connect to DocuSign'
	static appName = 'docusign'

	render() {
		const { inputValues, onInputChange } = this.props

		return (
			<React.Fragment>
				<div className="form-group api_key-field">
					<input
						className="form-control placeholder-style"
						type="text"
						name="api_key"
						onChange={onInputChange}
						placeholder="API key"
						value={inputValues['api_key']}
						required="required"
					/>
					<span className="support-text" style={{ display: 'none' }} />
					<small className="help-block" />
				</div>
				<div className="form-group label-field">
					<input
						type="text"
						name="label"
						placeholder="Name. ex: My Company, Inc"
						value={inputValues['label']}
						onChange={onInputChange}
						className="form-control placeholder-style"
						required="required"
					/>
					<small className="help-block" />
				</div>
			</React.Fragment>
		)
	}
}

export default wrapInPopup(DocuSign)

import React from 'react'
import wrapInPopup from '../wrap-in-popup'
import get from 'lodash/get'

export class MailChimp extends React.Component {
	static title = 'Connect to MailChimp'
	static appName = 'mailchimp'

	render() {
		const { inputValues, onInputChange, errors } = this.props

		return (
			<React.Fragment>
				<div className="form-group api_key-field">
					<input
						className="form-control placeholder-style"
						type="text"
						name="api_key"
						onChange={onInputChange}
						placeholder="API key"
						defaultValue={inputValues['api_key']}
						required="required"
					/>
					<span className="support-text">
						Available in your MailChimp under Profile &gt; Extras &gt; API keys
					</span>
					{errors &&
						errors.api_key && (
							<small className="help-block">
								{get(errors, 'api_key[0].message')}
							</small>
						)}
				</div>
				<div className="form-group label-field">
					<input
						type="text"
						name="label"
						placeholder="Name. ex: My Company, Inc"
						defaultValue={inputValues['label']}
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
export default wrapInPopup(MailChimp)

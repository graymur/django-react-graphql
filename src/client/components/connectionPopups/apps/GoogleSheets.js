import React from 'react'
import wrapInPopup from '../wrap-in-popup'
import { connectAppApi } from 'client/urls'

export class GoogleSheets extends React.Component {
	static getRedirectUrl = ({ workflow: { _id } }) =>
		connectAppApi({ appName: 'google_sheets', workflowId: _id })

	render() {
		return null
	}
}
export default wrapInPopup(GoogleSheets)

import React from 'react'
import wrapInPopup from '../wrap-in-popup'
import { connectAppApi } from 'client/urls'

export class Dotloop extends React.Component {
	static getRedirectUrl = ({ workflow: { _id } }) =>
		connectAppApi({ appName: 'dotloop', workflowId: _id })

	render() {
		return null
	}
}
export default wrapInPopup(Dotloop)

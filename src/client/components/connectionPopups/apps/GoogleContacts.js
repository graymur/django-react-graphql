import React from 'react'
import wrapInPopup from '../wrap-in-popup'
import { connectAppApi } from 'client/urls'

export class GoogleContacts extends React.Component {
	static getRedirectUrl = () => connectAppApi('google_contacts')

	render() {
		return null
	}
}
export default wrapInPopup(GoogleContacts)

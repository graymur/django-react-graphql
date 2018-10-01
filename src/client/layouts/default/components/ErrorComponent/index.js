import React from 'react'
import PropTypes from 'prop-types'
import './error.scss'

const ErrorComponent = ({ error }) => {
	if (process.env.NODE_ENV === 'development') {
		console.error(error)
	}

	return (
		<div className="app-error">
			<h1>Something went wrong:</h1>
			<p>{error.message || error.toString()}</p>
		</div>
	)
}

ErrorComponent.propTypes = {
	error: PropTypes.any,
}

export default ErrorComponent

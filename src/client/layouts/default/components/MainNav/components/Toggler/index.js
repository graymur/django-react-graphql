import React from 'react'
import PropTypes from 'prop-types'
import './toggler.scss'

export default class Toggler extends React.Component {
	shouldComponentUpdate() {
		return false
	}

	render() {
		return (
			<button
				className="navbar-toggler main-menu__toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="main-menu__toggler__bar" />
				<span className="main-menu__toggler__bar" />
				<span className="main-menu__toggler__bar" />
			</button>
		)
	}
}

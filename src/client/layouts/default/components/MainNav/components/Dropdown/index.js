import React from 'react'
import PropTypes from 'prop-types'
import './dropdown.scss'

export default class Dropdown extends React.Component {
	shouldComponentUpdate() {
		return false
	}

	render() {
		return (
			<div className="nav-item dropdown main-menu__dropdown">
				<a
					className="main-menu__dropdown__toggle"
					href="#"
					id="navbarDropdown"
					role="button"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				/>
				<div
					className="dropdown-menu main-menu__dropdown__list"
					aria-labelledby="navbarDropdown"
				>
					<a
						className="dropdown-item main-menu__dropdown__item"
						href="/user/settings/"
					>
						Settings
					</a>
					<a
						className="dropdown-item main-menu__dropdown__item"
						href="/user/profile/"
					>
						Profile
					</a>
					<a
						className="dropdown-item main-menu__dropdown__item"
						href="/payments/subscription/"
					>
						Subscription
					</a>
					<a
						className="dropdown-item main-menu__dropdown__item"
						href="/user/logout/"
					>
						Sign&nbsp;out
					</a>
				</div>
			</div>
		)
	}
}

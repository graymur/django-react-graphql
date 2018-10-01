import React from 'react'
import Item from './components/MenuItem'
import Dropdown from './components/Dropdown'
import Toggler from './components/Toggler'
import routes from 'client/routes'
import './main-nav.scss'

export default class MainNav extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-expand-md main-menu">
				<a className="navbar-brand logo" href="/" />
				<Toggler />
				<div
					className="collapse navbar-collapse main-menu__wr"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav mr-auto main-menu__list">
						{routes
							.filter(x => x.menuTitle)
							.slice(1) // remove index route
							.map(route => (
								<Item key={route.path} {...route} />
							))}
						<Dropdown />
					</ul>
				</div>
			</nav>
		)
	}
}

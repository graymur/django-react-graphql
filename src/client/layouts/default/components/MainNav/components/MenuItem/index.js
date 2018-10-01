import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import classnames from 'classnames'
import './menu-item.scss'

// https://reacttraining.com/react-router/web/example/custom-link
export default class Item extends React.Component {
	render() {
		const { exact, path, isRegularLink } = this.props

		return isRegularLink ? (
			<RegularLink {...this.props} />
		) : (
			<Route path={path} exact={exact} children={getRenderFunction(this.props)} />
		)
	}
}

const RegularLink = ({ path, menuTitle }) => (
	<li className="nav-item main-menu__item">
		<a className="nav-link" href={path}>
			{menuTitle}
		</a>
	</li>
)

const getRenderFunction = ({ exact, path, menuTitle }) => ({ match }) => {
	const className = classnames('nav-item', 'main-menu__item', { active: match })
	return (
		<li key={path} className={className}>
			<Link to={path} className="nav-link">
				{menuTitle}
			</Link>
		</li>
	)
}

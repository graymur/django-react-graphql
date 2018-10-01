import React from 'react'
import PropTypes from 'prop-types'
// import LazyLoad from 'react-lazyload'
import appLogoUrl from 'client/utils/app-logo-url'

import './app-logos.scss'

export default class AppLogo extends React.PureComponent {
	static propTypes = {
		app: PropTypes.object,
		connected: PropTypes.bool,
		className: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string),
		]),
	}

	static defaultProps = {
		className: [],
	}

	constructor(props) {
		super(props)
		const { className } = this.props

		this.className = Array.isArray(className) ? [...className] : [className]
		this.className.push('app-logo', `app-logo-${props.app.name}`)
	}

	render() {
		const { app, connected } = this.props
		return (
			<span className={this.className.join(' ')} title={app.full_name}>
				{/*<LazyLoad>*/}
				<img src={appLogoUrl(app.name)} />
				{/*</LazyLoad>*/}
				{connected && <span className="app-connected" />}
			</span>
		)
	}
}

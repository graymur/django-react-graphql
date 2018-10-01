import React from 'react'
import PropTypes from 'prop-types'

import './loader.scss'

export default class Loader extends React.PureComponent {
	static propTypes = {
		size: PropTypes.number,
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

		let { className } = this.props

		if (!Array.isArray(className)) {
			className = [className]
		}

		className.push('loader')

		this.className = className
	}

	render() {
		let size = this.props.size || 50
		let borderWidth = Math.max(2, Math.ceil(size * 0.2))

		const style = {
			width: `${size}px`,
			height: `${size}px`,
			border: `${borderWidth}px solid #f3f3f3`,
			borderTop: `${borderWidth}px solid #3498db`,
		}

		return <span className={this.className.join(' ')} style={style} />
	}
}

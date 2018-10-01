import React from 'react'
import classnames from 'classnames'

import './dropzone.scss'

export default class Dropzone extends React.Component {
	static propTypes = {}

	componentDidMount() {
		this.props.onMount(getBoundingClientRect(this.refs.dropzone))
	}

	render() {
		const className = classnames('dropzone', { _active: this.props.active })

		return (
			<div ref="dropzone" className={className}>
				{this.props.children}
			</div>
		)
	}
}

const getBoundingClientRect = element => {
	const {
		top,
		right,
		bottom,
		left,
		width,
		height,
		x,
		y,
	} = element.getBoundingClientRect()
	return { top, right, bottom, left, width, height, x, y }
}

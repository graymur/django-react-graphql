import React from 'react'
import classnames from 'classnames'

export default class SupportText extends React.Component {
	render() {
		const className = classnames(this.props.class)

		return <div className={className}>{this.props.text}</div>
	}
}

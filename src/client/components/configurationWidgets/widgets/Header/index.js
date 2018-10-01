import React from 'react'

export default class Header extends React.Component {
	render() {
		return <div className="widget-header">{this.props.text}</div>
	}
}

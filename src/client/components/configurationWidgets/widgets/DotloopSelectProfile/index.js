import React from 'react'
import classnames from 'classnames'
import Select from '../Select'

export default class DotloopSelectProfile extends React.Component {
	render() {
		const { id, name, value, text } = this.props

		const className = classnames(
			'workflow-widget__select styled-select',
			this.props.class,
		)

		return <Select {...this.props} />
	}
}

const createMarkup = html => ({ __html: html })

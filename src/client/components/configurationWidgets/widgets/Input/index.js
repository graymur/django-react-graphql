import React from 'react'
import classnames from 'classnames'

import Checkbox from './components/Checkbox'
import Default from './components/Default'

import validationHOC from '../../utils/validation-hoc'

import './input.scss'

export class Input extends React.Component {
	render() {
		const { id, style, name, type, value, checked, text } = this.props

		const className = classnames('workflow-widget__input', this.props.class)

		let Component
		let additionalProps

		switch (type) {
			case 'checkbox':
				Component = Checkbox
				additionalProps = { checked: value }
				break
			default:
				Component = Default
				break
		}

		return (
			<label>
				<Component {...this.props} {...additionalProps} />
				{text && <span className="text">{text}</span>}
			</label>
		)
	}
}

export default validationHOC(Input)

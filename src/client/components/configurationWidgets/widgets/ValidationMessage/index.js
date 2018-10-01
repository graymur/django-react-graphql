import React from 'react'
import some from 'lodash/some'
import get from 'lodash/get'
import classnames from 'classnames'

import './style.scss'

export class ValidationMessage extends React.Component {
	render() {
		const { validationErrors, id } = this.props

		const classNames = classnames('workflow-widget__validation-message', {
			_active: some(validationErrors, x => get(x, 'messageWidgetId') === id),
		})

		return <div className={classNames}>{this.props.text}</div>
	}
}

export default ValidationMessage

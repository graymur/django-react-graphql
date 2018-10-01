import React from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { activeField, potentialMappings } from 'client/logic/mapper/selectors'

import './active-field.scss'

export class ActiveFieldInfo extends React.Component {
	constructor(props) {
		super(props)
		this.field = {}
		this.potentialMappings = []
	}

	shouldComponentUpdate(newProps) {
		return (
			get(newProps, 'activeField._id') !== get(this.props, 'activeField._id') ||
			get(newProps, 'potentialMappings.length') !==
				get(this.props, 'potentialMappings.length')
		)
	}

	componentWillReceiveProps(newProps) {
		if (newProps.activeField) {
			if (newProps.activeField._id !== this.field._id) {
				this.potentialMappings = newProps.potentialMappings
			}

			this.field = newProps.activeField
		}
	}

	mappingFoundMessage() {
		const { field } = this
		return (
			<React.Fragment>
				Drag {field.appName}
				's "{field.title}" to one of the blinking fields on the{' '}
				{field.__type === 'from' ? 'to' : 'from'} (or click on them) to create a
				connection
			</React.Fragment>
		)
	}

	mappingNotFoundMessage() {
		const { field } = this
		return (
			<React.Fragment>
				Unfortunately {field.appName}
				's "{field.title}" can't be mapped to any field.
			</React.Fragment>
		)
	}

	renderInfo() {
		const { field } = this

		if (!field) {
			return null
		}

		return (
			<div className="mapper__active-field__info">
				{this.potentialMappings.length
					? this.mappingFoundMessage()
					: this.mappingNotFoundMessage()}
			</div>
		)
	}

	render() {
		const className = classnames('mapper__active-field', {
			_active: Boolean(this.props.activeField),
		})
		return <div className={className}>{this.renderInfo()}</div>
	}
}

export default connect(
	createStructuredSelector({
		activeField,
		potentialMappings,
	}),
)(ActiveFieldInfo)

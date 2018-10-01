import React from 'react'
import get from 'lodash/get'
import classnames from 'classnames'

export default class MappingInfo extends React.Component {
	/**
	 * Rerender only in previously unmapped field is mapped - this prevents content
	 * disappearing without a smooth transition when field in unmapped
	 * @param newProps
	 * @returns {boolean}
	 */
	shouldComponentUpdate(newProps) {
		return !Boolean(this.props.field.isMapped) && Boolean(newProps.field.isMapped)
	}

	renderMappingMessage(messages) {
		if (!messages) {
			return null
		}

		return (
			<div className="mapped-item__messages">
				{messages.map((message, index) => (
					<div key={index} className="mapped-item__messages__item">
						{message}
					</div>
				))}
			</div>
		)
	}

	render() {
		const constraintsMessages = get(
			this.props.field,
			'mappingObject.constraintsMessages',
		)

		const className = classnames('mapped-item__info', {
			_constraints: Boolean(get(constraintsMessages, 'length')),
		})

		return (
			<div className={className}>
				<div className="mapped-item__icons">
					<div className="mapped-item__arrow" />
					<div className="mapped-item__icon" />
					<div className="mapped-item__delete" onClick={this.props.deleteMapping} />
				</div>
				{this.renderMappingMessage(constraintsMessages)}
			</div>
		)
	}
}

import React from 'react'
import classnames from 'classnames'
import Draggable from 'client/components/Draggable'
import Dropzone from 'client/components/Dropzone'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/mapper/actions'
import { mapping } from 'client/logic/mapper/selectors'
import get from 'lodash/get'

import './field.scss'

export class Field extends React.Component {
	constructor(props) {
		super(props)
		this.addMapping = this.addMapping.bind(this)
		this.dragStart = this.dragStart.bind(this)
		this.dragEnd = this.dragEnd.bind(this)
		this.deleteMapping = this.deleteMapping.bind(this)
	}

	dragStart() {
		this.props.dragStart(this.props.field)
	}

	dragEnd() {
		this.props.dragEnd(this.props.field)
	}

	addMapping(fromField) {
		this.props.dragEnd(this.props.field)
		this.props.addMapping(fromField, this.props.field)
	}

	deleteMapping() {
		this.props.deleteMapping(this.props.field)
	}

	shouldComponentUpdate(newProps) {
		return (
			newProps.field.isMapped !== this.props.field.isMapped ||
			newProps.isPotentialMapping !== this.props.isPotentialMapping
		)
	}

	renderField() {
		const { title, sample, isMapped } = this.props.field

		const className = classnames('mapper__app__fields__item', { _mapped: isMapped })

		return (
			<div className={className} key={title}>
				<div className="mapper__app__fields__item__title">{title}</div>
				<div className="mapper__app__fields__item__sample">{sample}</div>
				{this.props.field.__type === 'from' && this.renderMappingInfo()}
			</div>
		)
	}

	renderMappingInfo() {
		const { isMapped } = this.props.field
		const constraintsMessages = get(
			this.props.field,
			'mappingObject.constraintsMessages',
		)

		const className = classnames(
			'mapped-item__info',
			{ _active: isMapped },
			{ _constraints: Boolean(get(constraintsMessages, 'length')) },
		)

		return (
			<div className={className}>
				<div className="mapped-item__icons">
					<div className="mapped-item__arrow" />
					<div className="mapped-item__icon" />
					<div className="mapped-item__delete" onClick={this.deleteMapping} />
				</div>
				{this.renderMappingMessage(constraintsMessages)}
			</div>
		)
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

	renderDraggable() {
		return (
			<Draggable
				data={this.props.field}
				onStart={this.dragStart}
				onEnd={this.dragEnd}
			>
				{this.renderField()}
			</Draggable>
		)
	}

	renderDropzone() {
		return <Dropzone onDrop={this.addMapping}>{this.renderField()}</Dropzone>
	}

	render() {
		if (this.props.field.isMapped) {
			return this.renderField()
		}

		return this.props.isPotentialMapping
			? this.renderDropzone()
			: this.renderDraggable()
	}
}

export default connect(
	createStructuredSelector({
		mapping,
	}),
	actions,
)(Field)

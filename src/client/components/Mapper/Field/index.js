import React from 'react'
import classnames from 'classnames'
import ReactDraggable from 'react-draggable'
// import autoBind from 'react-autobind'
import Dropzone from './components/Dropzone/index'
import MappingInfo from './components/MappingInfo/index'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/mapper/actions'
import { mapping, activeField } from 'client/logic/mapper/selectors'
import get from 'lodash/get'

import './field.scss'

const MIN_DRAG_DISTANCE = 25

export class Field extends React.Component {
	constructor(props) {
		super(props)

		this.startDragX = 0
		this.lastDragX = 0
		this.lastDragY = 0

		this.state = { x: 0, y: 0 }
	}

	// TODO: simplify and check if this really helps performance
	shouldComponentUpdate(newProps) {
		const newActiveId = get(newProps, 'activeField._id')
		const oldActiveId = get(this.props, 'activeField._id')
		const fieldId = this.props.field._id

		return (
			newProps.field.isMapped !== this.props.field.isMapped || // field was mapped or unmapped
			newProps.isPotentialMapping !== this.props.isPotentialMapping || // potential mapping changed
			(oldActiveId === fieldId && newActiveId !== fieldId) || // current field was active, but now it's not
			(oldActiveId !== fieldId && newActiveId === fieldId) // current field wasn't active, but not it is
		)
	}

	onDropZoneMounted = rect => {
		this.props.addDropZone({ rect, field: this.props.field })
	}

	// this will also work as onClick event
	dragStart = e => {
		if (this.props.isPotentialMapping) {
			this.props.addMapping(this.props.activeField, this.props.field)
			this.props.clearActiveField()
			// redux's state after calling addMapping and clearActiveField is
			// not updated synchronously, so calling this.props.onChange immediately
			// after will result is stale redux's state being use by client code
			// setTimeout allows for onChange to be called after redux's state updates
			// TODO: figure out the way not to use setTimeout
			setTimeout(() => this.props.onChange && this.props.onChange())
		} else {
			this.startDragX = e.clientX
			this.props.setActiveField(this.props.field)
		}
	}

	onDrag = e => {
		this.lastDragX = get(e, 'touches[0].clientX', e.clientX)
		this.lastDragY = get(e, 'touches[0].clientY', e.clientY)
	}

	dragEnd = e => {
		/**
		 * Item was not dragged, do nothing. This happens when user only clicked on the field
		 * without actually dragging it. Sometime when user click on a field _some_ dragging
		 * happens if he doesn't release mouse immediately, so we check deltaX and treat those
		 * cases as a click, not a drag
		 */
		const deltaX = Math.abs(this.lastDragX - this.startDragX)
		if (this.lastDragX === 0 || this.lastDragY === 0 || deltaX < MIN_DRAG_DISTANCE) {
			return
		}

		// this returns dragged element to it's original position in list
		this.setState({ x: 0, y: 0 })

		this.props.fieldDraggedAndDropped(
			this.props.field,
			this.lastDragX,
			this.lastDragY,
		)

		this.lastDragX = 0
		this.lastDragY = 0

		// TODO: consider removing active status only if mapping was created
		this.props.clearActiveField()
		this.props.onChange && this.props.onChange()
	}

	deleteMapping = () => {
		this.props.clearActiveField()
		this.props.deleteMapping(this.props.field)
		// wait for redux store to be updated properly, without setTimeout
		// onChange is called with redux's stat without latest added mapping
		// TODO: figure out the way not to use setTimeout
		setTimeout(() => this.props.onChange && this.props.onChange())
	}

	render() {
		const {
			field: { isMapped, __type, _id, title, sample },
			activeField,
		} = this.props

		const className = classnames('mapper__app__fields__item', {
			_mapped: isMapped,
			_active: get(activeField, '_id') === _id,
		})

		return (
			<ReactDraggable
				disabled={isMapped}
				data={this.props.field}
				onStart={this.dragStart}
				onStop={this.dragEnd}
				onDrag={this.onDrag}
				defaultClassNameDragging="_dragging"
				position={{ x: this.state.x, y: this.state.y }}
			>
				<div className={className}>
					<div className="mapper__app__fields__item__info">
						<div className="mapper__app__fields__item__title" title={title}>
							{title}
						</div>
						<div className="mapper__app__fields__item__sample">{sample}</div>
					</div>
					{__type === 'from' && (
						<MappingInfo {...this.props} deleteMapping={this.deleteMapping} />
					)}
					{this.props.isPotentialMapping && (
						<Dropzone onMount={this.onDropZoneMounted} />
					)}
				</div>
			</ReactDraggable>
		)
	}
}

export default connect(
	createStructuredSelector({
		activeField,
		mapping,
	}),
	actions,
)(Field)

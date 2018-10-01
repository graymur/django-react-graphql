import React from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import './flip-move.scss'

/**
 * Smooth reorder of children.
 * Wraps all children in additional DOM element, which
 * is absolutely positioned and changes it's "top" CSS property
 * according to a position of a certain element in new array
 * passed to props
 */
export default class FlipMove extends React.Component {
	render() {
		const className = classnames(
			'mapper__app__fields-abs',
			`_${this.props.children.length}`,
		)

		const children = orderByAnotherArray(
			this.props.originalFields,
			this.props.children,
		)

		return (
			<div className={className}>
				{children.map((child, index) => (
					<div
						key={index}
						className={`mapper__app__fields-abs__item _${child.props.__position}`}
					>
						{child}
					</div>
				))}
			</div>
		)
	}
}

const orderByAnotherArray = (orderedArr, unorderedArr) =>
	orderedArr.map(initialElement => {
		const newIndex = unorderedArr.findIndex(
			newElement => initialElement._id === newElement.props.field._id,
		)

		return (
			unorderedArr[newIndex] &&
			React.cloneElement(unorderedArr[newIndex], { __position: newIndex + 1 })
		)
	})

import React from 'react'
import MapperMain from './MapperMain'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/mapper/actions'
import * as selectors from 'client/logic/mapper/selectors'

export class Mapper extends React.Component {
	/**
	 * Mapping can be created by dragging one field onto another and by clicking
	 * one field and then clicking the second. After user click on the first field,
	 * it becomes "active", and fields available for mapping become highlighted.
	 * If after that user clicks not on one of hightlighted fields, but elsewhere,
	 * we want to clear the "active" field and highlighted fields
	 * @param e
	 */
	documentClickHandler = e => {
		if (!e.target.closest('.mapper__app__fields__item')) {
			this.props.clearActiveField()
		}
	}

	escapeKeyHandler = e => {
		if (e.keyCode === 27) {
			this.props.clearActiveField()
		}
	}

	onChange = () => {
		this.props.onChange(this.props.mapping)
	}

	componentDidMount() {
		if (this.props.config !== this.props.initialConfig) {
			// if redux's state is empty, or config passed from parent component is different
			// then the one stored in redux state, fill it with incoming mapper's config,
			// which contains apps info (name, description) and available fields
			this.props.setConfig(this.props.initialConfig, this.props.storedMapping || [])

			if (typeof document !== 'undefined') {
				// clear highlighted fields on click on any element other than "field"
				document.addEventListener('click', this.documentClickHandler)

				// clear highlighted fields on escape key
				document.addEventListener('keydown', this.escapeKeyHandler)
			}
		}
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.documentClickHandler)
		document.removeEventListener('keydown', this.escapeKeyHandler)
	}

	render() {
		const apps = this.props.apps

		if (!apps.length) {
			return null
		}

		return (
			<React.Fragment>
				<MapperMain {...this.props} onChange={this.onChange} />
			</React.Fragment>
		)
	}
}

export default connect(
	createStructuredSelector(selectors),
	actions,
)(Mapper)

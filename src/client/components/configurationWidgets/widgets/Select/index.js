import React from 'react'
import classnames from 'classnames'
import get from 'lodash/get'
// import validateWidgetValue from '../../utils/validate-widget-value'
import validationHOC from '../../utils/validation-hoc'

import './style.scss'

export class Select extends React.Component {
	onChange = e => {
		this.props.onChange(this.props.name, e.target.value)
	}

	componentDidMount() {
		// if value doesn't come from workflow's settings, pass value of the first
		// option, so it's saved if user clicks "Save".
		if (!this.props.value && this.props.autoSetDefault) {
			this.props.onChange(this.props.name, this.refs.select.value)
		}
	}

	renderRefreshButton() {
		return (
			<button
				className="workflow-widget__select__refresh"
				onClick={this.props.refetchConnectorsData}
			>
				Refresh
			</button>
		)
	}

	render() {
		const { id, name, value } = this.props

		const className = classnames(
			'workflow-widget__select styled-select',
			this.props.class,
		)

		return (
			<React.Fragment>
				<select
					ref="select"
					id={id}
					className={className}
					name={name}
					defaultValue={value}
					onChange={this.onChange}
				>
					<option value="">Select</option>
					{getOptions(this.props).map((option, index) => (
						<option value={option.value} key={option.value}>
							{option.text}
						</option>
					))}
				</select>
				{this.props.withRefresh && this.renderRefreshButton()}
			</React.Fragment>
		)
	}
}

// check if select get values from HTTPS call, look in "methods" field
const getOptions = widget =>
	get(widget, 'connectorsFetchedData[0].result') || widget.options || []

// wrap in validation HOC for automatic validation
export default validationHOC(Select)

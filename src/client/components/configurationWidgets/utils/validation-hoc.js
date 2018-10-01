import React from 'react'
import validateWidgetValue from 'client/logic/workflow/utils/validate-widget-value'

/**
 * Simple HOC that auto validates widget's values. Suitable for widgets with simple values.
 * Mode complex widget can implement their own validation logic and not use this HOC
 * @param Component
 */
export default Component =>
	class extends React.Component {
		/**
		 * Enhance onChange method from props with validation
		 * @param name
		 * @param value
		 */
		onChange = (name, value) => {
			this.props.onChange(
				name,
				value,
				validateWidgetValue(value, this.props.validationConfig, name),
			)
		}

		render() {
			return <Component {...this.props} onChange={this.onChange} />
		}
	}

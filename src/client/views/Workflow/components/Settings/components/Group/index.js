import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import AppLogo from 'client/components/AppLogo'
import Widget from '../Widget'
import pick from 'lodash/pick'
import findValidationConfigForWidget from 'client/logic/workflow/utils/find-validation-config-for-widget'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as actions from 'client/logic/workflow/actions'
import * as selectors from 'client/logic/workflow/selectors'

export class Group extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		workflow: PropTypes.object,
	}

	state = { expanded: true }

	toggleExpand = () => {
		this.setState({ expanded: !this.state.expanded })
	}

	onWidgetChange = (name, value, validationErrors) => {
		this.props.setWidgetValue(name, value, validationErrors)
	}

	onSave = () => {
		const widgetsNames = this.props.widgets.map(x => x.name).filter(x => x)

		this.props.onSave({
			appName: this.props.app,
			// this.props.widgetsValues contains values of all widgets
			// from all groups, but we want to save only widgets from
			// current group, so we send only those values
			values: pick(this.props.widgetsValues, widgetsNames),
			groupIndex: this.props.groupIndex,
		})
	}

	render() {
		const {
			label,
			title,
			app,
			widgets,
			workflow,
			validations,
			groupClassName,
			widgetsErrors,
		} = this.props
		const classNames = classnames('workflow-settings__group', groupClassName)
		const wrClassNames = classnames('workflow-settings__group__wr', {
			_active: this.state.expanded,
		})

		const widgetsNames = this.props.widgets.map(x => x.name).filter(x => x)

		return (
			<div className={classNames}>
				<h3 className="workflow-settings__group__type">{label}</h3>
				<div className={wrClassNames}>
					<header
						className="workflow-settings__group__header"
						onClick={this.toggleExpand}
					>
						<AppLogo app={{ name: app }} />
						<h2 className="workflow-settings__group__title">{title}</h2>
					</header>
					{widgets.map((widget, index) => (
						<Widget
							className={this.props.groupClassName}
							saving={this.props.saving}
							onChange={this.onWidgetChange}
							onSave={this.onSave}
							key={index}
							app={app}
							{...widget}
							value={this.props.widgetsValues[widget.name]}
							validationConfig={findValidationConfigForWidget(widget, validations)}
							// validationError={errors[widget.name]}
							// pass all validation errors to it so it can so that, for example, "save"
							// button can be disabled
							validationErrors={pick(widgetsErrors, widgetsNames)}
							workflow={workflow}
						/>
					))}
				</div>
			</div>
		)
	}
}

export default connect(
	createStructuredSelector(selectors),
	actions,
)(Group)

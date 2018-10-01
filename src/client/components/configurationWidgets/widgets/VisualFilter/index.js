import React from 'react'
import PropTypes from 'prop-types'
import connectorMethodProvider from 'client/utils/connector-method-provider'
import Loader from 'client/components/Loader'
import classnames from 'classnames'
import VisualFilterMain from './components/VisualFilterMain'
import filterValuesToWorkflowStep from './utils/filter-values-to-wf-step'
import get from 'lodash/get'
import './style.scss'

export class VisualFilter extends React.Component {
	static propTypes = {
		connectorDataLoading: PropTypes.bool,
		connectorsFetchedData: PropTypes.array,
		config: PropTypes.object.isRequired,
		onChange: PropTypes.func,
	}

	onChange = config => {
		console.log(
			'Filter',
			JSON.stringify(filterValuesToWorkflowStep(config), null, 4),
		)

		this.props.onChange(this.props.name, {
			field: get(config, 'field._id'),
			expression: get(config, 'expression.id'),
			userInput: get(config, 'userInput'),
			wfSteps: [filterValuesToWorkflowStep(config)],
		})
	}

	renderFilter() {
		const { config, connectorsFetchedData, value } = this.props
		const { field, expression, userInput } = this.props.value || {}

		if (!connectorsFetchedData) {
			return null
		}

		const fields = Array.isArray(config.fields)
			? config.fields
			: connectorsFetchedData.find(result => result.method === config.fields.method)
					.result

		if (!fields) {
			return null
		}

		return (
			<VisualFilterMain
				selectedField={field}
				selectedExpression={expression}
				userInput={userInput}
				fields={fields}
				storedConfig={value}
				onChange={this.onChange}
			/>
		)
	}

	render() {
		const { connectorDataLoading } = this.props
		const classNames = classnames('filter-wr', { loading: connectorDataLoading })

		return (
			<div className={classNames}>
				{connectorDataLoading ? <Loader /> : this.renderFilter()}
			</div>
		)
	}
}

const getParams = (requestParams, savedParams) =>
	requestParams.reduce((acc, param) => {
		const paramValue = savedParams[param]

		if (!paramValue) {
			console.log(`${param} is empty`)
			return false
		}

		return acc ? { ...acc, [param]: paramValue } : acc
	}, {})

export default connectorMethodProvider(VisualFilter, props => {
	const { fields, appName } = props.config
	return fields.method
		? [
				{
					method: fields.method,
					params: getParams(
						fields.params || [],
						props.workflow.saved_params[appName] || {},
					),
				},
		  ]
		: []
})

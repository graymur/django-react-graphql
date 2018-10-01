import React from 'react'
import expressions from '../../expressions'
import get from 'lodash/get'

export default class VisualFilterMain extends React.Component {
	constructor(props) {
		super(props)

		const { selectedField, selectedExpression, userInput, fields } = this.props

		const userField = Array.isArray(fields)
			? fields.find(x => x._id === selectedField)
			: {}
		const userExpression = expressions.find(x => x.id === selectedExpression)

		this.state = {
			field: userField || {},
			// set first expression as default so that user doesn't
			// have to interact with select to set a value
			expression: userExpression || expressions[0],
			userInput: userInput || '',
		}
	}

	renderFieldsOption = (field, index) => {
		return (
			<option key={index} value={field._id}>
				{field.title}
			</option>
		)
	}

	renderExpressionOption = (expression, index) => {
		return (
			<option key={index} value={expression.id}>
				{expression.title}
			</option>
		)
	}

	handleFieldChange = e => {
		const field = this.props.fields.find(x => x._id === e.target.value)

		this.setState(
			{
				...this.state,
				field,
			},
			() => this.props.onChange(this.state),
		)
	}

	handleExpressionChange = e => {
		const expression = expressions.find(x => String(x.id) === e.target.value)

		this.setState(
			{
				...this.state,
				expression,
			},
			() => this.props.onChange(this.state),
		)
	}

	handleChange = e => {
		this.setState(
			{
				...this.state,
				[e.target.name]: e.target.value,
			},
			() => this.props.onChange(this.state),
		)
	}

	renderExpressionSelect = () => {
		if (!get(this.state, 'field._id')) {
			return null
		}

		return (
			<label className="workflow-widget visual-filter__element">
				<select
					onChange={this.handleExpressionChange}
					defaultValue={this.state.expression.id}
					className="workflow-widget__select styled-select visual-filter__select"
				>
					{expressions.map(this.renderExpressionOption)}
				</select>
			</label>
		)
	}

	renderValueInput = () => {
		if (!get(this.state, 'field._id') || !get(this.state, 'expression.id')) {
			return null
		}

		return (
			<label className="workflow-widget _input visual-filter__element">
				<input
					type="text"
					name="userInput"
					onChange={this.handleChange}
					defaultValue={this.state.userInput}
				/>
			</label>
		)
	}

	render() {
		if (!Array.isArray(this.props.fields)) {
			return null
		}

		return (
			<React.Fragment>
				<label className="workflow-widget visual-filter__element">
					<select
						onChange={this.handleFieldChange}
						defaultValue={get(this.state, 'field._id')}
						className="workflow-widget__select styled-select visual-filter__select"
					>
						<option>Select field</option>
						{this.props.fields.map(this.renderFieldsOption)}
					</select>
				</label>
				{this.renderExpressionSelect()}
				{this.renderValueInput()}
			</React.Fragment>
		)
	}
}

import React from 'react'

export default class Checkbox extends React.Component {
	constructor(props) {
		super(props)
		this.state = { checked: this.props.checked }
	}

	componentDidMount() {
		if (this.props.autoSetDefault) {
			this.props.onChange(this.props.name, this.props.checked)
		}
	}

	onChange = e => {
		this.setState({ checked: e.target.checked })
		this.props.onChange(this.props.name, e.target.checked)
	}

	render() {
		const { id, name, value, className } = this.props

		return (
			<input
				checked={this.state.checked}
				id={id}
				className={className}
				name={name}
				type="checkbox"
				onChange={this.onChange}
				value={value}
			/>
		)
	}
}

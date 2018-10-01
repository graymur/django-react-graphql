import React from 'react'

export default class Default extends React.Component {
	componentDidMount() {
		if (this.props.autoSetDefault) {
			this.props.onChange(this.props.name, this.props.value)
		}
	}

	onChange = e => {
		this.props.onChange(this.props.name, e.target.value)
	}

	render() {
		const { id, name, type, value } = this.props

		return (
			<input
				id={id}
				className={this.props.className}
				name={name}
				type={type || 'text'}
				onChange={this.onChange}
				defaultValue={value}
			/>
		)
	}
}

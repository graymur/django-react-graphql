import React from 'react'
import Editor from 'react-monaco-editor'
import toJson from 'client/utils/to-json'

export default class MonacoEditor extends React.Component {
	constructor(props) {
		super(props)
		this.state = { code: toJson(this.props.workflow.workflow) }
	}

	componentDidMount() {
		if (this.props.autoSetDefault) {
			this.props.onChange(this.props.name, toJson(this.props.workflow.workflow))
		}
	}

	onChange = (newValue, e) => {
		this.setState({ code: newValue })
		this.props.onChange(this.props.name, newValue)
	}

	render() {
		const options = {
			selectOnLineNumbers: true,
			scrollBeyondLastLine: false,
			mode: { name: 'javascript', json: true },
		}

		const requireConfig = {
			url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
			paths: {
				vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.10.1/min/vs',
			},
		}

		return (
			<React.Fragment>
				<Editor
					height="300"
					value={this.state.code}
					options={options}
					onChange={this.onChange}
					requireConfig={requireConfig}
				/>
			</React.Fragment>
		)
	}
}

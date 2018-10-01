import React from 'react'

export class Workflow extends React.Component {
	render() {
		return (
			<div>
				{this.props.node}
				<pre>{JSON.stringify(this.props, null, 4)}</pre>
			</div>
		)
	}
}

export default Workflow

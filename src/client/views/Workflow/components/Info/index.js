import React from 'react'
import PropTypes from 'prop-types'

import './info.scss'

export default class Info extends React.PureComponent {
	static propTypes = {
		workflow: PropTypes.object,
	}

	render() {
		const { workflow } = this.props
		return (
			<div className="workflow__info">
				<h1 className="workflow__title">{workflow.short_description}</h1>
				<p
					className="workflow__description"
					dangerouslySetInnerHTML={createMarkup(workflow.full_description)}
				/>
			</div>
		)
	}
}

function createMarkup(__html) {
	return { __html }
}

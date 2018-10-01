import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import widgets from 'client/components/configurationWidgets'
import connectorMethodProvider from 'client/utils/connector-method-provider'
import get from 'lodash/get'

export default class Widget extends React.Component {
	static propTypes = {
		node: PropTypes.string,
	}

	constructor(props) {
		super(props)
		this.defaultWidget = defaultComponent(this.props.node)

		const { node, method, workflow, app } = this.props

		this.Component = widgets[node] || this.defaultWidget

		const connectionId = get(workflow.config, `${app}.connect_id`)

		if (method) {
			this.Component = connectorMethodProvider(this.Component, {
				...method,
				params: { connection_id: connectionId },
			})
		}
	}

	render() {
		const { Component } = this
		return this.props.connectorDataLoading ? (
			<Loader />
		) : (
			<Component {...this.props} />
		)
	}
}

const defaultComponent = node => () => <div>Widget not found: {node}</div>

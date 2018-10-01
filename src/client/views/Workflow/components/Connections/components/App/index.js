import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import get from 'lodash/get'
import appLogoUrl from 'client/utils/app-logo-url'
import * as popups from 'client/components/connectionPopups'

export default class App extends React.PureComponent {
	static propTypes = {
		loading: PropTypes.bool,
		workflow: PropTypes.object,
	}

	constructor(props) {
		super(props)

		this.state = {
			popupOpened: false,
		}

		this.PopupComponent = popups[this.props.app.name]

		if (!this.PopupComponent) {
			throw new Error(`PopupComponent for ${this.props.app.name} is not implemented`)
		}
	}

	togglePopup = () => {
		this.setState({ popupOpened: !this.state.popupOpened })
	}

	closePopup = () => {
		this.setState({ popupOpened: false })
	}

	renderConnectButton = (app, title) => {
		const { PopupComponent } = this
		const { popupOpened, establishingConnection } = this.state

		return (
			<React.Fragment>
				<PopupComponent
					active={popupOpened}
					establishingConnection={establishingConnection}
					app={app}
					closePopup={this.closePopup}
				/>
				<button
					className="workflow__connections__list__item__connect"
					onClick={this.togglePopup}
				>
					{title}
				</button>
			</React.Fragment>
		)
	}

	renderNoConnectionBlock = app => {
		return this.renderConnectButton(app, `Connect ${app.full_name}`)
	}

	handleSelect = e => {
		this.props.setConnection(this.props.app, e.target.value)
	}

	renderHasConnectionsBlock = (app, connections) => {
		const activeConnection = this.getActiveConnection() || {}

		return (
			<React.Fragment>
				<select
					defaultValue={activeConnection._id}
					className="styled-select workflow__connections__list__item__account-select"
					onChange={this.handleSelect}
				>
					{!activeConnection._id && (
						<option hidden={true}>Use existing connection</option>
					)}
					{connections.map(item => (
						<option key={item._id || item.id} value={item._id || item.id}>
							{item.label}
						</option>
					))}
				</select>
				{this.renderConnectButton(app, 'Connect another account')}
			</React.Fragment>
		)
	}

	renderHint = app => {
		if (!app.description) {
			return null
		}

		return (
			<div className="workflow__connections__list__item__hint">
				{app.description}
			</div>
		)
	}

	getActiveConnection() {
		const { workflow, app } = this.props
		const activeConnectionId = get(workflow, `config[${app.name}].connect_id`)
		return workflow.connectionObjects.find(x => x && x._id === activeConnectionId)
	}

	render() {
		const { app, workflow } = this.props

		const connections = workflow.connectionObjects.filter(
			x => x && x.name === app.name,
		)
		const isConnected = Boolean(this.getActiveConnection())

		const className = classnames(
			'workflow__connections__list__item',
			`_${app.name}`,
			{ _connected: isConnected },
		)

		return (
			<div className={className} key={app.name}>
				<div className="workflow__connections__list__item__image">
					<span className="app-connected__wr">
						<img src={appLogoUrl(app.name)} />
						{isConnected && <span className="app-connected" />}
					</span>
				</div>
				<div className="workflow__connections__list__item__controls">
					{connections && connections.length
						? this.renderHasConnectionsBlock(app, connections)
						: this.renderNoConnectionBlock(app)}

					{this.renderHint(app)}
				</div>
			</div>
		)
	}
}

import React from 'react'
import classnames from 'classnames'
import Loader from 'client/components/Loader'

export default class extends React.Component {
	state = { opened: false }

	setOpened = opened => {
		this.setState({
			...this.state,
			opened,
		})
	}

	open = () => {
		this.setOpened(true)
	}

	close = () => {
		this.setOpened(false)
	}

	renderModal() {
		const { title, text, onConfirm, sideEffectUnderWay } = this.props
		const className = classnames('modal', { _active: this.state.opened })

		return (
			<div className={className} tabIndex="-1" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header modal-border-orange">
							{title}
							<button
								disabled={sideEffectUnderWay}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-hidden="true"
								onClick={this.close}
							>
								×
							</button>
						</div>
						<div className="modal-body">{text}</div>
						<div className="modal-footer">
							{sideEffectUnderWay && <Loader size={30} />}
							<a
								disabled={sideEffectUnderWay}
								className="main-button _light"
								data-dismiss="modal"
								onClick={this.close}
							>
								Cancel
							</a>
							<button
								disabled={sideEffectUnderWay}
								className="main-button"
								onClick={onConfirm}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			<React.Fragment>
				{this.renderModal()}
				{this.props.render({ openPrompt: this.open })}
			</React.Fragment>
		)
	}
}

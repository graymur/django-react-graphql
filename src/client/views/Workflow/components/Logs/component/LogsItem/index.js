import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import getDetailedInfo from '../utils/get-detailed-sublog-info-html'

export default class LogItem extends React.Component {
	static propTypes = {
		log: PropTypes.object,
		onClick: PropTypes.func,
		className: PropTypes.string,
	}

	state = {
		detailedInfoShown: false,
	}

	toggleDetailedInfo = () => {
		this.setState({
			detailedInfoShown: !this.state.detailedInfoShown,
		})
	}

	renderDetailedInfoRow() {
		const { log } = this.props

		if (!log.data || !this.state.detailedInfoShown) {
			return null
		}

		return (
			<tr className="logs__list__item _info">
				<td colSpan={3}>
					<pre dangerouslySetInnerHTML={createMarkup(getDetailedInfo(log.data))} />
				</td>
			</tr>
		)
	}

	render() {
		const { log, className } = this.props
		const classNames = classnames('logs__list__item', className, {
			'_has-detailed-info': Boolean(log.data),
		})

		const clickHandler = this.props.onClick || this.toggleDetailedInfo

		return (
			<React.Fragment>
				<tr className={classNames} onClick={clickHandler}>
					<td className="logs__list__item__date">{log.date}</td>
					<td className="logs__list__item__message">{log.message}</td>
					<td className="logs__list__item__status">
						<div
							className={`logs__list__item__status__badge _${log.status.toLowerCase()}`}
						>
							{log.status === 'Processed' ? 'Processing' : log.status}
						</div>
					</td>
				</tr>
				{this.renderDetailedInfoRow()}
			</React.Fragment>
		)
	}
}

const createMarkup = __html => ({ __html })

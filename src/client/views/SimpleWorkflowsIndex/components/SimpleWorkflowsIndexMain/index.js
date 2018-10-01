import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import getPageTitle from 'client/utils/get-page-title'
import Apps from 'client/components/AppsPairLogos'
import './styles.scss'
import config from './config'

export default class SimpleWorkflowsIndexMain extends React.Component {
	static propTypes = {
		create: PropTypes.func.isRequired,
		creating: PropTypes.number,
	}

	renderItem = (item, key) => {
		return (
			<div className="swi__list__item" key={key}>
				<Apps apps={item.apps} />
				<div className="swi__list__item__description">{item.description}</div>
				<button
					className="main-button"
					onClick={() => this.props.create(item)}
					disabled={this.props.creating === item.id}
				>
					Create sync
				</button>
			</div>
		)
	}

	render() {
		return (
			<div className="swi">
				<Helmet>
					<title>{getPageTitle('Simple workflows')}</title>
				</Helmet>
				<h1 className="swi__title">Choose Apps to sync</h1>
				<div className="swi__list">{config.map(this.renderItem)}</div>
			</div>
		)
	}
}

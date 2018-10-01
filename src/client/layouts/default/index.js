import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import * as selectors from 'client/logic/shared/selectors'
import * as actions from 'client/logic/shared/actions'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorComponent from './components/ErrorComponent'
import './styles/default.scss'

export class Layout extends React.Component {
	static propTypes = {
		setError: PropTypes.func,
		children: PropTypes.node,
		error: PropTypes.any,
	}

	render() {
		const { children, error } = this.props

		return (
			<div className="main">
				<Header />
				<div className="content container">
					{error ? <ErrorComponent error={error} /> : children}
				</div>
				<Footer />
			</div>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	error: selectors.selectError,
})

export default withRouter(
	connect(
		mapStateToProps,
		actions,
	)(Layout),
)

import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'client/components/Loader/index'
import classnames from 'classnames'

import App from '../App/index'
import ActiveFieldInfo from '../ActiveFieldInfo/index'
import './mapper.scss'

export default class MapperMain extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		onChange: PropTypes.func,
	}

	// TODO: quick and dirty fix to propagate changes to parent component. Refactor.
	handleAutoMappingClick = () => {
		this.props.autoMapping()
		setTimeout(() => this.props.onChange(), 40)
	}

	renderAutoMappingButton() {
		return (
			<button
				className="btn btn-main mapper__auto-button"
				onClick={this.handleAutoMappingClick}
			>
				Map automatically
			</button>
		)
	}

	renderMapper() {
		return (
			<React.Fragment>
				<App
					onChange={this.props.onChange}
					onMap={this.props.onMap}
					info={this.props.apps[0].info}
					originalFields={this.props.apps[0].fields}
					// orderedFields={this.props.fromFieldsOrdered}
					fields={this.props.fromFields}
					key="from"
				/>
				<App
					onChange={this.props.onChange}
					onMap={this.props.onMap}
					info={this.props.apps[1].info}
					originalFields={this.props.apps[1].fields}
					// orderedFields={this.props.toFieldsOrdered}
					fields={this.props.toFields}
					key="to"
				/>
			</React.Fragment>
		)
	}

	render() {
		const { loading } = this.props
		const className = classnames('mapper__container', { loading })

		return (
			<div className="mapper">
				{!loading && this.renderAutoMappingButton()}
				<div className={className}>{loading ? <Loader /> : this.renderMapper()}</div>
			</div>
		)
	}
}

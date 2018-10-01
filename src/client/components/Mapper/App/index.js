import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Fields from '../Fields'
import './app.scss'

export default class App extends React.Component {
	render() {
		const appTitle = get(this.props, 'info.full_name')

		return (
			<div className="mapper__app">
				<h4 className="mapper__app__title">{appTitle}</h4>
				<Fields
					originalFields={this.props.originalFields}
					onMap={this.props.onMap}
					onChange={this.props.onChange}
					fields={this.props.fields}
				/>
			</div>
		)
	}
}

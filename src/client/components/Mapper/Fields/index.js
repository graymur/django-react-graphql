import React from 'react'
import { createStructuredSelector } from 'reselect'
import Field from '../Field/index'
import FlipMove from 'client/components/FlipMove/index'
import { potentialMappings } from 'client/logic/mapper/selectors'
import { connect } from 'react-redux'

import './fields.scss'

export class Fields extends React.Component {
	render() {
		return (
			<FlipMove
				originalFields={this.props.originalFields}
				className="mapper__app__fields"
				duration={200}
				easing="ease-in-out"
			>
				{this.props.fields.map(field => (
					<Field
						key={field._id}
						field={field}
						onChange={this.props.onChange}
						isPotentialMapping={this.props.potentialMappings.includes(field._id)}
					/>
				))}
			</FlipMove>
		)
	}
}

const mapStateToProps = createStructuredSelector({ potentialMappings })

export default connect(mapStateToProps)(Fields)

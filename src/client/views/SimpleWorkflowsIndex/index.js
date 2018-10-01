import React from 'react'
import SimpleWorkflowsIndexMain from './components/WithMutation'
// import { graphql } from 'react-apollo'
// import { appsQuery } from 'client/graphql/queries'

export class Apps extends React.Component {
	render() {
		return <SimpleWorkflowsIndexMain {...this.props.data} />
	}
}

export default Apps

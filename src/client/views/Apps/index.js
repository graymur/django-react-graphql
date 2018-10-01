import React from 'react'
import AppsMain from './components/AppsMain'
import { graphql } from 'react-apollo'
import { appsQuery } from 'client/graphql/queries'

export class Apps extends React.Component {
	render() {
		return <AppsMain {...this.props.data} />
	}
}

export default graphql(appsQuery)(Apps)

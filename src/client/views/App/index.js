import React from 'react'
import AppMain from './components/AppMain'
import { graphql } from 'react-apollo'
import { appQuery } from 'client/graphql/queries'

export class App extends React.Component {
	render() {
		return <AppMain {...this.props.data} />
	}
}

export default graphql(appQuery, {
	options: ownProps => ({ variables: { name: ownProps.match.params.appName } }),
})(App)

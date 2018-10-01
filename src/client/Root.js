import React from 'react'
// import {Switch, Route, BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
// import CSSTransitionGroup from 'react-addons-css-transition-group'
import createStore from 'client/redux/create-store'
import routes from 'client/routes'
import renderRoute from 'client/utils/render-route'
import history from './history'
import { ApolloProvider } from 'react-apollo'
import Layout from 'client/layouts/default'
import AppWrapper from 'client/components/AppWrapper'
import client from 'client/graphql/client'

const store = createStore(window.__INITIAL_STATE__ || {}, history)

const pageTransitionSpeed = 300

// TODO: figure out how to allow navigation in workflow page nav without rerendering whole tree
// Workflow page has subnav - connections/settings/logs. Navigating between them using Link in combination
// with Switch causes whole Switch content to be rerendered, resulting in bad UX. But without switch it's
// unclear how to properly setup 404 page.
export default class RootContainer extends React.Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Provider store={store}>
					<ConnectedRouter history={history}>
						<AppWrapper>
							<Layout>{routes.map(renderRoute)}</Layout>
						</AppWrapper>
					</ConnectedRouter>
				</Provider>
			</ApolloProvider>
		)
	}
}
// export default class RootContainer extends React.Component {
// 	render() {
// 		return (
// 			<ApolloProvider client={client}>
// 				<Provider store={store}>
// 					<ConnectedRouter history={history}>
// 						<Layout>

// 						</Layout>
// 					</ConnectedRouter>
// 				</Provider>
// 			</ApolloProvider>
// 		)
// 	}
// }

const html = document.getElementsByTagName('html')[0]
html.style.setProperty('--page-transition-speed', `${pageTransitionSpeed}ms`)

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Connections from '../Connections'
import Settings from '../Settings'
import Logs from '../Logs'

import * as urls from 'client/urls'

const connectionsUrl = urls.workflowConnections()
const settingsUrl = urls.workflowSettings()
const logsUrl = urls.workflowLogs()

export default props => (
	<Switch>
		<Route path={connectionsUrl} exact={true} render={() => <Connections />} />
		<Route path={settingsUrl} exact={true} render={() => <Settings {...props} />} />
		<Route
			path={logsUrl}
			exact={true}
			render={() => <Logs workflow={props.workflow} />}
		/>
	</Switch>
)

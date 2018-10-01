import React from 'react'
import { Route, Redirect } from 'react-router'
import Index from 'client/views/Index'
import Workflows from 'client/views/Workflows'
import Apps from 'client/views/Apps'
import App from 'client/views/App'
import SimpleWorkflowsIndex from 'client/views/SimpleWorkflowsIndex'

const Workflow =
	process.env.NODE_ENV === 'development'
		? require('client/views/Workflow').default
		: require('client/views/Workflow/loadable-component').default

const BrokermintWfInterface =
	process.env.NODE_ENV === 'development'
		? require('client/views/BrokermintWfInterface').default
		: require('client/views/BrokermintWfInterface/loadable-component').default

// import NotFound from 'client/views/NotFound'

import * as urls from 'client/urls'

const urlBase = process.env.SPA_URL_BASE
const isProd = process.env.NODE_ENV === 'production'

export default [
	{
		path: urls.index() || '/',
		isRegularLink: isProd,
		exact: true,
		component: Index,
		menuTitle: 'Main page',
	},
	{
		path: urls.workflows(isProd),
		isRegularLink: isProd,
		exact: true,
		component: Workflows,
		menuTitle: 'Workflows',
	},
	{
		path: urls.workflow(),
		exact: false,
		component: Workflow,
	},
	{
		path: urls.apps(isProd),
		isRegularLink: isProd,
		exact: true,
		component: Apps,
		menuTitle: 'Apps',
	},
	{
		path: urls.app(),
		exact: true,
		component: App,
	},
	{
		path: `${urlBase}/simple-syncs`,
		exact: true,
		component: SimpleWorkflowsIndex,
		menuTitle: 'Simple Syncs',
	},
	{
		path: `${urlBase}/simple-workflows`,
		exact: true,
		component: () => <Redirect to={`${urlBase}/simple-syncs`} />,
	},
	{
		path: `${urlBase}/brokermint-qbo`,
		exact: true,
		component: BrokermintWfInterface,
	},
	// {
	// 	path: '*',
	// 	exact: true,
	// 	status: 404,
	// 	component: NotFound,
	// },
]

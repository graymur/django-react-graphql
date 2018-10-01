import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import getPageTitle from 'client/utils/get-page-title'
import './index.scss'

const Index = props => (
	<div className="main-page">
		<Helmet>
			<title>{getPageTitle()}</title>
		</Helmet>
		<h1>Welcome to webapp SPA</h1>
	</div>
)

export default Index

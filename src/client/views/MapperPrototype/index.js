import React from 'react'

import Helmet from 'react-helmet'
import getPageTitle from 'client/utils/get-page-title'
import config from './config'

import Mapper from 'client/components/Mapper'

export default class MapperPrototype extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Helmet>
					<title>{getPageTitle('Mapper prototype')}</title>
				</Helmet>
				<Mapper config={config} onChange={() => {}} />
			</React.Fragment>
		)
	}
}

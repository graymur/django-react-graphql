import React from 'react'
import AppLogo from 'client/components/AppLogo/index'
import { connectAppApi } from 'client/urls'

export default ({ connections }) => {
	const hasBM = connections.find(x => x.name === 'cn_bm')
	const hasQBO = connections.find(x => x.name === 'cn_qbo')
	return (
		<div>
			<h2>Before configuring the workflows, please create the connections:</h2>
			{!hasQBO && (
				<a href={connectAppApi('quickbooks_online')}>
					<AppLogo app={{ name: 'cn_qbo', full_name: 'QuickBooks online' }} />
				</a>
			)}
			{!hasBM && (
				<a href={connectAppApi('brokermint')}>
					<AppLogo app={{ name: 'cn_bm', full_name: 'BrokerMint' }} />
				</a>
			)}
		</div>
	)
}

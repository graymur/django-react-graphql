import React from 'react'
import Loadable from 'react-loadable'
import Loading from 'client/components/Loader'

const LoadableComponent = Loadable({
	loader: () => import('./index'),
	loading: Loading,
})

export default class Component extends React.Component {
	render() {
		return <LoadableComponent {...this.props} />
	}
}

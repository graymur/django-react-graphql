import React from 'react'
import classnames from 'classnames'
import Loader from 'client/components/Loader'

export default Component =>
	class extends React.Component {
		render() {
			const loading = this.props.connectorDataLoading

			const className = classnames(
				'workflow-widget',
				this.props['wrapper-class'],
				`_${this.props.node}`,
				loading,
			)

			return loading ? (
				<Loader />
			) : (
				<div className={className}>
					{loading ? <Loader /> : <Component {...this.props} />}
				</div>
			)
		}
	}

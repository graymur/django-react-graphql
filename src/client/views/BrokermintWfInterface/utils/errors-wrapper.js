import React from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

export default inputName => Component => props => {
	const className = classnames('bm-i__item', {
		_invalid: get(props, `errors.${inputName}`),
	})

	return (
		<div className={className}>
			<Component {...props} />
		</div>
	)
}

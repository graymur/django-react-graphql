import React from 'react'
import mutationErrorsToStringsArray from 'client/utils/mutation-errors-to-strings-array'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import get from 'lodash/get'
import appLogoUrl from 'client/utils/app-logo-url'
import * as popups from 'client/components/connectionPopups'

export default error => {
	const strings = mutationErrorsToStringsArray(error)

	if (!strings.length) {
		return null
	}

	return (
		<div className="workflow__connections__errors">
			{errors.map(err => (
				<div className="workflow__connections__errors__item" key={err}>
					{err}
				</div>
			))}
		</div>
	)
}

import 'babel-polyfill'
import 'whatwg-fetch'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './Root'

const root = document.getElementById('react-root')

const renderWithHot = Component => {
	render(
		<AppContainer warnings={Boolean(false)}>
			<Component />
		</AppContainer>,
		root,
	)
}

renderWithHot(Root)

if (module.hot) {
	module.hot.accept('./Root', () => {
		renderWithHot(require('./Root').default)
	})
}

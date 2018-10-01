/* eslint-disable */
import React from 'react'
import renderer from 'react-test-renderer'
import Loader from '../index'

test('should render an <span> tag', () => {
	const component = renderer.create(<Loader />)
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})

test('should have correct width, height and border', () => {
	const component = renderer.create(<Loader size={100} />)
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})

test('should accept additional class name', () => {
	const component = renderer.create(<Loader className={'test-class-name'} />)
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})

import React from 'react'
import renderer from 'react-test-renderer'
import { Group } from '../index'
import defaultProps from './data'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

test('Renders empty option and validation error, submit button disabled', () => {
	const component = renderer.create(<Group {...defaultProps} />)
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})

test("Renders selected option, doesn't render validation option, submit button enabled", () => {
	const props = {
		...defaultProps,
		widgetsValues: { listId: 1 },
		widgetsErrors: { listId: false },
	}

	const component = renderer.create(<Group {...props} />)
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})

test('handles onChange event', () => {
	const setWidgetValue = jest.fn()

	const component = mount(
		<Group {...defaultProps} setWidgetValue={setWidgetValue} />,
	)

	component
		.find('.workflow_select_mailing')
		.simulate('change', { target: { value: '' } })
	component
		.find('.workflow_select_mailing')
		.simulate('change', { target: { value: 2 } })
	expect(setWidgetValue.mock.calls.length).toBe(2)
	// result of call with empty value should have validation error
	expect(setWidgetValue.mock.calls[0]).toEqual([
		'listId',
		'',
		{ code: 1, messageWidgetId: 'list_id-error' },
	])
	// result of call with valid value should not have validation error
	expect(setWidgetValue.mock.calls[1]).toEqual(['listId', 2, false])
})

test('ignored onSave event on disabled "save" button', () => {
	const onSave = jest.fn()

	const component = mount(<Group {...defaultProps} onSave={onSave} />)
	component.find('._save-block .main-button').simulate('click')
	expect(onSave.mock.calls.length).toBe(0)
})

test('ignored onSave event on disabled "save" button', () => {
	const onSave = jest.fn()
	const props = {
		...defaultProps,
		widgetsValues: {
			...defaultProps.widgetsValues,
			listId: 1,
		},
		widgetsErrors: { listId: false },
	}

	const component = mount(<Group {...props} onSave={onSave} />)
	component.find('._save-block .main-button').simulate('click')
	expect(onSave.mock.calls.length).toBe(1)
	expect(onSave.mock.calls[0]).toEqual([
		{ appName: 'cn_mailchimp', values: { listId: 1 }, groupIndex: 0 },
	])
})

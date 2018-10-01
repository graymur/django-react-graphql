/* eslint-disable */
import generate from '../'

test('generate mapping', () => {
	const params = require('./data/config1')
	const result = generate(params.mapping, params.config)

	expect(result).toEqual({
		map: {
			mapping: {
				extensions: {},
				map: {
					email_address: 'email',
					FNAME: 'firstName',
					LNAME: 'lastName',
					POSTCODE: 'zipCode',
					HOMEPHONE: 'home',
					STATUS: 'created',
				},
			},
		},
	})
})

test('generate mapping', () => {
	const params = require('./data/config2')
	const result = generate(params.mapping, params.config)

	expect(result).toEqual({
		map: {
			mapping: {
				extensions: {},
				map: {
					email_address: 'email',
					status: "'subscribed'",
					merge_fields: {
						map: {
							FNAME: 'firstName',
							LNAME: 'lastName',
							POSTCODE: 'zipCode',
							HOMEPHONE: 'home',
							STATUS: 'created',
						},
					},
				},
			},
		},
	})
})

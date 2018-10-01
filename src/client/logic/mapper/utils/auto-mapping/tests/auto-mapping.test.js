const autoMapping = require('../index').default
const fromWithConfig = require('./data/from-fields-with-auto-mapping-config')
const toWithConfig = require('./data/to-fields-with-auto-mapping-config')
const fromWithoutConfig = require('./data/from-fields-without-auto-mapping-config')
const toWithoutConfig = require('./data/to-fields-without-auto-mapping-config')

test('maps based on config', () => {
	const result = autoMapping(fromWithConfig, toWithConfig)
	expect(result).toMatchSnapshot()
})

test('maps based on fields names', () => {
	const result = autoMapping(fromWithoutConfig, toWithoutConfig, {
		matchByFieldsNames: true,
	})
	expect(result).toMatchSnapshot()
})

test('maps both', () => {
	const result = autoMapping(
		[...fromWithConfig, ...fromWithoutConfig],
		[...toWithConfig, ...toWithoutConfig],
		{
			matchByFieldsNames: true,
		},
	)
	expect(result).toMatchSnapshot()
})

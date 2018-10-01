import createMappingObject from './create-mapping-object'

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const shuffle = arr => [...arr].sort(() => 0.5 - Math.random())

export default function randomMapping(fromFields, toFields) {
	const num = getRandomInt(1, Math.min(fromFields.length, toFields.length))
	const fromShuffled = shuffle(fromFields)
	const toShuffled = shuffle(toFields)

	return fromShuffled
		.slice(num)
		.map((field, index) => createMappingObject(field, toShuffled[index]))
}

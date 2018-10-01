import getConstraintsMessages from './constraint-messages'

export default function createMappingObject(fromField, toField) {
	return {
		from: fromField._id,
		to: toField._id,
		constraintsMessages: getConstraintsMessages(fromField, toField).filter(x => x),
	}
}

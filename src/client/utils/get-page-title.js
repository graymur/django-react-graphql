import { DEFAULT_TITLE } from 'client/constants'

export default (title, delimiter = ':') =>
	DEFAULT_TITLE + (title ? `: ${title}` : '')

import logosMap from './logos'
import { image } from 'client/urls'

export default function(appName) {
	return image(logosMap[appName])
}

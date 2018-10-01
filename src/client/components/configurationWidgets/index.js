import wraper from './wraper'
import './widgets.scss'

export default {
	workflow: wraper(require('./widgets/Workflow').default),
	'validation-message': wraper(require('./widgets/ValidationMessage').default),
	'save-block': wraper(require('./widgets/SaveBlock').default),
	select: wraper(require('./widgets/Select').default),
	'select-with-refresh': wraper(require('./widgets/SelectWithRefresh').default),
	header: wraper(require('./widgets/Header').default),
	'support-text': wraper(require('./widgets/SupportText').default),
	input: wraper(require('./widgets/Input').default),
	// 'monaco-editor': wraper(
	// 	require('./widgets/MonacoEditor/loadable-component').default,
	// ),
	'dotloop-select-profile': wraper(
		require('./widgets/DotloopSelectProfile').default,
	),
	'visual-mapping': wraper(require('./widgets/VisualMapping').default),
	'visual-filter': wraper(require('./widgets/VisualFilter').default),
}

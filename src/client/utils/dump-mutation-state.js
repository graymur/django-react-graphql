export default (props, title) => {
	if (process.env.NODE_ENV === 'development' && props.called) {
		title && console.log(title)
		console.log(props)
	}
}

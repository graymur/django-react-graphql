export default name =>
	document.cookie.split(';').reduce(function(acc, el) {
		let [k, v] = el.split('=')
		return { ...acc, [k.trim()]: v }
	}, {})[name]

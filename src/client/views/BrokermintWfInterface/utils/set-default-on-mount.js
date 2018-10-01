import { lifecycle } from 'recompose'

export default (Component, name, value) => {
	return lifecycle({
		componentDidMount() {
			const { inputValues } = this.props
			const curValue = inputValues[name]
			if (!curValue || (Array.isArray(curValue) && curValue.length === 0)) {
				this.props.onInputChange({ target: { name, value } })
			}
		},
	})(Component)
}

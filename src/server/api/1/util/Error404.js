export default class Error404 extends Error {
	constructor(msg, id) {
		super(msg, id)
		this.code = 404
		this.status = 404
	}
}

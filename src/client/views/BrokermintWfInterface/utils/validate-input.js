export default values => {
	const errors = {}

	if (!values.transaction_status) {
		errors.transaction_status = 'Please select transaction status'
	}

	if (!values.product_service) {
		errors.product_service = 'Please select product/service'
	}

	if (!values.commissions_to_track || !values.commissions_to_track.length) {
		errors.commissions_to_track = 'Please select commissions to track'
	}

	if (values.commissions_to_track.includes('tags') && !values.tags) {
		errors.commissions_to_track = 'Please select commissions to track'
	}

	if (!values.objectType) {
		errors.objectType = 'Please select object to create'
	}

	if (values.objectType === 'salesreceipt' && !values.deposit_to) {
		errors.deposit_to = 'Please select deposit to account'
	}

	return Object.keys(errors).length && errors
}

import pick from 'lodash/pick'
import fromPairs from 'lodash/fromPairs'
import toPairs from 'lodash/toPairs'

const getWorkflowName = inputValues => {
	const prefix = 'bm_qbo_'
	const { incomeExpense, itemized, commissions_to_track, objectType } = inputValues

	if (incomeExpense === 'income') {
		return `${prefix}${objectType}_${itemized}`
	}

	if (
		incomeExpense === 'expense' &&
		itemized === 'itemized' &&
		commissions_to_track[0] !== 'tags'
	) {
		return `${prefix}${objectType}_${itemized}_${commissions_to_track[0]}`
	}

	if (
		incomeExpense === 'expense' &&
		itemized === 'not_itemized' &&
		commissions_to_track[0] !== 'tags'
	) {
		return `${prefix}${objectType}_${itemized}`
	}

	if (incomeExpense === 'expense' && commissions_to_track[0] === 'tags') {
		return `${prefix}${objectType}_${itemized}_based_on_tags`
	}
}

const getParams = inputValues => {
	const values = { ...inputValues }
	const { objectType } = inputValues

	values.class =
		values.class === 'specificClass' ? values.specificClass : values.class
	values.location =
		values.location === 'specificLocation'
			? values.specificLocation
			: values.location
	values.customer_name =
		values.customerNameFormat === 'singleCustomer'
			? values.customer
			: values.customerNameFormat
	values.vendor_name =
		values.vendorNameFormat === 'singleVendor'
			? values.vendor
			: values.vendorNameFormat
	values.commissions_to_track =
		values.commissions_to_track[0] === 'tags'
			? [values.tags]
			: values.commissions_to_track

	let qboParams

	if (
		objectType === 'deposit' ||
		objectType === 'invoice' ||
		objectType === 'salesreceipt'
	) {
		qboParams = pick(values, [
			'transaction_status',
			'representing_side',
			'transaction_type',
			'commissions_to_track',
			'object_date',
			'due_date',
			'location',
			'class',
			'customer_name',
			'description',
			'deposit_to',
		])
	}

	if (objectType === 'bill' || objectType === 'expense' || objectType === 'check') {
		qboParams = pick(values, [
			'transaction_status',
			'representing_side',
			'transaction_type',
			'commissions_to_track',
			'customer_name',
			'vendor_name',
			'object_date',
			'due_date',
			'location',
			'product_service',
			'class',
			'description',
			'deposit_to',
		])
	}

	return {
		cn_bm: {
			transaction_status: values.transaction_status,
		},
		cn_qbo: removeStringNull(qboParams),
	}
}

/**
 * Remove fields which have value of string "null"
 * @param values
 * @returns {*}
 */
const removeStringNull = values => {
	return fromPairs(toPairs(values).filter(pair => pair[1] !== 'null'))
}

export default inputValues => ({
	name: getWorkflowName(inputValues),
	shouldBeTurnedOn: true,
	params: getParams(inputValues),
})

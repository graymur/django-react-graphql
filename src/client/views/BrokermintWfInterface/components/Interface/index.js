import React from 'react'
import classnames from 'classnames'
import TransactionStatus from './components/TransactionStatus'
import IncomeExpence from './components/IncomeExpence'
import Itemized from './components/Itemized'
import CommissionToTrackIncomeItemized from './components/CommissionToTrackIncomeItemized'
import CommissionToTrackIncomeNotItemized from './components/CommissionToTrackIncomeNotItemized'
import CommissionToTrackExpenseItemized from './components/CommissionToTrackExpenseItemized'
import CommissionToTrackExpenseNotItemized from './components/CommissionToTrackExpenseNotItemized'
import ObjectTypeIncome from './components/ObjectTypeIncome'
import ObjectTypeExpense from './components/ObjectTypeExpense'
import CustomerName from './components/CustomerName'
import VendorName from './components/VendorName'
import TransactionDate from './components/TransactionDate'
import TransactionDueDate from './components/TransactionDueDate'
import TransactionType from './components/TransactionType'
import RepresentingSide from './components/RepresentingSide'
import DepositTo from './components/DepositTo'
import ProductService from './components/ProductService'
import Description from './components/Description'
import Class from './components/Class'
import LocationForm from './components/LocationForm'
import MissingConnections from './components/MissingConnections'
import ConnectionSelection from './components/ConnectionSelection'
import AppsPairLogos from 'client/components/AppsPairLogos'
import Loader from 'client/components/Loader'
import getNextStateOnValueChange from '../../utils/get-next-state-on-value-change'
import validateInput from '../../utils/validate-input'
import getWorkflowsConfig from '../../utils/get-workflows-config'
import { COMMISSIONS_TO_TRACK_INPUT_NAME } from '../../constants'
import map from 'lodash/map'
import get from 'lodash/get'

const defaultCallback = x => x

const apps = [
	{
		name: 'cn_bm',
		full_name: 'Brokermint',
	},
	{
		name: 'cn_qbo',
		full_name: 'QuickBooks Online',
	},
]

export default class Interface extends React.Component {
	state = {
		existingFromAppConnections: [],
		existingToAppConnections: [],
		inputValues: {
			transaction_status: 'closed',
			incomeExpense: 'income',
			itemized: 'itemized',
			objectType: 'invoice',
			[COMMISSIONS_TO_TRACK_INPUT_NAME]: [
				'award_distribution',
				'shared_income',
				'unshared_income',
			],
		},
	}

	forApps = ['cn_bm', 'cn_qbo']

	onInputChange = ({ target }, cb = defaultCallback) => {
		this.setState(
			currentState => {
				const inputValues = cb({
					...currentState.inputValues,
					...getNextStateOnValueChange(target, currentState),
				})

				return {
					...currentState,
					inputValues,
					// if current state contains error object - update that object,
					// so that if user corrected any error fields, they are not
					// highlighted anymore.
					errors: currentState.errors ? validateInput(inputValues) : null,
				}
			},
			() => console.log(JSON.stringify(this.state.inputValues, null, 4)),
		)
	}

	onSubmit = e => {
		const { inputValues } = this.state

		const errors = validateInput(inputValues)

		if (!errors) {
			const payload = {
				...getWorkflowsConfig(inputValues),
				connectionIds: [this.state.fromAppConnection, this.state.toAppConnection],
			}

			console.log('SUBMITTING VALUES:', JSON.stringify(payload, null, 4))

			this.props.saveValues(payload)
		} else {
			this.setState({
				...this.state,
				errors,
			})

			console.log('INVALID STATE', this.state)
		}
	}

	renderErrors = () => {
		const { errors } = this.state

		if (!errors) {
			return null
		}

		return (
			<div className="bm-i__errors">
				{map(errors, error => (
					<div className="bm-i__errors__item" key={error}>
						{error}
					</div>
				))}
			</div>
		)
	}

	selectConnection = ({ target: { name, value } }) => {
		this.setState({
			...this.state,
			[name]: value,
		})
	}

	componentDidMount() {
		const { connections } = this.props
		const existingFromAppConnections = connections.filter(
			x => x.name === this.forApps[0],
		)
		const existingToAppConnections = connections.filter(
			x => x.name === this.forApps[1],
		)

		this.setState({
			...this.state,
			existingFromAppConnections,
			existingToAppConnections,
			fromAppConnection: get(existingFromAppConnections, '[0]._id'),
			toAppConnection: get(existingToAppConnections, '[0]._id'),
		})
	}

	render() {
		const {
			inputValues,
			errors,
			existingFromAppConnections,
			fromAppConnection,
			existingToAppConnections,
			toAppConnection,
		} = this.state
		const { loading, saving, connections } = this.props
		const onInputChange = this.onInputChange
		const classNames = classnames('bm-i', { loading, _saving: saving })
		const v = inputValues

		if (!existingToAppConnections.length || !existingFromAppConnections.length) {
			return <MissingConnections connections={connections} />
		}

		const defaultProps = {
			onInputChange,
			inputValues,
			errors,
			connectionId: toAppConnection,
		}

		return (
			<div className={classNames}>
				{/*<h1>Connect BrokerMint</h1>*/}

				<AppsPairLogos apps={apps} />

				{this.renderErrors()}

				<div className="bm-i__connections">
					<ConnectionSelection
						app={apps[0]}
						name="fromAppConnection"
						selectConnection={this.selectConnection}
						existingConnections={existingFromAppConnections}
						selectedConnection={fromAppConnection}
					/>
					<ConnectionSelection
						app={apps[1]}
						name="toAppConnection"
						selectConnection={this.selectConnection}
						existingConnections={existingToAppConnections}
						selectedConnection={toAppConnection}
					/>
				</div>

				<div className="workflow-settings__group__wr _active">
					<h3 className="workflow-settings__group__type">BrokerMint</h3>

					<div className="row">
						<div className="col col-sm-4 col-12">
							{/*Choose transaction type to work with*/}
							<TransactionType {...defaultProps} />
						</div>
						<div className="col col-sm-4 col-12">
							{/*Choose representing side to work with*/}
							<RepresentingSide {...defaultProps} />
						</div>
						<div className="col col-sm-4 col-12">
							{/*Choose transactions with which status to pick up*/}
							<TransactionStatus {...defaultProps} />
						</div>
					</div>
				</div>

				{this.renderErrors()}

				<div className="workflow-settings__group__wr _active">
					<h3 className="workflow-settings__group__type">QuickBooks</h3>

					<div className="row">
						<div className="col col-sm-6 col-12">
							<IncomeExpence {...defaultProps} />
						</div>
						<div className="col col-sm-6 col-12">
							{/*Choose what type of income object to create in QuickBooks*/}
							{v.incomeExpense === 'income' && (
								<ObjectTypeIncome {...defaultProps} />
							)}

							{/*Choose what type of expense object to create in QuickBooks*/}
							{v.incomeExpense === 'expense' && (
								<ObjectTypeExpense {...defaultProps} />
							)}
						</div>
					</div>

					<div className="row">
						<div className="col col-sm-12 col-12">
							{/*Choose itemized or not*/}
							<Itemized {...defaultProps} />
						</div>

						<div className="col col-sm-12 col-12">
							{/*If they picked income and itemized*/}
							{v.incomeExpense === 'income' &&
								v.itemized === 'itemized' && (
									<CommissionToTrackIncomeItemized {...defaultProps} />
								)}

							{/*If they picked income and not itemized*/}
							{v.incomeExpense === 'income' &&
								v.itemized === 'not_itemized' && (
									<CommissionToTrackIncomeNotItemized {...defaultProps} />
								)}

							{/*If they picked expense and itemized*/}
							{v.incomeExpense === 'expense' &&
								v.itemized === 'itemized' && (
									<CommissionToTrackExpenseItemized {...defaultProps} />
								)}

							{/*If they picked expense and not itemized*/}
							{v.incomeExpense === 'expense' &&
								v.itemized === 'not_itemized' && (
									<CommissionToTrackExpenseNotItemized {...defaultProps} />
								)}
						</div>
					</div>

					<div className="row">
						<div className="col col-sm-6 col-12">
							{/*Choose a customer name format */}
							<CustomerName {...defaultProps} />
						</div>
						<div className="col col-sm-6 col-12">
							{v.incomeExpense === 'expense' && <VendorName {...defaultProps} />}
						</div>
					</div>
					<div className="row">
						<div className="col col-sm-6 col-12">
							{/*Choose transaction date*/}
							<TransactionDate {...defaultProps} />
						</div>
						<div className="col col-sm-6 col-12">
							{/*Choose due date (available only for Invoice and Bill)*/}
							{(v.objectType === 'invoice' || v.objectType === 'bill') && (
								<TransactionDueDate {...defaultProps} />
							)}
						</div>
					</div>

					<div className="row">
						<div className="col col-sm-6 col-12">
							{/*pick Product/Service (Deposit From) (for expense this is called Expense Account) */}
							<ProductService {...defaultProps} />
						</div>
						<div className="col col-sm-6 col-12">
							{/*pick Deposit To (only available for salesreceipt and deposit, expense, check (don't show for invoice or bill))*/}
							{v.objectType === 'salesreceipt' && <DepositTo {...defaultProps} />}
						</div>
					</div>

					{/*Pick a format for the description. Ideally user should be able to pick what fields to use(StreetAddress, Agent, City, etc) 
				 and also pick what connectors they want inbetween ('-', '/', ',') - this can be seen better in the draw.io drawing*/}
					<Description {...defaultProps} />

					<div className="row">
						<div className="col col-sm-6 col-12">
							{/*Pick a format for class*/}
							<Class {...defaultProps} />
						</div>
						<div className="col col-sm-6 col-12">
							{/*Choose location format*/}
							<LocationForm {...defaultProps} />
						</div>
					</div>
				</div>

				{this.renderErrors()}

				<button
					type="submit"
					onClick={this.onSubmit}
					className="btn btn-primary mt-2 mr-3"
					disabled={Boolean(errors) || saving}
				>
					Submit
				</button>
				{saving && <Loader size={25} />}
			</div>
		)
	}
}

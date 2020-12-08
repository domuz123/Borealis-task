import React, { useState, useRef, useCallback } from 'react'
import Button from '../../Components/Button/Button'
import Dialog from '../../Components/Dialog/Dialog'
import TypeOfCar from '../../Components/Dialog/DialogContent/TypeOfCar'
import Services from '../../Components/Dialog/DialogContent/Services'
import Form from '../../Components/Dialog/DialogContent/Form'
import Toast from '../../Components/Toast/Toast'
import FinalCheck from '../../Components/Dialog/DialogContent/FinalCheck'
import Success from '../../Components/Dialog/DialogContent/SuccessInfo'
import Spinner from '../../Components/Spinner/Spinner'
import LastStepButton from '../../Components/Button/ReusedButtons/LastStepButton'
import NextButton from '../../Components/Button/ReusedButtons/NextButton'
import PrevButton from '../../Components/Button/ReusedButtons/PrevButton'
import ToastContent from '../../Components/ToastContent/ToastWarning'
import {
	showInfoMessage,
	showWarningMessage,
	clearMessage,
} from '../../utils/showMessage'

const Landing = () => {
	const [vouchers] = useState([
		{
			name: 'Tokić123',
			discount: 30,
		},
	])
	const toast = useRef()
	const [spinner, setSpinner] = useState(false)
	const [dialog, setDialog] = useState(false)
	const [steps, setSteps] = useState(0)
	const [category, setCategory] = useState('')
	const [services, setServices] = useState({
		selected: [],
		total: 0,
		voucher: false,
		voucherValid: false,
		voucherValue: '',
		voucherDiscount: null,
		valueWithoutVoucher: null,
		selectedVoucher: {},
	})
	const [formValue, setFormValue] = useState({
		name: '',
		email: '',
		description: '',
		phone: '',
	})
	const [formErros, setFormErros] = useState({})
	const [updateInfoState, setUpdateInfoState] = useState(false)

	const restartState = () => {
		setFormValue({
			name: '',
			email: '',
			description: '',
			phone: '',
		})
		setServices({
			selected: [],
			total: 0,
			voucher: false,
			voucherValid: false,
			voucherValue: '',
			voucherDiscount: null,
			valueWithoutVoucher: null,
		})
		setFormErros({})
		setCategory('')
	}

	const sendRequest = () => {
		setSpinner(true)
		setTimeout(() => {
			setSpinner(false)
			setSteps((s) => s + 1)
		}, 250)
	}
	const validateForm = () => {
		if (handleValidation()) {
			setSteps((s) => s + 1)
		}
	}
	const onCategoryChange = (e) => {
		// select categories and calc total
		let selectedCategories = [...services.selected]

		if (e.checked) {
			selectedCategories.push(e.value)
		} else {
			for (let i = 0; i < selectedCategories.length; i++) {
				const selectedCategory = selectedCategories[i]

				if (selectedCategory.key === e.value.key) {
					selectedCategories.splice(i, 1)
					break
				}
			}
		}

		const total = selectedCategories.reduce((a, b) => a + b.price, 0)
		let whenVoucherInserted = {}
		// if user adds service after voucher is inserted than calculate again total and price without voucher
		if (services.voucherValid) {
			whenVoucherInserted = calcDiscount(total, services.selectedVoucher)
		}
		setServices({
			...services,
			total: services.voucherValid ? whenVoucherInserted.calcTotal : total,
			selected: selectedCategories,
			voucherMoneyDiscount: whenVoucherInserted.discount,
			valueWithoutVoucher: whenVoucherInserted.withoutVoucher,
		})
	}

	const calcDiscount = (total, voucher) => {
		// calc discount, total and price without voucher
		const discount = total * (+voucher.discount / 100)
		const calcTotal = total - discount
		const withoutVoucher = calcTotal + discount
		return {
			discount,
			withoutVoucher,
			calcTotal,
		}
	}
	const showInfo = (detail) => {
		showInfoMessage(detail, toast, 'info')
	}
	const confirmVoucher = () => {
		// check if voucher is on the list of valid vouchers. If not, show the message.
		const v = vouchers.find((s) => s.name === services.voucherValue)
		if (v) {
			const { discount, calcTotal, withoutVoucher } = calcDiscount(
				services.total,
				v
			)
			setServices({
				...services,
				total: calcTotal,
				voucherValid: true,
				voucherDiscount: +v.discount,
				voucherMoneyDiscount: discount,
				valueWithoutVoucher: withoutVoucher,
				selectedVoucher: v,
			})
		} else showInfo('Neispravan kupon')
	}

	const handleInputChange = (e, name) => {
		const cloneForm = { ...formValue }
		const cloneFormErros = { ...formErros }
		cloneForm[name] = e
		cloneFormErros[name] = ''
		setFormValue(cloneForm)
		setFormErros(cloneFormErros)
	}
	// eslint-disable-next-line no-useless-escape
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	const handleValidation = (validateData) => {
		//choose attributes to validate because not all of them are required
		const { name, email, phone } = formValue
		let toValidate = {
			name,
			email,
			phone,
		}
		let errors = {}
		let formIsValid = true

		Object.keys(toValidate).forEach((f) => {
			if (f === 'email' && !re.test(toValidate[f])) {
				errors[f] = 'Neispravan email'
				formIsValid = false
			}
			if (!toValidate[f]) {
				errors[f] = 'Polje je obavezno'
				formIsValid = false
			}
		})
		setFormErros(errors)
		return formIsValid
	}
	const updateInfo = (step) => {
		setSteps(step)
		setUpdateInfoState(true)
	}
	const closeDialog = useCallback(async () => {
		//after dialog is closed restart everything
		setUpdateInfoState(false)
		await setDialog(false)
		setSteps(0)
		clearMessage(toast)
		restartState()
	}, [])

	const goToLastStep = () => {
		if (handleValidation()) setSteps(stepper.length - 2)
	}

	const stepper = [
		{
			content: (
				<TypeOfCar onChange={(e) => setCategory(e.value)} category={category} />
			),
			footer: (
				<div>
					<NextButton
						onClick={() => setSteps((s) => s + 1)}
						disabled={!category}
					/>
					{updateInfoState && <LastStepButton goToLastStep={goToLastStep} />}
				</div>
			),
		},
		{
			content: (
				<Services
					onChange={(e) => onCategoryChange(e)}
					services={services}
					setServices={setServices}
					confirmVoucher={confirmVoucher}
				/>
			),
			footer: (
				<div>
					<PrevButton onClick={() => setSteps((s) => s - 1)} />
					<NextButton
						onClick={() => setSteps((s) => s + 1)}
						disabled={!services.selected.length}
					/>
					{updateInfoState && (
						<LastStepButton
							goToLastStep={goToLastStep}
							disabled={!services.selected.length}
						/>
					)}
				</div>
			),
		},
		{
			content: (
				<Form
					formErros={formErros}
					handleValidation={handleValidation}
					handleInputChange={handleInputChange}
					formValue={formValue}
				/>
			),
			footer: (
				<div>
					<PrevButton onClick={() => setSteps((s) => s - 1)} />
					<NextButton onClick={validateForm} />
					{updateInfoState && <LastStepButton goToLastStep={goToLastStep} />}
				</div>
			),
		},
		{
			content: (
				<FinalCheck
					services={services}
					formValue={formValue}
					category={category}
					updateInfo={updateInfo}
				/>
			),
			footer: (
				<div>
					<PrevButton onClick={() => setSteps((s) => s - 1)} />
					<Button
						onClick={sendRequest}
						label='Pošalji'
						icon='pi pi-check'
						iconPos='right'
					/>
				</div>
			),
		},
		{ content: <Success closeDialog={closeDialog} /> },
	]

	const showConfirm = useCallback(() => {
		// show warning if user closes dialog. Only show it if there is something to save.
		if (category) {
			showWarningMessage(
				toast,
				<ToastContent
					closeDialog={closeDialog}
					clearToast={() => clearMessage(toast)}
				/>
			)
		} else closeDialog()
	}, [category, closeDialog])

	return (
		<div className='landing'>
			<Toast reference={toast} />
			<Dialog
				footer={stepper[steps].footer}
				visible={dialog}
				onHide={steps === stepper.length - 1 ? closeDialog : showConfirm}
				header='Konfigurator servisa'
			>
				{!spinner ? (
					stepper[steps].content
				) : (
					<div className='p-text-center'>
						<Spinner />
					</div>
				)}
			</Dialog>
			<div>
				<div className='p-mb-5'>
					<span>Pritisnite gumb niže kako biste pokrenuli</span>
				</div>
				<div className='p-d-flex p-jc-center'>
					<Button
						label='Pokreni konfigurator'
						className='p-button-raised p-button-secondary p-button-text'
						onClick={() => setDialog(true)}
					/>
				</div>
			</div>
		</div>
	)
}
export default Landing

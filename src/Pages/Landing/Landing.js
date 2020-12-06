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
import LastStepButton from '../../Components/Button/LastStepButton'
import NextButton from '../../Components/Button/NextButton'
import PrevButton from '../../Components/Button/PrevButton'

const Landing = (props) => {
	const [vouchers] = useState([
		{
			name: 'Tokić123',
			discount: 30,
		},
	])
	const toast = useRef()
	const [spinner, setSpinner] = useState(false)
	const [dialog, setDialog] = useState(false)
	const [steps, setSteps] = useState(1)
	const [category, setCategory] = useState('')
	const [services, setServices] = useState({
		selected: [],
		total: 0,
		voucher: false,
		voucherValid: false,
		voucherValue: '',
		voucherDiscount: null,
		valueWithoutVoucher: null,
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
	const previous = () => {
		setSteps((s) => s - 1)
	}

	const next = () => {
		setSteps((s) => s + 1)
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
		const calcTotal = selectedCategories.reduce((a, b) => a + b.price, 0)
		setServices({
			...services,
			total: calcTotal,
			selected: selectedCategories,
		})
	}

	const showInfo = (detail) => {
		toast.current.show({
			severity: 'info',
			summary: 'Obavijest',
			detail,
			life: 3000,
		})
	}
	const confirmVoucher = () => {
		const v = vouchers.find((s) => s.name === services.voucherValue)
		if (v) {
			const discount = services.total * (+v.discount / 100)
			const calcTotal = services.total - discount
			const withoutVoucher = calcTotal + discount
			setServices({
				...services,
				total: calcTotal,
				voucherValid: true,
				voucherDiscount: +v.discount,
				voucherMoneyDiscount: discount,
				valueWithoutVoucher: withoutVoucher,
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

	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	const handleValidation = (validateData) => {
		let toValidate = {
			name: formValue.name,
			email: formValue.email,
			phone: formValue.phone,
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
		setUpdateInfoState(false)
		await setDialog(false)
		setSteps(1)
		toast.current.clear()
		restartState()
	}, [])

	const goToLastStep = () => {
		if (handleValidation()) setSteps(4)
	}

	const renderDialogContent = () => {
		switch (steps) {
			case 2:
				return {
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
							<PrevButton onClick={previous} />
							<NextButton onClick={next} disabled={!services.selected.length} />
							{updateInfoState && (
								<LastStepButton goToLastStep={goToLastStep} />
							)}
						</div>
					),
				}
			case 3:
				return {
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
							<PrevButton onClick={previous} />
							<NextButton onClick={validateForm} />
							{updateInfoState && (
								<LastStepButton goToLastStep={goToLastStep} />
							)}
						</div>
					),
				}
			case 4:
				return {
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
							<PrevButton onClick={previous} />
							<Button
								onClick={sendRequest}
								label='Pošalji'
								icon='pi pi-check'
								iconPos='right'
							/>
						</div>
					),
				}

			case 5:
				return { content: <Success closeDialog={closeDialog} /> }
			default:
				return {
					content: (
						<TypeOfCar
							onChange={(e) => setCategory(e.value)}
							category={category}
						/>
					),
					footer: (
						<div>
							<NextButton onClick={next} disabled={!category} />
							{updateInfoState && (
								<LastStepButton goToLastStep={goToLastStep} />
							)}
						</div>
					),
				}
		}
	}

	const { content, footer } = renderDialogContent()
	const showConfirm = useCallback(() => {
		if (category) {
			toast.current.show({
				severity: 'warn',
				sticky: true,
				content: (
					<div className='p-flex p-flex-column' style={{ flex: '1' }}>
						<div className='p-text-center'>
							<i
								className='pi pi-exclamation-triangle'
								style={{ fontSize: '3rem' }}
							></i>
							<h4>Jeste li sigurni?</h4>
							<p>Ukoliko izgasite dialog svi podaci će biti izgubljeni</p>
						</div>
						<div className='p-grid p-fluid'>
							<div className='p-col-6'>
								<Button
									type='button'
									label='Da'
									className='p-button-success'
									onClick={closeDialog}
								/>
							</div>
							<div className='p-col-6'>
								<Button
									type='button'
									label='Ne'
									className='p-button-secondary'
									onClick={() => toast.current.clear()}
								/>
							</div>
						</div>
					</div>
				),
			})
		} else closeDialog()
	}, [category, closeDialog])

	return (
		<div className='landing'>
			<Toast reference={toast} />
			<Dialog
				footer={footer}
				visible={dialog}
				onHide={steps !== 5 ? showConfirm : closeDialog}
				header='Konfigurator servisa'
			>
				{!spinner ? (
					content
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

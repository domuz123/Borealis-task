import React, { useState, useRef } from 'react'
import Button from '../../Components/Button/Button'
import Dialog from '../../Components/Dialog/Dialog'
import TypeOfCar from '../../Components/Dialog/DialogContent/TypeOfCar'
import Services from '../../Components/Dialog/DialogContent/Services'
import Form from '../../Components/Dialog/DialogContent/Form'
import Toast from '../../Components/Toast/Toast'
import FinalCheck from '../../Components/Dialog/DialogContent/FinalCheck'

const Landing = (props) => {
	const [vouchers] = useState([
		{
			name: 'Tokić123',
			discount: 30,
		},
	])
	const toast = useRef()
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
	const previous = () => {
		setSteps((s) => s - 1)
	}

	console.log(steps)
	const next = () => {
		if (steps === 3 && handleValidation()) setSteps((s) => s + 1)
		else setSteps((s) => s + 1)
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
	const footer = (
		<div>
			{steps > 1 && (
				<Button
					label={'Natrag'}
					onClick={previous}
					icon='pi pi-arrow-left'
					iconPos='left'
				/>
			)}
			<Button
				onClick={next}
				label='Dalje'
				icon='pi pi-arrow-right'
				iconPos='right'
			/>
		</div>
	)
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
		cloneForm[name] = e
		console.log(e, name, cloneForm)
		setFormValue(cloneForm)
	}
	console.log(formValue)
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
			console.log(f)
			if (!toValidate[f]) {
				errors[f] = 'Polje je obavezno'
				formIsValid = false
			}
			if (f === 'email' && !re.test(toValidate[f])) {
				errors[f] = 'Neispravan email'
				formIsValid = false
			}
		})
		setFormErros(errors)
		return formIsValid
	}
	const updateInfo = (step) => {
		setSteps(step)
	}
	return (
		<div className='landing'>
			<Toast reference={toast} />
			<Dialog
				footer={footer}
				visible={dialog}
				onHide={() => setDialog(false)}
				header='Konfigurator servisa'
				label1={'Dalje'}
				label2={'Nazad'}
				onClick1={next}
				onClick2={previous}
				steps={steps}
			>
				{steps === 1 && (
					<TypeOfCar
						onChange={(e) => setCategory(e.value)}
						category={category}
					/>
				)}
				{steps === 2 && (
					<Services
						onChange={(e) => onCategoryChange(e)}
						services={services}
						setServices={setServices}
						confirmVoucher={confirmVoucher}
					/>
				)}
				{steps === 3 && (
					<Form
						formErros={formErros}
						handleValidation={handleValidation}
						handleInputChange={handleInputChange}
						formValue={formValue}
					/>
				)}
				{steps === 4 && (
					<FinalCheck
						services={services}
						formValue={formValue}
						category={category}
						updateInfo={updateInfo}
					/>
				)}
			</Dialog>
			<div>
				<div className='p-mb-5'>
					<span>Pritisnite gumb dolje kako biste pokrenuli</span>
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

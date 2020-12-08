import React from 'react'
import Input from '../../Input/Input'
import TextArea from '../../TextArea/TextArea'
import { InputMask } from 'primereact/inputmask'

const Form = (props) => {
	const inputs = [
		{ name: 'name', placeholder: 'Ime i prezime*', type: 'text' },
		{ name: 'email', placeholder: 'Email adresa*', type: 'text' },
		// { name: 'phone', placeholder: 'Broj telefona*', type: 'number' },
	]

	return (
		<div className='p-col third-step'>
			<div className='step-title'>Korak 3. Vaši kontakt podaci</div>
			<div className='p-fluid p-formgrid p-grid  p-mt-5'>
				{inputs.map(({ type, placeholder, name }, idx) => {
					return (
						<div className='p-field p-col-12 p-md-6' key={idx}>
							<Input
								id={idx}
								type={type}
								placeholder={placeholder}
								value={props.formValue[name]}
								onChange={(e) => props.handleInputChange(e.target.value, name)}
								className={props.formErros[name] && 'p-invalid'}
							/>
							{props.formErros[name] && (
								<small className='p-invalid'>{props.formErros[name]}</small>
							)}
						</div>
					)
				})}
				<div className='p-field p-col-12 p-md-6'>
					<InputMask
						mask='999 999 999?9'
						value={props.formValue.phone}
						onChange={(e) => props.handleInputChange(e.target.value, 'phone')}
						placeholder='Broj telefona*'
						className={props.formErros['phone'] && 'p-invalid'}
						tooltip='Morate unijeti minimalno 9 zanmenki'
					></InputMask>
					{props.formErros['phone'] && (
						<small className='p-invalid'>{props.formErros['phone']}</small>
					)}
				</div>
				<div className='p-field p-col-12 p-md-6'>
					<TextArea
						value={props.formValue.description}
						onChange={(e) =>
							props.handleInputChange(e.target.value, 'description')
						}
						placeholder='Napomena'
					/>
				</div>
			</div>
		</div>
	)
}
export default Form

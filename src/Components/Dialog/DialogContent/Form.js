import React from 'react'
import Input from '../../Input/Input'
import TextArea from '../../TextArea/TextArea'

const Form = (props) => {
	const inputs = [
		{ name: 'name', placeholder: 'Ime i prezime*', type: 'text' },
		{ name: 'email', placeholder: 'Email adresa*', type: 'text' },
		{ name: 'phone', placeholder: 'Broj telefona*', type: 'text' },
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

import React from 'react'
import RadioButton from '../../RadioButton/RadioButton'

const TypeOfCar = (props) => {
	const categories = [
		{ name: 'Pegout', key: 'Pegout' },
		{ name: 'Volkswagen', key: 'Volkswagen' },
		{ name: 'Citroen', key: 'Citroen' },
		{ name: 'Audi', key: 'Audi' },
		{ name: 'Bmw', key: 'Bmw' },
		{ name: 'Seat', key: 'Seat' },
		{ name: 'Alfa Romeo', key: 'Alfa Romeo' },
		{ name: 'Kia', key: 'Kia' },
		{ name: 'Hyundai', key: 'Hyundai' },
		{ name: 'Honda', key: 'Honda' },
		{ name: 'Toyota', key: 'Toyota' },
	]
	return (
		<div className='first-step p-col'>
			<div className='step-title'>
				<strong>Korak 1. Odaberite proizvođača </strong>
			</div>
			<div className='car-type p-mt-5'>
				{categories.map((category) => {
					return (
						<div key={category.key} className='p-field-radiobutton'>
							<RadioButton
								inputId={category.key}
								name='category'
								value={category}
								onChange={props.onChange}
								checked={props.category.key === category.key}
								className='p-m-2'
							/>
							<label htmlFor={category.key}>{category.name}</label>
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default TypeOfCar

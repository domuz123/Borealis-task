import React from 'react'
import Button from '../../Button/Button'
import { format } from '../../../utils/format'

const Form = (props) => {
	console.log(props)

	return (
		<div className='p-col fifth-step'>
			<div className='step-title'>Korak 5. Pregled potvrda i odabira</div>
			<div className='fifth-step_instructions p-mt-2'>
				Molimo vas da još jednom pogledate i potvrdite unesene podakte. Ukoliko
				želite promijeniti neki pod podataka možete pritisnuti gumb za
				uređivanje pored svake od kategorija. Kada ste provjerili i potvrditi
				ispravnost svojih podataka pritisnite gumb pošalji na dnu, za slanje
				upita za servis
			</div>
			<div className='p-grid'>
				<div className='fifth-step_section p-col-6'>
					<div className='fifth-step_info'>
						<h3>Model vozila</h3>{' '}
						<Button
							label='Uredi'
							onClick={() => props.updateInfo(1)}
							className='p-ml-2'
						/>
					</div>
					<div>{props.category.name}</div>
				</div>
				<div className=' p-col-6'>
					<div className='fifth-step_info'>
						<h3>Odabrane usluge</h3>{' '}
						<Button
							label='Uredi'
							onClick={() => props.updateInfo(2)}
							className='p-ml-2'
						/>
					</div>
					<div>
						{props.services.selected.map((s) => (
							<div className='p-mb-2 p-d-flex p-jc-between'>
								<span> {s.name} </span> <span></span>
								{format(s.price) + ' KN'}
							</div>
						))}
						{props.services.voucher && (
							<div className='p-mb-2 p-d-flex p-jc-end'>
								<span> Popust({props.services.voucherDiscount + '%'}):</span>{' '}
								{'-' + format(props.services.voucherMoneyDiscount) + ' KN'}
							</div>
						)}
						<div className='p-mb-2 p-d-flex p-jc-end'>
							<span>Ukupno:</span>{' '}
							<strong> {format(props.services.total) + ' KN'}</strong>
						</div>
					</div>
				</div>
				<div className='p-col-12'>
					<div className='fifth-step_info '>
						<h3>Kontakt podaci</h3>{' '}
						<Button
							label='Uredi'
							onClick={() => props.updateInfo(3)}
							className='p-ml-2'
						/>
					</div>
					<div className='p-grid'>
						<div className='p-col-6 p-d-flex p-jc-between'>
							<span> Ime i prezime: </span> <span> {props.formValue.name}</span>
						</div>
						<div className='p-col-6  p-d-flex p-jc-between'>
							<span> Email adresa:</span> <span> {props.formValue.email} </span>
						</div>
						<div className='p-col-6 p-d-flex p-jc-between'>
							<span>Broj telefona:</span> <span> {props.formValue.phone}</span>
						</div>
						<div className='p-col-6 p-d-flex p-jc-between'>
							<span> Napomena: </span>
							<span>{props.formValue.description || '-'} </span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Form

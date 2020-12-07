import React from 'react'
import { format } from '../../../utils/format'
import UpdateButton from '../../Button/UpdateButton'

const Form = (props) => {
	const selected = props.services.selected.map((s, i) => (
		<div className='p-mb-2 p-d-flex p-jc-between' key={i}>
			<span> {s.key} </span> <span></span>
			{format(s.price) + ' KN'}
		</div>
	))
	const voucher = props.services.voucher && (
		<div className='p-mb-2 p-d-flex p-jc-end'>
			<span> Popust({props.services.voucherDiscount + '%'}):</span>{' '}
			{'-' + format(props.services.voucherMoneyDiscount) + ' KN'}
		</div>
	)

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
			<div className='p-grid p-mt-4'>
				<div className='fifth-step_section p-col-12 p-sm-6'>
					<div className='fifth-step_info'>
						<h2>Model vozila</h2>{' '}
						<UpdateButton onClick={() => props.updateInfo(1)} />
					</div>
					<div>{props.category.name}</div>
				</div>
				<div className='p-col-12 p-sm-6'>
					<div className='fifth-step_info'>
						<h2>Odabrane usluge</h2>{' '}
						<UpdateButton onClick={() => props.updateInfo(2)} />
					</div>
					<div>
						{selected}
						{voucher}
						<div className='p-mb-2 p-d-flex p-jc-end'>
							<span>Ukupno: </span>
							<span className='p-ml-1'>
								{' '}
								<strong> {format(props.services.total) + ' KN'}</strong>
							</span>
						</div>
					</div>
				</div>
				<div className='p-col-12'>
					<div className='fifth-step_info '>
						<h2>Kontakt podaci</h2>{' '}
						<UpdateButton onClick={() => props.updateInfo(3)} />
					</div>
					<div className='p-grid'>
						<div className='p-col-12 p-sm-6 p-d-flex p-jc-between'>
							<span> Ime i prezime: </span>
							<span className='fifth-step_value'> {props.formValue.name}</span>
						</div>
						<div className='p-col-12 p-sm-6  p-d-flex p-jc-between'>
							<span> Email adresa:</span>
							<span> {props.formValue.email} </span>
						</div>
						<div className='p-col-12 p-sm-6 p-d-flex p-jc-between'>
							<span>Broj telefona:</span>{' '}
							<span className='fifth-step_value'> {props.formValue.phone}</span>
						</div>
						<div className='p-col-12 p-sm-6 p-d-flex p-jc-between'>
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

import React from 'react'
import { format } from '../../../utils/format'
import UpdateButton from '../../Button/ReusedButtons/UpdateButton'

const Form = (props) => {
	const selected = props.services.selected.map((s, i) => (
		<div className='p-mb-2 p-d-flex p-jc-between' key={i}>
			<span> {s.key} </span> <span></span>
			{format(s.price) + ' KN'}
		</div>
	))
	const voucher = props.services.voucher && (
		<div className='p-mb-2 p-d-flex p-jc-end'>
			<span> Popust ({props.services.voucherDiscount + '%'}): </span>{' '}
			{'-' + format(props.services.voucherMoneyDiscount) + ' KN'}
		</div>
	)
	// final check order needs to follow the order of the steps
	const arrayOfContent = [
		{
			title: 'Model vozila',
			content: <div> {props.category.name}</div>,
			className: 'fifth-step_section p-col-12 p-sm-6',
		},
		{
			title: 'Odabrane usluge',
			content: (
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
			),
			className: 'p-col-12 p-sm-6',
		},
		{
			title: 'Kontakt podaci',
			content: (
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
						<span> Napomena: </span>{' '}
						<span>{props.formValue.description || '-'} </span>
					</div>
				</div>
			),
			className: 'p-col-12',
		},
	]

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
				{arrayOfContent.map((s, i) => {
					return (
						<div className={s.className} key={i}>
							<div className='fifth-step_info'>
								<h2>{s.title}</h2>{' '}
								<UpdateButton onClick={() => props.updateInfo(i)} />
							</div>
							<div>{s.content}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default Form

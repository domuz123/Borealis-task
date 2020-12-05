import React from 'react'
import CheckBox from '../../CheckBox/CheckBox'
import InputGroup from '../../Input/InputGroup'
import { format } from '../../../utils/format'

const Services = (props) => {
	const categories = [
		{
			name: 'Zamjena ulja i filtera (500kn)',
			key: 'Zamjena ulja i filtera(500kn)',
			price: 500,
		},
		{
			name: 'Promjena pakni (450kn)',
			key: 'Promjena pakni (450kn)',
			price: 450,
		},
		{ name: 'Promjena guma (100kn)', key: 'Promjena guma (100kn)', price: 100 },
		{
			name: 'Servis klima uređaja (299)',
			key: 'Servis klima uređaja (299)',
			price: 299,
		},
		{
			name: 'Balansiranje guma (50kn)',
			key: 'Balansiranje guma (50kn)',
			price: 50,
		},
		{
			name: 'Zamjena ulja na kočnicama (229)',
			key: 'Zamjena ulja na kočnicama (229)',
			price: 229,
		},
	]
	console.log(props, props.services.selected)
	return (
		<div className='p-col second-step'>
			<div className='step-title'>
				<strong> Korak 2. Odaberite jednu ili više usluga za koju ste</strong>
			</div>
			<div className='service-type'>
				{categories.map((category) => {
					return (
						<div key={category.key} className='p-field-radiobutton'>
							<CheckBox
								inputId={category.key}
								name='category'
								value={category}
								onChange={props.onChange}
								checked={props.services.selected.some(
									(item) => item.key === category.key
								)}
								className='p-m-2'
							/>
							<label htmlFor={category.key}>{category.name}</label>
						</div>
					)
				})}
			</div>
			<div className='voucher-field'>
				{!props.services.voucher ? (
					<div
						onClick={() =>
							props.setServices({
								...props.services,
								voucher: true,
							})
						}
					>
						<span className='link-style'> Imam kupon </span>
					</div>
				) : (
					<>
						{!props.services.voucherValid ? (
							<InputGroup
								value={props.services.voucherValue}
								onChange={(e) =>
									props.setServices({
										...props.services,
										voucherValue: e.target.value,
									})
								}
								onClick={props.confirmVoucher}
								icon='pi pi-check'
								className='p-button-success'
								label='Primijeni'
							/>
						) : (
							<div>
								<div className='voucher-field_succes-message p-m-2'>
									Hvala vam, unijeli ste ispravan kupon.
								</div>
								<div className='p-m-2'>
									OSNOVICA: {format(props.services.valueWithoutVoucher) + ' KN'}
								</div>
								<div className='p-m-2'>
									Popust ({props.services.voucherDiscount + '%'}):{' '}
									{'-' + format(props.services.voucherMoneyDiscount) + ' KN'}
								</div>
							</div>
						)}
					</>
				)}
				<div className='voucher-field_total'>
					UKUPNO: <span> {format(props.services.total)} KN </span>
				</div>
			</div>
		</div>
	)
}
export default Services

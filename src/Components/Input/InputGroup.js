import React from 'react'
import Input from './Input'
import Button from '../Button/Button'

const InputGroup = (props) => {
	return (
		<div className='p-inputgroup'>
			<Input
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
			/>

			<Button
				onClick={props.confirmVoucher}
				icon='pi pi-check'
				className='p-button-success'
				label='Primijeni'
				placeholder='Unesite kupon'
			/>
			<Button
				label={'Poništi'}
				onClick={props.closeVoucher}
				icon={'pi pi-times'}
				className={'p-button-warning'}
			/>
		</div>
	)
}
export default InputGroup

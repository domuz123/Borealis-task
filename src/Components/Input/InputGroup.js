import React from 'react'
import Input from './Input'
import Button from '../Button/Button'

const InputGroup = (props) => {
	return (
		<div className='p-inputgroup'>
			<Input value={props.value} onChange={props.onChange} />
			<Button
				label={props.label}
				onClick={props.onClick}
				icon={props.icon}
				className={props.className}
			/>
		</div>
	)
}
export default InputGroup

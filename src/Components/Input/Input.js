import React from 'react'
import { InputText } from 'primereact/inputtext'
const Input = (props) => {
	return (
		<InputText
			value={props.value}
			onChange={props.onChange}
			placeholder={props.placeholder}
			type={props.type}
		/>
	)
}
export default Input

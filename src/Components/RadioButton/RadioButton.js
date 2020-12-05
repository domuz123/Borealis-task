import React from 'react'
import { RadioButton } from 'primereact/radiobutton'
const Select = (props) => {
	return (
		<RadioButton
			value={props.value}
			name={props.name}
			onChange={props.onChange}
			checked={props.checked}
		/>
	)
}
export default Select

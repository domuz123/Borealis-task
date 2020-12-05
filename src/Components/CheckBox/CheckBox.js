import React from 'react'
import { Checkbox } from 'primereact/checkbox'
const PrimeCheckBox = (props) => {
	return (
		<Checkbox
			onChange={props.onChange}
			checked={props.checked}
			value={props.value}
		></Checkbox>
	)
}
export default PrimeCheckBox

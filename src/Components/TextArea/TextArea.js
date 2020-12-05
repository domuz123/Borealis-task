import React from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
const Area = (props) => {
	return (
		<InputTextarea
			rows={5}
			cols={30}
			value={props.value}
			onChange={props.onChange}
			placeholder={props.placeholder}
		/>
	)
}
export default Area

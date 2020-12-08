import React from 'react'
import Button from './Button'
const NextButton = (props) => {
	return (
		<Button
			onClick={props.onClick}
			label='Dalje'
			icon='pi pi-arrow-right'
			iconPos='right'
			disabled={props.disabled}
			className={props.className}
		/>
	)
}
export default NextButton

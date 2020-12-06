import React from 'react'
import Button from './Button'
const LastStep = (props) => {
	return (
		<Button
			label={'Idi na zadnji korak'}
			onClick={props.goToLastStep}
			icon='pi pi-angle-double-right'
			iconPos='right'
			className='p-button-success'
		/>
	)
}
export default LastStep

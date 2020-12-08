import React from 'react'
import Button from './Button'
const UpdateButton = (props) => {
	return (
		<Button
			label='Uredi'
			onClick={props.onClick}
			className='p-ml-3 p-button-sm'
			icon='pi pi-pencil'
		/>
	)
}
export default UpdateButton

import React from 'react'
import Button from './Button'
const PrevButton = (props) => {
	return (
		<Button
			onClick={props.onClick}
			label={'Natrag'}
			icon='pi pi-arrow-left'
			iconPos='left'
		/>
	)
}
export default PrevButton

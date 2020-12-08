import React from 'react'
import Button from '../Button'
import classNames from 'classnames'
const NextButton = (props) => {
	return (
		<Button
			onClick={props.onClick}
			label='Dalje'
			icon='pi pi-arrow-right'
			iconPos='right'
			disabled={props.disabled}
			className={classNames(props.className)}
		/>
	)
}
export default NextButton

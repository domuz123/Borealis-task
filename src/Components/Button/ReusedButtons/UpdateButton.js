import React from 'react'
import Button from '../Button'
import classNames from 'classnames'
const UpdateButton = (props) => {
	return (
		<Button
			label='Uredi'
			onClick={props.onClick}
			className={classNames(props.className, 'p-ml-3 p-button-sm')}
			icon='pi pi-pencil'
		/>
	)
}
export default UpdateButton

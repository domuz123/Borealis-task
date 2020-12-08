import React from 'react'
import Button from '../Button'
import classNames from 'classnames'
const PrevButton = (props) => {
	return (
		<Button
			onClick={props.onClick}
			label={'Natrag'}
			icon='pi pi-arrow-left'
			iconPos='left'
			className={classNames(props.className)}
		/>
	)
}
export default PrevButton

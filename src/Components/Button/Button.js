import React from 'react'
import { Button } from 'primereact/button'

const PrimeButton = (props) => {
	return (
		<Button
			label={props.label}
			icon={props.icon}
			onClick={props.onClick}
			className={props.className}
			iconPos={props.iconPos}
			disabled={props.disabled}
		/>
	)
}
export default PrimeButton

import React from 'react'
import { Button } from 'primereact/button'
import classNames from 'classnames'

const PrimeButton = (props) => {
	return (
		<Button
			label={props.label}
			icon={props.icon}
			onClick={props.onClick}
			className={classNames(
				props.className,
				'p-button-outlined',
				'p-button-raised '
			)}
			iconPos={props.iconPos}
			disabled={props.disabled}
		/>
	)
}
export default PrimeButton

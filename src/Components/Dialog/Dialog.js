import React from 'react'
import { Dialog } from 'primereact/dialog'

const PrimeDialog = (props) => {
	return (
		<Dialog
			onHide={props.onHide}
			footer={props.footer}
			header={props.header}
			visible={props.visible}
			style={{ width: '1000px' }}
		>
			{props.children}
		</Dialog>
	)
}
export default PrimeDialog

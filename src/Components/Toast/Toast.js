import React from 'react'
import { Toast } from 'primereact/toast'

const PrimeToast = (props) => {
	return <Toast ref={props.reference} />
}
export default PrimeToast

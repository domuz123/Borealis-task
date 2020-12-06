import React from 'react'
import Button from '../Button/Button'

const ToastContent = (props) => {
	return (
		<div className='p-flex p-flex-column' style={{ flex: '1' }}>
			<div className='p-text-center'>
				<i
					className='pi pi-exclamation-triangle'
					style={{ fontSize: '3rem' }}
				></i>
				<h4>Jeste li sigurni?</h4>
				<p>Ukoliko izgasite dialog svi podaci će biti izgubljeni</p>
			</div>
			<div className='p-grid p-fluid'>
				<div className='p-col-6'>
					<Button
						type='button'
						label='Da'
						className='p-button-success'
						onClick={props.closeDialog}
					/>
				</div>
				<div className='p-col-6'>
					<Button
						type='button'
						label='Ne'
						className='p-button-secondary'
						onClick={props.clearToast}
					/>
				</div>
			</div>
		</div>
	)
}
export default ToastContent

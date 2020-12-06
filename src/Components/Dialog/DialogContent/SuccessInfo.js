import React from 'react'
import Button from '../../Button/Button'

const SuccessInfo = (props) => {
	return (
		<div className='final-step p-col'>
			<div className='success-info p-mt-5'>
				<div>
					<h2>Vaša prijava uspješno poslana</h2>
				</div>
				<div>
					<span className='p-text-center p-mt-2'>
						Vaša prijava uspješno poslana i zaprimljena. Kontaktirat ćemo vas u
						najkraćem mogućem roku. Hvala vam
					</span>
				</div>
				<div className='p-mt-5'>
					<Button label='Zatvori' onClick={props.closeDialog} />
				</div>
			</div>
		</div>
	)
}
export default SuccessInfo

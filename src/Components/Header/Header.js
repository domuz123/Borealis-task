import React from 'react'
import tokic from '../../images/Tokić.jpg'
const Header = () => {
	return (
		<div className='p-grid header'>
			<div className='p-ml-5 p-d-flex'>
				<div>
					<img
						src={tokic}
						alt='logo'
						className='img-fluid'
						height='90px'
						width='170px'
					/>
				</div>
				<div className='header_text'>
					<h2 className='p-mb-1'> Konfigurator servisa </h2>
					<span>Izračunajte trošak servisa</span>
				</div>
			</div>
		</div>
	)
}
export default Header

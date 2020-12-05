import React from 'react'
import tokic from '../../images/Tokić.jpg'
const Header = (props) => {
	return (
		<div className='p-grid header'>
			<div className='p-ml-5 p-d-flex'>
				<div>
					<img src={tokic} alt='logo' className='img-fluid' height='100px' />
				</div>
				<div className=''>
					<h4> Konfigurator servisa </h4> <h6>Izračunajte trošak seriva</h6>
				</div>
			</div>
		</div>
	)
}
export default Header

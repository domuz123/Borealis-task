import React from 'react'
import Landing from './Pages/Landing/Landing'
import Header from './Components/Header/Header'

const App = () => {
	return (
		<div className='main'>
			<div className='p-col-12'>
				<Header />
			</div>
			<div className='p-col-12'>
				<Landing />
			</div>
		</div>
	)
}

export default App

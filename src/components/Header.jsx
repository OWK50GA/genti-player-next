import React from 'react'
// import logo from '../assets/img/logo.svg'
import UTM from '../utils/UTM'
import Image from 'next/image'


const Header = ({ toggle }) => {
    
    return (
        <div className='d-flex justify-content-between align-items-center '>
            <div className='logo-wrapper'>
                <Image src={'/assets/img/logo.svg'} alt='icon' width={40} height={40} />
            </div>

            <div>
                <button className='get-app-btn btn' onClick={UTM}>Get The App</button>
            </div>


        </div>
    )
}

export default Header
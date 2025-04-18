import React from 'react'
// import authBg from '../../assets/img/authbg.png'
// import logo from '../../assets/img/newLogo.svg'
import Image from 'next/image'


const Layout = ({ children }) => {
    return (
        <div className='auth-layout relative h-screen w-full overflow-hidden flex justify-center items-center'>

            <Image src={'/assets/img/authbg.png'} alt='bg-img' layout='fill' objectFit='cover' priority />
            <div className='inset-0 absolute bg-gradient-to-b from-[#2c2a2a] to-[#000] opacity-90'></div>  
            {/* <div className='auth-bg-img h-[100%] w-[100%] blur-[3px]' > */}
                {/* <img src={'/assets/img/authbg.png'} alt='bg-img' className='bg-img text-center w-100' /> */}
                {/* <Image src={'/assets/img/authbg.png'} alt='bg-img' className='bg-img object-cover text-center w-[100%]' width={1000} height={1000} /> */}
            {/* </div> */}
            <div className='auth-content-wrapper absolute z-[999] flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center w-fit mx-auto'>
                    <div className='logo-wrapper mx-auto'>
                        {/* <img src={logo} className='logo-img' alt='logo-img' /> */}
                        <Image src={'/assets/img/newLogo.svg'} className='logo-img' alt='logo-img' width={80} height={80}/>
                    </div>
                    <div className='form-wrapper w-[100%] h-fit flex items-center justify-center'>
                        {children}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Layout
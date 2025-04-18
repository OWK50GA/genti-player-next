import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const AppLayout = ({ children }) => {
    return (
        <div className='genti-app_wrapper'>
            <div className='flex'>
                <Sidebar />
                <div className='genti-main flex-grow border-l border-l-[#2F2F2F]'>
                    <Header />
                    <div className=''>
                        {children}
                    </div>
                </div>
            </div>



        </div>
    )
}

export default AppLayout
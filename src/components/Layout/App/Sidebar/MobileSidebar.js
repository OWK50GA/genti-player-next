'use client'

import { useState } from 'react'
// import close from '/assets/img/closeSidebar.svg'
// import logo from '/assets/img/logo2.svg'
// import user from '/assets/img/User.svg'
import SidebarMenu from './menu'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie';
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'


const MobileSidebar = ({ show, toggle }) => {
    const [activeTab, setActiveTab] = useState('')
    const pathname = usePathname();
    // const navigate = useNavigate()
    const router = useRouter();
    const getInitials = (fullName) => {
        const allNames = fullName.trim().split(' ');
        const initials = allNames.reduce((acc, curr, index) => {
            if (index === 0 || index === allNames.length - 1) {
                acc = `${acc}${curr.charAt(0).toUpperCase()}`;
            }
            return acc;
        }, '');
        return initials;
    }

    const currentUser = Cookies.get("GENTI_APP_CURRENT_USER") ? JSON.parse(Cookies.get("GENTI_APP_CURRENT_USER")) : null
    const accessToken = Cookies.get("GENTI_APP_TOKEN")

    let is_authorized = false
    if (accessToken) {
        let decoded = jwt_decode(accessToken)
        if (decoded.exp * 1000 < Date.now()) {
            is_authorized = false
        } else {
            is_authorized = true
        }
    } else {
        is_authorized = false
    }

    return (
        <div className={`lg:hidden block h-[100%] w-0 fixed top-0 left-0 bg-[#191919ba] overflow-x-hidden transition duration-500 ${show ? 'w-full' : ''}`}>
            <div className={`lg:hidden w-[75%] px-[16px] py-[60px] h-[100%] bg-[#121212] block`}>
                <div className='flex items-center justify-end mb-3' onClick={toggle}>
                    {/* <img src={close} /> */}
                    <Image src={'/assets/img/closeSidebar.svg'} alt='close' width={40} height={40} />
                </div>
                <div className='mobile-sidebar__wrapper h-[100%] w-0 fixed z-50 top-0 left-0 bg-[#191919ba] overflow-x-hidden transition duration-500'>
                    <div className=''>
                        {/* <img src={logo} alt='genti' /> */}
                        <Image src={'/assets/img/logo2.svg'} alt='genti' width={40} height={40} />
                    </div>
                    <div className='user-details-container no-border-bottom'>
                        {
                            is_authorized ?
                                <div className='unauthorized-wrapper border-b-0 pb-0 flex items-center' role='button' onClick={() => {
                                    router.push('/profile')
                                }}>
                                    <div className='w-[40px] h-[40px] left-[31px] top-[112px] font-[500] text-[12px] flex items-center justify-center'>
                                        {getInitials(currentUser.name)}
                                    </div>
                                    <p className='font-[500] text-[18px] text-[#FDFDFD] mb-0'>
                                        {currentUser.name}
                                    </p>
                                </div> : <>
                                    <div className='px-0 py-[32px] border-b border-b-[#2F2F2F] flex items-center justify-center' role='button' onClick={() => {
                                        router.push('/auth/login')
                                    }}>
                                        <div className='w-[40px] h-[40px] rounded-[50%] bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] flex items-center justify-center'>
                                            {/* <img src={user} alt='unauthorized-wrapper__img' /> */}
                                            <Image src={'/assets/img/User.svg'} alt='unauthorized-wrapper__img' width={40} height={40} />
                                        </div>
                                        <p className='font-[500] text-[18px] text-[#FDFDFD] mb-0'>
                                            Login/Signup
                                        </p>
                                    </div>
                                </>
                        }

                    </div>
                    <div className='mt-[33px] px-[14px] py-0 relative'>

                        {SidebarMenu.map((el, i) => {

                            const currentRoute = pathname.split('/')[-1]
                            const isActive = currentRoute === el.link

                            return (
                                <Link href={`/${el.link}`} key={i}
                                    // onClick={() => {
                                    //     setActiveTab(el.link)
                                    // }}
                                    className={`${isActive ? 'bg-gradient-to-tr from-[#5F42E2] to-[#9B42C0] rounded-[5px] py-[11px]' : 'decoration-0'}`}
                                >
                                    <div className={`flex items-center px-3 mb-4 ml-[40px] `}>
                                        <div>
                                            {activeTab === (`${el.link}`) || activeTab === (`/${el.link}`) ?

                                                <img src={el.icon} alt='icon' /> :
                                                <img src={el.inactiveIcon} alt='icon' />}
                                        </div>
                                        <p className='ml-[14.5px] font-[400] text-15px text-[#8C8C8C] mb-0'>{el.name}</p>
                                    </div>

                                </Link>
                            )
                        }
                            
                        )}

                    </div>
                </div>
            </div>
            {
                is_authorized && <div className='absolute bottom-0 left-[22px] pb-4' role='button'>
                    <div className='flex items-center'>
                        <RiLogoutCircleRLine className='text-red-500' />
                        <p className='text-red-500 mb-0 px-2' onClick={() => {
                            Cookies.remove('GENTI_APP_TOKEN')
                            Cookies.remove('GENTI_APP_CURRENT_USER')
                            router.push('/auth/login')
                        }}>Logout</p>
                    </div>

                </div>
            }

        </div>

    )
}

export default MobileSidebar
'use client'

import { useState } from 'react'
import SidebarMenu from './menu'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie';
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'


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


const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    console.log(pathname)
    const [activeTab, setActiveTab] = useState('')
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
        <div className='min-w-[18%] w-[21.5%] h-[100vh] hidden lg:block'>
            <div className='border-b border-b-[#2F2F2F] h-[80px] flex px-10 justify-start items-center'>
                    {/* <img src={logo} alt='genti' /> */}
                <div className='ml-3'>
                    <Image src={'/assets/img/logo2.svg'} alt='genti' width={80} height={80} />
                </div>
            </div>
            <div className='user-details-container'>
                {
                    !is_authorized ?
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
                        :
                        <div className='px-0 py-[32px] flex items-center justify-center gap-5 border-b border-b-[#2F2F2F]' role='button' onClick={() => {
                            router.push('/profile')
                        }}>
                            <div className='w-[40px] h-[40px] rounded-[50%] font-bold bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] text-[12px] flex items-center justify-center'>
                                {getInitials(currentUser.name)}
                            </div>
                            <p className='font-bold text-[18px] text-[#FDFDFD] mb-0'>
                                {currentUser.name}
                            </p>
                        </div>
                }
                {/* <div className='unauthorized-wrapper d-flex align-items-center justify-content-center' role='button' onClick={() => {
                    navigate('/auth/login')
                }}>
                    <div className='unauthorized-wrapper__img-container d-flex align-items-center justify-content-center'>
                        <img src={user} alt='unauthorized-wrapper__img' />
                    </div>
                    <p className='login-text mb-0'>
                        Login/Signup
                    </p>
                </div> */}
            </div>
            <div className='-ml-8 px-[14px] py-10'>

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
                            <div className={`flex items-center gap-2 px-3 mb-4 ml-[40px] `}>
                                <div>
                                    {isActive ?

                                        <img src={el.icon} alt='icon' /> :
                                        <img src={el.inactiveIcon} alt='icon' />}
                                </div>
                                <p className='font-[400] text-15px text-[#8C8C8C] mb-0'>{el.name}</p>
                            </div>

                        </Link>
                    )
                })}


            </div>
            {
                is_authorized && <div className='fixed bottom-0 left-[22px] pb-4' role='button'>
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

export default Sidebar
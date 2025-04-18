'use client'

import { useState } from 'react'
import UTM from '@/utils/UTM'
// import ham from '/assets/img/ham.svg'
// import logo from '/assets/img/logo2.svg'
import MobileSidebar from './Sidebar/MobileSidebar'
import { useQuery } from 'react-query';
import Client from '@/client'
import useDebounce from '../../Hooks/Debounce'
import Paywall from '../../Titles/Paywall'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Header = () => {
    const router = useRouter();
    const [showSidebar, setShowSidebar] = useState(false)
    const [userCurrentPlan, setUserCurrentPlan] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const debouncedSearchValue = useDebounce(searchValue, 1000)
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


    const [showPaywall, setPaywall] = useState(false)

    const togglePaywall = () => {
        setPaywall(!showPaywall)
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }



    useQuery(['user_plans'], () => Client.subscription.user_plans(), {
        enabled: is_authorized,
        onSuccess: (data) => {
            setUserCurrentPlan(data.data.active_subscription)
            // setSubscriptions(data.data.result)
        }
    })

    useQuery(
        ['search-result', { debouncedSearchValue }],
        () => Client.home.search_titles({
            query: debouncedSearchValue
        }),
        {
            enabled: debouncedSearchValue.length > 0,
            onSuccess: (data) => {
                setSearchResult(data.result)
            },
        }
    )

    return (
        <>
            <header className='hidden lg:flex justify-between px-5 items-center flex-wrap w-full h-[80px] border-b border-b-[#2F2F2F]'>
                <div className='hidden bg-[#FDFDFD] rounded-[100px] px-[27px] py-[11px] w-[50%] relative'>
                    <div className='mr-[7px] lg:mr-[12px]'>
                        {/* <img src={searchIcon} alt='search_icon' /> */}
                        <Image 
                            src={'/assets/img/searchIcon.svg'}
                            alt='searchIcon'
                            width={100} height={100}
                        />
                    </div>
                    <input className='explore-search__content-input' placeholder='Search podcast, audio stories and more'
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {
                        debouncedSearchValue.length > 0 && searchResult.length > 0 &&
                        <div className='search-result-container position-absolute'>
                            {searchResult.map((el, i) =>
                                <div key={i} role='button'
                                    onClick={() => {
                                        router.push(el?.type_id === 3 ? `/title/${el.id}?type=podcast` : `/title/${el.id}`)


                                        // if (el?.membership_type === 0) {
                                        //     navigate(`/explore/player/${el?.id}`)
                                        // } else {
                                        //     if (userCurrentPlan === 0) {
                                        //         togglePaywall()
                                        //     } else {
                                        //         navigate(`/explore/player/${el?.id}`)
                                        //     }
                                        // }
                                    }}
                                // onClick={() => {

                                //     navigate(`/explore/player/${el?.id}`)
                                // }}
                                >
                                    <p className={`search-result__data  ${i === searchResult.length - 1 ? 'last' : ''}`}>
                                        <span className='search-result_count'>{i + 1}</span>
                                        {el?.title}
                                    </p>
                                </div>
                            )}
                        </div>
                    }

                </div>
                <div className='flex justify-end w-full'>
                    {
                        // userCurrentPlan === 0 && !window.location.href.includes('subscription') ? <button className='get-app-btn btn go-premium-btn' onClick={() => {
                        //     navigate('/subscription')
                        // }}>Go premium</button> : null

                    }

                    <button 
                        className='bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] rounded-[100px] font-semibold text-[16px] text-center text-transparent transition-all duration-75 ease-in-out bg-clip-text px-[37px] py-[12px] hover:text-white border border-[#5F42E2]' 
                        onClick={UTM}>Get The App
                    </button>
                </div>

                <Paywall show={showPaywall} toggle={togglePaywall} />

            </header>

            <header className='flex lg:hidden justify-between fixed px-3 items-center mobile-header w-full bg-[#060606] bg-blend-hard-light backdrop-blur-[5px]'>
                <div className='flex items-center'>
                    <div onClick={toggleSidebar}>
                        {/* <img src={ham} alt='icon' /> */}
                        <Image src={'/assets/img/ham.svg'} alt='icon' width={40} height={40} />
                    </div>
                    <div className='mobile-logo__wrapper'>
                        {/* <img src={logo} className='mobile-logo' /> */}
                        <Image src={'/assets/img/logo2.svg'} alt='mobile-logo' className='mobile-logo w-[58px] h-[35px] ml-[10px] mb-[10px]' width={40} height={40}/>
                    </div>
                </div>
                {/* <div >
                    {
                        userCurrentPlan !== null || userCurrentPlan !== [] || window.location.href.includes('subscription') ? <button className='get-app-btn btn explore-section' onClick={UTM}>Get The App</button> :
                            <button className='get-app-btn btn go-premium-btn' onClick={() => {
                                navigate('/subscription')
                            }}>Go premium</button>
                    }

                </div> */}

            </header>

            <MobileSidebar
                show={showSidebar}
                toggle={toggleSidebar}
            />
        </>

    )
}
export default Header
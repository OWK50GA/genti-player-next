'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import Client from '../../client'
import useDebounce from '../../components/Hooks/Debounce'
import Paywall from '../../components/Titles/Paywall'
import { useRouter } from 'next/navigation'
import Image from 'next/image';


const Library = () => {
    const [userCurrentPlan, setUserCurrentPlan] = useState(0)
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('')
    const debouncedSearchValue = useDebounce(searchValue, 1000)
    const [searchResult, setSearchResult] = useState([])

    useQuery({
        queryKey: ['user_plans'], 
        queryFn: () => Client.subscription.user_plans(), 
        onSuccess: (data) => {
            setUserCurrentPlan(data.data.active_subscription)
            // setSubscriptions(data.data.result)
        }
    })
    const [showPaywall, setPaywall] = useState(false)

    const togglePaywall = () => {
        setPaywall(!showPaywall)
    }

    useQuery({
            queryKey: ['search-result', { debouncedSearchValue }],
            queryFn: () => Client.home.search_titles({
                query: debouncedSearchValue
            }),
            enabled: debouncedSearchValue.length > 0,
            onSuccess: (data) => {
                setSearchResult(data.result)
            },
        }
    )

    return (
        <div className='library-page'>
            <div className='d-flex align-items-center justify-content-between position-fixed py-3 search-control__wrapper'>
                <div className='explore-search__content-wrapper d-flex w-100'>
                    <div className='explore-search__content_icon__wrapper'>
                        {/* <img src={searchIcon} alt='search_icon' /> */}
                        <Image src={'/assets/img/searchIcon.svg'} alt='search_icon' width={100} height={100} />
                    </div>
                    <input className='explore-search__content-input' placeholder='Search podcast, audio stories and more'
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <p className='mb-0 cancel-search__text' onClick={() => {
                    router.push(-1)
                }}>Cancel</p>
            </div>
            <div className='search-result__wrapper'>
                {
                    debouncedSearchValue.length > 0 && searchResult.length > 0 ?
                        <div className='mt-4'>
                            {searchResult.map((el, i) =>
                                <div key={i} role='button'
                                    onClick={() => {
                                        if (el?.membership_type === 0) {
                                            router.push(`/title/${el?.id}`)
                                        } else {
                                            if (userCurrentPlan === 0) {
                                                togglePaywall()
                                            } else {
                                                router.push(`/title/${el?.id}`)
                                            }
                                        }
                                    }}
                                >
                                    <p className={`search-result__data  ${i === searchResult.length - 1 ? 'last' : ''}`}>
                                        <span className='search-result_count'>{i + 1}</span>
                                        {el?.title}
                                    </p>
                                </div>
                            )}
                        </div> :
                        <div className='empty-search__result_wrapper d-flex align-items-center justify-content-center'>
                            <p className='empty-search-text'>
                                Search your library
                            </p>

                        </div>
                }

            </div>
            <Paywall show={showPaywall} toggle={togglePaywall} />
        </div>
    )
}

export default Library
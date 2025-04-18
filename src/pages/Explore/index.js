'use client'

import { useState, useEffect } from 'react'
import Flickity from 'react-flickity-component'
import StackedCarousel from '../../components/StackedCardCarousel'
import { useQuery } from 'react-query';
import Client from '../../client'
import Title from '../../components/Titles/General'
import Popular from '../../components/Titles/Popular'
import Loader from '../../components/PageLoader'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { useRouter } from 'next/navigation'
import Image from 'next/image';


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
};
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const flickityOptions = {
    initialIndex: '.is-initial-select',
    contain: true,
    // cellAlign: 'right',
    prevNextButtons: !isMobile,
    pageDots: false,
    // freeScroll: true
    draggable: isMobile,
    groupCells: true,
    lazyLoad: 3,
    imagesLoaded: true

}

const Explore = () => {
    const router = useRouter();
    const [titles, setTitles] = useState([])
    const [rankings, setRankings] = useState([])
    const [trendingTitles, setTrendingTitles] = useState([])
    const [hasPageMounted, setHasPageMounted] = useState(false)


    const { isLoading: fetching } = useQuery(['home_dashboard'], () => Client.home.dashboard(), {
        onSuccess: (data) => {
            setTitles(data.data)
            // setSubscriptions(data.data.result)
        }
    })

    const { isLoading: loading } = useQuery(['home_rankings'], () => Client.home.rankings(), {
        onSuccess: (data) => {
            setRankings(data.data)
            // setSubscriptions(data.data.result)
        }
    })

    const { isLoading: fetching_trending_titles } = useQuery(['trending_titles'], () => Client.home.trending_titles(), {
        onSuccess: (data) => {
            setTrendingTitles(data)
            // setRankings(data.data)
            // setSubscriptions(data.data.result)
        }
    })


    useEffect(() => {
        const timer = setTimeout(() => {
            setHasPageMounted(true)
        }, 5000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            <div className='genti-main-container'>
                {
                    !hasPageMounted || loading || fetching || fetching_trending_titles ?
                        <Loader /> :
                        <div className='genti-explore__page'>
                            <section className='newly-releases-section d-block d-lg-none'>
                                <div className='d-flex d-lg-none explore-search__content-wrapper mb-4 w-100'>
                                    <div className='explore-search__content_icon__wrapper'>
                                        {/* <img src={searchIcon} alt='search_icon' /> */}
                                        <Image src={'/assets/img/searchIcon.svg'} alt='search_icon' width={40} height={40} />
                                    </div>
                                    <input className='explore-search__content-input' placeholder='Search podcast, audio stories and more'
                                        // onChange={(e) => setSearchValue(e.target.value)}
                                        onClick={() => router.push('/library')}
                                    />


                                </div>
                                <div className='d-flex align-items-center justify-content-between section-cta'>
                                    {/* <h3 className='mb-0 newly-releases_text'>Trending titles</h3> */}
                                </div>
                                {/* <div className='new-releases__wrapper scroll-event-wrapper'>

                                    <Swiper
                                        slidesPerView={'auto'}
                                        spaceBetween={4}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        navigation={{
                                            enabled: !isMobile,
                                            nextEl: '.swiper-button-next',
                                            prevEl: '.swiper-button-prev'

                                        }}
                                        modules={[Pagination, Navigation]}
                                        className="mySwiper"
                                    // navigation={{
                                    //     nextEl: '.swiper-button-next',
                                    //     prevEl: '.swiper-button-prev',
                                    // }

                                    // }
                                    >
                                        {
                                            trendingTitles.map(el =>
                                                <SwiperSlide>
                                                    <Popular title={el} />
                                                </SwiperSlide>
                                            )
                                        }
                                        <div className="swiper-button-next px-4"></div>
                                        <div className="swiper-button-prev px-4"></div>
                                    </Swiper>


                                </div> */}
                            </section>

                            {
                                rankings.filter(e => e.category !== 'trending_titles').filter(e => e.category !== 'popular_categories').map((ele, i) =>
                                    <section className='newly-releases-section ' key={i} >
                                        <div className='d-flex align-items-center justify-content-between section-cta'>
                                            <h3 className='mb-0 newly-releases_text'>{ele?.title}</h3>
                                            <p className='view-more__newly-releases_text mb-0' role='button' onClick={() => router.push(`/explore/category/${ele.category}`)}>View more</p>
                                        </div>
                                        <div className='new-releases__wrapper scroll-event-wrapper'>
                                            <Swiper
                                                slidesPerView={'auto'}
                                                spaceBetween={0}
                                                pagination={{
                                                    clickable: true,
                                                }}
                                                navigation={{
                                                    enabled: !isMobile,
                                                    nextEl: '.swiper-button-next',
                                                    prevEl: '.swiper-button-prev'

                                                }}
                                                modules={[Pagination, Navigation]}
                                                className="mySwiper"

                                            >
                                                {
                                                    titles[ele?.category]?.map((el, i) =>
                                                        <SwiperSlide>
                                                            <Title title={el} id={i} />

                                                        </SwiperSlide>

                                                    )
                                                }
                                                <div className="swiper-button-next px-4"></div>
                                                <div className="swiper-button-prev px-4"></div>
                                            </Swiper>
                                        </div>
                                    </section>
                                )
                            }
                        </div>
                }

            </div>


        </>
    )
}

export default Explore
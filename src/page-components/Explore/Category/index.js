'use client'

import React, { useState, useEffect } from 'react'
import Flickity from 'react-flickity-component'
import { Row, Col } from 'reactstrap'
// import arrowIcon from '../../../assets/img/arrow.svg'
import { useQuery } from '@tanstack/react-query';
import Client from '../../../client'
import Title from '../../../components/Titles/General'
import Loader from '../../../components/PageLoader'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

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
    const params = useParams();
    const [titles, setTitles] = useState([])
    const [rankings, setRankings] = useState([])
    const [trendingTitles, setTrendingTitles] = useState([])
    const [hasPageMounted, setHasPageMounted] = useState(false)


    const { slug } = useParams()

    const { isLoading: fetching } = useQuery({
        queryKey: ['home_dashboard'], 
        queryFn: () => Client.home.dashboard(), 
        onSuccess: (data) => {
            setTitles(data.data)
            // setSubscriptions(data.data.result)
        }
    })

    const { isLoading: loading } = useQuery({
        queryKey: ['home_rankings'], 
        queryFn: () => Client.home.rankings(), 
        onSuccess: (data) => {
            setRankings(data.data.filter(el => el.category === slug))
            // setSubscriptions(data.data.result)
        }
    })

    const { isLoading: fetching_trending_titles } = useQuery({
        queryKey: ['trending_titles'], 
        queryFn: () => Client.home.trending_titles(), 
        onSuccess: (data) => {
            setTrendingTitles(data)
            // setRankings(data.data)
            // setSubscriptions(data.data.result)
        }
    })


    useEffect(() => {
        const timer = setTimeout(() => {
            setHasPageMounted(true)
        }, 4000);
        return () => clearTimeout(timer);
    }, []);



    return (
        <>
            <div className='genti-main-container'>
                {
                    !hasPageMounted || loading || fetching || fetching_trending_titles ?
                        <Loader /> :
                        <div className='genti-explore__page category-page'>

                            {
                                rankings.filter(e => e.category !== 'trending_titles').filter(e => e.category !== 'popular_categories').map((ele, i) =>
                                    <section className='newly-releases-section ' key={i} >
                                        <div className='d-flex align-items-center justify-content-between section-cta'>
                                            <div className='d-flex align-items-center'>
                                                <div role='button' onClick={() => {
                                                    router.push('/')
                                                }}>
                                                    <img src={arrowIcon} />
                                                    <Image src={'/assets/img/arrow.svg'} height={40} width={40} alt='arrow' />
                                                </div>
                                                <h3 className='mb-0 newly-releases_text px-2 pt-1'

                                                >{ele?.title}</h3>

                                            </div>
                                            {/* <p className='view-more__newly-releases_text mb-0' role='button'>View more</p> */}
                                        </div>
                                        <div className='new-releases__wrapper scroll-event-wrapper'>
                                            <Row className='g-3'>
                                                {
                                                    titles[ele?.category]?.map((el, i) =>
                                                        <Col xs='6' md='2'>
                                                            <Title title={el} id={i} />

                                                        </Col>
                                                    )
                                                }
                                            </Row>

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
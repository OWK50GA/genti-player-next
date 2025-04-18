import React, { useState, useEffect } from 'react'
import Flickity from 'react-flickity-component'
import { Row, Col } from 'reactstrap'
import AppLayout from '../../../layout/App'
import StackedCarousel from '../../../component/StackedCardCarousel'
import arrowIcon from '../../../assets/img/arrow.svg'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import Client from '../../../client'
import Title from '../../../component/Titles/General'
import Popular from '../../../component/Titles/Popular'
import Loader from '../../../component/PageLoader'
import { useParams } from 'react-router-dom'

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
    const navigate = useNavigate()
    const [titles, setTitles] = useState([])
    const [rankings, setRankings] = useState([])
    const [trendingTitles, setTrendingTitles] = useState([])
    const [hasPageMounted, setHasPageMounted] = useState(false)


    const { slug } = useParams()

    const { isLoading: fetching } = useQuery(['home_dashboard'], () => Client.home.dashboard(), {
        onSuccess: (data) => {
            setTitles(data.data)
            // setSubscriptions(data.data.result)
        }
    })

    const { isLoading: loading } = useQuery(['home_rankings'], () => Client.home.rankings(), {
        onSuccess: (data) => {
            setRankings(data.data.filter(el => el.category === slug))
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
        }, 4000);
        return () => clearTimeout(timer);
    }, []);



    return (
        <AppLayout>
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
                                                    navigate('/')
                                                }}>
                                                    <img src={arrowIcon} />
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
        </AppLayout>
    )
}

export default Explore
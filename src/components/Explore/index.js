import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import ShareOnSocial from 'react-share-on-social'
import Content from './Content'
import Scrollbar from './Scrollbar'
import Loader from '../Loader'
import Player from '../Player'
import { HttpClient } from '../../client/axios';

import { HiStar } from 'react-icons/hi'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import Paywall from '../Titles/Paywall'
import { useQuery } from '@tanstack/react-query';
import Podcast from './Podcast'
import Image from 'next/image'
import { useParams, useSearchParams } from 'next/navigation'




const App = ({ toggle, toggleSubscribe, userPlan }) => {
    const searchParams = useSearchParams();
    const queryParams = new URLSearchParams(searchParams);
    const titleType = queryParams.get('type');


    const params = useParams()

    const { slug } = params



    const userLikedTeaser = JSON.parse(localStorage.getItem('user_liked_teaser'))
    const userPlayedTeaser = JSON.parse(localStorage.getItem('user_played_teaser'))

    const [loading, setLoading] = useState(false)
    const [likedTeaser, setLikedTeaser] = useState(userLikedTeaser)
    const [playedTeaser, setPlayedTeaser] = useState(userPlayedTeaser)
    const [allTeasers, setAllTeasers] = useState([])
    const [selectedTeaser, setSelectedTeaser] = useState(null)
    const [selectedTeaserContent, setSelectedTeaserContent] = useState(null)
    const [selectedEpisode, setSelectedEpisode] = useState(null)
    const [selectedEpisodeName, setSelectedEpisodeName] = useState('')

    const [contentLikes, setContentLikes] = useState(!selectedTeaserContent ? 0 : selectedTeaserContent?.metrics?.like_count)
    const [contentPlays, setContentPlays] = useState(!selectedTeaserContent ? 0 : selectedTeaserContent?.metrics?.play_count)
    const [overflowRef, setOverflowRef] = useState(null)
    const [podcast, setPodcast] = useState([])
    const [activeEpisode, setActiveEpisode] = useState(0)
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [episodes, setEpisodes] = useState([])


    const [showEpisodes, setShowEpisodes] = useState(false)
    const toggleShowEpisodes = () => {
        setShowEpisodes(!showEpisodes)
    }


    const [showPaywall, setShowPaywall] = useState(false)

    const togglePaywall = () => {
        setShowPaywall(!showPaywall)
    }


    function fmtMSS(s) { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s }
    const [waveFunc, setWaveFunc] = useState(null)
    const [playContent, setPlay] = useState(true)

    const [fetching, setFetching] = useState(false)







    const getTitle = async (id) => {
        try {
            setLoading(true)
            const response = await HttpClient.get(`/get-title/${id}`)
            setSelectedTeaserContent(response.data.result[0])
            setFetching(false)
            setLoading(false)


        } catch (err) {
            setFetching(false)
            setLoading(false)

        }
    }

    const getPodcast = async (id) => {
        try {
            setLoading(true)
            const podcastResponse = await HttpClient.get(`/get-podcast-details/${id}`)
            const titleResponse = await HttpClient.get(`/get-title/${id}`)

            setSelectedTeaserContent(titleResponse.data.result[0])
            const reversedPodcast = [...podcastResponse.data.result[0]?.podcast].reverse()
            setPodcast(reversedPodcast)
            setFetching(false)
            setLoading(false)


        } catch (err) {
            setFetching(false)
            setLoading(false)

        }
    }

    const fetchTitleContent = () => {
        if (titleType) {
            getPodcast(slug)
        } else {
            getTitle(slug)
        }
    }


    useQuery({
        queryKey: ['title_content', slug], 
        queryFn: () => fetchTitleContent(), 
        refetchOnWindowFocus: false,
    })



    useEffect(() => {
        // getTitle(slug)
    }, [])





    useEffect(() => {

        if (userPlan?.active_subscription === 1 || selectedTeaserContent?.membership_type === 0) {
            if (!titleType) {
                setSelectedEpisode(selectedTeaserContent?.music[currentEpisodeIndex]?.media?.working_file_name);
                setSelectedEpisodeName(selectedTeaserContent?.music[currentEpisodeIndex]?.episode_name)
                setEpisodes(selectedTeaserContent?.music)
                // content?.podcast_list.length
            } else {
                setSelectedEpisode(podcast[currentEpisodeIndex]?.audio_url);
                setEpisodes(podcast)
                setSelectedEpisodeName(podcast[currentEpisodeIndex]?.podcast_title)
            }
        } else {
            if (selectedTeaserContent?.teasers.length > 0) {
                if (!titleType) {
                    const teaser = selectedTeaserContent?.music.find((episode) => episode.id === selectedTeaserContent?.teasers[currentEpisodeIndex]);
                    const teaserEpisodes = selectedTeaserContent?.music.filter((episode) => selectedTeaserContent?.teasers.includes(episode.id));
                    setEpisodes(teaserEpisodes)
                    setSelectedEpisode(teaser?.media?.working_file_name);
                    setSelectedEpisodeName(teaser?.episode_name)
                    // content?.podcast_list.length
                } else {
                    // const teaser = podcast.find((episode) => episode.id === selectedTeaserContent?.teasers[currentEpisodeIndex]);
                    const filteredArray = podcast.filter(item => selectedTeaserContent?.teasers.includes(item.id));
                    const teaser = filteredArray[currentEpisodeIndex];

                    const teaserEpisodes = podcast.filter((episode) => selectedTeaserContent?.teasers.includes(episode.id));
                    setEpisodes(teaserEpisodes)
                    setSelectedEpisode(teaser?.audio_url);
                    setSelectedEpisodeName(teaser?.podcast_title)
                }
            } else if (selectedTeaserContent?.teasers?.length === 0) {
                setShowPaywall(true)
            }
        }


    }, [selectedTeaserContent, titleType, currentEpisodeIndex])


    return (

        loading ?
            <div className='explore-player-content__wrapper'>
                <Loader />
            </div>
            : <>
                <div className='app-wrapper explore-player-content__wrapper'>
                    <Row className='h-100 gx-0'>
                        <Col sm='12' xxl='9'>
                            <div className='first-section-wrapper'>
                                <div className='content-img-wrapper'>
                                    <img src={selectedTeaserContent?.image_upload?.location_image} alt='content-img' className='content-img' />
                                </div>
                                <div className='content-details '>
                                    <div className='d-block d-md-none mb-4 mobile-image-container'>
                                        <img src={selectedTeaserContent?.image_upload.location_image} alt='epis' />
                                    </div>
                                    <div className='content-name__wrapper'>
                                        <h3 className='content-name mb-0'>{selectedTeaserContent?.title}</h3>
                                        {
                                            selectedEpisode && <p className='content-author-role mb-0'>{selectedEpisodeName}</p>
                                        }
                                    </div>

                                    {
                                        selectedEpisode && <div className=''>

                                            <div className='d-md-flex d-block align-items-center justify-content-between content-ctrl-center mb-3'>
                                                <div className='d-flex align-items-center mb-3'>
                                                    {
                                                        selectedTeaserContent?.author_titles &&
                                                        <div className='content-author-wrapper' >
                                                            <p className='content-author mb-1'>{selectedTeaserContent?.author_titles?.map(el => el?.authors?.name).join(',')}</p>
                                                            <p className='content-author-role mb-0'>Narrator</p>
                                                        </div>
                                                    }

                                                </div>
                                                <div className='section-title-wrapper d-flex d-md-none align-items-center justify-content-between' onClick={toggleShowEpisodes}>
                                                    <div className='d-flex d-md-none align-items-center'>
                                                        <div className='section-icon'>
                                                            <p className='section-title mb-0 pt-1'>Episodes</p>
                                                        </div>
                                                        <div>
                                                            <IoIosArrowDropdownCircle color='#cdcdcd' />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='d-none d-md-flex align-items-center mb-3'>

                                                    {
                                                        selectedTeaserContent?.average_rating &&
                                                        <div className='content-intent-btn d-flex align-items-center'>
                                                            <div className='intent-icon'>
                                                                <HiStar color='#5F42E2' />
                                                            </div>
                                                            <p className='intent-name mb-0'>
                                                                {
                                                                    selectedTeaserContent ? selectedTeaserContent?.average_rating : 0
                                                                }

                                                            </p>

                                                        </div>
                                                    }



                                                    <ShareOnSocial
                                                        textToShare={`I'm listening to ${selectedTeaserContent?.title} on Genti Audio. Check it out and lots more for Free!`}
                                                        link={`${window.location.href}`}
                                                        linkTitle={selectedTeaserContent?.title}
                                                        linkFavicon={selectedTeaserContent?.image_upload?.location_image}
                                                        linkMetaDesc={selectedTeaserContent?.title}
                                                        backdropColor={'rgba(0,0,0,0.8)'}
                                                        sites={[
                                                            'facebook',
                                                            'twitter',
                                                            'whatsapp',
                                                            'reddit',
                                                            'telegram',
                                                            'linkedin',
                                                            'mail',
                                                            'copy (Copy to Clipboard)'
                                                        ]}

                                                    >
                                                        <div className='content-intent-btn d-flex align-items-center' role='button'>
                                                            <div className='intent-icon'>
                                                                <Image src={'/assets/img/share.svg'} alt='icon' width={20} height={20}/>

                                                            </div>
                                                            <p className='intent-name mb-0'>
                                                                share

                                                            </p>

                                                        </div>
                                                    </ShareOnSocial>



                                                </div>




                                            </div>
                                            {/* <div className='waveform-wrapper mb-3'>
                                                <div id="waveform" ></div>
                                            </div> */}
                                            <Player
                                                episode={selectedEpisode}
                                                episodes={episodes}
                                                currentEpisodeIndex={currentEpisodeIndex}
                                                setCurrentEpisodeIndex={setCurrentEpisodeIndex}
                                            />

                                        </div>


                                    }





                                </div>


                                <div className='position-absolute d-block d-md-none mobile-intent-controller'>
                                    <div className='content-intent-btn mb-1'>
                                        <div className={`intent-icon d-flex align-items-center justify-content-center ${likedTeaser.includes(selectedTeaserContent?.id) ? 'love' : "unlike"}`}
                                        // onClick={() => { handleTeaserAction(selectedTeaserContent?.id) }}
                                        >
                                            <HiStar color='#5F42E2' />

                                        </div>
                                        <p className='intent-name mb-0'>
                                            {
                                                selectedTeaserContent ? selectedTeaserContent?.average_rating : 0
                                            }

                                        </p>

                                    </div>

                                    <ShareOnSocial
                                        textToShare={`I'm listening to ${selectedTeaserContent?.title} on Genti Audio. Check it out and lots more for Free!`}
                                        link={`${window.location.href}`}
                                        linkTitle={selectedTeaserContent?.title}
                                        linkFavicon={selectedTeaserContent?.image_upload?.location_image}
                                        linkMetaDesc={selectedTeaserContent?.title}
                                        backdropColor={'rgba(0,0,0,0.8)'}
                                        sites={[
                                            'facebook',
                                            'twitter',
                                            'whatsapp',
                                            'reddit',
                                            'telegram',
                                            'linkedin',
                                            'mail',
                                            'copy (Copy to Clipboard)'
                                        ]}

                                    >
                                        <div className='content-intent-btn mb-1 '>
                                            <div className='intent-icon d-flex align-items-center justify-content-center'>
                                                <Image src={'/assets/img/share.svg'} alt='icon' width={20} height={20}/>

                                            </div>
                                            <p className='intent-name mb-0'>
                                                share

                                            </p>

                                        </div>
                                    </ShareOnSocial>
                                </div>
                            </div>
                        </Col>
                        <Col sm='12' xxl='3' className='px-0'>
                            <div className='second-section-wrapper'>
                                {
                                    titleType ? <Podcast
                                        teasers={allTeasers}
                                        setSelectedTeaser={setSelectedTeaser}
                                        content={selectedTeaserContent}
                                        activeEpisode={selectedEpisode}
                                        selectEpisode={setSelectedEpisode}
                                        waveFunc={waveFunc}
                                        setLikes={setContentLikes}
                                        setPlays={setContentPlays}
                                        toggle={toggle}
                                        setOverflowRef={setOverflowRef}
                                        overflowRef={overflowRef}
                                        setPlay={setPlay}
                                        showEpisodes={showEpisodes}
                                        toggleShowEpisodes={toggleShowEpisodes}
                                        userPlan={userPlan}
                                        togglePaywall={togglePaywall}
                                        setEpisodeName={setSelectedEpisodeName}
                                        podcast={podcast}
                                    /> :
                                        <Content
                                            teasers={allTeasers}
                                            setSelectedTeaser={setSelectedTeaser}
                                            content={selectedTeaserContent}
                                            activeEpisode={selectedEpisode}
                                            selectEpisode={setSelectedEpisode}
                                            waveFunc={waveFunc}
                                            setLikes={setContentLikes}
                                            setPlays={setContentPlays}
                                            toggle={toggle}
                                            setOverflowRef={setOverflowRef}
                                            overflowRef={overflowRef}
                                            setPlay={setPlay}
                                            showEpisodes={showEpisodes}
                                            toggleShowEpisodes={toggleShowEpisodes}
                                            userPlan={userPlan}
                                            togglePaywall={togglePaywall}
                                            setEpisodeName={setSelectedEpisodeName}
                                        />
                                }

                                {
                                    overflowRef && <Scrollbar
                                        overflowRef={overflowRef}
                                    />
                                }


                            </div>
                        </Col>
                    </Row>


                </div>



                <Paywall
                    show={showPaywall}
                    toggle={togglePaywall}
                />
            </>



    )
}

export default App
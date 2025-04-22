import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import ShareOnSocial from 'react-share-on-social'
import Content from './Content'
import Scrollbar from './Scrollbar'
import { Axios } from '../../utils/axios'
import UTM from '../../utils/UTM'
import Loader from '../Loader'
import Player from '../Player'
import { HttpClient } from '../../client/axios';
import Image from 'next/image'







const isAudioDrama = (id) => {
    const arr = [1, 4, 5]
    if (arr.includes(id)) {
        return true;
    }
    else {
        return false
    }
}
const isAudioBook = (id) => {
    const arr = [2]
    if (arr.includes(id)) {
        return true;
    }
    else {
        return false
    }
}
const isPodcast = (id) => {
    const arr = [3]
    if (arr.includes(id)) {
        return true;
    }
    else {
        return false
    }
}


const App = ({ toggle, toggleSubscribe, slug }) => {
    const userLikedTeaser = JSON.parse(localStorage.getItem('user_liked_teaser'))
    const userPlayedTeaser = JSON.parse(localStorage.getItem('user_played_teaser'))

    const [loading, setLoading] = useState(false)
    const [likedTeaser, setLikedTeaser] = useState(userLikedTeaser)
    const [playedTeaser, setPlayedTeaser] = useState(userPlayedTeaser)
    const [allTeasers, setAllTeasers] = useState([])
    const [selectedTeaser, setSelectedTeaser] = useState(null)
    const [selectedTeaserContent, setSelectedTeaserContent] = useState(null)
    const [selectedEpisode, setSelectedEpisode] = useState(null)
    const [contentLikes, setContentLikes] = useState(!selectedTeaserContent ? 0 : selectedTeaserContent?.metrics?.like_count)
    const [contentPlays, setContentPlays] = useState(!selectedTeaserContent ? 0 : selectedTeaserContent?.metrics?.play_count)
    const [overflowRef, setOverflowRef] = useState(null)




    function fmtMSS(s) { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s }
    const [waveFunc, setWaveFunc] = useState(null)
    const [pausePlayRef, setPausePlayRef] = useState(null)
    const [contentDuration, setContentDuration] = useState(null)
    const [playContent, setPlay] = useState(true)

    const [fetching, setFetching] = useState(false)

    const togglePlay = () => {
        setPlay(!playContent)
    }



    //get all teasers
    const getAllTeasers = async () => {
        setLoading(true)
        try {
            const response = await Axios.get('/teasers-list');
            setAllTeasers(response.data.data.result)
            setLoading(false)
        } catch (err) {
            setLoading(false)

        }
    }

    //get single teaser
    const getTeaser = async (id) => {
        setFetching(true)

        try {
            const response = await Axios.get(`/teasers/${id}`);
            setSelectedTeaserContent(response.data.data.result)
            setFetching(false)

        } catch (err) {
            setFetching(false)

        }

    }

    //like-unlike teaser
    const handleTeaserAction = async (id) => {

        if (!likedTeaser.includes(id)) {
            const response = await Axios.post(`/like/${id}`);
            setLikedTeaser(arr => [...arr, id])
            const counter = selectedTeaserContent ? selectedTeaserContent?.metrics?.like_count : 0
            setContentLikes(likes => counter + 1)
            likedTeaser.push(id)
            localStorage.setItem("user_liked_teaser", JSON.stringify(likedTeaser))
        } else if (likedTeaser.includes(id)) {
            const response = await Axios.post(`/unlike/${id}`);
            let arr = [];
            arr = likedTeaser.filter((el) => el !== id);

            setContentLikes(likes => likes - 1)

            setLikedTeaser(arr)
            localStorage.setItem("user_liked_teaser", JSON.stringify(arr))
        }

    }

    const handleTeaserPlay = async (id) => {

        if (!playedTeaser.includes(id)) {
            const response = await Axios.post(`/play/${id}`);
            setPlayedTeaser(arr => [...arr, id])
            const counter = selectedTeaserContent ? selectedTeaserContent?.metrics?.play_count : 0
            setContentPlays(plays => counter + 1)
            // playedTeaser.push(id)
            const arr = playedTeaser;
            arr.push(id)
            localStorage.setItem("user_played_teaser", JSON.stringify(arr))
        } else {

        }

    }


    const handleLanguageFilter = async (id) => {
        try {
            const response = await Axios.get(`/teasers/${selectedTeaserContent.id}/${id}`);
            setSelectedTeaserContent(response.data.data.result)
            setFetching(false)
        } catch (err) {
            setFetching(false)
        }
    }

    const handleShareTeaser = async () => {
        try {
            const response = await Axios.post(`/share/${selectedTeaserContent.id}`);

        } catch (err) {
        }
    }

    const handleVisitTeaser = async () => {
        try {
            const response = await Axios.post(`/visit/${selectedTeaserContent.id}`);

        } catch (err) {
        }
    }


    const getDefaultTeaser = async () => {
        try {
            const response = await Axios.get(`/default-teaser`);
            setSelectedTeaserContent(response.data.data.result)
            setFetching(false)

        } catch (err) {
            setFetching(false)

        }
    }

    const getTitle = async (id) => {
        try {
            const response = await HttpClient.get(`/get-title-web/${id}`);
            setSelectedTeaserContent(response.data.result)
            setFetching(false)

        } catch (err) {
            setFetching(false)

        }
    }


    useEffect(() => {
        getAllTeasers()
    }, [])


    // useEffect(() => {
    //     if (allTeasers.length > 0) {
    //         getTeaser(allTeasers[0].id)
    //     }
    // }, [allTeasers])

    useEffect(() => {
        if (slug) {
            getTitle(slug)
        } else {
            getDefaultTeaser()

        }
    }, [])


    useEffect(() => {
        if (selectedTeaser) {
            getTeaser(selectedTeaser.id)
        }
    }, [selectedTeaser])




    useEffect(() => {
        if (selectedTeaserContent) {
            handleVisitTeaser()
            if (isAudioDrama(selectedTeaserContent?.type_id)) {
                setSelectedEpisode(selectedTeaserContent?.audio_d_episodes[0]?.media?.working_file_name)
            }
            if (isAudioBook(selectedTeaserContent?.type_id)) {


                setSelectedEpisode(selectedTeaserContent?.audio_b_episodes[0]?.media?.working_file_name)

            } if (isPodcast(selectedTeaserContent?.type_id)) {

                setSelectedEpisode(selectedTeaserContent?.podcast_episodes[0]?.audio_url)

            }
            // content?.podcast_list.length
        }
    }, [selectedTeaserContent])



    // const waveDiv = document.querySelector('#waveform')

    useEffect(() => {
        // if (selectedEpisode && waveDiv) {
        //     var linGrad = document.createElement('canvas').getContext('2d').createLinearGradient(0, 0, 1000, 128);
        //     linGrad.addColorStop(0, '#5F42E2');
        //     linGrad.addColorStop(1, '#9B42C0');

        //     var wavesurfer = WaveSurfer.create({
        //         container: '#waveform',
        //         waveColor: '#fff',
        //         progressColor: linGrad,
        //         barWidth: 4,
        //         hideCursor: true,
        //         barGap: 5,
        //         cursorColor: '#5279FB',
        //         cursorWidth: 2,
        //         // backgroundColor:'#1B1B1B'
        //         mediaControls: true,
        //         responsive: true,
        //         plugins: [
        //             cursor_plugin.create({
        //                 showTime: true,
        //                 opacity: 1,
        //                 customShowTimeStyle: {
        //                     'font-weight': '400',
        //                     'font-size': '10.1562px',
        //                     'line- height': '150 %',
        //                     /* or 15px */


        //                     'color': '#515151',
        //                     'padding': '5px',
        //                     'font-size': '10px',
        //                     'background-color': ' rgba(255, 255, 255, 0.85)',
        //                     'backdrop-filter': 'blur(2px)',

        //                     /* Note: backdrop-filter has minimal browser support */

        //                     'border-radius': '20px',
        //                     'border': '#5F42E2 solid 1px',
        //                     'margin': 'auto 9px 7em',
        //                     'z-index': '999'
        //                 }
        //             })
        //         ],
        //         backend: 'MediaElement',
        //         xhr: {
        //             cache: 'default',
        //             mode: 'cors',
        //             headers: [
        //                 { key: "cache-control", value: "no-cache" },
        //                 { key: "pragma", value: "no-cache" }
        //             ]

        //         }


        //     });
        //     // if (wavesurfer.isPlaying()) {
        //     //     wavesurfer.destroy()
        //     //     wavesurfer.unAll()

        //     // }
        //     wavesurfer.stop()
        //     let audio = new Audio();
        //     audio.src = selectedEpisode;

        //     // wavesurfer.load(audio)
        //     // );
        //     wavesurfer.loadMediaElement(audio, peaks.data, true, wavesurfer.getDuration())

        //     setWaveFunc(wavesurfer)
        //     wavesurfer.on('ready', function () {
        //         document.getElementById('playPause').addEventListener('click', () => {
        //             // handleTeaserPlay(selectedTeaserContent?.id)
        //             wavesurfer.playPause();
        //         })
        //         const duration = fmtMSS(wavesurfer.getDuration())
        //         setContentDuration(duration.split('.')[0])

        //     });

        //     wavesurfer.on('pause', (() => {
        //         setPlay(true)
        //     }))
        //     wavesurfer.on('play', () => {

        //         setPlay(false)
        //     })

        // }
        if (selectedEpisode) {
            handleTeaserPlay(selectedTeaserContent?.id)

        }

    }, [selectedEpisode])



    return (

        loading ?
            <Loader /> : <>
                <div className='app-wrapper'>
                    <Row className='h-100 gx-0'>
                        <Col sm='12' xxl='9'>
                            <div className='first-section-wrapper'>
                                <div className='content-img-wrapper'>
                                    <img src={selectedTeaserContent?.image_location?.location_image} alt='content-img' className='content-img' />
                                </div>
                                <div className='content-details '>
                                    <div className='d-block d-md-none mb-4 mobile-image-container'>
                                        <img src={selectedTeaserContent?.image_location?.location_image} alt='epis' />
                                    </div>
                                    <h3 className='content-name'>{selectedTeaserContent?.title}</h3>
                                    <div className=''>
                                        <div className='d-md-flex d-block align-items-center justify-content-between content-ctrl-center mb-3'>
                                            <div className='d-flex align-items-center mb-3'>
                                                {/* <div className='ctrl-container ' role='button'
                                                    // onClick={() => {
                                                    //     waveFunc.playPause()
                                                    // }}
                                                    id='playPause'
                                                    ref={el => { setPausePlayRef(el); }}
                                                >
                                                    {
                                                        playContent ?
                                                            <img src={play} alt='play-ctrl' className='ctrl-btn' />
                                                            :
                                                            <img src={pause} alt='play-ctrl' className='ctrl-btn' />

                                                    }
                                                </div> */}
                                                <div className='content-author-wrapper' >
                                                    <p className='content-author mb-1'>Genti Media Team</p>
                                                    <p className='content-author-role mb-0'>Narrator</p>
                                                </div>

                                            </div>
                                            <div className='d-none d-md-flex align-items-center mb-3'>
                                                {
                                                    selectedTeaserContent?.language.length > 0 ? <div className='content-select-wrapper d-flex' role='button'>
                                                        <select id='content-select' name='content-select' onChange={(e) => {
                                                            // waveFunc.destroy()
                                                            // setPlay(true)
                                                            handleLanguageFilter(e.target.value)
                                                        }}>
                                                            {
                                                                selectedTeaserContent?.language.map((el, i) =>
                                                                    <option key={i} value={el.id} >{el.name}</option>
                                                                )
                                                            }

                                                        </select>
                                                        <label className='select-icon d-none' htmlFor='content-select'>
                                                            {/* <img src={select} alt='icon' /> */}
                                                            <Image src={'/assets/img/select.svg'} alt='icon' width={40} height={40}/>

                                                        </label>
                                                    </div> : null
                                                }
                                                {/* <div className='content-select-wrapper d-flex' role='button'>
                                                    <select id='content-select' name='content-select' onChange={(e) => {
                                                        handleLanguageFilter(e.target.value)
                                                    }}>
                                                        {
                                                            selectedTeaserContent?.language.map((el, i) =>
                                                                <option key={i} value={el.id} >{el.name}</option>
                                                            )
                                                        }

                                                    </select>
                                                    <label className='select-icon d-none' htmlFor='content-select'>
                                                        <img src={select} alt='icon' />

                                                    </label>
                                                </div> */}
                                                <div
                                                    role='button'
                                                    className={`content-intent-btn d-flex align-items-center ${likedTeaser.includes(selectedTeaserContent?.id) ? 'love' : "unlike"}`}
                                                    onClick={() => { handleTeaserAction(selectedTeaserContent?.id) }}>
                                                    <div className='intent-icon'>
                                                        {/* <img src={like} alt='icon' /> */}
                                                        <Image src={'/assets/img/like.svg'} alt='icon' width={40} height={40} />

                                                    </div>

                                                    <p className='intent-name mb-0'>
                                                        {contentLikes ?
                                                            contentLikes :
                                                            selectedTeaserContent ? selectedTeaserContent?.metrics?.like_count : 0
                                                        }

                                                    </p>

                                                </div>
                                                <div className='content-intent-btn d-flex align-items-center'>
                                                    <div className='intent-icon'>
                                                        {/* <img src={eye} alt='icon' /> */}
                                                        <Image src={'/assets/img/eye.svg'} alt='icon' width={40} height={40} />
                                                    </div>
                                                    <p className='intent-name mb-0'>
                                                        {contentPlays ?
                                                            contentPlays :
                                                            selectedTeaserContent ? selectedTeaserContent?.metrics?.play_count : 0
                                                        }

                                                    </p>

                                                </div>


                                                <ShareOnSocial

                                                    textToShare={`I'm listening to ${selectedTeaserContent?.title} on Genti Audio. Check it out and lots more for Free!`}
                                                    link={`${window.location.href}/${encodeURIComponent(selectedTeaserContent?.title)}`}
                                                    linkTitle={selectedTeaserContent?.title}
                                                    linkFavicon={selectedTeaserContent?.image_location?.location_image}
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
                                                    onSocialClick={() => {
                                                        handleShareTeaser()
                                                    }}
                                                >
                                                    <div className='content-intent-btn d-flex align-items-center' role='button'>
                                                        <div className='intent-icon'>
                                                            {/* <img src={share} alt='icon' /> */}
                                                            <Image src={'/assets/img/share.svg'} alt='icon' width={40} height={40} />

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
                                        <Player episode={selectedEpisode} />
                                        {/* <div className='d-flex align-items-center justify-content-between'> */}
                                        {/* <div><p className='mb-0 content-length'>00:00</p></div> */}
                                        {/* <div><p className='mb-0 content-length'>{contentDuration ? contentDuration : '00:00'}</p></div> */}

                                        {/* <div><p className='mb-0 content-length'>00:00</p></div> */}
                                        {/* </div> */}
                                    </div>



                                </div>
                                <div className='advert-center px-5 position-absolute w-100 d-none d-md-block'>
                                    <div className='advert-center-container w-100 d-flex align-items-center justify-content-between px-xxl-5 px-3'>
                                        <div>
                                            <p className='advert-text mb-0'>Listen to more audio programs, stories on the Genti Audio Mobile App</p>
                                        </div>
                                        <div>
                                            <button className='btn advert-btn' onClick={UTM}>
                                                Get The App
                                            </button>
                                        </div>
                                        <div className='advert-img'>
                                            {/* <img src={phone} alt='advert-phone' /> */}
                                            <Image src={'/assets/img/phone.svg'} alt='icon' width={40} height={40} />
                                        </div>
                                    </div>


                                </div>
                                <div className='position-absolute mobile-search d-block d-md-none'>
                                    {
                                        selectedTeaserContent?.language.length > 0 ? <div className='content-select-wrapper d-flex' role='button'>
                                            <select id='content-select' name='content-select' onChange={(e) => {
                                                // waveFunc.destroy()
                                                // setPlay(true)
                                                handleLanguageFilter(e.target.value)
                                            }}>
                                                {
                                                    selectedTeaserContent?.language.map((el, i) =>
                                                        <option key={i} value={el.id} >{el.name}</option>
                                                    )
                                                }

                                            </select>
                                            <label className='select-icon d-none' htmlFor='content-select'>
                                                {/* <img src={select} alt='icon' /> */}
                                                <Image src={'/assets/img/select.svg'} alt='icon' width={40} height={40} />
                                            </label>
                                        </div> : null
                                    }

                                </div>
                                <div className='position-absolute d-block d-md-none mobile-intent-controller'>
                                    <div className='content-intent-btn mb-1'>
                                        <div className={`intent-icon d-flex align-items-center justify-content-center ${likedTeaser.includes(selectedTeaserContent?.id) ? 'love' : "unlike"}`}
                                            onClick={() => { handleTeaserAction(selectedTeaserContent?.id) }}
                                        >
                                            {/* <img src={like} alt='icon' /> */}
                                            <Image src={'/assets/img/like.svg'} alt='icon' width={40} height={40} />

                                        </div>
                                        <p className='intent-name mb-0'>
                                            {contentLikes ?
                                                contentLikes :
                                                selectedTeaserContent ? selectedTeaserContent?.metrics?.like_count : 0
                                            }


                                        </p>

                                    </div>
                                    <div className='content-intent-btn mb-1 '>
                                        <div className='intent-icon d-flex align-items-center justify-content-center'>
                                            {/* <img src={eye} alt='icon' /> */}
                                            <Image src={'/assets/img/eye.svg'} alt='icon' width={40} height={40} />

                                        </div>
                                        <p className='intent-name mb-0'>
                                            {contentPlays ?
                                                contentPlays :
                                                selectedTeaserContent ? selectedTeaserContent?.metrics?.play_count : 0
                                            }

                                        </p>

                                    </div>
                                    <ShareOnSocial
                                        textToShare={`I'm listening to ${selectedTeaserContent?.title} on Genti Audio. Check it out and lots more for Free!`}
                                        link={`${window.location.href}/${encodeURIComponent(selectedTeaserContent?.title)}`}
                                        linkTitle={selectedTeaserContent?.title}
                                        linkFavicon={selectedTeaserContent?.image_location?.location_image}
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
                                        onSocialClick={() => {
                                            handleShareTeaser()
                                        }}
                                    >
                                        <div className='content-intent-btn mb-1 '>
                                            <div className='intent-icon d-flex align-items-center justify-content-center'>
                                                {/* <img src={share} alt='icon' /> */}
                                                <Image src={'/assets/img/share.svg'} alt='icon' width={40} height={40} />

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


                                />
                                {
                                    overflowRef && <Scrollbar
                                        overflowRef={overflowRef}
                                    />
                                }


                            </div>
                        </Col>
                    </Row>


                </div>
                <div className='mobile-download-wrapper mt-4 d-block d-md-none'
                // onClick={() => {
                //     handleUTM()
                // }}
                >
                    <div>
                        <h3 className='mobile-download-text'>Listen to more audio programs on the Genti Audio Mobile App</h3>
                        <button className='btn advert-btn' onClick={UTM}>
                            Get The App
                        </button>
                    </div>
                    <div className='position-absolute mobile-download-bg-img'>
                        {/* <img src={phonebg} alt='bg' /> */}
                        <Image src={'/assets/img/phonebg.svg'} alt='icon' width={40} height={40} />
                    </div>
                    {/* <div className='position-absolute scroll-icon-container' onClick={toggleSubscribe}>
                    <img src={scrollIcon} alt='icon' />
                </div> */}
                </div>
                <div className='recommended-listen d-block d-md-none mt-4'>
                    <div>
                        <h4 className='recommended-title mb-4'>Recommended Listens</h4>
                    </div>

                    {
                        allTeasers.map((el, i) =>

                            <div className='episode-wrapper d-flex align-items-center mb-4' key={i} onClick={() => {
                                if (selectedTeaserContent.id === el.id) {

                                    window.scroll({ top: 0, behavior: 'smooth' })
                                } else {
                                    // waveFunc.destroy();
                                    setContentLikes(null)
                                    setContentPlays(null)
                                    setSelectedTeaser(el)
                                    window.scroll({ top: 0, behavior: 'smooth' })
                                }
                            }}>
                                <div className='episode-img-container empty'>
                                    <img src={el?.image_location
                                        ?.location_image} />
                                </div>
                                <div className='w-75'>
                                    <h3 className='episode-title '>{el?.title}</h3>
                                    <div className='d-flex align-items-center justify-content-between episode-content-container'>
                                        <p className='episode-content-count mb-0'>{`${el?.episodeCount} Episodes`}</p>
                                        {/* <div className='d-flex align-items-center'>
                                            <div className='time-icon'>
                                                <img src={watchIcon} alt='img' />

                                            </div>
                                            <p className='episode-content-count mb-0 mt-1'>{timeFormat(el?.totalDuration * 100)}</p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        )
                    }


                </div>



            </>



    )
}

export default App
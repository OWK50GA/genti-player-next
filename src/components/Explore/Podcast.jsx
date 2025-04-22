import truncate from 'truncate'
import { IoClose } from 'react-icons/io5'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'




function convertSecondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    if (hours > 0) {
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        return `${formattedMinutes}:${formattedSeconds}`;
    }
}


const Podcast = ({
    teasers,
    setSelectedTeaser,
    content,
    activeEpisode,
    selectEpisode,
    waveFunc,
    setLikes,
    setPlays,
    toggle,
    setOverflowRef,
    overflowRef,
    setPlay,
    showEpisodes,
    toggleShowEpisodes,
    userPlan,
    togglePaywall,
    setEpisodeName,
    podcast

}) => {



    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1400px)' })

    const isTeaserEnabled = (teasers, id) => {
        if (!Boolean(content?.membership_type)) {
            return true;
        } else {
            const teasersArr = teasers ?? []
            if (teasersArr.includes(id)) {
                return true;
            } else {
                if (userPlan?.active_subscription === 1) {
                    return true;
                }
                return false
            }
        }

    }

    return (
        <div className='section-content-container pb-2 pb-md-5' ref={el => { setOverflowRef(el) }}>
            <div className='section-title-wrapper d-none d-md-flex align-items-center'>
                <div className='section-icon'>
                    <Image src={'/assets/img/episode.svg'} alt='icon' height={40} width={40} />
                </div>
                <div>
                    <p className='section-title mb-0 pt-1'>Episodes</p>
                </div>

            </div>

            {/* <div className='section-title-wrapper d-flex d-md-none align-items-center justify-content-between' onClick={toggleShowEpisodes}>
                <div className='d-flex d-md-none align-items-center'>
                    <div className='section-icon'>
                        <img src={episode} alt='icon' />
                    </div>
                    <div>
                        <p className='section-title mb-0 pt-1'>Episodes</p>
                    </div>
                </div>
                <div>
                    <IoIosArrowDropdownCircle color='#cdcdcd' />
                </div>
            </div> */}

            <div className='episode-wrapper d-none d-md-flex align-items-center mb-3' >
                <div className='episode-img-container '>
                    <img src={content?.image_upload?.location_image} alt='img' />
                </div>
                <div className='w-100'>
                    <h3 className='episode-title '>{content?.title}</h3>
                    <div className='d-flex align-items-center justify-content-between'>
                        <p className='episode-content-count mb-0'>{`${podcast?.length} Episodes`}</p>
                        {/* <div className='d-flex align-items-center'>
                            <div className='time-icon'>
                                <img src={watchIcon} alt='img' />

                            </div>
                            <p className='episode-content-count mb-0 mt-'>{timeFormat(content?.totalDuration * 100)}</p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className='d-none d-md-block episodes-container mb-3 explore-player__episodes-container'>
                {

                    podcast.map((el, i) =>
                        <>
                            <div key={i} className='d-none d-md-flex justify-content-between align-items-center episode-content mb-3' role='button' onClick={() => {
                                const result = podcast.find(ele => ele.id === el.id)
                                if (activeEpisode === result?.audio_url) {

                                    window.scroll({ top: 0, behavior: 'smooth' })
                                } else {
                                    // waveFunc.destroy();
                                    // setPlay(true)
                                    if (isTeaserEnabled(content?.teasers, result?.id, content?.membership_type)) {
                                        selectEpisode(result?.audio_url)
                                        setEpisodeName(result?.podcast_title)
                                        window.scroll({ top: 0, behavior: 'smooth' })
                                    }
                                    else {
                                        togglePaywall()
                                    }


                                }




                            }

                            }>
                                <div className='d-flex align-items-center'>

                                    <div className='episode-list-wrap active'>
                                        {
                                            isTeaserEnabled(content?.teasers, el?.id) && activeEpisode === el?.audio_url ?
                                                <Image src={'/assets/img/activePlay.svg'} alt='icon' width={20} height={20} />
                                                : isTeaserEnabled(content?.teasers, el?.id) ?
                                                    <Image src={'/assets/img/mopl.svg'} alt='icon' width={20} height={20}/> :
                                                    <p className='episode-part mb-0 '>{i + 1}</p>
                                        }
                                        {

                                        }
                                    </div>
                                    <p className={`${isTeaserEnabled(content?.teasers, el?.id) && activeEpisode === el?.audio_url ? 'active' : isTeaserEnabled(content?.teasers, el?.id) ? "text-white" : ""} episode-part mb-0 mt-`}>{truncate(el?.podcast_title, isTabletOrMobile ? 35 : 15)}</p>

                                </div>
                                <div>
                                    <p className={`${isTeaserEnabled(content?.teasers, el?.id) && activeEpisode === el?.audio_url ? 'active' : isTeaserEnabled(content?.teasers, el?.id) ? "text-white" : ""} episode-length mb-0 mt-`}>{`${convertSecondsToTime(el?.length)}mins`}</p>
                                </div>

                            </div>





                        </>

                    )
                }






            </div>



            {
                showEpisodes && <div className="socialShareBackdropFadeIn mobile-content__wrapper" >

                    <section role="dialog" aria-modal="true" className="socialSharePopupMoveIn" >
                        <div className='episodes-container mb-3 explore-player__episodes-container border-bottom'>
                            <div className='section-title-wrapper d-flex d-md-none align-items-center justify-content-between pb-3 mb-3' style={{
                                borderBottom: "1px solid #cdcdcd",
                                borderRadius: 0
                            }} >
                                <div className='d-flex d-md-none align-items-center'>
                                    <div className='section-icon'>
                                        <Image src={'/assets/img/episode.svg'} alt='icon' height={20} width={20}/>
                                    </div>
                                    <div>
                                        <p className='section-title mb-0 pt-1'>Episodes</p>
                                    </div>
                                </div>
                                <div onClick={toggleShowEpisodes} >
                                    <IoClose color="#cdcdcd" />
                                </div>
                            </div>

                            {

                                podcast.map((el, i) =>

                                    <>

                                        <div className='d-flex d-md-none justify-content-between align-items-center episode-content mb-3' role='button' onClick={() => {
                                            // waveFunc.destroy();
                                            // setPlay(true)

                                            const result = podcast.find(ele => ele.id === el.id)
                                            // if (activeEpisode === result.media?.working_file_name) {

                                            //     window.scroll({ top: 0, behavior: 'smooth' })
                                            // } else {
                                            //     // waveFunc.destroy();
                                            //     // setPlay(true)
                                            //     if (isTeaserEnabled(content?.teasers, result?.id)) {
                                            //         selectEpisode(result?.media?.working_file_name)
                                            //         window.scroll({ top: 0, behavior: 'smooth' })
                                            //     }
                                            //     else {
                                            //         togglePaywall()
                                            //     }


                                            // }
                                            if (isTeaserEnabled(content?.teasers, result?.id)) {
                                                selectEpisode(result?.audio_url)
                                                setEpisodeName(result?.podcast?.podcast_title)
                                                window.scroll({ top: 0, behavior: 'smooth' })
                                                toggleShowEpisodes()
                                            }
                                            else {
                                                toggleShowEpisodes()
                                                togglePaywall()

                                            }
                                            // if (isTeaserEnabled(content?.teasers, result?.id)) {
                                            //     selectEpisode(result?.media?.working_file_name)
                                            //     window.scroll({ top: 0, behavior: 'smooth' })
                                            //     toggleShowEpisodes()
                                            // }

                                        }}>
                                            <div className='d-flex align-items-center'>

                                                <div className='episode-list-wrap active'>
                                                    {
                                                        isTeaserEnabled(content?.teasers, el?.id) && activeEpisode === el?.audio_url ?
                                                            <Image src={'/assets/img/activePlay.svg'} alt='icon' width={20} height={20}/>
                                                            : isTeaserEnabled(content?.teasers, el?.id) ?
                                                                <Image src={'/assets/img/mopl.svg'} alt='icon' width={20} height={20}/> :
                                                                <p className='episode-part mb-0 '>{i + 1}</p>
                                                    }

                                                </div>
                                                <p className={`${isTeaserEnabled(content?.teasers, el?.id) && activeEpisode === el?.audio_url ? 'active' : isTeaserEnabled(content?.teasers, el?.id) ? "text-white" : ""} episode-part mb-0 mt-`}>{truncate(el?.podcast_title, 15)}</p>

                                            </div>
                                            <div>
                                                <p className={`${isTeaserEnabled(content?.teasers, el?.id) && activeEpisode === el?.audio_url ? 'active' : isTeaserEnabled(content?.teasers, el?.id) ? "text-white" : ""} episode-part mb-0 mt-`}>{`${convertSecondsToTime(el?.podcast?.length)}mins`}</p>
                                            </div>


                                        </div>




                                    </>

                                )
                            }






                        </div>
                    </section>
                </div>
            }


        </div>
    )
}

export default Podcast
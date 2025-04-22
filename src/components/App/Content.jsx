import React from 'react'
import timeFormat from '../../utils/timeFormat'
import Image from 'next/image'






const Content = ({
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
    setPlay

}) => {




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
    return (
        <div className='section-content-container pb-2 pb-md-5' ref={el => { setOverflowRef(el) }}>
            <div className='section-title-wrapper d-flex align-items-center'>
                <div className='section-icon'>
                    {/* <img src={episode} alt='icon' /> */}
                    <Image src={'/assets/img/episode.svg'} width={40} height={40} alt='icon' />
                </div>
                <div>
                    <p className='section-title mb-0'>Episode</p>
                </div>

            </div>

            <div className='episode-wrapper d-none d-md-flex align-items-center mb-3' >
                <div className='episode-img-container '>
                    <img src={content?.image_location?.location_image} alt='img' />
                </div>
                <div className='w-100'>
                    <h3 className='episode-title '>{content?.title}</h3>
                    <div className='d-flex align-items-center justify-content-between'>
                        <p className='episode-content-count mb-0'>{`${content?.episodeCount} Episodes`}</p>
                        {/* <div className='d-flex align-items-center'>
                            <div className='time-icon'>
                                <img src={watchIcon} alt='img' />

                            </div>
                            <p className='episode-content-count mb-0 mt-1'>{timeFormat(content?.totalDuration * 100)}</p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className='episodes-container mb-3'>
                {
                    isAudioDrama(content?.type_id) &&
                    <>
                        {
                            content?.audio_d_list.map((el, i) =>
                                content?.audio_d_episodes.find(e => e.id === el.id) ?
                                    <>
                                        <div key={i} className='d-none d-md-flex justify-content-between align-items-center episode-content mb-3' role='button' onClick={() => {
                                            const result = content?.audio_d_episodes.find(ele => ele.id === el.id)
                                            // waveFunc.destroy();

                                            // selectEpisode(result?.media?.working_file_name)
                                            // window.scroll({ top: 0, behavior: 'smooth' })
                                            if (activeEpisode === result.media?.working_file_name) {

                                                window.scroll({ top: 0, behavior: 'smooth' })

                                            } else {
                                               

                                                // setPlay(true)
                                                // waveFunc.destroy();
                                                selectEpisode(result?.media?.working_file_name)




                                            }


                                        }

                                        }>
                                            <div className='d-flex align-items-center'>

                                                <div className='episode-list-wrap active'>
                                                    <img src={'/assets/img/activeIcon.svg'} alt='icon' />
                                                </div>
                                                <p className='active episode-part mb-0 mt-1'>{el?.episode_name}</p>

                                            </div>
                                            <div>
                                                <p className='active episode-length mb-0 mt-1'>{timeFormat(el?.duration * 100)}</p>
                                            </div>

                                        </div>
                                        <div className='d-flex d-md-none justify-content-between align-items-center episode-content mb-3' role='button' onClick={() => {
                                            // waveFunc.destroy();
                                            // setPlay(true)

                                            const result = content?.audio_d_episodes.find(ele => ele.id === el.id)
                                            selectEpisode(result?.media?.working_file_name)
                                            window.scroll({ top: 0, behavior: 'smooth' })


                                        }}>
                                            <div className='d-flex align-items-center'>
                                                <div className='episode-list-wrap active'>
                                                    <Image src={'/assets/img/mopl.scg'} alt='icon' height={40} width={40}/>
                                                </div>
                                                <p className='mobile-active episode-part mb-0 mt-1'>{el?.episode_name}</p>

                                            </div>
                                            <div>
                                                <p className='mobile-active episode-length mb-0 mt-1'>{timeFormat(el?.duration * 100)}</p>
                                            </div>

                                        </div>

                                    </> :

                                    <div className='d-flex justify-content-between align-items-center episode-content mb-3' role='button' onClick={() => {
                                        toggle()
                                    }}>
                                        <div className='d-flex align-items-center'>
                                            <div className='episode-list-wrap'>
                                                <p className=' episode-part mb-0 mt-1'>{i + 1}</p>
                                            </div>
                                            <p className=' episode-part mb-0 mt-1'>{el?.episode_name}</p>

                                        </div>
                                        <div>
                                            <p className=' episode-length mb-0 mt-1'>{timeFormat(el?.duration * 100)}</p>
                                        </div>

                                    </div>

                            )
                        }
                    </>

                }
                {/*podcast */}
                {
                    isPodcast(content?.type_id) &&
                    <>
                        {
                            content?.podcast_list.map((el, i) =>
                                content?.podcast_episodes.find(e => e.id === el.id) ?
                                    <>
                                        <div key={i} className='d-none d-md-flex justify-content-between align-items-center episode-content mb-3' role='button' onClick={() => {
                                            const result = content?.podcast_episodes.find(ele => ele.id === el.id)

                                            if (activeEpisode === result.audio_url) {

                                                window.scroll({ top: 0, behavior: 'smooth' })

                                            } else {
                                                // waveFunc.destroy();
                                                // setPlay(true)
                                                selectEpisode(result?.audio_url)
                                                window.scroll({ top: 0, behavior: 'smooth' })
                                            }



                                        }

                                        }>
                                            <div className='d-flex align-items-center'>

                                                <div className='episode-list-wrap active'>
                                                    <Image src={'/assets/img/activePlay.svg'} alt='icon' height={40} width={40}/>
                                                </div>
                                                <p className='active episode-part mb-0 mt-1'>{el?.podcast_title}</p>

                                            </div>
                                            <div>
                                                <p className='active episode-length mb-0 mt-1'>{timeFormat(el?.length)}</p>
                                            </div>

                                        </div>
                                        <div className='d-flex d-md-none justify-content-between align-items-center episode-content mb-3' role='button' onClick={() => {
                                            // waveFunc.destroy();
                                            // setPlay(true)

                                            const result = content?.podcast_episodes.find(ele => ele.id === el.id)
                                            selectEpisode(result?.audio_url)
                                            window.scroll({ top: 0, behavior: 'smooth' })


                                        }}>
                                            <div className='d-flex align-items-center'>
                                                <div className='episode-list-wrap active'>
                                                    <Image src={'/assets/img/mopl.svg'} alt='icon' />
                                                </div>
                                                <p className='mobile-active episode-part mb-0 mt-1'>{el?.podcast_title}</p>

                                            </div>
                                            <div>
                                                <p className='mobile-active episode-length mb-0 mt-1'>{timeFormat(el?.length)}</p>
                                            </div>

                                        </div>

                                    </> :

                                    <div className='d-flex justify-content-between align-items-center episode-content mb-3' role='button' onClick={() => {
                                        toggle()
                                    }}>
                                        <div className='d-flex align-items-center'>
                                            <div className='episode-list-wrap'>
                                                <p className=' episode-part mb-0 mt-1'>{i + 1}</p>
                                            </div>
                                            <p className=' episode-part mb-0 mt-1'>{el?.podcast_title}</p>

                                        </div>
                                        <div>
                                            <p className=' episode-length mb-0 mt-1'>{timeFormat(el?.length)}</p>
                                        </div>

                                    </div>

                            )
                        }
                    </>

                }
                {
                    isAudioBook(content?.type_id) &&
                    <>
                        {
                            content?.audio_b_list.map((el, i) =>
                                content?.audio_b_episodes.find(e => e.id === el.id) ?
                                    <>
                                        <div key={i} className='d-none d-md-flex justify-content-between align-items-center episode-content mb-3' role='button' onClick={() => {
                                            const result = content?.audio_b_episodes.find(ele => ele.id === el.id)
                                            if (activeEpisode === result.media?.working_file_name) {

                                                window.scroll({ top: 0, behavior: 'smooth' })
                                            } else {
                                                // waveFunc.destroy();
                                                // setPlay(true)
                                                selectEpisode(result?.media?.working_file_name)
                                                window.scroll({ top: 0, behavior: 'smooth' })
                                            }




                                        }

                                        }>
                                            <div className='d-flex align-items-center'>

                                                <div className='episode-list-wrap active'>
                                                    <Image src={'/assets/img/activePlay.svg'} alt='icon' height={40} width={40} />
                                                </div>
                                                <p className='active episode-part mb-0 mt-1'>{el?.episode_name}</p>

                                            </div>
                                            <div>
                                                <p className='active episode-length mb-0 mt-1'>{timeFormat(el?.duration * 100)}</p>
                                            </div>

                                        </div>
                                        <div className='d-flex d-md-none justify-content-between align-items-center episode-content mb-3' role='button' onClick={() => {
                                            // waveFunc.destroy();
                                            // setPlay(true)

                                            const result = content?.audio_b_episodes.find(ele => ele.id === el.id)
                                            selectEpisode(result?.media?.working_file_name)
                                            window.scroll({ top: 0, behavior: 'smooth' })


                                        }}>
                                            <div className='d-flex align-items-center'>
                                                <div className='episode-list-wrap active'>
                                                    <Image src={'/assets/img/mopl.svg'} alt='icon' height={40} width={40}/>
                                                </div>
                                                <p className='mobile-active episode-part mb-0 mt-1'>{el?.episode_name}</p>

                                            </div>
                                            <div>
                                                <p className='mobile-active episode-length mb-0 mt-1'>{timeFormat(el?.duration * 100)}</p>
                                            </div>

                                        </div>

                                    </> :

                                    <div className='d-flex justify-content-between align-items-center episode-content mb-3' role='button' onClick={() => {
                                        toggle()
                                    }}>
                                        <div className='d-flex align-items-center'>
                                            <div className='episode-list-wrap'>
                                                <p className=' episode-part mb-0 mt-1'>{i + 1}</p>
                                            </div>
                                            <p className=' episode-part mb-0 mt-1'>{el?.episode_name}</p>

                                        </div>
                                        <div>
                                            <p className=' episode-length mb-0 mt-1'>{timeFormat(el?.duration * 100)}</p>
                                        </div>

                                    </div>

                            )
                        }
                    </>

                }



            </div>


            <div className='recommended-listen d-none d-md-block'>
                <div>
                    <h4 className='recommended-title mb-4'>Recommended Listens</h4>
                </div>

                {
                    teasers.map((el, i) =>


                        <div className='episode-wrapper d-flex align-items-center mb-4' key={i} role='button' onClick={() => {
                            if (content.id === el.id) {
                                overflowRef.scroll({ top: 0, behavior: 'smooth' })

                            } else {
                                // waveFunc.destroy();
                                // setPlay(true)
                                setLikes(null)
                                setPlays(null)
                                setSelectedTeaser(el)
                                overflowRef.scroll({ top: 0, behavior: 'smooth' })

                            }

                        }}>
                            <div className='episode-img-container empty'>
                                <img src={el?.image_location
                                    ?.location_image} alt='img' />
                            </div>
                            <div className='w-100'>
                                <h3 className='episode-title '>{el?.title}</h3>
                                <div className='d-flex align-items-center justify-content-between w-100'>
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



        </div>
    )
}

export default Content
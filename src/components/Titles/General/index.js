'use client'

import { useState, useEffect } from 'react'
import truncate from 'truncate'
// import overlayIcon from '../../../assets/img/overlayIcon.svg'
import Paywall from '../Paywall'
import LoaderBox from './Loader'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const General = ({ title, id }) => {
    const router = useRouter();
    const [userCurrentPlan, setUserCurrentPlan] = useState(0)
    const [showPaywall, setPaywall] = useState(false)

    const togglePaywall = () => {
        setPaywall(!showPaywall)
    }

    const [state, setState] = useState({
        isLoading: true,
        src: ''
    })
    useEffect(() => {
        const image = new Image();
        image.src = title?.image_upload?.location_image;
        image.onload = () => {
            setState({
                src: image.src,
                isLoading: false
            });
            // if (props.onLoad) {
            //     props.onLoad(image);
            // }
        };
        image.onerror = (err) => {
            setState({
                src: '',
                isLoading: false
            });
            // if (props.onError) {
            //     props.onError(err);
            // }
        }
    }, [])

    // useQuery(['user_plans'], () => Client.subscription.user_plans(), {
    //     onSuccess: (data) => {
    //         setUserCurrentPlan(data.data.active_subscription)
    //         // setSubscriptions(data.data.result)
    //     }
    // })

    if (state.isLoading) return <LoaderBox />

    return (
        <div>
            <div className='popular-title__wrapper is-initial-select' key={id}
                onClick={() => {
                    // if (title.membership_type === 0) {
                    router.push(title?.type_id === 3 ? `/title/${title.id}?type=podcast` : `/title/${title.id}`)
                    // } else {
                    //     if (userCurrentPlan === 0) {
                    //         togglePaywall()
                    //     } else {
                    //         navigate(`/explore/player/${title.id}`)
                    //     }
                    // }
                }}
            >
                <div className='popular-title_img__container position-relative'>
                    <img src={title?.image_upload?.location_image} alt='img' className='popular-title_img' />
                    <div className='position-absolute player-overlay__container'>
                        <img src={overlayIcon} alt='img' className='new-release_img' />
                        <Image src={'/assets/img/overlayIcon.svg'} alt='img' className='new-release_img' width={100} height={100} />
                    </div>
                </div>
                <h3 className='popular-title_title'>{title?.title ? truncate(title?.title, 15) : ''}</h3>
                <p className='popular-title_description'>{title?.description ? truncate(title?.description, 20) : ""}</p>
            </div>

            <Paywall show={showPaywall} toggle={togglePaywall} />
        </div>

    )
}

export default General
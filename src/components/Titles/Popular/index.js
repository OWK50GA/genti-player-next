'use client'

import { useEffect, useState } from 'react'
import truncate from 'truncate'
// import overlayIcon from '../../../assets/img/overlayIcon.svg'
import ImageLoader from 'react-image-loader';
import LoaderBox from './Loader';
import { useRouter } from 'next/navigation'
import Image from 'next/image';



const Popular = ({ title }) => {
    const router = useRouter();
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


    if (state.isLoading) return <LoaderBox />

    return (
        <div className='new-release__wrapper is-initial-select'>
            <div className='new-release_img__container position-relative' onClick={() => {
                router.push(title?.type_id === 3 ? `/title/${title.id}?type=podcast` : `/title/${title.id}`)

            }}>
                <img src={title?.image_upload?.location_image} alt='img' className='new-release_img ' />
                <div className='position-absolute player-overlay__container'>
                    {/* <img src={overlayIcon} alt='img' className='' /> */}
                    <Image src={'/assets/img/overlayIcon.svg'} alt='img' width={100} height={100} />
                </div>
            </div>
            <h3 className='new-release_title'>{truncate(title.title, 25)}</h3>
            <p className='new-release_description'>{truncate(title.description, 29)}</p>
            {/* <p className='new-release_synopsis'>{
                truncate(title?.titles_author.map(ele => ele.authors.name), 20)
            }</p> */}
        </div>
    )
}

export default Popular
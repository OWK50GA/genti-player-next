'use client'

import { useEffect } from 'react';
// import App from '../../../components/Explore';
import { useState } from 'react';
import { setDefaultTeaser } from '../../../utils/teaser';
import { useQuery } from '@tanstack/react-query';
import Client from '../../../client'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const App = dynamic(
    () => import('../../../components/Explore'),
    { ssr: false }
  );

function Player() {

    const [userCurrentPlan, setUserCurrentPlan] = useState(0)
    const [hasPageMounted, setHasPageMounted] = useState(false)

    const accessToken = Cookies.get("GENTI_APP_TOKEN")

    let is_authorized = false
    if (accessToken) {
        let decoded = jwt_decode(accessToken)
        if (decoded.exp * 1000 < Date.now()) {
            is_authorized = false
        } else {
            is_authorized = true
        }
    } else {
        is_authorized = false
    }


    const { isLoading: loading } = useQuery({
        queryKey: ['user_plans'], 
        queryFn: () => Client.subscription.user_plans(), 
        enabled: is_authorized,
        onSuccess: (data) => {
            setUserCurrentPlan(data.data)
            // setSubscriptions(data.data.result)
        },

    })

    useEffect(() => {
        if (typeof window === 'undefined') return
        window.scrollTo(0, 0)
        document.querySelector('body').scrollTo(0, 0)
    }, [])
    setDefaultTeaser();

    const [showModal, setShowModal] = useState(false)
    const [showSubscribeModal, setShowSubscribeModal] = useState(false)


    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const toggleSubscribeModal = () => {
        setShowSubscribeModal(!showSubscribeModal)
    }


    // useEffect(() => {
    //   const timer = setTimeout(() => toggleSubscribeModal(), 180000);
    //   return () => clearTimeout(timer);
    // }, []);

    const params = useParams()
    const { slug } = useParams()

    if (typeof window === 'undefined') return


    return (
        <>
            <div className="main-wrapper">
                <div className="px-3 px-md-5">
                    {/* <Header toggle={toggleModal} /> */}
                    <App
                        toggle={toggleModal}
                        toggleSubscribe={toggleSubscribeModal}
                        // slug={slug}
                        userPlan={userCurrentPlan}
                    />

                </div>

            </div>



        </>


    );
}

export default Player;

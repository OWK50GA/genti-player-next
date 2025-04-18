import { useEffect } from 'react';
import Header from '../../../component/Header'
import App from '../../../component/Explore';
import { Modal } from 'reactstrap'
import { useState } from 'react';
import android from '../../../assets/img/android.svg'
import ios from '../../../assets/img/appl.svg'
import close from '../../../assets/img/close.svg'
import bg from '../../../assets/img/subClose.svg'
import download_bg from '../../../assets/img/fh4.png'
import { setDefaultTeaser } from '../../../utils/teaser';
import handleUTMLink from '../../../utils/UTM';
import { useParams } from 'react-router-dom';
import AppLayout from '../../../layout/App'
import { useQuery } from 'react-query';
import Client from '../../../client'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

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


    const { isLoading: loading } = useQuery(['user_plans'], () => Client.subscription.user_plans(), {
        enabled: is_authorized,
        onSuccess: (data) => {
            setUserCurrentPlan(data.data)
            // setSubscriptions(data.data.result)
        },

    })

    useEffect(() => {
        window.scrollTo(0, 0)
        document.querySelector('body').scrollTo(0, 0)
    }, [])

    setDefaultTeaser()

    useEffect(() => {
    })

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


    return (
        <AppLayout>
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



        </AppLayout>


    );
}

export default Player;

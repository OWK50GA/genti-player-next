'use client'

import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { getInitials } from '../../utils/Initials';
import { Row, Col } from 'reactstrap'
import { useQuery } from '@tanstack/react-query';
import Client from '../../client'
// import { useNavigate } from 'react-router-dom';
import CancelSubscription from './CancelSubscription';

const Profile = () => {
    const [cancelSubscription, setCancelSubscription] = useState(false)

    const toggleSubscription = () => {
        setCancelSubscription(!cancelSubscription)
    }

    const currentUser = Cookies.get("GENTI_APP_CURRENT_USER") ? JSON.parse(Cookies.get("GENTI_APP_CURRENT_USER")) : null
    const [userCurrentPlan, setUserCurrentPlan] = useState(0)
    const [premium_features, setPremiumFeatures] = useState([])
    const [subscriptions, setSubscriptions] = useState([])

    const { data, isLoading: loading } = useQuery({
        queryKey: ['user_plans'], 
        queryFn: () => Client.subscription.user_plans(), 
        onSuccess: (data) => {
            setUserCurrentPlan(data.data)
        },
    })
    const { isLoading: is_load } = useQuery({
        queryKey: ['premium_features'], 
        queryFn: () => Client.subscription.premium_features(), 
        onSuccess: (data) => {
            setPremiumFeatures(data.data)
        }
    })

    const { isLoading: fetching } = useQuery({
        queryKey: ['subscription_plans'], 
        queryFn: () => Client.subscription.plans(), 
        onSuccess: (data) => {
            setSubscriptions(data.data.result)
        }
    })

    return (
        <>
            <div className='genti-main-container'>
                <p className='page-title'>{`Profile >`} <span className='page-sub__title'>{currentUser?.name}</span></p>
                <div className='profile-details__card mb-4'>
                    <div className='p-4'>
                        <div className='unauthorized-wrapper p-0 d-flex  t'>

                            <div className='authorized-wrapper__initials-container d-flex align-items-center justify-content-center flex-shrink-0'>
                                {getInitials(currentUser.name)}
                            </div>
                            <div className='w-100'>
                                <p className='login-text mb-4'>
                                    {currentUser.name}
                                </p>
                                <Row className='gy-3 mb-3'>
                                    <Col sm='12' md='4'>
                                        <p className='profile-details__title '>
                                            Name:
                                            <span className='profile-details__value'>{` ${currentUser.name}`}</span>
                                        </p>
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <p className='profile-details__title '>
                                            Gender:
                                            <span className='profile-details__value'>{` ${currentUser?.gender?.length > 0 ? currentUser?.gender : 'N/A'}`}</span>
                                        </p>
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <p className='profile-details__title'>
                                            Phone No:
                                            <span className='profile-details__value'>{` ${currentUser?.mobile_number?.length > 0 ? currentUser?.mobile_number : 'N/A'}`}</span>
                                        </p>
                                    </Col>
                                </Row>
                                <Row className='gy-3'>
                                    <Col sm='12' md='4'>
                                        <p className='profile-details__title '>
                                            Country:
                                            <span className='profile-details__value'>{` ${currentUser?.country?.length > 0 ? currentUser?.country : 'N/A'}`}</span>
                                        </p>
                                    </Col>
                                    {
                                        userCurrentPlan?.active_subscription === 1 && <Col sm='12' md='4'>
                                            <p className='profile-details__title '>
                                                Next Billing Date:
                                                <span className='profile-details__value'>{` ${userCurrentPlan?.subscription_details?.end_date}`}</span>
                                            </p>
                                        </Col>
                                    }

                                </Row>

                            </div>

                        </div>
                    </div>
                </div>
                <div className='profile-details__card mb-4'>
                    <div className='p-4'>
                        <h3 className='card-title'>
                            Your Plan
                        </h3>

                    </div>
                    {
                        userCurrentPlan.active_subscription === 0 ?
                            <div className='subscription__wrapper px-4 py-5'>
                                <div className='d-flex align-items-center w-100'>
                                    <div className='w-100'>
                                        <h3 className='profile-user__subscription-type'>Genti Free</h3>
                                        <div className='d-flex align- justify-content-between flex-wrap'>
                                            <ul className='user-subscription__features_list mb-0'>
                                                <li>Play and listen online</li>
                                                <li>Ads popup</li>
                                            </ul>
                                            <p className='profile-user__subscription-price'>
                                                Free
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            </div> :
                            <div className='subscription__wrapper px-4 py-5'>
                                <div className=' d-block d-md-flex align-items-center w-100'>
                                    {
                                        <div className='w-100'>

                                            <h3 className='profile-user__subscription-type'>{userCurrentPlan?.plan_details?.name}</h3>
                                            <div className='d-flex align- justify-content-between flex-wrap'>
                                                <ul className='user-subscription__features_list mb-0'>
                                                    {
                                                        premium_features?.features?.map(el => <li>{el}</li>)
                                                    }
                                                </ul>
                                                <p className='profile-user__subscription-price'>
                                                {`${userCurrentPlan?.plan_details?.currency_group?.currency_symbol ?? ''} ${userCurrentPlan?.plan_details?.amount ?? ''}`}
                                                   
                                                </p>

                                            </div>

                                        </div>
                                    }


                                </div>
                            </div>
                    }

                </div>
                {
                    userCurrentPlan?.active_subscription === 0 ?
                        <p className='profile-subscription__guide'>
                            You are currently on the Basic Plan.
                             {/* Upgrade to <span className='guide__action'
                                onClick={() => {
                                    navigate('/subscription')
                                }}
                            >Premium Plan</span> */}
                        </p>
                        :
                        <p className='profile-subscription__guide'>
                            Want to opt out of your current plan?  <span className='guide__action'
                                onClick={() => {
                                    toggleSubscription()
                                }}
                            >Cancel Subscription</span>
                        </p>
                }

            </div>

            <CancelSubscription
                show={cancelSubscription}
                toggle={toggleSubscription}
                endDate={userCurrentPlan?.subscription_details?.end_date}
            />

        </>
    )
}

export default Profile
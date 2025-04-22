import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import { useQuery } from '@tanstack/react-query';
import Client from '../../client'
import Cookies from 'js-cookie'
import { getValidityType } from '../../utils/helpers'
import Loader from '../../components/PageLoader'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Subscription = () => {
    const [userCurrentPlan, setUserCurrentPlan] = useState(0)
    // const [subscriptions, setSubscriptions] = useState([])
    const [premium_features, setPremiumFeatures] = useState(null)
    const [hasPageMounted, setHasPageMounted] = useState(false)

    const [userCallingCode, setUserCallingCode] = useState(null)
    const [trialDays, setTrialDays] = useState(null)


    const getUserCountry = async () => {
        const data = await axios.get(`https://api.ipregistry.co/?key=${process.env.NEXT_PUBLIC_LOCATION_KEY}`)

        return data.data.location.country.calling_code
        // s(data.data.location.country.calling_code)

    }

    

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



    useQuery({
        queryKey: ['user_country_code'], 
        queryFn: () => getUserCountry(), 
        // enabled: !is_authorized,
        onSuccess: (data) => {
            setUserCallingCode(data)
            // setSubscriptions(data.data.result)
        },

    })

    const { data, isLoading: loading } = useQuery({
        queryKey: ['user_plans'], 
        queryFn: () => Client.subscription.user_plans(), 
        enabled: is_authorized,
        onSuccess: (data) => {
            setUserCurrentPlan(data.data)
            // setSubscriptions(data.data.result)
        },

    })

    // const { isLoading: fetching } = useQuery(['subscription_plans'], () => Client.subscription.plans(), {
    //     enabled: is_authorized,
    //     onSuccess: (data) => {
    //         setSubscriptions(data.data.result)
    //     }
    // })


    const { isLoading: is_fetching } = useQuery({
        queryKey: ['premium_features', userCallingCode], 
        queryFn: () => Client.subscription.unauthorized_premium_features({
            country_code: userCallingCode
        }), 
        enabled: (userCallingCode ? true : false),
        onSuccess: (data) => {
            setPremiumFeatures(data?.data?.data)
            // setSubscriptions(data.data.result)
        }
    })


    // const { isLoading: is_load } = useQuery(['premium_features'], () => Client.subscription.premium_features(), {
    //     enabled: is_authorized,
    //     onSuccess: (data) => {
    //         setPremiumFeatures(data.data)
    //         // setSubscriptions(data.data.result)
    //     }
    // })


    useQuery({
        queryKey: ['trial_days', userCallingCode], 
        queryFn: () => Client.subscription.unauthorized_trial_days({
            country_code: userCallingCode
        }), 
        enabled: !is_authorized && (userCallingCode ? true : false),
        onSuccess: (data) => {
            setTrialDays(data.data.trial_days)
            // setSubscriptions(data.data.result)
        }
    })


    useQuery({
        queryKey: ['trial_days'], 
        queryFn: () => Client.subscription.trial_days(), 
        enabled: is_authorized,
        onSuccess: (data) => {

            setTrialDays(data.data.trial_days)
            // setSubscriptions(data.data.result)
        }
    })



    useEffect(() => {
        const timer = setTimeout(() => {
            setHasPageMounted(true)
        }, 3000);
        return () => clearTimeout(timer);
    }, []);


    const router = useRouter();
    return (
        <>
            {
                !hasPageMounted || loading  ? <Loader /> : <div className='subscription-page'>
                    {/* {userCurrentPlan?.active_subscription !== 1 ?
                        <>
                            <section className='subscription-banner position-relative'>
                                <div className='subscription-banner__text-wrapper '>

                                    <h3 className='subscription-banner__text mb-0 pt-2 px-2'>
                                        {`Get Premium free for upto ${trialDays} days`}
                                    </h3>
                                </div>
                                <p className='position-absolute subscription-banner__subtext'>
                                    {`Terms and conditions apply. Free premium trial days free not available for users who have already tried premium`}
                                </p>

                            </section>
                            <section className='subscription-features__wrapper'>
                                <h3 className='subscription-features__text'>Benefits of Premium</h3>
                                <div className=' d-flex align-items-center justify-content-center flex-wrap'>

                                    <div className='subscription-feature__wrapper mx-auto'>
                                        <div className='subscription-feature__icon-wrapper mx-auto d-flex align-items-center justify-content-center'>
                                            <img src={pr1} alt='icon' />
                                        </div>
                                        <p className='subscription-feature_text mb-0'>Exciting Premium</p>
                                        <p className='subscription-feature_text mb-0'>Content</p>


                                    </div>
                                   
                                </div>

                            </section>
                        </> : null

                    } */}



                    {
                        userCurrentPlan?.active_subscription !== 1 ?
                            <section className='plan-selection__wrapper pb-5'>
                                <div className='plan-selection_text__wrapper text-center'>
                                    <h3 className='plan-selection_text'>Pick Your Plan</h3>
                                    <p className='plan-selection_subtext'>Listen without interruption on your phone and any other devices </p>
                                </div>
                                <div className='d-flex justify-content-center align-items-center pb-5'>
                                    <div className='mx-auto  subscription-plan-cards__wrapper'>
                                        
                                        <Row className='g-4 justify-content-center'>
                                          
                                            <Col sm='12' md='6'>
                                                <div className='subscription-plan-card'>
                                                    <div className='subscription-plan__details-wrapper'>
                                                        <div className='subscription-plan__details_container'>
                                                            <h3 className='subscription-plan__name text-center'>Premium Plan</h3>
                                                            <p className='subscription-plan__description text-center'>
                                                                {`Enjoy from as low as `}
                                                                <span className='fw-bold premium_plan_base_amount'>
                                                                    {premium_features?.plan?.currency_group?.currency_symbol}{premium_features?.plan?.amount}
                                                                </span>
                                                                {/* {`/${getValidityType(premium_features?.plan?.validity_type)}`} */}
                                                            </p>
                                                            <p className='subscription-plan__period mb-0 text-center text-muted'>Free premium trial days not available for users who have already tried premium.</p>
                                                        </div>

                                                    </div>
                                                    <div className='subscription-plan__features__wrapper'>


                                                        {
                                                            premium_features?.features?.map(el =>
                                                                <div className='d-flex align-items-center subscription-plan__feature-details'>
                                                                    <div className='subscription-plan__feature_checkIcon'>
                                                                        <Image src={'/assets/img/Check.svg'} alt='icon' width={20} height={20}/>
                                                                    </div>
                                                                    <p className='subscription-plan__feature_text mb-0'>{el}</p>
                                                                </div>
                                                            )
                                                        }

                                                        <div className=''>
                                                            <button className='subscription-plan__btn btn get-app-btn w-100 fw-semibold'
                                                                onClick={() => {
                                                                    router.push('/subscription/plans')
                                                                }}>
                                                                Get Premium
                                                            </button>

                                                        </div>
                                                        <p className='subscription-plan__terms_text'>
                                                            <span className=''>Terms and conditions apply.</span> {`Free premium trial days free not available for users who have already tried premium`}
                                                        </p>
                                                    </div>



                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </section>
                            :
                            <div className='premium-subscription-page'>

                                <div className='plan-selection_text__wrapper text-center'>
                                    <h3 className='plan-selection_text'>Current Plan</h3>
                                    <p className='plan-selection_subtext'>Listen without interruption on your phone and any other devices </p>
                                </div>
                                <Row className='g-4 justify-content-center'>
                                    {
                                        
                                                <Col sm='12' md='4'>
                                                    <div className={`subscription-plan-card h-100  subscribed position-relative `}>
                                                        <div className='subscription-plan__details-wrapper'>
                                                            <div className='subscription-plan__details_container text-center'>
                                                                <h3 className='subscription-plan__name'>{userCurrentPlan?.plan_details?.name}</h3>
                                                                {
                                                                    userCurrentPlan?.plan_details?.available_trial === 1 && <p className='subscription-plan__period mb-2'>{`${userCurrentPlan?.plan_details?.trial_days} days free`}</p>
                                                                }
                                                                {
                                                                    userCurrentPlan?.subscription_details?.plan_id === userCurrentPlan?.plan_details?.id && userCurrentPlan?.plan_details?.available_trial === 1 && <p className='subscription-plan__period mb-0'><span className='text-dark'>Expires on:</span>{` ${userCurrentPlan?.subscription_details?.end_date}`}</p>
                                                                }
                                                            </div>

                                                        </div>
                                                        <div className='subscription-plan__features__wrapper'>
                                                            <div className='subscription-plan__full_description text-center'>
                                                                {userCurrentPlan?.plan_details?.description}
                                                            </div>

                                                            <div className='d-flex subscription-plan__price_wrapper align-items-center text-center justify-content-center my-3'>

                                                                {
                                                                    userCurrentPlan?.plan_details?.currency_group?.is_global === 0 ?
                                                                        <div className='d-flex'>
                                                                            <div className='payment_type__naira'>
                                                                                <Image src={'/assets/img/naira.svg'} alt='naira' width={20} height={20}/>
                                                                            </div>
                                                                            <h3 className='subscription-plan__price text-center'> {userCurrentPlan?.plan_details?.amount}
                                                                                /<span className='subscription-plan__duration'>{getValidityType(userCurrentPlan?.plan_details?.validity_type)}</span>
                                                                            </h3>
                                                                        </div>
                                                                        :
                                                                        <h3 className='subscription-plan__price text-center'>
                                                                            <span className='payment_type__dollar'>$
                                                                            </span> {userCurrentPlan?.plan_details?.amount}
                                                                            /<span className='subscription-plan__duration'>{getValidityType(userCurrentPlan?.plan_details?.validity_type)}</span>
                                                                        </h3>
                                                                }
                                                            </div>

                                                            <div className=''>
                                                                <button className='subscription-plan__btn btn get-app-btn w-100' onClick={() => {
                                                                    Cookies.set('selected_plan', JSON.stringify(userCurrentPlan?.plan_details))
                                                                    router.push('/subscription/plans')

                                                                }}
                                                                // disabled={userCurrentPlan?.active_subscription === 1}
                                                                >
                                                                    Change Plan
                                                                </button>

                                                            </div>
                                                            <p className='subscription-plan__terms_text'>
                                                                {`Terms and conditions apply. Free premium trial days free not available for users who have already tried premium`}
                                                            </p>
                                                        </div>
                                                        <div className='position-absolute subscription-tag p-5'>
                                                            <p className=''>Current Plan</p>
                                                        </div>


                                                    </div>
                                                </Col>
                                            
                                    }
                                </Row>
                            </div>

                    }


                </div>
            }

        </ >
    )
}

export default Subscription
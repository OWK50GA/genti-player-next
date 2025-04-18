import React, { useState, useEffect } from 'react'
import AppLayout from '../../../layout/App'
import { Row, Col } from 'reactstrap'
import nairaIcon from '../../../assets/img/naira.svg'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import Client from '../../../client'
import Cookies from 'js-cookie'
import { getValidityType } from '../../../utils/helpers'
import Loader from '../../../component/PageLoader'
import { BsArrowLeftShort } from 'react-icons/bs'
import jwt_decode from 'jwt-decode'
import axios from 'axios'



const Plan = () => {
    const navigate = useNavigate()
    const [paymentType, setPaymentType] = useState('naira')
    const [subscriptions, setSubscriptions] = useState([])
    const [userCurrentPlan, setUserCurrentPlan] = useState(null)


    const [userCallingCode, setUserCallingCode] = useState(null)


    const getUserCountry = async () => {
        const data = await axios.get(`https://api.ipregistry.co/?key=${process.env.NEXT_PUBLIC_LOCATION_KEY}`)

        return data.data.location.country.calling_code
        // s(data.data.location.country.calling_code)

    }

    useQuery(['user_country_code'], () => getUserCountry(), {
        onSuccess: (data) => {
            setUserCallingCode(data)
            // setSubscriptions(data.data.result)
        },

    })

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

    const { isLoading: loading } = useQuery(['subscription_plans', userCallingCode], () => Client.subscription.plans({
        country_code: userCallingCode
    }), {
        enabled: (userCallingCode ? true : false),
        onSuccess: (data) => {
            setSubscriptions(data.data.result)
        }
    })

    const { isLoading: fetching } = useQuery(['user_plans'], () => Client.subscription.user_plans(), {
        onSuccess: (data) => {
            setUserCurrentPlan(data.data)
            // setSubscriptions(data.data.result)
        }
    })




    return (
        <AppLayout>
            {
                loading || fetching ?
                    <Loader /> :
                    <div className='premium-subscription-page'>
                        <div className='premium-subscription__page-first__wrapper'>
                            <div className='d-flex'>
                                <BsArrowLeftShort role='button' color='#cdcdcd' style={{ marginRight: '5px' }} onClick={() => {
                                    navigate(-1)
                                }} />
                                <h6 className='page_title'>{`${'Subscription > '}`}<span className='page-title__subtext'>Premium</span></h6>

                            </div>
                            <div className='d-flex align-items-center justify-content-between mt-3 flex-wrap' >
                                <h3 className='selected-subscription__type mb-0'>Premium Plans</h3>
                                {/* <div className='change_subscription_payment__type'>
                            <h3 className='payment-location'>Pay from Nigeria</h3>
                            <div className='payment-select__type d-flex'>
                                <p className={`payment-select__type_option ${paymentType === 'naira' ? 'active' : ''} mb-0`} onClick={() => {
                                    setPaymentType('naira')
                                }} role='button'>
                                    Naira
                                </p>
                                <p className={`payment-select__type_option ${paymentType === 'USD' ? 'active' : ''} mb-0`} onClick={() => {
                                    setPaymentType('USD')
                                }} role='button'>
                                    USD
                                </p>

                            </div>
                        </div> */}
                            </div>
                        </div>

                        <div className='px-0 mt-5 px-md-3 premium-subscription-plans__wrapper'>
                            <Row className='g-3 mb-4 g-md-5'>
                                {
                                    subscriptions
                                        .filter(ele =>
                                            !ele?.name?.includes('Referral') &&
                                            !ele?.name?.includes('referral')

                                        )
                                        .map((el, i) =>
                                            <Col sm='12' md='4' key={i}>
                                                <div className={`subscription-plan-card h-100 ${userCurrentPlan?.subscription_details?.plan_id === el?.id && userCurrentPlan?.active_subscription === 1 ? 'subscribed position-relative' : ""}`}>
                                                    <div className='subscription-plan__details-wrapper'>
                                                        <div className='subscription-plan__details_container text-center'>
                                                            <h3 className='subscription-plan__name'>{el?.name}</h3>
                                                            {/* <p className='subscription-plan__description'>299/week after offer period ends  </p> */}
                                                            {
                                                                el?.available_trial === 1 && userCurrentPlan?.active_subscription === 0 && <p className='subscription-plan__period mb-2'>{`${el?.trial_days} days free`}</p>
                                                            }
                                                            {
                                                                userCurrentPlan?.active_subscription === 1 && userCurrentPlan?.subscription_details?.plan_id === el?.id && el?.available_trial === 1 && <p className='subscription-plan__period mb-0'><span className='text-dark'>Expires on:</span>{` ${userCurrentPlan?.subscription_details?.end_date}`}</p>
                                                            }
                                                        </div>

                                                    </div>
                                                    <div className='subscription-plan__features__wrapper'>
                                                        <div className='subscription-plan__full_description text-center'>
                                                            {el?.description}
                                                        </div>

                                                        <div className='d-flex subscription-plan__price_wrapper align-items-center text-center justify-content-center my-3'>

                                                            {
                                                                el?.currency_group?.is_global === 0 ?
                                                                    <div className='d-flex'>
                                                                        <div className='payment_type__naira'>
                                                                            <img src={nairaIcon} />
                                                                        </div>
                                                                        <h3 className='subscription-plan__price text-center'> {el?.amount?.toLocaleString()}
                                                                            /<span className='subscription-plan__duration'>{getValidityType(el?.validity_type)}</span>
                                                                        </h3>
                                                                    </div>
                                                                    :
                                                                    <h3 className='subscription-plan__price text-center'>
                                                                        <span className='payment_type__dollar'>$
                                                                        </span> {el?.amount?.toLocaleString()}
                                                                        /<span className='subscription-plan__duration'>{getValidityType(el?.validity_type)}</span>
                                                                    </h3>
                                                            }
                                                        </div>

                                                        <div className=''>
                                                            <button className='subscription-plan__btn btn get-app-btn w-100' onClick={() => {
                                                                Cookies.set('selected_plan', JSON.stringify(el))
                                                                navigate('/subscription/payment')

                                                            }}
                                                                disabled={
                                                                    userCurrentPlan?.active_subscription === 1 && userCurrentPlan?.subscription_details?.plan_id === el?.id
                                                                }
                                                            // disabled={userCurrentPlan?.active_subscription === 1}
                                                            >
                                                                Get started
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
                                        )
                                }
                                {/* <Col sm='12' md='4'>
                            <div className='subscription-plan-card no-attachment'>
                                <div className='subscription-plan__details-wrapper'>
                                    <div className='subscription-plan__details_container text-center'>
                                        <h3 className='subscription-plan__name'>Weekly Plan</h3>
                                        <p className='subscription-plan__period mb-0'>14 days free</p>
                                    </div>

                                </div>
                                <div className='subscription-plan__features__wrapper'>
                                    <div className='subscription-plan__full_description text-center'>
                                        Enjoy the best of African stories, ad-free. Download your favourite titles and listen offline. Get access to premium, exclusive content. Renew weekly.
                                    </div>

                                    <div className='d-flex subscription-plan__price_wrapper align-items-center text-center justify-content-center my-3'>

                                        {
                                            paymentType === 'naira' ?
                                                <div className='d-flex'>
                                                    <div className='payment_type__naira'>
                                                        <img src={nairaIcon} />
                                                    </div>
                                                    <h3 className='subscription-plan__price text-center'> 299/<span className='subscription-plan__duration'>week</span></h3>
                                                </div>
                                                :
                                                <h3 className='subscription-plan__price text-center'><span className='payment_type__dollar'>$</span> 2/<span className='subscription-plan__duration'>week</span></h3>
                                        }
                                    </div>

                                    <div className=''>
                                        <button className='subscription-plan__btn btn get-app-btn w-100' onClick={() => {
                                            navigate('/subscription/payment')
                                        }}>
                                            Get started
                                        </button>

                                    </div>
                                    <p className='subscription-plan__terms_text'>
                                        Terms and conditions apply. 14 days free not available for users who have already tried premium
                                    </p>
                                </div>



                            </div>
                        </Col>
                        <Col sm='12' md='4'>
                            <div className='subscription-plan-wrapper most-popular__plan'>
                                <div className='most-popular_header'>
                                    <h3 className='most-popular__text text-center mb-0'>Most Popular</h3>
                                </div>
                                <div className='subscription-plan-card'>
                                    <div className='subscription-plan__details-wrapper'>
                                        <div className='subscription-plan__details_container text-center'>
                                            <h3 className='subscription-plan__name'>Monthly Plan</h3>
                                            <p className='subscription-plan__period mb-0'>14 days free</p>
                                        </div>

                                    </div>
                                    <div className='subscription-plan__features__wrapper'>

                                        <div className='subscription-plan__full_description text-center'>
                                            Enjoy the best of African stories, ad-free. Download your favourite titles and listen offline. Get access to premium, exclusive content. Renew Monthly.
                                        </div>
                                        <div className='d-flex subscription-plan__price_wrapper align-items-center text-center justify-content-center my-3'>
                                            {
                                                paymentType === 'naira' ?
                                                    <div className='d-flex'>
                                                        <div className='payment_type__naira'>
                                                            <img src={nairaIcon} />
                                                        </div>
                                                        <h3 className='subscription-plan__price text-center'> 999/<span className='subscription-plan__duration'>month</span></h3>

                                                    </div> :
                                                    <h3 className='subscription-plan__price text-center'><span className='payment_type__dollar'>$</span> 6/<span className='subscription-plan__duration'>month</span></h3>

                                            }
                                        </div>
                                        <div className=''>
                                            <button className='subscription-plan__btn btn get-app-btn w-100'>
                                                Get started
                                            </button>

                                        </div>
                                        <p className='subscription-plan__terms_text'>
                                            Terms and conditions apply. 14 days free not available for users who have already tried premium
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        <Col sm='12' md='4'>
                            <div className='subscription-plan-card no-attachment'>
                                <div className='subscription-plan__details-wrapper'>
                                    <div className='subscription-plan__details_container text-center'>
                                        <h3 className='subscription-plan__name'>Yearly Plan</h3>
                                        <p className='subscription-plan__period mb-0'>14 days free</p>
                                    </div>

                                </div>
                                <div className='subscription-plan__features__wrapper'>

                                    <div className='subscription-plan__full_description text-center'>
                                        Enjoy the best of African stories, ad-free. Download your favourite titles and listen offline. Get access to premium, exclusive content. Renew Yearly.
                                    </div>

                                    <div className='d-flex subscription-plan__price_wrapper align-items-center text-center justify-content-center my-3'>
                                        {
                                            paymentType === 'naira' ?
                                                <div className='d-flex'>
                                                    <div className='payment_type__naira'>
                                                        <img src={nairaIcon} />
                                                    </div>
                                                    <h3 className='subscription-plan__price text-center'> 10,499/<span className='subscription-plan__duration'>year</span></h3>

                                                </div>
                                                :
                                                <h3 className='subscription-plan__price text-center'><span className='payment_type__dollar'>$</span> 65/<span className='subscription-plan__duration'>year</span></h3>

                                        }

                                    </div>

                                    <div className=''>
                                        <button className='subscription-plan__btn btn get-app-btn w-100' onClick={() => {
                                            navigate('/subscription/payment')
                                        }}>
                                            Get started
                                        </button>

                                    </div>
                                    <p className='subscription-plan__terms_text'>
                                        Terms and conditions apply. 14 days free not available for users who have already tried premium
                                    </p>
                                </div>



                            </div>
                        </Col> */}


                            </Row>
                        </div>
                    </div>
            }

        </AppLayout >
    )
}

export default Plan
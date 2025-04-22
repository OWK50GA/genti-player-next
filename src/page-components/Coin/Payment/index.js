import { useEffect, useState } from 'react'
// import AppLayout from '../../../layout/App'
import { Row, Col } from 'reactstrap'
// import { useNavigate } from 'react-router-dom'
// import pay1 from '../../../assets/img/pay1.svg'
// import pay2 from '../../../assets/img/pay2.svg'
// import pay3 from '../../../assets/img/pay3.svg'
import Cookies from 'js-cookie'
// import { getValidityType, getExpiryDate } from '../../../utils/helpers'
// import moment from 'moment'
import { usePaystackPayment } from 'react-paystack'
import { Modal } from 'reactstrap'
import Stripe from './Stripe'
import { useMutation, useQuery } from '@tanstack/react-query';
import Client from '../../../client'
import { toast } from 'react-toastify';
import axios from 'axios'
// import whiteLogo from '../../../assets/img/gfw.svg'
// import coinIcon from '../../../assets/img/activeCoin.svg'
import VerifyPaymentManager from '../../../client/coins/VerifyPayment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'



const Plan = () => {
    // const navigate = useNavigate()
    const router = useRouter();
    const [customerId, setCustomerId] = useState(null)
    // const [paymentType, setPaymentType] = useState('naira')
    const [openStripe, setOpenStripe] = useState(false)
    const [recurringPayment, setRecurringPayment] = useState(false)

    const toggleStripePayment = () => {
        setOpenStripe(!openStripe)
    }

    const [userCallingCode, setUserCallingCode] = useState(null)


    const getUserCountry = async () => {
        const data = await axios.get(`https://api.ipregistry.co/?key=${process.env.NEXT_PUBLIC_LOCATION_KEY}`)

        return data.data.location.country.calling_code
        // s(data.data.location.country.calling_code)

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



    const selectPack = Cookies.get('selected_pack');
    const selected_pack = JSON.parse(Cookies.get('selected_pack'))
    const currentUser = JSON.parse(Cookies.get("GENTI_APP_CURRENT_USER"))
    const is_Nigerian = userCallingCode === 234 || userCallingCode === "234"
    const [userCurrentPlan, setUserCurrentPlan] = useState(0)


    //console.log(selected_pack)

    const { verifyTransaction, isSuccess } = VerifyPaymentManager()


    useEffect(() => {
        if (isSuccess) {
            router.push('/coin/balance')
        }
    }, [isSuccess])


    useQuery({
        queryKey: ['customer_id'], 
        queryFn: () => Client.subscription.customer_id(), 
        // enabled: amount && currentUser ? true : false,
        onSuccess: (data) => {
            setCustomerId(data)
            // setSubscriptions(data.data.result)
        }
    })


    const config = {
        // reference: (new Date()).getTime(),x
        email: currentUser.email,
        amount: selected_pack.amount_web * 100,
        metadata: {
            cancel_action: 'player.genti.com',
            amount: selected_pack.amount_web,
            userId: currentUser.id,
            platform:'web',
            ...selected_pack,
        },
        publicKey: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY : process.env.NEXT_PUBLIC_PAYSTACK_PROD_PUBLIC_KEY,
        // publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,

    };


    const onSuccess = (reference) => {
        const data = {
            reference: reference.trxref,
            coins_packs: selected_pack.id,
            platform: "web",
            processor: 'paystack'
        }
        // verifyTransaction(data)
        toast.success(`Payment successful, ${selected_pack?.unit + selected_pack?.bonus} coins has been credited to your account`)
        router.push('/coin')

    };

    // you can call this function anything
    const onClose = (evt) => {
    }

    const initializePayment = usePaystackPayment(config);


    return (
        <>

            <div className='premium-subscription__payment_page'>
                <div className='selected-premium-subscription__wrapper'>
                    <h6 className='page_title'>{`${'Coins > '}`}<span className='page-title__subtext'>Payment</span></h6>

                    <div className='px-2 mb-5 px-md-4'>
                        <div className='d-flex align-items-center justify-content-between mt-5 flex-wrap' >
                            <h3 className='selected-subscription__type mb-0'>You Picked</h3>
                            <div>
                                <h3 className='payment-location text-decoration-underline' role='button' onClick={() => {
                                    router.push('/coin')
                                }}>change pack</h3>

                            </div>
                        </div>
                        <div className='selected-plan-description__wrapper mt-4'>
                            <div className='selected-plan-description__header d-flex align-items-center justify-content-between'>
                                <h3 className='selected-plan-description__title mb-0'>{selected_pack?.title}</h3>
                                <div>
                                    <h3 className='selected-plan-description__price mb-0'>{`
                                    ${is_Nigerian ? '₦' : '$'}${selected_pack?.amount_web}`}</h3>
                                    {/* <p className='selected-plan-description__duration mb-0'>per <span >{getValidityType(selected_pack.validity_type).toLowerCase()}</span></p> */}
                                </div>

                            </div>
                            {/* <div className='selected-plan-description__container'>
                                <div className='selected-plan-description__duration_details__wrapper'>
                                    <div className='selected-plan-description__duration_details d-flex justify-content-between align-items-center'>
                                        <p className='selected-plan-description__text mb-0'>Starting date</p>
                                        <p className='selected-plan-description__text mb-0'>{moment(new Date()).format('LL')}</p>
                                    </div>

                                </div>
                                <div className='selected-plan-description__duration_details__wrapper'>
                                    <div className='selected-plan-description__duration_details d-flex justify-content-between align-items-center'>
                                        <p className='selected-plan-description__text mb-0'>Next billing date</p>
                                        <p className='selected-plan-description__text mb-0'>
                                            {
                                                moment(
                                                    getExpiryDate(
                                                        getValidityType(selected_pack.validity_type)
                                                    )).format('LL')
                                            }

                                        </p>
                                    </div>

                                </div>
                                {
                                    !is_Nigerian && <div className='selected-plan-description__duration_details__wrapper'>
                                        <div className='selected-plan-description__duration_details d-flex justify-content-between align-items-center'>
                                            <p className='selected-plan-billing__method mb-0'>Automatic Renewal</p>
                                            <div>
                                                <label class="billing-method__switch">
                                                    <input type="checkbox" onChange={(e) => {
                                                        setRecurringPayment(e.target.checked)
                                                    }} />
                                                    <span class="billing-method__slider round"></span>
                                                </label>
                                            </div>
                                        </div>

                                    </div>
                                }

                                <div className='selected-plan-description__pricing_details__wrapper'>
                                    <div className=' d-flex justify-content-between align-items-center'>
                                        <h3 className='selected-plan-price__text mb-0'>Total</h3>
                                        <p className='selected-plan-description__amount mb-0'><span className='selected-plan-description_currency px-1'>{selected_pack?.currency_group?.is_global === 0 ? '₦' : '$'}</span> {`${selected_pack?.amount}/${getValidityType(selected_pack?.validity_type).toLowerCase()}`}</p>
                                    </div>
                                </div>
                                <p className='cancel-selected-plan_text'>
                                    **cancel subscription anytime**
                                </p>
                            </div> */}


                        </div>
                    </div>
                </div>

                <div className='payment_category_section' >
                    <h3 className='payment_category_text'>Payment Category</h3>
                    <div>
                        <Row className='gy-3'>
                            {
                                is_Nigerian ? <Col sm='12' md='5'>
                                    <div className='payment_category_wrapper'>
                                        <div className='payment_category_header'>
                                            <h3 className='mb-0 payment_category_guide__text'>Pay in Naira(NGN) </h3>
                                            <p className='mb-0 payment_category_guide__sub_text'>for Nigerians only</p>
                                        </div>
                                        <div className='payment-gateway__wrapper'>
                                            <Row>
                                                <Col sm='12' md='9'>
                                                    <div className='payment-gateway__card'>
                                                        <div className='d-flex align-items-center payment-gateway_company'>
                                                            <img src={pay1} />
                                                            <Image src={'/assets/img/pay1.svg'} alt='pay1' height={40} width={40} />
                                                            <p className='payment-gateway__name mb-0'>
                                                                paystack
                                                            </p>
                                                        </div>
                                                        <div className='payment-gateway_price-details d-flex justify-content-between'>

                                                            <h3 className='payment-gateway_price-text'>Total</h3>
                                                            <p className=' mb-0 payment-gateway_price-amount'><span className='selected-plan-description_currency px-1'>{'₦'}</span> {`${selected_pack?.amount_web}`}</p>

                                                        </div>
                                                        <div className='payment-gateway__cta-wrapper'>
                                                            <button className='payment-plan__btn btn get-app-btn w-100'
                                                                disabled={
                                                                    selected_pack?.currency_group?.is_global === 1
                                                                }
                                                                onClick={() => {
                                                                    initializePayment(onSuccess, onClose)
                                                                }}
                                                            >
                                                                Pay with Paystack
                                                            </button>
                                                        </div>

                                                    </div>
                                                </Col>
                                            </Row>


                                        </div>

                                    </div>
                                </Col> : <Col sm='12' md='7'>

                                    <div className='payment_category_wrapper'>
                                        <div className='payment_category_header'>
                                            <h3 className='mb-0 payment_category_guide__text'>Pay in Dollars(USD)</h3>
                                            <p className='mb-0 payment_category_guide__sub_text'>Worldwide</p>
                                        </div>
                                        <div className='payment-gateway__wrapper'>
                                            <Row className='g-3'>
                                                {/* <Col sm='12' md='6'>
                                                    <div className='payment-gateway__card'>
                                                        <div className='d-flex align-items-center payment-gateway_company'>
                                                            <img src={pay2} />

                                                        </div>
                                                        <div className='payment-gateway_price-details d-flex justify-content-between'>

                                                            <h3 className='payment-gateway_price-text'>Total</h3>
                                                            <p className=' mb-0 payment-gateway_price-amount'><span className='selected-plan-description_currency px-1'>{selected_pack?.currency_group?.is_global === 0 ? '₦' : '$'}</span> {`${selected_pack?.amount}/${getValidityType(selected_pack?.validity_type).toLowerCase()}`}</p>

                                                        </div>
                                                        <div className='payment-gateway__cta-wrapper'>
                                                            <button className='payment-plan__btn btn get-app-btn w-100'
                                                                disabled={
                                                                    selected_pack?.currency_group?.is_global === 0
                                                                }
                                                                onClick={() => {
                                                                    navigate('/subscription/payment')
                                                                }}>
                                                                Pay with flutterwave
                                                            </button>
                                                        </div>

                                                    </div>
                                                </Col> */}
                                                <Col sm='12' md='6'>
                                                    <div className='payment-gateway__card'>
                                                        <div className='d-flex align-items-center payment-gateway_company'>
                                                            {/* <img src={pay3} /> */}
                                                            <Image src={'/assets/img/pay3.svg'} height={40} width={40} alt='pay3' />

                                                        </div>
                                                        <div className='payment-gateway_price-details d-flex justify-content-between'>

                                                            <h3 className='payment-gateway_price-text'>Total</h3>
                                                            {/* <p className=' mb-0 payment-gateway_price-amount'><span className='selected-plan-description_currency payment_dollar px-1'>$</span>6</p> */}
                                                            <p className=' mb-0 payment-gateway_price-amount'><span className='selected-plan-description_currency px-1'>{'$'}</span> {`${selected_pack?.amount_web}`}</p>

                                                        </div>
                                                        <div className='payment-gateway__cta-wrapper'>
                                                            <button className='payment-plan__btn btn get-app-btn w-100'
                                                                disabled={
                                                                    selected_pack?.currency_group?.is_global === 0
                                                                }
                                                                onClick={() => {
                                                                    // navigate('/subscription/payment')
                                                                    toggleStripePayment()
                                                                }}>
                                                                Pay with stripe
                                                            </button>
                                                        </div>

                                                    </div>
                                                </Col>
                                            </Row>


                                        </div>

                                    </div>


                                </Col>
                            }

                        </Row>
                    </div>
                </div>
            </div>
            <Modal isOpen={openStripe} toggle={toggleStripePayment} className='modal-dialog-centered'>
                <Stripe
                    // amount={selected_pack.available_trial === 1 && userCurrentPlan === 0 ? 1 : selected_pack.amount}
                    amount={selected_pack.amount_web}
                    toggle={toggleStripePayment}
                    customer_Id={customerId}
                    planId={selected_pack.id}
                />
            </Modal>

        </ >
    )
}

export default Plan

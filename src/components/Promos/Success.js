import React from 'react'
import { Modal } from 'reactstrap'
// import ButtonLoader from '../../../component/ButtonLoader';
import Success from '../SuccessAnimation';
// import { useMutation } from 'react-query';
// import Client from '../../../client'
// import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



const PromoSuccessful = ({ show, toggle }) => {
    const router = useRouter();

    return (
        <Modal
            isOpen={show}
            toggle={toggle}
            centered
            modalClassName='promo-feedback_modal'
        >
            <div className=''>
                <div className='d-flex align-items-center justify-content-end' onClick={toggle} role='button'>
                    <Image src={'/assets/img/dismiss.svg'} alt='icon' width={20} height={20}/>
                </div>
                <div className='mt-2'>
                    <Success />
                </div>
                <div className='my-5'>
                    <h3 className='cancel-subscription__header mb-3'>Congratulations!</h3>
                    <p className='cancel-subscription__text mb-0 w-75 text-center mx-auto'>You are now on the Genti Audio premium plan. Start listening!!</p>
                </div>
                <div className='d-block d-md-flex justify-content-between g-2 mb-3'>

                    <div className='w-75 mx-auto'>
                        <button className='fw-semibold subscription-plan__btn btn get-app-btn py-3 my-0 mb-3 w-100'
                            onClick={() => {
                                router.push('/explore')
                            }}
                        // disabled={isLoading}
                        >
                            Listen Now
                        </button>
                    </div>
                </div>
                <div>
                    <div
                        className="d-flex align-items-center justify-content-around mb-3 w-75 mx-auto"
                    >
                        <hr
                            style={{
                                width: "40%",
                                opacity: '0.20000000298023224',
                                color: '#8E8E8E'
                            }}
                        ></hr>
                        <span
                            style={{
                                fontSize: '12px',
                                fontWeight: '500',
                                color: '#dfdfdf'
                            }}>
                            OR
                        </span>
                        <hr
                            style={{
                                width: "40%",
                                opacity: '0.20000000298023224',
                                color: '#8E8E8E'
                            }}
                        ></hr>
                    </div>
                </div>
                <p
                    className='text-center mb-4'
                    style={{
                        color: '#C9C9C9',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}
                >Open app on your phone to enjoy premium content</p>
            </div>
        </Modal>
    )
}

export default PromoSuccessful
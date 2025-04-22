import React from 'react'
import { Modal } from 'reactstrap'
import { useRouter } from 'next/navigation';
import Image from 'next/image';



const PromoFailed = ({ show, toggle, errorMessage }) => {
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
                <div className='d-flex align-items-center justify-content-center mt-2'>
                    <Image src={'/assets/img/oops.svg'} alt='icon' width={20} height={20}/>
                </div>
                <div className='my-5'>
                    <h3 className='cancel-subscription__header mb-3'>OOOPS!</h3>
                    <p className='cancel-subscription__text mb-0 w-75 text-center mx-auto'>{errorMessage}</p>
                </div>
                <div className='d-block d-md-flex justify-content-between g-2 mb-3'>

                    <div className='w-75 mx-auto'>
                        <button className='fw-semibold subscription-plan__btn btn get-app-btn py-3 my-0 mb-3 w-100'
                            onClick={() => {
                                router.push('/subscription')
                            }}
                        // disabled={isLoading}
                        >
                            Subscribe Now
                        </button>
                    </div>
                </div>
                <p
                    className='text-center mb-4'
                    style={{
                        color: '#FDFDFD',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}
                >Continue with <span onClick={() => {
                    router.push('/explore')
                }}
                    style={{
                        color: '#5F42E2',

                    }}>Basic Plan</span></p>
            </div>
        </Modal>
    )
}

export default PromoFailed
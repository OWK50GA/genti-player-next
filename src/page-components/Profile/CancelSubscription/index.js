import { Modal } from 'reactstrap'
// import cancelIcon from '../../../assets/img/cancelSubscription.svg'
import ButtonLoader from '../../../components/ButtonLoader';
import { useMutation } from '@tanstack/react-query';
import Client from '../../../client'
import { toast } from 'react-toastify';
import Image from 'next/image';




const CancelSubscription = ({ show, toggle, endDate }) => {


    const handleEmailClick = () => {
        const mailtoLink = `mailto:support@gentimedia.com`;
        window.location.href = mailtoLink;
    };


    const { mutate: cancelSubscription, isLoading } = useMutation({
        mutationFn: Client.subscription.cancel_subscription, 
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error.message)
            } else {
                toast.success(data.message)
                toggle()
            }
        },
        onError: (error) => {
            if (error.response) return toast.error(error.response.data.error.message)
            else if (error.data) return toast.error(error.data.message)
            else return toast.error(error.message)
        }
    })

    return (
        <Modal
            isOpen={show}
            toggle={toggle}
            centered
            modalClassName='cancel-subscription_modal'
        >
            <div className=''>
                <div className='text-center '>
                    {/* <img src={cancelIcon} alt='icon' /> */}
                    <Image src={'/assets/img/cancelSubscription.svg'} alt='icon' height={40} width={40} />
                </div>
                <div className='my-5'>
                    <h3 className='cancel-subscription__header mb-3'>Cancel Subscription</h3>
                    <p className='cancel-subscription__text mb-0'>Are you sure you want to cancel your subscription to <span className='fw-bold'>Genti premium</span> service, you will no longer have access to premium content service after <span className='fw-bold'>{endDate}.</span></p>
                </div>
                <div className='d-block d-md-flex justify-content-between g-2 mb-3'>
                    <div className='w-100 me-0 me-md-2'>
                        <button className='fw-semibold subscription-plan__btn btn get-app-btn secondary-btn w-100 py-3 my-0 mb-3' onClick={() => {
                            toggle()
                        }}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className='w-100'>
                        <button className='fw-semibold subscription-plan__btn btn get-app-btn w-100 py-3 my-0 mb-3'
                            onClick={() => {
                                cancelSubscription()
                            }}
                            disabled={isLoading}
                        >
                            {
                                isLoading ?
                                    <ButtonLoader /> :
                                    'Continue'
                            }
                        </button>
                    </div>


                </div>
                <p className='contact_support'>*If you have any questions or need assistance, please contact our customer support team at <span className='text-gradient' onClick={handleEmailClick}>support@gentimedia.com</span>.*</p>
            </div>
        </Modal>
    )
}

export default CancelSubscription
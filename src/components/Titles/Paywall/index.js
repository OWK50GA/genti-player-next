'use client'

import { Modal } from 'reactstrap'
import { useRouter } from 'next/navigation'

const Paywall = ({ show, toggle }) => {
    const router = useRouter();
    return (
        <Modal isOpen={show} toggle={toggle} className='modal-dialog-centered modal-sm paywall-modal' >
            <div className='flex items-center justify-center px-3 py-4'>
                <div>
                    <p onClick={toggle} className='paywall-guard__text text-right justify-end' role='button' >Cancel</p>

                    <p className='paywall-guard__text my-4'>You need to be on any premium plan to listen to this audio</p>
                    <button className='get-app-btn btn go-premium-btn w-100' onClick={() => {
                        router.push('/subscription')
                    }}>Go premium</button>
                </div>
            </div>


        </Modal>

    )
}

export default Paywall
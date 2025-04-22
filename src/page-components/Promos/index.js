'use client'

import React, { useState } from 'react'
// import PromoSuccessful from '../../components/Promos/Success'
// import PromoFailed from '../../components/Promos/Failed'
import { useMutation } from '@tanstack/react-query'
import Client from '../../client'
import ButtonLoader from '../../components/ButtonLoader';
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const PromoSuccessful = dynamic(
    () => import('../../components/Promos/Success'),
    { ssr: false }
);
const PromoFailed = dynamic(
    () => import('../../components/Promos/Failed'),
    { ssr: false }
  );

const Promos = () => {
    const params = useParams()
    const { token } = params;

    const router = useRouter();
    const [referralCode, setReferralCode] = useState("")
    const [showSuccess, setShowSuccess] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    const toggleSuccess = () => {
        setShowSuccess(!showSuccess)
    }
    const [showFailed, setShowFailed] = useState()

    const toggleFailed = () => {
        setShowFailed(!showFailed)
    }

    const { mutate: verifyReferralCode, isLoading } = useMutation({
        mutationFn: Client.referral.verify_code, 
        onSuccess: (data) => {
            if (data.error) {
            } else {
                toggleSuccess()
            }
        },
        onError: (error) => {
            setErrorMessage(error?.response?.data?.message)
            toggleFailed()
        }
    })

    return (
        <>
            <div className='promos-banner_section position-relative'>
                <div className='h-100 w-100 d-block d-md-flex align-items-center justify-content-center'>
                    <h3 className='promos-banner__section-text '>
                        Enter a referral code and enjoy premium content for 7days free
                    </h3>

                </div>
                <p className='promos-banner-sub-text position-absolute'>
                    Terms and conditions apply.
                </p>
            </div>
            <div className='promo-section_content d-flex justify-content-center mb-2'>
                <div>
                    <h3 className='promo-guide_text'>
                        Redeem your code
                    </h3>
                    <p className='promo-guide_sub-text'>Enter the code your friend or family shared to you to get premium content</p>
                    <form>
                        <div>
                            <label className='promo-input__label'>Enter Code</label>
                            <input className='promo-input w-100 py-3 px-3 text-center'
                                onChange={(e) => {
                                    setReferralCode(e.target.value)
                                }}
                            />
                            <div className='w-100 text-center'>
                                <button className='get-app-btn btn promo-cta_btn'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        // toggleSuccess()
                                        // toggleFailed()
                                        verifyReferralCode({
                                            referral_code: referralCode,
                                            encryptedString: token
                                        })
                                    }}
                                    disabled={isLoading || referralCode.length < 12}
                                >
                                    {
                                        isLoading ? <ButtonLoader /> : 'Continue'
                                    }
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            <p className='no-promo__code-text'>
                Don’t have any code? <span className='no-promo__code-redirect_text'
                    onClick={
                        () => {
                            router.push('/subscription')
                        }
                    }
                >View subscription plans</span>
            </p>

            <PromoSuccessful
                show={showSuccess}
                toggle={toggleSuccess}
            />
            <PromoFailed
                show={showFailed}
                toggle={toggleFailed}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default Promos
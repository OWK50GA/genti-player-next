'use client'

import { useState, useEffect } from 'react'
// import AuthLayout from '../../layout/Auth'
import OtpForm from '../../components/OTP'
// import arrowIcon from '../../assets/img/arrow.svg'
// import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import Client from '../../client'
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ButtonLoader from '../../components/ButtonLoader';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



const OTP = () => {
    const userEmail = Cookies.get("GENTI_RESET_EMAIL")
    // const navigate = useNavigate()
    const router = useRouter();
    const [otp, setOtp] = useState('')
    const [secondsLeft, setSecondsLeft] = useState(60)
    const [resend, setResend] = useState(false)

    const { mutate: requestOTP, isLoading } = useMutation({
        mutationFn: Client.auth.request_otp, 
        onSuccess: async (data) => {
        },
        onError: (error) => {
            if (error.data) toast.error(error.data.message)
            toast.error(error.message)

        }
    })
    // eslint-disable-next-line
    const { mutate: verifyOTP, isLoading: verifying } = useMutation({
        mutationFn: Client.auth.verify_otp, 
        onSuccess: () => {
            router.push('/auth/reset-password')
        },
        onError: (error) => {
            if (error.response) toast.error(error.response.data.error.message)
            else if (error.data) toast.error(error.data.message)
            else toast.error(error.message)

        }
    })


    const handleOTPVerification = () => {
        // eslint-disable-next-line
        const data = {
            email: userEmail,
            code: otp,
        }
        Cookies.set("GENTI_RESET_CODE", otp)

        router.push('/auth/reset-password')
    }


    useEffect(() => {
        if (secondsLeft > 0) {
            setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
        } else {
            setResend(true)

        }
    }, [secondsLeft])




    return (
        <div className='bg-gradient-to-b from-[#12121296] to-[#101010fa] rounded-4xl flex items-center justify-center'>
            <form className='auth-form w-[100%] px-24 py-6 h-[calc(81vh - 23px)] mt-[23px] relative mobile-form' autoComplete='off' >
                <div className='mb-3 '>
                    <h3 className='form-title font-[500] text-[18px] leading-[29px] text-center text-white sign-text mb-[20px]'>Enter OTP</h3>
                </div>
                <div className='text-center '>
                <p className='otp-text font-normal text-[14px] leading-[22px] text-center text-[#CECECE] mb-0'>Please enter the 4-digit code sent to</p>
                <p className='verify-email font-normal text-[14px] leading-[22px] text-center text-[#D5ACFF]'>{userEmail}</p>
                </div>

                <div className='otp-verify-wrapper mt-[68px] mb-[60px]'>
                    <OtpForm otp={otp} setOtp={setOtp} />
                </div>


                <div className='sign-in-btn mb-4' type='submit'>
                    <button className='btn auth-btn bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] rounded-[100px] font-[500] text-[14px] leading-[22px] text-center text-white py-[14px] w-full ' disabled={isLoading || verifying || otp.length < 4} onClick={(e) => {
                        e.preventDefault()
                        // setVerificationSuccess(true)
                        handleOTPVerification()
                    }}>
                        {
                            verifying ?
                                <ButtonLoader /> :
                                'Confirm'
                        }

                    </button>
                </div>

                <div>
                    {
                        resend ? <p role='button' className='verify-email font-normal text-[14px] leading-[22px] text-center text-[#D5ACFF]' onClick={() => {
                            const data = {
                                email: userEmail
                            }
                            setResend(false)
                            setSecondsLeft(60)
                            requestOTP(data)
                        }}>
                            Resend OTP
                        </p> : <p className='resend-otp-text font-normal text-[14px] leading-[22px] text-center text-[#C4C4C4]'>
                            Resend OTP in  <span className='resend-countdown text-white'>{`${secondsLeft}s`}</span>
                        </p>
                    }

                </div>

                <div className='back-icon w-[33px] h-[33px] top-[20px] left-[20px] bg-[#262626] backdrop-blur-[2.7px] rounded-[9px] flex items-center justify-center absolute' role='button' onClick={() => {
                    router.push('/auth/forgot-password')
                }}>
                    {/* <img src={arrowIcon} alt='arrow' className='arrow-icon' /> */}
                    <Image src={'/assets/img/arrow.svg'} alt='arrow' className='arrow-icon' width={15} height={15} />
                </div>

            </form>

        </div>
    )
}

export default OTP
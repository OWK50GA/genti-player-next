'use client'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordValidation } from '../../utils/form_validation';
import { useMutation } from 'react-query';
import Client from '../../client'
import { toast } from 'react-toastify';
import ButtonLoader from '../../components/ButtonLoader';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const Login = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(forgotPasswordValidation),
    });


    const { mutate: verifyEmail, isLoading } = useMutation(Client.auth.forgot_password, {
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error.message)
            } else {
                // toast.success(data.data.message)
                reset();
                router.push('/auth/verify-OTP')
            }
        },
        onError: (error) => {
            if (error.response) return toast.error(error.response.data.error.message)
            else if (error.data) return toast.error(error.data.message)
            else return toast.error(error.message)

        }
    })

    const onSubmitHandler = (data) => {
        Cookies.set("GENTI_RESET_EMAIL", data.verify)
        verifyEmail(data)
    };



    return (
        <div className="bg-gradient-to-b from-[#12121296] to-[#101010fa] rounded-4xl flex items-center justify-center">
            <form className='auth-form relative mobile-form w-[100%] px-12 py-6' autoComplete='off' onSubmit={handleSubmit(onSubmitHandler)} >

                <>
                    <div className='mb-3 '>
                        <h3 className='form-title font-[500] text-[18px] leading-[29px] text-center text-white sign-text mb-[20px]'>Forgot Password</h3>
                    </div>
                    <div className='text-center '>
                        <p className='otp-text font-normal text-[14px] leading-[22px] text-center text-[#CECECE] mb-0'>Please enter your email address</p>
                    </div>

                    <div className='password-reset-email my-[58px] flex flex-col gap-2'>
                        {
                            errors.verify ? <p className='text-red-400 auth-label font-normal text-[13px] leading-[21px] mb-0'>{errors.verify?.message}</p> : <label className='auth-label font-normal text-[13px] leading-[21px]'>Email Address</label>
                        }
                        <input
                            type='email'
                            autoComplete="off"
                            placeholder='account@email.com'
                            className={`auth-input bg-transparent border border-[#8C8C8C] rounded-[30px] text-[14px] leading-[22px] text-white transition duration-100 ease-in-out py-[12px] pl-[20px] focus:border focus:border-[#C084FF] focus:rounded-[30px] focus:bg-transparent form-control ${errors.email ? 'border-red-400' : ''} `}
                            {...register("verify")}
                        />
                    </div>


                    <div className='sign-in-btn mb-[25px]'>
                        <button className='btn auth-btn bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] rounded-[100px] font-[500] text-[14px] leading-[22px] text-center text-white py-[14px] w-100' disabled={isLoading} type='submit' >
                            {
                                isLoading ?
                                    <ButtonLoader /> :
                                    'Reset Password'
                            }
                        </button>
                    </div>
                </>







                <div className='back-icon d-flex align-items-center justify-content-center position-absolute' role='button' onClick={() => {
                    router.push('/auth/login')
                }}>
                    {/* <img src={arrowIcon} alt='arrow' className='arrow-icon' /> */}
                    <Image src={'/assets/img/arrow.svg'} alt='arrow' className='arrow-icon' width={40} height={40} />
                </div>

            </form>
        </div>
    )
}

export default Login
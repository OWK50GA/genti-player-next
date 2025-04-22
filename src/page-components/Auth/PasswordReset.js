'use client'

import { useState } from 'react'
// import AuthLayout from '../../layout/Auth'
// import { useNavigate } from 'react-router-dom'
// import Success from '../../components/SuccessAnimation'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordValidation } from '../../utils/form_validation';
import { useMutation } from '@tanstack/react-query';
import ButtonLoader from '../../components/ButtonLoader';
import Cookies from 'js-cookie';


import Client from '../../client'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Success = dynamic(
    () => import('../../components/SuccessAnimation'),
    { ssr: false }
  );

const Login = () => {
    // const navigate = useNavigate()
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('password-form')
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }
    const togglePassword2 = () => {
        setShowPassword2(!showPassword2)
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(resetPasswordValidation),
    });


    const { mutate: resetPassword, isLoading } = useMutation({
        mutationFn: Client.auth.reset_password, 
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error.message)
            } else {
                reset();
                Cookies.remove("GENTI_RESET_EMAIL")
                Cookies.remove("GENTI_RESET_CODE")
                setActiveSection('congrats-form')
            }

        },
        onError: (error) => {
            if (error.response) return toast.error(error.response.data.error ? error.response.data.error.message : error.response.data.message)
            else if (error.data) return toast.error(error.data.message)
            else return toast.error(error.message)

        }
    })

    const onSubmitHandler = (data) => {

        data.email = Cookies.get("GENTI_RESET_EMAIL")
        data.code = Cookies.get("GENTI_RESET_CODE")

        resetPassword(data)
    };


    return (
        <div className='register-form__container bg-gradient-to-b from-[#12121296] to-[#101010fa] rounded-4xl flex items-center justify-center'>

            {
                activeSection === 'password-form' && <form className='auth-form w-[100%] px-6 py-6 h-[calc(81vh - 23px)] mt-[23px] relative mobile-form' onSubmit={handleSubmit(onSubmitHandler)} >
                    <div className='mb-5'>
                        <h3 className='form-title font-[500] text-[18px] leading-[29px] text-center text-white sign-text mb-[20px] sign-text'>New Password</h3>
                        <p className='otp-text font-normal text-[14px] leading-[22px] text-center text-[#CECECE] mb-0'>Please enter your new password to continue</p>
                    </div>

                    <div className='mb-4'>
                        {errors.new_password ? <p className='text-red-400 auth-label font-normal text-[13px] leading-[21px] mb-0'>{errors.new_password?.message}</p> : <label className='auth-label' tabIndex={0}>Password</label>}
                        <div className='password-input-wrappe flex items-center justify-between'>
                            <input type={`${showPassword ? 'text' : 'password'}`} className={`auth-input form-control bg-transparent border border-[#8C8C8C] rounded-[30px] text-[14px] leading-[22px] text-white transition duration-100 ease-in-out py-[12px] pl-[20px] focus:border focus:border-[#C084FF] focus:rounded-[30px] focus:bg-transparent form-control w-100 ${errors.new_password ? 'border-danger' : ''}`} {...register("new_password")} />
                            <div className='visibility-icon absolute left-[78%] text-center text-white bg-transparent rounded-[5px] px-[15px] py-[5px] font-normal text-[10px] leading-[16px] right-[25px] top-[41%]' onClick={togglePassword} role='button'>
                                {`${showPassword ? 'HIDE' : 'SHOW'}`}
                            </div>
                        </div>
                    </div>

                    <div className='mb-5'>
                        {errors.confirm_password ? <p className='text-red-400 auth-label font-normal text-[13px] leading-[21px] mb-0'>{errors.confirm_password?.message}</p> : <label className='auth-label' tabIndex={0}>Re-enter New Password</label>}
                        <div className='password-input-wrappe flex items-center justify-between'>
                            <input type={`${showPassword2 ? 'text' : 'password'}`} className={`auth-input form-control bg-transparent border border-[#8C8C8C] rounded-[30px] text-[14px] leading-[22px] text-white transition duration-100 ease-in-out py-[12px] pl-[20px] focus:border focus:border-[#C084FF] focus:rounded-[30px] focus:bg-transparent form-control w-100 ${errors.password ? 'border-red-400' : ''} ${errors.confirm_password ? 'border-danger' : ''}`} {...register("confirm_password")} />
                            <div className='visibility-icon  text-center text-white bg-transparent rounded-[5px] px-[15px] py-[5px] font-normal text-[10px] leading-[16px] right-[25px] top-[65%] absolute left-[78%]' onClick={togglePassword2} role='button'>
                                {`${showPassword2 ? 'HIDE' : 'SHOW'}`}
                            </div>
                        </div>
                    </div>

                    <div className='sign-in-btn'>
                        <button className='btn auth-btn bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] rounded-[100px] font-[500] text-[14px] leading-[22px] text-center text-white py-[14px] w-full ' type='submit' disabled={isLoading}>
                            {
                                isLoading ?
                                    <ButtonLoader /> :
                                    'Reset Password'
                            }

                        </button>
                    </div>

                </form>
            }

            {
                activeSection === 'congrats-form' && <form className='auth-form position-relative'>
                    <div className='animation-wrapper mb-2'>
                        <Success />
                    </div>
                    <p className='congrats-text'>All Set!! </p>
                    <p className='congrats-sub-text'>You have successfully reset your password. </p>
                    <div className='sign-in-btn'>
                        <button className='btn auth-btn w-100 ' onClick={(e) => {
                            e.preventDefault()
                            router.push("/auth/login")
                        }}>
                            Done
                        </button>
                    </div>
                </form>
            }


        </div>
    )
}

export default Login
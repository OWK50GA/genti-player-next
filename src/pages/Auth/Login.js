'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from '../../utils/form_validation';
import { useMutation } from 'react-query';
import Client from '../../client'
import { toast } from 'react-toastify';
import ButtonLoader from '../../components/ButtonLoader';
// import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
// import s1 from '../../assets/img/s1.svg'
// import s2 from '../../assets/img/s2.svg'
// import s3 from '../../assets/img/s3.svg'
// import showPasswordIcon from '../../assets/img/showPassword.svg'
// import logo from '../../assets/img/newLogo.svg'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { isLoadedFromAyoba } from '../../utils/Ayobacheck';
import { getDeviceSignature } from '../../utils/deviceSignature';
import Image from 'next/image';
import { useRouter } from 'next/navigation';





const Login = () => {
    const [device_signature, setDeviceSignature] = useState(null)


    const fetchData = async () => {
        try {
            const signature = await getDeviceSignature();
            setDeviceSignature(signature);
        } catch (error) {
            console.error('Error fetching device signature:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const ayobaCheck = isLoadedFromAyoba()
    // const navigate = useNavigate()
    const router = useRouter();
    const fb_access_token = useRef(null)

    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(loginValidation),
    });



    const { mutate: storeSignature, isLoading: storing } = useMutation(Client.auth.store_device_signature, {
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error.message)
            } else {

                const intent_url = localStorage.getItem('genti_intent_url')
                if (intent_url) {
                    router.push(intent_url)
                } else {
                    router.push('/')

                }
            }

        },
        onError: (error) => {
            if (error.response) return toast.error(error.response.data.error.message)
            else if (error.data) return toast.error(error.data.message)
            else return toast.error(error.message)

        }
    })


    const { mutate: loginUser, isLoading } = useMutation(Client.auth.login, {
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error.message)
            } else {
                Cookies.set("GENTI_APP_TOKEN", data.data.access_token)
                Cookies.set("GENTI_APP_CURRENT_USER", JSON.stringify(data.data.user_detail))
                reset();
                storeSignature({
                    device_signature
                })
            }

        },
        onError: (error) => {
            if (error.response) return toast.error(error.response.data.error.message)
            else if (error.data) return toast.error(error.data.message)
            else return toast.error(error.message)

        }
    })

    const { mutate: loginWithGoogle, isLoading: is_loading } = useMutation(Client.auth.google_login, {
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error.message)
            } else {
                Cookies.set("GENTI_APP_TOKEN", data.access_token)
                Cookies.set("GENTI_APP_CURRENT_USER", JSON.stringify(data.user_detail))
                reset();
                storeSignature({
                    device_signature
                })
            }

        },
        onError: (error) => {
            if (error.response) return toast.error(error.response.data.error.message)
            else if (error.data) return toast.error(error.data.message)
            else return toast.error(error.message)

        }
    })


    const { mutate: getGoogleDetails, isLoading: loading } =
        useMutation((token) => axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }),
            {
                onSuccess: (data, variables, context) => {
                    const { name, email } = data.data
                    const payload = { name, email, access_token: variables }
                    loginWithGoogle(payload)
                    // if (data.error) {
                    //     toast.error(data.error.message)
                    // } else {
                    //     Cookies.set("GENTI_APP_TOKEN", data.data.access_token)
                    //     Cookies.set("GENTI_APP_CURRENT_USER", JSON.stringify(data.data.user_detail))
                    //     reset();
                    //     const intent_url = localStorage.getItem('genti_intent_url')
                    //     if (intent_url) {
                    //         navigate(intent_url)
                    //     } else {
                    //         navigate('/explore')

                    //     }
                    // }

                },
                onError: (error) => {
                    if (error.response) return toast.error(error.response.data.error.message)
                    else if (error.data) return toast.error(error.data.message)
                    else return toast.error(error.message)

                }
            })



    const handleGoogleLogin = useGoogleLogin({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID,
        onSuccess: credentialResponse => {
            getGoogleDetails(credentialResponse.access_token)
        },
        onError: () => {
        },
    });






    const { mutate: loginWithFacebook, isLoading: fb_loading } = useMutation(Client.auth.facebook_login, {
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error.message)
            } else {
                Cookies.set("GENTI_APP_TOKEN", data.access_token)
                Cookies.set("GENTI_APP_CURRENT_USER", JSON.stringify(data.user_detail))
                reset();
                storeSignature({
                    device_signature
                })
            }

        },
        onError: (error) => {
            if (error.response) return toast.error(error.response.data.error.message)
            else if (error.data) return toast.error(error.data.message)
            else return toast.error(error.message)

        }
    })

    const handleFacebookLogin = (values) => {
        // values.access_token = fb_access_token
        loginWithFacebook(values)
    }




    const onSubmitHandler = (data) => {

        loginUser(data)
    };


    return (
        <div className='register-form__container bg-gradient-to-b from-[#12121296] to-[#101010fa] rounded-4xl flex items-center justify-center'>
            <form className='auth-form w-[100%] px-6 py-6' onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='mb-3'>
                    <h3 className='form-title font-[500] text-[18px] leading-[29px] text-center text-white sign-text mb-[20px]'>Sign In</h3>
                </div>
                <div className='mb-3 flex flex-col gap-2'>
                    {
                        errors.email ? <p className='text-red-400 auth-label font-normal text-[13px] leading-[21px] mb-0'>{errors.email?.message}</p> : <label className='auth-label font-normal text-[13px] leading-[21px] text-white mb-0'>Email Address</label>
                    }
                    <input
                        // type='email'
                        placeholder='account@email.com'
                        className={`auth-input bg-transparent border border-[#8C8C8C] rounded-[30px] text-[14px] leading-[22px] text-white transition duration-100 ease-in-out py-[12px] pl-[20px] focus:border focus:border-[#C084FF] focus:rounded-[30px] focus:bg-transparent form-control ${errors.email ? 'border-red-400' : ''} `}
                        {...register("email")}
                    />
                </div>
                <div className='mb-2 flex flex-col gap-2'>
                    {errors.password ? <p className='text-red-400 auth-label font-normal text-[13px] leading-[21px] mb-0'>{errors.password?.message}</p> : <label className='auth-label font-normal text-[13px] leading-[21px]' tabIndex={0}>Password</label>}
                    <div className='password-input-wrappe flex items-center justify-between'>

                        <input
                            type={`${showPassword ? 'text' : 'password'}`}
                            className={`auth-input bg-transparent border border-[#8C8C8C] rounded-[30px] text-[14px] leading-[22px] text-white transition duration-100 ease-in-out py-[12px] pl-[20px] focus:border focus:border-[#C084FF] focus:rounded-[30px] focus:bg-transparent form-control w-100 ${errors.password ? 'border-danger' : ''}`}
                            {...register("password")}
                        />
                        <div className='visibility-icon absolute text-center text-white bg-transparent rounded-[5px] px-[15px] py-[5px] font-normal text-[10px] leading-[16px] right-[25px] top-[39%]' onClick={togglePassword} role='button'>
                            {/* <img src={showPasswordIcon} alt='icon' /> */}
                            <Image src={'/assets/img/showPassword.svg'} alt='icon' height={30} width={30} />
                            {/* {`${showPassword ? 'HIDE' : 'SHOW'}`} */}
                        </div>
                    </div>
                </div>
                <div className=' w-full forgot-password-link mb-[25px] text-[#888888]'>
                    <Link href={'/auth/forgot-password'} className='auth-link font-normal text-[14px] leading-[22px] text-right text-[#888888] hover:text-[#8642CC] focus:text-[#8642CC]'>Forgot Password?</Link>
                </div>

                <div className='sign-in-btn mb-[25px]'>
                    <button className='btn auth-btn bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] rounded-[100px] font-[500] text-[14px] leading-[22px] text-center text-white py-[14px] w-full ' type='submit' disabled={isLoading}>
                        {
                            isLoading || storing ?
                                <ButtonLoader /> :
                                'Sign In'
                        }


                    </button>
                </div>

                {
                    !ayobaCheck ? <div className='social-logins__wrapper'>
                        <div className='strike block text-center overflow-hidden whitespace-nowrap mb-[30px]'>
                            <div className='flex items-center gap-2'>
                                <div className="flex-1 h-px bg-[#888888]"></div>
                                <span className="text-sm text-[#888888]">OR</span>
                                <div className="flex-1 h-px bg-[#888888]"></div>
                            </div>
                        </div>

                        <FacebookLogin
                            appId={process.env.NEXT_PUBLIC_FACEBOOK_APPID}
                            scope=''
                            fields='name,email'
                            onSuccess={(response) => {
                                fb_access_token.current = response.accessToken
                                // setFBAccessToken(token => token = response.accessToken)
                            }}
                            onFail={(error) => {
                            }}
                            onProfileSuccess={(response) => {
                                response.access_token = fb_access_token.current
                                handleFacebookLogin(response)
                            }}

                            render={({ onClick, logout }) => (
                                <div className='social-login-wrapper border border-[#8E8E8E] rounded-[100px] p-[12px] mb-[16px] cursor-pointer flex items-center'
                                    onClick={onClick}
                                    onLogoutClick={logout}
                                >
                                    <div className='social-login__logo'>
                                        {/* <img src={s1} alt='facebook' /> */}
                                        <Image src={'/assets/img/s1.svg'} alt='facebook' width={40} height={40} />
                                    </div>
                                    <p className='social-login_name font-normal text-[16px] leading-1.5 text-[#FDFDFD] mb-0 w-full text-center'>Sign in with Facebook</p>

                                </div>
                                // <CustomComponent onClick={onClick} onLogoutClick={logout} />
                            )}
                        />

                        <div className='social-login-wrapper border border-[#8E8E8E] rounded-[100px] p-[12px] mb-[16px] cursor-pointer flex items-center'
                            onClick={() => {
                                handleGoogleLogin()
                            }}>
                            <div className='social-login__logo'>
                                {/* <img src={s3} alt='google' /> */}
                                <Image src={'/assets/img/s3.svg'} alt='google' width={40} height={40}/>
                            </div>
                            <p className='social-login_name font-normal text-[16px] leading-1.5 text-[#FDFDFD] mb-0 w-full text-center'>Sign in with Google</p>

                        </div>
                        {/* <div className='social-login-wrapper d-flex'>
                        <div className='social-login__logo'>
                            <img src={s2} alt='facebook' />
                        </div>
                        <p className='social-login_name mb-0 w-100 text-center'>Sign in with Apple</p>

                    </div> */}

                    </div> : null
                }



                <div>
                    <p className='auth-text text-[14px] leading-[22px] text-center text-[#8642CC]'>
                        <span className='text-white'>New to Genti?</span>  <Link href={'/auth/register'} className='auth-link font-normal text-[14px] leading-[22px] text-right'>Create Account</Link>
                    </p>
                </div>

                {/* <div>
                    <p className='auth-text'>
                        New to Genti?  <Link to={'/auth/register'} className='auth-link'>Create Account</Link>
                    </p>
                </div> */}

            </form>
        </div>
    )

}

export default Login
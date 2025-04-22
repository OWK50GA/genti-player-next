'use client'

import React, { useState, useRef, useEffect } from 'react'
// import AuthLayout from '../../layout/Auth'
import countryCode from '../../utils/countryCode'
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from '../../utils/form_validation';
import { useMutation, useQuery } from '@tanstack/react-query';
import Client from '../../client'
import { toast } from 'react-toastify';
import ButtonLoader from '../../components/ButtonLoader';
import Cookies from 'js-cookie';
import { Row, Col } from 'reactstrap'
import Select from 'react-select';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login'
import { isLoadedFromAyoba } from '../../utils/Ayobacheck';

import { getDeviceSignature } from '../../utils/deviceSignature';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const Login = () => {
    const ayobaCheck = isLoadedFromAyoba()
    const fb_access_token = useRef(null)
    const router = useRouter();

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


    const { mutate: storeSignature, isLoading: storing } = useMutation({
        mutationFn: Client.auth.store_device_signature, 
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


    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(registerValidation),
    });

    const [userCallingCode, setUserCallingCode] = useState(null)

    const getUserCountry = async () => {
        const data = await axios.get(`https://api.ipregistry.co/?key=${process.env.NEXT_PUBLIC_LOCATION_KEY}`)

        // return data.data.location.country.calling_code
        setUserCallingCode(data.data.location.country.calling_code)

    }

    useQuery({
        queryKey: ['user-country'], 
        queryFn: () => { getUserCountry() }
    })

    const { field: { value: gender, onChange: typeOnChange, ...restTypeField } } = useController({ name: 'gender', control });

    const types = [{
        title: '0-15',
        id: '1'

    }, {
        title: '16-30',
        id: '2'

    }]
    const genderOptions = [{
        title: 'Male',
        id: '1'

    }, {
        title: 'Female',
        id: '2'

    }]
    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }




    const { mutate: registerUser, isLoading } = useMutation({
        mutationFn: Client.auth.register, 
        onSuccess: async (data) => {
            // reset();
            router.push('/auth/OTP')

        },
        onError: (error) => {
            if (error.response) return toast.error(error.response.data.error.message)
            if (error.data) return toast.error(error.data.message)
            else toast.error(error.message)

        }
    })

    const onSubmitHandler = (data) => {
        Cookies.set("GENTI_NEW_USER_EMAIL", data.email)
        data.country_id = `+${userCallingCode}`;
        data.mobile_number = ''
        registerUser({ ...data, isRegister: 0, version: 'web' })
    };



    const { mutate: loginWithGoogle, isLoading: is_loading } = useMutation({
        mutationFn: Client.auth.google_login, 
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error.message)
            } else {
                Cookies.set("GENTI_APP_TOKEN", data.access_token)
                Cookies.set("GENTI_APP_CURRENT_USER", JSON.stringify(data.user_detail))
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
        useMutation({
            mutationFn: (token) => axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }),
                
            onSuccess: (data, variables, context) => {
                const { name, email } = data.data
                const payload = { name, email, access_token: variables, country_id: `${userCallingCode}` }
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



    const { mutate: loginWithFacebook, isLoading: fb_loading } = useMutation({
        mutationFn: Client.auth.facebook_login, 
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error.message)
            } else {
                Cookies.set("GENTI_APP_TOKEN", data.access_token)
                Cookies.set("GENTI_APP_CURRENT_USER", JSON.stringify(data.user_detail))
                // reset();
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
        values.country_id = `+${userCallingCode}`
        loginWithFacebook(values)
    }


    // const navigate = useNavigate()
    return (
        // <AuthLayout>
        <div className='bg-gradient-to-b from-[#12121296] to-[#101010fa] rounded-4xl flex items-center justify-center'
        >
            <form className='auth-form w-[100%] px-6 py-3' autoComplete='off' onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='mb-3'>
                    <h3 className='form-title font-[500] text-[18px] leading-[25px] text-center text-white sign-text mb-[5px]'>Create Account</h3>
                </div>
                <div className='mb-1 flex flex-col gap-1'>
                    {
                        errors.name ? <p className='text-red-400 auth-label font-normal text-[13px] leading-[21px] mb-0'>{errors.name?.message}</p> : <label className='auth-label font-normal text-[13px] leading-[21px] text-white mb-0'>Name</label>
                    }
                    <input 
                        type='' 
                        placeholder='e.g Abdusallam Robiat' 
                        className={`auth-input bg-transparent border border-[#8C8C8C] rounded-[30px] text-[14px] leading-[22px] text-white transition duration-100 ease-in-out py-[12px] pl-[20px] focus:border focus:border-[#C084FF] focus:rounded-[30px] focus:bg-transparent form-control ${errors.email ? 'border-red-400' : ''} `}
                        {...register("name")} 
                    />
                </div>
                <div className='mb-1 flex flex-col gap-1'>
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
                {/* <div className='mb-4 '>

                    {errors.mobile_number ? <p className='text-danger auth-label mb-0'>{errors.mobile_number?.message}</p> : errors.country_id ? <p className='text-danger auth-label mb-0'>{errors.country_id?.message}</p> : <label className='auth-label'>Phone Number</label>}
                    <div className={`${errors.mobile_number || errors.country_id ? 'border-danger' : ""} d-flex phone-number-wrapper`}>
                        <div className='d-flex align-items-center w-5' style={{
                            paddingLeft: '13px',
                            width: '80px'
                        }}>
                            <div className='text-white'>+</div>
                            <select className='phone-input-select  w-100' style={{
                                paddingRight: '0'
                            }} {...register("country_id")}>
                                {countryCode.map((el, i) => <option label={`${el?.code}`} value={`+${el?.code}`}>{`+${el?.code}`}</option>)}
                            </select>
                        </div>

                        <span />
                        <input type='phone'
                            readOnly
                            placeholder='Phone Number'
                            onFocus={(e) => e.target.removeAttribute('readonly')}
                            className='auth-input form-control w-75 border-set-right'
                            {...register("mobile_number")}
                        />
                    </div>
                </div> */}
                <div className='flex items-center justify-between mb-1'>
                    <div className='w-[48%] flex flex-col gap-1'>
                        {
                            errors.dob ? <label className='text-red-400 auth-label font-normal text-[13px] leading-[21px]'>{errors.dob?.message}</label> : <label className='font-normal text-[13px] leading-[21px] block auth-label'>Date of birth</label>
                        }
                        <input type='date' autoComplete="off" placeholder='' className={`${errors.dob ? 'border-red-400' : ""} auth-input bg-transparent border border-[#8C8C8C] rounded-[30px] text-[14px] leading-[22px] text-white transition duration-100 ease-in-out py-[12px] pl-[20px] form-control w-full`} {...register("dob")} />
                    </div>
                    <div className='w-[48%] flex flex-col gap-1'>
                        {
                            errors.gender ? <label className='text-red-400 auth-label font-normal text-[13px] leading-[21px] mb-0'>{errors.gender?.message}</label> : <label className='text-white auth-label font-normal text-[13px] leading-[21px] mb-0'>Gender</label>
                        }
                        <div className={`border border-[#8C8C8C] rounded-[30px] w-full focus-within:border focus-within:border-[#C084FF] ${errors.gender ? 'error_detected border border-[#dc3545]' : ""}`}>
                            <Select
                                className={`form-control cstm-react__select__wrapper bg-none text-[14px] border-none leading-[22px] text-white transition duration-100 ease-in-out py-[6px] pl-[20px]`}
                                placeholder='Select Option'
                                classNamePrefix=""
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: '#8E75FF',
                                        primary: '#121212',
                                    },
                                    borderRadius: 0,
                                })}
                                styles={{
                                    control: (base) => ({
                                      ...base,
                                      backgroundColor: 'transparent',
                                      border: 'none',
                                      boxShadow: 'none',
                                      minHeight: 'auto',
                                    }),
                                    input: (base) => ({
                                      ...base,
                                      color: 'white',
                                      padding: 0,
                                      margin: 0,
                                    }),
                                    placeholder: (base) => ({
                                      ...base,
                                      color: '#8C8C8C',
                                      fontSize: '14px',
                                    }),
                                    singleValue: (base) => ({
                                      ...base,
                                      color: 'white',
                                    }),
                                    menu: (base) => ({
                                      ...base,
                                      backgroundColor: '#121212',
                                      border: '1px solid #8C8C8C',
                                      borderRadius: '8px',
                                    }),
                                    option: (base, state) => ({
                                      ...base,
                                      backgroundColor: state.isFocused ? '#2D2D2D' : '#121212',
                                      color: 'white',
                                      ':active': {
                                        backgroundColor: '#3D3D3D',
                                      },
                                    }),
                                    dropdownIndicator: (base) => ({
                                      ...base,
                                      color: '#8C8C8C',
                                      paddingRight: '16px',
                                      ':hover': {
                                        color: '#C084FF',
                                      },
                                    }),
                                    indicatorSeparator: () => ({
                                      display: 'none',
                                    }),
                                  }}
                                options={genderOptions ?
                                    genderOptions.map(el => (
                                        {
                                            label: el?.title,
                                            value: el?.id
                                        }
                                    )
                                    ) : []
                                }

                                onChange={option => typeOnChange(option ? option.value : option)}
                                {...restTypeField}
                            />
                        </div>
                    </div>
                </div>
    
                <div className='mb-5 flex flex-col gap-2'>
                    {errors.password ? <p className='text-red-400 auth-label font-normal text-[13px] leading-[21px] mb-0'>{errors.password?.message}</p> : <label className='auth-label font-normal text-[13px] leading-[21px] text-white mb-0' tabIndex={0}>Password</label>}

                    <div className='password-input-wrappe flex items-center justify-between'>
                        <input
                            type={`${showPassword ? 'text' : 'password'}`}
                            className={`auth-input bg-transparent border border-[#8C8C8C] rounded-[30px] text-[14px] leading-[22px] text-white transition duration-100 ease-in-out py-[12px] pl-[20px] focus:border focus:border-[#C084FF] focus:rounded-[30px] focus:bg-transparent form-control w-100 ${errors.password ? 'border-danger' : ''}`}
                            {...register("password")}
                        />
                        <div className='visibility-icon absolute text-center text-white bg-transparent rounded-[5px] px-[15px] py-[5px] font-normal text-[10px] leading-[16px] right-[25px] top-[51%]' onClick={togglePassword} role='button'>
                            {/* <img src={showPasswordIcon} alt='icon' /> */}
                            <Image src={'/assets/img/showPassword.svg'} alt='icon' height={30} width={30} />
                            {/* {`${showPassword ? 'HIDE' : 'SHOW'}`} */}
                        </div>
                    </div>
                </div>


                <div className='sign-in-btn mb-[20px]'>
                    <button className='btn auth-btn bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] rounded-[100px] font-[500] text-[14px] leading-[22px] text-center text-white py-[14px] w-full  ' type='submit' disabled={isLoading}>
                        {
                            isLoading ?
                                <ButtonLoader /> :
                                'Create Account'
                        }

                    </button>
                </div>
                {
                    !ayobaCheck ? <div className='social-logins__wrapper my-3'>
                        <div className='strike mb-2'>
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
                                <div className='social-login-wrapper border border-[#8E8E8E] rounded-[100px] p-[12px] mb-[16px] cursor-pointer items-center flex'
                                    onClick={onClick}
                                    // onLogoutClick={logout}
                                >
                                    <div className='social-login__logo'>
                                        {/* <img src={s1} alt='facebook' /> */}
                                        <Image src={'/assets/img/s1.svg'} alt='facebook' height={40} width={40} />
                                    </div>
                                    <p className='social-login_name font-normal text-[16px] leading-1.5 text-[#FDFDFD] mb-0 w-full text-center'>Sign in with Facebook</p>

                                </div>
                                // <CustomComponent onClick={onClick} onLogoutClick={logout} />
                            )}
                        />
                        <div className='social-login-wrapper border border-[#8E8E8E] rounded-[100px] p-[12px] mb-[16px] cursor-pointer flex items-center'
                            onClick={() => {
                                handleGoogleLogin()
                            }}
                        >
                            <div className='social-login__logo'>
                                {/* <img src={s3} alt='google' /> */}
                                <Image src={'/assets/img/s3.svg'} alt='google' height={40} width={40} />
                            </div>
                            <p className='social-login_name font-normal text-[16px] leading-1.5 text-[#FDFDFD] mb-0 w-full text-center'>Continue with Google</p>

                        </div>
                        {/* <div className='social-login-wrapper d-flex'>
                            <div className='social-login__logo'>
                                <img src={s2} alt='facebook' />
                            </div>
                            <p className='social-login_name mb-0 w-100 text-center'>Continue with Apple</p>

                        </div> */}

                    </div> : null
                }

                <div>
                    <p className='auth-text'>
                        Already have account?  <Link href={'/auth/login'} className='auth-link'>Sign In</Link>
                    </p>
                </div>

            </form>
        </div>


        // </AuthLayout>
    )
}

export default Login
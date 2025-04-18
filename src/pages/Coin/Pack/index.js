'use client'

import React, { useEffect } from 'react'
// import coinIcon from '../../../assets/img/activeCoin.svg'
import Cookies from 'js-cookie'
import GetTrialCoinManager from '../../../client/coins/GetTrialCoin';
import ButtonLoader from '../../../components/ButtonLoader';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Pack = ({ pack }) => {
    const { getTrialCoin, isLoading, isSuccess } = GetTrialCoinManager()
    const router = useRouter();

    // useEffect(() => {
    //     if (isSuccess) {
    //         navigate('/coin/balance')
    //     }
    // }, [isSuccess])

    return (
        <div className='block md:flex justify-between items-center'>
            <div className='flex items-center'>
                <div className='flex items-center rounded-[10px] bg-[#5F42E2] w-[82px] h-[82px] shrink-0 mr-[16px] flex-col justify-center'>
                    {/* <img src={coinIcon} alt='icon' style={{
                        height: '32px',
                        width: '32px',
                        marginBottom: '8px'
                    }} /> */}
                    <Image 
                        src={'/assets/img/activeCoin.svg'}
                        alt='icon'
                        height={32} width={32}
                        className='w-[32px] h-[32px] mb-[8px]'
                    />
                    <p className='pack-value text-[#FDFDFD] text-[12px] font-normal leading-1.5 mb-0'>{`${pack?.unit ?? 0} coins`}</p>
                </div>
                <div className='flex flex-col justify-center'>
                    <p className='coin-pack_title text-[#FDFDFD] text-[20px] font-normal'>{pack?.title}</p>
                    <div className='hidden md:flex'>
                        <p className=' coin-pack__amount bg-[#408727] rounded-[8px] px-[12px] py-[6px] my-1'>{pack?.amount_web === 0 ? 'Free' : `${pack?.currency_group === 2 ? '₦' : '$'}${pack?.amount_web?.toLocaleString() ?? 0}`}</p>

                    </div>

                    <div className='block md:hidden'>
                        <p className='text-[#FDFDFD] text-[14px] font-normal px-[12px] py-[6px] rounded-[8px] bg-[#408727] my-1'>{pack?.amount_web === 0 ? 'Free' : `${pack?.currency_group === 2 ? '₦' : '$'}${pack?.amount_web?.toLocaleString() ?? 0}`}</p>

                    </div>
                    <p className=' text-white mb-0'>{pack?.bonus === 0 ? '' : `+${pack?.bonus?.toLocaleString()} free coins`}</p>

                    <p className='text-[#888] text-[16px] font-normal mb-0 hidden md:block'>{pack?.description}</p>
                </div>


            </div>
            {
                pack?.description?.length > 0 && <p className='text-[#888] text-[16px] font-normal my-1 block md:hidden'>{pack?.description}</p>
            }

            <button
                disabled={isLoading}
                className='btn coin-cta__btn text-[#FDFDFD] text-[16px] px-[24px] py-[12px] font-bold rounded-[30px] bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] mt-[18px]'
                onClick={() => {
                    if (pack?.amount_web === 0) {
                        getTrialCoin()
                    } else {
                        Cookies.set('selected_pack', JSON.stringify(pack))
                        // //console.log(pack)
                        router.push('/coin/payment')
                    }

                }}
            >
                {
                    isLoading ? <ButtonLoader /> : <>
                        {
                            pack?.amount_web !== 0 ? 'Buy Now' : 'Get Started'
                        }
                    </>
                }
            </button>
        </div>)
}

export default Pack
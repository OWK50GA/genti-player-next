import React, { useState, useEffect } from 'react'
// import AppLayout from '../../layout/App'
// import whiteLogo from '../../assets/img/gfw.svg'
import useGetCoinsManager from '../../client/coins/GetCoinsManager'
import CoinsPack from './CoinsPlan';
// import coinIcon from '../../assets/img/activeCoin.svg'
import Pack from './Pack';
import Streak from './Streak';
import { Axios as axios } from '../../utils/axios';
import Loader from '../../components/PageLoader';
// import { SEO } from '../../component/Seo';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Coin = () => {
    const router = useRouter();
    const [openStreakModal, setOpenStreakModal] = useState(false)
    const [userCallingCode, setUserCallingCode] = useState(null);
    const [isNigerian, setIsNigerian] = useState(false); // assuming initial value
    const toggleStreakModal = () => {
        setOpenStreakModal(!openStreakModal)
    }
    const getUserCountry = async () => {
        try {
            const response = await axios.get(`https://api.ipregistry.co/?key=${process.env.NEXT_PUBLIC_LOCATION_KEY}`);
            const callingCode = response.data.location.country.calling_code;
            setUserCallingCode(callingCode);
            setIsNigerian(callingCode === 234 || callingCode === "234");
        } catch (error) {
            console.error('Error fetching user country:', error);
        }
    };

    useEffect(() => {
        getUserCountry();
    }, []);

    const { coins, isLoading } = useGetCoinsManager(Boolean(userCallingCode), isNigerian);

    return (
        <>
            {
                isLoading || userCallingCode === null ? <Loader /> :
                    <>
                        <div className='h-[300px] px-[48px] py-[24px] bg-[url("/assets/img/coinbg3.png")] bg-cover bg-center w-[100%] flex flex-col'>
                            <div className='flex justify-between w-[100%]'>
                                <div>
                                    {/* <img src={whiteLogo} al='genti_' /> */}
                                    <Image src={'/assets/img/gfw.svg'} alt='genti' height={75} width={75} />

                                </div>
                                <div className='rounded-[46px] border border-[#ffffff0f] bg-[#121212] py-[6px] pl-[20px] pr-[10px] items-center flex gap-x-2'>
                                    <p className='coin-help text-[#C4C4C4] text-center text-[13px] font-medium mb-0'>Need Help?</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M10.0201 6L8.61011 7.41L13.1901 12L8.61011 16.59L10.0201 18L16.0201 12L10.0201 6Z" fill="#8161F4" />
                                    </svg>

                                </div>

                            </div>
                            <div className='mt-auto flex gap-x-3'>
                                <div className='me-4'>
                                    <p className='coin-section_text text-[16px] text-[#C4C4C4] font-normal mb-[12px]'>Balance</p>
                                    <div className='flex coin-section__content rounded-[10px] bg-[#121212] py-[12px] px-[15.04px] cursor-pointer items-center'>
                                        <div className='me-2 shrink-0'>
                                            {/* <img src={coinIcon} alt='icon' style={{
                                                height: '16px',
                                                width: '16px',
                                            }} /> */}
                                            <Image src={'/assets/img/activeCoin.svg'} height={16} width={16} alt='icon' />
                                        </div>
                                        <div className='w-full flex items-center justify-between'
                                            onClick={() => {
                                                router.push('/coin/balance')
                                            }}
                                        >
                                            <h3 className='coin-balance mb-0 me-4'>{`${coins?.balance ?? 0} Coins`}</h3>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M10.0201 6L8.61011 7.41L13.1901 12L8.61011 16.59L10.0201 18L16.0201 12L10.0201 6Z" fill="#FDFDFD" />
                                                </svg>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                {/* <div className='' onClick={() => {
                                    toggleStreakModal()
                                }}>
                                    <p className='coin-section_text'>Streak</p>
                                    <div className='d-flex coin-section__content '>
                                        <div className='me-2 flex-shrink-0'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_9162_8366)">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8605 10.3412C13.729 13.4822 11.1421 15.9885 7.96884 15.9885C4.71143 15.9885 2.0708 13.2591 2.0708 10.0905C2.0708 9.66692 2.06321 8.82049 2.69826 7.39241C3.0783 6.53776 3.31667 6.00085 3.4512 5.51006C3.52511 5.24032 3.66886 4.81177 4.07865 5.51006C4.32028 5.92179 4.32963 6.51398 4.32963 6.51398C4.32963 6.51398 5.22864 5.8241 5.83551 4.50614C6.72517 2.57403 6.01534 1.41908 5.77277 0.615941C5.68881 0.338105 5.63611 -0.16122 6.21198 0.0512348C6.79877 0.267768 8.35008 1.3537 9.161 2.49829C10.3183 4.13186 10.7296 5.69829 10.7296 5.69829C10.7296 5.69829 11.1002 5.23837 11.2316 4.75712C11.38 4.21368 11.3822 3.67545 11.859 4.25522C12.3124 4.80656 12.9859 5.84267 13.3649 6.82771C14.0532 8.61651 13.8605 10.3412 13.8605 10.3412Z" fill="url(#paint0_linear_9162_8366)" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.96857 15.989C5.71608 15.989 3.89014 14.163 3.89014 11.9105C3.89014 10.5514 4.43784 9.72625 5.57773 8.60726C6.30758 7.89077 6.99069 7.01077 7.28101 6.41156C7.33817 6.29359 7.46824 5.67888 7.96976 6.39863C8.23285 6.7761 8.64527 7.44741 8.90974 8.02034C9.36565 9.00814 9.47445 9.96544 9.47445 9.96544C9.47445 9.96544 9.92126 9.70216 10.2274 9.02426C10.3261 8.80578 10.5256 7.97868 11.0834 8.80566C11.4927 9.41253 12.055 10.5037 12.047 11.9105C12.047 14.163 10.221 15.989 7.96857 15.989Z" fill="#FC9502" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.03128 11.5352C8.61167 11.5352 8.61167 12.6099 9.34892 14.045C9.83984 15.0005 9.10553 15.9901 8.03128 15.9901C6.95702 15.9901 6.3999 15.1192 6.3999 14.045C6.3999 12.9708 7.45088 11.5352 8.03128 11.5352Z" fill="#FCE202" />
                                                </g>
                                                <defs>
                                                    <linearGradient id="paint0_linear_9162_8366" x1="7.97769" y1="16.0003" x2="7.97769" y2="0.0120818" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#FF4C0D" />
                                                        <stop offset="1" stop-color="#FC9502" />
                                                    </linearGradient>
                                                    <clipPath id="clip0_9162_8366">
                                                        <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className='w-full d-flex align-items-center justify-content-between'>
                                            <h3 className='coin-balance mb-0 me-4'>15 Days</h3>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M11.25 14.0625C11.25 14.3097 11.1767 14.5514 11.0393 14.757C10.902 14.9625 10.7068 15.1227 10.4784 15.2174C10.25 15.312 9.99862 15.3367 9.75614 15.2885C9.51367 15.2403 9.29094 15.1212 9.11612 14.9464C8.94131 14.7716 8.82225 14.5488 8.77402 14.3064C8.72579 14.0639 8.75055 13.8126 8.84515 13.5841C8.93976 13.3557 9.09998 13.1605 9.30554 13.0232C9.5111 12.8858 9.75278 12.8125 10 12.8125C10.3315 12.8125 10.6495 12.9442 10.8839 13.1786C11.1183 13.413 11.25 13.731 11.25 14.0625ZM18.4375 10C18.4375 11.6688 17.9427 13.3001 17.0155 14.6876C16.0884 16.0752 14.7706 17.1566 13.2289 17.7952C11.6871 18.4338 9.99064 18.6009 8.35393 18.2754C6.71721 17.9498 5.2138 17.1462 4.03379 15.9662C2.85379 14.7862 2.05019 13.2828 1.72463 11.6461C1.39907 10.0094 1.56616 8.31286 2.20477 6.77111C2.84338 5.22936 3.92484 3.9116 5.31238 2.98448C6.69992 2.05735 8.33122 1.5625 10 1.5625C12.237 1.56498 14.3817 2.45473 15.9635 4.03653C17.5453 5.61833 18.435 7.763 18.4375 10ZM16.5625 10C16.5625 8.70206 16.1776 7.43327 15.4565 6.35407C14.7354 5.27487 13.7105 4.43374 12.5114 3.93704C11.3122 3.44034 9.99272 3.31038 8.71972 3.5636C7.44672 3.81681 6.2774 4.44183 5.35962 5.35961C4.44183 6.27739 3.81682 7.44672 3.5636 8.71972C3.31039 9.99272 3.44034 11.3122 3.93704 12.5114C4.43374 13.7105 5.27488 14.7354 6.35407 15.4565C7.43327 16.1776 8.70206 16.5625 10 16.5625C11.7399 16.5606 13.408 15.8686 14.6383 14.6383C15.8686 13.408 16.5606 11.7399 16.5625 10ZM10 5C8.10469 5 6.5625 6.40156 6.5625 8.125V8.4375C6.5625 8.68614 6.66128 8.9246 6.83709 9.10041C7.01291 9.27623 7.25136 9.375 7.5 9.375C7.74864 9.375 7.9871 9.27623 8.16292 9.10041C8.33873 8.9246 8.4375 8.68614 8.4375 8.4375V8.125C8.4375 7.43594 9.14063 6.875 10 6.875C10.8594 6.875 11.5625 7.43594 11.5625 8.125C11.5625 8.81406 10.8594 9.375 10 9.375C9.75136 9.375 9.51291 9.47377 9.33709 9.64959C9.16128 9.8254 9.0625 10.0639 9.0625 10.3125V10.9375C9.06195 11.1691 9.14715 11.3927 9.30169 11.5653C9.45623 11.7378 9.66916 11.847 9.89945 11.8719C10.1297 11.8967 10.3611 11.8354 10.5488 11.6998C10.7366 11.5642 10.8676 11.3639 10.9164 11.1375C12.368 10.7719 13.4375 9.56016 13.4375 8.125C13.4375 6.40156 11.8953 5 10 5Z" fill="#E5E5E5" />
                                                </svg>
                                            </div>
                                        </div>

                                    </div>

                                </div> */}

                            </div>


                        </div>

                        <div className='py-[29px] px-[32px]'>
                            {
                                coins?.trial_eligibility && <div className='rounded-[17px] bg-[#292929] py-[24px] px-[40px] mb-4'>
                                    <h3 className='pack-title text-[#FDFDFD] text-[24px] font-normal mb-[24px]'>Limited Time Offers</h3>
                                    <Pack pack={coins?.trail_packs} />
                                    
                                    <div className='bg-[#8e8e8e80] my-[24px] mx-0 h-[1px]' />

                                    <Pack pack={coins?.referral_packs} />
                                </div>
                            }
                            <CoinsPack coinsPack={coins?.coinsplans} />
                        </div>

                        <Streak
                            show={openStreakModal}
                            toggle={toggleStreakModal}
                        />
                    </>
            }
        </>
    )
}

export default Coin
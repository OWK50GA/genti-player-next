import React from 'react'
import { Modal, Row, Col } from 'reactstrap'
// import cancelIcon from '../../../assets/img/dismiss.svg'
import Image from 'next/image'
// import coinIcon from '../../../assets/img/activeCoin.svg'
// import { useRouter } from 'next/navigation';



const Streak = ({ show, toggle }) => {
    // const router = useRouter();

    return (
        <Modal
            isOpen={show}
            toggle={toggle}
            centered
            modalClassName='streak-feedback_modal'
            size='lg'
        >
            <div className=''>
                <div className='flex items-center justify-end' onClick={toggle} role='button'>
                    {/* <img src={cancelIcon} alt='icon' /> */}
                    <Image src={'/assets/img/dismiss.svg'} alt='icon' height={18} width={18} />
                </div>
                <Row className='gap-5 mb-4 mt-2'>
                    <Col sm='6' md='5'>
                        <div className='flex flex-col flex-wrap w-[100%] items-center justify-center md:mt-5 mt-0'>
                            <p className='text-gradient streak-title text-[25px] font-normal mb-[43px]'>Listening Streak</p>

                            <svg xmlns="http://www.w3.org/2000/svg" width="175" height="175" viewBox="0 0 175 175" fill="none">
                                <g clip-path="url(#clip0_9198_8799)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M151.6 113.103C150.162 147.458 121.867 174.87 87.1598 174.87C51.5318 174.87 22.6499 145.017 22.6499 110.36C22.6499 105.728 22.5669 96.4702 29.5127 80.8506C33.6695 71.5028 36.2766 65.6304 37.748 60.2624C38.5564 57.3121 40.1287 52.6248 44.6107 60.2624C47.2536 64.7657 47.3558 71.2428 47.3558 71.2428C47.3558 71.2428 57.1888 63.6972 63.8264 49.282C73.5571 28.1495 65.7933 15.5173 63.1401 6.73295C62.2219 3.69412 61.6454 -1.76725 67.9441 0.556474C74.3621 2.92481 91.3296 14.8022 100.199 27.3212C112.857 45.1883 117.356 62.3212 117.356 62.3212C117.356 62.3212 121.409 57.2908 122.846 52.0271C124.469 46.0832 124.493 40.1964 129.708 46.5376C134.668 52.5679 142.034 63.9003 146.179 74.6741C153.707 94.2391 151.6 113.103 151.6 113.103Z" fill="url(#paint0_linear_9198_8799)" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M87.1581 174.871C62.5216 174.871 42.5503 154.9 42.5503 130.263C42.5503 115.398 48.5408 106.373 61.0083 94.1336C68.9911 86.297 76.4625 76.672 79.6379 70.1181C80.2631 68.8279 81.6858 62.1045 87.1712 69.9767C90.0487 74.1053 94.5596 81.4478 97.4523 87.7142C102.439 98.5182 103.629 108.989 103.629 108.989C103.629 108.989 108.516 106.109 111.864 98.6946C112.944 96.305 115.126 87.2585 121.227 96.3036C125.703 102.941 131.853 114.876 131.766 130.263C131.766 154.9 111.794 174.871 87.1581 174.871Z" fill="#FC9502" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M87.8412 126.148C94.1892 126.148 94.1892 137.904 102.253 153.599C107.622 164.051 99.5909 174.874 87.8412 174.874C76.0915 174.874 69.998 165.349 69.998 153.599C69.998 141.85 81.4931 126.148 87.8412 126.148Z" fill="#FCE202" />
                                </g>
                                <defs>
                                    <linearGradient id="paint0_linear_9198_8799" x1="87.2565" y1="174.999" x2="87.2565" y2="0.128238" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FF4C0D" />
                                        <stop offset="1" stop-color="#FC9502" />
                                    </linearGradient>
                                    <clipPath id="clip0_9198_8799">
                                        <rect width="175" height="175" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                    </Col>
                    <Col sm='6' md='7'>
                        <div className='streak_wrapper h-[424px] shrink-0 py-[29px] px-[14px] rounded-[26px] border border-[#5A5A5A] bg-[#151515] blur-[10.5px]'>
                            <h3 className='streak-text_guide text-[#FDFDFD] text-center text-[18px] font-normal'>Listen to minimum of 30 mins of content everyday to earn coins</h3>
                            <div className='mt-3'>
                                <div className='flex items-center justify-between px-2 mb-3'>
                                    <div className='d-flex gap-x-3 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 175 175" fill="none">
                                            <g clip-path="url(#clip0_9198_8799)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M151.6 113.103C150.162 147.458 121.867 174.87 87.1598 174.87C51.5318 174.87 22.6499 145.017 22.6499 110.36C22.6499 105.728 22.5669 96.4702 29.5127 80.8506C33.6695 71.5028 36.2766 65.6304 37.748 60.2624C38.5564 57.3121 40.1287 52.6248 44.6107 60.2624C47.2536 64.7657 47.3558 71.2428 47.3558 71.2428C47.3558 71.2428 57.1888 63.6972 63.8264 49.282C73.5571 28.1495 65.7933 15.5173 63.1401 6.73295C62.2219 3.69412 61.6454 -1.76725 67.9441 0.556474C74.3621 2.92481 91.3296 14.8022 100.199 27.3212C112.857 45.1883 117.356 62.3212 117.356 62.3212C117.356 62.3212 121.409 57.2908 122.846 52.0271C124.469 46.0832 124.493 40.1964 129.708 46.5376C134.668 52.5679 142.034 63.9003 146.179 74.6741C153.707 94.2391 151.6 113.103 151.6 113.103Z" fill="url(#paint0_linear_9198_8799)" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.1581 174.871C62.5216 174.871 42.5503 154.9 42.5503 130.263C42.5503 115.398 48.5408 106.373 61.0083 94.1336C68.9911 86.297 76.4625 76.672 79.6379 70.1181C80.2631 68.8279 81.6858 62.1045 87.1712 69.9767C90.0487 74.1053 94.5596 81.4478 97.4523 87.7142C102.439 98.5182 103.629 108.989 103.629 108.989C103.629 108.989 108.516 106.109 111.864 98.6946C112.944 96.305 115.126 87.2585 121.227 96.3036C125.703 102.941 131.853 114.876 131.766 130.263C131.766 154.9 111.794 174.871 87.1581 174.871Z" fill="#FC9502" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.8412 126.148C94.1892 126.148 94.1892 137.904 102.253 153.599C107.622 164.051 99.5909 174.874 87.8412 174.874C76.0915 174.874 69.998 165.349 69.998 153.599C69.998 141.85 81.4931 126.148 87.8412 126.148Z" fill="#FCE202" />
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_9198_8799" x1="87.2565" y1="174.999" x2="87.2565" y2="0.128238" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#FF4C0D" />
                                                    <stop offset="1" stop-color="#FC9502" />
                                                </linearGradient>
                                                <clipPath id="clip0_9198_8799">
                                                    <rect width="175" height="175" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className='streak-days text-white text-[16px] font-normal mb-0 ms-2'>7 Days</p>
                                    </div>
                                    <div className='flex gap-x-2 items-center '>
                                        <div>
                                            {/* <img src={coinIcon} alt='icon' style={{
                                                width: '18px',
                                                height: '18px'
                                            }} /> */}
                                            <Image 
                                                src={'/assets/img/activeCoin.svg'} alt='icon' height={18} width={18}
                                            />
                                        </div>
                                        <p className='streak-value text-[#BC73FF] text-right text-[16px] font-normal mb-0 ms-2'>10 Coins</p>
                                    </div>

                                </div>
                                <div className='flex items-center justify-between px-2 mb-3'>
                                    <div className='flex gap-x-3 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 175 175" fill="none">
                                            <g clip-path="url(#clip0_9198_8799)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M151.6 113.103C150.162 147.458 121.867 174.87 87.1598 174.87C51.5318 174.87 22.6499 145.017 22.6499 110.36C22.6499 105.728 22.5669 96.4702 29.5127 80.8506C33.6695 71.5028 36.2766 65.6304 37.748 60.2624C38.5564 57.3121 40.1287 52.6248 44.6107 60.2624C47.2536 64.7657 47.3558 71.2428 47.3558 71.2428C47.3558 71.2428 57.1888 63.6972 63.8264 49.282C73.5571 28.1495 65.7933 15.5173 63.1401 6.73295C62.2219 3.69412 61.6454 -1.76725 67.9441 0.556474C74.3621 2.92481 91.3296 14.8022 100.199 27.3212C112.857 45.1883 117.356 62.3212 117.356 62.3212C117.356 62.3212 121.409 57.2908 122.846 52.0271C124.469 46.0832 124.493 40.1964 129.708 46.5376C134.668 52.5679 142.034 63.9003 146.179 74.6741C153.707 94.2391 151.6 113.103 151.6 113.103Z" fill="url(#paint0_linear_9198_8799)" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.1581 174.871C62.5216 174.871 42.5503 154.9 42.5503 130.263C42.5503 115.398 48.5408 106.373 61.0083 94.1336C68.9911 86.297 76.4625 76.672 79.6379 70.1181C80.2631 68.8279 81.6858 62.1045 87.1712 69.9767C90.0487 74.1053 94.5596 81.4478 97.4523 87.7142C102.439 98.5182 103.629 108.989 103.629 108.989C103.629 108.989 108.516 106.109 111.864 98.6946C112.944 96.305 115.126 87.2585 121.227 96.3036C125.703 102.941 131.853 114.876 131.766 130.263C131.766 154.9 111.794 174.871 87.1581 174.871Z" fill="#FC9502" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.8412 126.148C94.1892 126.148 94.1892 137.904 102.253 153.599C107.622 164.051 99.5909 174.874 87.8412 174.874C76.0915 174.874 69.998 165.349 69.998 153.599C69.998 141.85 81.4931 126.148 87.8412 126.148Z" fill="#FCE202" />
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_9198_8799" x1="87.2565" y1="174.999" x2="87.2565" y2="0.128238" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#FF4C0D" />
                                                    <stop offset="1" stop-color="#FC9502" />
                                                </linearGradient>
                                                <clipPath id="clip0_9198_8799">
                                                    <rect width="175" height="175" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className='streak-days text-white text-[16px] font-normal mb-0 ms-2'>14 Days</p>
                                    </div>
                                    <div className='flex gap-x-2 items-center '>
                                        <div>
                                            {/* <img src={coinIcon} alt='icon' style={{
                                                width: '18px',
                                                height: '18px'
                                            }} /> */}
                                            <Image 
                                                src={'/assets/img/activeCoin.svg'} alt='icon' height={18} width={18}
                                            />
                                        </div>
                                        <p className='streak-value text-[#BC73FF] text-right text-[16px] font-normal mb-0 ms-2'>20 Coins</p>
                                    </div>

                                </div>
                                <div className='flex items-center justify-between px-2 mb-3'>
                                    <div className='flex gap-x-3 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 175 175" fill="none">
                                            <g clip-path="url(#clip0_9198_8799)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M151.6 113.103C150.162 147.458 121.867 174.87 87.1598 174.87C51.5318 174.87 22.6499 145.017 22.6499 110.36C22.6499 105.728 22.5669 96.4702 29.5127 80.8506C33.6695 71.5028 36.2766 65.6304 37.748 60.2624C38.5564 57.3121 40.1287 52.6248 44.6107 60.2624C47.2536 64.7657 47.3558 71.2428 47.3558 71.2428C47.3558 71.2428 57.1888 63.6972 63.8264 49.282C73.5571 28.1495 65.7933 15.5173 63.1401 6.73295C62.2219 3.69412 61.6454 -1.76725 67.9441 0.556474C74.3621 2.92481 91.3296 14.8022 100.199 27.3212C112.857 45.1883 117.356 62.3212 117.356 62.3212C117.356 62.3212 121.409 57.2908 122.846 52.0271C124.469 46.0832 124.493 40.1964 129.708 46.5376C134.668 52.5679 142.034 63.9003 146.179 74.6741C153.707 94.2391 151.6 113.103 151.6 113.103Z" fill="url(#paint0_linear_9198_8799)" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.1581 174.871C62.5216 174.871 42.5503 154.9 42.5503 130.263C42.5503 115.398 48.5408 106.373 61.0083 94.1336C68.9911 86.297 76.4625 76.672 79.6379 70.1181C80.2631 68.8279 81.6858 62.1045 87.1712 69.9767C90.0487 74.1053 94.5596 81.4478 97.4523 87.7142C102.439 98.5182 103.629 108.989 103.629 108.989C103.629 108.989 108.516 106.109 111.864 98.6946C112.944 96.305 115.126 87.2585 121.227 96.3036C125.703 102.941 131.853 114.876 131.766 130.263C131.766 154.9 111.794 174.871 87.1581 174.871Z" fill="#FC9502" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.8412 126.148C94.1892 126.148 94.1892 137.904 102.253 153.599C107.622 164.051 99.5909 174.874 87.8412 174.874C76.0915 174.874 69.998 165.349 69.998 153.599C69.998 141.85 81.4931 126.148 87.8412 126.148Z" fill="#FCE202" />
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_9198_8799" x1="87.2565" y1="174.999" x2="87.2565" y2="0.128238" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#FF4C0D" />
                                                    <stop offset="1" stop-color="#FC9502" />
                                                </linearGradient>
                                                <clipPath id="clip0_9198_8799">
                                                    <rect width="175" height="175" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className='streak-days text-white text-[16px] font-normal mb-0 ms-2'>30 Days</p>
                                    </div>
                                    <div className='flex gap-x-2 items-center '>
                                        <div>
                                            {/* <img src={coinIcon} alt='icon' style={{
                                                width: '18px',
                                                height: '18px'
                                            }} /> */}
                                            <Image 
                                                src={'/assets/img/activeCoin.svg'} alt='icon' height={18} width={18}
                                            />
                                        </div>
                                        <p className='streak-value text-[#BC73FF] text-right text-[16px] font-normal mb-0 ms-2'>50 Coins</p>
                                    </div>

                                </div>
                                <div className='flex items-center justify-between px-2 mb-3'>
                                    <div className='flex gap-x-3 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 175 175" fill="none">
                                            <g clip-path="url(#clip0_9198_8799)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M151.6 113.103C150.162 147.458 121.867 174.87 87.1598 174.87C51.5318 174.87 22.6499 145.017 22.6499 110.36C22.6499 105.728 22.5669 96.4702 29.5127 80.8506C33.6695 71.5028 36.2766 65.6304 37.748 60.2624C38.5564 57.3121 40.1287 52.6248 44.6107 60.2624C47.2536 64.7657 47.3558 71.2428 47.3558 71.2428C47.3558 71.2428 57.1888 63.6972 63.8264 49.282C73.5571 28.1495 65.7933 15.5173 63.1401 6.73295C62.2219 3.69412 61.6454 -1.76725 67.9441 0.556474C74.3621 2.92481 91.3296 14.8022 100.199 27.3212C112.857 45.1883 117.356 62.3212 117.356 62.3212C117.356 62.3212 121.409 57.2908 122.846 52.0271C124.469 46.0832 124.493 40.1964 129.708 46.5376C134.668 52.5679 142.034 63.9003 146.179 74.6741C153.707 94.2391 151.6 113.103 151.6 113.103Z" fill="url(#paint0_linear_9198_8799)" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.1581 174.871C62.5216 174.871 42.5503 154.9 42.5503 130.263C42.5503 115.398 48.5408 106.373 61.0083 94.1336C68.9911 86.297 76.4625 76.672 79.6379 70.1181C80.2631 68.8279 81.6858 62.1045 87.1712 69.9767C90.0487 74.1053 94.5596 81.4478 97.4523 87.7142C102.439 98.5182 103.629 108.989 103.629 108.989C103.629 108.989 108.516 106.109 111.864 98.6946C112.944 96.305 115.126 87.2585 121.227 96.3036C125.703 102.941 131.853 114.876 131.766 130.263C131.766 154.9 111.794 174.871 87.1581 174.871Z" fill="#FC9502" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.8412 126.148C94.1892 126.148 94.1892 137.904 102.253 153.599C107.622 164.051 99.5909 174.874 87.8412 174.874C76.0915 174.874 69.998 165.349 69.998 153.599C69.998 141.85 81.4931 126.148 87.8412 126.148Z" fill="#FCE202" />
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_9198_8799" x1="87.2565" y1="174.999" x2="87.2565" y2="0.128238" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#FF4C0D" />
                                                    <stop offset="1" stop-color="#FC9502" />
                                                </linearGradient>
                                                <clipPath id="clip0_9198_8799">
                                                    <rect width="175" height="175" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className='streak-days text-white text-[16px] font-normal mb-0 ms-2'>60 Days</p>
                                    </div>
                                    <div className='flex gap-x-2 items-center '>
                                        <div>
                                            {/* <img src={coinIcon} alt='icon' style={{
                                                width: '18px',
                                                height: '18px'
                                            }} /> */}
                                            <Image 
                                                src={'/assets/img/activeCoin.svg'} alt='icon' height={18} width={18}
                                            />
                                        </div>
                                        <p className='streak-value text-[#BC73FF] text-right text-[16px] font-normal mb-0 ms-2'>50 Coins</p>
                                    </div>

                                </div>
                                <div className='flex items-center justify-between px-2 mb-3'>
                                    <div className='flex gap-x-3 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 175 175" fill="none">
                                            <g clip-path="url(#clip0_9198_8799)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M151.6 113.103C150.162 147.458 121.867 174.87 87.1598 174.87C51.5318 174.87 22.6499 145.017 22.6499 110.36C22.6499 105.728 22.5669 96.4702 29.5127 80.8506C33.6695 71.5028 36.2766 65.6304 37.748 60.2624C38.5564 57.3121 40.1287 52.6248 44.6107 60.2624C47.2536 64.7657 47.3558 71.2428 47.3558 71.2428C47.3558 71.2428 57.1888 63.6972 63.8264 49.282C73.5571 28.1495 65.7933 15.5173 63.1401 6.73295C62.2219 3.69412 61.6454 -1.76725 67.9441 0.556474C74.3621 2.92481 91.3296 14.8022 100.199 27.3212C112.857 45.1883 117.356 62.3212 117.356 62.3212C117.356 62.3212 121.409 57.2908 122.846 52.0271C124.469 46.0832 124.493 40.1964 129.708 46.5376C134.668 52.5679 142.034 63.9003 146.179 74.6741C153.707 94.2391 151.6 113.103 151.6 113.103Z" fill="url(#paint0_linear_9198_8799)" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.1581 174.871C62.5216 174.871 42.5503 154.9 42.5503 130.263C42.5503 115.398 48.5408 106.373 61.0083 94.1336C68.9911 86.297 76.4625 76.672 79.6379 70.1181C80.2631 68.8279 81.6858 62.1045 87.1712 69.9767C90.0487 74.1053 94.5596 81.4478 97.4523 87.7142C102.439 98.5182 103.629 108.989 103.629 108.989C103.629 108.989 108.516 106.109 111.864 98.6946C112.944 96.305 115.126 87.2585 121.227 96.3036C125.703 102.941 131.853 114.876 131.766 130.263C131.766 154.9 111.794 174.871 87.1581 174.871Z" fill="#FC9502" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.8412 126.148C94.1892 126.148 94.1892 137.904 102.253 153.599C107.622 164.051 99.5909 174.874 87.8412 174.874C76.0915 174.874 69.998 165.349 69.998 153.599C69.998 141.85 81.4931 126.148 87.8412 126.148Z" fill="#FCE202" />
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_9198_8799" x1="87.2565" y1="174.999" x2="87.2565" y2="0.128238" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#FF4C0D" />
                                                    <stop offset="1" stop-color="#FC9502" />
                                                </linearGradient>
                                                <clipPath id="clip0_9198_8799">
                                                    <rect width="175" height="175" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className='streak-days text-white text-[16px] font-normal mb-0 ms-2'>90 Days</p>
                                    </div>
                                    <div className='flex gap-x-2 items-center '>
                                        <div>
                                            {/* <img src={coinIcon} alt='icon' style={{
                                                width: '18px',
                                                height: '18px'
                                            }} /> */}
                                            <Image 
                                                src={'/assets/img/activeCoin.svg'} alt='icon' height={18} width={18}
                                            />
                                        </div>
                                        <p className='streak-value text-[#BC73FF] text-right text-[16px] font-normal mb-0 ms-2'>50 Coins</p>
                                    </div>

                                </div><div className='flex items-center justify-between px-2 mb-3'>
                                    <div className='flex gap-x-3 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 175 175" fill="none">
                                            <g clip-path="url(#clip0_9198_8799)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M151.6 113.103C150.162 147.458 121.867 174.87 87.1598 174.87C51.5318 174.87 22.6499 145.017 22.6499 110.36C22.6499 105.728 22.5669 96.4702 29.5127 80.8506C33.6695 71.5028 36.2766 65.6304 37.748 60.2624C38.5564 57.3121 40.1287 52.6248 44.6107 60.2624C47.2536 64.7657 47.3558 71.2428 47.3558 71.2428C47.3558 71.2428 57.1888 63.6972 63.8264 49.282C73.5571 28.1495 65.7933 15.5173 63.1401 6.73295C62.2219 3.69412 61.6454 -1.76725 67.9441 0.556474C74.3621 2.92481 91.3296 14.8022 100.199 27.3212C112.857 45.1883 117.356 62.3212 117.356 62.3212C117.356 62.3212 121.409 57.2908 122.846 52.0271C124.469 46.0832 124.493 40.1964 129.708 46.5376C134.668 52.5679 142.034 63.9003 146.179 74.6741C153.707 94.2391 151.6 113.103 151.6 113.103Z" fill="url(#paint0_linear_9198_8799)" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.1581 174.871C62.5216 174.871 42.5503 154.9 42.5503 130.263C42.5503 115.398 48.5408 106.373 61.0083 94.1336C68.9911 86.297 76.4625 76.672 79.6379 70.1181C80.2631 68.8279 81.6858 62.1045 87.1712 69.9767C90.0487 74.1053 94.5596 81.4478 97.4523 87.7142C102.439 98.5182 103.629 108.989 103.629 108.989C103.629 108.989 108.516 106.109 111.864 98.6946C112.944 96.305 115.126 87.2585 121.227 96.3036C125.703 102.941 131.853 114.876 131.766 130.263C131.766 154.9 111.794 174.871 87.1581 174.871Z" fill="#FC9502" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.8412 126.148C94.1892 126.148 94.1892 137.904 102.253 153.599C107.622 164.051 99.5909 174.874 87.8412 174.874C76.0915 174.874 69.998 165.349 69.998 153.599C69.998 141.85 81.4931 126.148 87.8412 126.148Z" fill="#FCE202" />
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_9198_8799" x1="87.2565" y1="174.999" x2="87.2565" y2="0.128238" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#FF4C0D" />
                                                    <stop offset="1" stop-color="#FC9502" />
                                                </linearGradient>
                                                <clipPath id="clip0_9198_8799">
                                                    <rect width="175" height="175" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className='streak-days text-white text-[16px] font-normal mb-0 ms-2'>180 Days</p>
                                    </div>
                                    <div className='flex gap-x-2 items-center '>
                                        <div>
                                            {/* <img src={coinIcon} alt='icon' style={{
                                                width: '18px',
                                                height: '18px'
                                            }} /> */}
                                            <Image 
                                                src={'/assets/img/activeCoin.svg'} alt='icon' height={18} width={18}
                                            />
                                        </div>
                                        <p className='streak-value text-[#BC73FF] text-right text-[16px] font-normal mb-0 ms-2'>50 Coins</p>
                                    </div>

                                </div><div className='flex items-center justify-between px-2 mb-3'>
                                    <div className='flex gap-x-3 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 175 175" fill="none">
                                            <g clip-path="url(#clip0_9198_8799)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M151.6 113.103C150.162 147.458 121.867 174.87 87.1598 174.87C51.5318 174.87 22.6499 145.017 22.6499 110.36C22.6499 105.728 22.5669 96.4702 29.5127 80.8506C33.6695 71.5028 36.2766 65.6304 37.748 60.2624C38.5564 57.3121 40.1287 52.6248 44.6107 60.2624C47.2536 64.7657 47.3558 71.2428 47.3558 71.2428C47.3558 71.2428 57.1888 63.6972 63.8264 49.282C73.5571 28.1495 65.7933 15.5173 63.1401 6.73295C62.2219 3.69412 61.6454 -1.76725 67.9441 0.556474C74.3621 2.92481 91.3296 14.8022 100.199 27.3212C112.857 45.1883 117.356 62.3212 117.356 62.3212C117.356 62.3212 121.409 57.2908 122.846 52.0271C124.469 46.0832 124.493 40.1964 129.708 46.5376C134.668 52.5679 142.034 63.9003 146.179 74.6741C153.707 94.2391 151.6 113.103 151.6 113.103Z" fill="url(#paint0_linear_9198_8799)" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.1581 174.871C62.5216 174.871 42.5503 154.9 42.5503 130.263C42.5503 115.398 48.5408 106.373 61.0083 94.1336C68.9911 86.297 76.4625 76.672 79.6379 70.1181C80.2631 68.8279 81.6858 62.1045 87.1712 69.9767C90.0487 74.1053 94.5596 81.4478 97.4523 87.7142C102.439 98.5182 103.629 108.989 103.629 108.989C103.629 108.989 108.516 106.109 111.864 98.6946C112.944 96.305 115.126 87.2585 121.227 96.3036C125.703 102.941 131.853 114.876 131.766 130.263C131.766 154.9 111.794 174.871 87.1581 174.871Z" fill="#FC9502" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.8412 126.148C94.1892 126.148 94.1892 137.904 102.253 153.599C107.622 164.051 99.5909 174.874 87.8412 174.874C76.0915 174.874 69.998 165.349 69.998 153.599C69.998 141.85 81.4931 126.148 87.8412 126.148Z" fill="#FCE202" />
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_9198_8799" x1="87.2565" y1="174.999" x2="87.2565" y2="0.128238" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#FF4C0D" />
                                                    <stop offset="1" stop-color="#FC9502" />
                                                </linearGradient>
                                                <clipPath id="clip0_9198_8799">
                                                    <rect width="175" height="175" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className='streak-days text-white text-[16px] font-normal mb-0 ms-2'>240 Days</p>
                                    </div>
                                    <div className='flex gap-x-2 items-center '>
                                        <div>
                                            {/* <img src={coinIcon} alt='icon' style={{
                                                width: '18px',
                                                height: '18px'
                                            }} /> */}
                                            <Image 
                                                src={'/assets/img/activeCoin.svg'} alt='icon' height={18} width={18}
                                            />
                                        </div>
                                        <p className='streak-value text-[#BC73FF] text-right text-[16px] font-normal mb-0 ms-2'>50 Coins</p>
                                    </div>

                                </div><div className='flex items-center justify-between px-2 mb-3'>
                                    <div className='flex gap-x-3 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 175 175" fill="none">
                                            <g clip-path="url(#clip0_9198_8799)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M151.6 113.103C150.162 147.458 121.867 174.87 87.1598 174.87C51.5318 174.87 22.6499 145.017 22.6499 110.36C22.6499 105.728 22.5669 96.4702 29.5127 80.8506C33.6695 71.5028 36.2766 65.6304 37.748 60.2624C38.5564 57.3121 40.1287 52.6248 44.6107 60.2624C47.2536 64.7657 47.3558 71.2428 47.3558 71.2428C47.3558 71.2428 57.1888 63.6972 63.8264 49.282C73.5571 28.1495 65.7933 15.5173 63.1401 6.73295C62.2219 3.69412 61.6454 -1.76725 67.9441 0.556474C74.3621 2.92481 91.3296 14.8022 100.199 27.3212C112.857 45.1883 117.356 62.3212 117.356 62.3212C117.356 62.3212 121.409 57.2908 122.846 52.0271C124.469 46.0832 124.493 40.1964 129.708 46.5376C134.668 52.5679 142.034 63.9003 146.179 74.6741C153.707 94.2391 151.6 113.103 151.6 113.103Z" fill="url(#paint0_linear_9198_8799)" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.1581 174.871C62.5216 174.871 42.5503 154.9 42.5503 130.263C42.5503 115.398 48.5408 106.373 61.0083 94.1336C68.9911 86.297 76.4625 76.672 79.6379 70.1181C80.2631 68.8279 81.6858 62.1045 87.1712 69.9767C90.0487 74.1053 94.5596 81.4478 97.4523 87.7142C102.439 98.5182 103.629 108.989 103.629 108.989C103.629 108.989 108.516 106.109 111.864 98.6946C112.944 96.305 115.126 87.2585 121.227 96.3036C125.703 102.941 131.853 114.876 131.766 130.263C131.766 154.9 111.794 174.871 87.1581 174.871Z" fill="#FC9502" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.8412 126.148C94.1892 126.148 94.1892 137.904 102.253 153.599C107.622 164.051 99.5909 174.874 87.8412 174.874C76.0915 174.874 69.998 165.349 69.998 153.599C69.998 141.85 81.4931 126.148 87.8412 126.148Z" fill="#FCE202" />
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_9198_8799" x1="87.2565" y1="174.999" x2="87.2565" y2="0.128238" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#FF4C0D" />
                                                    <stop offset="1" stop-color="#FC9502" />
                                                </linearGradient>
                                                <clipPath id="clip0_9198_8799">
                                                    <rect width="175" height="175" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className='streak-days text-white text-[16px] font-normal mb-0 ms-2'>365 Days</p>
                                    </div>
                                    <div className='flex gap-x-2 items-center '>
                                        <div>
                                            {/* <img src={coinIcon} alt='icon' style={{
                                                width: '18px',
                                                height: '18px'
                                            }} /> */}
                                            <Image 
                                                src={'/assets/img/activeCoin.svg'} alt='icon' height={18} width={18}
                                            />
                                        </div>
                                        <p className='streak-value text-[#BC73FF] text-right text-[16px] font-normal mb-0 ms-2'>50 Coins</p>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </Col>
                </Row>

            </div>


        </Modal>
    )
}

export default Streak
'use client'

import PreviewTopLayout from "./layout"
import { FaPlayCircle, FaPauseCircle, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import PreviewFooter from "./footer";
import { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function PreviewComponent({ data }) {

    const audioRef = useRef();
    const carouselRef = useRef();
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const checkScrollPosition = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setIsAtStart(scrollLeft <= 0);
            setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
        }
    };

    // Setup scroll listener
    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('scroll', checkScrollPosition);
        }
        return () => {
            if (carousel) {
                carousel.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, []);

    // Check scroll position when data changes
    useEffect(() => {
        // Add a small delay to ensure the DOM has updated
        const timer = setTimeout(() => {
            checkScrollPosition();
        }, 100);
        
        return () => clearTimeout(timer);
    }, [data?.additional_titles]);

    const handlePlay = () => {
        if (audioRef?.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }

    const formats = ['Audio Drama', 'Audio Book', 'Podcast', 'Audio Story']
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    const handleAppRedirect = (store) => {
        const APP_DEEP_LINK = `https://open.gentimedia.com/title/${id}`; // Genti custom url scheme
        const APP_STORE_URL = 'https://apps.apple.com/app/genti-audio-african-stories/id1626263802';
        const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.app.gentimedia';
      
      
        if (store === 'ios') {
          if (isIOS) {
            // Try to open app first
            window.location.href = APP_DEEP_LINK;
            // Fallback to App Store if app not installed
            setTimeout(() => {
              window.location.href = APP_STORE_URL;
            }, 2000);
          } else {
            window.open(APP_STORE_URL, '_blank');
          }
        }
      
        if (store === 'android') {
          if (isAndroid) {
            // Android Intent URL format
            window.location.href = APP_DEEP_LINK;
            setTimeout(() => {
              window.location.href = PLAY_STORE_URL;
            }, 2000);
          } else {
            window.open(PLAY_STORE_URL, '_blank');
          }
        }
    };

    const handleCarouselScroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 400;
            const currentScroll = carouselRef.current.scrollLeft;
            
            if (direction === 'left') {
                carouselRef.current.scrollLeft = currentScroll - scrollAmount;
            } else {
                carouselRef.current.scrollLeft = currentScroll + scrollAmount;
            }
        }
    };

    return (
      <div>
        <PreviewTopLayout>
            <div 
                className="preview-top-logo border-b border-b-[#6E6E6E] flex items-center backdrop-blur-[13px] justify-center py-[10px] px-[10px] w-[100%] mx-auto"
            >
                <div>
                    {" "}
                </div>
                <p>
                    <Image src="/logo-white.svg" alt="" width={80} height={80}/>
                </p>
                <button 
                    className="bg-transparent bg-gradient-to-r from-[#8F78F4] to-[#8842CA] text-white
                                absolute right-[1.2vw] top-0 text-[14px] rounded-[30px] py-[8px] px-[40px] mt-[22.5px] mb-[10px] text-nowrap font-bold justify-end" 
                    onClick={() => {
                        if (isIOS) {
                            handleAppRedirect('ios')
                        } else {
                            handleAppRedirect('android')
                        }
                    }
                }>
                    Try now
                </button>
            </div>
            <div
                className="preview-top-section flex items-center justify-between px-[20px] py-[60px] my-16 mx-auto max-w-[80rem] gap-8"
            >
                <div style={{
                        // display: 'flex', flexDirection: 'column', gap: '1.2rem'
                    }}
                    className="preview-top-section-left flex flex-col gap-[1.2rem]"
                >
                    <h2 className="dream-count-text text-transparent bg-gradient-to-r from-[#8F78F4] to-[#8842CA] bg-clip-text font-[900] text-[65px]">
                        {data?.title}
                    </h2>
                    <div style={{ color: '#919191', fontSize: '20px', fontWeight: '500', fontFamily: 'Graphik' }}>
                        <p>By: <span style={{ color: '#FFFFFF' }}>{data?.author}</span></p>
                        <p>Narrated by: <span style={{ color: '#FFFFFF', textWrap: 'wrap' }}>{id == 645 ? "Chimamanda Ngozi Adichie, Sandra Okuboyejo, A'rese Emokpae, and Janina Edwards." : data?.narrator}</span></p>
                    </div>
                    <div className="app-stores flex gap-[10px] items-center">
                    <div onClick={() => {
                            handleAppRedirect('ios')
                        }}>
                            <Image src="/app-store.svg" alt="App Store" width={150} height={150} />
                        </div>
                        <div onClick={() => {
                            handleAppRedirect('android')
                        }}>
                            <Image src="/google-play.svg" alt="Google Play" width={150} height={150} />
                        </div>
                    </div>
                    <div className="fiction-container text-white flex mt-6 flex-wrap gap-4">
                        {
                            data?.categories.map((category, i) => {
                                return (
                                    <div className="fiction-tag" key={i}>
                                            {category}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div 
                    className="preview-top-section-right flex flex-col items-center gap-4"
                >
                    <img src={data?.image} alt="" width={400} height={400} className="border border-[#393939] rounded-[14px]"/>
                    <div 
                        className="preview-general-btn bg-[#783CBB] rounded-[20px] px-[1.7rem] py-2 mt-[0.3rem] w-fit flex items-center justify-center gap-2 text-white cursor-pointer"
                        onClick={handlePlay}
                    >
                        {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
                        <span>{isPlaying ? 'Pause' : 'Preview'}</span>
                    </div>
                    <audio 
                        ref={audioRef} 
                        src={data?.preview}
                        onEnded={() => setIsPlaying(false)}
                    ></audio>
                </div>
            </div>
        </PreviewTopLayout>

        {/* Mid Section */}
        <div style={{backgroundColor: '#FFFFFF'}}>
            <div className="preview-mid-section-1 flex justify-between items-center px-[20px] py-[100px] max-w-[80rem] mx-auto gap-2">
                <div className="preview-mid-section-1-left w-3/5">
                    <h2 className="text-[30px] font-[600] mb-4 text-[#353535]">About this title</h2>
                    <p className="text-[15.5px] font-normal text-[#353535]">
                        {data?.description}
                    </p>
                    {/* <div style={{color: 'transparent', background: 'linear-gradient(to right, #5F42E2, #9B42C0)', backgroundClip: 'text'}}>
                        <p>Read more...</p>
                    </div> */}
                </div>
                <div className="preview-mid-section-1-right bg-[#F6F6F6] p-[20px] rounded-[7px]">
                    <p className="text-[15.5px] font-normal text-[#353535]">Release Date: {" "} <span className="font-[600]">{data?.author}</span></p>
                    <p className="text-[15.5px] font-normal text-[#353535]">Language: {" "} <span className="font-[600]">{data?.language}</span></p>
                    <p className="text-[15.5px] font-normal text-[#353535]">Format: {" "} <span className="font-[600]">{formats[data?.type - 1]}</span></p>
                    {/* <p>Length: {" "} <span>10hrs and 53 mins</span></p> */}
                    <p className="text-[15.5px] font-normal text-[#353535]">Categories: {" "} <span className="font-[600]">{data?.categories[0]}</span></p>
                </div>
            </div>

            <section className="preview-mid-section-2 px-[20px] py-[60px] max-w-[80rem] mx-auto">
                <div className="preview-mid-section-2-header flex justify-between items-center mb-8">
                    <p style={{fontFamily: 'Graphik', fontSize: '25px', fontWeight: '600', color: '#353535'}}>
                        People who viewed this also viewed
                    </p>
                    <div className="carousel-controls flex gap-4">
                        <button 
                            className={`w-[40px] h-[40px] rounded-[50%] border border-transparent bg-[linear-gradient(white,_white)_padding-box,_linear-gradient(to_bottom,_#5F42E2,_#9B42C0)_border-box] bg-clip-border disabled:bg-[linear-gradient(white, white) padding-box, #E5E5E5 border-box] cursor-not-allowed hover:transform-[scale:1.05]`}
                            onClick={() => handleCarouselScroll('left')}
                            disabled={isAtStart}
                            aria-label="Scroll left"
                        >
                            <FaArrowLeft size={20} color={isAtStart ? "#E2E2E2" : "#5F42E2"} />
                        </button>
                        <button 
                            className={`w-[40px] h-[40px] rounded-[50%] border border-transparent bg-[linear-gradient(white,_white)_padding-box,_linear-gradient(to_bottom,_#5F42E2,_#9B42C0)_border-box] bg-clip-border disabled:bg-[linear-gradient(white, white) padding-box, #E5E5E5 border-box] cursor-not-allowed hover:transform-[scale:1.05]`}
                            onClick={() => handleCarouselScroll('right')}
                            disabled={isAtEnd}
                            aria-label="Scroll right"
                        >
                            <FaArrowRight size={20} color={isAtEnd ? "#E2E2E2" : "#5F42E2"} />
                        </button>
                    </div>
                </div>
                <div className="preview-mid-section-2-img-array flex justify-start items-start gap-8 flex-nowrap w-full overflow-x-hidden scroll-smooth mt-8" ref={carouselRef}>
                    {
                        data?.additional_titles.map((title, i) => {
                            return (
                                <div key={i} onClick={() => router.push(`/title/${title?.id}`)} style={{width: '200px', flex: '0 0 auto', cursor: 'pointer'}}>
                                    <div className="add_title_img w-[200px] border border-[#E2E2E2] rounded-[7px]">
                                        <img src={title?.image_upload?.location_image} alt={title?.title} className="add_title_img" />
                                    </div>
                                    <div className="flex flex-col gap-2 mt-[5px] text-black" style={{display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '5px'}}>
                                        <p style={{fontWeight: '500', fontSize: '18px', color: '##353535'}}>{title?.title}</p>
                                        <p style={{fontSize: '14px', color: '#363636BD', fontWeight: '400' }}>{title?.authors_name[0]?.authors_name?.name}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            <section className="preview-mid-section-3 px-[20px] pb-[60px] pt-0 flex justify-center items-center gap-12 max-w-[80rem] mx-auto">
                <div className="gadget-img my-[10px]">
                    {/* <img src={gadgetsImg} alt="" /> */}
                    <Image src={'/assets/img/gadgets-image.png'} alt="Listen" width={400} height={400} />
                </div>
                <div className="preview-mid-section-3-right w-auto" style={{
                    fontFamily: 'Graphik',
                }}>
                    <p style={{
                            fontWeight: 'bolder', fontSize: '32px'
                        }}
                        className="text-black"
                    >
                        Download the Genti App today
                    </p>
                    {/* <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Sunt laboriosam possimus quis quae voluptates accusantium 
                        sequi velit numquam dolorum asperiores.
                    </p> */}
                    <div style={{
                        display: 'flex', gap: '10px', alignItems: 'center', marginTop: '2rem'
                    }}>
                        <div onClick={() => {
                            handleAppRedirect('ios')
                        }}>
                            <Image src="/app-store.svg" alt="App Store" width={150} height={150} />
                        </div>
                        <div onClick={() => {
                            handleAppRedirect('android')
                        }}>
                            <Image src="/google-play.svg" alt="Google Play" width={150} height={150} />
                        </div>
                    
                    </div>
                </div>
            </section>
        </div>

        {/* Footer Section */}
        <div>
            <PreviewFooter handleAppRedirect={handleAppRedirect} />
        </div>


      </div>
    )
  }

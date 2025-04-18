import { RiFacebookLine, RiLinkedinLine, RiTwitterLine } from 'react-icons/ri'
import { BsInstagram } from 'react-icons/bs'

export default function PreviewFooter({ handleAppRedirect }){
    return (
        <footer className="preview-footer bg-[#0F0F0F] text-white w-full">
            <div className="footer-content max-w-[80rem] mx-auto px-[20px] pt-[60px] pb-0">
                <div className="footer-main grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8 pb-10 border-b border-[#2B2B2B]">
                    <div className="footer-brand max-w-[400px]">
                        <img src="/logo.svg" style={{width: '100px'}} alt="Genti Logo" />
                        <p className='text-[#808080] my-6 mx-0 text-[15px]'>
                            African Audio Stories, Audiobooks, Podcasts and more. 
                            Mobile App. Download the app and listen for free!
                        </p>
                        <div className="footer-store-buttons flex gap-4 items-center">
                            <img className='cursor-pointer' onClick={() => {
                                handleAppRedirect('ios')
                            }} src="/app-store.svg" alt="App Store" />
                            <img className='cursor-pointer' onClick={() => {
                                handleAppRedirect('android')
                            }} src="/google-play.svg" alt="Google Play" />
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <h3 className='text-[18px] font-[500] mb-6 text-[#D6CCFF]' >Explore</h3>
                        <ul className='list-none m-0 p-0'>
                            <li className='mb-4'><a className='text-[#ABABAB] decoration-0 text-[15px] transition-[color 0.2s] hover:text-white' href="#">Contact Us</a></li>
                            <li className='mb-4'><a className='text-[#ABABAB] decoration-0 text-[15px] transition-[color 0.2s] hover:text-white' href="#">Subscriptions</a></li>
                            <li className='mb-4'><a className='text-[#ABABAB] decoration-0 text-[15px] transition-[color 0.2s] hover:text-white' href="#">FAQs</a></li>
                            <li className='mb-4'><a className='text-[#ABABAB] decoration-0 text-[15px] transition-[color 0.2s] hover:text-white' href="#">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h3 className='text-[18px] font-[500] mb-6 text-[#D6CCFF]'>For Storytellers</h3>
                        <ul>
                            <li className='mb-4'><a className='text-[#ABABAB] decoration-0 text-[15px] transition-[color 0.2s] hover:text-white' href="#">Writers</a></li>
                            <li className='mb-4'><a className='text-[#ABABAB] decoration-0 text-[15px] transition-[color 0.2s] hover:text-white' href="#">Voice Artists</a></li>
                            <li className='mb-4'><a className='text-[#ABABAB] decoration-0 text-[15px] transition-[color 0.2s] hover:text-white' href="#">Creatives</a></li>
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h3 className='text-[18px] font-[500] mb-6 text-[#D6CCFF]'>Need Help?</h3>
                        <ul>
                            <li className='mb-4'><a href="#" className='text-[#ABABAB] decoration-0 text-[15px] transition-[color 0.2s] hover:text-white'>FAQs</a></li>
                            <li className='mb-4'><a href="#" className='text-[#ABABAB] decoration-0 text-[15px] transition-[color 0.2s] hover:text-white'>Contact Us</a></li>
                            <li className='mb-4'><a href="#" className='text-[#ABABAB] decoration-0 text-[15px] transition-[color 0.2s] hover:text-white'>Terms & Conditions</a></li>
                            <li className='mb-4'><a href="#" className='text-[#ABABAB] decoration-0 text-[15px] transition-[color 0.2s] hover:text-white'>Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="footer-social">
                        <h3 className='text-[18px] font-[500] mb-6 text-[#D6CCFF]'>Follow us</h3>
                        <div className="social-icons flex gap-3 items-center">
                            <a href="#" className="social-icon w-[32px] h-[32px] rounded-[50%] bg-[6C6C6C63] flex border border-solid border-[#8E8E8E4F] items-center justify-center text-[#8E8E8E] decoration-0 transition-[backgroubd-color 0.2s] hover:bg-white hover:border-white hover:text-[#0F0F0F]">
                                <RiFacebookLine />
                            </a>
                            <a href="#" className="social-icon">
                                <RiLinkedinLine />
                            </a>
                            <a href="#" className="social-icon">
                                <RiTwitterLine />
                            </a>
                            <a href="#" className="social-icon">
                                <BsInstagram />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom max-w-[80rem] mx-auto p-[20px] text-center text-[#808080] text-[14px]">
                <p>Genti Media 2025. All rights reserved</p>
            </div>
        </footer>
    )
}
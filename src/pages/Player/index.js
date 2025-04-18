import { useEffect } from 'react';
import Header from '../../component/Header'
import App from '../../component/App';
import { Modal } from 'reactstrap'
import { useState } from 'react';
import android from '../../assets/img/android.svg'
import ios from '../../assets/img/appl.svg'
import close from '../../assets/img/close.svg'
import bg from '../../assets/img/subClose.svg'
import download_bg from '../../assets/img/fh4.png'
import { setDefaultTeaser } from '../../utils/teaser';
import handleUTMLink from '../../utils/UTM';






function Player() {
 
  setDefaultTeaser()

  useEffect(() => {
  })

  const [showModal, setShowModal] = useState(false)
  const [showSubscribeModal, setShowSubscribeModal] = useState(false)


  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const toggleSubscribeModal = () => {
    setShowSubscribeModal(!showSubscribeModal)
  }


  // useEffect(() => {
  //   const timer = setTimeout(() => toggleSubscribeModal(), 180000);
  //   return () => clearTimeout(timer);
  // }, []);



  return (
    <>
      <div className="main-wrapper">
        <div className="px-3 px-md-5">
          <Header toggle={toggleModal} />
          <App toggle={toggleModal} toggleSubscribe={toggleSubscribeModal} />

        </div>

      </div>
      <Modal isOpen={showModal} toggle={toggleModal} modalClassName='download_modal' contentClassName='download_modal_content' >
        <div className='get-app-modal py-5'>
          <p className='modal-text '>
            Listen now
            on the Genti Audio App
          </p>
          <div className='d-flex' >
            <div onClick={() => {
              handleUTMLink()
            }}

              className='download-btn d-flex align-items-center android' role='button'>
              <div className='download-icon'>
                <img src={android} alt='icon' />
              </div>
              <div>
                <p className='download-text mb-0'>Get on Android</p>
              </div>

            </div>
            <div onClick={() => {
              handleUTMLink()
            }} className='download-btn d-flex align-items-center ios' role='button'>
              <div className='download-icon'>
                <img src={ios} alt='icon' />
              </div>
              <div>
                <p className='download-text mb-0'>Get on iPhone</p>
              </div>

            </div>
          </div>
        </div>

        <div className='text-center w-100'>
          <div className='close-btn-wrapper' role='button' onClick={toggleModal}>
            <img src={close} alt='icon' />
          </div>
        </div>
        <div className='position-absolute download_bg'>
          <img src={download_bg} alt='bg' />

        </div>
      </Modal>

      <Modal isOpen={showSubscribeModal} toggle={toggleSubscribeModal} modalClassName='subscribe_modal' contentClassName='subscribe_modal_content' >
        <div className='get-app-modal '>
          <div>
            <p className='modal-text '>
              Looking For More Titles Like This?
            </p>
            <p className='modal-sub_text '>
              Type in your email address and we'll send you more!
            </p>
          </div>


          <div className='d-flex justify-content-between  subscribe-input-wrapper align-items-center'>
            <input className='py-2 subscribe-input' placeholder='account@email.com' />
            <div>
              <button className='subscribe-button '>
                Send
              </button>
            </div>

          </div>

          <div className='position-absolute subscribe_bg' onClick={() => {
            toggleSubscribeModal()
          }}>
            <img src={bg} alt='bg' />

          </div>
        </div>



      </Modal>


    </>


  );
}

export default Player;

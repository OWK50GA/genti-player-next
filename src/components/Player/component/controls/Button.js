import React from 'react'
import './button.css'
import Image from 'next/image'



function Button({ play, isPlaying, forward,
  backward }) {
  return (
    <div className='btn-container'>
      <div role='button' onClick={backward}>
        <Image src={'/assets/img/forward.svg'} alt='play-ctrl' height={20} width={20} />
      </div>
      <div onClick={play} role='button' className='play-ctrl-btn'>
        {
          !isPlaying ?
            <Image src={'/assets/Image/play.svg'} alt='play-ctrl' width={20} height={20}/>
            :
            <Image src={'/assets/img/pause.svg'} alt='play-ctrl' width={20} height={20}/>

        }
      </div>
      <div role='button' onClick={forward}>
        <Image src={'/assets/img/back.svg'} alt='play-ctrl' height={20} width={20} />
      </div>
    </div>
  )
}
export default Button

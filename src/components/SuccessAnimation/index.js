import React from 'react'
import Lottie from "lottie-react";
import success from '../../utils/success.json'

const Success = () => {
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <Lottie animationData={success} loop={false} />
        </div>
    )
}

export default Success
import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='loader-wrapper d-flex justify-content-center align-items-center app-wrapper'>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="3.5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>

    )
}

export default Loader
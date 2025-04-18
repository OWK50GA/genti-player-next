import React from 'react'
import { Bars } from 'react-loader-spinner'

const ButtonLoader = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <Bars
                height="20"
                width="20"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default ButtonLoader
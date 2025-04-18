import React from 'react'
import { Bars } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='w-[100%] flex items-center justify-center'
            style={{
                height: 'calc(90vh - 80px)'
            }}>
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

export default Loader
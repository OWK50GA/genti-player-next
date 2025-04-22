import Image from 'next/image'
import React from 'react'
// import noTransactions from '../../../../assets/img/emptyBalance.svg'

const EmptyBalance = ({ content }) => {
    return (
        <div className='w-100 d-flex align-items-center justify-content-center flex-column'>
            <div>
                {/* <img src={noTransactions} /> */}
                <Image src={'/assets/img/emptyBalance.svg'} alt='icon' height={200} width={200} />
            </div>
            <h3 className='empty-balance__title'>{`No ${content}`}</h3>
            <p className='empty-balance__content'>{`Your ${content} will appear here`}</p>
        </div>
    )
}

export default EmptyBalance
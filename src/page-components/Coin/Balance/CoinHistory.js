import React from 'react'
import EmptyBalance from './Empty'
// import coinIcon from '../../../assets/img/activeCoin.svg'
import moment from 'moment'
import Image from 'next/image'

const History = ({ transaction }) => {
    return (
        <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center gap-3'>
                <div className='d-flex align-items-center  flex-column justify-content-center'>
                    {/* <img src={coinIcon} alt='icon' style={{
                        height: '28px',
                        width: '28px',
                        marginBottom: '8px'
                    }} /> */}
                    <Image src={'/assets/img/activeCoin.svg'} alt='icon' height={40} width={40}/>
                    {/* <p className='pack-value mb-0'>{`${transaction?.title ?? ''} coins`}</p> */}
                </div>
                <div>
                    <p className='coin-pack_title mb-1'>{transaction?.title}</p>
                    <p className='coin-pack_description mb-0'>{moment(transaction?.date).format('llll')}</p>
                </div>


            </div>

            <p className=' coin-unit__wrapper mb-0'
                onClick={() => {
                    // //console.log(pack)
                    // navigate('/coin/payment')
                }}
            >

                {
                    transaction?.unit
                }
            </p>
        </div>
    )

}

const CoinHistory = ({ history }) => {
    return (
        <div>
            {history?.length > 0 ?
                <div className='coin-pack__container my-4 mx-4'>
                    {
                        history.map((el, i) =>
                            <>
                                <History transaction={el} />
                                {i !== history?.length - 1 &&
                                    <div className='pack-divider' />}
                            </>



                        )
                    }
                </div> :
                <EmptyBalance content={'coin history'} />}
        </div>
    )
}

export default CoinHistory
import React, { useState } from 'react'
import AppLayout from '../../../layout/App'
import whiteLogo from '../../../assets/img/gfw.svg'
import useGetCoinsManager from '../../../client/coins/GetCoinsManager'
import coinIcon from '../../../assets/img/activeCoin.svg'
import PurchaseHistory from './PurchaseHistory'
import CoinHistory from './CoinHistory'

const CoinBalance = () => {
    const [section, setSection] = useState('coin_history')
    const { coins } = useGetCoinsManager()
    return (
        <AppLayout>
            <div className='coin-balance-header_container w-100 d-flex flex-column'>
                <div className='d-flex r justify-content-between w-100'>
                    <div>
                        <img src={whiteLogo} al='genti_' />

                    </div>
                    <div className='coin-help__bg d-flex align-items-center gap-x-2'>
                        <p className='coin-help mb-0'>Need Help?</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M10.0201 6L8.61011 7.41L13.1901 12L8.61011 16.59L10.0201 18L16.0201 12L10.0201 6Z" fill="#8161F4" />
                        </svg>

                    </div>

                </div>
                <div className='mt-auto d-flex gap-x-3'>
                    <div className='me-4'>
                        <p className='coin-section_text'>Balance</p>
                        <div className='d-flex  align-items-center'>
                            <div className='me-2 flex-shrink-0'>
                                <img src={coinIcon} alt='icon' style={{
                                    height: '40px',
                                    width: '40px',
                                }} />
                            </div>
                            <div className='w-full d-flex align-items-center justify-content-between mt-3'>
                                <h3 className='coin-balance mb-0 '><span className='coin-balance__value me-1'>{`${coins?.balance}`}</span> Coins</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className='d-flex coin-history__container '>
                    <p onClick={() => {
                        setSection('coin_history')
                    }}
                        className={`cursor-pointer text-center coin-history__header mb-0 w-50 ${section === 'coin_history' ? 'active' : ''}`}>My Coin History</p>
                    <p
                        onClick={() => {
                            setSection('purchase_history')
                        }}
                        className={`cursor-pointer text-center coin-history__header mb-0 w-50 ${section === 'purchase_history' ? 'active' : ''}`}>Purchase History</p>
                </div>
            </div>
            {
                section === 'coin_history' && <CoinHistory history={coins?.transactions?.episode_unlocked ?? []} />
            }
            {
                section === 'purchase_history' && <PurchaseHistory history={coins?.transactions?.purchase_history ?? []} />

            }
        </AppLayout>
    )
}

export default CoinBalance;
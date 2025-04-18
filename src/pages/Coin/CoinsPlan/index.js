import React from 'react'
import Pack from '../Pack'


const CoinsPack = ({ coinsPack }) => {
    return (
        <div className='coin-pack__container rounded-[17px] backdrop:blur-[6px] bg-[#292929] px-[40px] py-[24px]'>
            <h3 className='pack-title text-[#FDFDFD] text-[24px] font-normal mb-[24px]'>Coins Pack</h3>
            {
                coinsPack?.map((el, i) =>
                    <div className={`${i !== coinsPack?.length - 1 && 'border-b border-b-[#8e8e8e80]'} py-6`}>
                        <Pack pack={el} />
                        {/* {
                            i !== coinsPack?.length - 1 &&
                            <div className='pack-divider bg-[#8e8e8e80] mx-[24px] my-0 h-[1px]' />

                        } */}

                    </div>


                )
            }
        </div>
    )
}

export default CoinsPack
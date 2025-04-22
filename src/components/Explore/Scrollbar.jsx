import { useEffect, useState } from 'react'

const Scrollbar = ({ overflowRef }) => {


    const [cordinate, setCordinate] = useState(0)
    const [showScroll, setShowScroll] = useState(false)

    function isOverflowY(element) {
        
        // const overflowing = 
        setShowScroll(element.scrollHeight != Math.max(element.offsetHeight, element.clientHeight))
        // return element.scrollHeight != Math.max(element.offsetHeight, element.clientHeight)
    }

    const increaseCordinate = (increment) => {
        const newCordinate = cordinate + increment
        setCordinate(newCordinate)
    }

    const handleScrolling = (cord) => {
        overflowRef?.scroll(0, cord)
    }
    // const scroll_btn = document.querySelector('.section-content-container')
    // scroll_btn.addEventListener('click', () => {

    // })
    useEffect(() => {
        if (cordinate !== 0) handleScrolling(cordinate)

    }, [cordinate])

    

    useEffect(()=>{
        isOverflowY(overflowRef)
    })
   





    return (
        showScroll ?
            <div className='scroll-container position-absolute py-2 text-center w-100 d-none d-md-block' role='button'>
                <div className='scroll_btn' onClick={() => {
                    increaseCordinate(20)
                }}>
                    <Image src={'/assets/img/scroll.svg'} alt='icon' width={20} height={20}/>
                </div>

            </div> : null
    )
}

export default Scrollbar
import React from 'react'
import { AiOutlineFullscreenExit } from 'react-icons/ai'
const FullImage = ({ item, Close }) => {
    console.log(item);
    return (
        <div className='fixed top-0 ring-0 left-0 bottom-0 bg-black bg-opacity-40 backdrop-blur-sm w-full h-full  flex  justify-center    z-50'>

            <div className='w-full h-full md:w-[80vw] md:h-[80vh] relative overflow-y-scroll overflow-x-scroll'>
                <AiOutlineFullscreenExit className='absolute right-0 cursor-pointer top-0 text-3xl text-white bg-black bg-opacity-35' onClick={Close} />
                {item && (
                    <img src={`https://nodejs-backend-devblog.onrender.com/images/${item.imageObject}`} className='w-full rounded-md' alt={item.title} />
                )}
            </div>

        </div>
    )
}

export default FullImage
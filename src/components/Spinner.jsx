import React from 'react'

const Spinner = () => {
  return (
    <div className='flex  justify-center w-full  items-center h-full animate-spin'>
        <span className='rounded-full w-[50px] h-[50px] border-4 border-red-700 border-t-white'></span>
    </div>
  )
}

export default Spinner
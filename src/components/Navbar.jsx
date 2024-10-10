import { AiOutlineUser } from 'react-icons/ai'
import { MdAddBox, MdMenu,MdClose } from 'react-icons/md';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { DataContext } from '../context';


const Navbar = () => {
    const { userdata } = useContext(DataContext);


    const [menu, setMenu] = useState(false)

    return (
        <div className='flex justify-between px-4 py-4 bg-black bg-opacity-45 backdrop-blur-lg shadow-emerald-50 sticky top-0 w-full z-50'>
            <div className='flex items-center justify-between  p-0 m-0 gap-x-8'>
                <Link to={'/'} className='text-2xl font-bold text-white'>
                    <span className='font-bold text-pretty'>DEV</span><span className='relative'>blo<span className='rotate-180 top-1 absolute animate-bounce'>g</span></span>
                </Link>
                <Link to={'/'} className='font-bold text-xl text-white  hidden md:block'>Home</Link>
            </div>
            {
                menu ? <MdClose  className='cursor-pointer text-2xl block md:hidden' onClick={() => setMenu(!menu)}/>:<MdMenu className='cursor-pointer text-2xl block md:hidden' onClick={() => setMenu(!menu)} />
            }
            <div className={`gap-x-2  items-center ${menu ? 'flex flex-col fixed bg-black bg-opacity-65 right-4 rounded-md top-10 p-5 z-40 gap-y-4 backdrop-blur-lg' : 'hidden md:flex'}`}>
                <Link to={'/'} className='font-bold text-xl text-white flex md:hidden'>Home</Link>
                <Link to={`${userdata ? '/books/create' : '/user/signin'}`}><MdAddBox className='text-4xl text-white'/></Link>
                {
                    userdata ? <Link to={'/user/profile'} className='border-none mx-2 text-white'><AiOutlineUser className='text-3xl border border-1 rounded-full'/></Link>
                        : <>
                            <Link to={'/user/signup'} className='border-none p-2 mx-2 text-white bg-amber-600 rounded-md hover:bg-amber-400'>Signup</Link>
                            <Link to={'/user/signin'} className='border-none p-2 mx-2 text-white bg-amber-600 rounded-md hover:bg-amber-400'>Signin</Link>
                        </>
                }

            </div>
        </div>
    )
}

export default Navbar
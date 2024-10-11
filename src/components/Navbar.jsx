import { AiOutlineUser } from 'react-icons/ai'
import { MdAddBox, MdMenu, MdClose } from 'react-icons/md';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { DataContext } from '../context';


const Navbar = () => {
    const { userdata } = useContext(DataContext);


    const [menu, setMenu] = useState(false);


    return (
        <nav className='flex justify-between px-4 py-4 bg-black bg-opacity-45 backdrop-blur-lg shadow-emerald-50 sticky top-0 w-full z-50'>
            <div className='flex items-center justify-between  p-0 m-0 gap-x-8'>
                <Link to={'/'} className='text-2xl font-bold text-white'>
                    <span className='font-bold text-pretty'>DEV</span><span className='relative'>blo<span className='rotate-180 top-1 absolute animate-bounce'>g</span></span>
                </Link>
            </div>
            <ul className='list-none flex items-center'>

                <li className='hidden md:block mr-2'>
                    <Link to={'/'} className='font-bold text-xl text-white'>Home</Link>
                </li>
                <li className='hidden md:block'>
                    <Link to={`${userdata ? '/books/create' : '/user/signin'}`}><MdAddBox className='text-4xl text-white' /></Link>
                </li>
                {
                    userdata ? <li className='hidden md:block'><Link to={'/user/profile'} className='border-none mx-2 text-white'><AiOutlineUser className='text-3xl border border-1 rounded-full' /></Link></li> :
                        <li className='hidden md:block'>
                            <Link to={'/user/signup'} className='border-none p-2 mx-2 text-white bg-amber-600 rounded-md hover:bg-amber-400'>Signup</Link>
                            <Link to={'/user/signin'} className='border-none p-2 mx-2 text-white bg-amber-600 rounded-md hover:bg-amber-400'>Signin</Link>
                        </li>
                }
                <li  className='relative'>
                    <button className='bg-transparent' onClick={() => setMenu(!menu)}>
                        {
                            menu ? <MdClose className='cursor-pointer text-white text-2xl block md:hidden' /> : <MdMenu className='cursor-pointer text-2xl block text-white md:hidden' />
                        }
                    </button>

                    {
                        menu && (
                            <ul className="list-none absolute -top-4 w-[60vh] -right-4 h-[100vh] bg-black bg-opacity-45 backdrop-blur-lg p-2">
                                <li> <MdClose className='cursor-pointer text-white text-2xl block md:hidden' onClick={() => setMenu(false)}/></li>
                                <li className='flex md:hidden justify-center'>
                                    <Link to={'/'} className='font-bold text-xl text-white' onClick={() => setMenu(false)}>Home</Link>
                                </li>
                                <li className='flex items-center justify-center my-2 md:hidden'>
                                    <Link to={`${userdata ? '/books/create' : '/user/signin'}`} onClick={() => setMenu(false)}><MdAddBox className='text-4xl text-white' /></Link>
                                </li>
                                {
                                    userdata ? <li className='flex justify-center md:hidden'><Link to={'/user/profile'} className='border-none mx-2 text-white' onClick={() => setMenu(false)}><AiOutlineUser className='text-3xl border border-1 rounded-full' /></Link></li> :
                                        <li className='flex flex-col items-center  gap-y-2 md:hidden'>
                                            <Link to={'/user/signup'} onClick={() => setMenu(false)} className='border-none p-2 mx-2 text-white bg-amber-600 rounded-md hover:bg-amber-400'>Signup</Link>
                                            <Link to={'/user/signin'} onClick={() => setMenu(false)} className='border-none p-2 mx-2 text-white bg-amber-600 rounded-md hover:bg-amber-400'>Signin</Link>
                                        </li>
                                }
                            </ul>
                        )
                    }
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
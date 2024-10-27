
import { MdAddBox, MdMenu, MdClose, MdDarkMode, MdLightMode } from 'react-icons/md';
import { AiOutlineUser, AiFillHeart } from 'react-icons/ai'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { DataContext } from '../context';


const Navbar = () => {
    const { userdata, theme, setTheme } = useContext(DataContext);

    const [menu, setMenu] = useState(false);

    const themeHandler = () => {
        setTheme(th => {
            if (th == 'white') {
                localStorage.setItem('theme', JSON.stringify('black'));
                return 'black'
            } else {
                localStorage.setItem('theme', JSON.stringify('white'));
                return 'white'
            }
        })


    }




    return (
        <nav className={`flex justify-between p-2 md:p-3 bg-black bg-opacity-45 backdrop-blur-lg shadow-emerald-50 sticky top-0  w-full z-50`}>
            <div className='flex items-center justify-between  p-0 m-0 gap-x-8'>
                <Link to={'/'} className='text-2xl font-bold text-white'>
                    <span className='font-bold text-pretty'>DEV</span><span className='relative'>blo<span className='rotate-180 top-1 absolute animate-bounce'>g</span></span>
                </Link>
            </div>
            <ul className='list-none flex items-center gap-x-2'>

                <li className='hidden md:block mr-2'>
                    <Link to={'/'} className='font-bold text-xl text-white'>Home</Link>
                </li>
                <li className='hidden md:block'>
                    <Link to={`${userdata ? '/books/create' : '/user/signin'}`}><MdAddBox className='text-4xl  p-0 text-white' /></Link>
                </li>
                {
                    userdata ? <li className='hidden md:block'><Link to={'/user/profile'} className='border-none mx-2 text-white'><AiOutlineUser className='text-3xl border border-1 rounded-full' /></Link></li> :
                        <li className='hidden md:block'>
                            <Link to={'/user/signup'} className='border-none p-2  mx-2 text-white bg-amber-600 rounded-md hover:bg-amber-400'>Signup</Link>
                            <Link to={'/user/signin'} className='border-none p-2  mx-2 text-white bg-amber-600 rounded-md hover:bg-amber-400'>Signin</Link>
                        </li>
                }
                <li className='hidden md:block'>
                    <button className='bg-slate-400 rounded-md' onClick={themeHandler}> {
                        theme == 'white' ? <MdDarkMode className='text-xl text-black' /> : <MdLightMode className='text-xl text-white' />
                    }
                    </button>
                </li>
                <li className='relative'>
                    <button className='bg-transparent' onClick={() => setMenu(!menu)}>


                        <MdMenu className='cursor-pointer text-2xl block text-white md:hidden' />


                    </button>




                    <ul className={`${menu ? 'fixed' : 'hidden'} list-none   top-0 bottom-0 ring-0 left-[0%] w-[100vw] z-50  h-[100vh] bg-black bg-opacity-75 backdrop-blur-lg  p-4`}>
                        <li> <MdClose className='cursor-pointer text-white text-2xl block md:hidden' onClick={() => setMenu(false)} /></li>
                        <li className='flex md:hidden justify-center'>
                            <Link to={'/'} className='font-bold text-xl text-white' onClick={() => setMenu(false)}>Home</Link>
                        </li>
                        <li className='flex items-center justify-center my-2 md:hidden'>
                            <Link to={`${userdata ? '/books/create' : '/user/signin'}`} onClick={() => setMenu(false)}><MdAddBox className='text-4xl text-white' /></Link>
                        </li>
                        {
                            userdata ? <li className='flex justify-center md:hidden'><Link to={'/user/profile'} className='border-none mx-2 text-white' onClick={() => setMenu(false)}><AiOutlineUser className='text-3xl border border-1 rounded-full' /></Link></li> :
                                <li className='flex flex-col items-center  gap-y-2 md:hidden'>
                                    <Link to={'/user/signup'} onClick={() => setMenu(false)} className='w-[40%] text-center border-none p-2 mx-2 text-white bg-amber-600 rounded-md hover:bg-amber-400'>Signup</Link>
                                    <Link to={'/user/signin'} onClick={() => setMenu(false)} className='w-[40%] text-center border-none p-2 mx-2 text-white bg-amber-600 rounded-md hover:bg-amber-400'>Signin</Link>
                                </li>
                        }

                        <li className='flex justify-center mt-2 md:hidden'>
                            <button className=' bg-slate-400 rounded-md' onClick={themeHandler}> {
                                theme == 'white' ? <MdDarkMode className='text-2xl text-black' /> : <MdLightMode className='text-2xl text-white' />
                            }
                            </button>
                        </li>
                    </ul>



                </li>
            </ul>
        </nav>
    )
}

export default Navbar
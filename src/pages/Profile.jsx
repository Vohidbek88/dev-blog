
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineLogout, AiFillHeart, AiOutlineUserSwitch, AiFillAccountBook, AiFillSetting } from 'react-icons/ai'
import { DataContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';



const Profile = () => {


  const { userdata, logout, isPending, allBooks, theme} = useContext(DataContext)

  const [show, setShow] = useState(false);
  const [threemenu, setThreeMenu] = useState(false);
  const [post, setPosts] = useState([])
  const navigate = useNavigate()
  console.log(userdata);
  if (!userdata) {
    navigate('/')
  }

  const colorPr = [
    {
      color: 'red'
    },
    {
      color: 'yellow'
    },
    {
      color: 'orange'
    },
    {
      color: 'blue'
    },
    {
      color: 'green'
    },
    {
      color: 'gray'
    },
    {
      color: 'black'
    },
    {
      color: 'red'
    },
    {
      color: 'yellow'
    },
    {
      color: 'orange'
    },
    {
      color: 'blue'
    },
    {
      color: 'green'
    },
    {
      color: 'gray'
    },
    {
      color: 'black'
    }
  ]

  useEffect(() => {
    if (userdata && allBooks.length > 0) {
      const filterPost = allBooks.filter(item => item.email == userdata.email);
      setPosts(filterPost)
    }
  }, [])

  return (
    <div className={`w-full h-[92vh] bg-${theme}`}>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className={`flex flex-col  mx-auto w-[90vw] md:w-[40vw]  rounded-lg  h-auto p-4 shadow-2xl  shadow-${theme=='black' ? 'white':'black'}  relative`}>
        <div>
          <span className={`text-2xl text-${theme=='black' ? 'white':'black'} absolute rotate-90 right-0 cursor-pointer font-bold`} onClick={() => setThreeMenu(!threemenu)}>...</span>
          {
            threemenu && (
              <div className='absolute bg-black p-2 rounded-md right-3 top-11'>
                <p className='cursor-pointer p-1 bg-white text-black border-1 rounded-md mb-2 hover:bg-opacity-50'>Settings<AiFillSetting className='text-xl' /></p>
                <p className='cursor-pointer bg-white text-black p-1 border-1 hover:bg-opacity-50 rounded-md'>Other</p>
              </div>
            )
          }
        </div>
        <div className='flex items-center justify-center mt-4'>
          <span className={`text-4xl px-4 pb-2 pt-1 border-1 text-${theme=='black' ? 'white':'black'} border-solid border-cyan-950  rounded-full flex items-center justify-center bg-${colorPr[String(userdata?.username).length].color}-400`}>{String(userdata?.username)[0].toUpperCase()}</span>
        </div>

        <p className={`text-center mt-2 mb-4 font-bold text-2xl text-${theme=='black' ? 'white':'black'}`}>{userdata?.username}</p>
        <p className={`text-center mb-3 text-${theme=='black' ? 'white':'black'}`}>{userdata?.email}</p>
        <div className='flex items-center justify-around mb-2'>
          <span className='flex flex-col items-center'>
            <AiFillHeart className='text-red-700 text-xl' title='Umumiy yoqtirishlar soni' />
            <small className={`text-${theme=='black' ? 'white':'black'}`}>1.2k</small>
          </span>
          <span className='flex flex-col text-center'>
            <AiOutlineUserSwitch className='text-red-700  text-xl' title='Obunachilar soni' />
            <small className={`text-${theme=='black' ? 'white':'black'}`}>90</small>
          </span>
          <span className='flex flex-col items-center'>
            <AiFillAccountBook className='text-red-700  text-xl' title='Postlar soni' />
            <small className={`text-${theme=='black' ? 'white':'black'}`}>{post.length}</small>
          </span>
        </div>
        <button className={`bg-${theme=='black' ? 'white':'black'} font-bold text-${theme} rounded-3xl py-3 w-[80%] mx-auto mt-3 hover:bg-opacity-75`} onClick={() => setShow(true)}>Logout<AiOutlineLogout className='text-xl ml-1 text-red-600' /></button>
      </div>

      <div className={`${show ? 'fixed top-0 ring-0 left-0 bottom-0 bg-black bg-opacity-60 w-full h-full' : 'hidden'}`}>
        <div className='flex h-full  items-center justify-center gap-2 flex-col backdrop-blur-md'>
          <p className='bold text-xl text-white text-center'>Are you sure logout {userdata?.email} account.!!!</p>
          <div className='flex gap-2'>
            <button className='p-4 bg-red-400 rounded-2xl hover:bg-red-600' onClick={() => { logout(), navigate('/') }} disabled={isPending}>Logout<AiOutlineLogout className='text-xl ml-1 text-white' /></button>
            <button className='p-4 bg-blue-400 rounded-2xl hover:bg-blue-700' onClick={() => setShow(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
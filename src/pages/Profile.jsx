
import React, { useContext, useState } from 'react'
import { DataContext } from '../context';
import { useNavigate } from 'react-router-dom';



const Profile = () => {


  const { userdata, logout, isPending } = useContext(DataContext)

  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  if (!userdata) {
    navigate('/')
  }


  return (
    <div className="w-full">
      <div className='flex flex-col mx-auto w-[300px] mt-8 rounded-lg bg-sky-700 h-[240px] p-4 shadow-md'>

        <p className='text-center p-2 hover:bg-slate-200 rounded-md'>ID: {userdata?._id}</p>
        <p className='text-center my-2 p-2 hover:bg-slate-200 rounded-md'>EMAIL: {userdata?.email}</p>
        <p className='text-center mb-4 p-2 hover:bg-slate-200 rounded-md'>USERNAME: {userdata?.username}</p>
        <button className='bg-yellow-600 hover:bg-opacity-50 text-white py-3 rounded-md hover:border-white' onClick={() => setShow(true)}>Logout</button>
      </div>
      <div className={`${show ? 'fixed top-0 ring-0 left-0 bottom-0 bg-black bg-opacity-60 w-full h-full' : 'hidden'}`}>
        <div className='flex h-full  items-center justify-center gap-2 flex-col backdrop-blur-md'>
          <p className='bold text-xl text-white text-center'>Are you sure logout {userdata?.email} account.!!!</p>
          <div className='flex gap-2'>
            <button className='p-4 bg-red-400 rounded-2xl hover:bg-red-600' onClick={() => { logout(), navigate('/') }} disabled={isPending}>Logout</button>
            <button className='p-4 bg-blue-400 rounded-2xl hover:bg-blue-700' onClick={() => setShow(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
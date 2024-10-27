import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineLogin} from 'react-icons/ai'
import { DataContext } from '../context';
import { Helmet } from 'react-helmet';


const Signup = () => {

    const [user, setUser] = useState({ username: '', email: '', password: null });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {userdata,handleSignup,loading,theme}=useContext(DataContext)
    
    if(userdata){
        navigate('/')
    }
 

    return (
        <div className={`flex h-[92vh] bg-${theme} flex-col justify-center px-6 py-12 lg:px-8`}>
            <Helmet>
                <title>Sign up</title>
            </Helmet>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-${theme=='white' ? 'gray-900':'white'}`}>Sign up to your account</h2>
            {
            error && <p className='w-[200px] rounded-md mx-auto text-xs mt-4  font-bold text-red-500 border border-red-500 text-center'> {error}</p>
        }
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
            <div>
                    <label for="username" className={`block text-sm font-medium leading-6 text-${theme=='white' ? 'gray-900':'white'}`}>Username</label>
                    <div className="mt-2">
                        <input id="username" name="username" type="text" autocomplete="username" onChange={e => setUser({ ...user, username: e.target.value })} required className="block  w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="email" className={`block text-sm font-medium leading-6 text-${theme=='white' ? 'gray-900':'white'}`}>Email address</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" autocomplete="email" onChange={e => setUser({ ...user, email: e.target.value })} required className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label for="password" className={`block text-sm font-medium leading-6 text-${theme=='white' ? 'gray-900':'white'}`}>Password</label>
                    </div>
                    <div className="mt-2">
                        <input id="password" name="password" type="password" onChange={e => setUser({ ...user, password: e.target.value })} autocomplete="current-password" required className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={()=>handleSignup(setError,user)} disabled={loading}>{loading ? 'Sign up...' : 'Sign up'}</button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
          Have you a already accounting? 
                <Link to="/user/signin" className="font-semibold leading-6 text-amber-600 hover:text-amber-500">Sign in</Link>
            </p>
        </div>
    </div>
    )
}

export default Signup
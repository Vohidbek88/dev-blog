import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';

import { DataContext } from './context';
import { CreateBook, EditBook, Home, Profile, ShowBook, Signin, Signup } from './pages';
import Navbar from './components/Navbar';
const App = () => {

  const {getUser}=useContext(DataContext);

  useEffect(() => {
    getUser()
  }, [])


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/books/create' element={<CreateBook />} />
        <Route path='/books/details/:id' element={<ShowBook />} />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/user/signup' element={<Signup />} />
        <Route path='/user/signin' element={<Signin />} />
        <Route path='/user/profile' element={<Profile />} />
      </Routes>
    
    </>
  )
}

export default App
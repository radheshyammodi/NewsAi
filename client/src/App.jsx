import React from 'react'
import { Navbar } from './components/Navbar'
import '@mantine/core/styles.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Preferences } from './pages/Preferences';
import { Toaster } from 'sonner';





export const App = () => {
  return (
    <div>


      <Navbar/>

      <Toaster position='top-center'/>

      <Preferences/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

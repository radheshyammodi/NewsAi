import React from 'react'
import { Navbar } from './components/Navbar'
import '@mantine/core/styles.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';





export const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

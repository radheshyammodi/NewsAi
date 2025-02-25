import React, { Suspense, lazy } from 'react'
import { Navbar } from './components/Navbar'
import '@mantine/core/styles.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Preferences } from './pages/Preferences';
import { Toaster } from 'sonner';
// import { Homepage } from './pages/Homepage';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import LoadingSpinner from './components/LoadingSpinner';

const Homepage = lazy(()=>import('./pages/Homepage'))





export const App = () => {
  return (
    <div>


      <Navbar/>

      <Toaster position='top-center'/>

      <Suspense fallback={<LoadingSpinner/>}>
      <Routes>

      <Route element = {<ProtectedRoutes/>}>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/preferences' element = {<Preferences/>}/>
      </Route>
      
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </Suspense>
    </div>
  )
}

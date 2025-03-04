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
import { PreferenceProtectRoute } from './components/PreferenceProtectRoute';
import About from './pages/About';
import Footer from './components/Footer';

const Homepage = lazy(()=>import('./pages/Homepage'))
const Profile = lazy(()=>import('./pages/Profile'))





export const App = () => {
  return (
    <div>


      <Navbar/>

      <Toaster position='top-center'/>

      <Suspense fallback={<LoadingSpinner/>}>
      <Routes>

      <Route element = {<ProtectedRoutes/>}>
          <Route path='/home' element={<Homepage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route element = {<PreferenceProtectRoute/>}>
          <Route path='/preferences' element = {<Preferences/>}/>
          </Route>
          
      </Route>
      
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      </Suspense>
      <Footer/> 
    </div>
  )
}

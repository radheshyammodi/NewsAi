import React from 'react'
import { getCookie } from '../utils/utils'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes = () => {

    const isAuthenticated = getCookie('isAuthenticated')

  if(!isAuthenticated){
    return <Navigate to="/login"/>
  }

  return <Outlet/>

}

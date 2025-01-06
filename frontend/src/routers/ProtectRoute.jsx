import React from 'react'
import { useAuth } from '../../context/AuthProvider'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({children}) => {
  
    const {isLoggedIn} = useAuth()
    console.log(isLoggedIn)
  return isLoggedIn ? children : <Navigate to="/login"/>
}
export default ProtectRoute
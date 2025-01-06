import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import {useAuth} from "../../context/AuthProvider"
import Loader from '../components/Loader'
const Login = () => {
  const {login,isLoggedIn} = useAuth()
  const [isLoading,setIsLoading] = useState(false) 
  const navigate = useNavigate()
      const checkLoginStatus = async ()=>{
        setIsLoading(true)
        try {
          const response = await fetch("/api/dashboard",{credentials:"include"})
          const data = await response.json()
          setIsLoading(false)
          console.log(data)
          if(data.msg){
              login()
              navigate("/")
          }else{
              logOut()
          }
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
    }
    useEffect(()=>{
        checkLoginStatus()
    },[])
  return (
    <>
       {isLoading && <Loader/>}
       <Form endPoint="/api/login" pageHeading="Welcome Back" page="login" login={login}/>
       <div className='md:text-xl flex justify-center mt-2 '>Does not have an account ? <Link to="/register" className='text-blue-700 underline'>&nbsp;Create Acount</Link> </div>
    </>
  )
}

export default Login
import React, { createContext, useContext, useEffect, useState } from 'react'
const AuthContext = createContext()
export const AuthProvider = ({children}) => {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const login = ()=>setIsLoggedIn(true)
  const logOut = async ()=>{
    await fetch("/api/logout",{method:"DELETE",headers:{"Content-Type":"application/json"},credentials:"include"})
    window.location.reload()
  }
  return (
    <AuthContext.Provider value={{isLoggedIn,login,logOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = ()=> useContext(AuthContext)
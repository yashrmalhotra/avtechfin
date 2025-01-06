import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Register from './routers/Register'
import Login from './routers/Login'
import Dashboard from './routers/Dashboard'
import ProtectRoute from './routers/ProtectRoute'
import { AuthProvider } from '../context/AuthProvider'
import Verfication from './routers/Verfication'
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: (
        <AuthProvider>
            <Login />
        </AuthProvider>
      )
    },
    {
      path: "/",
      element: (
        <AuthProvider>
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        </AuthProvider>
      )
    },
    {
      path:"/verify/:token",
      element:<Verfication/>
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
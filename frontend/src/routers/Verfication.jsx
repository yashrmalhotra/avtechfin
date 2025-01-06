import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'

const Verfication = () => {
  const [message, setMessage] = useState('')
  const params = useParams()
  const verifyUser = async () => {
    const response = await fetch(`/api/verify/${params.token}`)
    const data = await response.json()
    console.log(data)
    data?.msg ? setMessage(data.msg) : setMessage(data.error)
  }
  useEffect(() => {
    verifyUser()
  })
  return (
    <>
      <div className='text-xl md:text-3xl font-bold text-center container flex items-center justify-center h-screen'>{message}</div>
    </>
  )
}

export default Verfication
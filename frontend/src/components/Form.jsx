import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Form = ({ endPoint, pageHeading, page, login }) => {

    const [form, setform] = useState({ email: "", password: "" })
    const [err, setErr] = useState()
    const [msg, setMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(endPoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(form)
            })
            const data = await response.json()
            setIsLoading(false)
            if (Object.keys(data).includes("error")) {
                const joinAndError = Array.isArray(data.error) ? data.error.join(" and ") : data.error
                setErr(joinAndError)
    
            }
            else if (page === "register") {
                setMsg(data.msg)
                setErr("")
            }
            else {
                setErr("")
                if (page === "login" && data.msg === "Logged in") {
                    login()
                    navigate("/")
                    setErr("")
    
                } else {
                    setErr(data.error)
                }
            }
    
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    return (
        <>
            {isLoading && <Loader/>}
            <h1 className='text-center mt-14 font-bold text-2xl'>{pageHeading}</h1>
            <div className="flex w-full  justify-center items-center flex-col">
                <h2 className='my-12 w-[80%] md:w-1/2 flex mr-[35px]'>
                    <span className=' text-2xl text-red-500'>*</span>
                    <div className='font-bold text-xl px-2'>Indicates required field</div>
                </h2>
                <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-y-3'>
                    <div className='w-[80%] md:w-1/2 relative'>
                        <span className='absolute top-0 left-[-25px] text-2xl text-red-500 ml-2'>*</span>
                        <input onChange={handleChange} type="email" name='email' placeholder='Email' className='border-2  p-5 text-lg rounded-md w-[98%]' />
                    </div>
                    <div className='w-[80%] md:w-1/2 relative'>
                        <span className='absolute top-0 left-[-25px] text-2xl text-red-500 ml-2'>*</span>
                        <input onChange={handleChange} type="password" name='password' placeholder='Email' className='border-2  p-5 text-lg rounded-md w-[98%]' />
                    </div>
                    <input type="submit" value='Submit' className='border-2 p-5 text-lg rounded-md w-[80%] md:w-1/2 text-center bg-blue-500 hover:bg-blue-300 cursor-pointer' />
                    {err && <div className='text-red-700 text-lg font-bold'>{err}</div>}
                    <div>{msg}</div>
                </form>

            </div>
        </>
    )
}

export default Form
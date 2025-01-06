import React from 'react'
import Form from "../components/Form"
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <>
            <Form endPoint="/api/register" pageHeading="Register New User" page="register"/>
            <div className='text-xl flex justify-center mt-2'>Already user exist ? <Link to="/login" className='text-blue-700 underline'>&nbsp;Log in</Link></div>
        </>
    )
}

export default Register
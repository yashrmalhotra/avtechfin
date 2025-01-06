import React from 'react'

const Loader = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center fixed top-0 bg-black opacity-15 z-10'>
        <img src="/loader.gif" alt="" />
    </div>
  )
}

export default Loader
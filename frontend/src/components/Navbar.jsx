import React from 'react'

const Navbar = ({logOut}) => {
  return (
    <nav className="w-full  bg-blue-700 flex text-white justify-between py-2 px-3" >
      <div className="logo">
        <span className='font-bold'>ITask</span>
      </div>
      <ul className="flex gap-1">
        <li className='cursor-pointer hover:font-bold transition-all w-[75px]'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all w-[75px]'>
          <button onClick={logOut}>Log out</button>
        </li>
      </ul>
    
    </nav>
  )
}

export default Navbar
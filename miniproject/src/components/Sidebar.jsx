import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Sidebar = () => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className='h-screen w-auto md:flex md:flex-col bg-white shadow-md px-5 py-4'>
    {/* Burger Icon for mobile */}
    <div className='flex justify-between items-center md:hidden'>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>

    {/* Menu Items */}
    <div className={`flex-col gap-5 mt-5 md:mt-0 md:flex ${isOpen ? 'flex' : 'hidden'} md:flex items-center`}>
      <Link to='/' className='text-center md:text-left transition duration-200 hover:bg-blue-500 hover:text-white px-5 py-2 rounded-3xl font-semibold'>Home</Link>
      {token ? (
        <button onClick={handleLogout} className='transition duration-200 hover:bg-blue-500 hover:text-white px-5 py-2 rounded-3xl cursor-pointer font-semibold'>Log Out</button>
      ) : (
        <Link to='/login'>
          <button className='transition duration-200 hover:bg-blue-500 hover:text-white px-5 py-2 rounded-3xl cursor-pointer font-semibold'>Login</button>
        </Link>
      )}
    </div>
  </div>
);
};

export default Sidebar
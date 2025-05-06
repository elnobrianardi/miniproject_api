import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className='flex flex-col h-screen overflow-x-hidden justify-between items-center px-10 py-5'>
      <Link to='/'>Home</Link>
      {token ? (
        <button onClick={handleLogout} className='bg-blue-500 px-5 py-2 rounded-3xl'>Log Out</button>) : (
          <Link to='/login'><button className='bg-blue-500 px-5 py-2 rounded-3xl'>Login</button></Link>
        )
      } 
    </div>
  )
}

export default Sidebar
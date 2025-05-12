import { li } from 'framer-motion/client'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {

    const location = useLocation()
    const paths = location.pathname.split('/').filter((p) => p)
  return (
    <nav className='text-sm text-gray-500 my-2 px-10'> 
        <ol className='list-reset flex'>
            <li>
                <Link to='/' className='hover:text-blue-500'>Home</Link>
            </li>
            {paths.map((path, index) => {
                const fullPath = '/' + paths.slice(0, index + 1).join('/')
                const isLast = index + paths.length - 1

                return (
                    <li key={index} className='flex items-center'>
                        <span className='mx-2'>{'>'}</span>
                        {isLast ? (
                            <span className='text-blue-500 font-semibold'>{decodeURIComponent(path)}</span>
                        ) : (
                            <Link to={fullPath} className='hover:text-blue-500'>
                                {decodeURIComponent(path)}
                            </Link>
                        )}
                    </li>
                )
            })}
        </ol>
    </nav>
  )
}

export default Breadcrumbs